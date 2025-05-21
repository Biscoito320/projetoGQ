
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, PlusCircle } from "lucide-react";

const RewardFilters = ({ 
  searchTerm, 
  onSearchTermChange, 
  selectedCategory, 
  onCategoryChange, 
  categories, 
  isAdmin, 
  onAddReward 
}) => {
  return (
    <div className="mb-8 md:mb-10 flex flex-col md:flex-row gap-4 items-center">
      <div className="relative flex-grow w-full md:w-auto">
        <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Buscar recompensas incríveis..."
          className="pl-10 py-2.5 rounded-lg soft-shadow-inset border-border/50 focus:border-primary"
          value={searchTerm}
          onChange={(e) => onSearchTermChange(e.target.value)}
        />
      </div>
      
      <div className="relative w-full md:w-auto md:min-w-[220px]">
        <Filter className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <select
          className="w-full h-[42px] pl-10 pr-4 rounded-lg border border-border/50 bg-background text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring soft-shadow-inset focus:border-primary"
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>
      {isAdmin && (
        <Button onClick={onAddReward} className="w-full md:w-auto neumorphic-btn bg-primary text-primary-foreground hover:bg-primary/90">
          <PlusCircle className="mr-2 h-4 w-4" /> Adicionar Recompensa
        </Button>
      )}
    </div>
  );
};

export default RewardFilters;
