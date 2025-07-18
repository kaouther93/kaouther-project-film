import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Header } from '@/components/Header';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ShoppingBag, 
  Star, 
  TrendingUp, 
  Package, 
  Users,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  discount_price?: number;
  image_url?: string;
  stock_quantity: number;
  brand?: { name: string };
  category?: { name: string };
}

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
}

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Load featured products
      const { data: products, error: productsError } = await supabase
        .from('products')
        .select(`
          *,
          brand:brands(name),
          category:categories(name)
        `)
        .eq('is_active', true)
        .limit(8);

      if (productsError) throw productsError;

      // Load categories
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('categories')
        .select('*')
        .limit(5);

      if (categoriesError) throw categoriesError;

      setFeaturedProducts(products || []);
      setCategories(categoriesData || []);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-subtle">
        <Header onSearchChange={setSearchTerm} searchValue={searchTerm} />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto" />
            <p className="mt-4 text-muted-foreground">Chargement...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header onSearchChange={setSearchTerm} searchValue={searchTerm} />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-hero text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                <ShoppingBag className="w-10 h-10" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Bienvenue chez{' '}
              <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                ShopSmart
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
              Découvrez des produits de beauté et de cosmétiques de qualité premium à des prix exceptionnels
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link to="/products">
                <Button size="lg" variant="secondary" className="min-w-[200px]">
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Découvrir les produits
                </Button>
              </Link>
              <Link to="/categories">
                <Button size="lg" variant="outline" className="min-w-[200px] border-white/30 text-white hover:bg-white/10">
                  <Package className="w-5 h-5 mr-2" />
                  Explorer les catégories
                </Button>
              </Link>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center justify-center mb-2">
                  <Package className="w-6 h-6" />
                </div>
                <div className="text-2xl font-bold">{featuredProducts.length}+</div>
                <div className="text-sm text-white/80">Produits</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center justify-center mb-2">
                  <Star className="w-6 h-6" />
                </div>
                <div className="text-2xl font-bold">4.8</div>
                <div className="text-sm text-white/80">Note moyenne</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center justify-center mb-2">
                  <Users className="w-6 h-6" />
                </div>
                <div className="text-2xl font-bold">10K+</div>
                <div className="text-sm text-white/80">Clients</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center justify-center mb-2">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div className="text-2xl font-bold">98%</div>
                <div className="text-sm text-white/80">Satisfaits</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Découvrez nos catégories</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explorez notre large gamme de produits de beauté soigneusement sélectionnés pour vous
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
          {categories.map((category) => (
            <Link key={category.id} to={`/category/${category.slug}`}>
              <Card className="text-center hover:shadow-product transition-all duration-300 hover:-translate-y-1 group">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-warm rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <ShoppingBag className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {category.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link to="/categories">
            <Button variant="outline" size="lg">
              Voir toutes les catégories
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Featured Products */}
      <div className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">Produits vedettes</h2>
              <p className="text-muted-foreground">
                Découvrez notre sélection de produits les plus populaires
              </p>
            </div>
            <Link to="/products">
              <Button variant="outline">
                Voir tous les produits
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          {featuredProducts.length === 0 ? (
            <Card className="text-center py-16">
              <CardContent>
                <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Aucun produit trouvé</h3>
                <p className="text-muted-foreground">
                  Les produits sont en cours de chargement...
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Special Offers */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-gradient-hero rounded-2xl p-8 md:p-12 text-white text-center">
          <div className="max-w-2xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Sparkles className="w-8 h-8" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Offres spéciales du moment
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Jusqu'à -50% sur une sélection de produits de beauté premium
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/offers">
                <Button size="lg" variant="secondary">
                  Découvrir les offres
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                S'abonner aux alertes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
