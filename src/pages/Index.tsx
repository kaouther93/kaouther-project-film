import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Product, Category, Brand } from "@/types/cosmetics";
import { ProductCard } from "@/components/ProductCard";
import { ProductModal } from "@/components/ProductModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Sparkles, 
  Heart, 
  ShoppingCart, 
  User as UserIcon, 
  Search,
  Filter,
  Star,
  LogOut
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Session, User } from "@supabase/supabase-js";

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [cartItems, setCartItems] = useState<number>(0);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  // Auth state management
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        // Load categories
        const { data: categoriesData } = await supabase
          .from('categories')
          .select('*')
          .order('name');
        
        // Load brands
        const { data: brandsData } = await supabase
          .from('brands')
          .select('*')
          .order('name');
        
        // Load products with relationships
        const { data: productsData } = await supabase
          .from('products')
          .select(`
            *,
            category:categories(*),
            brand:brands(*),
            reviews(*)
          `)
          .eq('is_active', true)
          .order('name');
        
        setCategories(categoriesData || []);
        setBrands(brandsData || []);
        setProducts(productsData || []);
      } catch (error) {
        console.error('Error loading data:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les produits.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [toast]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      // Search term filter
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        const matchesSearch = 
          product.name.toLowerCase().includes(term) ||
          product.description?.toLowerCase().includes(term) ||
          product.brand?.name.toLowerCase().includes(term) ||
          product.category?.name.toLowerCase().includes(term);
        if (!matchesSearch) return false;
      }

      // Category filter
      if (selectedCategory !== 'all' && product.category_id !== selectedCategory) {
        return false;
      }

      // Brand filter
      if (selectedBrand !== 'all' && product.brand_id !== selectedBrand) {
        return false;
      }

      return true;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price_asc':
          return (a.discount_price || a.price) - (b.discount_price || b.price);
        case 'price_desc':
          return (b.discount_price || b.price) - (a.discount_price || a.price);
        case 'name':
          return a.name.localeCompare(b.name);
        case 'newest':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        default:
          return 0;
      }
    });

    return filtered;
  }, [products, searchTerm, selectedCategory, selectedBrand, sortBy]);

  const handleAddToCart = async (product: Product, quantity: number = 1) => {
    if (!user) {
      toast({
        title: "Connexion requise",
        description: "Veuillez vous connecter pour ajouter des produits au panier.",
        variant: "destructive",
      });
      navigate('/auth');
      return;
    }

    try {
      // Check if item already exists in cart
      const { data: existingItem } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', user.id)
        .eq('product_id', product.id)
        .single();

      if (existingItem) {
        // Update quantity
        await supabase
          .from('cart_items')
          .update({ quantity: existingItem.quantity + quantity })
          .eq('id', existingItem.id);
      } else {
        // Insert new item
        await supabase
          .from('cart_items')
          .insert({
            user_id: user.id,
            product_id: product.id,
            quantity
          });
      }

      setCartItems(prev => prev + quantity);
      toast({
        title: "Produit ajouté",
        description: `${product.name} a été ajouté à votre panier.`,
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter le produit au panier.",
        variant: "destructive",
      });
    }
  };

  const handleToggleFavorite = (productId: string) => {
    if (!user) {
      toast({
        title: "Connexion requise",
        description: "Veuillez vous connecter pour ajouter des favoris.",
        variant: "destructive",
      });
      navigate('/auth');
      return;
    }

    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setFavorites([]);
    setCartItems(0);
    toast({
      title: "Déconnexion",
      description: "Vous avez été déconnecté avec succès.",
    });
  };

  // Statistics
  const stats = useMemo(() => {
    const totalProducts = products.length;
    const totalCategories = categories.length;
    const totalBrands = brands.length;
    const averagePrice = products.length > 0 
      ? products.reduce((sum, p) => sum + (p.discount_price || p.price), 0) / products.length
      : 0;

    return {
      totalProducts,
      totalCategories,
      totalBrands,
      averagePrice
    };
  }, [products, categories, brands]);

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <div className="relative bg-gradient-hero text-white">
        <div className="container mx-auto px-4 py-16">
          {/* Navigation */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">Belle Cosmétique</h1>
            <div className="flex items-center gap-4">
              {user ? (
                <div className="flex items-center gap-2">
                  <Button variant="ghost" className="text-white hover:bg-white/10">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Panier ({cartItems})
                  </Button>
                  <Button variant="ghost" className="text-white hover:bg-white/10">
                    <Heart className="w-4 h-4 mr-2" />
                    Favoris ({favorites.length})
                  </Button>
                  <Button variant="ghost" className="text-white hover:bg-white/10">
                    <UserIcon className="w-4 h-4 mr-2" />
                    {user.email}
                  </Button>
                  <Button 
                    variant="ghost" 
                    onClick={handleLogout}
                    className="text-white hover:bg-white/10"
                  >
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <Button 
                  variant="secondary" 
                  onClick={() => navigate('/auth')}
                  className="bg-white/10 text-white border-white/20 hover:bg-white/20"
                >
                  Se connecter
                </Button>
              )}
            </div>
          </div>
          
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Sparkles className="w-8 h-8" />
              </div>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-4">
              Belle Cosmétique
            </h2>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              Découvrez notre collection de cosmétiques de luxe
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center justify-center mb-2">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div className="text-2xl font-bold">{stats.totalProducts}</div>
                <div className="text-sm text-white/80">Produits</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center justify-center mb-2">
                  <Filter className="w-6 h-6" />
                </div>
                <div className="text-2xl font-bold">{stats.totalCategories}</div>
                <div className="text-sm text-white/80">Catégories</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center justify-center mb-2">
                  <Star className="w-6 h-6" />
                </div>
                <div className="text-2xl font-bold">{stats.totalBrands}</div>
                <div className="text-sm text-white/80">Marques</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center justify-center mb-2">
                  <Heart className="w-6 h-6" />
                </div>
                <div className="text-2xl font-bold">{stats.averagePrice.toFixed(0)}€</div>
                <div className="text-sm text-white/80">Prix moy.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher des produits..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Toutes les catégories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les catégories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {/* Brand Filter */}
            <Select value={selectedBrand} onValueChange={setSelectedBrand}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Toutes les marques" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les marques</SelectItem>
                {brands.map((brand) => (
                  <SelectItem key={brand.id} value={brand.id}>
                    {brand.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Nom</SelectItem>
                <SelectItem value="price_asc">Prix croissant</SelectItem>
                <SelectItem value="price_desc">Prix décroissant</SelectItem>
                <SelectItem value="newest">Plus récent</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold">
              {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} trouvé{filteredProducts.length > 1 ? 's' : ''}
            </h2>
            {searchTerm && (
              <Badge variant="secondary">
                pour "{searchTerm}"
              </Badge>
            )}
          </div>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-muted rounded-lg aspect-square mb-4"></div>
                <div className="h-4 bg-muted rounded mb-2"></div>
                <div className="h-3 bg-muted rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <Card className="text-center py-16">
            <CardContent>
              <Sparkles className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Aucun produit trouvé</h3>
              <p className="text-muted-foreground mb-4">
                Essayez de modifier vos critères de recherche ou vos filtres
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setSelectedBrand('all');
                  setSortBy('name');
                }}
              >
                Effacer tous les filtres
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onToggleFavorite={handleToggleFavorite}
                onClick={setSelectedProduct}
                isFavorite={favorites.includes(product.id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onToggleFavorite={handleToggleFavorite}
        isFavorite={selectedProduct ? favorites.includes(selectedProduct.id) : false}
      />
    </div>
  );
};

export default Index;
