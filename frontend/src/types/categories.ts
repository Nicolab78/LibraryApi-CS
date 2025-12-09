export interface Category {
  id: number;
  name: string;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateCategoryDto {
  name: string;
}

export interface UpdateCategoryDto {
  name: string;
}