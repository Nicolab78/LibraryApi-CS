import { useEffect, useState } from 'react';
import type { Book, CreateBookDto, UpdateBookDto } from '../types/books';
import type { Category, CreateCategoryDto } from '../types/categories';
import { bookService } from '../services/bookService';
import { categoryService } from '../services/categoryService';
import { BookForm } from '../components/BookForm';
import { BookList } from '../components/BookList';
import { CategoryForm } from '../components/CategoryForm';
import { CategoryList } from '../components/CategoryList';
import { useAuth } from '../context/AuthContext';

function Home() {
  const { user, logout } = useAuth();
  const [books, setBooks] = useState<Book[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [booksData, categoriesData] = await Promise.all([
        bookService.getAllBooks(),
        categoryService.getAllCategories(),
      ]);
      setBooks(booksData);
      setCategories(categoriesData);
      setError(null);
    } catch (err) {
      setError('Erreur lors du chargement des données');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBook = async (newBook: CreateBookDto) => {
    try {
      const createdBook = await bookService.createBook(newBook);
      setBooks([...books, createdBook]);
      setError(null);
    } catch (err) {
      setError('Erreur lors de la création du livre');
      console.error(err);
    }
  };

  const handleToggleRead = async (id: number) => {
    try {
      const book = books.find(b => b.id === id);
      if (!book) return;

      const updateData: UpdateBookDto = {
        ...book,
        isRead: !book.isRead,
      };

      const updatedBook = await bookService.updateBook(id, updateData);
      setBooks(books.map(b => b.id === id ? updatedBook : b));
      setError(null);
    } catch (err) {
      setError('Erreur lors de la mise à jour du livre');
      console.error(err);
    }
  };

  const handleDeleteBook = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce livre ?')) {
      return;
    }

    try {
      await bookService.deleteBook(id);
      setBooks(books.filter(b => b.id !== id));
      setError(null);
    } catch (err) {
      setError('Erreur lors de la suppression du livre');
      console.error(err);
    }
  };

  const handleCreateCategory = async (newCategory: CreateCategoryDto) => {
    try {
      const createdCategory = await categoryService.createCategory(newCategory);
      setCategories([...categories, createdCategory]);
      setError(null);
    } catch (err) {
      setError('Erreur lors de la création de la catégorie');
      console.error(err);
    }
  };

  const handleDeleteCategory = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) {
      return;
    }

    try {
      await categoryService.deleteCategory(id);
      setCategories(categories.filter(c => c.id !== id));
      setError(null);
    } catch (err) {
      setError('Erreur lors de la suppression de la catégorie');
      console.error(err);
    }
  };

  if (loading) {
    return <div className="loading">Chargement...</div>;
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>📚 Ma Bibliothèque</h1>
        <div className="user-info">
          <span>Bonjour {user?.username} !</span>
          <button onClick={logout} className="btn btn-logout">Déconnexion</button>
        </div>
      </header>

      {error && <div className="error-message">{error}</div>}

      <section className="categories-section">
        <CategoryForm onSubmit={handleCreateCategory} />
        <CategoryList categories={categories} onDelete={handleDeleteCategory} />
      </section>

      <section className="books-section">
        <BookForm onSubmit={handleCreateBook} categories={categories} />
        <BookList 
          books={books}
          categories={categories}
          onToggleRead={handleToggleRead}
          onDelete={handleDeleteBook}
        />
      </section>
    </div>
  );
}

export default Home;