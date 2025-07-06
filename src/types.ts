// src/types.ts
export type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  validity: string;
};

export interface CartItem extends Product {
  quantity: number;
}

export interface Filters {
  category: string;
  minPrice: number;
  maxPrice: number;
}

export interface SortOptions {
  method: string;
}

export interface CartState {
  cart: CartItem[];
  total: number;
}

export interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
}

export interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export interface FiltersProps {
  onFilter: (filters: Filters) => void;
  category: string;
  minPrice: number;
  maxPrice: number;
  onSort: (method: string) => void;
  categories: string[];
}

export interface CartProps {
  cart: CartItem[];
  total: number;
  onClose: () => void;
  onRemove: (id: number) => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
}

export interface CartItemProps {
  item: CartItem;
  onRemove: (id: number) => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
}

export interface ProductListProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export interface ProductListItemProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export interface ProductGridItemProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export interface CartItemProps {
  item: CartItem;
  onRemove: (id: number) => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
}

export interface FiltersProps {
  onFilter: (filters: Filters) => void;
  category: string;
  minPrice: number;
  maxPrice: number;
  onSort: (method: string) => void;
  categories: string[];
}

export interface CartProps {
  cart: CartItem[];
  total: number;
  onClose: () => void;
  onRemove: (id: number) => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
}

export interface CartItemProps {
  item: CartItem;
  onRemove: (id: number) => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
}

export interface ProductListProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export interface ProductListItemProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export interface ProductGridItemProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}
