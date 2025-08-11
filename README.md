# 🛒 Mercado Pro

**Mercado Pro** is a full-stack multi-vendor e-commerce platform built with **React**, **Express**, **Prisma**, and **SQLite**. It allows multiple sellers to list products, while buyers can browse, shop, and manage their carts and orders. This project is built for scalability and extensibility, with clean architecture and modern tooling.

---

## 📦 Tech Stack

| Layer    | Tech                         |
| -------- | ---------------------------- |
| Frontend | React (Vite) + Tailwind CSS  |
| Backend  | Express.js + Node.js         |
| ORM & DB | Prisma + SQLite (easy setup) |
| Auth     | JWT                          |
| Payments | Stripe (planned)             |

---

## 🚀 Features

### 👥 User Accounts & Roles

- **Role selection at registration:** Choose Buyer or Seller
- **Secure authentication:** JWT-based login
- **Role-based access control:** Permissions by user type

### 🛍️ Products

- **Seller management:** Create, edit, and delete own products
- **Categories & filtering:** Organize and find products easily
- **Product images:** Upload and display images
- **Product detail page:** View related products
- **Average rating display:** See product ratings

### 🛒 Shopping Cart

- **Add to cart:** From product detail page
- **Adjust quantities:** Update item amounts
- **Remove items:** Delete from cart
- **View cart total:** See order summary

### 📦 Orders

- **Checkout:** Fill shipping form to place order
- **Order history:** Buyers can view past orders
- **Seller dashboard:** Manage own products and orders

### ⭐ Reviews

- **Ratings & comments:** Buyers leave feedback
- **Average rating:** Products show star rating and review count

---

## 📁 Folder Structure

```
mercado-pro/
├── client/    # React frontend
├── server/    # Express + Prisma backend
│   ├── src/
│   ├── prisma/
│   └── dev.db # SQLite database file
├── .env
├── pnpm-workspace.yaml
└── README.md
```

---

## ⚙️ Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/aaropaltemaa/mercado-pro.git
cd mercado-pro
```

### 2. Install dependencies (with pnpm)

```bash
pnpm install
```

### 3. Run the backend (SQLite + Prisma)

```bash
cd server
npx prisma migrate dev --name init
pnpm dev
```

### 4. Run the frontend (React + Vite)

```bash
cd ../client
pnpm dev
```

Visit: http://localhost:5173

---

## 🧪 API Routes (example)

**Get all users**

```
GET http://localhost:3000/users
```

**Create a user**

```
POST http://localhost:3000/users
Content-Type: application/json

{
    "name": "Alice",
    "email": "alice@example.com"
}
```

---

## 🧠 What You'll Learn

- How to use Prisma with SQLite for local development
- How to build a REST API with Express and TypeScript
- How to structure a full-stack monorepo using pnpm workspaces
- How to plan scalable e-commerce architecture

---

## 🗺 Roadmap

- User authentication (JWT or Clerk)
- Seller product management
- Orders, carts, and checkout flow
- Admin dashboard for moderation
- Stripe Connect for vendor payouts
- Supabase/PostgreSQL support for production

---

## 📝 License

MIT — free to use and modify.

---

## 🙌 Contributing

Open to suggestions, pull requests, and ideas. Feel free to fork the project or open an issue.
