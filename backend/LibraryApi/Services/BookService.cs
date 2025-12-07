using LibraryApi.DTOs;
using LibraryApi.DTOs.Book;
using LibraryApi.Models;
using LibraryApi.Repositories.Interfaces;
using LibraryApi.Services.Interfaces;

namespace LibraryApi.Services;

public class BookService : IBookService
{
    private readonly IBookRepository _bookRepository;

    public BookService(IBookRepository bookRepository)
    {
        _bookRepository = bookRepository;
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

        var createBook = await _bookRepository.CreateAsync(book);
        return MapToDto(createBook);
    }

    public async Task<bool> DeleteBookAsync(int id)
    {
        return await _bookRepository.DeleteAsync(id);
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

        var updatedBook = await _bookRepository.UpdateAsync(book);
        return updatedBook == null ? null : MapToDto(updatedBook);
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
            UpdatedAt = book.UpdatedAt


        };
    }
}