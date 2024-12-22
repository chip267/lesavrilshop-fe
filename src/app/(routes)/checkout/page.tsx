// app/(routes)/checkout/page.tsx
"use client";

import React, { useState } from "react";
import { useCheckoutStore } from "@/store/useCheckoutStore";
import { useCartStore } from "@/store/useCartStore";
import { useAuthStore } from "@/store/auth";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { AddressDialog } from "@/components/checkout/AddressDialog";
import { StripePayment } from "@/components/checkout/StripePayment";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

const CheckoutSteps = () => {
  const { currentStep } = useCheckoutStore();
  const steps = ["delivery", "payment", "summary"] as const;
  const stepLabels = {
    delivery: "Delivery method",
    payment: "Payment method",
    summary: "Summary",
  };

  const getStepStyle = (step: (typeof steps)[number]) => {
    const currentIndex = steps.indexOf(currentStep);
    const stepIndex = steps.indexOf(step);

    if (step === currentStep) return "text-black font-medium";
    if (stepIndex < currentIndex) return "text-black";
    return "text-gray-400";
  };

  return (
    <div className="flex items-center space-x-2 mb-8">
      {steps.map((step, index) => (
        <React.Fragment key={step}>
          <span className={getStepStyle(step)}>{stepLabels[step]}</span>
          {index < steps.length - 1 && (
            <span className="text-gray-400 px-2">›</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

const DeliveryMethod = () => {
  const {
    deliverySubStep,
    shippingMethods,
    selectedShippingMethod,
    userAddresses,
    selectedAddress,
    isLoading,
    error,
    fetchShippingMethods,
    fetchUserAddresses,
    setShippingMethod,
    setAddress,
    setCurrentStep,
  } = useCheckoutStore();
  const [showAddressDialog, setShowAddressDialog] = useState(false);

  React.useEffect(() => {
    fetchShippingMethods();
    fetchUserAddresses();
  }, [fetchShippingMethods, fetchUserAddresses]);

  if (isLoading) {
    return <div className="flex justify-center p-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  if (deliverySubStep === "method") {
    return (
      <div className="mb-8">
        <h1 className="text-2xl font-medium mb-6">Choose a delivery method</h1>
        <div className="space-y-4">
          {shippingMethods.map((method) => (
            <div
              key={method.id}
              onClick={() => setShippingMethod(method)}
              className={`border rounded cursor-pointer hover:border-black p-4 ${
                selectedShippingMethod?.id === method.id ? "border-black" : ""
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{method.name}</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    {method.description}
                  </p>
                </div>
                <span className="font-medium">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "decimal",
                    maximumFractionDigits: 0,
                  }).format(method.price)}{" "}
                  ₫
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <h1 className="text-2xl font-medium mb-6">
        {selectedShippingMethod?.name}
      </h1>
      <h2 className="text-xl font-medium mb-4">My addresses</h2>

      <div className="space-y-4 mb-6">
        {userAddresses.map((address) => (
          <div
            key={address.id}
            className={`border rounded-lg p-4 cursor-pointer ${
              selectedAddress?.id === address.id ? "border-black" : ""
            }`}
            onClick={() => setAddress(address)}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{address.customer}</h3>
                <p className="text-gray-600">
                  {address.address.detailedAddress}
                </p>
                <p className="text-gray-600">{address.address.district}</p>
                <p className="text-gray-600">{address.address.city}</p>
                <p className="text-gray-600">{address.phoneNumber}</p>
                <p className="text-gray-600">{address.address.country}</p>
              </div>
              {address.isDefault && (
                <span className="text-sm text-gray-500">Default</span>
              )}
              <Button variant="ghost" className="h-8 px-3">
                Edit
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Button
        variant="outline"
        className="flex items-center gap-2 mb-6"
        onClick={() => setShowAddressDialog(true)}
      >
        <PlusCircle className="h-4 w-4" />
        Add address
      </Button>

      <AddressDialog
        open={showAddressDialog}
        onOpenChange={setShowAddressDialog}
      />

      <div className="flex gap-4">
        <Button
          variant="outline"
          onClick={() => {
            setShippingMethod(null);
          }}
          className="flex-1 h-12"
        >
          Return to delivery method
        </Button>
        <Button
          onClick={() => setCurrentStep("payment")}
          disabled={!selectedAddress}
          className="flex-1 bg-black text-white h-12 rounded-none"
        >
          CONTINUE
        </Button>
      </div>
    </div>
  );
};

const PaymentMethod = () => {
  const { selectedPaymentMethod, setPaymentMethod, setCurrentStep } =
    useCheckoutStore();

  return (
    <div className="mb-8">
      <h1 className="text-2xl font-medium mb-6">Choose a payment method</h1>
      <RadioGroup
        value={selectedPaymentMethod || ""}
        onValueChange={(value: "COD" | "Stripe") => setPaymentMethod(value)}
        className="grid gap-4"
      >
        <div
          className={`border rounded-lg p-4 ${
            selectedPaymentMethod === "COD" ? "border-black" : ""
          }`}
        >
          <RadioGroupItem value="COD" id="cod" className="hidden" />
          <label
            htmlFor="cod"
            className="flex items-center justify-between cursor-pointer"
          >
            <span className="font-medium">Cash on Delivery</span>
            <span className="text-gray-500">Pay when you receive</span>
          </label>
        </div>

        <div
          className={`border rounded-lg p-4 ${
            selectedPaymentMethod === "Stripe" ? "border-black" : ""
          }`}
        >
          <RadioGroupItem value="Stripe" id="stripe" className="hidden" />
          <label
            htmlFor="stripe"
            className="flex items-center justify-between cursor-pointer"
          >
            <span className="font-medium">Credit Card (Stripe)</span>
            <span className="text-gray-500">Pay securely with Stripe</span>
          </label>
        </div>
      </RadioGroup>

      <div className="flex gap-4 mt-8">
        <Button
          variant="outline"
          onClick={() => setCurrentStep("delivery")}
          className="flex-1 h-12"
        >
          Return to delivery method
        </Button>
        <Button
          onClick={() => setCurrentStep("summary")}
          disabled={!selectedPaymentMethod}
          className="flex-1 bg-black text-white h-12 rounded-none"
        >
          CONTINUE
        </Button>
      </div>
    </div>
  );
};

const OrderSummary = () => {
  const router = useRouter();
  const { cart } = useCartStore();
  const {
    selectedShippingMethod,
    selectedAddress,
    selectedPaymentMethod,
    note,
    setNote,
    submitOrder,
    isLoading,
  } = useCheckoutStore();
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showStripePayment, setShowStripePayment] = useState(false);
  const [orderId, setOrderId] = useState<number | null>(null);

  const handleSubmitOrder = async () => {
    try {
      const newOrderId = await submitOrder();

      if (selectedPaymentMethod === "Stripe") {
        setOrderId(newOrderId);
        setShowStripePayment(true);
      } else {
        // COD payment
        toast.success("Order placed successfully!");
        router.push(`/orders/${newOrderId}/confirmation`);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to place order");
    }
  };

  if (!cart || !selectedShippingMethod || !selectedAddress) return null;

  if (showStripePayment && orderId) {
    return (
      <StripePayment
        orderId={orderId}
        onSuccess={() => {
          toast.success("Payment successful!");
          router.push(`/orders/${orderId}/confirmation`);
        }}
        onError={(error) => {
          toast.error(error);
          setShowStripePayment(false);
        }}
      />
    );
  }

  const subtotal = cart.totalAmount;
  const shippingCost = selectedShippingMethod.price;
  const total = subtotal + shippingCost;

  return (
    <div className="mb-8">
      <h1 className="text-2xl font-medium mb-6">Please check your order</h1>

      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium">{selectedShippingMethod.name}</h3>
            <p className="text-sm text-gray-600">
              {selectedShippingMethod.description}
            </p>
            <p className="font-medium mt-1">
              {new Intl.NumberFormat("vi-VN", {
                style: "decimal",
                maximumFractionDigits: 0,
              }).format(shippingCost)}{" "}
              ₫
            </p>
          </div>
          <Button
            variant="ghost"
            onClick={() =>
              useCheckoutStore.getState().setCurrentStep("delivery")
            }
          >
            Edit
          </Button>
        </div>

        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium">{selectedAddress.customer}</h3>
            <p className="text-sm text-gray-600">
              {selectedAddress.address.detailedAddress}
            </p>
            <p className="text-sm text-gray-600">
              {selectedAddress.address.district}
            </p>
            <p className="text-sm text-gray-600">
              {selectedAddress.address.city}
            </p>
            <p className="text-sm text-gray-600">
              {selectedAddress.phoneNumber}
            </p>
          </div>
          <Button
            variant="ghost"
            onClick={() =>
              useCheckoutStore.getState().setCurrentStep("delivery")
            }
          >
            Edit
          </Button>
        </div>

        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium">
              {selectedPaymentMethod === "COD"
                ? "Cash on Delivery"
                : "Credit Card Payment"}
            </h3>
            <p className="text-sm text-gray-600">
              {selectedPaymentMethod === "COD"
                ? "Pay when you receive your order"
                : "Pay securely with Stripe"}
            </p>
          </div>
          <Button
            variant="ghost"
            onClick={() =>
              useCheckoutStore.getState().setCurrentStep("payment")
            }
          >
            Edit
          </Button>
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>
              {new Intl.NumberFormat("vi-VN", {
                style: "decimal",
                maximumFractionDigits: 0,
              }).format(subtotal)}{" "}
              ₫
            </span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Delivery costs</span>
            <span>
              {new Intl.NumberFormat("vi-VN", {
                style: "decimal",
                maximumFractionDigits: 0,
              }).format(shippingCost)}{" "}
              ₫
            </span>
          </div>
          <div className="flex justify-between font-medium text-lg">
            <span>Total</span>
            <span>
              {new Intl.NumberFormat("vi-VN", {
                style: "decimal",
                maximumFractionDigits: 0,
              }).format(total)}{" "}
              ₫
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start space-x-2">
            <Checkbox
              id="terms"
              checked={acceptTerms}
              onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
            />
            <label htmlFor="terms" className="text-sm">
              I have read and accept the Purchase Conditions and understand the
              information on the use of my personal data explained in the
              Privacy Policy
            </label>
          </div>
        </div>

        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={() =>
              useCheckoutStore.getState().setCurrentStep("payment")
            }
            className="flex-1 h-12"
          >
            Return to payment method
          </Button>
          <Button
            onClick={handleSubmitOrder}
            disabled={!acceptTerms || isLoading}
            className="flex-1 bg-black text-white h-12 rounded-none"
          >
            {isLoading ? "Processing..." : "PAY AND PROCESS YOUR ORDER"}
          </Button>
        </div>
      </div>
    </div>
  );
};

const PurchaseSummary = () => {
  const { cart } = useCartStore();

  if (!cart) return null;

  return (
    <div className="bg-gray-50 p-6 rounded">
      <div className="mb-4">
        <h2 className="font-medium">Purchase summary ({cart.items.length})</h2>
      </div>
      <div className="space-y-4">
        {cart.items.map((item) => (
          <div key={item.productId} className="flex gap-4">
            <img
              src={item.productImage}
              alt={item.productName}
              className="w-24 h-24 object-cover"
            />
            <div>
              <p className="font-medium">{item.productName}</p>
              <div className="text-sm text-gray-600 mt-1 space-y-1">
                <p>
                  {item.quantity}x{" "}
                  {new Intl.NumberFormat("vi-VN", {
                    style: "decimal",
                    maximumFractionDigits: 0,
                  }).format(item.price)}{" "}
                  ₫
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CheckoutPage = () => {
  const { currentStep } = useCheckoutStore();
  const { cart } = useCartStore();
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  // Redirect if not authenticated or cart is empty
  React.useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    if (!cart || cart.items.length === 0) {
      router.push("/");
    }
  }, [isAuthenticated, cart, router]);

  if (!cart || cart.items.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-xl font-medium mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-4">
            Add some items to your cart to checkout
          </p>
          <Button
            onClick={() => router.push("/")}
            className="bg-black text-white"
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <CheckoutSteps />
          {currentStep === "delivery" && <DeliveryMethod />}
          {currentStep === "payment" && <PaymentMethod />}
          {currentStep === "summary" && <OrderSummary />}
        </div>

        <div className="lg:col-span-1">
          <PurchaseSummary />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
