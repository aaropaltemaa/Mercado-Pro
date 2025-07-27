import { Routes, Route } from "react-router-dom";
import ProductList from "./pages/ProductList";
import CreateProductForm from "./pages/CreateProductForm";
import NavBar from "./components/NavBar";

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/create-product" element={<CreateProductForm />} />
      </Routes>
    </>
  );
};

export default App;
