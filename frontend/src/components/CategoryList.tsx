import type { Category } from '../types/categories';

interface CategoryListProps {
  categories: Category[];
  onDelete: (id: number) => void;
}

export function CategoryList({ categories, onDelete }: CategoryListProps) {
  if (categories.length === 0) {
    return (
      <div className="empty-state">
        <p>Aucune catégorie.</p>
      </div>
    );
  }

  return (
    <div className="category-list">
      <h3>Catégories existantes</h3>
      <div className="category-items">
        {categories.map((category) => (
          <div key={category.id} className="category-item">
            <span>{category.name}</span>
            <button 
              className="btn btn-small btn-danger" 
              onClick={() => onDelete(category.id)}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}