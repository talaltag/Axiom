import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "reactstrap";

interface StripeDepositFormProps {
  clientSecret: string;
  amount: string;
}

export const StripeDepositForm: React.FC<StripeDepositFormProps> = ({
  clientSecret,
  amount,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements || isProcessing) {
      return;
    }

    setIsProcessing(true);
    setError(null);
    
    const cardElement = elements.getElement(CardElement);

    if (cardElement) {
      try {
        const { error: paymentError, paymentIntent } =
          await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
              card: cardElement,
              billing_details: {
                name: 'Wallet Deposit'
              }
            },
          });

        if (paymentError) {
          console.error('Payment error:', paymentError);
          setError(paymentError.message || "Payment failed");
          setIsProcessing(false);
          return;
        }

        if (!paymentIntent || paymentIntent.status !== 'succeeded') {
          setError('Payment was not successful');
          setIsProcessing(false);
          return;
        }

        // Update wallet balance
        const response = await fetch("/api/wallet/deposit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: parseFloat(amount),
            paymentIntentId: paymentIntent.id,
          }),
        });

        if (response.ok) {
          setError(null);
          const successMessage = document.createElement('div');
          successMessage.className = 'alert alert-success';
          successMessage.textContent = 'Payment successful! Your funds have been added.';
          document.querySelector('form')?.prepend(successMessage);
          
          // Refresh stripe balance
          const balanceResponse = await fetch('/api/stripe/connect/status');
          const balanceData = await balanceResponse.json();
          if (balanceData.success) {
            // Update balance in parent component
            window.dispatchEvent(new CustomEvent('stripeBalanceUpdate', { 
              detail: { balance: balanceData.balance }
            }));
          }
          
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      } catch (err) {
        setError("An error occurred during payment");
      } finally {
        setIsProcessing(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Amount to Deposit ($)</label>
      </div>
      <div className="mb-3 border p-3 rounded">
        <CardElement />
      </div>
      <Button
        type="submit"
        color="warning"
        disabled={!stripe || isProcessing}
        className="w-100"
      >
        {isProcessing ? "Processing..." : "Deposit Funds"}
      </Button>
      {error && <div className="text-danger mt-2">{error}</div>}
    </form>
  );
};
