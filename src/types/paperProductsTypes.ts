export interface PaperProduct {
  productSKU: string;
  productName: string;
  productDescription: string;
  price: number;
  quantity: number;
  image: string;
}

export interface PaperProductsData {
  paperProducts: PaperProduct[];
}