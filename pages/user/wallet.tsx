
import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardBody, Button } from 'reactstrap';
import UserDashboardLayout from '../../components/layouts/UserDashboardLayout';
import { useSession } from 'next-auth/react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { StripeDepositForm } from '../../components/stripe/StripeDepositForm';

export default function Wallet() {
  const [balance, setBalance] = useState(0);
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState('');
  const session = useSession();

  useEffect(() => {
    // Load Stripe
    setStripePromise(loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''));
  }, []);

  useEffect(() => {
    // Fetch user's wallet balance
    const fetchBalance = async () => {
      const response = await fetch('/api/wallet/balance');
      const data = await response.json();
      if (data.success) {
        setBalance(data.balance);
      }
    };
    fetchBalance();
  }, []);

  return (
    <UserDashboardLayout>
      <Container fluid className="p-4">
        <Row>
          <Col md={8}>
            <Card className="mb-4">
              <CardBody>
                <h4>Axiom Wallet</h4>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div>
                    <h2>${balance.toFixed(2)}</h2>
                    <small className="text-muted">Available Balance</small>
                  </div>
                  <Button color="warning" size="lg">Deposit</Button>
                </div>
              </CardBody>
            </Card>

            {clientSecret && (
              <Card>
                <CardBody>
                  <h5>Deposit Funds</h5>
                  <Elements stripe={stripePromise}>
                    <StripeDepositForm clientSecret={clientSecret} />
                  </Elements>
                </CardBody>
              </Card>
            )}
          </Col>
        </Row>
      </Container>
    </UserDashboardLayout>
  );
}
