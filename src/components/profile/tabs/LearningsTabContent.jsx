import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { BookOpen as BookIcon } from "lucide-react";
import { lessons as allLessonsData } from "@/data/lessons";

const LearningsTabContent = ({ user }) => {
  const userLessons = (user.completedLessons || [])
    .map(lessonId => allLessonsData.find(l => l.id === lessonId))
    .filter(Boolean);

  return (
    <Card className="p-0 sm:p-6">
      <CardHeader>
        <CardTitle className="text-2xl mb-2 flex items-center">
          <BookIcon className="h-6 w-6 mr-3 text-primary" /> Lições Concluídas
        </CardTitle>
        <CardDescription>Seu progresso na trilha do conhecimento sobre ação climática.</CardDescription>
      </CardHeader>
      <CardContent>
        {userLessons.length > 0 ? (
          <ul className="space-y-4">
            {userLessons.map(lesson => (
              <li key={lesson.id} className="p-4 bg-muted/50 rounded-lg flex items-center justify-between">
                <div className="flex items-center">
                  <BookIcon className="h-5 w-5 mr-3 text-primary" />
                  <span>{lesson.title}</span>
                </div>
                <span className="text-xs text-muted-foreground">Concluído</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground text-center py-8">Nenhuma lição concluída ainda. Visite a <Link to="/trilha" className="text-primary hover:underline">Trilha de Aprendizado</Link>!</p>
        )}
      </CardContent>
    </Card>
  );
};

export default LearningsTabContent;