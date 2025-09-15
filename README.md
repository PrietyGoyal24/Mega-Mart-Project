# 🛒 Mega Mart - Modern E-Commerce Platform

<div align="center">

![Mega Mart Logo](https://img.shields.io/badge/Mega%20Mart-E--Commerce-blue?style=for-the-badge&logo=shopping-cart)

**A complete, modern e-commerce platform built with React, TypeScript, and Redux Toolkit**

[![React](https://img.shields.io/badge/React-18.3.1-61dafb?style=flat&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178c6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-2.9.0-764abc?style=flat&logo=redux)](https://redux-toolkit.js.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.0+-06b6d4?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.0+-646cff?style=flat&logo=vite)](https://vitejs.dev/)

[Live Demo](https://mega-mart-project-ten.vercel.app/) 

</div>

![Mega Mart Banner](src/assets/hero-banner.jpg)

## 📋 Table of Contents

- [🌟 Features](#-features)
- [🚀 Tech Stack](#-tech-stack)
- [🏗️ Project Structure](#️-project-structure)
- [⚡ Quick Start](#-quick-start)
- [🎨 Design System](#-design-system)
- [🛍️ Product Catalog](#️-product-catalog)
- [🤖 AI Chatbot](#-ai-chatbot)
- [📱 Mobile Experience](#-mobile-experience)
- [🔧 Configuration](#-configuration)
- [📈 Performance](#-performance)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

## 🌟 Features

### 🛍️ **Complete Shopping Experience**
- **Product Catalog**: Browse 300+ products across 6 categories
- **Smart Search**: Real-time product search with filtering and sorting
- **Shopping Cart**: Add, remove, and manage cart items with persistent storage
- **Wishlist**: Save favorite products for later purchasing
- **Product Details**: Comprehensive product pages with specifications and reviews
- **Category Navigation**: Organized product browsing by category
- **Deals Page**: Special offers and discounted products
- **Products Page**: Complete product listing with advanced filters

### 💳 **Payment & Checkout**
- **Secure Checkout**: Complete payment processing flow
- **Multiple Payment Options**: Credit cards, debit cards, and digital wallets
- **Order Summary**: Detailed breakdown of purchases with tax and shipping
- **Billing Information**: Secure form handling for customer details
- **Payment Validation**: Real-time form validation and error handling
- **Order Confirmation**: Success states and order tracking information

### 🎨 **Modern UI/UX**
- **Responsive Design**: Perfect experience across all devices and screen sizes
- **Dark/Light Mode**: Theme switching with system preference detection
- **Smooth Animations**: Framer Motion powered interactions and transitions
- **Accessibility**: WCAG compliant design with keyboard navigation
- **Loading States**: Beautiful skeleton loaders and smooth transitions
- **Toast Notifications**: User feedback with elegant toast messages

### 🤖 **AI-Powered Chatbot**
- **Intelligent Responses**: Advanced rule-based AI for customer support
- **Product Recommendations**: Smart suggestions based on user queries
- **Order Assistance**: Help with order tracking, returns, and exchanges
- **Multi-topic Support**: Handles pricing, shipping, warranties, and policies
- **Interactive UI**: Modern chat interface with typing indicators
- **Quick Suggestions**: Contextual response options for faster interaction

### ⚙️ **User Management & Settings**
- **User Authentication**: Complete login and registration system
- **Profile Management**: Update personal information and preferences
- **Settings Panel**: Comprehensive settings for notifications, appearance, and security
- **Account Security**: Password management and security options
- **Preferences**: Customizable app behavior and display options
- **Theme Control**: Manual theme switching with preference persistence

### 🔧 **Developer Features**
- **TypeScript**: Full type safety throughout the application
- **Redux Toolkit**: Predictable state management with modern patterns
- **Component Library**: Reusable UI components built with Shadcn/ui
- **SEO Optimized**: Meta tags, structured data, and semantic HTML
- **Performance Optimized**: Code splitting, lazy loading, and bundle optimization
- **Development Tools**: Hot reload, debugging tools, and component tagging

## 🚀 Tech Stack

### **Frontend**
- **Framework**: React 18.3.1 with TypeScript for type safety
- **Build Tool**: Vite for lightning-fast development and building
- **Styling**: Tailwind CSS with custom design system and semantic tokens
- **Animations**: Framer Motion for smooth interactions and page transitions
- **Icons**: Lucide React icon library for consistent iconography
- **State Management**: Redux Toolkit with persistence for cart and wishlist

### **UI Components**
- **Shadcn/ui**: High-quality, accessible component library
- **Radix UI**: Primitive components for complex UI patterns
- **React Hook Form**: Efficient form handling with validation
- **Sonner**: Beautiful toast notifications and alerts
- **React Hot Toast**: Additional toast notification system

### **Development & Tooling**
- **TypeScript**: Static type checking and enhanced developer experience
- **ESLint**: Code linting and formatting for consistency
- **Vite**: Fast development server with hot module replacement
- **Component Tagger**: Development debugging and component identification

### **Routing & Navigation**
- **React Router DOM**: Client-side routing with nested routes
- **Dynamic Imports**: Code splitting for better performance
- **Route Guards**: Protected routes for authenticated users

## 🏗️ Project Structure

```
src/
├── components/              # Reusable UI components
│   ├── Chatbot/            # AI chatbot system
│   │   ├── ChatbotButton.tsx    # Floating chat button
│   │   ├── ChatWindow.tsx       # Main chat interface
│   │   ├── ChatMessage.tsx      # Individual message component
│   │   ├── chatbotLogic.ts      # AI response logic
│   │   └── index.tsx           # Chatbot entry point
│   ├── ui/                 # Shadcn/ui component library
│   │   ├── button.tsx      # Button variants and styles
│   │   ├── card.tsx        # Card components
│   │   ├── input.tsx       # Form input components
│   │   └── ...            # Other UI primitives
│   ├── Footer.tsx          # Site footer with links
│   ├── Navbar.tsx          # Navigation header with search
│   └── ProductCard.tsx     # Product display component
├── data/                   # Static data and product catalog
│   ├── products.ts         # Core product definitions
│   └── expandedProducts.ts # Extended product catalog (300+ items)
├── hooks/                  # Custom React hooks
│   ├── use-mobile.tsx      # Mobile device detection
│   └── use-toast.ts        # Toast notification hook
├── lib/                    # Utility functions and helpers
│   └── utils.ts           # Common utility functions
├── pages/                  # Route components and main pages
│   ├── Index.tsx          # Homepage with hero and categories
│   ├── Products.tsx       # Product listing with filters
│   ├── Deals.tsx          # Special offers and deals page
│   ├── Cart.tsx           # Shopping cart management
│   ├── Checkout.tsx       # Payment and checkout flow
│   ├── Settings.tsx       # User settings and preferences
│   ├── Wishlist.tsx       # Saved products page
│   ├── Login.tsx          # User authentication
│   └── NotFound.tsx       # 404 error handling
├── store/                  # Redux store configuration
│   ├── slices/            # Redux Toolkit slices
│   │   ├── authSlice.ts   # Authentication state
│   │   ├── cartSlice.ts   # Shopping cart management
│   │   ├── productSlice.ts # Product catalog state
│   │   └── wishlistSlice.ts # Wishlist management
│   └── store.ts           # Store configuration and persistence
├── assets/                # Static assets and images
│   ├── categories/        # Category preview images
│   └── hero-banner.jpg    # Homepage hero image
├── index.css              # Global styles and design system
└── App.tsx               # Main application with routing
```

## ⚡ Quick Start

### Prerequisites
- **Node.js** (v18 or higher recommended)
- **npm** or **yarn** package manager
- **Git** for version control

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/PrietyGoyal24/Mega-Mart-Project.git
   cd mega-mart
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or with yarn
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or with yarn
   yarn dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173` to see the application

### Build Commands

```bash
# Development build with hot reload
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🎨 Design System

Our design system provides consistent styling across the entire application using semantic tokens and Tailwind CSS.

### **Color Palette**
All colors use HSL values for better manipulation and theming:

- **Primary**: Deep blue gradients for brand identity and main actions
- **Secondary**: Warm orange tones for secondary actions and highlights  
- **Success**: Green variants for positive feedback and confirmations
- **Warning**: Amber shades for attention and cautionary states
- **Destructive**: Red tones for errors and dangerous actions
- **Muted**: Subtle grays for backgrounds and disabled states

### **Typography System**
- **Headings**: Semi-bold weight with optimized letter spacing
- **Body Text**: Regular weight optimized for readability
- **Captions**: Smaller text for metadata and supplementary information
- **Code**: Monospace font for technical content

### **Component Variants**
- **Buttons**: Default, outline, ghost, destructive, and hero variants
- **Cards**: Standard, featured, and interactive card styles
- **Forms**: Consistent input styling with validation states
- **Navigation**: Responsive menu systems with active states

### **Animation System**
- **Page Transitions**: Smooth enter/exit animations with Framer Motion
- **Hover Effects**: Subtle scaling and color transitions
- **Loading States**: Skeleton loaders and spinner animations
- **Micro-interactions**: Button clicks, form interactions, and feedback

## 🛍️ Product Catalog

### **Categories Overview** (50 products each = 300 total)

1. **📱 Electronics**
   - Smartphones (iPhone, Samsung, OnePlus)
   - Laptops (MacBook, Dell, HP)
   - Accessories (Headphones, Chargers, Cases)
   - Smart Devices (Watches, Speakers, Cameras)

2. **👕 Fashion**
   - Clothing (Shirts, Pants, Dresses, Jackets)
   - Footwear (Sneakers, Boots, Sandals)
   - Accessories (Bags, Belts, Jewelry)
   - Seasonal Collections

3. **🏠 Home & Garden**
   - Furniture (Sofas, Tables, Chairs, Beds)
   - Kitchen Appliances (Blenders, Microwaves)
   - Decor Items (Lamps, Vases, Artwork)
   - Garden Tools and Plants

4. **📚 Books**
   - Fiction (Novels, Short Stories)
   - Non-Fiction (Biography, Self-Help, History)
   - Educational (Textbooks, Technical Books)
   - Children's Books and Comics

5. **⚽ Sports**
   - Equipment (Bats, Balls, Rackets)
   - Fitness (Yoga Mats, Weights, Bands)
   - Apparel (Sportswear, Shoes)
   - Outdoor Gear (Camping, Hiking)

6. **🎮 Toys**
   - Educational Toys (LEGO, Puzzles)
   - Electronic Toys (RC Cars, Drones)
   - Action Figures and Collectibles
   - Board Games and Card Games

### **Product Features**
- **High-Resolution Images**: Professional product photography
- **Detailed Descriptions**: Comprehensive specifications and features
- **Customer Reviews**: Rating system with star ratings
- **Price Information**: Original price, discounts, and special offers
- **Stock Status**: Real-time availability indicators
- **Quick Actions**: Add to cart/wishlist with one click

## 🤖 AI Chatbot

### **Core Capabilities**
Our intelligent chatbot provides 24/7 customer support with advanced conversational abilities:

- **Product Information**: Detailed specs, availability, and recommendations
- **Order Support**: Tracking, returns, exchanges, and modifications
- **Shipping Details**: Delivery times, costs, and tracking information
- **Payment Help**: Payment methods, billing issues, and refunds
- **Policy Information**: Return policies, warranties, and terms
- **Technical Support**: Account issues and troubleshooting

### **Conversation Features**
- **Natural Language Processing**: Understands various question formats
- **Context Awareness**: Remembers conversation history during session
- **Smart Suggestions**: Provides relevant quick-reply options
- **Multi-turn Conversations**: Handles complex, multi-step inquiries
- **Fallback Responses**: Graceful handling of unrecognized queries

### **Supported Topics**
- Product recommendations based on budget and preferences
- Price comparisons and deal notifications
- Shipping and delivery information
- Return and exchange procedures
- Warranty and guarantee details
- Account management assistance

## 📱 Mobile Experience

### **Mobile-First Design**
- **Responsive Layouts**: Optimized for screens from 320px to 2560px
- **Touch Interactions**: Large tap targets and gesture-friendly navigation
- **Mobile Navigation**: Collapsible menu with easy access to key features
- **Swipe Gestures**: Product gallery swiping and list interactions

### **Performance Optimization**
- **Fast Loading**: Optimized bundle size and lazy loading
- **Offline Support**: Basic functionality available without internet
- **PWA Features**: Installable web app with offline capabilities
- **Image Optimization**: WebP format with responsive sizing

### **Mobile-Specific Features**
- **One-handed Usage**: Important actions within thumb reach
- **Quick Actions**: Swipe-to-add cart functionality
- **Mobile Payments**: Integrated mobile wallet support
- **Camera Integration**: Barcode scanning for product search


## 🔧 Configuration

### **Environment Setup**
For local development, create a `.env.local` file:

```env
# API Configuration (when backend is integrated)
VITE_API_URL=http://localhost:3000/api

# Payment Integration (for future payment processing)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Analytics (optional)
VITE_GA_TRACKING_ID=G-XXXXXXXXXX
```

### **Customization Options**

#### **Theme Customization**
Edit `src/index.css` to modify the color scheme:
```css
:root {
  --primary: 220 90% 56%;
  --secondary: 24 95% 53%;
  /* Add your custom colors */
}
```

#### **Product Data**
- **Core Products**: Edit `src/data/products.ts`
- **Extended Catalog**: Modify `src/data/expandedProducts.ts`
- **Categories**: Update category definitions in product files

#### **Chatbot Responses**
Customize AI responses in `src/components/Chatbot/chatbotLogic.ts`:
```typescript
// Add new conversation topics and responses
export const chatbotLogic = (userInput: string) => {
  // Your custom logic here
}
```

#### **UI Components**
- **Buttons**: Modify `src/components/ui/button.tsx` for new variants
- **Cards**: Update `src/components/ui/card.tsx` for styling changes
- **Forms**: Customize form components in `src/components/ui/`

## 📈 Performance

### **Optimization Features**
- **Code Splitting**: Automatic route-based code splitting with React.lazy()
- **Image Optimization**: WebP format with lazy loading and responsive images
- **Bundle Analysis**: Built-in Vite bundle analyzer for size optimization
- **Caching Strategy**: Browser caching for static assets and API responses

### **Performance Metrics** (Target Goals)
- **First Contentful Paint (FCP)**: < 1.5 seconds
- **Largest Contentful Paint (LCP)**: < 2.5 seconds
- **Cumulative Layout Shift (CLS)**: < 0.1
- **Time to Interactive (TTI)**: < 3.5 seconds
- **Bundle Size**: < 500KB gzipped main bundle

### **Best Practices Implemented**
- **Lazy Loading**: Components and routes loaded on demand
- **Memoization**: React.memo() and useMemo() for expensive operations
- **Virtual Scrolling**: For large product lists (when implemented)
- **Image Optimization**: Proper sizing, compression, and format selection
- **Dead Code Elimination**: Tree shaking and unused code removal

## 🔄 State Management

The application uses Redux Toolkit for predictable state management:

### **Store Structure**
```typescript
store/
├── slices/
│   ├── authSlice.ts      # User authentication
│   ├── cartSlice.ts      # Shopping cart management
│   ├── productSlice.ts   # Product catalog
│   └── wishlistSlice.ts  # Saved products
└── store.ts              # Store configuration
```

### **Key Features**
- **Persistence**: Cart and wishlist data saved to localStorage
- **Middleware**: Redux Toolkit Query for API calls (future)
- **DevTools**: Redux DevTools integration for debugging
- **Type Safety**: Full TypeScript integration

### **State Slices Overview**

#### **Auth Slice**
```typescript
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}
```

#### **Cart Slice**
```typescript
interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
  shippingCost: number;
  tax: number;
}
```

#### **Wishlist Slice**
```typescript
interface WishlistState {
  items: Product[];
  itemCount: number;
}
```

## 🚀 Deployment

### **Recommended Platforms**

#### **Vercel** (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to production
npm run build
vercel --prod
```

#### **Netlify**
```bash
# Build the project
npm run build

# Deploy via Netlify CLI
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

#### **GitHub Pages**
```bash
# Install gh-pages
npm install -g gh-pages

# Deploy to GitHub Pages
npm run build
gh-pages -d dist
```

### **Production Optimization**
- **Environment Variables**: Set production API endpoints
- **Security Headers**: Configure proper CORS and CSP headers
- **Analytics**: Integrate Google Analytics or similar tools
- **Error Monitoring**: Set up Sentry or similar error tracking
- **Performance Monitoring**: Configure Web Vitals tracking

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### **Getting Started**
1. **Fork the repository** on GitHub
2. **Clone your fork** locally
   ```bash
   git clone https://github.com/PrietyGoyal24/Mega-Mart-Project.git
   ```
3. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-new-feature
   ```
4. **Make your changes** and commit them
   ```bash
   git commit -m 'Add some amazing feature'
   ```
5. **Push to your fork**
   ```bash
   git push origin feature/amazing-new-feature
   ```
6. **Open a Pull Request** on GitHub

### **Development Guidelines**
- **Code Style**: Follow the existing TypeScript and React patterns
- **Testing**: Add tests for new features (when testing is implemented)
- **Documentation**: Update README and code comments
- **Commits**: Use clear, descriptive commit messages
- **Pull Requests**: Provide detailed descriptions of changes

### **Areas for Contribution**
- 🐛 **Bug Fixes**: Help identify and fix issues
- ✨ **New Features**: Add new functionality and components
- 🎨 **UI/UX**: Improve design and user experience
- 📚 **Documentation**: Enhance guides and documentation
- 🚀 **Performance**: Optimize loading times and bundle size
- 🔒 **Security**: Improve security practices and code

### **Code Style Guide**
- Use **TypeScript** for all new code
- Follow **React Hooks** patterns
- Use **Tailwind CSS** utility classes
- Implement **responsive design** principles
- Add **proper error handling**
- Include **loading states** for async operations

## 🛣️ Roadmap

### **Phase 1: Current Features** ✅
- [x] Product catalog with 300+ items
- [x] Shopping cart and wishlist functionality
- [x] AI chatbot with intelligent responses
- [x] Payment and checkout flow
- [x] User settings and preferences
- [x] Responsive design and animations

### **Phase 2: Enhanced Features** 🚧
- [ ] **User Authentication**: Complete login/register system
- [ ] **Backend Integration**: REST API connectivity
- [ ] **Real Payments**: Stripe/PayPal integration
- [ ] **Order Management**: Order history and tracking
- [ ] **Product Reviews**: User-generated reviews and ratings

### **Phase 3: Advanced Features** 📋
- [ ] **Search Engine**: Advanced product search with filters
- [ ] **Recommendations**: AI-powered product suggestions
- [ ] **Social Features**: Product sharing and wishlists
- [ ] **Admin Panel**: Product and order management
- [ ] **Analytics Dashboard**: Sales and user behavior insights

### **Phase 4: Enterprise Features** 🎯
- [ ] **Multi-vendor Support**: Marketplace functionality
- [ ] **Inventory Management**: Real-time stock tracking
- [ ] **Advanced Analytics**: Business intelligence features
- [ ] **Mobile Apps**: React Native mobile applications
- [ ] **Internationalization**: Multi-language and currency support

## 📄 License

This project is licensed under the **MIT License**. This means you are free to:

- ✅ **Use** the code for personal and commercial projects
- ✅ **Modify** and adapt the code to your needs
- ✅ **Distribute** copies of the software
- ✅ **Sell** software that includes this code

**Requirements:**
- 📝 Include the original license notice in all copies
- 📝 Include copyright notice of the original author

See the [LICENSE](LICENSE) file for complete license text.

---

<div align="center">

**Built with ❤️ using React, TypeScript, and Tailwind CSS**

*A modern e-commerce platform that combines beautiful design with powerful functionality*

[![GitHub Stars](https://img.shields.io/github/stars/yourusername/mega-mart?style=social)](https://github.com/yourusername/mega-mart)
[![Twitter Follow](https://img.shields.io/twitter/follow/yourusername?style=social)](https://twitter.com/yourusername)

[⬆ Back to Top](#-mega-mart---modern-e-commerce-platform) • [Live Demo](https://mega-mart-project-ten.vercel.app/) • [Documentation](https://mega-mart-project-ten.vercel.app/)

</div>
