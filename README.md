# Hono MVC Activity

## Folder Structure
```
hono-mvc-activity/
├── src/
│   ├── config/
│   │   └── db.ts           ← MySQL connection
│   ├── models/
│   │   └── post.model.ts   ← database queries
│   ├── controllers/
│   │   └── post.controller.ts ← request logic
│   ├── routes/
│   │   └── post.routes.ts  ← route definitions
│   └── index.ts            ← entry point
├── .env                    ← database credentials
├── setup.sql               ← run this in MySQL first
├── package.json
└── tsconfig.json
```

## Setup

### 1. Create the database
Run `setup.sql` in MySQL CMD:
```sql
source setup.sql
```

### 2. Update `.env`
```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=bsit_22
PORT=3000
```

### 3. Install dependencies
```bash
npm install
```

### 4. Run the server
```bash
npm run dev
```

## API Endpoints

| Method | Endpoint          | Description       |
|--------|-------------------|-------------------|
| GET    | /api/posts        | Get all posts     |
| GET    | /api/posts/:id    | Get post by ID    |
| POST   | /api/posts        | Create a post     |
| PATCH  | /api/posts/:id    | Update a post     |
| DELETE | /api/posts/:id    | Delete a post     |

## Test with curl

```bash
# Get all posts
curl http://localhost:3000/api/posts

# Get post by ID
curl http://localhost:3000/api/posts/1

# Create a post
curl -X POST http://localhost:3000/api/posts -H "Content-Type: application/json" -d "{\"title\":\"Need Physics Book\",\"description\":\"Looking for University Physics by Young\"}"

# Update a post
curl -X PATCH http://localhost:3000/api/posts/1 -H "Content-Type: application/json" -d "{\"status\":\"closed\"}"

# Delete a post
curl -X DELETE http://localhost:3000/api/posts/1
```
