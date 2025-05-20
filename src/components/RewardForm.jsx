
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { GlassWater, Sprout, ShoppingBag, BookOpen, Sparkles, TreePine, Shirt, HeartHandshake } from "lucide-react";

const rewardCategories = [
  "Produtos Sustentáveis",
  "Jardinagem Ecológica",
  "Educação Ambiental",
  "Bem-Estar Sustentável",
  "Impacto Positivo",
  "Vestuário Consciente"
];

const iconMap = {
  "Produtos Sustentáveis": GlassWater,
  "Jardinagem Ecológica": Sprout,
  "Educação Ambiental": BookOpen,
  "Bem-Estar Sustentável": Sparkles,
  "Impacto Positivo": TreePine,
  "Vestuário Consciente": Shirt,
  Default: ShoppingBag,
};


const RewardForm = ({ onSubmit, initialData, onCancel }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState(rewardCategories[0]);
  const [icon, setIcon] = useState(Object.keys(iconMap)[0]);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setDescription(initialData.description || "");
      setPrice(initialData.price || 0);
      setCategory(initialData.category || rewardCategories[0]);
      setIcon(initialData.icon || Object.keys(iconMap)[0]);
    } else {
      setName("");
      setDescription("");
      setPrice(0);
      setCategory(rewardCategories[0]);
      setIcon(Object.keys(iconMap)[0]);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedIconName = Object.keys(iconMap).find(key => iconMap[key] === iconMap[category]);
    onSubmit({ 
      id: initialData?.id || `r${Date.now()}`, 
      name, 
      description, 
      price: Number(price), 
      category,
      icon: selectedIconName
    });
  };

  const SelectedIcon = iconMap[category];

  return (
    <DialogContent className="sm:max-w-lg">
      <DialogHeader>
        <DialogTitle>{initialData ? "Editar Recompensa" : "Adicionar Nova Recompensa"}</DialogTitle>
        <DialogDescription>
          {initialData ? "Modifique os detalhes da recompensa existente." : "Preencha as informações para criar uma nova recompensa."}
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Nome da Recompensa</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <Label htmlFor="description">Descrição</Label>
          <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="price">Preço (Pontos)</Label>
            <Input id="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} required min="0" />
          </div>
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
                {rewardCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
          </div>
        </div>
        <DialogFooter className="pt-4">
          <DialogClose asChild>
            <Button type="button" variant="outline" onClick={onCancel}>Cancelar</Button>
          </DialogClose>
          <Button type="submit">{initialData ? "Salvar Alterações" : "Criar Recompensa"}</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default RewardForm;
