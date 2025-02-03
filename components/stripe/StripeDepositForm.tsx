import { useState } from "react";
import { Button } from "reactstrap";

interface StripeDepositFormProps {
  accountId: string;
  amount: string;
}

export const StripeDepositForm: React.FC<StripeDepositFormProps> = ({
  accountId,
  amount,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (isProcessing) return;

    setIsProcessing(true);
    try {
      // Create payment intent for Connect
      const response = await fetch("/api/wallet/deposit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: parseFloat(amount),
          accountId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to process deposit");
      }

      const data = await response.json();

      // Redirect to Stripe Connect payment page
      window.location.href = data.checkoutUrl;
    } catch (err) {
      setError("An error occurred during payment");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Amount to Deposit ($)</label>
      </div>
      <Button
        type="submit"
        color="warning"
        disabled={isProcessing}
        className="w-100"
      >
        {isProcessing ? "Processing..." : "Continue to Payment"}
      </Button>
      {error && <div className="text-danger mt-2">{error}</div>}
    </form>
  );
};