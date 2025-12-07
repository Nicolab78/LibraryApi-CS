import { useEffect, useState } from 'react';
import type { Book, CreateBookDto, UpdateBookDto } from './types/books';
import { bookService } from './services/bookService';
import { BookForm } from './components/BookForm';
import { BookList } from './components/BookList';

function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      setLoading(true);
      const data = await bookService.getAllBooks();
      setBooks(data);
      setError(null);
    } catch (err) {
      setError('Erreur lors du chargement des livres');
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

  if (loading) {
    return <div className="loading">Chargement...</div>;
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>📚 Ma Bibliothèque</h1>
      </header>

      {error && <div className="error-message">{error}</div>}

      <BookForm onSubmit={handleCreateBook} />
      <BookList 
        books={books} 
        onToggleRead={handleToggleRead}
        onDelete={handleDeleteBook}
      />
    </div>
  );
}

export default App;