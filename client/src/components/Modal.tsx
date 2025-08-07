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

type ModalProps = {
  product: Product;
};

const Modal = ({ product }: ModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

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
            <div className="flex flex-col gap-4">
              <input
                type="text"
                minLength={4}
                defaultValue={product.name}
                placeholder="Product Name"
                className="rounded-lg border border-gray-300 px-2 py-2 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
              />
              <textarea
                minLength={20}
                defaultValue={product.description}
                placeholder="Description"
                className="rounded-lg border border-gray-300 px-2 py-2 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 resize-none"
              />
              <input
                type="number"
                min={0}
                step="0.01"
                defaultValue={product.price}
                placeholder="Price $"
                className="rounded-lg border border-gray-300 px-2 py-2 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
              />
              <input
                type="text"
                defaultValue={product.image}
                placeholder="Image URL"
                className="rounded-lg border border-gray-300 px-2 py-2 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
              />
            </div>
            <div className="flex justify-end gap-4">
              <Button
                className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 transition"
                onClick={close}
              >
                Cancel
              </Button>
              <Button
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition"
                onClick={() => {
                  // Handle submit logic here
                  close();
                }}
              >
                Confirm Changes
              </Button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};

export default Modal;
