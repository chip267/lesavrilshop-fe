"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { AddressService } from "@/services/address.service";
import { showToast } from "@/components/ui/toast/toasts";

const formSchema = z.object({
  customer: z.string().min(1, "Name is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  isDefault: z.boolean().default(false),
  address: z.object({
    detailedAddress: z.string().min(1, "Address is required"),
    district: z.string().min(1, "District is required"),
    city: z.string().min(1, "City is required"),
    country: z.string().min(1, "Country is required"),
  }),
});

interface EditAddressFormProps {
  addressId: string;
}

export default function EditAddressForm({ addressId }: EditAddressFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const addressService = new AddressService();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customer: "",
      phoneNumber: "",
      isDefault: false,
      address: {
        detailedAddress: "",
        district: "",
        city: "",
        country: "Viet Nam",
      },
    },
  });

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await addressService.getAddress(addressId);
        if (response.success && response.data) {
          const address = response.data;
          form.reset({
            customer: address.customer,
            phoneNumber: address.phoneNumber,
            isDefault: address.isDefault,
            address: {
              detailedAddress: address.address.detailedAddress,
              district: address.address.district,
              city: address.address.city,
              country: address.address.country,
            },
          });
        } else {
          showToast.error("Failed to load address");
          router.push("/profile/addresses");
        }
      } catch (error) {
        showToast.error("Failed to load address");
        router.push("/profile/addresses");
      } finally {
        setIsFetching(false);
      }
    };

    fetchAddress();
  }, [addressId]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      const response = await addressService.updateAddress(addressId, {
        customer: data.customer,
        phoneNumber: data.phoneNumber,
        detailedAddress: data.address.detailedAddress,
        district: data.address.district,
        city: data.address.city,
        country: data.address.country,
        isDefault: data.isDefault,
      });

      if (response.success) {
        showToast.success("Address updated successfully");
        router.push("/profile/addresses");
      } else {
        showToast.error(response.message || "Failed to update address");
      }
    } catch (error) {
      showToast.error("Failed to update address");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemove = async () => {
    try {
      setIsLoading(true);
      const response = await addressService.deleteAddress(addressId);
      if (response.success) {
        showToast.success("Address removed successfully");
        router.push("/profile/addresses");
      } else {
        showToast.error(response.message || "Failed to remove address");
      }
    } catch (error) {
      showToast.error("Failed to remove address");
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Button
        variant="ghost"
        className="mb-6 pl-0 hover:bg-transparent"
        onClick={() => router.push("/profile/addresses")}
      >
        <ChevronLeft className="h-4 w-4 mr-2" />
        Go back to saved addresses
      </Button>

      <h2 className="text-2xl font-medium mb-8">Edit address</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Form fields remain the same as in your previous implementation */}
          {/* ... */}
          {/* Personal Details */}
          <div>
            <h3 className="text-xl font-medium mb-6">Personal details</h3>
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="customer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input {...field} className="h-12" disabled={isLoading} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <div className="flex gap-4">
                      <Input
                        value="+84"
                        className="h-12 w-24"
                        readOnly
                        disabled={isLoading}
                      />
                      <Input
                        {...field}
                        className="h-12 flex-1"
                        disabled={isLoading}
                      />
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <h3 className="text-xl font-medium mb-6">Address</h3>
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="address.detailedAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Detailed Address</FormLabel>
                    <FormControl>
                      <Input {...field} className="h-12" disabled={isLoading} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="address.district"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>District</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="h-12"
                          disabled={isLoading}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address.city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="h-12"
                          disabled={isLoading}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="address.country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={isLoading}
                    >
                      <FormControl>
                        <SelectTrigger className="h-12">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Viet Nam">Viet Nam</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <FormField
            control={form.control}
            name="isDefault"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormLabel className="font-normal">
                  Set as default address
                </FormLabel>
              </FormItem>
            )}
          />

          <div className="flex items-center gap-6">
            <Button
              type="submit"
              className="bg-black hover:bg-black/90 h-12"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "SAVE"}
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={handleRemove}
              className="h-12 hover:bg-transparent hover:text-red-600"
              disabled={isLoading}
            >
              {isLoading ? "Removing..." : "Remove Address"}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
