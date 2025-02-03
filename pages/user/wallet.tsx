import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Table,
} from "reactstrap";
import UserDashboardLayout from "../../components/layouts/UserDashboardLayout";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { StripeDepositForm } from "../../components/stripe/StripeDepositForm";

export default function Wallet() {
  const [balance, setBalance] = useState(0);
  const [stripePromise, setStripePromise] = useState<any>(null);
  const [clientSecret, setClientSecret] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [depositHistory, setDepositHistory] = useState([]);

  useEffect(() => {
    setStripePromise(
      loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
    );
    fetchBalance();
    fetchDepositHistory();
  }, []);

  const fetchBalance = async () => {
    const response = await fetch("/api/wallet/balance");
    const data = await response.json();
    if (data.success) {
      setBalance(data.balance);
    }
  };

  const fetchDepositHistory = async () => {
    const response = await fetch("/api/wallet/history");
    const data = await response.json();
    if (data.success) {
      setDepositHistory(data.history);
    }
  };

  const [depositAmount, setDepositAmount] = useState("");
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const handleDeposit = () => {
    setIsModalOpen(true);
    setShowPaymentForm(false);
    setDepositAmount("");
  };

  const handleNext = async () => {
    if (!depositAmount || parseFloat(depositAmount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    const response = await fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: parseFloat(depositAmount) }),
    });
    const data = await response.json();
    setClientSecret(data.clientSecret);
    setShowPaymentForm(true);
  };

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
                  <Button color="warning" onClick={handleDeposit}>
                    Deposit
                  </Button>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <h5>Deposit History</h5>
                <Table>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {depositHistory.map((deposit: any) => (
                      <tr key={deposit._id}>
                        <td>
                          {new Date(deposit.createdAt).toLocaleDateString()}
                        </td>
                        <td>${deposit.amount.toFixed(2)}</td>
                        <td>{deposit.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Modal isOpen={isModalOpen} toggle={() => setIsModalOpen(false)}>
          <ModalHeader toggle={() => setIsModalOpen(false)}>
            Deposit Funds
          </ModalHeader>
          <ModalBody>
            {!showPaymentForm ? (
              <div>
                <div className="form-group mb-3">
                  <label>Amount to Deposit ($)</label>
                  <input
                    type="number"
                    className="form-control"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    min="1"
                    required
                  />
                </div>
                <Button color="primary" onClick={handleNext}>
                  Next
                </Button>
              </div>
            ) : (
              stripePromise &&
              clientSecret && (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                  <StripeDepositForm
                    clientSecret={clientSecret}
                    amount={depositAmount}
                  />
                </Elements>
              )
            )}
          </ModalBody>
        </Modal>
      </Container>
    </UserDashboardLayout>
  );
}
