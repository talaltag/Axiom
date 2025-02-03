import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "reactstrap";
import { useState } from "react";

interface StripePaymentFormProps {
  clientSecret: string;
  teamId: string;
}

export const StripePaymentForm: React.FC<StripePaymentFormProps> = ({
  clientSecret,
  teamId,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements || isProcessing) {
      return;
    }

    setIsProcessing(true);
    const cardElement = elements.getElement(CardElement);

    if (cardElement) {
      try {
        const { error, paymentMethod } = await stripe.createPaymentMethod({
          type: "card",
          card: cardElement,
        });

        if (error) {
          setErrorMessage(error.message);
          setIsProcessing(false);
          return;
        }

        const { error: confirmError, paymentIntent } =
          await stripe.confirmCardPayment(clientSecret, {
            payment_method: paymentMethod.id,
          });

        if (confirmError) {
          setErrorMessage(confirmError.message);
          setIsProcessing(false);
          return;
        }

        if (paymentIntent.status !== 'succeeded') {
          setErrorMessage('Payment was not successful');
          setIsProcessing(false);
          return;
        }

        // Update tournament registration status
        const response = await fetch(
          `/api/tournament-registrations/${teamId}/pay`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              paymentToken: paymentIntent.id,
              paymentStatus: "completed",
              paymentMethod: "stripe",
              amount: paymentIntent.amount / 100, // Convert from cents back to dollars
            }),
          }
        );

        const data = await response.json();
        if (!data.success) {
          setErrorMessage(data.message || 'Failed to update registration status');
          setIsProcessing(false);
          return;
        }

        if (response.ok) {
          alert("Payment successful");
          window.location.href = "/user/dashboard/tournaments";
        }
      } catch (error) {
        setErrorMessage("Payment failed");
      } finally {
        setIsProcessing(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="my-3">
      <div className="mb-3 border p-2">
        <CardElement />
      </div>
      <Button
        type="submit"
        className="float-end"
        color="warning"
        disabled={!stripe || isProcessing}
      >
        {isProcessing ? "Processing..." : "Pay Now"}
      </Button>
      {errorMessage && <div className="text-danger mt-2">{errorMessage}</div>}
    </form>
  );
};
