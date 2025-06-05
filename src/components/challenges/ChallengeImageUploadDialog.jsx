import React, { useState, useCallback } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UploadCloud, Image as ImageIcon, AlertTriangle } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const ChallengeImageUploadDialog = ({ isOpen, onOpenChange, onImageSubmit, challengeTitle }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState('');
  const { toast } = useToast();

  const handleImageChange = (event) => {
    setError('');
    const file = event.target.files[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/png', 'image/heic', 'image/heif'];
      if (!validTypes.includes(file.type) && !file.name.toLowerCase().endsWith('.heic')) {
        setError('Formato de arquivo inválido. Use JPG, PNG ou HEIC.');
        setSelectedImage(null);
        setPreviewUrl(null);
        return;
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError('Arquivo muito grande. O limite é de 5MB.');
        setSelectedImage(null);
        setPreviewUrl(null);
        return;
      }
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedImage(null);
      setPreviewUrl(null);
    }
  };

  const handleSubmit = () => {
    if (!selectedImage || !previewUrl) {
      setError('Por favor, selecione uma imagem para enviar.');
      return;
    }
    onImageSubmit(previewUrl); // Passa o Data URL da imagem
    toast({ title: "Comprovação Enviada", description: "Sua imagem foi enviada com sucesso!" });
    handleClose();
  };

  const handleClose = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
    setError('');
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Finalizar Desafio: {challengeTitle}</DialogTitle>
          <DialogDescription>
            Envie uma foto comprovando a realização do desafio para finalizar.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <div 
            className="relative border-2 border-dashed border-muted-foreground/50 rounded-lg p-6 text-center cursor-pointer hover:border-primary transition-colors"
            onClick={() => document.getElementById('imageUploadInput').click()}
          >
            <Input
              id="imageUploadInput"
              type="file"
              accept=".jpg,.jpeg,.png,.heic,.heif"
              onChange={handleImageChange}
              className="hidden"
            />
            {previewUrl ? (
              <img src={previewUrl} alt="Preview" className="max-h-48 w-auto mx-auto rounded-md object-contain" />
            ) : (
              <div className="flex flex-col items-center text-muted-foreground">
                <UploadCloud size={48} className="mb-2" />
                <p className="text-sm">Clique para carregar ou arraste a imagem</p>
                <p className="text-xs">JPG, PNG, HEIC (máx. 5MB)</p>
              </div>
            )}
          </div>
          {error && (
            <div className="flex items-center text-sm text-destructive bg-destructive/10 p-2 rounded-md">
              <AlertTriangle size={16} className="mr-2" />
              {error}
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSubmit} disabled={!selectedImage || !!error}>
            Enviar e Finalizar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChallengeImageUploadDialog;