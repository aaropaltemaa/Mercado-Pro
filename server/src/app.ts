import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth";
import productRoutes from "./routes/products";
import userRoutes from "./routes/users";
import cartRoutes from "./routes/cart";
import orderRoutes from "./routes/orders";

const app = express();

const allowedOrigins = [
  "http://localhost:5173", // local frontend
  "https://mercado-pro-1.onrender.com", // deployed static site
];

// Configure CORS
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or server-to-server)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.static("dist"));

// Routes
app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/users", userRoutes);
app.use("/cart", cartRoutes);
app.use("/orders", orderRoutes);

app.get("/health", (_req, res) => res.status(200).send("ok"));

export default app;
