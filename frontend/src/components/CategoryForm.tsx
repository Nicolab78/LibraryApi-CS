import { useState } from 'react';
import type { CreateCategoryDto } from '../types/categories';

interface CategoryFormProps {
  onSubmit: (category: CreateCategoryDto) => void;
}

export function CategoryForm({ onSubmit }: CategoryFormProps) {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) return;

    onSubmit({ name });
    setName('');
  };

  return (
    <form className="category-form" onSubmit={handleSubmit}>
      <h3>Ajouter une catégorie</h3>
      
      <div className="form-group-inline">
        <input
          type="text"
          placeholder="Nom de la catégorie"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-primary">
          Ajouter
        </button>
      </div>
    </form>
  );
}