using LibraryApi.DTOs;
using LibraryApi.DTOs.Book;
using LibraryApi.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;


namespace LibraryApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BooksController : ControllerBase
{
    private readonly IBookService _bookService;

    public BooksController(IBookService bookService)
    {
        _bookService = bookService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<BookDto>>> GetAllBooks()
    {
        var books = await _bookService.GetAllBooksAsync();
        return Ok(books);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<BookDto>> GetBookById(int id)
    {
        var book = await _bookService.GetBookByIdAsync(id);
        if(book == null)
            return NotFound();
        return Ok(book);
    }

    [HttpPost]
    public async Task<ActionResult<BookDto>> CreateBook(CreateBookDto createBookDto)
    {
        var book = await _bookService.CreateBookAsync(createBookDto);
        return CreatedAtAction(nameof(GetBookById), new {id = book.Id}, book);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<BookDto>> UpdateBook(int id, UpdateBookDto updateBookDto)
    {
        var book = await _bookService.UpdateBookAsync(id, updateBookDto);
        if (book ==null)
            return NotFound();

        return Ok(book);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteBook(int id)
    {
        var result = await _bookService.DeleteBookAsync(id);
        if (!result)
            return NotFound();

        return NoContent();
    }

}