import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  inStock: boolean;
  category: string;
  rating: number;
}

interface WishlistState {
  items: WishlistItem[];
}

const getStoredWishlist = (): WishlistItem[] => {
  try {
    const stored = localStorage.getItem('megamart_wishlist');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const initialState: WishlistState = {
  items: getStoredWishlist(),
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<WishlistItem>) => {
      const exists = state.items.some(item => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
        localStorage.setItem('megamart_wishlist', JSON.stringify(state.items));
      }
    },
    removeFromWishlist: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      localStorage.setItem('megamart_wishlist', JSON.stringify(state.items));
    },
    clearWishlist: (state) => {
      state.items = [];
      localStorage.removeItem('megamart_wishlist');
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;