import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Button,
  DialogBackdrop,
} from "@headlessui/react";
import { FaEdit } from "react-icons/fa";
import { useState } from "react";
import type { Product } from "../../../types";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import productService from "../services/products";
import toast from "react-hot-toast";
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

type ModalProps = {
  product: Product;
  onUpdate: () => void;
};

type ProductForm = z.infer<typeof productSchema>;

const Modal = ({ product, onUpdate }: ModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const token = useAuthStore((state) => state.token);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProductForm>({
    resolver: zodResolver(productSchema),
    mode: "onTouched",
    defaultValues: {
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
    },
  });

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const onSubmit = async (formData: ProductForm) => {
    try {
      await productService.update(product.id, formData, token ?? "");
      toast.success("Product updated successfully!");
      onUpdate();
      close();
    } catch (err) {
      toast.error("Failed to update product");
      console.error(err);
    }
  };

  return (
    <>
      <Button
        onClick={open}
        className="inline-flex items-center gap-2 mt-2 text-blue-600 hover:underline"
      >
        <FaEdit />
        View or Edit
      </Button>
      <Dialog open={isOpen} onClose={close} className="relative z-50">
        <DialogBackdrop className="fixed inset-0 bg-black/40" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel
            transition
            className="max-w-lg w-full space-y-4 rounded-xl border bg-white p-8 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
          >
            <DialogTitle className="text-lg font-bold">
              Edit Product Details
            </DialogTitle>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <input
                {...register("name")}
                type="text"
                placeholder="Product Name"
                className="rounded-lg border border-gray-300 px-2 py-2 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
              />
              {errors.name && (
                <div className="text-red-500 text-sm">
                  {errors.name.message}
                </div>
              )}

              <textarea
                {...register("description")}
                placeholder="Description"
                className="rounded-lg border border-gray-300 px-2 py-2 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 resize-none"
              />
              {errors.description && (
                <div className="text-red-500 text-sm">
                  {errors.description.message}
                </div>
              )}

              <input
                {...register("price", { valueAsNumber: true })}
                type="number"
                min={0}
                placeholder="Price $"
                className="rounded-lg border border-gray-300 px-2 py-2 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
              />
              {errors.price && (
                <div className="text-red-500 text-sm">
                  {errors.price.message}
                </div>
              )}

              <input
                {...register("image")}
                type="text"
                placeholder="Image URL"
                className="rounded-lg border border-gray-300 px-2 py-2 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
              />
              {errors.image && (
                <div className="text-red-500 text-sm">
                  {errors.image.message}
                </div>
              )}

              <div className="flex justify-end gap-4 mt-4">
                <Button
                  type="button"
                  className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 transition"
                  onClick={close}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition"
                  disabled={isSubmitting}
                >
                  Confirm Changes
                </Button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};

export default Modal;
