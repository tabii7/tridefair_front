import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import { Loader2, CheckCircle2, XCircle } from "lucide-react"; // Optional icons
import { addToCart$ } from "../store/addToCart";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    setError(null);
    setSuccess(null);

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    console.log("cardElement", addToCart$.checkOutData.get());
    try {
      const res = await fetch("/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: localStorage.getItem("trideFairUserId"),
          amount: addToCart$?.checkOutData?.cartItems?.grand_total?.get(), // Amount in the smallest currency unit (e.g., cents for USD)
          currency: "usd", // Currency code (e.g., 'usd' for US Dollars)
        }), // Example: $10
      });
      const { clientSecret } = await res.json();

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement!,
          billing_details: {
            name:
              addToCart$?.checkOutData?.addressForm?.firstName +
              " " +
              addToCart$?.checkOutData?.addressForm?.lastName,
          },
        },
      });

      if (result.error) {
        setError(result.error.message ?? "Something went wrong.");
      } else if (result.paymentIntent.status === "succeeded") {
        setSuccess("🎉 Payment successful!");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    }

    setProcessing(false);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 shadow-lg rounded-2xl border mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Secure Checkout
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="border rounded-md p-4 shadow-sm">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#32325d",
                  "::placeholder": { color: "#a0aec0" },
                },
                invalid: { color: "#e53e3e" },
              },
            }}
          />
        </div>

        <button
          type="submit"
          disabled={!stripe || processing}
          className="w-full flex justify-center items-center gap-2 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
        >
          {processing && <Loader2 className="animate-spin w-5 h-5" />}
          {processing ? "Processing..." : "Pay Now"}
        </button>

        {error && (
          <div className="flex items-center text-sm text-red-600 mt-2">
            <XCircle className="w-4 h-4 mr-1" /> {error}
          </div>
        )}
        {success && (
          <div className="flex items-center text-sm text-green-600 mt-2">
            <CheckCircle2 className="w-4 h-4 mr-1" /> {success}
          </div>
        )}
      </form>
    </div>
  );
};

export default CheckoutForm;
