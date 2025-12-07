import type { Book } from '../types/books';

interface BookCardProps {
  book: Book;
  onToggleRead: (id: number) => void;
  onDelete: (id: number) => void;
}

export function BookCard({ book, onToggleRead, onDelete }: BookCardProps) {
  return (
    <div className={`book-card ${book.isRead ? 'read' : ''}`}>
      <h3>{book.title}</h3>
      <p><strong>Auteur:</strong> {book.author}</p>
      {book.isbn && <p><strong>ISBN:</strong> {book.isbn}</p>}
      {book.publishedYear && <p><strong>Année:</strong> {book.publishedYear}</p>}
      <p><strong>Statut:</strong> {book.isRead ? '✅ Lu' : '📖 Non lu'}</p>
      
      <div className="book-card-actions">
        <button className="btn" onClick={() => onToggleRead(book.id)}>
          {book.isRead ? 'Marquer comme non lu' : 'Marquer comme lu'}
        </button>
        <button className="btn btn-danger" onClick={() => onDelete(book.id)}>
          Supprimer
        </button>
      </div>
    </div>
  );
}