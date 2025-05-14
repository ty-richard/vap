import { BaseRecord } from './baseTypes';

export interface Product extends BaseRecord {
  base_price: number;
  case_per_pallet: number;
  case_size: string;
  categories: string[];
  collectionId: string;
  collectionName: string;
  created: string;
  description: string;
  image: string;
  name: string;
  sku: string;
  updated: string;
  variations?: string;
}