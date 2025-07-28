import express from 'express';
import cors from 'cors';
import authRoutes from "./routes/auth"
import productRoutes from "./routes/products"
import userRoutes from "./routes/users";

const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/users', userRoutes);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
