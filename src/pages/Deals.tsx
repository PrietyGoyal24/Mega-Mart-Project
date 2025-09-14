import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { ArrowLeft, Filter, SortAsc } from 'lucide-react';
import { Link } from 'react-router-dom';
import { RootState } from '../store/store';
import ProductCard from '../components/ProductCard';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

const Deals = () => {
  const { products } = useSelector((state: RootState) => state.products);
  const [sortBy, setSortBy] = useState('discount');
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  
  // Get only products with deals (have originalPrice > price)
  const dealsProducts = products.filter(p => p.originalPrice && p.originalPrice > p.price);

  useEffect(() => {
    let sorted = [...dealsProducts];
    
    switch (sortBy) {
      case 'discount':
        sorted.sort((a, b) => {
          const discountA = ((a.originalPrice! - a.price) / a.originalPrice!) * 100;
          const discountB = ((b.originalPrice! - b.price) / b.originalPrice!) * 100;
          return discountB - discountA;
        });
        break;
      case 'price-low':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }
    
    setFilteredProducts(sorted);
  }, [dealsProducts, sortBy]);

  const getDiscountPercentage = (originalPrice: number, currentPrice: number) => {
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-r from-red-500 to-orange-500 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-6">
            <Link to="/">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <Badge className="mb-4 bg-white/20 text-white border-white/30">
              🔥 Hot Deals
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Limited Time Offers
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Don't miss out on these incredible deals - save up to 70% on selected items!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters & Sort */}
      <section className="py-6 border-b bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                {filteredProducts.length} deals found
              </span>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <SortAsc className="w-4 h-4 text-muted-foreground" />
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="discount">Highest Discount</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {filteredProducts.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  {/* Discount Badge */}
                  <div className="absolute top-2 left-2 z-10">
                    <Badge className="bg-red-500 text-white">
                      {getDiscountPercentage(product.originalPrice, product.price)}% OFF
                    </Badge>
                  </div>
                  <ProductCard product={product} index={index} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🎯</div>
              <h2 className="text-2xl font-semibold mb-2">No deals available</h2>
              <p className="text-muted-foreground mb-6">
                Check back later for amazing deals and offers!
              </p>
              <Link to="/">
                <Button>Continue Shopping</Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Never Miss a Deal!</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Subscribe to get notified about flash sales and exclusive deals
          </p>
          <div className="flex gap-2 max-w-sm mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-lg border border-input bg-background"
            />
            <Button>Subscribe</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Deals;