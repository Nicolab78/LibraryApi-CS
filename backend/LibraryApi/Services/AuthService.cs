using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using LibraryApi.DTOs.Auth;
using LibraryApi.DTOs.User;
using LibraryApi.Models;
using LibraryApi.Repositories.Interfaces;
using LibraryApi.Services.Interfaces;
using Microsoft.IdentityModel.Tokens;

namespace LibraryApi.Services;

public class AuthService : IAuthService
{
    private readonly IUserRepository _userRepository;
    private readonly IConfiguration _configuration;

    public AuthService(IUserRepository userRepository, IConfiguration configuration)
    {
        _userRepository = userRepository;
        _configuration = configuration;
    }

    public async Task<AuthResponseDto?> RegisterAsync(RegisterDto registerDto)
    {
        if (await _userRepository.EmailExistsAsync(registerDto.Email))
            return null;

        if (await _userRepository.UsernameExistsAsync(registerDto.Username))
            return null;

        var passwordHash = BCrypt.Net.BCrypt.HashPassword(registerDto.Password);

        var user = new User
        {
            Username = registerDto.Username,
            Email = registerDto.Email,
            PasswordHash = passwordHash
        };

        var createdUser = await _userRepository.CreateAsync(user);

        // Générer le token JWT
        var token = GenerateJwtToken(createdUser);

        return new AuthResponseDto
        {       
            Token = token,
            User = new UserDto
            {
                Username = createdUser.Username,
                Email = createdUser.Email
            }
        };
    }

    public async Task<AuthResponseDto?> LoginAsync(LoginDto loginDto)
    {
        var user = await _userRepository.GetByEmailAsync(loginDto.Email);
        if (user == null)
            return null;

        if (!BCrypt.Net.BCrypt.Verify(loginDto.Password, user.PasswordHash))
            return null;

        var token = GenerateJwtToken(user);

        return new AuthResponseDto
        {
            Token = token,
            User = new UserDto
            {
                Username = user.Username,
                Email = user.Email
            }
        };
    }

    private string GenerateJwtToken(User user)
{
    var secretKey = Environment.GetEnvironmentVariable("JWT_SECRET_KEY") 
        ?? throw new InvalidOperationException("JWT SecretKey not configured");
    var issuer = Environment.GetEnvironmentVariable("JWT_ISSUER") ?? "LibraryApi";
    var audience = Environment.GetEnvironmentVariable("JWT_AUDIENCE") ?? "LibraryApiUsers";

    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
    var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

    var claims = new[]
    {
        new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
        new Claim(ClaimTypes.Name, user.Username),
        new Claim(ClaimTypes.Email, user.Email)
    };

    var token = new JwtSecurityToken(
        issuer: issuer,
        audience: audience,
        claims: claims,
        expires: DateTime.UtcNow.AddHours(24),
        signingCredentials: credentials
    );

    return new JwtSecurityTokenHandler().WriteToken(token);
}
}