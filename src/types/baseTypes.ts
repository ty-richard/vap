interface BaseRecord {
  id: string;
  collectionId: string;
  collectionName: string;
  created: string;
  updated: string;
}

interface Category extends BaseRecord {
  name: string;
  slug: string;
  description: string;
  category_img: string;
  subcategories?: string[];
}

interface DropdownData {
  categories: Category[];
}

export type { BaseRecord, Category, DropdownData }; 