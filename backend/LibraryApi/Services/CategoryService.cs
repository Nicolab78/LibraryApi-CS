using LibraryApi.DTOs.Category;
using LibraryApi.Models;
using LibraryApi.Repositories.Interfaces;
using LibraryApi.Services.Interfaces;

namespace LibraryApi.Services;

public class CategoryService : ICategoryService
{
    private readonly ICategoryRepository _categoryRepository;

    public CategoryService(ICategoryRepository categoryRepository)
    {
        _categoryRepository = categoryRepository;
    }

    public async Task<IEnumerable<CategoryDto>> GetAllCategoriesAsync()
    {
        var categories = await _categoryRepository.GetAllAsync();
        return categories.Select(MapToDto);
    }

    public async Task<CategoryDto?> GetCategoryByIdAsync(int id)
    {
        var category = await _categoryRepository.GetByIdAsync(id);
        return category == null ? null : MapToDto(category);
    }

    public async Task<CategoryDto> CreateCategoryAsync(CreateCategoryDto createCategoryDto)
    {
        var category = new Category
        {
            Name = createCategoryDto.Name
        };

        var createdCategory = await _categoryRepository.CreateAsync(category);
        return MapToDto(createdCategory);
    }

    public async Task<CategoryDto?> UpdateCategoryAsync(int id, UpdateCategoryDto updateCategoryDto)
    {
        var category = new Category
        {
            Id = id,
            Name = updateCategoryDto.Name
        };

        var updatedCategory = await _categoryRepository.UpdateAsync(category);
        return updatedCategory == null ? null : MapToDto(updatedCategory);
    }

    public async Task<bool> DeleteCategoryAsync(int id)
    {
        return await _categoryRepository.DeleteAsync(id);
    }

    private static CategoryDto MapToDto(Category category)
    {
        return new CategoryDto
        {
            Id = category.Id,
            Name = category.Name,
            CreatedAt = category.CreatedAt,
            UpdatedAt = category.UpdatedAt
        };
    }
}