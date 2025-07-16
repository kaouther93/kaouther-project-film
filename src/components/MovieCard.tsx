import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Movie } from "@/data/movies";
import { Heart, Star, Clock, Calendar, Eye, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface MovieCardProps {
  movie: Movie;
  onToggleWatchlist: (id: number) => void;
  onToggleWatched: (id: number) => void;
  onRateMovie: (id: number, rating: number) => void;
  onClick: (movie: Movie) => void;
}

export const MovieCard = ({ 
  movie, 
  onToggleWatchlist, 
  onToggleWatched, 
  onRateMovie, 
  onClick 
}: MovieCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showRating, setShowRating] = useState(false);

  const handleRating = (rating: number) => {
    onRateMovie(movie.id, rating);
    setShowRating(false);
  };

  return (
    <Card 
      className={cn(
        "group relative overflow-hidden cursor-pointer transition-all duration-300",
        "hover:shadow-elegant hover:scale-105 hover:-translate-y-1",
        "bg-card/80 backdrop-blur-sm border border-border/50"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick(movie)}
    >
      {/* Poster Image */}
      <div className="relative overflow-hidden">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        
        {/* Overlay on hover */}
        <div className={cn(
          "absolute inset-0 bg-black/60 transition-opacity duration-300",
          isHovered ? "opacity-100" : "opacity-0"
        )}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <Eye className="w-12 h-12 mx-auto mb-2 opacity-80" />
              <p className="text-sm font-medium">Voir les détails</p>
            </div>
          </div>
        </div>

        {/* Rating Badge */}
        <div className="absolute top-2 right-2">
          <Badge className="bg-primary/90 text-primary-foreground font-bold">
            <Star className="w-3 h-3 mr-1 fill-current" />
            {movie.rating}
          </Badge>
        </div>

        {/* Year Badge */}
        <div className="absolute top-2 left-2">
          <Badge variant="secondary" className="bg-secondary/90">
            {movie.year}
          </Badge>
        </div>

        {/* Watchlist/Watched Icons */}
        <div className="absolute bottom-2 right-2 flex gap-1">
          <Button
            size="sm"
            variant={movie.watchlist ? "default" : "outline"}
            className="w-8 h-8 p-0 bg-background/80 hover:bg-background"
            onClick={(e) => {
              e.stopPropagation();
              onToggleWatchlist(movie.id);
            }}
          >
            <Heart className={cn("w-4 h-4", movie.watchlist && "fill-current")} />
          </Button>
          
          <Button
            size="sm"
            variant={movie.watched ? "default" : "outline"}
            className="w-8 h-8 p-0 bg-background/80 hover:bg-background"
            onClick={(e) => {
              e.stopPropagation();
              onToggleWatched(movie.id);
            }}
          >
            <Eye className={cn("w-4 h-4", movie.watched && "fill-current")} />
          </Button>
        </div>
      </div>

      {/* Card Content */}
      <CardContent className="p-4">
        <div className="space-y-2">
          {/* Title */}
          <h3 className="font-bold text-lg line-clamp-1 text-foreground group-hover:text-primary transition-colors">
            {movie.title}
          </h3>
          
          {/* Director */}
          <p className="text-sm text-muted-foreground">
            Réalisé par {movie.director}
          </p>
          
          {/* Genres */}
          <div className="flex flex-wrap gap-1">
            {movie.genre.slice(0, 2).map((genre) => (
              <Badge key={genre} variant="outline" className="text-xs">
                {genre}
              </Badge>
            ))}
            {movie.genre.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{movie.genre.length - 2}
              </Badge>
            )}
          </div>

          {/* Duration */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{Math.floor(movie.duration / 60)}h {movie.duration % 60}min</span>
            <Calendar className="w-4 h-4 ml-2" />
            <span>{movie.year}</span>
          </div>

          {/* User Rating */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-1 hover:bg-accent"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowRating(!showRating);
                }}
              >
                <Star className={cn(
                  "w-4 h-4",
                  movie.userRating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                )} />
                <span className="text-sm ml-1">
                  {movie.userRating ? movie.userRating.toFixed(1) : "Noter"}
                </span>
              </Button>
            </div>
          </div>

          {/* Rating Stars */}
          {showRating && (
            <div className="flex gap-1 pt-2 border-t">
              {[1, 2, 3, 4, 5].map((rating) => (
                <Button
                  key={rating}
                  variant="ghost"
                  size="sm"
                  className="h-auto p-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRating(rating);
                  }}
                >
                  <Star className={cn(
                    "w-4 h-4",
                    rating <= (movie.userRating || 0) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                  )} />
                </Button>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};