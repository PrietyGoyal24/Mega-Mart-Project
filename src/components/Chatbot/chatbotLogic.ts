// Simple rule-based chatbot logic for Mega Mart
export const chatbotLogic = (userInput: string) => {
  const input = userInput.toLowerCase();

  // Order tracking
  if (input.includes('order') || input.includes('track') || input.includes('shipping') || input.includes('delivery')) {
    const statuses = ['Processing', 'Shipped', 'Out for Delivery', 'Delivered'];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    const days = Math.floor(Math.random() * 5) + 1;
    
    return {
      text: `🚚 Your latest order is currently "${randomStatus}". ${
        randomStatus === 'Delivered' 
          ? 'It was delivered successfully!' 
          : `Estimated delivery: ${days} ${days === 1 ? 'day' : 'days'}.`
      }`,
      suggestions: ['View order details', 'Track another order', 'Contact support']
    };
  }

  // Product suggestions
  if (input.includes('product') || input.includes('suggest') || input.includes('recommend') || input.includes('show')) {
    const products = [
      { name: 'iPhone 14', price: '₹79,999', category: 'Electronics' },
      { name: 'Nike Air Max', price: '₹7,999', category: 'Fashion' },
      { name: 'Sony Headphones', price: '₹29,999', category: 'Electronics' },
      { name: 'Modern Sofa Set', price: '₹24,999', category: 'Home & Garden' },
      { name: 'Cricket Bat', price: '₹8,999', category: 'Sports' }
    ];
    
    const randomProducts = products.sort(() => 0.5 - Math.random()).slice(0, 2);
    const productText = randomProducts.map(p => `📱 ${p.name} - ${p.price}`).join('\n');
    
    return {
      text: `Here are some popular products:\n\n${productText}`,
      suggestions: ['Add to cart', 'View more products', 'Electronics', 'Fashion']
    };
  }

  // Categories
  const categories = ['electronics', 'fashion', 'home', 'garden', 'sports', 'books', 'toys'];
  const foundCategory = categories.find(cat => input.includes(cat));
  
  if (foundCategory) {
    return {
      text: `Great choice! I can help you explore our ${foundCategory} section. We have amazing deals and top-quality products waiting for you! 🛍️`,
      suggestions: [`Browse ${foundCategory}`, 'View deals', 'Popular items', 'Back to categories']
    };
  }

  // Deals and offers
  if (input.includes('deal') || input.includes('offer') || input.includes('discount') || input.includes('sale')) {
    return {
      text: `🔥 Current deals:\n• 20% off Electronics\n• Buy 2 Get 1 on Fashion\n• Free shipping on orders above ₹1000\n• Special weekend offers!`,
      suggestions: ['View all deals', 'Electronics deals', 'Fashion offers', 'Free shipping']
    };
  }

  // Help and support
  if (input.includes('help') || input.includes('support') || input.includes('problem') || input.includes('issue')) {
    return {
      text: `I'm here to help! 💪 You can:\n• Track your orders\n• Browse categories\n• Check deals and offers\n• Get product recommendations\n\nWhat would you like to do?`,
      suggestions: ['Track order', 'Browse products', 'Contact support', 'Return policy']
    };
  }

  // Cart related
  if (input.includes('cart') || input.includes('checkout') || input.includes('buy')) {
    return {
      text: `🛒 Ready to shop? You can add items to your cart and checkout anytime. Need help finding something specific?`,
      suggestions: ['View cart', 'Continue shopping', 'Checkout help', 'Payment options']
    };
  }

  // Greetings
  if (input.includes('hi') || input.includes('hello') || input.includes('hey') || input.includes('good')) {
    return {
      text: `Hello! 👋 Welcome to Mega Mart! I'm here to make your shopping experience amazing. What can I help you with today?`,
      suggestions: ['Browse products', 'Track my order', 'Show me deals', 'Help with categories']
    };
  }

  // Default response
  return {
    text: `I'm still learning! 🤖 But I can definitely help you with:\n• Order tracking\n• Product recommendations\n• Category browsing\n• Current deals\n\nWhat interests you most?`,
    suggestions: ['Track order', 'Show products', 'Browse categories', 'Current deals']
  };
};