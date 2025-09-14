import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, ArrowLeft, Trash2 } from 'lucide-react';
import { RootState } from '../store/store';
import { removeFromWishlist, clearWishlist } from '../store/slices/wishlistSlice';
import { addToCart } from '../store/slices/cartSlice';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import toast from 'react-hot-toast';

const Wishlist = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state: RootState) => state.wishlist);
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const removeFromWishlistHandler = (id: string) => {
    dispatch(removeFromWishlist(id));
    toast.success('Removed from wishlist');
  };

  const moveToCart = (item: any) => {
    if (!item.inStock) {
      toast.error('Product is out of stock');
      return;
    }

    dispatch(addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      inStock: item.inStock,
      category: item.category,
    }));
    
    dispatch(removeFromWishlist(item.id));
    toast.success('Moved to cart!');
  };

  const isInCart = (productId: string) => {
    return cartItems.some(item => item.id === productId);
  };

  const handleClearWishlist = () => {
    dispatch(clearWishlist());
    toast.success('Wishlist cleared');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
              <Heart className="w-12 h-12 text-muted-foreground" />
            </div>
            
            <h1 className="text-3xl font-bold mb-4">Your wishlist is empty</h1>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Save items you love to your wishlist. Review them anytime and easily move them to your bag.
            </p>
            
            <div className="space-y-4">
              <Link to="/">
                <Button size="lg" className="btn-hero">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Continue Shopping
                </Button>
              </Link>
              
              <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                <Link to="/category/electronics" className="hover:text-primary transition-colors">
                  Electronics
                </Link>
                <Link to="/category/fashion" className="hover:text-primary transition-colors">
                  Fashion
                </Link>
                <Link to="/category/home-garden" className="hover:text-primary transition-colors">
                  Home & Garden
                </Link>
                <Link to="/category/sports" className="hover:text-primary transition-colors">
                  Sports
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">My Wishlist</h1>
              <p className="text-muted-foreground">
                {items.length} {items.length === 1 ? 'item' : 'items'} saved for later
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="outline">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Continue Shopping
                </Button>
              </Link>
              
              {items.length > 0 && (
                <Button variant="destructive" onClick={handleClearWishlist}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear Wishlist
                </Button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Wishlist Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="product-card p-4 group"
            >
              {/* Product Image */}
              <div className="relative mb-4 overflow-hidden rounded-xl">
                <Link to={`/product/${item.id}`}>
                  <div className="aspect-square bg-muted relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  </div>
                </Link>

                {/* Remove from Wishlist */}
                <Button
                  size="sm"
                  variant="secondary"
                  className="absolute top-2 right-2 h-8 w-8 p-0 opacity-80 hover:opacity-100 transition-opacity"
                  onClick={() => removeFromWishlistHandler(item.id)}
                >
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>

                {/* Stock Badge */}
                {!item.inStock && (
                  <Badge variant="destructive" className="absolute top-2 left-2">
                    Out of Stock
                  </Badge>
                )}
              </div>

              {/* Product Info */}
              <div className="space-y-2 mb-4">
                <Link to={`/product/${item.id}`}>
                  <h3 className="font-semibold text-sm leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                    {item.name}
                  </h3>
                </Link>

                {/* Category */}
                <p className="text-xs text-muted-foreground uppercase tracking-wide">
                  {item.category}
                </p>

                {/* Rating */}
                <div className="flex items-center space-x-1">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-xs ${
                          i < Math.floor(item.rating)
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {item.rating}
                  </span>
                </div>

                {/* Price */}
                <div className="text-lg font-bold text-primary">
                  ₹{item.price.toLocaleString()}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                {isInCart(item.id) ? (
                  <Link to="/cart">
                    <Button variant="outline" className="w-full">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      View in Cart
                    </Button>
                  </Link>
                ) : (
                  <Button
                    onClick={() => moveToCart(item)}
                    disabled={!item.inStock}
                    className="w-full"
                    variant={item.inStock ? "default" : "secondary"}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    {item.inStock ? 'Move to Cart' : 'Out of Stock'}
                  </Button>
                )}
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFromWishlistHandler(item.id)}
                  className="w-full text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Remove
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Action Bar */}
        {items.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 text-center"
          >
            <div className="bg-muted/30 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-2">Ready to shop?</h3>
              <p className="text-muted-foreground mb-4">
                Move all your favorite items to cart and checkout easily
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => {
                    const availableItems = items.filter(item => item.inStock);
                    availableItems.forEach(item => moveToCart(item));
                  }}
                  disabled={!items.some(item => item.inStock)}
                  className="btn-hero"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Move All to Cart
                </Button>
                
                <Link to="/">
                  <Button variant="outline">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;