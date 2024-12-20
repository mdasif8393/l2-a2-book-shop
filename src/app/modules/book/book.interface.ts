export interface IBook {
  title: string;
  author: string;
  price: number;
  category:
    | "Fiction"
    | "Science"
    | "Fiction"
    | "Poetry"
    | "Religious"
    | "SelfDevelopment";
  description: string;
  quantity: number;
  inStock: boolean;
}
