import { Routes, Route } from "react-router-dom";
import ProductList from "./pages/ProductList";
import CreateProductForm from "./pages/CreateProductForm";
import NavBar from "./components/NavBar";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center space-y-12">
      <Toaster position="top-center" />
      <NavBar />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/create-product" element={<CreateProductForm />} />
      </Routes>
    </div>
  );
};

export default App;
