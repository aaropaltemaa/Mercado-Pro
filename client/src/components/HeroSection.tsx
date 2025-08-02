const HeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-24 px-6 rounded-xl shadow-md text-center space-y-6">
      <h1 className="text-5xl font-extrabold tracking-tight">
        Elevate Your Tech Experience
      </h1>
      <p className="text-lg max-w-2xl mx-auto">
        Explore a curated selection of premium technology products at
        exceptional prices.
      </p>
      <button className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-blue-100 transition">
        Shop Now
      </button>
    </section>
  );
};

export default HeroSection;
