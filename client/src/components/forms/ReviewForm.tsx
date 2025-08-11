// src/components/ReviewForm.tsx
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import productService from "../../services/products";

// ----- Schema -----
const reviewSchema = z.object({
  rating: z
    .number("Please select a rating.")
    .min(1, "Rating must be at least 1.")
    .max(5, "Rating cannot exceed 5."),
  comment: z.string().trim().max(2000, "Comment is too long.").optional(),
});

type ReviewFormValues = z.infer<typeof reviewSchema>;

// ----- Props -----
type ReviewFormProps = {
  productId: string;
  token?: string | null;
  role?: "BUYER" | "SELLER" | "ADMIN" | null;
  onSuccess?: () => Promise<void> | void; // e.g., refetch reviews
};

const Star = ({
  filled,
  onClick,
  onMouseEnter,
  onMouseLeave,
  disabled,
}: {
  filled: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  disabled?: boolean;
}) => (
  <button
    type="button"
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    disabled={disabled}
    className="text-2xl leading-none transition disabled:cursor-not-allowed"
    aria-label={filled ? "Selected star" : "Unselected star"}
  >
    <span className={filled ? "text-yellow-500" : "text-gray-300"}>
      {filled ? "★" : "☆"}
    </span>
  </button>
);

export default function ReviewForm({
  productId,
  token,
  role,
  onSuccess,
}: ReviewFormProps) {
  const isBuyer = role === "BUYER";
  const isAuthed = Boolean(token);

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: { rating: 0, comment: "" },
    mode: "onTouched",
  });

  const [hover, setHover] = useState<number>(0);

  // Eligibility gates (UI-only; backend still enforces)
  if (!isAuthed) {
    return (
      <section className="max-w-6xl mx-auto px-4 py-8">
        <h4 className="text-xl font-semibold mb-2">Write a review</h4>
        <p className="text-sm text-gray-600">
          Please <span className="font-medium">log in</span> to write a review.
        </p>
      </section>
    );
  }
  if (!isBuyer) {
    return (
      <section className="max-w-6xl mx-auto px-4 py-8">
        <h4 className="text-xl font-semibold mb-2">Write a review</h4>
        <p className="text-sm text-gray-600">Only buyers can leave reviews.</p>
      </section>
    );
  }

  const onSubmit = async (values: ReviewFormValues) => {
    if (!token) return;
    try {
      await productService.createReview(productId, values, token);
      toast.success("Thanks for your review!");
      reset({ rating: 0, comment: "" });
      await onSuccess?.();
    } catch (err: unknown) {
      let status: number | undefined;
      let msg: string;
      interface ErrorWithResponse {
        response?: {
          status?: number;
          data?: {
            error?: string;
          };
        };
      }

      if (
        typeof err === "object" &&
        err !== null &&
        "response" in err &&
        typeof (err as ErrorWithResponse).response === "object"
      ) {
        const errorObj = err as ErrorWithResponse;
        status = errorObj.response?.status;
        msg =
          errorObj.response?.data?.error ||
          (status === 409
            ? "You’ve already reviewed this product."
            : status === 403
              ? "You’re not eligible to review this product."
              : "Failed to submit review. Please try again.");
      } else {
        msg = "Failed to submit review. Please try again.";
      }
      toast.error(msg);
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <h4 className="text-xl font-semibold mb-4">Write a review</h4>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5 bg-white p-6 rounded-xl shadow-md border border-gray-100"
      >
        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your rating
          </label>
          <Controller
            control={control}
            name="rating"
            render={({ field: { value, onChange } }) => (
              <div className="flex items-center gap-2">
                {Array.from({ length: 5 }, (_, i) => {
                  const idx = i + 1;
                  const filled = (hover || value) >= idx;
                  return (
                    <Star
                      key={idx}
                      filled={filled}
                      onClick={() => onChange(idx)}
                      onMouseEnter={() => setHover(idx)}
                      onMouseLeave={() => setHover(0)}
                      disabled={isSubmitting}
                    />
                  );
                })}
                <span className="ml-2 text-sm text-gray-600">
                  {value ? `${value} / 5` : "Select a rating"}
                </span>
              </div>
            )}
          />
          {errors.rating && (
            <p className="mt-1 text-sm text-red-600">{errors.rating.message}</p>
          )}
        </div>

        {/* Comment */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Comment <span className="text-gray-400">(optional)</span>
          </label>
          <Controller
            control={control}
            name="comment"
            render={({ field }) => (
              <textarea
                {...field}
                rows={4}
                placeholder="Share your experience"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                disabled={isSubmitting}
              />
            )}
          />
          {errors.comment && (
            <p className="mt-1 text-sm text-red-600">
              {errors.comment.message}
            </p>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Submitting…" : "Submit review"}
          </button>
          <p className="text-xs text-gray-500">
            By submitting, you agree to our review guidelines.
          </p>
        </div>
      </form>
    </section>
  );
}
