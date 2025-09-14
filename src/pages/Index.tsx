import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Truck, Shield, Headphones, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { RootState } from '../store/store';
import { setProducts } from '../store/slices/productSlice';
import { mockProducts } from '../data/products';
import ProductCard from '../components/ProductCard';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import heroBanner from '../assets/hero-banner.jpg';

const categories = [
  {
    name: 'Electronics',
    slug: 'electronics',
    icon: '📱',
    description: 'Latest gadgets & tech',
    color: 'from-blue-500 to-purple-600'
  },
  {
    name: 'Fashion',
    slug: 'fashion',
    icon: '👕',
    description: 'Trending styles',
    color: 'from-pink-500 to-orange-500'
  },
  {
    name: 'Home & Garden',
    slug: 'home-garden',
    icon: '🏠',
    description: 'Home essentials',
    color: 'from-green-500 to-teal-600'
  },
  {
    name: 'Sports',
    slug: 'sports',
    icon: '⚽',
    description: 'Fitness & sports gear',
    color: 'from-red-500 to-yellow-500'
  },
  {
    name: 'Books',
    slug: 'books',
    icon: '📚',
    description: 'Knowledge & stories',
    color: 'from-indigo-500 to-blue-600'
  },
  {
    name: 'Toys',
    slug: 'toys',
    icon: '🧸',
    description: 'Fun for all ages',
    color: 'from-purple-500 to-pink-500'
  }
];

const features = [
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'Free delivery on orders over ₹999',
    color: 'text-green-500'
  },
  {
    icon: Shield,
    title: 'Secure Payment',
    description: '100% secure & encrypted payments',
    color: 'text-blue-500'
  },
  {
    icon: RotateCcw,
    title: 'Easy Returns',
    description: '30-day easy return policy',
    color: 'text-orange-500'
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Round-the-clock customer support',
    color: 'text-purple-500'
  }
];

const Index = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(setProducts(mockProducts));
  }, [dispatch]);

  const featuredProducts = products.slice(0, 8);
  const trendingProducts = products.filter(p => p.rating >= 4.7).slice(0, 6);
  const dealsProducts = products.filter(p => p.originalPrice && p.originalPrice > p.price).slice(0, 4);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="container mx-auto px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white"
            >
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                🎉 Now Live - Grand Opening Sale!
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Your One-Stop
                <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  Shopping Destination
                </span>
              </h1>
              
              <p className="text-xl mb-8 text-white/90 max-w-lg">
                Discover amazing products, unbeatable prices, and exceptional service. 
                Shop from thousands of products across all categories.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/category/electronics">
                  <Button size="lg" className="btn-hero">
                    Shop Now
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="#features">
                  <Button size="lg" variant="outline" className="btn-outline-hero">
                    Learn More
                  </Button>
                </Link>
              </div>

              <div className="mt-8 flex items-center space-x-6 text-sm text-white/80">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-300 mr-1" />
                  <span>4.8/5 Rating</span>
                </div>
                <div>50,000+ Happy Customers</div>
                <div>Free Delivery</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10">
                <img
                  src={heroBanner}
                  alt="Shopping Products"
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-full h-full bg-gradient-to-br from-white/20 to-transparent rounded-2xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Shop by Category
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our wide range of categories and find exactly what you're looking for
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
          >
            {categories.map((category, index) => (
              <motion.div key={category.slug} variants={itemVariants}>
                <Link
                  to={`/category/${category.slug}`}
                  className="block group"
                >
                  <div className="product-card p-6 text-center h-full">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center text-2xl text-white shadow-lg group-hover:shadow-xl transition-shadow`}>
                      {category.icon}
                    </div>
                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {category.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                className="text-center group"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-muted/50 flex items-center justify-center group-hover:bg-muted transition-colors">
                  <feature.icon className={`w-8 h-8 ${feature.color}`} />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Deals Section */}
      {dealsProducts.length > 0 && (
        <section className="py-20 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-secondary text-secondary-foreground">
                🔥 Hot Deals
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Limited Time Offers
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Don't miss out on these incredible deals - limited stock available!
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {dealsProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mt-8"
            >
              <Link to="/deals">
                <Button size="lg" className="btn-hero">
                  View All Deals
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* Trending Products */}
      {trendingProducts.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Trending Now
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Discover what's popular with our customers right now
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
              {trendingProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Featured Products
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our handpicked selection of the best products across all categories
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featuredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <Link to="/products">
                <Button size="lg" variant="outline" className="btn-outline-hero">
                  View All Products
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Stay Updated with Latest Deals
            </h2>
            <p className="text-white/90 max-w-2xl mx-auto mb-8">
              Subscribe to our newsletter and get exclusive offers, new product updates, 
              and special discounts delivered to your inbox.
            </p>
            
            <div className="max-w-md mx-auto">
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 rounded-lg border border-white/20 bg-white/10 text-white placeholder-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/30"
                />
                <Button className="bg-white text-primary hover:bg-white/90 px-8">
                  Subscribe
                </Button>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-center space-x-6 text-sm text-white/80">
              <span>📧 Weekly Deals</span>
              <span>🎁 Exclusive Offers</span>
              <span>🔒 No Spam</span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;