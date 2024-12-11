import { toast } from "@/hooks/use-toast";
import { Check, AlertCircle } from "lucide-react";

export const showToast = {
  success: (message: string) => {
    toast({
      title: "Success",
      description: message,
      duration: 3000,
      className: "bg-green-50 border-green-200",
      children: (
        <div className="flex items-center gap-2">
          <Check className="h-4 w-4 text-green-500" />
          <span>{message}</span>
        </div>
      ),
    });
  },
  error: (message: string) => {
    toast({
      variant: "destructive",
      title: "Error",
      description: message,
      duration: 3000,
      children: (
        <div className="flex items-center gap-2">
          <AlertCircle className="h-4 w-4" />
          <span>{message}</span>
        </div>
      ),
    });
  },
};
