import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import productService from "../services/products";
import { toast } from "react-hot-toast";
import { useAuthStore } from "../store/auth";
import CategorySelect from "../components/CategorySelect";

const productSchema = z.object({
  name: z.string().min(4).nonempty(),
  description: z.string().min(20).nonempty(),
  price: z.number().nonnegative(),
  image: z.string().nonempty(),
  category: z.enum([
    "Laptops",
    "Phones",
    "Accessories",
    "Monitors",
    "Audio",
    "Other",
  ]),
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
    setValue,
    watch,
  } = useForm<Product>({
    resolver: zodResolver(productSchema),
    mode: "onTouched",
    defaultValues: {
      category: "Other", // optional default
    },
  });

  const selectedCategory = watch("category");

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

        <input
          {...register("image")}
          type="text"
          placeholder="Image URL *"
          className={inputClass}
        />
        {errors.image && (
          <div className="text-red-500 text-sm">{errors.image.message}</div>
        )}

        <label className="block font-medium">Category *</label>
        <CategorySelect
          value={selectedCategory}
          onChange={(value) =>
            setValue("category", value as Product["category"])
          }
        />
        {errors.category && (
          <div className="text-red-500 text-sm">{errors.category.message}</div>
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
