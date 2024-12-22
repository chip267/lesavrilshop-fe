// app/(routes)/orders/[orderId]/confirmation/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCheckoutStore } from "@/store/useCheckoutStore";
import { ApiService } from "@/services/api";

const api = ApiService.getInstance();

interface OrderResponseDto {
  id: number;
  orderDate: string;
  orderStatus: string;
  paymentMethod: string;
  shippingAddress: {
    id: number;
    detailedAddress: string;
    district: string;
    city: string;
    country: string;
    customer: string;
    phoneNumber: string;
  };
  shippingMethod: {
    id: number;
    name: string;
    description: string;
    price: number;
  };
  totalQuantity: number;
  totalPrice: number;
  note: string;
  items: Array<{
    productId: number;
    productName: string;
    productImage: string;
    price: number;
    quantity: number;
    subtotal: number;
  }>;
  createdAt: string;
  updatedAt: string;
}

const OrderConfirmationPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const { clearCheckout } = useCheckoutStore();
  const [order, setOrder] = useState<OrderResponseDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const unwrappedParams = await params;
      if (!unwrappedParams.id) {
        // If orderId is undefined, redirect to the home page
        router.push("/");
        return;
      }

      try {
        setIsLoading(true);
        const response = await api.get<OrderResponseDto>(
          `/Orders/${unwrappedParams.id}`
        );
        if (response.success && response.data) {
          setOrder(response.data);
        } else {
          setError("Failed to fetch order details");
        }
      } catch (error: any) {
        setError("An error occurred while fetching order details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrder();
    clearCheckout();
  }, [params]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <p className="text-xl">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <p className="text-xl text-red-500">{error}</p>
          <Button
            onClick={() => router.push("/")}
            className="mt-4 bg-black text-white"
          >
            Return to Home
          </Button>
        </div>
      </div>
    );
  }

  if (!order) {
    return null;
  }

  const { shippingAddress, shippingMethod, items, totalPrice } = order;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Button
        variant="link"
        onClick={() => router.push("/")}
        className="mb-8 flex items-center space-x-2 text-gray-600"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Return to Home</span>
      </Button>

      <div className="bg-green-100 p-6 rounded-lg mb-8">
        <h1 className="text-2xl font-medium mb-2">Thank you for your order!</h1>
        <p className="text-gray-600">
          Your order has been successfully placed. We will notify you when it
          ships.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-medium mb-4">Order Details</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Order ID:</span>
              <span>{order.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Order Date:</span>
              <span>{new Date(order.orderDate).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Payment Method:</span>
              <span>{order.paymentMethod}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Order Status:</span>
              <span>{order.orderStatus}</span>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-medium mb-4">Shipping Details</h2>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-gray-600" />
              <div>
                <div className="flex gap-2">
                  <p className="font-medium">{shippingAddress.customer}</p>
                  <p>{shippingAddress.phoneNumber}</p>
                </div>
                <div className="flex gap-1">
                  <p>{shippingAddress.detailedAddress + ", "}</p>
                  <p>{shippingAddress.district + ", "}</p>
                  <p>{shippingAddress.city + ", "}</p>
                  <p>{shippingAddress.country}</p>
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">
                Shipping Method:
              </span>
              <span>{shippingMethod.name}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-medium mb-4">Order Summary</h2>
        <div className="divide-y divide-gray-200">
          {items.map((item) => (
            <div
              key={item.productId}
              className="py-4 flex items-center space-x-4"
            >
              <img
                src={item.productImage}
                alt={item.productName}
                className="w-20 h-20 object-cover rounded"
              />
              <div className="flex-1">
                <p className="font-medium">{item.productName}</p>
                <p className="text-gray-600">
                  {item.quantity} x{" "}
                  {new Intl.NumberFormat("vi-VN", {
                    style: "decimal",
                    maximumFractionDigits: 0,
                  }).format(item.price)}{" "}
                  ₫
                </p>
              </div>
              <p className="font-medium">
                {new Intl.NumberFormat("vi-VN", {
                  style: "decimal",
                  maximumFractionDigits: 0,
                }).format(item.subtotal)}{" "}
                ₫
              </p>
            </div>
          ))}
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Subtotal:</span>
            <span>
              {new Intl.NumberFormat("vi-VN", {
                style: "decimal",
                maximumFractionDigits: 0,
              }).format(totalPrice - shippingMethod.price)}{" "}
              ₫
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Shipping Fee:</span>
            <span>
              {new Intl.NumberFormat("vi-VN", {
                style: "decimal",
                maximumFractionDigits: 0,
              }).format(shippingMethod.price)}{" "}
              ₫
            </span>
          </div>
          <div className="flex justify-between text-lg font-medium">
            <span>Total:</span>
            <span>
              {new Intl.NumberFormat("vi-VN", {
                style: "decimal",
                maximumFractionDigits: 0,
              }).format(totalPrice)}{" "}
              ₫
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
