import { Routes, Route } from "react-router-dom";
import CreateProductForm from "./pages/CreateProductForm";
import LoginForm from "./components/forms/LoginForm";
import NavBar from "./components/NavBar";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/auth";
import { useEffect } from "react";
import CartPage from "./pages/CartPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import cartService from "./services/cart";
import { useCart } from "./store/cart";
import HomePage from "./pages/HomePage";
import CheckoutPage from "./pages/CheckoutPage";
import RegisterForm from "./components/forms/RegisterForm";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import SellerProductsPage from "./pages/SellerProductsPage";
import CategoryPage from "./pages/CategoryPage";

const App = () => {
  const initialize = useAuthStore((state) => state.initialize);
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    if (token) {
      cartService
        .getCart(token)
        .then((data) => useCart.getState().setCart(data));
    }
  }, [token]);

  return (
    <div className="flex min-h-screen w-full flex-col items-center space-y-16">
      <Toaster position="top-center" />
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create-product" element={<CreateProductForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
        <Route path="/order-history" element={<OrderHistoryPage />} />
        <Route path="/my-products" element={<SellerProductsPage />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
      </Routes>
    </div>
  );
};

export default App;
