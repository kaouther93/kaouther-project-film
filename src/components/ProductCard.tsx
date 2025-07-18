import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ShoppingCart, 
  Heart, 
  Eye,
  Star
} from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { Link } from 'react-router-dom';

interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  discount_price?: number;
  image_url?: string;
  stock_quantity: number;
  brand?: {
    name: string;
  };
  category?: {
    name: string;
  };
}

interface ProductCardProps {
  product: Product;
  showCategory?: boolean;
}

export function ProductCard({ product, showCategory = true }: ProductCardProps) {
  const { addToCart } = useCart();

  const finalPrice = product.discount_price || product.price;
  const hasDiscount = product.discount_price && product.discount_price < product.price;
  const discountPercentage = hasDiscount 
    ? Math.round(((product.price - product.discount_price!) / product.price) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product.id);
  };

  return (
    <Card className="group overflow-hidden hover:shadow-product transition-all duration-300 hover:-translate-y-1">
      <Link to={`/product/${product.id}`}>
        <div className="relative overflow-hidden">
          {/* Product Image */}
          <div className="aspect-square bg-muted relative">
            {product.image_url ? (
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-20 h-20 bg-muted-foreground/20 rounded-lg flex items-center justify-center">
                  <ShoppingCart className="w-8 h-8 text-muted-foreground" />
                </div>
              </div>
            )}
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {hasDiscount && (
              <Badge variant="destructive" className="text-xs font-bold">
                -{discountPercentage}%
              </Badge>
            )}
            {product.stock_quantity <= 5 && product.stock_quantity > 0 && (
              <Badge variant="secondary" className="text-xs">
                Stock limité
              </Badge>
            )}
            {product.stock_quantity === 0 && (
              <Badge variant="destructive" className="text-xs">
                Rupture
              </Badge>
            )}
          </div>

          {/* Quick Actions */}
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex flex-col gap-2">
              <Button size="sm" variant="secondary" className="w-8 h-8 p-0">
                <Heart className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="secondary" className="w-8 h-8 p-0">
                <Eye className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <CardContent className="p-4">
          {/* Category & Brand */}
          {showCategory && (product.category || product.brand) && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
              {product.category && (
                <span>{product.category.name}</span>
              )}
              {product.category && product.brand && (
                <span>•</span>
              )}
              {product.brand && (
                <span>{product.brand.name}</span>
              )}
            </div>
          )}

          {/* Product Name */}
          <h3 className="font-semibold text-sm mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>

          {/* Description */}
          {product.description && (
            <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
              {product.description}
            </p>
          )}

          {/* Price */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg font-bold text-primary">
              {finalPrice.toFixed(2)} €
            </span>
            {hasDiscount && (
              <span className="text-sm line-through text-muted-foreground">
                {product.price.toFixed(2)} €
              </span>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'
                }`}
              />
            ))}
            <span className="text-xs text-muted-foreground ml-1">(4.0)</span>
          </div>

          {/* Add to Cart Button */}
          <Button
            className="w-full"
            size="sm"
            onClick={handleAddToCart}
            disabled={product.stock_quantity === 0}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            {product.stock_quantity === 0 ? 'Rupture' : 'Ajouter au panier'}
          </Button>
        </CardContent>
      </Link>
    </Card>
  );
}