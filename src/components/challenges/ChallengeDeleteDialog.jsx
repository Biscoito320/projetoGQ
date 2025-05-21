
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

const ChallengeDeleteDialog = ({ isOpen, onOpenChange, onConfirm, onCancel }) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent className="soft-shadow">
        <AlertDialogHeader>
          <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja excluir este desafio? Esta ação não pode ser desfeita e o desafio será removido permanentemente.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant="outline" onClick={onCancel} className="neumorphic-btn">Cancelar</Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button onClick={onConfirm} className="bg-destructive hover:bg-destructive/90 text-destructive-foreground neumorphic-btn">Excluir</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ChallengeDeleteDialog;
