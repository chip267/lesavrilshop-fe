import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Address, useCheckoutStore } from "@/store/useCheckoutStore";

interface AddressFormData {
  name: string;
  street: string;
  city: string;
  phone: string;
  country: string;
}

export const AddressDialog = ({
  open,
  onOpenChange,
  editAddress = null,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editAddress?: Address | null;
}) => {
  const { addAddress } = useCheckoutStore();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddressFormData>({
    defaultValues: editAddress || {
      name: "",
      street: "",
      city: "",
      phone: "",
      country: "",
    },
  });

  const onSubmit = (data: AddressFormData) => {
    if (editAddress) {
      // Handle edit
    } else {
      addAddress({
        id: Date.now(), // temporary ID generation
        ...data,
      });
    }
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {editAddress ? "Edit address" : "Add new address"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Name
            </label>
            <Input
              id="name"
              {...register("name", { required: true })}
              className="w-full"
            />
            {errors.name && (
              <span className="text-red-500 text-sm">Name is required</span>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="street" className="text-sm font-medium">
              Street
            </label>
            <Input
              id="street"
              {...register("street", { required: true })}
              className="w-full"
            />
            {errors.street && (
              <span className="text-red-500 text-sm">Street is required</span>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="city" className="text-sm font-medium">
              City
            </label>
            <Input
              id="city"
              {...register("city", { required: true })}
              className="w-full"
            />
            {errors.city && (
              <span className="text-red-500 text-sm">City is required</span>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium">
              Phone
            </label>
            <Input
              id="phone"
              {...register("phone", { required: true })}
              className="w-full"
            />
            {errors.phone && (
              <span className="text-red-500 text-sm">Phone is required</span>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="country" className="text-sm font-medium">
              Country
            </label>
            <Input
              id="country"
              {...register("country", { required: true })}
              className="w-full"
            />
            {errors.country && (
              <span className="text-red-500 text-sm">Country is required</span>
            )}
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-black text-white">
              {editAddress ? "Save changes" : "Add address"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
