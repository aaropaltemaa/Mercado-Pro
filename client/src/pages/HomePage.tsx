import { useRef } from "react";
import HeroSection from "../components/HeroSection";
import ProductList from "../components/ProductList";
import Footer from "../components/Footer";
import FilterBar from "../components/FilterBar";

const HomePage = () => {
  const productsRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-col items-center px-4 space-y-12 sm:px-6 lg:px-8">
      <HeroSection
        scrollToProducts={() =>
          productsRef.current?.scrollIntoView({ behavior: "smooth" })
        }
      />
      <hr className="w-full max-w-6xl border-t border-gray-200" />
      <section className="w-full max-w-6xl text-center rounded-xl shadow-sm py-12 px-4">
        <FilterBar />
      </section>
      <section
        ref={productsRef}
        className="w-full max-w-6xl text-center bg-gray-50 rounded-xl shadow-sm py-12 px-4"
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-8">
          Featured Products
        </h2>
        <ProductList />
      </section>
      <Footer />
    </div>
  );
};

export default HomePage;
