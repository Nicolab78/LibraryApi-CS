import api from './api';
import type { Book, CreateBookDto, UpdateBookDto } from '../types/books'

export const bookService = {
  async getAllBooks(): Promise<Book[]> {
    const response = await api.get<Book[]>('/books');
    return response.data;
  },

  async getBookById(id: number): Promise<Book> {
    const response = await api.get<Book>(`/books/${id}`);
    return response.data;
  },

  async createBook(book: CreateBookDto): Promise<Book> {
    const response = await api.post<Book>('/books', book);
    return response.data;
  },

  async updateBook(id: number, book: UpdateBookDto): Promise<Book> {
    const response = await api.put<Book>(`/books/${id}`, book);
    return response.data;
  },

  async deleteBook(id: number): Promise<void> {
    await api.delete(`/books/${id}`);
  },
};