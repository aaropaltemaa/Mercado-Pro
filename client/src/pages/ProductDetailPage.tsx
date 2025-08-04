import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import productService from "../services/products";
import cartService from "../services/cart";
import type { Product } from "../../../types";
import { FaCartPlus } from "react-icons/fa";
import { useAuthStore } from "../store/auth";
import toast from "react-hot-toast";
import { useCart } from "../store/cart";

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

  useEffect(() => {
    if (productId) {
      productService.getOne(productId).then((data) => setProduct(data));
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
      <div className="space-y-6 border rounded-xl p-6 shadow-md">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-green-600 text-xl font-semibold">${product.price}</p>
        <p className="text-gray-700">{product.description}</p>
        <p className="text-sm text-gray-500">In stock</p>

        <button
          onClick={() => addToCart(product.id)}
          className="flex items-center gap-2 px-4 py-3 rounded-xl bg-green-600 text-white text-sm hover:bg-green-700 transition"
        >
          <FaCartPlus size={18} />
          Add To Cart
        </button>
      </div>
    </div>
  ) : (
    <div className="text-center py-20 text-gray-500">Loading...</div>
  );
};

export default ProductDetailPage;
