import { BaseRecord } from './baseTypes';

export interface Product extends BaseRecord {
  base_price: number;
  case_per_pallet: number;
  case_size: string;
  categories: string[];
  description: string;
  image: string;
  name: string;
  sku: string;
}
