import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import authService from "../../services/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const userFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.enum(["BUYER", "SELLER"]),
});

type UserForm = z.infer<typeof userFormSchema>;

const inputClass =
  "w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-800 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400";

const RegisterForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserForm>({
    resolver: zodResolver(userFormSchema),
  });

  const onSubmit = async (data: UserForm) => {
    try {
      await authService.register(data);
      toast.success(`Account created succesfully!`);
      reset();
      navigate("/");
    } catch (error) {
      console.error("Error creating account", error);
      toast.error(`Failed to create account`);
    }
  };

  return (
    <>
      <h1 className="text-4xl font-semibold">Register</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("name")}
          type="text"
          placeholder="Name *"
          className={inputClass}
        />
        {errors.name && (
          <div className="text-red-500 text-sm">{errors.name.message}</div>
        )}
        <input
          {...register("email")}
          type="text"
          placeholder="Email *"
          className={inputClass}
        />
        {errors.email && (
          <div className="text-red-500 text-sm">{errors.email.message}</div>
        )}
        <input
          {...register("password")}
          type="password"
          placeholder="Password *"
          className={inputClass}
        />
        {errors.password && (
          <div className="text-red-500 text-sm">{errors.password.message}</div>
        )}
        <div>
          <label className="block font-medium mb-2">Select your role:</label>
          <div className="flex gap-6">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="BUYER"
                {...register("role")}
                className="accent-blue-600"
                defaultChecked
              />
              <span>Buyer</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="SELLER"
                {...register("role")}
                className="accent-blue-600"
              />
              <span>Seller</span>
            </label>
          </div>
          {errors.role && (
            <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition disabled:opacity-50"
        >
          Sign Up
        </button>
      </form>
    </>
  );
};

export default RegisterForm;
