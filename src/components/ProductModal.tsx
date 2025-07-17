import { useState } from "react";
import { Product } from "@/types/cosmetics";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Star, 
  Heart, 
  ShoppingCart, 
  Minus, 
  Plus, 
  Package, 
  Droplets,
  Info
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart?: (product: Product, quantity: number) => void;
  onToggleFavorite?: (productId: string) => void;
  isFavorite?: boolean;
}

export const ProductModal = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onToggleFavorite,
  isFavorite = false,
}: ProductModalProps) => {
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!product) return null;

  const handleAddToCart = async () => {
    setIsLoading(true);
    await onAddToCart?.(product, quantity);
    setIsLoading(false);
  };

  const handleToggleFavorite = () => {
    onToggleFavorite?.(product.id);
  };

  const discountPercentage = product.discount_price 
    ? Math.round(((product.price - product.discount_price) / product.price) * 100)
    : 0;

  const averageRating = product.reviews?.length 
    ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length
    : 0;

  const images = product.images?.length ? product.images : [product.image_url].filter(Boolean);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary">
            {product.name}
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-gradient-warm rounded-lg overflow-hidden">
              {images.length > 0 ? (
                <img
                  src={images[selectedImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-secondary/20">
                  <div className="text-8xl">💄</div>
                </div>
              )}
            </div>
            
            {/* Thumbnail Images */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={cn(
                      "flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all",
                      index === selectedImageIndex 
                        ? "border-primary" 
                        : "border-transparent hover:border-primary/50"
                    )}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Product Details */}
          <div className="space-y-4">
            {/* Brand and Category */}
            <div className="flex items-center gap-2">
              {product.brand && (
                <Badge variant="outline">
                  {product.brand.name}
                </Badge>
              )}
              {product.category && (
                <Badge variant="secondary">
                  {product.category.name}
                </Badge>
              )}
            </div>
            
            {/* Stock and Discount */}
            <div className="flex items-center gap-2">
              {discountPercentage > 0 && (
                <Badge className="bg-destructive text-destructive-foreground">
                  -{discountPercentage}%
                </Badge>
              )}
              
              {product.stock_quantity <= 5 && product.stock_quantity > 0 && (
                <Badge className="bg-accent text-accent-foreground">
                  <Package className="h-3 w-3 mr-1" />
                  Stock limité ({product.stock_quantity})
                </Badge>
              )}
              
              {product.stock_quantity === 0 && (
                <Badge className="bg-muted text-muted-foreground">
                  Épuisé
                </Badge>
              )}
            </div>
            
            {/* Rating */}
            {averageRating > 0 && (
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-4 w-4",
                        i < averageRating ? "fill-primary text-primary" : "text-muted-foreground"
                      )}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {averageRating.toFixed(1)} ({product.reviews?.length || 0} avis)
                </span>
              </div>
            )}
            
            {/* Price */}
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold text-primary">
                {product.discount_price ? product.discount_price.toFixed(2) : product.price.toFixed(2)}€
              </span>
              {product.discount_price && (
                <span className="text-xl line-through text-muted-foreground">
                  {product.price.toFixed(2)}€
                </span>
              )}
            </div>
            
            {/* Description */}
            <p className="text-muted-foreground">
              {product.description}
            </p>
            
            {/* Skin Type */}
            {product.skin_type && product.skin_type.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Droplets className="h-4 w-4" />
                  Types de peau
                </h4>
                <div className="flex gap-1 flex-wrap">
                  {product.skin_type.map((type) => (
                    <Badge key={type} variant="outline">
                      {type}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            {/* Ingredients */}
            {product.ingredients && (
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  Ingrédients
                </h4>
                <p className="text-sm text-muted-foreground">
                  {product.ingredients}
                </p>
              </div>
            )}
            
            {/* Usage Instructions */}
            {product.usage_instructions && (
              <div>
                <h4 className="font-semibold mb-2">Mode d'emploi</h4>
                <p className="text-sm text-muted-foreground">
                  {product.usage_instructions}
                </p>
              </div>
            )}
            
            <Separator />
            
            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="font-semibold">Quantité:</span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="min-w-[3rem] text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.min(product.stock_quantity, quantity + 1))}
                    disabled={quantity >= product.stock_quantity}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button
                  onClick={handleAddToCart}
                  disabled={isLoading || product.stock_quantity === 0}
                  className="flex-1 transition-all duration-300 hover:shadow-glow"
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
                
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleToggleFavorite}
                  className={cn(
                    "transition-all duration-300",
                    isFavorite && "bg-destructive text-destructive-foreground border-destructive"
                  )}
                >
                  <Heart className={cn("h-4 w-4", isFavorite && "fill-current")} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};