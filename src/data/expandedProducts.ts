import { Product } from '../store/slices/productSlice';

// Generate expanded product data with 50 products per category
export const expandedMockProducts: Product[] = [
  // Electronics - 50 products
  ...Array.from({ length: 50 }, (_, i) => {
    const electronicsProducts = [
      { name: 'iPhone 14 Pro Max', brand: 'Apple', basePrice: 129999, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1200', desc: 'Latest iPhone with Pro cameras and A16 Bionic chip' },
      { name: 'Samsung Galaxy S23 Ultra', brand: 'Samsung', basePrice: 124999, image: 'https://images.unsplash.com/photo-1510557880182-3d4d3b5d8f1b?q=80&w=1200', desc: 'Premium Android smartphone with S Pen and amazing cameras' },
      { name: 'MacBook Pro M2', brand: 'Apple', basePrice: 199999, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200', desc: 'Professional laptop with M2 chip and Liquid Retina XDR display' },
      { name: 'iPad Air', brand: 'Apple', basePrice: 54999, image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1200', desc: 'Powerful tablet with M1 chip and Apple Pencil support' },
      { name: 'Sony WH-1000XM5', brand: 'Sony', basePrice: 29999, image: 'https://images.unsplash.com/photo-1518444023764-6d9f8d5d3b9b?q=80&w=1200', desc: 'Industry-leading noise cancellation headphones' },
      { name: 'Dell XPS 13', brand: 'Dell', basePrice: 89999, image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1200', desc: 'Ultra-portable laptop with InfinityEdge display' },
      { name: 'Nintendo Switch OLED', brand: 'Nintendo', basePrice: 34999, image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=1200', desc: 'Gaming console with vibrant OLED screen' },
      { name: 'AirPods Pro 2nd Gen', brand: 'Apple', basePrice: 24999, image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?q=80&w=1200', desc: 'Premium wireless earbuds with active noise cancellation' },
      { name: 'Canon EOS R5', brand: 'Canon', basePrice: 349999, image: 'https://images.unsplash.com/photo-1519183071298-a2962be90b5a?q=80&w=1200', desc: 'Professional mirrorless camera with 8K video' },
      { name: 'Apple Watch Series 8', brand: 'Apple', basePrice: 44999, image: 'https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?q=80&w=1200', desc: 'Advanced smartwatch with health monitoring' },
      { name: 'LG OLED TV 65"', brand: 'LG', basePrice: 149999, image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=1200', desc: 'Premium OLED smart TV with perfect blacks' },
      { name: 'Dyson V15 Detect', brand: 'Dyson', basePrice: 54999, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1200', desc: 'Powerful cordless vacuum with laser detection' },
      { name: 'GoPro Hero 11', brand: 'GoPro', basePrice: 44999, image: 'https://images.unsplash.com/photo-1526178615860-3a0f8d67c6a6?q=80&w=1200', desc: 'Action camera with 5.3K video and HyperSmooth' },
      { name: 'PlayStation 5', brand: 'Sony', basePrice: 49999, image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=1200', desc: 'Next-gen gaming console with ray tracing' },
      { name: 'Xbox Series X', brand: 'Microsoft', basePrice: 49999, image: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?q=80&w=1200', desc: 'Powerful gaming console with 4K gaming' },
      { name: 'OnePlus 11 5G', brand: 'OnePlus', basePrice: 56999, image: 'https://images.unsplash.com/photo-1523475496153-3d6ccf86c1b0?q=80&w=1200', desc: 'Flagship smartphone with fast charging' },
      { name: 'Google Pixel 7 Pro', brand: 'Google', basePrice: 84999, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1200', desc: 'Android phone with computational photography' },
      { name: 'Surface Pro 9', brand: 'Microsoft', basePrice: 89999, image: 'https://images.unsplash.com/photo-1547954575-b7728a6d8a93?q=80&w=1200', desc: '2-in-1 laptop tablet with touchscreen' },
      { name: 'Kindle Oasis', brand: 'Amazon', basePrice: 21999, image: 'https://images.unsplash.com/photo-1481516336974-efac2be86c62?q=80&w=1200', desc: 'Premium e-reader with adjustable warm light' },
      { name: 'Echo Dot 5th Gen', brand: 'Amazon', basePrice: 4999, image: 'https://images.unsplash.com/photo-1543512214-318c7553f230?q=80&w=1200', desc: 'Smart speaker with Alexa voice assistant' }
    ];
    
    const product = electronicsProducts[i % electronicsProducts.length];
    const hasDiscount = Math.random() > 0.7;
    const discountPercent = hasDiscount ? Math.floor(Math.random() * 30) + 10 : 0;
    const price = Math.floor(product.basePrice * (1 - discountPercent / 100));
    
    return {
      id: `electronics-${i + 1}`,
      name: `${product.name} ${i > 19 ? `(${Math.floor(Math.random() * 5) + 1}${['GB', 'TB', 'Pro', 'Max', 'Ultra'][Math.floor(Math.random() * 5)]})` : ''}`,
      description: product.desc,
      price: price,
      originalPrice: hasDiscount ? product.basePrice : undefined,
      images: [product.image],
      category: 'Electronics',
      brand: product.brand,
      rating: +(3.5 + Math.random() * 1.5).toFixed(1),
      reviews: Math.floor(Math.random() * 5000) + 100,
      inStock: Math.random() > 0.1,
      features: ['Latest Technology', 'Premium Quality', 'Fast Performance', 'Great Value']
    };
  }),

  // Fashion - 50 products  
  ...Array.from({ length: 50 }, (_, i) => {
    const fashionProducts = [
      { name: 'Nike Air Max 270', brand: 'Nike', basePrice: 12999, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200', desc: 'Comfortable running shoes with Air cushioning' },
      { name: 'Adidas Ultraboost', brand: 'Adidas', basePrice: 17999, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200', desc: 'Premium running shoes with Boost technology' },
      { name: "Levi's 501 Original", brand: 'Levis', basePrice: 4999, image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=1200', desc: 'Classic straight fit jeans' },
      { name: 'Ray-Ban Wayfarer', brand: 'Ray-Ban', basePrice: 8999, image: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=1200', desc: 'Iconic sunglasses with UV protection' },
      { name: 'Zara Blazer', brand: 'Zara', basePrice: 6999, image: 'https://images.unsplash.com/photo-1594938291133-6effea9664b5?q=80&w=1200', desc: 'Elegant office blazer for professionals' },
      { name: 'H&M Cotton T-Shirt', brand: 'H&M', basePrice: 1299, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1200', desc: 'Comfortable everyday cotton tee' },
      { name: 'Gucci Belt', brand: 'Gucci', basePrice: 45999, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1200', desc: 'Luxury leather belt with signature buckle' },
      { name: 'Converse Chuck Taylor', brand: 'Converse', basePrice: 4999, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1200', desc: 'Classic canvas sneakers' },
      { name: 'Tommy Hilfiger Polo', brand: 'Tommy Hilfiger', basePrice: 3999, image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?q=80&w=1200', desc: 'Premium polo shirt with logo' },
      { name: 'Calvin Klein Jeans', brand: 'Calvin Klein', basePrice: 5499, image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=1200', desc: 'Modern slim fit denim jeans' },
      { name: 'Puma Running Shorts', brand: 'Puma', basePrice: 1999, image: 'https://images.unsplash.com/photo-1506629905627-b9f08c21fc2d?q=80&w=1200', desc: 'Lightweight athletic shorts' },
      { name: 'Under Armour Hoodie', brand: 'Under Armour', basePrice: 4999, image: 'https://images.unsplash.com/photo-1556821840-3a9c6fee2856?q=80&w=1200', desc: 'Warm pullover hoodie for sports' },
      { name: 'Fossil Watch', brand: 'Fossil', basePrice: 8999, image: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=1200', desc: 'Stylish analog wristwatch' },
      { name: 'Michael Kors Handbag', brand: 'Michael Kors', basePrice: 18999, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1200', desc: 'Luxury designer handbag' },
      { name: 'Uniqlo Cardigan', brand: 'Uniqlo', basePrice: 2999, image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=1200', desc: 'Soft knit cardigan sweater' },
      { name: 'Vans Old Skool', brand: 'Vans', basePrice: 5499, image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=1200', desc: 'Classic skateboard shoes' },
      { name: 'Champion Sweatshirt', brand: 'Champion', basePrice: 3499, image: 'https://images.unsplash.com/photo-1556821840-3a9c6fee2856?q=80&w=1200', desc: 'Comfortable fleece sweatshirt' },
      { name: 'Gap Chinos', brand: 'Gap', basePrice: 3999, image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=1200', desc: 'Versatile casual chino pants' },
      { name: 'Forever 21 Dress', brand: 'Forever 21', basePrice: 2499, image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1200', desc: 'Trendy casual dress' },
      { name: 'Reebok Sports Bra', brand: 'Reebok', basePrice: 1999, image: 'https://images.unsplash.com/photo-1506629905627-b9f08c21fc2d?q=80&w=1200', desc: 'Supportive athletic sports bra' }
    ];
    
    const product = fashionProducts[i % fashionProducts.length];
    const hasDiscount = Math.random() > 0.6;
    const discountPercent = hasDiscount ? Math.floor(Math.random() * 40) + 10 : 0;
    const price = Math.floor(product.basePrice * (1 - discountPercent / 100));
    
    return {
      id: `fashion-${i + 1}`,
      name: `${product.name} ${i > 19 ? `(${['S', 'M', 'L', 'XL', 'XXL'][Math.floor(Math.random() * 5)]})` : ''}`,
      description: product.desc,
      price: price,
      originalPrice: hasDiscount ? product.basePrice : undefined,
      images: [product.image],
      category: 'Fashion',
      brand: product.brand,
      rating: +(3.8 + Math.random() * 1.2).toFixed(1),
      reviews: Math.floor(Math.random() * 3000) + 50,
      inStock: Math.random() > 0.15,
      features: ['Premium Quality', 'Comfortable Fit', 'Durable Material', 'Trendy Design']
    };
  }),

  // Home & Garden - 50 products
  ...Array.from({ length: 50 }, (_, i) => {
    const homeProducts = [
      { name: 'IKEA Sofa Set', brand: 'IKEA', basePrice: 45999, image: 'https://images.unsplash.com/photo-1549187774-b4b0a34a3d6c?q=80&w=1200', desc: 'Modern 3-seater sofa with cushions' },
      { name: 'Dining Table Set', brand: 'WoodCraft', basePrice: 25999, image: 'https://images.unsplash.com/photo-1487014679447-9f8336841d58?q=80&w=1200', desc: 'Solid wood dining table with 6 chairs' },
      { name: 'Philips Air Fryer', brand: 'Philips', basePrice: 12999, image: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?q=80&w=1200', desc: 'Healthy cooking with hot air technology' },
      { name: 'Instant Pot Pressure Cooker', brand: 'Instant Pot', basePrice: 8999, image: 'https://images.unsplash.com/photo-1585515656971-f7ad1dd13f25?q=80&w=1200', desc: 'Multi-functional electric pressure cooker' },
      { name: 'Dyson V11 Vacuum', brand: 'Dyson', basePrice: 34999, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1200', desc: 'Cordless vacuum with powerful suction' },
      { name: 'KitchenAid Stand Mixer', brand: 'KitchenAid', basePrice: 39999, image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=1200', desc: 'Professional stand mixer for baking' },
      { name: 'Nespresso Coffee Machine', brand: 'Nespresso', basePrice: 18999, image: 'https://images.unsplash.com/photo-1572630578177-65de0c5f89fb?q=80&w=1200', desc: 'Premium espresso coffee maker' },
      { name: 'Amazon Echo Show', brand: 'Amazon', basePrice: 14999, image: 'https://images.unsplash.com/photo-1543512214-318c7553f230?q=80&w=1200', desc: 'Smart display with Alexa' },
      { name: 'Philips Hue Smart Bulbs', brand: 'Philips', basePrice: 3999, image: 'https://images.unsplash.com/photo-1558618047-cfa2ee395188?q=80&w=1200', desc: 'Color-changing smart LED bulbs' },
      { name: 'Roomba Robot Vacuum', brand: 'iRobot', basePrice: 54999, image: 'https://images.unsplash.com/photo-1582719478188-2b9a3d0e1cce?q=80&w=1200', desc: 'Self-navigating robot vacuum' },
      { name: 'Le Creuset Dutch Oven', brand: 'Le Creuset', basePrice: 24999, image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=1200', desc: 'Cast iron cooking pot with enamel' },
      { name: 'Ninja Blender', brand: 'Ninja', basePrice: 8999, image: 'https://images.unsplash.com/photo-1585515656971-f7ad1dd13f25?q=80&w=1200', desc: 'High-performance blender for smoothies' },
      { name: 'Honeywell Air Purifier', brand: 'Honeywell', basePrice: 16999, image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5d?q=80&w=1200', desc: 'HEPA air purifier for clean air' },
      { name: 'Casper Mattress', brand: 'Casper', basePrice: 44999, image: 'https://images.unsplash.com/photo-1549187774-14fd7c76c2d9?q=80&w=1200', desc: 'Memory foam mattress for better sleep' },
      { name: 'Weber Gas Grill', brand: 'Weber', basePrice: 32999, image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5d?q=80&w=1200', desc: 'Outdoor gas barbecue grill' },
      { name: 'Cuisinart Food Processor', brand: 'Cuisinart', basePrice: 12999, image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=1200', desc: 'Multi-purpose food processor' },
      { name: 'Breville Toaster Oven', brand: 'Breville', basePrice: 19999, image: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?q=80&w=1200', desc: 'Countertop convection oven' },
      { name: 'Shark Steam Mop', brand: 'Shark', basePrice: 7999, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1200', desc: 'Steam mop for floor cleaning' },
      { name: 'Keurig Coffee Maker', brand: 'Keurig', basePrice: 9999, image: 'https://images.unsplash.com/photo-1572630578177-65de0c5f89fb?q=80&w=1200', desc: 'Single-serve coffee brewing system' },
      { name: 'Fitbit Aria Scale', brand: 'Fitbit', basePrice: 8999, image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5d?q=80&w=1200', desc: 'Smart WiFi body composition scale' }
    ];
    
    const product = homeProducts[i % homeProducts.length];
    const hasDiscount = Math.random() > 0.65;
    const discountPercent = hasDiscount ? Math.floor(Math.random() * 35) + 15 : 0;
    const price = Math.floor(product.basePrice * (1 - discountPercent / 100));
    
    return {
      id: `home-${i + 1}`,
      name: `${product.name} ${i > 19 ? `(${['White', 'Black', 'Stainless', 'Wood', 'Silver'][Math.floor(Math.random() * 5)]})` : ''}`,
      description: product.desc,
      price: price,
      originalPrice: hasDiscount ? product.basePrice : undefined,
      images: [product.image],
      category: 'Home & Garden',
      brand: product.brand,
      rating: +(4.0 + Math.random() * 1.0).toFixed(1),
      reviews: Math.floor(Math.random() * 2000) + 100,
      inStock: Math.random() > 0.12,
      features: ['Premium Quality', 'Easy to Use', 'Durable Build', 'Great Value']
    };
  }),

  // Sports - 50 products
  ...Array.from({ length: 50 }, (_, i) => {
    const sportsProducts = [
      { name: 'Nike Air Zoom Pegasus', brand: 'Nike', basePrice: 10999, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200', desc: 'Professional running shoes with Zoom Air' },
      { name: 'Adidas Football', brand: 'Adidas', basePrice: 2999, image: 'https://images.unsplash.com/photo-1514894789161-1a5d8a0d4a26?q=80&w=1200', desc: 'FIFA quality football for matches' },
      { name: 'Wilson Tennis Racket', brand: 'Wilson', basePrice: 8999, image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=1200', desc: 'Professional tennis racket with grip' },
      { name: 'Spalding Basketball', brand: 'Spalding', basePrice: 3999, image: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?q=80&w=1200', desc: 'Official size basketball for games' },
      { name: 'Yonex Badminton Racket', brand: 'Yonex', basePrice: 5999, image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=1200', desc: 'Carbon fiber badminton racket' },
      { name: 'Gray Nicolls Cricket Bat', brand: 'Gray Nicolls', basePrice: 12999, image: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?q=80&w=1200', desc: 'English willow cricket bat' },
      { name: 'Manduka Yoga Mat', brand: 'Manduka', basePrice: 4999, image: 'https://images.unsplash.com/photo-1544937954-fa07a98d237f?q=80&w=1200', desc: 'Non-slip yoga mat for practice' },
      { name: 'PowerBlock Dumbbells', brand: 'PowerBlock', basePrice: 24999, image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200', desc: 'Adjustable weight dumbbells' },
      { name: 'TRX Suspension Trainer', brand: 'TRX', basePrice: 8999, image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1200', desc: 'Full-body workout suspension system' },
      { name: 'Garmin Forerunner Watch', brand: 'Garmin', basePrice: 34999, image: 'https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?q=80&w=1200', desc: 'GPS running watch with heart rate' },
      { name: 'Bowflex Treadmill', brand: 'Bowflex', basePrice: 89999, image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1200', desc: 'Folding treadmill for home gym' },
      { name: 'Peloton Exercise Bike', brand: 'Peloton', basePrice: 149999, image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1200', desc: 'Connected fitness bike with classes' },
      { name: 'Olympic Barbell Set', brand: 'Rogue Fitness', basePrice: 45999, image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200', desc: 'Professional Olympic weightlifting set' },
      { name: 'Kettlebell Set', brand: 'REP Fitness', basePrice: 12999, image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200', desc: 'Cast iron kettlebells for strength training' },
      { name: 'Resistance Bands', brand: 'Bodylastics', basePrice: 2999, image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1200', desc: 'Elastic resistance bands set' },
      { name: 'Pull-up Bar', brand: 'Perfect Pushup', basePrice: 3999, image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1200', desc: 'Doorway pull-up and chin-up bar' },
      { name: 'Boxing Gloves', brand: 'Everlast', basePrice: 4999, image: 'https://images.unsplash.com/photo-1544963150-b9edd512bbf2?q=80&w=1200', desc: 'Professional boxing training gloves' },
      { name: 'Punching Bag', brand: 'Century', basePrice: 14999, image: 'https://images.unsplash.com/photo-1544963150-b9edd512bbf2?q=80&w=1200', desc: 'Heavy bag for boxing and MMA training' },
      { name: 'Skateboard Complete', brand: 'Element', basePrice: 8999, image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?q=80&w=1200', desc: 'Complete skateboard setup ready to ride' },
      { name: 'Surfboard', brand: 'Channel Islands', basePrice: 54999, image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=1200', desc: 'High-performance shortboard for surfing' }
    ];
    
    const product = sportsProducts[i % sportsProducts.length];
    const hasDiscount = Math.random() > 0.7;
    const discountPercent = hasDiscount ? Math.floor(Math.random() * 25) + 10 : 0;
    const price = Math.floor(product.basePrice * (1 - discountPercent / 100));
    
    return {
      id: `sports-${i + 1}`,
      name: `${product.name} ${i > 19 ? `(${['Pro', 'Elite', 'Standard', 'Premium', 'Advanced'][Math.floor(Math.random() * 5)]})` : ''}`,
      description: product.desc,
      price: price,
      originalPrice: hasDiscount ? product.basePrice : undefined,
      images: [product.image],
      category: 'Sports',
      brand: product.brand,
      rating: +(4.1 + Math.random() * 0.9).toFixed(1),
      reviews: Math.floor(Math.random() * 1500) + 80,
      inStock: Math.random() > 0.08,
      features: ['Professional Grade', 'Durable Build', 'High Performance', 'Great Value']
    };
  }),

  // Books - 50 products
  ...Array.from({ length: 50 }, (_, i) => {
    const bookProducts = [
      { name: 'Atomic Habits', brand: 'Penguin Random House', basePrice: 599, image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200', desc: 'Transform your life with tiny changes in behavior' },
      { name: 'Harry Potter Complete Series', brand: 'Bloomsbury', basePrice: 4999, image: 'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?q=80&w=1200', desc: 'All 7 Harry Potter books in collector edition' },
      { name: 'The Alchemist', brand: 'HarperCollins', basePrice: 399, image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1200', desc: 'Paulo Coelho inspirational classic novel' },
      { name: 'Rich Dad Poor Dad', brand: 'Plata Publishing', basePrice: 499, image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1200', desc: 'Financial literacy and wealth building guide' },
      { name: 'Think and Grow Rich', brand: 'Vintage Books', basePrice: 349, image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=1200', desc: 'Napoleon Hill classic self-help book' },
      { name: 'Wings of Fire', brand: 'Universities Press', basePrice: 399, image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=1200', desc: 'Autobiography of APJ Abdul Kalam' },
      { name: 'Sapiens', brand: 'Harper', basePrice: 799, image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=1200', desc: 'Yuval Noah Harari - Brief History of Humankind' },
      { name: 'The 7 Habits', brand: 'Free Press', basePrice: 549, image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1200', desc: 'Stephen Covey highly effective people guide' },
      { name: 'Zero to One', brand: 'Crown Business', basePrice: 649, image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1200', desc: 'Peter Thiel startup and innovation insights' },
      { name: 'Good to Great', brand: 'HarperBusiness', basePrice: 699, image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200', desc: 'Jim Collins business excellence study' },
      { name: 'The Lean Startup', brand: 'Crown Business', basePrice: 599, image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1200', desc: 'Eric Ries entrepreneurship methodology' },
      { name: 'Mindset', brand: 'Random House', basePrice: 549, image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1200', desc: 'Carol Dweck psychology of success' },
      { name: 'The Power of Now', brand: 'New World Library', basePrice: 499, image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1200', desc: 'Eckhart Tolle spiritual awakening guide' },
      { name: 'How to Win Friends', brand: 'Pocket Books', basePrice: 449, image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1200', desc: 'Dale Carnegie people skills classic' },
      { name: 'The 4-Hour Workweek', brand: 'Crown', basePrice: 599, image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=1200', desc: 'Tim Ferriss lifestyle design guide' },
      { name: 'Ikigai', brand: 'Hutchinson', basePrice: 399, image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1200', desc: 'Japanese secret to long and happy life' },
      { name: 'The Subtle Art', brand: 'HarperOne', basePrice: 549, image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1200', desc: 'Mark Manson counterintuitive approach to life' },
      { name: 'Educated', brand: 'Random House', basePrice: 699, image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=1200', desc: 'Tara Westover memoir about education' },
      { name: 'Becoming', brand: 'Crown', basePrice: 799, image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=1200', desc: 'Michelle Obama inspiring autobiography' },
      { name: 'The Immortals of Meluha', brand: 'Westland', basePrice: 349, image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200', desc: 'Amish Tripathi Shiva Trilogy Book 1' }
    ];
    
    const product = bookProducts[i % bookProducts.length];
    const hasDiscount = Math.random() > 0.5;
    const discountPercent = hasDiscount ? Math.floor(Math.random() * 30) + 15 : 0;
    const price = Math.floor(product.basePrice * (1 - discountPercent / 100));
    
    return {
      id: `books-${i + 1}`,
      name: `${product.name} ${i > 19 ? `(${['Hardcover', 'Paperback', 'Kindle', 'Audiobook', 'Special Edition'][Math.floor(Math.random() * 5)]})` : ''}`,
      description: product.desc,
      price: price,
      originalPrice: hasDiscount ? product.basePrice : undefined,  
      images: [product.image],
      category: 'Books',
      brand: product.brand,
      rating: +(4.2 + Math.random() * 0.8).toFixed(1),
      reviews: Math.floor(Math.random() * 4000) + 200,
      inStock: Math.random() > 0.05,
      features: ['Bestseller', 'Expert Author', 'High Quality Print', 'Great Value']
    };
  }),

  // Toys - 50 products
  ...Array.from({ length: 50 }, (_, i) => {
    const toyProducts = [
      { name: 'LEGO Creator Expert', brand: 'LEGO', basePrice: 8999, image: 'https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=1200', desc: 'Advanced building set with detailed instructions' },
      { name: 'Barbie Dreamhouse', brand: 'Mattel', basePrice: 12999, image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1200', desc: 'Large dollhouse with furniture and accessories' },
      { name: 'Hot Wheels Track Set', brand: 'Mattel', basePrice: 3999, image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=1200', desc: 'Racing track with loops and stunts' },
      { name: 'Nerf Elite Blaster', brand: 'Hasbro', basePrice: 2999, image: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?q=80&w=1200', desc: 'Foam dart blaster with darts included' },
      { name: 'Monopoly Board Game', brand: 'Hasbro', basePrice: 2499, image: 'https://images.unsplash.com/photo-1611371805429-8b5c1b2c34ba?q=80&w=1200', desc: 'Classic property trading board game' },
      { name: 'UNO Card Game', brand: 'Mattel Games', basePrice: 299, image: 'https://images.unsplash.com/photo-1611371805429-8b5c1b2c34ba?q=80&w=1200', desc: 'Popular family card game' },
      { name: 'Remote Control Drone', brand: 'Syma', basePrice: 5999, image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200', desc: 'Beginner-friendly quadcopter drone' },
      { name: 'Rubiks Cube 3x3', brand: 'Rubiks', basePrice: 899, image: 'https://images.unsplash.com/photo-1541698444083-023c97d3f4b6?q=80&w=1200', desc: 'Classic puzzle cube brain teaser' },
      { name: 'Play-Doh Creative Set', brand: 'Hasbro', basePrice: 1999, image: 'https://images.unsplash.com/photo-1558618666-9d1e7ad8a1b5?q=80&w=1200', desc: 'Modeling compound with tools and molds' },
      { name: 'Action Figure Set', brand: 'Marvel', basePrice: 2999, image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200', desc: 'Superhero action figures collection' },
      { name: 'Teddy Bear Plush', brand: 'Build-A-Bear', basePrice: 1999, image: 'https://images.unsplash.com/photo-1519741494268-6b702b3e8b5c?q=80&w=1200', desc: 'Soft and cuddly stuffed teddy bear' },
      { name: 'Jenga Classic Game', brand: 'Hasbro', basePrice: 1299, image: 'https://images.unsplash.com/photo-1611371805429-8b5c1b2c34ba?q=80&w=1200', desc: 'Wooden block stacking game' },
      { name: 'Crayola Art Set', brand: 'Crayola', basePrice: 1799, image: 'https://images.unsplash.com/photo-1558618666-9d1e7ad8a1b5?q=80&w=1200', desc: 'Complete art supplies for kids creativity' },
      { name: 'Fisher-Price Piano', brand: 'Fisher-Price', basePrice: 3499, image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1200', desc: 'Musical toy piano for toddlers' },
      { name: 'Scrabble Board Game', brand: 'Hasbro', basePrice: 1999, image: 'https://images.unsplash.com/photo-1611371805429-8b5c1b2c34ba?q=80&w=1200', desc: 'Classic word-building board game' },
      { name: 'Remote Control Car', brand: 'Traxxas', basePrice: 4999, image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=1200', desc: 'High-speed RC racing car' },
      { name: 'Pokémon Cards Pack', brand: 'The Pokémon Company', basePrice: 999, image: 'https://images.unsplash.com/photo-1611371805429-8b5c1b2c34ba?q=80&w=1200', desc: 'Trading card game booster pack' },
      { name: 'Dollhouse Furniture', brand: 'KidKraft', basePrice: 2499, image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1200', desc: 'Miniature furniture set for dollhouses' },
      { name: 'Slime Making Kit', brand: 'Elmer\'s', basePrice: 1499, image: 'https://images.unsplash.com/photo-1558618666-9d1e7ad8a1b5?q=80&w=1200', desc: 'DIY slime creation kit with glue and activators' },
      { name: 'Chess Set Wooden', brand: 'House of Chess', basePrice: 2999, image: 'https://images.unsplash.com/photo-1543674892-7d64d45df18b?q=80&w=1200', desc: 'Classic wooden chess board with pieces' }
    ];
    
    const product = toyProducts[i % toyProducts.length];
    const hasDiscount = Math.random() > 0.6;
    const discountPercent = hasDiscount ? Math.floor(Math.random() * 35) + 15 : 0;
    const price = Math.floor(product.basePrice * (1 - discountPercent / 100));
    
    return {
      id: `toys-${i + 1}`,
      name: `${product.name} ${i > 19 ? `(${['Ages 3+', 'Ages 5+', 'Ages 8+', 'Teen', 'Adult'][Math.floor(Math.random() * 5)]})` : ''}`,
      description: product.desc,
      price: price,
      originalPrice: hasDiscount ? product.basePrice : undefined,
      images: [product.image],
      category: 'Toys',
      brand: product.brand,
      rating: +(4.3 + Math.random() * 0.7).toFixed(1),
      reviews: Math.floor(Math.random() * 2500) + 100,
      inStock: Math.random() > 0.1,
      features: ['Safe Materials', 'Educational Value', 'Fun & Engaging', 'Age Appropriate']
    };
  })
];