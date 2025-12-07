import { useState } from 'react';
import type { CreateBookDto } from '../types/books';

interface BookFormProps {
  onSubmit: (book: CreateBookDto) => void;
}

export function BookForm({ onSubmit }: BookFormProps) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');
  const [publishedYear, setPublishedYear] = useState('');
  const [isRead, setIsRead] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newBook: CreateBookDto = {
      title,
      author,
      isbn: isbn || undefined,
      publishedYear: publishedYear ? parseInt(publishedYear) : undefined,
      isRead,
    };

    onSubmit(newBook);

    setTitle('');
    setAuthor('');
    setIsbn('');
    setPublishedYear('');
    setIsRead(false);
  };

  return (
    <form className="book-form" onSubmit={handleSubmit}>
      <h2>Ajouter un livre</h2>
      
      <div className="form-group">
        <label htmlFor="title">Titre *</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="author">Auteur *</label>
        <input
          id="author"
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="isbn">ISBN</label>
        <input
          id="isbn"
          type="text"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="publishedYear">Année de publication</label>
        <input
          id="publishedYear"
          type="number"
          value={publishedYear}
          onChange={(e) => setPublishedYear(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>
          <input
            type="checkbox"
            checked={isRead}
            onChange={(e) => setIsRead(e.target.checked)}
          />
          Déjà lu
        </label>
      </div>

      <button type="submit" className="btn btn-primary">
        Ajouter le livre
      </button>
    </form>
  );
}