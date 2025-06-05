import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Award, Calendar, Eye, ShieldCheck } from 'lucide-react'; // Eye para ver imagem
import { challenges as allChallengesData } from '@/data/challenges'; // Importa todos os desafios
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const ChallengesTabContent = ({ user }) => {
  if (!user || !user.completedChallenges || user.completedChallenges.length === 0) {
    return (
      <Card className="shadow-lg border-border">
        <CardHeader>
          <CardTitle>Meus Desafios Completos</CardTitle>
        </CardHeader>
        <CardContent className="text-center py-10">
          <Award className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground mb-4">Você ainda não completou nenhum desafio.</p>
          <Button asChild>
            <Link to="/desafios">Explorar Desafios</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  const completedChallengesDetails = user.completedChallenges.map(completed => {
    const challengeData = allChallengesData.find(c => c.id === completed.id);
    return {
      ...challengeData,
      completedAt: completed.completedAt,
      imageDataUrl: completed.imageDataUrl,
    };
  }).filter(Boolean); // Remove quaisquer desafios não encontrados

  return (
    <Card className="shadow-lg border-border">
      <CardHeader>
        <CardTitle>Meus Desafios Completos</CardTitle>
        <CardDescription>Revise os desafios que você já conquistou e suas comprovações.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {completedChallengesDetails.map((challenge) => (
            <div key={challenge.id} className="p-4 bg-muted/50 rounded-lg border border-border/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="font-semibold text-lg text-foreground">{challenge.title}</h3>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground mt-1">
                  <span className="flex items-center"><Award className="h-3 w-3 mr-1 text-primary" /> {challenge.points} XP</span>
                  {challenge.completedAt && (
                    <span className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" /> 
                      Completado em: {new Date(challenge.completedAt).toLocaleDateString('pt-BR')}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {challenge.imageDataUrl && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="flex items-center gap-1.5">
                        <Eye className="h-4 w-4" /> Ver Comprovação
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Comprovação: {challenge.title}</DialogTitle>
                      </DialogHeader>
                      <div className="my-4 flex justify-center">
                        <img 
                          src={challenge.imageDataUrl} 
                          alt={`Comprovação para ${challenge.title}`} 
                          className="max-h-[70vh] w-auto rounded-md object-contain" 
                        />
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
                <Button variant="default" size="sm" asChild className="bg-primary/10 text-primary hover:bg-primary/20">
                  <Link to={`/desafios?challengeId=${challenge.id}`} className="flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4" /> Ver Desafio
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ChallengesTabContent;