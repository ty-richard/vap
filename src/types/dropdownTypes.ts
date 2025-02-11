interface Category {
  id: number;
  name: string;
  subcategories: string[];
}

interface DropdownData {
  categories: Category[];
}

export type { Category, DropdownData };