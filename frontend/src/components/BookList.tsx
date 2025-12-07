import type { Book } from '../types/books';
import { BookCard } from './BookCard';

interface BookListProps {
  books: Book[];
  onToggleRead: (id: number) => void;
  onDelete: (id: number) => void;
}

export function BookList({ books, onToggleRead, onDelete }: BookListProps) {
  if (books.length === 0) {
    return (
      <div className="empty-state">
        <p>Aucun livre dans votre bibliothèque.</p>
      </div>
    );
  }

  return (
    <div className="book-list">
      <h2>Ma bibliothèque ({books.length} livre{books.length > 1 ? 's' : ''})</h2>
      {books.map((book) => (
        <BookCard 
          key={book.id} 
          book={book} 
          onToggleRead={onToggleRead}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}