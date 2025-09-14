import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Star, Eye } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Product } from '../store/slices/productSlice';
import { addToCart } from '../store/slices/cartSlice';
import { addToWishlist, removeFromWishlist } from '../store/slices/wishlistSlice';
import { RootState } from '../store/store';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index = 0 }) => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const isInWishlist = wishlistItems.some(item => item.id === product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!product.inStock) {
      toast.error('Product is out of stock');
      return;
    }

    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      inStock: product.inStock,
      category: product.category,
    }));
    
    toast.success(`${product.name} added to cart!`);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

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

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="group"
    >
      <Link to={`/product/${product.id}`}>
        <div className="product-card p-4 h-full">
          {/* Product Image */}
          <div className="relative mb-4 overflow-hidden rounded-xl">
            <div className="aspect-square bg-muted relative">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
              
              {/* Overlay with actions */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-2">
                <Button
                  size="sm"
                  variant="secondary"
                  className="opacity-90 hover:opacity-100"
                >
                  <Eye className="w-4 h-4 mr-1" />
                  View
                </Button>
              </div>

              {/* Badges */}
              <div className="absolute top-2 left-2 flex flex-col gap-1">
                {discountPercentage > 0 && (
                  <Badge className="bg-secondary text-secondary-foreground font-semibold">
                    {discountPercentage}% OFF
                  </Badge>
                )}
                {!product.inStock && (
                  <Badge variant="destructive">
                    Out of Stock
                  </Badge>
                )}
              </div>

              {/* Wishlist Button */}
              <Button
                size="sm"
                variant="secondary"
                className="absolute top-2 right-2 h-8 w-8 p-0 opacity-80 hover:opacity-100 transition-opacity"
                onClick={handleToggleWishlist}
              >
                <Heart 
                  className={`w-4 h-4 ${isInWishlist ? 'fill-red-500 text-red-500' : ''}`}
                />
              </Button>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-2 flex-1">
            {/* Brand */}
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              {product.brand}
            </p>

            {/* Name */}
            <h3 className="font-semibold text-sm leading-tight line-clamp-2 group-hover:text-primary transition-colors">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center space-x-1">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">
                {product.rating} ({product.reviews})
              </span>
            </div>

            {/* Price */}
            <div className="space-y-1">
              <div className="flex items-baseline space-x-2">
                <span className="text-lg font-bold text-primary">
                  ₹{product.price.toLocaleString()}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-sm text-muted-foreground line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Add to Cart Button */}
          <div className="mt-4">
            <Button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="w-full group-hover:shadow-lg transition-all duration-300"
              variant={product.inStock ? "default" : "secondary"}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </Button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;