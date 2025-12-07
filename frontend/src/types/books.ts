export interface Book {
  id: number;
  title: string;
  author: string;
  isbn?: string;
  publishedYear?: number;
  isRead: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateBookDto {
  title: string;
  author: string;
  isbn?: string;
  publishedYear?: number;
  isRead: boolean;
}

export interface UpdateBookDto {
  title: string;
  author: string;
  isbn?: string;
  publishedYear?: number;
  isRead: boolean;
}