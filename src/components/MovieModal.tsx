import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Movie } from "@/data/movies";
import { Star, Clock, Calendar, Heart, Eye, Play, DollarSign, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

interface MovieModalProps {
  movie: Movie | null;
  isOpen: boolean;
  onClose: () => void;
  onToggleWatchlist: (id: number) => void;
  onToggleWatched: (id: number) => void;
  onRateMovie: (id: number, rating: number) => void;
}

export const MovieModal = ({ 
  movie, 
  isOpen, 
  onClose, 
  onToggleWatchlist, 
  onToggleWatched, 
  onRateMovie 
}: MovieModalProps) => {
  if (!movie) return null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleRating = (rating: number) => {
    onRateMovie(movie.id, rating);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{movie.title}</DialogTitle>
          {movie.originalTitle !== movie.title && (
            <p className="text-muted-foreground">({movie.originalTitle})</p>
          )}
        </DialogHeader>

        <div className="space-y-6">
          {/* Backdrop Image */}
          <div className="relative rounded-lg overflow-hidden">
            <img
              src={movie.backdrop}
              alt={movie.title}
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <Button size="lg" className="bg-white/20 hover:bg-white/30 text-white">
                <Play className="w-6 h-6 mr-2" />
                Voir la bande-annonce
              </Button>
            </div>
          </div>

          {/* Movie Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Poster */}
            <div className="space-y-4">
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full rounded-lg shadow-lg"
              />
              
              {/* Action Buttons */}
              <div className="space-y-2">
                <Button
                  variant={movie.watchlist ? "default" : "outline"}
                  className="w-full"
                  onClick={() => onToggleWatchlist(movie.id)}
                >
                  <Heart className={cn("w-4 h-4 mr-2", movie.watchlist && "fill-current")} />
                  {movie.watchlist ? "Dans ma liste" : "Ajouter à ma liste"}
                </Button>
                
                <Button
                  variant={movie.watched ? "default" : "outline"}
                  className="w-full"
                  onClick={() => onToggleWatched(movie.id)}
                >
                  <Eye className={cn("w-4 h-4 mr-2", movie.watched && "fill-current")} />
                  {movie.watched ? "Déjà vu" : "Marquer comme vu"}
                </Button>
              </div>

              {/* User Rating */}
              <div className="space-y-2">
                <p className="text-sm font-medium">Votre note :</p>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <Button
                      key={rating}
                      variant="ghost"
                      size="sm"
                      className="h-auto p-1"
                      onClick={() => handleRating(rating)}
                    >
                      <Star className={cn(
                        "w-5 h-5",
                        rating <= (movie.userRating || 0) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                      )} />
                    </Button>
                  ))}
                </div>
                {movie.userRating && (
                  <p className="text-sm text-muted-foreground">
                    Votre note : {movie.userRating}/5
                  </p>
                )}
              </div>
            </div>

            {/* Details */}
            <div className="md:col-span-2 space-y-4">
              {/* Rating and Basic Info */}
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold text-lg">{movie.rating}/10</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{Math.floor(movie.duration / 60)}h {movie.duration % 60}min</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{movie.year}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Globe className="w-4 h-4" />
                  <span>{movie.language}</span>
                </div>
              </div>

              {/* Genres */}
              <div className="flex flex-wrap gap-2">
                {movie.genre.map((genre) => (
                  <Badge key={genre} variant="secondary">
                    {genre}
                  </Badge>
                ))}
              </div>

              {/* Synopsis */}
              <div>
                <h3 className="font-semibold mb-2">Synopsis</h3>
                <p className="text-muted-foreground leading-relaxed">{movie.overview}</p>
              </div>

              {/* Cast & Crew */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Réalisateur</h3>
                  <p className="text-muted-foreground">{movie.director}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Acteurs principaux</h3>
                  <p className="text-muted-foreground">{movie.cast.join(", ")}</p>
                </div>
              </div>

              {/* Box Office */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Budget</h3>
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    <span className="text-muted-foreground">{formatCurrency(movie.budget)}</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Recettes</h3>
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    <span className="text-muted-foreground">{formatCurrency(movie.revenue)}</span>
                  </div>
                </div>
              </div>

              {/* Release Date */}
              <div>
                <h3 className="font-semibold mb-2">Date de sortie</h3>
                <p className="text-muted-foreground">
                  {new Date(movie.releaseDate).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};