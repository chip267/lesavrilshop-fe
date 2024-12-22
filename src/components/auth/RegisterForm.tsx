import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuthStore } from "../../store/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";

const registerSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
  username: z.string().min(3, "Username must be at least 3 characters"),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 characters"),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

export const RegisterForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const [isLoading, setIsLoading] = useState(false);
  const register = useAuthStore((state) => state.register);

  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      const response = await register({
        email: data.email,
        password: data.password,
        username: data.username,
        phoneNumber: data.phoneNumber,
      });

      if (response.success) {
        toast({
          title: "Success",
          description: "Successfully registered",
        });
        onSuccess?.();
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: response.message || "Registration failed",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred during registration",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Input
          {...registerField("email")}
          placeholder="Email address"
          className="shadow-none placeholder:text-gray-400 placeholder:font-light placeholder:text-[12px] placeholder:tracking-wide h-10 border border-[#c5c5c5] rounded-[4px]"
        />
        {errors.email && (
          <p className="text-red-500 text-xs">{`${errors.email.message}`}</p>
        )}
      </div>

      <div className="space-y-2">
        <Input
          {...registerField("username")}
          placeholder="Username"
          className="shadow-none placeholder:text-gray-400 placeholder:font-light placeholder:text-[12px] placeholder:tracking-wide h-10 border border-[#c5c5c5] rounded-[4px]"
        />
        {errors.username && (
          <p className="text-red-500 text-xs">{`${errors.username.message}`}</p>
        )}
      </div>

      <div className="space-y-2">
        <Input
          {...registerField("phoneNumber")}
          placeholder="Phone Number"
          className="shadow-none placeholder:text-gray-400 placeholder:font-light placeholder:text-[12px] placeholder:tracking-wide h-10 border border-[#c5c5c5] rounded-[4px]"
        />
        {errors.phoneNumber && (
          <p className="text-red-500 text-xs">{`${errors.phoneNumber.message}`}</p>
        )}
      </div>

      <div className="space-y-2">
        <Input
          {...registerField("password")}
          type="password"
          placeholder="Password"
          className="shadow-none placeholder:text-gray-400 placeholder:font-light placeholder:text-[12px] placeholder:tracking-wide h-10 border border-[#c5c5c5] rounded-[4px]"
        />
        {errors.password && (
          <p className="text-red-500 text-xs">{`${errors.password.message}`}</p>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex items-start space-x-2">
          <Checkbox {...registerField("acceptTerms")} id="terms" />
          <label htmlFor="terms" className="text-[14px] leading-none">
            I have read and accept the{" "}
            <span className="font-bold">Terms and Conditions</span>
          </label>
        </div>
        {errors.acceptTerms && (
          <p className="text-red-500 text-xs">{`${errors.acceptTerms.message}`}</p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full bg-black text-white rounded-none hover:bg-black/90"
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "CREATE ACCOUNT"}
      </Button>
    </form>
  );
};
