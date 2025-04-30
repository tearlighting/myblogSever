# 🛠 MyBlogServer - Backend for MyBlog (Node.js + Express)

This is the backend service for [`MyBlog`](https://github.com/tearlighting/myblog), built using Node.js and Express, with Sequelize and MySQL. It goes beyond basic REST API design by featuring custom middleware, JWT authentication, parameter validation via decorators, and clean architecture practices.

## ✨ Highlights

- **RESTful Routing**: Standardized, predictable endpoints with clear responsibilities.
- **JWT Authentication**: Migrated from traditional `cookie + session` to modern token-based auth using JWT.
- **Custom Middleware**:
  - `corsMiddleware`: Manually implemented CORS support.
  - `authMiddleware`: Authentication and authorization check.
  - `errorMiddleware`: Centralized error catching and formatted response.
- **Custom Router Class**: A hand-written class to manage route matching and registration instead of hardcoded `express.Router()` calls.
- **Decorator-Based Validation**: Implemented function and parameter decorators to decouple data validation from business logic (before knowing about Zod).
- **ORM Access**: Sequelize abstracts SQL queries for clean and efficient DB interaction.
- **Markdown HTML Cleanup**: Fixed broken HTML (e.g., unclosed `<img>`) using a custom stack-based tag balancing class.

## 🧱 Tech Stack

- Node.js + Express
- MySQL + Sequelize
- JWT + cookie-parser
- Markdown-it
- TypeScript

## 📦 Setup

```bash
git clone https://github.com/tearlighting/myblogSever.git
cd myblogSever
npm install
npm run dev
```

## Project Structure

```csharp
├── src
│   ├── config         # DB and app config
│   ├── hooks          # Custom hooks
│   ├── routes         # Custom route mapping classes
│   │    └── middleware  # CORS, Auth, Error handling
│   ├── service        # Business logic + decorators
│   ├── dao            # Sequelize DAO layer
│   └── utils          # Tools (e.g. Markdown sanitizer)
```

## 📌 后续计划

- Replace manual decorators with Zod
- manage system with React
