namespace LibraryApi.DTOs.Book;

public class UpdateBookDto
{
    public string Title { get; set; } = string.Empty;
    public string Author { get; set; } = string.Empty;
    public string? Isbn { get; set; }
    public int? PublishedYear { get; set; }
    public bool IsRead { get; set; }
}