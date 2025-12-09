import type { Book } from '../types/books';
import type { Category } from '../types/categories';

interface BookCardProps {
  book: Book;
  categories: Category[];
  onToggleRead: (id: number) => void;
  onDelete: (id: number) => void;
}

export function BookCard({ book, categories, onToggleRead, onDelete }: BookCardProps) {
  const bookCategories = categories.filter(cat => book.categoryIds.includes(cat.id));

  return (
    <div className={`book-card ${book.isRead ? 'read' : ''}`}>
      <h3>{book.title}</h3>
      <p><strong>Auteur:</strong> {book.author}</p>
      {book.isbn && <p><strong>ISBN:</strong> {book.isbn}</p>}
      {book.publishedYear && <p><strong>Année:</strong> {book.publishedYear}</p>}
      
      {bookCategories.length > 0 && (
        <div className="book-categories">
          {bookCategories.map(cat => (
            <span key={cat.id} className="category-badge">{cat.name}</span>
          ))}
        </div>
      )}
      
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