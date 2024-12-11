import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuthStore } from "../../store/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { showToast } from "../ui/toast/toasts";
import { Loader2 } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const [isLoading, setIsLoading] = useState(false);
  const login = useAuthStore((state) => state.login);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      const response = await login(data.email, data.password);

      if (response.success) {
        showToast.success("Successfully logged in");
        onSuccess?.();
      }
    } catch (error: any) {
      showToast.error(error.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Input
            {...register("email")}
            placeholder="Email address"
            className="shadow-none placeholder:text-gray-400 placeholder:font-light placeholder:text-[12px] placeholder:tracking-wide h-10 border border-[#c5c5c5] rounded-[4px]"
            disabled={isLoading}
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Input
            {...register("password")}
            type="password"
            placeholder="Password"
            className="shadow-none placeholder:text-gray-400 placeholder:font-light placeholder:text-[12px] placeholder:tracking-wide h-10 border border-[#c5c5c5] rounded-[4px]"
            disabled={isLoading}
          />
          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password.message}</p>
          )}
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-black text-white rounded-none hover:bg-black/90"
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Logging in...</span>
          </div>
        ) : (
          "LOGIN"
        )}
      </Button>
    </form>
  );
};
