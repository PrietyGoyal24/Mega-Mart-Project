import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { 
  Heart, ShoppingCart, Star, Truck, Shield, RotateCcw, 
  Share2, ArrowLeft, Plus, Minus, ZoomIn, Check, X 
} from 'lucide-react';
import { RootState } from '../store/store';
import { addToCart } from '../store/slices/cartSlice';
import { addToWishlist, removeFromWishlist } from '../store/slices/wishlistSlice';
import { Product } from '../store/slices/productSlice';
import ProductCard from '../components/ProductCard';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import toast from 'react-hot-toast';

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { products } = useSelector((state: RootState) => state.products);
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);

  const product = products.find(p => p.id === productId);
  const isInWishlist = wishlistItems.some(item => item.id === productId);
  const isInCart = cartItems.some(item => item.id === productId);

  useEffect(() => {
    if (!product) {
      navigate('/404');
    }
  }, [product, navigate]);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <Link to="/">
            <Button>Return to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    if (!product.inStock) {
      toast.error('Product is out of stock');
      return;
    }

    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        inStock: product.inStock,
        category: product.category,
      }));
    }
    
    toast.success(`Added ${quantity} ${quantity === 1 ? 'item' : 'items'} to cart!`);
  };

  const handleToggleWishlist = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
      toast.success('Removed from wishlist');
    } else {
      dispatch(addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        inStock: product.inStock,
        category: product.category,
        rating: product.rating,
      }));
      toast.success('Added to wishlist!');
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  // Mock reviews data
  const reviews = [
    {
      id: 1,
      user: 'Rajesh K.',
      rating: 5,
      comment: 'Excellent product! Great quality and fast delivery.',
      date: '2024-03-15',
      verified: true
    },
    {
      id: 2,
      user: 'Priya S.',
      rating: 4,
      comment: 'Good value for money. Satisfied with the purchase.',
      date: '2024-03-10',
      verified: true
    },
    {
      id: 3,
      user: 'Amit M.',
      rating: 5,
      comment: 'Amazing product! Exceeded my expectations.',
      date: '2024-03-08',
      verified: false
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link 
              to={`/category/${product.category.toLowerCase().replace(/\s+/g, '-')}`}
              className="hover:text-primary transition-colors"
            >
              {product.category}
            </Link>
            <span>/</span>
            <span className="text-foreground truncate">{product.name}</span>
          </div>
          
          <Link to={`/category/${product.category.toLowerCase().replace(/\s+/g, '-')}`}>
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to {product.category}
            </Button>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="relative aspect-square bg-muted rounded-2xl overflow-hidden group">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className={`w-full h-full object-cover transition-transform duration-300 ${
                  isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'
                }`}
                onClick={() => setIsZoomed(!isZoomed)}
              />
              
              <Button
                size="sm"
                variant="secondary"
                className="absolute top-4 right-4 opacity-80 hover:opacity-100"
                onClick={() => setIsZoomed(!isZoomed)}
              >
                <ZoomIn className="w-4 h-4" />
              </Button>

              {/* Stock Badge */}
              <div className="absolute top-4 left-4">
                {product.inStock ? (
                  <Badge className="bg-green-100 text-green-700 border-green-200">
                    <Check className="w-3 h-3 mr-1" />
                    In Stock
                  </Badge>
                ) : (
                  <Badge variant="destructive">
                    <X className="w-3 h-3 mr-1" />
                    Out of Stock
                  </Badge>
                )}
              </div>

              {/* Discount Badge */}
              {discountPercentage > 0 && (
                <Badge className="absolute top-4 left-4 mt-10 bg-secondary text-secondary-foreground">
                  {discountPercentage}% OFF
                </Badge>
              )}
            </div>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index
                        ? 'border-primary'
                        : 'border-transparent hover:border-border'
                    }`}
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
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Brand & Category */}
            <div className="space-y-2">
              <Link 
                to={`/category/${product.category.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-sm font-medium text-primary hover:underline"
              >
                {product.category}
              </Link>
              <p className="text-sm text-muted-foreground">{product.brand}</p>
            </div>

            {/* Product Name */}
            <h1 className="text-3xl font-bold leading-tight">{product.name}</h1>

            {/* Rating & Reviews */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-medium">{product.rating}</span>
              </div>
              <span className="text-muted-foreground">({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-baseline space-x-3">
                <span className="text-3xl font-bold text-primary">
                  ₹{product.price.toLocaleString()}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-lg text-muted-foreground line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                )}
                {discountPercentage > 0 && (
                  <span className="text-sm font-medium text-green-600">
                    Save ₹{(product.originalPrice! - product.price).toLocaleString()}
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                Inclusive of all taxes
              </p>
            </div>

            {/* Description */}
            <div>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div>
                <h3 className="font-semibold mb-3">Key Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2 text-sm">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Separator />

            {/* Quantity & Actions */}
            <div className="space-y-4">
              {product.inStock && (
                <div className="flex items-center space-x-4">
                  <span className="font-medium">Quantity:</span>
                  <div className="flex items-center border border-border rounded-lg">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                      className="rounded-r-none"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="px-4 py-2 font-medium">{quantity}</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleQuantityChange(1)}
                      disabled={quantity >= 10}
                      className="rounded-l-none"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    (Max 10 items)
                  </span>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="flex-1 btn-hero"
                  size="lg"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {isInCart ? 'Add More to Cart' : 'Add to Cart'}
                </Button>
                
                <Button
                  onClick={handleBuyNow}
                  disabled={!product.inStock}
                  variant="outline"
                  className="flex-1"
                  size="lg"
                >
                  Buy Now
                </Button>
                
                <Button
                  onClick={handleToggleWishlist}
                  variant="outline"
                  size="lg"
                  className="px-4"
                >
                  <Heart 
                    className={`w-5 h-5 ${isInWishlist ? 'fill-red-500 text-red-500' : ''}`}
                  />
                </Button>
              </div>
            </div>

            {/* Share */}
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>

            {/* Delivery Info */}
            <div className="bg-muted/30 rounded-lg p-4 space-y-3">
              <div className="flex items-center space-x-3">
                <Truck className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium">Free Delivery</p>
                  <p className="text-sm text-muted-foreground">
                    On orders above ₹999. Delivery by tomorrow
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <RotateCcw className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium">Easy Returns</p>
                  <p className="text-sm text-muted-foreground">
                    30-day return policy
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="font-medium">Warranty</p>
                  <p className="text-sm text-muted-foreground">
                    1 year manufacturer warranty
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Product Details Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-16"
        >
          <Tabs defaultValue="reviews" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="reviews">Reviews ({reviews.length})</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
            </TabsList>
            
            <TabsContent value="reviews" className="mt-8">
              <div className="space-y-6">
                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-4">Customer Reviews</h3>
                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <div key={review.id} className="border-b border-border last:border-0 pb-4 last:pb-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-medium">{review.user}</span>
                              {review.verified && (
                                <Badge variant="outline" className="text-xs">
                                  <Check className="w-3 h-3 mr-1" />
                                  Verified Purchase
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < review.rating
                                        ? 'text-yellow-400 fill-current'
                                        : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-muted-foreground">{review.date}</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-muted-foreground">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="specifications" className="mt-8">
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Product Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="font-medium">Brand</span>
                      <span className="text-muted-foreground">{product.brand}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Category</span>
                      <span className="text-muted-foreground">{product.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Model</span>
                      <span className="text-muted-foreground">{product.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Rating</span>
                      <span className="text-muted-foreground">{product.rating}/5</span>
                    </div>
                  </div>
                  {product.specifications && (
                    <div className="space-y-3">
                      {Object.entries(product.specifications).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="font-medium">{key}</span>
                          <span className="text-muted-foreground">{value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="shipping" className="mt-8">
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Shipping & Returns</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Delivery Information</h4>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• Free delivery on orders above ₹999</li>
                      <li>• Standard delivery: 3-5 business days</li>
                      <li>• Express delivery: 1-2 business days (charges apply)</li>
                      <li>• Cash on Delivery available</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Return Policy</h4>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• 30-day return policy</li>
                      <li>• Items must be in original condition</li>
                      <li>• Free return pickup available</li>
                      <li>• Refund processed within 5-7 business days</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-16"
          >
            <h2 className="text-2xl font-bold mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct, index) => (
                <ProductCard
                  key={relatedProduct.id}
                  product={relatedProduct}
                  index={index}
                />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;