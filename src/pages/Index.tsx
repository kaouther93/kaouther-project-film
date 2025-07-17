import { useState, useMemo } from "react";
import { Movie, movies } from "@/data/movies";
import { MovieCard } from "@/components/MovieCard";
import { MovieModal } from "@/components/MovieModal";
import { SearchFilters, FilterState } from "@/components/SearchFilters";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Film, Star, Heart, Eye, TrendingUp, Calendar } from "lucide-react";

const Index = () => {
  const [moviesList, setMoviesList] = useState<Movie[]>(movies);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    searchTerm: '',
    selectedGenres: [],
    yearRange: [1970, 2024],
    ratingRange: [0, 10],
    sortBy: 'rating',
    sortOrder: 'desc',
    showWatchlist: false,
    showWatched: false
  });

  // Filter and sort movies
  const filteredMovies = useMemo(() => {
    let filtered = moviesList.filter(movie => {
      // Search term filter
      if (filters.searchTerm) {
        const searchTerm = filters.searchTerm.toLowerCase();
        const matchesSearch = 
          movie.title.toLowerCase().includes(searchTerm) ||
          movie.director.toLowerCase().includes(searchTerm) ||
          movie.cast.some(actor => actor.toLowerCase().includes(searchTerm)) ||
          movie.genre.some(genre => genre.toLowerCase().includes(searchTerm));
        if (!matchesSearch) return false;
      }

      // Genre filter
      if (filters.selectedGenres.length > 0) {
        const hasGenre = filters.selectedGenres.some(genre => movie.genre.includes(genre));
        if (!hasGenre) return false;
      }

      // Year range filter
      if (movie.year < filters.yearRange[0] || movie.year > filters.yearRange[1]) {
        return false;
      }

      // Rating range filter
      if (movie.rating < filters.ratingRange[0] || movie.rating > filters.ratingRange[1]) {
        return false;
      }

      // Watchlist filter
      if (filters.showWatchlist && !movie.watchlist) {
        return false;
      }

      // Watched filter
      if (filters.showWatched && !movie.watched) {
        return false;
      }

      return true;
    });

    // Sort movies
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (filters.sortBy) {
        case 'rating':
          comparison = a.rating - b.rating;
          break;
        case 'year':
          comparison = a.year - b.year;
          break;
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'duration':
          comparison = a.duration - b.duration;
          break;
      }

      return filters.sortOrder === 'desc' ? -comparison : comparison;
    });

    return filtered;
  }, [moviesList, filters]);

  const toggleWatchlist = (id: number) => {
    setMoviesList(prev => 
      prev.map(movie => 
        movie.id === id ? { ...movie, watchlist: !movie.watchlist } : movie
      )
    );
  };

  const toggleWatched = (id: number) => {
    setMoviesList(prev => 
      prev.map(movie => 
        movie.id === id ? { ...movie, watched: !movie.watched } : movie
      )
    );
  };

  const rateMovie = (id: number, rating: number) => {
    setMoviesList(prev => 
      prev.map(movie => 
        movie.id === id ? { ...movie, userRating: rating } : movie
      )
    );
  };

  // Statistics
  const stats = useMemo(() => {
    const totalMovies = moviesList.length;
    const watchlistCount = moviesList.filter(m => m.watchlist).length;
    const watchedCount = moviesList.filter(m => m.watched).length;
    const averageRating = moviesList.reduce((sum, m) => sum + m.rating, 0) / totalMovies;
    const ratedByUser = moviesList.filter(m => m.userRating).length;

    return {
      totalMovies,
      watchlistCount,
      watchedCount,
      averageRating,
      ratedByUser
    };
  }, [moviesList]);

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <div className="relative bg-gradient-hero text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Film className="w-8 h-8" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              CinéExplorer
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              Découvrez, notez et organisez vos films préférés
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-3xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center justify-center mb-2">
                  <Film className="w-6 h-6" />
                </div>
                <div className="text-2xl font-bold">{stats.totalMovies}</div>
                <div className="text-sm text-white/80">Films</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center justify-center mb-2">
                  <Heart className="w-6 h-6" />
                </div>
                <div className="text-2xl font-bold">{stats.watchlistCount}</div>
                <div className="text-sm text-white/80">Ma liste</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center justify-center mb-2">
                  <Eye className="w-6 h-6" />
                </div>
                <div className="text-2xl font-bold">{stats.watchedCount}</div>
                <div className="text-sm text-white/80">Vus</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center justify-center mb-2">
                  <Star className="w-6 h-6" />
                </div>
                <div className="text-2xl font-bold">{stats.averageRating.toFixed(1)}</div>
                <div className="text-sm text-white/80">Note moy.</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center justify-center mb-2">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div className="text-2xl font-bold">{stats.ratedByUser}</div>
                <div className="text-sm text-white/80">Notés</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <SearchFilters filters={filters} onFiltersChange={setFilters} />
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold">
              {filteredMovies.length} film{filteredMovies.length > 1 ? 's' : ''} trouvé{filteredMovies.length > 1 ? 's' : ''}
            </h2>
            {filters.searchTerm && (
              <Badge variant="secondary">
                pour "{filters.searchTerm}"
              </Badge>
            )}
          </div>
          
          <div className="text-sm text-muted-foreground">
            Trié par {filters.sortBy} ({filters.sortOrder === 'desc' ? 'décroissant' : 'croissant'})
          </div>
        </div>

        {/* Movies Grid */}
        {filteredMovies.length === 0 ? (
          <Card className="text-center py-16">
            <CardContent>
              <Film className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Aucun film trouvé</h3>
              <p className="text-muted-foreground mb-4">
                Essayez de modifier vos critères de recherche ou vos filtres
              </p>
              <Button 
                variant="outline" 
                onClick={() => setFilters({
                  searchTerm: '',
                  selectedGenres: [],
                  yearRange: [1970, 2024],
                  ratingRange: [0, 10],
                  sortBy: 'rating',
                  sortOrder: 'desc',
                  showWatchlist: false,
                  showWatched: false
                })}
              >
                Effacer tous les filtres
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onToggleWatchlist={toggleWatchlist}
                onToggleWatched={toggleWatched}
                onRateMovie={rateMovie}
                onClick={setSelectedMovie}
              />
            ))}
          </div>
        )}
      </div>

      {/* Movie Modal */}
      <MovieModal
        movie={selectedMovie}
        isOpen={!!selectedMovie}
        onClose={() => setSelectedMovie(null)}
        onToggleWatchlist={toggleWatchlist}
        onToggleWatched={toggleWatched}
        onRateMovie={rateMovie}
      />
    </div>
  );
};

export default Index;
