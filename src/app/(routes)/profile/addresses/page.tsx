"use client";
import { useEffect, useState } from "react";
import { AddressData } from "@/types/address";
import { AddressService } from "@/services/address.service";
import { Button } from "@/components/ui/button";
import { Plus, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { showToast } from "@/components/ui/toast/toasts";

const addressService = new AddressService();

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<AddressData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    loadAddresses();
  }, []);

  const loadAddresses = async () => {
    try {
      const data = await addressService.getAddresses();
      setAddresses(data);
    } catch (error) {
      showToast.error("Failed to load addresses");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h2 className="text-2xl font-medium mb-8">Saved addresses</h2>

      <div className="space-y-4">
        {addresses.map((address) => (
          <div
            key={address.id}
            className="border rounded-md p-6 flex justify-between items-start"
          >
            <div className="space-y-2">
              <h3 className="font-medium">{address.customer}</h3>
              <p className="text-gray-600">{address.address.detailedAddress}</p>
              <p className="text-gray-600">
                {address.address.district}, {address.address.city}
              </p>
              <p className="text-gray-600">{address.phoneNumber}</p>
              {address.isDefault && (
                <span className="text-sm text-blue-600">Default address</span>
              )}
            </div>
            <Button
              variant="outline"
              className="rounded-full"
              onClick={() =>
                router.push(`/profile/addresses/${address.id}/edit`)
              }
            >
              <Pencil className="h-4 w-4" />
              <span className="ml-2">Edit</span>
            </Button>
          </div>
        ))}

        <Button
          variant="ghost"
          className="w-full py-6 border-2 border-dashed rounded-md hover:bg-transparent hover:border-gray-400"
          onClick={() => router.push("/profile/addresses/add")}
        >
          <Plus className="h-5 w-5 mr-2" />
          Add address
        </Button>
      </div>
    </>
  );
}
