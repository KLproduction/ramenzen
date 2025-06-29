export type MenuItem = {
  name: string;
  description: string;
  price: number;
  tag: string;
  isAvailable: boolean;
  category: string;
  ingredients: string[];
  allergens: string[];
  order: number;
  spicyLevel: number;
  image: string | null;
};
