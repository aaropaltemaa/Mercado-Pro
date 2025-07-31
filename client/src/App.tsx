import { Routes, Route } from "react-router-dom";
import ProductList from "./pages/ProductList";
import CreateProductForm from "./pages/CreateProductForm";
import LoginForm from "./components/LoginForm";
import NavBar from "./components/NavBar";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/auth";
import { useEffect } from "react";
import MyOrdersPage from "./components/MyOrdersPage";

const App = () => {
  const initialize = useAuthStore((state) => state.initialize);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <div className="flex min-h-screen w-full flex-col items-center space-y-12">
      <Toaster position="top-center" />
      <NavBar />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/create-product" element={<CreateProductForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/orders" element={<MyOrdersPage />} />
      </Routes>
    </div>
  );
};

export default App;
