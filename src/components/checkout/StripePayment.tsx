// components/checkout/StripePayment.tsx
import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ApiService } from "@/services/api";

const api = ApiService.getInstance();

const PaymentForm = ({ orderId, onSuccess, onError }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/orders/${orderId}/confirmation`,
        },
      });

      if (error) {
        onError(error.message);
      } else if (paymentIntent.status === "succeeded") {
        onSuccess();
      }
    } catch (error: any) {
      onError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      <Button
        type="submit"
        disabled={isLoading || !stripe || !elements}
        className="w-full bg-black text-white h-12"
      >
        {isLoading ? "Processing..." : "Pay Now"}
      </Button>
    </form>
  );
};

interface StripePaymentProps {
  orderId: number;
  onSuccess: () => void;
  onError: (error: string) => void;
}

export const StripePayment = ({
  orderId,
  onSuccess,
  onError,
}: StripePaymentProps) => {
  const [stripePromise, setStripePromise] = useState<any>(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Load Stripe configuration
    const loadConfig = async () => {
      try {
        const response = await api.get<{ publishableKey: string }>(
          "/payments/config"
        );
        if (response.success && response.data) {
          setStripePromise(loadStripe(response.data.publishableKey));
        }
      } catch (error: any) {
        onError("Failed to load payment configuration");
      }
    };

    loadConfig();
  }, [onError]);

  useEffect(() => {
    // Create payment intent
    const createPaymentIntent = async () => {
      try {
        const response = await api.post<{ clientSecret: string }>(
          "/payments/create-payment-intent",
          {
            orderId,
          }
        );
        if (response.success && response.data) {
          setClientSecret(response.data.clientSecret);
        }
      } catch (error: any) {
        onError("Failed to create payment intent");
      }
    };

    if (orderId) {
      createPaymentIntent();
    }
  }, [orderId, onError]);

  if (!stripePromise || !clientSecret) {
    return (
      <div className="flex justify-center p-4">Loading payment system...</div>
    );
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <PaymentForm orderId={orderId} onSuccess={onSuccess} onError={onError} />
    </Elements>
  );
};
