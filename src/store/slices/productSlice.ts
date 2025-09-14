import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  brand: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  features?: string[];
  specifications?: Record<string, string>;
}

interface ProductState {
  products: Product[];
  categories: string[];
  loading: boolean;
  selectedCategory: string | null;
  searchQuery: string;
  priceRange: [number, number];
  sortBy: 'name' | 'price' | 'rating' | 'newest';
}

const initialState: ProductState = {
  products: [],
  categories: ['Electronics', 'Fashion', 'Home & Garden', 'Sports', 'Books', 'Toys'],
  loading: false,
  selectedCategory: null,
  searchQuery: '',
  priceRange: [0, 200000],
  sortBy: 'name',
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<string | null>) => {
      state.selectedCategory = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setPriceRange: (state, action: PayloadAction<[number, number]>) => {
      state.priceRange = action.payload;
    },
    setSortBy: (state, action: PayloadAction<'name' | 'price' | 'rating' | 'newest'>) => {
      state.sortBy = action.payload;
    },
  },
});

export const {
  setProducts,
  setLoading,
  setSelectedCategory,
  setSearchQuery,
  setPriceRange,
  setSortBy,
} = productSlice.actions;

export default productSlice.reducer;