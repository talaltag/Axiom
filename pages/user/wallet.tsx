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
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink
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
  const [activeTab, setActiveTab] = useState('deposit');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [isConnectLoading, setIsConnectLoading] = useState(false);


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

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewUrl(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    // Implement your upload logic here.  This is a placeholder.
    console.log("Uploading:", selectedFile);
    // Consider using a FormData object for file uploads.
    alert("Screenshot Uploaded!")
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  const handleWithdraw = () => {
    // Implement withdrawal logic here. This is a placeholder.
    console.log("Withdrawing:", withdrawAmount);
    alert("Withdrawal initiated!");
  };

  const handleStripeConnect = () => {
    setIsConnectLoading(true);
    // Implement Stripe Connect OAuth flow here. This is a placeholder.
    console.log("Connecting to Stripe...");
    setTimeout(() => {
      setIsConnectLoading(false);
      alert("Stripe account connected!");
    }, 2000);
  };

  const toggle = (tab: string) => {
    if (activeTab !== tab) setActiveTab(tab);
  }

  return (
    <UserDashboardLayout>
      <Container fluid className="p-4">
        <Nav tabs>
          <NavItem>
            <NavLink
              className={(activeTab === 'deposit' ? 'active' : '')}
              onClick={() => { toggle('deposit'); }}
            >
              Deposit
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={(activeTab === 'withdraw' ? 'active' : '')}
              onClick={() => { toggle('withdraw'); }}
            >
              Withdraw
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={(activeTab === 'connect' ? 'active' : '')}
              onClick={() => { toggle('connect'); }}
            >
              Connect Account
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="deposit">
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
          </TabPane>
          <TabPane tabId="withdraw">
            <div className="p-4">
              <h5>Withdraw Funds</h5>
              <div className="mb-3">
                <label className="form-label">Amount to Withdraw ($)</label>
                <input
                  type="number"
                  className="form-control"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                />
              </div>
              <Button color="warning" onClick={handleWithdraw}>
                Withdraw to Connected Account
              </Button>
            </div>
          </TabPane>
          <TabPane tabId="connect">
            <div className="p-4">
              <h5>Connect Your Stripe Account</h5>
              <p>Connect your Stripe account to receive withdrawals</p>
              <Button 
                color="primary" 
                onClick={handleStripeConnect}
                disabled={isConnectLoading}
              >
                {isConnectLoading ? "Connecting..." : "Connect with Stripe"}
              </Button>
            </div>
          </TabPane>
          <TabPane tabId="screenshot">
            <Row>
              <Col md={8}>
                <Card className="mb-4">
                  <CardBody>
                    <h4 className="mb-4">Upload Screenshot</h4>
                    <div className="mb-4">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="form-control"
                      />
                    </div>
                    {previewUrl && (
                      <div className="mb-4">
                        <img
                          src={previewUrl}
                          alt="Preview"
                          style={{ maxWidth: '100%', maxHeight: '400px' }}
                          className="rounded"
                        />
                      </div>
                    )}
                    <Button
                      color="warning"
                      onClick={handleUpload}
                      disabled={!selectedFile}
                      style={{
                        backgroundColor: "#FFD600",
                        borderColor: "#FFD600"
                      }}
                    >
                      Upload Screenshot
                    </Button>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </Container>
    </UserDashboardLayout>
  );
}