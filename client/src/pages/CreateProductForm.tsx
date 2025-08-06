import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import productService from "../services/products";
import { toast } from "react-hot-toast";
import { useAuthStore } from "../store/auth";

const productSchema = z.object({
  name: z
    .string()
    .min(4, "Product name must have at least 4 characters")
    .nonempty("Product name is required"),
  description: z
    .string()
    .min(20, "Description must have at least 20 characters")
    .nonempty("Description is required"),
  price: z.number().nonnegative("Price cannot be negative"),
  image: z.string().nonempty("Image URL is required"),
});

type Product = z.infer<typeof productSchema>;

const inputClass =
  "w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-800 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400";

const CreateProductForm = () => {
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.token);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<Product>({
    resolver: zodResolver(productSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data: Product) => {
    try {
      await productService.create(data, token ?? "");
      toast.success(`Product "${data.name}" created successfully!`);
      reset();
      navigate("/");
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error("Failed to create product. Please try again.");
    }
  };

  return (
    <>
      <h1 className="text-4xl font-semibold">Create Product</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("name")}
          type="text"
          placeholder="Product name *"
          className={inputClass}
        />
        {errors.name && (
          <div className="text-red-500 text-sm">{errors.name.message}</div>
        )}

        <textarea
          {...register("description")}
          rows={5}
          cols={33}
          placeholder="Description *"
          className={inputClass}
        />
        {errors.description && (
          <div className="text-red-500 text-sm">
            {errors.description.message}
          </div>
        )}

        <input
          {...register("price", { valueAsNumber: true })}
          type="number"
          min="0"
          placeholder="Price *"
          className={inputClass}
        />
        {errors.price && (
          <div className="text-red-500 text-sm">{errors.price.message}</div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition disabled:opacity-50"
        >
          {isSubmitting ? "Creating..." : "Submit"}
        </button>
      </form>
    </>
  );
};

export default CreateProductForm;
