export type VitrineCategory = "bazar" | "artesanato";

export interface IVitrineItem {
  id?: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  category: VitrineCategory;
  createdAt?: string;
}