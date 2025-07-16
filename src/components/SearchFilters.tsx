import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Search, Filter, X, ChevronDown } from "lucide-react";
import { genres } from "@/data/movies";

export interface FilterState {
  searchTerm: string;
  selectedGenres: string[];
  yearRange: [number, number];
  ratingRange: [number, number];
  sortBy: 'rating' | 'year' | 'title' | 'duration';
  sortOrder: 'asc' | 'desc';
  showWatchlist: boolean;
  showWatched: boolean;
}

interface SearchFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

export const SearchFilters = ({ filters, onFiltersChange }: SearchFiltersProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const updateFilters = (updates: Partial<FilterState>) => {
    onFiltersChange({ ...filters, ...updates });
  };

  const toggleGenre = (genre: string) => {
    const newGenres = filters.selectedGenres.includes(genre)
      ? filters.selectedGenres.filter(g => g !== genre)
      : [...filters.selectedGenres, genre];
    updateFilters({ selectedGenres: newGenres });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      searchTerm: '',
      selectedGenres: [],
      yearRange: [1970, 2024],
      ratingRange: [0, 10],
      sortBy: 'rating',
      sortOrder: 'desc',
      showWatchlist: false,
      showWatched: false
    });
  };

  const activeFiltersCount = 
    filters.selectedGenres.length +
    (filters.showWatchlist ? 1 : 0) +
    (filters.showWatched ? 1 : 0) +
    (filters.searchTerm ? 1 : 0);

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Rechercher un film, un réalisateur, un acteur..."
          className="pl-10 pr-4 py-2 bg-background/50 backdrop-blur-sm"
          value={filters.searchTerm}
          onChange={(e) => updateFilters({ searchTerm: e.target.value })}
        />
      </div>

      {/* Filter Toggle */}
      <div className="flex items-center justify-between">
        <Collapsible open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filtres
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {activeFiltersCount}
                </Badge>
              )}
              <ChevronDown className={`w-4 h-4 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
            </Button>
          </CollapsibleTrigger>

          <CollapsibleContent className="mt-4">
            <Card>
              <CardContent className="p-4 space-y-6">
                {/* Quick Filters */}
                <div className="space-y-2">
                  <h3 className="font-semibold">Filtres rapides</h3>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={filters.showWatchlist ? "default" : "outline"}
                      size="sm"
                      onClick={() => updateFilters({ showWatchlist: !filters.showWatchlist })}
                    >
                      Ma liste
                    </Button>
                    <Button
                      variant={filters.showWatched ? "default" : "outline"}
                      size="sm"
                      onClick={() => updateFilters({ showWatched: !filters.showWatched })}
                    >
                      Déjà vus
                    </Button>
                  </div>
                </div>

                {/* Genres */}
                <div className="space-y-2">
                  <h3 className="font-semibold">Genres</h3>
                  <div className="flex flex-wrap gap-2">
                    {genres.map((genre) => (
                      <Button
                        key={genre}
                        variant={filters.selectedGenres.includes(genre) ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleGenre(genre)}
                      >
                        {genre}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Year Range */}
                <div className="space-y-2">
                  <h3 className="font-semibold">Année de sortie</h3>
                  <div className="px-2">
                    <Slider
                      value={filters.yearRange}
                      onValueChange={(value) => updateFilters({ yearRange: value as [number, number] })}
                      min={1970}
                      max={2024}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground mt-1">
                      <span>{filters.yearRange[0]}</span>
                      <span>{filters.yearRange[1]}</span>
                    </div>
                  </div>
                </div>

                {/* Rating Range */}
                <div className="space-y-2">
                  <h3 className="font-semibold">Note minimum</h3>
                  <div className="px-2">
                    <Slider
                      value={filters.ratingRange}
                      onValueChange={(value) => updateFilters({ ratingRange: value as [number, number] })}
                      min={0}
                      max={10}
                      step={0.1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground mt-1">
                      <span>{filters.ratingRange[0]}</span>
                      <span>{filters.ratingRange[1]}</span>
                    </div>
                  </div>
                </div>

                {/* Sort Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold">Trier par</h3>
                    <Select value={filters.sortBy} onValueChange={(value) => updateFilters({ sortBy: value as FilterState['sortBy'] })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rating">Note</SelectItem>
                        <SelectItem value="year">Année</SelectItem>
                        <SelectItem value="title">Titre</SelectItem>
                        <SelectItem value="duration">Durée</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-semibold">Ordre</h3>
                    <Select value={filters.sortOrder} onValueChange={(value) => updateFilters({ sortOrder: value as FilterState['sortOrder'] })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="desc">Décroissant</SelectItem>
                        <SelectItem value="asc">Croissant</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Clear Filters */}
                <div className="flex justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearAllFilters}
                    className="flex items-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Effacer tous les filtres
                  </Button>
                </div>
              </CardContent>
            </Card>
          </CollapsibleContent>
        </Collapsible>

        {/* Sort Quick Access */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Trier par:</span>
          <Select value={filters.sortBy} onValueChange={(value) => updateFilters({ sortBy: value as FilterState['sortBy'] })}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">Note</SelectItem>
              <SelectItem value="year">Année</SelectItem>
              <SelectItem value="title">Titre</SelectItem>
              <SelectItem value="duration">Durée</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Active Filters Display */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {filters.searchTerm && (
            <Badge variant="secondary" className="flex items-center gap-1">
              "{filters.searchTerm}"
              <X 
                className="w-3 h-3 cursor-pointer" 
                onClick={() => updateFilters({ searchTerm: '' })}
              />
            </Badge>
          )}
          {filters.selectedGenres.map((genre) => (
            <Badge key={genre} variant="secondary" className="flex items-center gap-1">
              {genre}
              <X 
                className="w-3 h-3 cursor-pointer" 
                onClick={() => toggleGenre(genre)}
              />
            </Badge>
          ))}
          {filters.showWatchlist && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Ma liste
              <X 
                className="w-3 h-3 cursor-pointer" 
                onClick={() => updateFilters({ showWatchlist: false })}
              />
            </Badge>
          )}
          {filters.showWatched && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Déjà vus
              <X 
                className="w-3 h-3 cursor-pointer" 
                onClick={() => updateFilters({ showWatched: false })}
              />
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};