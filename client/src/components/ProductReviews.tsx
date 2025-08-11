import { useEffect, useState } from "react";
import productService from "../services/products";
import type { ReviewsResponse } from "../../../types";
import { format } from "date-fns";

interface ProductReviewProps {
  productId: string;
  reviews: ReviewsResponse | null;
  setReviews: React.Dispatch<React.SetStateAction<ReviewsResponse | null>>;
}

const formatDate = (iso: string) => format(new Date(iso), "MMM d, yyyy");

const ProductReviews = ({
  productId,
  reviews,
  setReviews,
}: ProductReviewProps) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!productId) return;

    let cancelled = false;
    setLoading(true);

    productService
      .getReviews(productId) // expects ReviewsResponse from backend
      .then((data) => {
        if (!cancelled) setReviews(data);
      })
      .catch(() => {
        if (!cancelled) setReviews(null);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [productId, setReviews]);

  // Gates
  if (loading) {
    return (
      <div className="text-gray-500 text-center py-6">Loading reviews...</div>
    );
  }

  if (!reviews) {
    return (
      <div className="text-gray-500 text-center py-6">No reviews yet.</div>
    );
  }

  // Safe locals
  const { reviews: items, averageRating, reviewsCount } = reviews;

  if (items.length === 0) {
    return (
      <div className="text-gray-500 text-center py-6">No reviews yet.</div>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Reviews</h3>
          <p className="text-sm text-gray-500">{reviewsCount} total</p>
        </div>
        <div className="text-yellow-500 font-semibold">
          Avg: {averageRating.toFixed(1)} / 5
        </div>
      </div>

      {/* List */}
      <div className="space-y-6">
        {items.map((review) => (
          <article
            key={review.id}
            className="bg-white p-6 rounded-xl shadow-md border border-gray-100 space-y-4"
          >
            {/* Reviewer */}
            <header className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-blue-600/90 flex items-center justify-center text-white font-semibold text-lg">
                {review.user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-gray-900">
                  {review.user.name}
                </p>
                <p className="text-sm text-gray-500">
                  {formatDate(review.createdAt)}
                </p>
              </div>
            </header>

            {/* Stars */}
            <div
              className="flex items-center gap-1 text-yellow-400"
              aria-label={`Rating ${review.rating} out of 5`}
            >
              {Array.from({ length: 5 }, (_, i) => (
                <span key={i} className="text-lg leading-none">
                  {i < review.rating ? "★" : "☆"}
                </span>
              ))}
            </div>

            {/* Body */}
            {review.comment && (
              <p className="text-gray-700 leading-relaxed">{review.comment}</p>
            )}
          </article>
        ))}
      </div>
    </section>
  );
};

export default ProductReviews;
