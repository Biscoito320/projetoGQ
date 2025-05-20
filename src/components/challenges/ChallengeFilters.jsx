
import React from "react";
import { Search, Filter, BarChart3, PlusCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ChallengeFilters = ({
  searchTerm,
  onSearchTermChange,
  selectedCategory,
  onCategoryChange,
  categories,
  selectedDifficulty,
  onDifficultyChange,
  difficulties,
  isAdmin,
  onAddChallenge
}) => {
  return (
    <div className="mb-8 flex flex-col md:flex-row gap-4 items-center">
      <div className="relative flex-grow w-full md:w-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Buscar desafios..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => onSearchTermChange(e.target.value)}
        />
      </div>
      
      <div className="relative w-full md:w-auto md:min-w-[200px]">
        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <select
          className="w-full h-10 pl-10 pr-4 rounded-md border border-input bg-background text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>
      
      <div className="relative w-full md:w-auto md:min-w-[200px]">
        <BarChart3 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <select
          className="w-full h-10 pl-10 pr-4 rounded-md border border-input bg-background text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          value={selectedDifficulty}
          onChange={(e) => onDifficultyChange(e.target.value)}
        >
          {difficulties.map(difficulty => (
            <option key={difficulty} value={difficulty}>{difficulty}</option>
          ))}
        </select>
      </div>
      {isAdmin && (
        <Button onClick={onAddChallenge} className="w-full md:w-auto">
          <PlusCircle className="mr-2 h-4 w-4" /> Adicionar Desafio
        </Button>
      )}
    </div>
  );
};

export default ChallengeFilters;
