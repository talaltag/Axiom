import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import UserDashboardLayout from "../../../../components/layouts/UserDashboardLayout";
import { Container, Row, Col, Card, CardBody, Button, Form } from "reactstrap";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { StripePaymentForm } from "../../../../components/stripe/StripePaymentForm";

interface Member {
  name: string;
  avatar: string;
}

interface RegistrationData {
  tournament: {
    name: string;
    date: string;
    startTime: string;
    endTime: string;
    entryFee: string;
    platform: string;
    teamSize: string;
    prize: string;
    type: string;
    game: string;
    images: String[];
  };
  team: {
    name: string;
    members: Member[];
  };
  memberPayments: {userId: string, paymentStatus: string}[];
}

export default function ConfirmRegistration() {
  const router = useRouter();
  const { team_id } = router.query;
  const [registrationData, setRegistrationData] =
    useState<RegistrationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("wallet");
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expMonth: "",
    expYear: "",
    security: "",
  });
  const [userPaymentStatus, setUserPaymentStatus] = useState(""); // Added state for user's payment status

  useEffect(() => {
    if (team_id) {
      fetchRegistrationDetails();
    }
  }, [team_id]);

  const fetchRegistrationDetails = async () => {
    try {
      const response = await fetch(`/api/tournament-registrations/${team_id}`);
      const data = await response.json();
      if (data.success) {
        setRegistrationData(data.data);

        // Check if user has already paid
        const currentUserId = session?.user?.id; // Assuming session object exists with user ID
        const userPayment = data.data.memberPayments?.find(
          payment => payment.userId === currentUserId
        );

        setUserPaymentStatus(userPayment?.paymentStatus || "not_paid"); // Set payment status, default to "not_paid"

      } else {
        setError("Failed to fetch registration details");
      }
    } catch (error) {
      setError("Error fetching registration details");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => router.back();

  useEffect(() => {
    if (paymentMethod === "stripe") {
      const loadStripeData = async () => {
        const stripe = await loadStripe(
          process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
        );
        setStripePromise(stripe);

        // Create payment intent
        const response = await fetch("/api/create-payment-intent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: registrationData?.tournament?.entryFee,
            teamId: team_id,
          }),
        });
        const data = await response.json();
        setClientSecret(data.clientSecret);
      };
      loadStripeData();
    }
  }, [paymentMethod, team_id, registrationData?.tournament?.entryFee]);

  const handlePayment = async () => {
    if (paymentMethod === "stripe" && stripePromise && clientSecret) {
      try {
        const stripe = await stripePromise;
        const result = await stripe.redirectToCheckout({
          sessionId: clientSecret,
        });
        if (result.error) {
          setError(result.error.message);
        }
      } catch (error) {
        setError("Payment failed");
      }
    } else {
      //Handle other payment methods
      try {
        const response = await fetch(
          `/api/tournament-registrations/${team_id}/pay`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ paymentMethod }), // cardDetails removed as not used for other methods
          }
        );
        const data = await response.json();
        if (data.success) {
          router.push("/user/dashboard/tournaments");
        }
      } catch (error) {
        setError("Payment failed");
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!registrationData) return <div>Registration not found</div>;

  return (
    <UserDashboardLayout>
      <Container fluid className="p-4">
        <div className="d-flex align-items-center mb-4">
          <a
            onClick={() => router.back()}
            className="text-decoration-none me-2"
          >
            ‹
          </a>
          <span>Dashboard / {registrationData.tournament.name}</span>
        </div>

        <Row>
          <Col md={8}>
            <div className="d-flex gap-4 mb-4">
              <Image
                src={`${
                  registrationData.tournament.images &&
                  registrationData.tournament.images.length > 0
                    ? registrationData.tournament.images[0]
                    : "/fortnite-banner.png"
                }`}
                alt="Tournament Banner"
                width={120}
                height={120}
                className="rounded"
                priority
              />
              <div>
                <h4>{registrationData.tournament.name}</h4>
                <p className="text-muted">
                  {registrationData.tournament.date} ·{" "}
                  {registrationData.tournament.startTime} -{" "}
                  {registrationData.tournament.endTime} EST
                </p>
              </div>
            </div>

            <Card className="mb-4">
              <CardBody>
                <Row className="mb-4">
                  <Col md={6}>
                    <div className="mb-3">
                      <h5>Entry Fee</h5>
                      <p>${registrationData.tournament.entryFee}</p>
                    </div>
                    <div className="mb-3">
                      <h5>Platform</h5>
                      <p>{registrationData.tournament.platform}</p>
                    </div>
                    <div className="mb-3">
                      <h5>Team Size</h5>
                      <p>{registrationData.tournament.teamSize}</p>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-3">
                      <h5>Prize</h5>
                      <p>${registrationData.tournament.prize}</p>
                    </div>
                    <div className="mb-3">
                      <h5>Tournament Type</h5>
                      <p>{registrationData.tournament.type}</p>
                    </div>
                    <div className="mb-3">
                      <h5>Game</h5>
                      <p>{registrationData.tournament.game}</p>
                    </div>
                  </Col>
                </Row>

                {registrationData.memberPayments && (
                  <p>Your Payment Status: {userPaymentStatus}</p>
                )}

                {registrationData.paymentStatus === "pending" && (
                  <>
                    <div className="mt-4">
                      <h5>Payment Method</h5>
                      <div className="d-flex gap-3 mt-3">
                        <Card
                          className={`p-3 cursor-pointer ${
                            paymentMethod === "wallet" ? "border-warning" : ""
                          }`}
                          onClick={() => setPaymentMethod("wallet")}
                        >
                          <div className="text-center">
                            <h6>$120.00</h6>
                            <small>Axiom Wallet</small>
                          </div>
                        </Card>
                        <Card
                          className={`p-3 cursor-pointer ${
                            paymentMethod === "bank" ? "border-warning" : ""
                          }`}
                          onClick={() => setPaymentMethod("bank")}
                        >
                          <div className="text-center">
                            <h6>Bank Card</h6>
                          </div>
                        </Card>
                        <Card
                          className={`p-3 cursor-pointer ${
                            paymentMethod === "stripe" ? "border-warning" : ""
                          }`}
                          onClick={() => setPaymentMethod("stripe")}
                        >
                          <div className="text-center">
                            <h6>Stripe</h6>
                          </div>
                        </Card>
                      </div>
                    </div>

                    {paymentMethod === "bank" && (
                      <div className="mt-4">
                        <h5>Card Information</h5>
                        <Form className="mt-3">
                          <Row>
                            <Col md={6} className="mb-3">
                              <label>Card Number</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="XXXX XXXX XXXX"
                                value={cardDetails.number}
                                onChange={(e) =>
                                  setCardDetails({
                                    ...cardDetails,
                                    number: e.target.value,
                                  })
                                }
                              />
                            </Col>
                            <Col md={6} className="mb-3">
                              <label>Security Code</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="XXXX XXXX XXXX"
                                value={cardDetails.security}
                                onChange={(e) =>
                                  setCardDetails({
                                    ...cardDetails,
                                    security: e.target.value,
                                  })
                                }
                              />
                            </Col>
                          </Row>
                          <div className="mb-3">
                            <label>Name on Card</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="XXXX XXXX XXXX"
                              value={cardDetails.name}
                              onChange={(e) =>
                                setCardDetails({
                                  ...cardDetails,
                                  name: e.target.value,
                                })
                              }
                            />
                          </div>
                          <Row>
                            <Col md={6}>
                              <label>Expiration Date</label>
                              <select
                                className="form-select"
                                value={cardDetails.expMonth}
                                onChange={(e) =>
                                  setCardDetails({
                                    ...cardDetails,
                                    expMonth: e.target.value,
                                  })
                                }
                              >
                                <option value="">Month</option>
                                {Array.from(
                                  { length: 12 },
                                  (_, i) => i + 1
                                ).map((month) => (
                                  <option key={month} value={month}>
                                    {month}
                                  </option>
                                ))}
                              </select>
                            </Col>
                            <Col md={6}>
                              <label>&nbsp;</label>
                              <select
                                className="form-select"
                                value={cardDetails.expYear}
                                onChange={(e) =>
                                  setCardDetails({
                                    ...cardDetails,
                                    expYear: e.target.value,
                                  })
                                }
                              >
                                <option value="">Year</option>
                                {Array.from(
                                  { length: 10 },
                                  (_, i) => new Date().getFullYear() + i
                                ).map((year) => (
                                  <option key={year} value={year}>
                                    {year}
                                  </option>
                                ))}
                              </select>
                            </Col>
                          </Row>
                        </Form>
                      </div>
                    )}

                    {paymentMethod === "stripe" &&
                      stripePromise &&
                      clientSecret && (
                        <Elements
                          stripe={stripePromise}
                          options={{ clientSecret }}
                        >
                          <StripePaymentForm clientSecret={clientSecret} teamId={team_id as string} />
                        </Elements>
                      )}

                    <div className="d-flex justify-content-between mt-4">
                      <Button color="secondary" onClick={handleBack}>
                        Back
                      </Button>
                      {/* <Button color="warning" onClick={handlePayment}>
                        Pay Now
                      </Button> */}
                    </div>
                  </>
                )}
              </CardBody>
            </Card>
          </Col>

          <Col md={4}>
            <Card>
              <CardBody>
                <h5 className="mb-4">My Team</h5>
                <div className="d-flex align-items-center gap-3 mb-3">
                  <Image
                    src="/user1.png"
                    alt="Team Logo"
                    width={40}
                    height={40}
                    className="rounded-circle"
                  />
                  <div>
                    <h6 className="mb-0">{registrationData.team.name}</h6>
                  </div>
                </div>

                {registrationData.team.members?.map((member, index) => (
                  <div
                    key={index}
                    className="d-flex align-items-center gap-3 mb-2"
                  >
                    <Image
                      src={member.avatar || "/user1.png"}
                      alt={member.name}
                      width={32}
                      height={32}
                      className="rounded-circle"
                    />
                    <div className="flex-grow-1">
                      <p className="mb-0">{member.name}</p>
                      <small className="text-muted">Team Member</small>
                    </div>
                    <span className="text-success">Pending</span>
                  </div>
                ))}

                <div className="mt-4">
                  <h5>Prizes</h5>
                  <div className="mb-2 d-flex justify-content-between">
                    <span>1st Winner Prize</span>
                    <span>$776</span>
                  </div>
                  <div className="mb-2 d-flex justify-content-between">
                    <span>2nd Winner Prize</span>
                    <span>$776</span>
                  </div>
                  <div className="mb-2 d-flex justify-content-between">
                    <span>3rd Winner Prize</span>
                    <span>$776</span>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </UserDashboardLayout>
  );
}