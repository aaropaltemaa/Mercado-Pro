import HeroSection from "../components/HeroSection";
import ProductList from "../components/ProductList";

const HomePage = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 space-y-16">
      <HeroSection />
      <ProductList />
    </div>
  );
};

export default HomePage;
