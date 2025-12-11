using LibraryApi.DTOs;
using LibraryApi.DTOs.Book;

namespace LibraryApi.Services.Interfaces;

public interface IBookService
{
    Task<IEnumerable<BookDto>> GetAllBooksAsync(int userId);
    Task<BookDto?> GetBookByIdAsync(int id);
    Task<BookDto> CreateBookAsync(CreateBookDto createBookDto, int userId);
    Task<BookDto?> UpdateBookAsync(int id, UpdateBookDto updateBookDto, int userId);
    Task<bool> DeleteBookAsync(int id);
}