
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"; 
import { DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { PlusCircle, Trash2 } from "lucide-react";

const lessonTypes = ["Introdução", "Ação Prática", "Aprofundamento", "Engajamento e Futuro", "Default"];
const lessonSections = ["Fundamentos", "Ações Práticas", "Conceitos Avançados", "Engajamento e Futuro", "Default"];


const LessonForm = ({ onSubmit, initialData, onCancel }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState(0);
  const [duration, setDuration] = useState("");
  const [type, setType] = useState(lessonTypes[0]);
  const [section, setSection] = useState(lessonSections[0]);
  const [content, setContent] = useState("");
  const [quiz, setQuiz] = useState([{ question: "", options: ["", "", "", ""], correctAnswer: 0 }]);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setDescription(initialData.description || "");
      setPoints(initialData.points || 0);
      setDuration(initialData.duration || "");
      setType(initialData.type || lessonTypes[0]);
      setSection(initialData.section || lessonSections[0]);
      setContent(initialData.content || "");
      setQuiz(initialData.quiz && initialData.quiz.length > 0 ? initialData.quiz : [{ question: "", options: ["", "", "", ""], correctAnswer: 0 }]);
    } else {
      // Reset to default for new lesson
      setTitle("");
      setDescription("");
      setPoints(0);
      setDuration("");
      setType(lessonTypes[0]);
      setSection(lessonSections[0]);
      setContent("");
      setQuiz([{ question: "", options: ["", "", "", ""], correctAnswer: 0 }]);
    }
  }, [initialData]);

  const handleQuizChange = (qIndex, field, value) => {
    const newQuiz = [...quiz];
    newQuiz[qIndex][field] = value;
    setQuiz(newQuiz);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const newQuiz = [...quiz];
    newQuiz[qIndex].options[oIndex] = value;
    setQuiz(newQuiz);
  };

  const addQuestion = () => {
    setQuiz([...quiz, { question: "", options: ["", "", "", ""], correctAnswer: 0 }]);
  };

  const removeQuestion = (qIndex) => {
    if (quiz.length > 1) {
      setQuiz(quiz.filter((_, index) => index !== qIndex));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ 
      id: initialData?.id || `l${Date.now()}`, 
      title, 
      description, 
      points: Number(points), 
      duration,
      type,
      section,
      content,
      quiz: quiz.map(q => ({...q, correctAnswer: Number(q.correctAnswer)}))
    });
  };

  return (
    <DialogContent className="sm:max-w-3xl">
      <DialogHeader>
        <DialogTitle>{initialData ? "Editar Lição" : "Adicionar Nova Lição"}</DialogTitle>
        <DialogDescription>
          {initialData ? "Modifique os detalhes da lição existente." : "Preencha as informações para criar uma nova lição."}
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-4 max-h-[75vh] overflow-y-auto p-1 pr-3">
        <div>
          <Label htmlFor="title">Título da Lição</Label>
          <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <Label htmlFor="description">Descrição Curta</Label>
          <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="points">Pontos</Label>
            <Input id="points" type="number" value={points} onChange={(e) => setPoints(e.target.value)} required min="0" />
          </div>
          <div>
            <Label htmlFor="duration">Duração Estimada</Label>
            <Input id="duration" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="Ex: 15-20 min" required />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="type">Tipo de Lição</Label>
            <select id="type" value={type} onChange={(e) => setType(e.target.value)} className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
              {lessonTypes.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
           <div>
            <Label htmlFor="section">Seção da Trilha</Label>
            <select id="section" value={section} onChange={(e) => setSection(e.target.value)} className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
              {lessonSections.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
        <div>
          <Label htmlFor="content">Conteúdo da Lição (HTML permitido)</Label>
          <Textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} rows={8} placeholder="Use tags HTML para formatação, como <h2>, <p>, <ul>, <li>, <strong>..." />
        </div>
        
        <div className="space-y-3 pt-3 border-t">
          <h3 className="text-lg font-medium">Quiz da Lição</h3>
          {quiz.map((q, qIndex) => (
            <div key={qIndex} className="p-3 border rounded-md space-y-2 bg-muted/30">
              <div className="flex justify-between items-center">
                <Label htmlFor={`q-title-${qIndex}`}>Pergunta {qIndex + 1}</Label>
                {quiz.length > 1 && (
                  <Button type="button" variant="ghost" size="icon" onClick={() => removeQuestion(qIndex)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                )}
              </div>
              <Input 
                id={`q-title-${qIndex}`}
                value={q.question} 
                onChange={(e) => handleQuizChange(qIndex, 'question', e.target.value)}
                placeholder="Título da Pergunta" 
              />
              <Label className="text-xs">Opções (4 opções)</Label>
              {q.options.map((opt, oIndex) => (
                <Input 
                  key={oIndex}
                  value={opt}
                  onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                  placeholder={`Opção ${oIndex + 1}`}
                />
              ))}
              <div>
                <Label htmlFor={`q-correct-${qIndex}`} className="text-xs">Resposta Correta (índice 0-3)</Label>
                <Input 
                  id={`q-correct-${qIndex}`}
                  type="number" 
                  min="0" max="3" 
                  value={q.correctAnswer}
                  onChange={(e) => handleQuizChange(qIndex, 'correctAnswer', parseInt(e.target.value))}
                />
              </div>
            </div>
          ))}
          <Button type="button" variant="outline" size="sm" onClick={addQuestion} className="mt-1">
            <PlusCircle className="h-4 w-4 mr-2" /> Adicionar Pergunta ao Quiz
          </Button>
        </div>

        <DialogFooter className="pt-4">
          <DialogClose asChild>
            <Button type="button" variant="outline" onClick={onCancel}>Cancelar</Button>
          </DialogClose>
          <Button type="submit">{initialData ? "Salvar Alterações" : "Criar Lição"}</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default LessonForm;
