const HeroSection = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="flex flex-col gap-6 px-8 py-16 max-w-7xl w-full text-white items-center justify-center rounded-xl shadow-lg min-h-[400px] bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
        <h1 className="font-bold text-5xl text-center leading-tight">
          Welcome to Mercado Pro
        </h1>
        <p className="text-xl text-center max-w-2xl">
          Discover high-quality tech products at unbeatable prices.
        </p>
        <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-100 transition-colors duration-200 text-lg">
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
