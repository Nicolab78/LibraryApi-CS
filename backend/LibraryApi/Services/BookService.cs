using LibraryApi.DTOs;
using LibraryApi.DTOs.Book;
using LibraryApi.Models;
using LibraryApi.Repositories.Interfaces;
using LibraryApi.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace LibraryApi.Services;

public class BookService : IBookService
{
    private readonly IBookRepository _bookRepository;
    private readonly ICategoryRepository _categoryRepository;

    public BookService(IBookRepository bookRepository, ICategoryRepository categoryRepository)
    {
        _bookRepository = bookRepository;
        _categoryRepository = categoryRepository;
    }

    public async Task<IEnumerable<BookDto>> GetAllBooksAsync()
    {
        var books = await _bookRepository.GetAllAsync();
        return books.Select(MapToDto);
    }

    public async Task<BookDto?> GetBookByIdAsync(int id)
    {
        var book = await _bookRepository.GetByIdAsync(id);
        return book == null ? null : MapToDto(book);
    }

    public async Task<BookDto> CreateBookAsync(CreateBookDto createBookDto)
    {
        var book = new Book
        {
            Title = createBookDto.Title,
            Author = createBookDto.Author,
            Isbn = createBookDto.Isbn,
            PublishedYear = createBookDto.PublishedYear,
            IsRead = createBookDto.IsRead
        };

        if (createBookDto.CategoryIds.Any())
        {
            var categories = await LoadCategoriesAsync(createBookDto.CategoryIds);
            book.Categories = categories;
        }

        var createdBook = await _bookRepository.CreateAsync(book);
        return MapToDto(createdBook);
    }

    public async Task<BookDto?> UpdateBookAsync(int id, UpdateBookDto updateBookDto)
    {
        var book = new Book
        {
            Id = id,
            Title = updateBookDto.Title,
            Author = updateBookDto.Author,
            Isbn = updateBookDto.Isbn,
            PublishedYear = updateBookDto.PublishedYear,
            IsRead = updateBookDto.IsRead
        };

        if (updateBookDto.CategoryIds.Any())
        {
            var categories = await LoadCategoriesAsync(updateBookDto.CategoryIds);
            book.Categories = categories;
        }

        var updatedBook = await _bookRepository.UpdateAsync(book);
        return updatedBook == null ? null : MapToDto(updatedBook);
    }

    public async Task<bool> DeleteBookAsync(int id)
    {
        return await _bookRepository.DeleteAsync(id);
    }

    private async Task<List<Category>> LoadCategoriesAsync(List<int> categoryIds)
    {
        var allCategories = await _categoryRepository.GetAllAsync();
        return allCategories.Where(c => categoryIds.Contains(c.Id)).ToList();
    }

    private static BookDto MapToDto(Book book)
    {
        return new BookDto
        {
            Id = book.Id,
            Title = book.Title,
            Author = book.Author,
            Isbn = book.Isbn,
            PublishedYear = book.PublishedYear,
            IsRead = book.IsRead,
            CreatedAt = book.CreatedAt,
            UpdatedAt = book.UpdatedAt,
            CategoryIds = book.Categories.Select(c => c.Id).ToList()
        };
    }
}