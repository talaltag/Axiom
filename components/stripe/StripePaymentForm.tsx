import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "reactstrap";
import { useState } from "react";

interface StripePaymentFormProps {
  clientSecret: string;
}

export const StripePaymentForm: React.FC<StripePaymentFormProps> = ({
  clientSecret,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (cardElement) {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

      if (error) {
        setErrorMessage(error.message);
        console.error(error);
      } else {
        console.log(paymentMethod);

        const { error: confirmError, paymentIntent } =
          await stripe.confirmCardPayment(clientSecret, {
            payment_method: paymentMethod.id,
          });

        if (confirmError) {
          setErrorMessage(confirmError.message);
          console.error(confirmError);
        } else {
          console.log(paymentIntent);
          // Handle successful payment here
        }
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
        disabled={!stripe}
      >
        Pay Now
      </Button>
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
};
