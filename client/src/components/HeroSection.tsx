const HeroSection = () => {
  return (
    <section className="w-full bg-white py-16 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-12">
        {/* Left: Text Content */}
        <div className="text-center lg:text-left space-y-6 flex-1">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900">
            Shop the Best in Tech
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto lg:mx-0">
            Find unbeatable deals on high-performance laptops, accessories, and
            cutting-edge devices — all in one place.
          </p>
          <div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full transition">
              Shop Now
            </button>
          </div>
        </div>

        {/* Right: Image */}
        <div className="flex-1">
          <img
            src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8

"
            alt="Macbook with accessories"
            className="w-full rounded-xl shadow-xl"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
