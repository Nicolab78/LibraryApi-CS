
namespace LibraryApi.DTOs.Book;

public class BookDto
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Author { get; set; } = string.Empty;
    public string? Isbn { get; set; }
    public int? PublishedYear { get; set; }
    public bool IsRead { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    public List<int> CategoryIds { get; set; } = new List<int>();
}