import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  inStock: boolean;
  category: string;
}

interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}

const getStoredCart = (): CartItem[] => {
  try {
    const stored = localStorage.getItem('megamart_cart');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const calculateTotal = (items: CartItem[]) => {
  return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
};

const calculateItemCount = (items: CartItem[]) => {
  return items.reduce((count, item) => count + item.quantity, 0);
};

const initialItems = getStoredCart();
const initialState: CartState = {
  items: initialItems,
  total: calculateTotal(initialItems),
  itemCount: calculateItemCount(initialItems),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Omit<CartItem, 'quantity'>>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      
      state.total = calculateTotal(state.items);
      state.itemCount = calculateItemCount(state.items);
      localStorage.setItem('megamart_cart', JSON.stringify(state.items));
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.total = calculateTotal(state.items);
      state.itemCount = calculateItemCount(state.items);
      localStorage.setItem('megamart_cart', JSON.stringify(state.items));
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item && action.payload.quantity > 0) {
        item.quantity = action.payload.quantity;
      } else if (item && action.payload.quantity <= 0) {
        state.items = state.items.filter(item => item.id !== action.payload.id);
      }
      
      state.total = calculateTotal(state.items);
      state.itemCount = calculateItemCount(state.items);
      localStorage.setItem('megamart_cart', JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      state.itemCount = 0;
      localStorage.removeItem('megamart_cart');
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;