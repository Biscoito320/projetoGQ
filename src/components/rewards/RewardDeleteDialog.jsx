
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

const RewardDeleteDialog = ({ isOpen, onOpenChange, onConfirm, onCancel }) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent className="soft-shadow rounded-xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja excluir esta recompensa? Esta ação não pode ser desfeita e a recompensa será removida permanentemente.
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

export default RewardDeleteDialog;
