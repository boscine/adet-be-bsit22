# adet-be-bsit22 🚀

A backend API built with Hono, Prisma, and JWT authentication.

## 🛠 Setup

1. **Clone the repository**
   git clone <your-repo-url>
   cd adet-be-bsit22

2. **Install dependencies**
   npm install

3. **Environment Variables**
   Create a .env file in the root directory and add your credentials:
   DATABASE_URL="mysql://USER:PASSWORD@localhost:3306/DB_NAME"
   JWT_SECRET="YOUR_SAFE_SECRET_KEY"

4. **Prisma Setup**
   npx prisma generate

5. **Run Development Server**
   npm run dev

## 📂 Folder Structure


```
src/
├── routes/
│   ├── auth.routes.ts      ← POST /api/auth/login
│   └── api.routes.ts       ← protected routes (add yours here)
├── middleware/
│   └── auth.middleware.ts  ← verifies JWT on every /api/* request
└── server.ts               ← app entry point
```

## 🧪 Testing the API

### 1. Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"password"}'

### 2. Access Protected Route
curl http://localhost:3000/api/hello \
  -H "Authorization: Bearer <token>"

## ⚠️ Important Note
The .env file and node_modules are ignored by Git. Always ensure you have a local .env file set up before running the project.
