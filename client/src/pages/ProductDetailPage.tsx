import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import productService from "../services/products";
import cartService from "../services/cart";
import type { Product } from "../../../types";
import { FaCartPlus } from "react-icons/fa";
import { useAuthStore } from "../store/auth";
import toast from "react-hot-toast";
import { useCart } from "../store/cart";
import { Link } from "react-router-dom";

const ProductDetailPage = () => {
  const productId = useParams().id;
  const token = useAuthStore((state) => state.token);
  const [product, setProduct] = useState<Product | null>(null);
  const mockImages = [
    "https://placehold.co/500x400?text=Main+Image",
    "https://placehold.co/500x400?text=Alt+1",
    "https://placehold.co/500x400?text=Alt+2",
    "https://placehold.co/500x400?text=Alt+3",
  ];

  const [selectedImage, setSelectedImage] = useState(mockImages[0]);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (productId) {
      productService.getOne(productId).then((data) => setProduct(data));
      productService.getAll().then((products) => {
        const related = products.filter((p: Product) => p.id !== productId);
        setRelatedProducts(related.slice(0, 4)); // Get 4 related products
      });
    }
  }, [productId]);

  const addToCart = async (id: string) => {
    try {
      await cartService.addCartItem(id, 1, token ?? "");
      toast.success("Succesfully added item to cart!");
      const updatedCart = await cartService.getCart(token ?? "");
      useCart.getState().setCart(updatedCart);
    } catch {
      toast.error("Failed to add item to cart");
    }
  };

  return product ? (
    <>
      <div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-10 items-start">
        {/* LEFT COLUMN - IMAGES */}
        <div className="flex flex-col items-start gap-4">
          <img
            src={selectedImage}
            alt="Product"
            className="w-full max-w-md rounded-lg shadow"
          />

          <div className="flex gap-3">
            {mockImages.map((img, index) => (
              <img
                key={index}
                src={img}
                onClick={() => setSelectedImage(img)}
                className={`w-20 h-16 cursor-pointer rounded border ${
                  selectedImage === img ? "ring-2 ring-blue-500" : "opacity-80"
                }`}
                alt={`Thumbnail ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN - DETAILS */}
        <div className="flex flex-col gap-6 p-6 rounded-xl shadow-lg border max-w-md w-full">
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

          <div className="flex items-center gap-2 text-yellow-500">
            ★★★★☆ <span className="text-sm text-gray-600">(120 reviews)</span>
          </div>

          <div className="text-green-600 font-bold text-2xl">
            ${product.price}
          </div>

          <p className="text-gray-700 leading-relaxed">{product.description}</p>

          <p className="text-sm text-gray-500">In stock • Ships in 1–2 days</p>

          <button
            onClick={() => addToCart(product.id)}
            className="mt-4 flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-green-600 text-white text-base font-semibold hover:bg-green-700 transition"
          >
            <FaCartPlus />
            Add To Cart
          </button>
        </div>
      </div>
      {/* RELATED PRODUCTS */}
      <section className="max-w-6xl mx-auto px-4 mt-20">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Related Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {relatedProducts.map((product) => (
            <Link
              to={`/products/${product.id}`}
              key={product.id}
              className="border rounded-xl p-4 shadow hover:shadow-lg transition block hover:scale-[1.02]"
            >
              <img
                src="https://placehold.co/300x200"
                alt={product.name}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="font-semibold text-lg truncate">{product.name}</h3>
              <p className="text-green-600 font-bold">${product.price}</p>
              <p className="text-sm text-gray-500 truncate">
                {product.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </>
  ) : (
    <div className="text-center py-20 text-gray-500">Loading...</div>
  );
};

export default ProductDetailPage;
