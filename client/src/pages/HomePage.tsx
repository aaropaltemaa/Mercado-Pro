import HeroSection from "../components/HeroSection";
import ProductList from "../components/ProductList";

const HomePage = () => {
  return (
    <div className="w-full">
      <div className="w-full px-4 mb-12">
        <HeroSection />
      </div>
      <div className="max-w-7xl mx-auto px-4">
        <ProductList />
      </div>
    </div>
  );
};

export default HomePage;
