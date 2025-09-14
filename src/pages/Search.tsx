import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Search as SearchIcon, Filter, Grid3X3, List, ArrowLeft, X } from 'lucide-react';
import { RootState } from '../store/store';
import { Product } from '../store/slices/productSlice';
import ProductCard from '../components/ProductCard';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Separator } from '../components/ui/separator';
import { Slider } from '../components/ui/slider';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products } = useSelector((state: RootState) => state.products);
  
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('relevance');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRating, setSelectedRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  // Get unique categories
  const categories = Array.from(new Set(products.map(p => p.category)));

  useEffect(() => {
    const query = searchParams.get('q') || '';
    setSearchQuery(query);
  }, [searchParams]);

  useEffect(() => {
    let filtered = products.filter(product => {
      // Search query filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDescription = product.description.toLowerCase().includes(query);
        const matchesCategory = product.category.toLowerCase().includes(query);
        const matchesBrand = product.brand.toLowerCase().includes(query);
        
        if (!matchesName && !matchesDescription && !matchesCategory && !matchesBrand) {
          return false;
        }
      }

      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }

      // Price filter
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false;
      }

      // Rating filter
      if (selectedRating > 0 && product.rating < selectedRating) {
        return false;
      }

      // Stock filter
      if (inStockOnly && !product.inStock) {
        return false;
      }

      return true;
    });

    // Sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return b.id.localeCompare(a.id);
        case 'relevance':
        default:
          // For relevance, prioritize exact name matches, then description matches
          if (searchQuery) {
            const query = searchQuery.toLowerCase();
            const aNameMatch = a.name.toLowerCase().includes(query);
            const bNameMatch = b.name.toLowerCase().includes(query);
            
            if (aNameMatch && !bNameMatch) return -1;
            if (!aNameMatch && bNameMatch) return 1;
          }
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
  }, [products, searchQuery, selectedCategory, priceRange, selectedRating, inStockOnly, sortBy]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery });
    }
  };

  const clearFilters = () => {
    setSelectedCategory('all');
    setPriceRange([0, 200000]);
    setSelectedRating(0);
    setInStockOnly(false);
    setSortBy('relevance');
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <span className="text-foreground">Search Results</span>
          </div>
          
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex-1 max-w-2xl">
              <form onSubmit={handleSearchSubmit} className="flex space-x-2">
                <div className="relative flex-1">
                  <SearchIcon className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search products, brands, categories..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-10"
                  />
                  {searchQuery && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={clearSearch}
                      className="absolute right-1 top-1 h-8 w-8 p-0 hover:bg-muted"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                <Button type="submit" className="btn-hero">
                  Search
                </Button>
              </form>
            </div>
            
            <Link to="/">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>

          {searchQuery && (
            <div className="mt-4">
              <p className="text-muted-foreground">
                {filteredProducts.length > 0 
                  ? `Found ${filteredProducts.length} results for "${searchQuery}"`
                  : `No results found for "${searchQuery}"`
                }
              </p>
            </div>
          )}
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`lg:w-80 ${isFiltersOpen ? 'block' : 'hidden lg:block'}`}
          >
            <div className="bg-card border border-border rounded-xl p-6 sticky top-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Filters</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Clear All
                </Button>
              </div>

              <div className="space-y-6">
                {/* Category Filter */}
                <div>
                  <label className="text-sm font-medium mb-3 block">Category</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                {/* Price Range */}
                <div>
                  <label className="text-sm font-medium mb-4 block">
                    Price Range: ₹{priceRange[0].toLocaleString()} - ₹{priceRange[1].toLocaleString()}
                  </label>
                  <Slider
                    min={0}
                    max={200000}
                    step={1000}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>₹0</span>
                    <span>₹2,00,000</span>
                  </div>
                </div>

                <Separator />

                {/* Rating Filter */}
                <div>
                  <label className="text-sm font-medium mb-3 block">Minimum Rating</label>
                  <div className="space-y-2">
                    {[4, 3, 2, 1].map((rating) => (
                      <label key={rating} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="rating"
                          value={rating}
                          checked={selectedRating === rating}
                          onChange={(e) => setSelectedRating(Number(e.target.value))}
                          className="text-primary"
                        />
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={`text-sm ${
                                i < rating ? 'text-yellow-400' : 'text-gray-300'
                              }`}
                            >
                              ★
                            </span>
                          ))}
                          <span className="ml-2 text-sm text-muted-foreground">& Up</span>
                        </div>
                      </label>
                    ))}
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="rating"
                        value={0}
                        checked={selectedRating === 0}
                        onChange={(e) => setSelectedRating(Number(e.target.value))}
                        className="text-primary"
                      />
                      <span className="text-sm text-muted-foreground">All Ratings</span>
                    </label>
                  </div>
                </div>

                <Separator />

                {/* Stock Filter */}
                <div>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={inStockOnly}
                      onChange={(e) => setInStockOnly(e.target.checked)}
                      className="text-primary"
                    />
                    <span className="text-sm font-medium">In Stock Only</span>
                  </label>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Results Section */}
          <div className="flex-1">
            {/* Toolbar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card border border-border rounded-xl p-4 mb-6"
            >
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                    className="lg:hidden"
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                  </Button>
                  
                  <div className="hidden sm:flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">View:</span>
                    <div className="flex border border-border rounded-lg overflow-hidden">
                      <Button
                        variant={viewMode === 'grid' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setViewMode('grid')}
                        className="rounded-none"
                      >
                        <Grid3X3 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant={viewMode === 'list' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setViewMode('list')}
                        className="rounded-none"
                      >
                        <List className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <span className="text-sm text-muted-foreground">Sort by:</span>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relevance">Relevance</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                      <SelectItem value="newest">Newest First</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </motion.div>

            {/* Active Filters */}
            {(selectedCategory !== 'all' || priceRange[0] > 0 || priceRange[1] < 200000 || selectedRating > 0 || inStockOnly) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
              >
                <div className="flex items-center space-x-2 flex-wrap gap-2">
                  <span className="text-sm font-medium">Active Filters:</span>
                  
                  {selectedCategory !== 'all' && (
                    <Badge variant="secondary">
                      Category: {selectedCategory}
                    </Badge>
                  )}
                  
                  {(priceRange[0] > 0 || priceRange[1] < 200000) && (
                    <Badge variant="secondary">
                      ₹{priceRange[0].toLocaleString()} - ₹{priceRange[1].toLocaleString()}
                    </Badge>
                  )}
                  
                  {selectedRating > 0 && (
                    <Badge variant="secondary">
                      {selectedRating}★ & Up
                    </Badge>
                  )}
                  
                  {inStockOnly && (
                    <Badge variant="secondary">
                      In Stock Only
                    </Badge>
                  )}
                </div>
              </motion.div>
            )}

            {/* Results Grid */}
            {filteredProducts.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className={`grid gap-6 ${
                  viewMode === 'grid'
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                    : 'grid-cols-1'
                }`}
              >
                {filteredProducts.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={index}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-20"
              >
                <div className="w-24 h-24 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
                  <SearchIcon className="w-12 h-12 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {searchQuery ? `No results found for "${searchQuery}"` : 'Start your search'}
                </h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  {searchQuery 
                    ? 'Try different keywords or adjust your filters to find what you\'re looking for.'
                    : 'Enter a search term to find products, brands, or categories.'
                  }
                </p>
                <div className="space-y-3">
                  {searchQuery ? (
                    <div className="space-x-2">
                      <Button onClick={clearSearch}>Clear Search</Button>
                      <Button variant="outline" onClick={clearFilters}>
                        Clear Filters
                      </Button>
                    </div>
                  ) : (
                    <Link to="/">
                      <Button>Browse Categories</Button>
                    </Link>
                  )}
                </div>
              </motion.div>
            )}

            {/* Popular Searches - shown when no search query */}
            {!searchQuery && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-12"
              >
                <h3 className="text-lg font-semibold mb-4">Popular Searches</h3>
                <div className="flex flex-wrap gap-2">
                  {['iPhone', 'Laptop', 'Shoes', 'Headphones', 'Sofa', 'Books', 'Toys', 'Jeans'].map((term) => (
                    <Badge
                      key={term}
                      variant="outline"
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                      onClick={() => {
                        setSearchQuery(term);
                        setSearchParams({ q: term });
                      }}
                    >
                      {term}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;