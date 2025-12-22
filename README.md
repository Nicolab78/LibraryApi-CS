# LibraryApp

Application de gestion de bibliothèque personnelle avec authentification JWT.

## Stack

- **Backend:** C# ASP.NET Core 10, MySQL, Entity Framework
- **Frontend:** React TypeScript, Vite
- **DevOps:** Docker, Docker Compose, GitHub Actions, Railway, Vercel

## Installation

### Prérequis

- Docker & Docker Compose
- (Optionnel) .NET 10 SDK, Node.js 20 pour dev local

### Avec Docker
```bash
# Clone
git clone https://github.com/Nicolab78/LibraryApp.git
cd LibraryApp

# Configure env
cp .env.example .env
# Édite .env avec tes valeurs

# Lance
docker-compose up
```

**Frontend:** http://localhost:5173  
**API:** http://localhost:5285

### Dev local

**Backend:**
```bash
cd backend/LibraryApi
dotnet ef database update
dotnet run
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

## Déploiement

**Backend + MySQL :** Railway  
**Frontend :** Vercel

**CI/CD :** GitHub Actions build automatique sur push `main`/`develop`

**Demo :** https://library-api-cs.vercel.app (inactif)

## Fonctionnalités

- Authentification (inscription/connexion)
- Gestion de livres (CRUD)
- Catégories de livres
- Isolation des données par utilisateur