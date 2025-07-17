import { useState } from "react";
import { Product } from "@/types/cosmetics";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Heart, ShoppingCart, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onToggleFavorite?: (productId: string) => void;
  onClick?: (product: Product) => void;
  isFavorite?: boolean;
}

export const ProductCard = ({
  product,
  onAddToCart,
  onToggleFavorite,
  onClick,
  isFavorite = false,
}: ProductCardProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLoading(true);
    await onAddToCart?.(product);
    setIsLoading(false);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite?.(product.id);
  };

  const discountPercentage = product.discount_price 
    ? Math.round(((product.price - product.discount_price) / product.price) * 100)
    : 0;

  const averageRating = product.reviews?.length 
    ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length
    : 0;

  return (
    <Card 
      className="group cursor-pointer transition-all duration-300 hover:shadow-elegant hover:scale-105 animate-fade-in"
      onClick={() => onClick?.(product)}
    >
      <CardContent className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          {/* Product Image */}
          <div className="aspect-square bg-gradient-warm">
            {product.image_url && !imageError ? (
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-secondary/20">
                <div className="text-6xl">💄</div>
              </div>
            )}
          </div>
          
          {/* Discount Badge */}
          {discountPercentage > 0 && (
            <Badge className="absolute top-2 left-2 bg-destructive text-destructive-foreground">
              -{discountPercentage}%
            </Badge>
          )}
          
          {/* Stock Badge */}
          {product.stock_quantity <= 5 && product.stock_quantity > 0 && (
            <Badge className="absolute top-2 right-2 bg-accent text-accent-foreground">
              Stock limité
            </Badge>
          )}
          
          {product.stock_quantity === 0 && (
            <Badge className="absolute top-2 right-2 bg-muted text-muted-foreground">
              Épuisé
            </Badge>
          )}
          
          {/* Actions Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="flex gap-2">
              <Button
                size="icon"
                variant="secondary"
                onClick={handleToggleFavorite}
                className={cn(
                  "transform transition-all duration-300 scale-95 hover:scale-100",
                  isFavorite && "bg-destructive text-destructive-foreground"
                )}
              >
                <Heart className={cn("h-4 w-4", isFavorite && "fill-current")} />
              </Button>
              
              <Button
                size="icon"
                variant="secondary"
                onClick={() => onClick?.(product)}
                className="transform transition-all duration-300 scale-95 hover:scale-100"
              >
                <Eye className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Product Info */}
        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            {product.brand && (
              <Badge variant="outline" className="text-xs">
                {product.brand.name}
              </Badge>
            )}
            {product.category && (
              <Badge variant="secondary" className="text-xs">
                {product.category.name}
              </Badge>
            )}
          </div>
          
          <h3 className="font-semibold text-sm mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          
          <p className="text-muted-foreground text-xs mb-3 line-clamp-2">
            {product.description}
          </p>
          
          {/* Rating */}
          {averageRating > 0 && (
            <div className="flex items-center gap-1 mb-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-3 w-3",
                      i < averageRating ? "fill-primary text-primary" : "text-muted-foreground"
                    )}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">
                ({product.reviews?.length || 0})
              </span>
            </div>
          )}
          
          {/* Skin Type */}
          {product.skin_type && product.skin_type.length > 0 && (
            <div className="flex gap-1 mb-2">
              {product.skin_type.slice(0, 2).map((type) => (
                <Badge key={type} variant="outline" className="text-xs">
                  {type}
                </Badge>
              ))}
            </div>
          )}
          
          {/* Price */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg font-bold text-primary">
              {product.discount_price ? product.discount_price.toFixed(2) : product.price.toFixed(2)}€
            </span>
            {product.discount_price && (
              <span className="text-sm line-through text-muted-foreground">
                {product.price.toFixed(2)}€
              </span>
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="px-4 pb-4">
        <Button
          onClick={handleAddToCart}
          disabled={isLoading || product.stock_quantity === 0}
          className="w-full transition-all duration-300 hover:shadow-glow"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              Ajout...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              {product.stock_quantity === 0 ? 'Épuisé' : 'Ajouter au panier'}
            </div>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};