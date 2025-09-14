import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag, CreditCard } from 'lucide-react';
import { RootState } from '../store/store';
import { updateQuantity, removeFromCart, clearCart } from '../store/slices/cartSlice';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import toast from 'react-hot-toast';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, total, itemCount } = useSelector((state: RootState) => state.cart);
  const [isProcessing, setIsProcessing] = useState(false);

  const updateItemQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) {
      dispatch(removeFromCart(id));
      toast.success('Item removed from cart');
    } else {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    }
  };

  const removeItem = (id: string) => {
    dispatch(removeFromCart(id));
    toast.success('Item removed from cart');
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.success('Cart cleared');
  };

  const handleCheckout = () => {
    setIsProcessing(true);
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      toast.success('Redirecting to checkout...');
      navigate('/checkout');
    }, 1500);
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
              <ShoppingBag className="w-12 h-12 text-muted-foreground" />
            </div>
            
            <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Looks like you haven't added any items to your cart yet. 
              Start shopping to fill it up!
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

  const shipping = total > 999 ? 0 : 99;
  const tax = Math.round(total * 0.18); // 18% GST
  const finalTotal = total + shipping + tax;

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
              <h1 className="text-3xl font-bold mb-2">Shopping Cart</h1>
              <p className="text-muted-foreground">
                {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="outline">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Continue Shopping
                </Button>
              </Link>
              
              {items.length > 1 && (
                <Button variant="destructive" onClick={handleClearCart}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear Cart
                </Button>
              )}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card border border-border rounded-xl p-6"
              >
                <div className="flex items-center space-x-4">
                  {/* Product Image */}
                  <div className="w-20 h-20 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold truncate mb-1">{item.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{item.category}</p>
                    
                    {item.inStock ? (
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        In Stock
                      </Badge>
                    ) : (
                      <Badge variant="destructive">
                        Out of Stock
                      </Badge>
                    )}
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                      disabled={!item.inStock}
                    >
                      <Minus className="w-3 h-3" />
                    </Button>
                    
                    <span className="w-8 text-center text-sm font-medium">
                      {item.quantity}
                    </span>
                    
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                      disabled={!item.inStock}
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>

                  {/* Price */}
                  <div className="text-right">
                    <p className="font-semibold text-lg">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      ₹{item.price.toLocaleString()} each
                    </p>
                  </div>

                  {/* Remove Button */}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => removeItem(item.id)}
                    className="text-destructive hover:text-destructive-foreground hover:bg-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:sticky lg:top-4"
          >
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal ({itemCount} items)</span>
                  <span className="font-medium">₹{total.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="flex items-center">
                    Shipping
                    {shipping === 0 && (
                      <Badge className="ml-2 text-xs bg-green-100 text-green-700">
                        FREE
                      </Badge>
                    )}
                  </span>
                  <span className="font-medium">
                    {shipping === 0 ? 'FREE' : `₹${shipping}`}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span>Tax (18% GST)</span>
                  <span className="font-medium">₹{tax.toLocaleString()}</span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>₹{finalTotal.toLocaleString()}</span>
                </div>
              </div>

              {shipping > 0 && (
                <div className="mb-6 p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    💡 Add ₹{(999 - total).toLocaleString()} more to get free shipping!
                  </p>
                </div>
              )}

              <Button 
                className="w-full btn-hero" 
                size="lg"
                onClick={handleCheckout}
                disabled={isProcessing || !items.some(item => item.inStock)}
              >
                {isProcessing ? (
                  <div className="flex items-center">
                    <div className="loading-dots mr-2">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    Processing...
                  </div>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4 mr-2" />
                    Proceed to Checkout
                  </>
                )}
              </Button>

              <div className="mt-4 text-center">
                <p className="text-xs text-muted-foreground">
                  🔒 Secure checkout with 256-bit SSL encryption
                </p>
              </div>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-border">
                <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
                  <div className="text-center">
                    <div className="w-8 h-8 mx-auto mb-2 bg-green-100 rounded-full flex items-center justify-center">
                      ✓
                    </div>
                    <p>Free Returns</p>
                  </div>
                  <div className="text-center">
                    <div className="w-8 h-8 mx-auto mb-2 bg-blue-100 rounded-full flex items-center justify-center">
                      🔒
                    </div>
                    <p>Secure Payment</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Cart;