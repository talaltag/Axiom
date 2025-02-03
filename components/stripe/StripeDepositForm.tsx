
import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button } from 'reactstrap';

interface StripeDepositFormProps {
  clientSecret: string;
}

export const StripeDepositForm: React.FC<StripeDepositFormProps> = ({ clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [amount, setAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!stripe || !elements || isProcessing) {
      return;
    }

    setIsProcessing(true);
    const cardElement = elements.getElement(CardElement);

    if (cardElement) {
      try {
        const { error: paymentError, paymentIntent } = await stripe.confirmCardPayment(
          clientSecret,
          {
            payment_method: {
              card: cardElement,
            },
          }
        );

        if (paymentError) {
          setError(paymentError.message || 'Payment failed');
          return;
        }

        // Update wallet balance
        const response = await fetch('/api/wallet/deposit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: parseFloat(amount),
            paymentIntentId: paymentIntent.id,
          }),
        });

        if (response.ok) {
          window.location.reload();
        }
      } catch (err) {
        setError('An error occurred during payment');
      } finally {
        setIsProcessing(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Amount to Deposit ($)</label>
        <input
          type="number"
          className="form-control"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="1"
          required
        />
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
        {isProcessing ? 'Processing...' : 'Deposit Funds'}
      </Button>
      {error && <div className="text-danger mt-2">{error}</div>}
    </form>
  );
};
