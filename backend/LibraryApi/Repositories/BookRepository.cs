using LibraryApi.Data;
using LibraryApi.Models;
using LibraryApi.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace LibraryApi.Repositories;

public class BookRepository : IBookRepository
{
    private readonly ApplicationDbContext _context;

    public BookRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Book> CreateAsync(Book book)
{
    _context.Books.Add(book);
    await _context.SaveChangesAsync();
    return await _context.Books
        .Include(b => b.Categories)
        .FirstAsync(b => b.Id == book.Id);
}

    public async Task<bool> DeleteAsync(int id)
    {
        var book = await _context.Books.FindAsync(id);
        if (book == null)
            return false;

        _context.Books.Remove(book);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<IEnumerable<Book>> GetAllAsync()
    {
        return await _context.Books
            .Include(b => b.Categories)
            .ToListAsync();
    }

    public async Task<Book?> GetByIdAsync(int id)
    {
        return await _context.Books
            .Include(b => b.Categories)
            .FirstOrDefaultAsync(b => b.Id == id);
    }

    public async Task<Book?> UpdateAsync(Book book)
{
    var existingBook = await _context.Books
        .Include(b => b.Categories)
        .FirstOrDefaultAsync(b => b.Id == book.Id);
        
    if (existingBook == null)
        return null;

    existingBook.Title = book.Title;
    existingBook.Author = book.Author;
    existingBook.Isbn = book.Isbn;
    existingBook.PublishedYear = book.PublishedYear;
    existingBook.IsRead = book.IsRead;
    existingBook.UpdatedAt = DateTime.UtcNow;
    
    existingBook.Categories.Clear();
    existingBook.Categories = book.Categories;

    await _context.SaveChangesAsync();
    return existingBook;
}
}