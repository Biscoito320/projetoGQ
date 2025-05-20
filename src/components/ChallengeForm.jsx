
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"; 
import { DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Vegan, Bike, Droplets, PlugZap, Sprout, Users, Trash2 as TrashIcon, Recycle, PlusCircle, Trash2 } from "lucide-react";

const challengeCategories = [
  "Alimentação Consciente",
  "Mobilidade Verde",
  "Uso Consciente de Recursos",
  "Eficiência Energética",
  "Ação Climática Direta",
  "Educação e Conscientização",
  "Redução de Resíduos",
  "Gestão de Resíduos Orgânicos"
];

const difficultyLevels = ["Fácil", "Médio", "Difícil"];

const iconMap = {
  "Alimentação Consciente": Vegan,
  "Mobilidade Verde": Bike,
  "Uso Consciente de Recursos": Droplets,
  "Eficiência Energética": PlugZap,
  "Ação Climática Direta": Sprout,
  "Educação e Conscientização": Users,
  "Redução de Resíduos": TrashIcon,
  "Gestão de Resíduos Orgânicos": Recycle,
};

const ChallengeForm = ({ onSubmit, initialData, onCancel }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState(0);
  const [category, setCategory] = useState(challengeCategories[0]);
  const [difficulty, setDifficulty] = useState(difficultyLevels[0]);
  const [duration, setDuration] = useState("");
  const [steps, setSteps] = useState([""]);
  const [colorScheme, setColorScheme] = useState("green");


  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setDescription(initialData.description || "");
      setPoints(initialData.points || 0);
      setCategory(initialData.category || challengeCategories[0]);
      setDifficulty(initialData.difficulty || difficultyLevels[0]);
      setDuration(initialData.duration || "");
      setSteps(initialData.steps && initialData.steps.length > 0 ? initialData.steps : [""]);
      setColorScheme(initialData.colorScheme || "green");
    } else {
      setTitle("");
      setDescription("");
      setPoints(0);
      setCategory(challengeCategories[0]);
      setDifficulty(difficultyLevels[0]);
      setDuration("");
      setSteps([""]);
      setColorScheme("green");
    }
  }, [initialData]);

  const handleStepChange = (index, value) => {
    const newSteps = [...steps];
    newSteps[index] = value;
    setSteps(newSteps);
  };

  const addStep = () => {
    setSteps([...steps, ""]);
  };

  const removeStep = (index) => {
    if (steps.length > 1) {
      const newSteps = steps.filter((_, i) => i !== index);
      setSteps(newSteps);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedIconName = Object.keys(iconMap).find(key => iconMap[key] === iconMap[category]);
    onSubmit({ 
      id: initialData?.id || `c${Date.now()}`, 
      title, 
      description, 
      points: Number(points), 
      category, 
      difficulty, 
      duration, 
      steps: steps.filter(step => step.trim() !== ""),
      icon: selectedIconName,
      colorScheme
    });
  };
  
  const SelectedIcon = iconMap[category];

  return (
    <DialogContent className="sm:max-w-2xl">
      <DialogHeader>
        <DialogTitle>{initialData ? "Editar Desafio" : "Adicionar Novo Desafio"}</DialogTitle>
        <DialogDescription>
          {initialData ? "Modifique os detalhes do desafio existente." : "Preencha as informações para criar um novo desafio."}
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
        <div>
          <Label htmlFor="title">Título</Label>
          <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <Label htmlFor="description">Descrição</Label>
          <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="points">Pontos</Label>
            <Input id="points" type="number" value={points} onChange={(e) => setPoints(e.target.value)} required min="0" />
          </div>
          <div>
            <Label htmlFor="duration">Duração</Label>
            <Input id="duration" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="Ex: 1 semana, 3 dias" required />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="category">Categoria</Label>
            <div className="flex items-center gap-2">
              {SelectedIcon && <SelectedIcon className="h-5 w-5 text-muted-foreground" />}
              <select 
                id="category" 
                value={category} 
                onChange={(e) => setCategory(e.target.value)} 
                className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                required
              >
                {challengeCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
          </div>
          <div>
            <Label htmlFor="difficulty">Dificuldade</Label>
            <select 
              id="difficulty" 
              value={difficulty} 
              onChange={(e) => setDifficulty(e.target.value)} 
              className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              required
            >
              {difficultyLevels.map(level => <option key={level} value={level}>{level}</option>)}
            </select>
          </div>
        </div>
         <div>
            <Label htmlFor="colorScheme">Esquema de Cores do Card</Label>
            <select 
              id="colorScheme" 
              value={colorScheme} 
              onChange={(e) => setColorScheme(e.target.value)} 
              className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              required
            >
              {["green", "blue", "teal", "yellow", "lime", "purple", "orange", "brown"].map(color => <option key={color} value={color}>{color.charAt(0).toUpperCase() + color.slice(1)}</option>)}
            </select>
          </div>
        
        <div>
          <Label>Passos para Completar</Label>
          {steps.map((step, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <Input 
                type="text" 
                value={step} 
                onChange={(e) => handleStepChange(index, e.target.value)} 
                placeholder={`Passo ${index + 1}`}
                required
              />
              {steps.length > 1 && (
                <Button type="button" variant="ghost" size="icon" onClick={() => removeStep(index)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              )}
            </div>
          ))}
          <Button type="button" variant="outline" size="sm" onClick={addStep} className="mt-1">
            <PlusCircle className="h-4 w-4 mr-2" /> Adicionar Passo
          </Button>
        </div>

        <DialogFooter className="pt-4">
          <DialogClose asChild>
            <Button type="button" variant="outline" onClick={onCancel}>Cancelar</Button>
          </DialogClose>
          <Button type="submit">{initialData ? "Salvar Alterações" : "Criar Desafio"}</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default ChallengeForm;
