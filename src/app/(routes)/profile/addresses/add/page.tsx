// src/app/(routes)/profile/addresses/add/page.tsx
"use client";
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
import { AddressData } from "@/types/address";
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

export default function AddAddressPage() {
  const router = useRouter();
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

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const addressService = new AddressService();
      await addressService.createAddress({
        customer: data.customer,
        phoneNumber: data.phoneNumber,
        detailedAddress: data.address.detailedAddress,
        district: data.address.district,
        city: data.address.city,
        country: data.address.country,
        isDefault: data.isDefault,
      });

      showToast.success("Address added successfully");
      router.push("/profile/addresses");
    } catch (error) {
      showToast.error("Failed to add address");
    }
  };

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

      <h2 className="text-2xl font-medium mb-8">Add address</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Personal Details */}
          <div>
            <h3 className="text-xl font-medium mb-6">Personal details</h3>
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="customer"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Full Name"
                        {...field}
                        className="h-12"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex gap-4">
                      <Input value="+84" className="h-12 w-24" readOnly />
                      <Input
                        placeholder="Phone Number"
                        {...field}
                        className="h-12 flex-1"
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
                    <FormControl>
                      <Input
                        placeholder="Detailed Address"
                        {...field}
                        className="h-12"
                      />
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
                      <FormControl>
                        <Input
                          placeholder="District"
                          {...field}
                          className="h-12"
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
                      <FormControl>
                        <Input placeholder="City" {...field} className="h-12" />
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
                  />
                </FormControl>
                <FormLabel className="font-normal">
                  Set as default address
                </FormLabel>
              </FormItem>
            )}
          />

          <Button type="submit" className="bg-black hover:bg-black/90 h-12">
            ADD ADDRESS
          </Button>
        </form>
      </Form>
    </>
  );
}
