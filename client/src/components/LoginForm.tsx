import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import loginService from "../services/auth";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth";
import { toast } from "react-hot-toast";

const userFormSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

type UserForm = z.infer<typeof userFormSchema>;

const inputClass =
  "w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-800 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400";

const LoginForm = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UserForm>({
    resolver: zodResolver(userFormSchema),
  });

  const onSubmit = async (data: UserForm) => {
    try {
      const { token, user } = await loginService.login(data);
      login(user, token);
      toast.success(`Logged in succesfully!`);
      reset();
      navigate("/");
    } catch (error) {
      console.error("Error logging in", error);
      toast.error(`Failed to log in.`);
    }
  };

  return (
    <>
      <h1 className="text-3xl font-semibold">Sign in</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
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
        <button
          type="submit"
          className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition disabled:opacity-50"
        >
          Log in
        </button>
      </form>
    </>
  );
};

export default LoginForm;
