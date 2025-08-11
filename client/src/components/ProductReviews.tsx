import { useEffect, useState } from "react";
import productService from "../services/products";
import type { ReviewsResponse } from "../../../types";
import { format } from "date-fns";

interface ProductIdProps {
  productId: string;
}

const ProductReviews = ({ productId }: ProductIdProps) => {
  const [reviews, setReviews] = useState<ReviewsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (productId) {
      setLoading(true);
      productService.getReviews(productId).then((data) => {
        setReviews(data);
        setLoading(false);
      });
    }
  }, [productId]);

  if (loading) {
    return (
      <div className="text-gray-500 text-center py-6">Loading reviews...</div>
    );
  }

  if (!reviews || reviews.reviews.length === 0) {
    return (
      <div className="text-gray-500 text-center py-6">No reviews yet.</div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-gray-800">
          Reviews ({reviews.reviewsCount})
        </h3>
        <p className="text-yellow-500 font-medium">
          Avg: {reviews.averageRating.toFixed(1)} / 5
        </p>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.reviews.map((review) => (
          <div
            key={review.id}
            className="bg-white p-6 rounded-xl shadow-md border border-gray-100 space-y-4"
          >
            {/* Reviewer Info */}
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-lg">
                {review.user.name.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-gray-800">
                  {review.user.name}
                </p>
                <p className="text-sm text-gray-500">
                  {format(new Date(review.createdAt), "MMM d, yyyy")}
                </p>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1 text-yellow-400">
              {Array.from({ length: 5 }, (_, i) => (
                <span key={i}>{i < review.rating ? "★" : "☆"}</span>
              ))}
            </div>

            {/* Comment */}
            {review.comment && (
              <p className="text-gray-700 leading-relaxed">{review.comment}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductReviews;
