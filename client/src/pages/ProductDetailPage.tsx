import { useParams } from "react-router-dom";

const ProductDetailPage = () => {
  const productId = useParams();
  console.log(productId);
  return <div>ProductDetailPage</div>;
};

export default ProductDetailPage;
