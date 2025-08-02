import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import productService from "../services/products";
import type { Product } from "../../../types";
import { FaCartPlus } from "react-icons/fa";

const ProductDetailPage = () => {
  const productId = useParams().id;
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (productId) {
      productService.getOne(productId).then((data) => setProduct(data));
    }
  }, [productId]);

  const addToCart = () => {
    console.log("click");
  };

  return product ? (
    <div className="flex flex-col border gap-5 p-6 rounded-xl justify-between">
      {<h1 className="font-bold text-3xl">{product.name}</h1>}
      <div>${product.price}</div>
      <div>{product.description}</div>
      <button
        onClick={addToCart}
        className="flex items-center gap-2 px-3 py-3 max-w-36 rounded-xl bg-green-600 text-white text-sm hover:bg-green-700 transition"
      >
        <FaCartPlus size={18} />
        Add To Cart
      </button>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default ProductDetailPage;
