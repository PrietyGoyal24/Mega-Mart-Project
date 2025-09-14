import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { Search, ShoppingCart, Heart, User, Menu, X, Settings } from 'lucide-react';
import { RootState } from '../store/store';
import { logout } from '../store/slices/authSlice';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';

const categories = [
  'Electronics',
  'Fashion', 
  'Home & Garden',
  'Sports',
  'Books',
  'Toys'
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const { itemCount } = useSelector((state: RootState) => state.cart);
  const { items: wishlistItems } = useSelector((state: RootState) => state.wishlist);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <>
      {/* Top Banner */}
      <div className="bg-gradient-primary text-white py-2 px-4 text-center text-sm">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="container mx-auto"
        >
          🎉 Welcome to Mega Mart! Free shipping on orders over ₹999 🚚
        </motion.div>
      </div>

      {/* Main Navbar */}
      <nav className="navbar-glass sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent"
              >
                🛍️ Mega Mart
              </motion.div>
            </Link>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-xl mx-8">
              <form onSubmit={handleSearch} className="flex w-full">
                <Input
                  type="text"
                  placeholder="Search products, brands and more..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="rounded-r-none border-r-0 focus:ring-0"
                />
                <Button 
                  type="submit"
                  className="rounded-l-none px-4 bg-primary hover:bg-primary-hover"
                >
                  <Search className="w-4 h-4" />
                </Button>
              </form>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              {/* Wishlist */}
              <Link to="/wishlist" className="hidden md:flex relative">
                <Button variant="ghost" size="sm" className="relative">
                  <Heart className="w-5 h-5" />
                  {wishlistItems.length > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs bg-secondary">
                      {wishlistItems.length}
                    </Badge>
                  )}
                </Button>
              </Link>

              {/* Cart */}
              <Link to="/cart" className="relative">
                <Button variant="ghost" size="sm" className="relative">
                  <ShoppingCart className="w-5 h-5" />
                  {itemCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs bg-secondary">
                      {itemCount}
                    </Badge>
                  )}
                </Button>
              </Link>

              {/* User Menu */}
              {isAuthenticated ? (
                <div className="hidden md:flex items-center space-x-2">
                  <Link to="/profile">
                    <Button variant="ghost" size="sm">
                      <User className="w-5 h-5 mr-2" />
                      {user?.name}
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm" onClick={handleLogout}>
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="hidden md:flex items-center space-x-2">
                  <Link to="/login">
                    <Button variant="ghost" size="sm">Login</Button>
                  </Link>
                  <Link to="/register">
                    <Button size="sm" className="btn-hero">Sign Up</Button>
                  </Link>
                </div>
              )}

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Categories Bar - Desktop */}
          <div className="hidden md:flex py-2 space-x-6 border-t border-border/50">
            {categories.map((category) => (
              <Link
                key={category}
                to={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-lg"
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="flex">
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="rounded-r-none border-r-0"
                />
                <Button 
                  type="submit"
                  className="rounded-l-none px-4 bg-primary hover:bg-primary-hover"
                >
                  <Search className="w-4 h-4" />
                </Button>
              </form>

              {/* Mobile Categories */}
              <div className="grid grid-cols-2 gap-2">
                {categories.map((category) => (
                  <Link
                    key={category}
                    to={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors p-2 rounded-lg hover:bg-muted"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {category}
                  </Link>
                ))}
              </div>

              {/* Mobile User Menu */}
              <div className="pt-4 border-t border-border/50">
                {isAuthenticated ? (
                  <div className="space-y-2">
                    <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start">
                        <User className="w-4 h-4 mr-2" />
                        Profile
                      </Button>
                    </Link>
                    <Link to="/settings" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start">
                        <Settings className="w-4 h-4 mr-2" />
                        Settings
                      </Button>
                    </Link>
                    <Link to="/wishlist" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start">
                        <Heart className="w-4 h-4 mr-2" />
                        Wishlist ({wishlistItems.length})
                      </Button>
                    </Link>
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                    >
                      Logout
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="ghost" className="w-full">Login</Button>
                    </Link>
                    <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                      <Button className="w-full btn-hero">Sign Up</Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </nav>
    </>
  );
};

export default Navbar;