namespace LibraryApi.DTOs;

public class CreateBookDto
{
    public string Title { get; set; } = string.Empty;
    public string Author { get; set; } = string.Empty;
    public string? Isbn { get; set; }
    public int? PublishedYear { get; set; }
    public bool IsRead { get; set; } = false;
}