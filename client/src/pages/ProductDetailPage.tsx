import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import productService from "../services/products";
import type { Product } from "../../../types";

const ProductDetailPage = () => {
  const productId = useParams().id;
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (productId) {
      productService.getOne(productId).then((data) => setProduct(data));
    }
  }, [productId]);

  return <div>{product ? product.name : "Loading..."}</div>;
};

export default ProductDetailPage;
