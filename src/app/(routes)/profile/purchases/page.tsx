"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import emptyPurchases from "../../../../../public/assets/images/empty_purchases.jpeg";

export default function PurchasesPage() {
  const router = useRouter();

  return (
    <>
      <h2 className="text-2xl font-medium mb-8">My purchases</h2>

      <div className="flex flex-col items-center justify-center space-y-4 py-12">
        <Image
          src={emptyPurchases}
          alt="No purchases"
          width={200}
          height={200}
          className="mb-4"
        />
        <h3 className="text-xl font-medium">
          You do not have any online purchases yet
        </h3>
        <p className="text-gray-600 text-center">
          If you can't find your purchase, it may be because you ordered without
          registering.
        </p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => router.push("/find-order")}
        >
          Find order
        </Button>
      </div>
    </>
  );
}
