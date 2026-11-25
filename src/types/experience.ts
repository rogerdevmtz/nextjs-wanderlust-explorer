export const categories = ["Adventure", "Culture", "Food", "Wellness", "Nature"] as const;

export type Category = (typeof categories)[number];

export interface Experience {
  id: string;
  title: string;
  description: string;
  category: Category;
  destination: string;
  price: number;
  rating: number;
  imageUrl: string;
}
