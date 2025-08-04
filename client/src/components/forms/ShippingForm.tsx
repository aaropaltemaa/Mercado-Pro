import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useShipping } from "../../store/checkout";
import type { ShippingData } from "../../../../types";

const shippingSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  postalCode: z.string().min(4, "Postal Code is required"),
  country: z.string().min(1, "Country is required"),
  phone: z.string().min(8, "Phone number is required"),
});

const ShippingForm = () => {
  const setShippingData = useShipping((state) => state.setShippingData);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ShippingData>({
    resolver: zodResolver(shippingSchema),
  });

  const onSubmit = async (data: ShippingData) => {
    setShippingData(data);
    toast.success("Shipping information saved successfully!");
  };

  return (
    <div>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("fullName")}
          type="text"
          placeholder="Full Name"
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.fullName && (
          <div className="text-red-500 text-sm">{errors.fullName.message}</div>
        )}
        <input
          {...register("address")}
          type="text"
          placeholder="Address"
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.address && (
          <div className="text-red-500 text-sm">{errors.address.message}</div>
        )}
        <input
          {...register("city")}
          type="text"
          placeholder="City"
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.city && (
          <div className="text-red-500 text-sm">{errors.city.message}</div>
        )}
        <input
          {...register("postalCode")}
          type="text"
          placeholder="Postal Code"
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.postalCode && (
          <div className="text-red-500 text-sm">
            {errors.postalCode.message}
          </div>
        )}
        <input
          {...register("country")}
          type="text"
          placeholder="Country"
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.country && (
          <div className="text-red-500 text-sm">{errors.country.message}</div>
        )}
        <input
          {...register("phone")}
          type="text"
          placeholder="Phone Number"
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.phone && (
          <div className="text-red-500 text-sm">{errors.phone.message}</div>
        )}
        <button
          type="submit"
          className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition disabled:opacity-50"
        >
          Continue to Payment
        </button>
      </form>
    </div>
  );
};

export default ShippingForm;
