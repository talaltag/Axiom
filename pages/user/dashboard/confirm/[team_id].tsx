import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import CongratulationsModal from "../../../../components/tournaments/CongratulationsModal";
import Image from "next/image";
import Link from "next/link";
import UserDashboardLayout from "../../../../components/layouts/UserDashboardLayout";
import { Container, Button, Alert, Badge } from "reactstrap";
import { StripePaymentForm } from "../../../../components/stripe/StripePaymentForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useSession } from "next-auth/react";
import CompletedTournamentDetail from "../../../../components/tournaments/CompletedTournamentDetail";

export interface RegistrationData {
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
    description: string;
    images: String[];
    gameMode: string;
    status: string;
    prizeSplit: String[];
  };
  organizer: Member;
  team: {
    id: string;
    name: string;
    members: Member[];
  };
  memberPayments: { userId: string; paymentStatus: string }[];
  leads: [];
}

interface Member {
  name: string;
  profileImage: string;
}

export default function ConfirmRegistration() {
  const router = useRouter();
  const { team_id } = router.query;
  const [paymentMethod, setPaymentMethod] = useState("wallet");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [registrationData, setRegistrationData] =
    useState<RegistrationData | null>(null);
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const session = useSession();

  const isPaid = useMemo(
    () =>
      registrationData?.memberPayments?.find(
        (payment) =>
          payment.userId === session.data.user?.id &&
          payment.paymentStatus == "completed"
      ),
    [registrationData, session]
  );

  const fetchRegistrationDetails = async () => {
    try {
      const response = await fetch(`/api/tournament-registrations/${team_id}`);
      const data = await response.json();
      if (data.success) {
        setRegistrationData(data.data);
      } else {
        setError("Failed to fetch registration details");
      }
    } catch (error) {
      setError("Error fetching registration details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setErrorMessage("");
  }, [paymentMethod]);

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

  useEffect(() => {
    if (team_id) {
      fetchRegistrationDetails();
    }
  }, [team_id]);

  const handleSubmit = async () => {
    setIsProcessing(true);

    try {
      const response = await fetch(
        `/api/tournament-registrations/${team_id}/pay`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            paymentStatus: "completed",
            paymentMethod: "wallet",
            amount: registrationData?.tournament?.entryFee,
          }),
        }
      );

      const data = await response.json();
      if (!data.success) {
        setIsProcessing(false);
        setErrorMessage(data?.message || "Payment failed");
        return;
      }

      if (response.ok) {
        setShowModal(true);
        setTimeout(() => {
          window.location.href = "/user/dashboard/tournaments";
        }, 5000);
      }
    } catch (error) {
      const { response } = error;
      setErrorMessage(response?.data?.message || "Payment failed");
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!registrationData) return <div>Registration not found</div>;

  return (
    <UserDashboardLayout>
      <div style={{ backgroundColor: "#F9FAFB", minHeight: "100vh" }}>
        <Container fluid style={{ padding: "24px" }}>
          <div className="d-flex align-items-center mb-4">
            <Link
              href="/dashboard"
              style={{
                color: "#667085",
                fontSize: "14px",
                textDecoration: "none",
              }}
            >
              Dashboard
            </Link>
            <span className="mx-2" style={{ color: "#667085" }}>
              /
            </span>
            <span style={{ color: "#101828", fontSize: "14px" }}>
              Tournament Name
            </span>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr",
              gap: "24px",
            }}
          >
            <div>
              <div
                className="bg-white rounded-3 p-4 mb-4"
                style={{
                  boxShadow:
                    "0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)",
                }}
              >
                <div className="d-flex gap-3">
                  <div
                    style={{
                      position: "relative",
                      width: "64px",
                      height: "64px",
                    }}
                  >
                    <Image
                      src={
                        registrationData.tournament?.images?.[0] ||
                        "/fortnite-banner.png"
                      }
                      alt="Tournament"
                      fill
                      style={{ objectFit: "cover", borderRadius: "8px" }}
                    />
                  </div>
                  <div className="d-flex flex-column justify-content-center">
                    <h4
                      style={{
                        fontSize: "16px",
                        fontWeight: 500,
                        color: "#101828",
                        marginBottom: "4px",
                      }}
                    >
                      {registrationData.tournament.name}
                    </h4>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "#667085",
                        margin: 0,
                      }}
                    >
                      {registrationData.tournament.date} •{" "}
                      {registrationData.tournament.startTime}
                    </p>
                  </div>
                  <div
                    style={{
                      marginLeft: "auto",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: "14px", color: "#667085" }}>
                        Entry Cost
                      </div>
                      <div
                        style={{
                          fontSize: "24px",
                          fontWeight: 600,
                          color: "#DC3545",
                        }}
                      >
                        ${registrationData.tournament.entryFee}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {registrationData?.tournament?.status == "completed" ? (
                <CompletedTournamentDetail
                  data={registrationData as RegistrationData}
                />
              ) : (
                <div>
                  {!isPaid &&
                    registrationData.tournament.status ==
                      "Registration Open" && (
                      <div
                        className="bg-white rounded-3 p-4"
                        style={{
                          boxShadow:
                            "0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)",
                          backgroundColor: "#fff",
                        }}
                      >
                        <h5
                          style={{
                            fontSize: "16px",
                            color: "#101828",
                            marginBottom: "24px",
                            fontWeight: 500,
                          }}
                        >
                          Payment Method
                        </h5>

                        <div
                          style={{
                            display: "flex",
                            gap: "12px",
                            marginBottom: "24px",
                          }}
                        >
                          <div
                            onClick={() => setPaymentMethod("wallet")}
                            style={{
                              padding: "10px 16px",
                              cursor: "pointer",
                              backgroundColor: "#fff",
                              border: `1px solid ${
                                paymentMethod === "wallet"
                                  ? "#FFD700"
                                  : "#EAECF0"
                              }`,
                              borderRadius: "8px",
                              display: "flex",
                              alignItems: "center",
                              minWidth: "164px",
                              height: "44px",
                              boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
                            }}
                          >
                            <div
                              style={{
                                fontSize: "14px",
                                color: "#000000",
                                fontWeight: 500,
                              }}
                            >
                              ${session.data.user?.walletBalance}
                            </div>
                            <div
                              style={{
                                fontSize: "14px",
                                color: "#667085",
                                marginLeft: "8px",
                              }}
                            >
                              Axiom Wallet
                            </div>
                          </div>

                          <div
                            onClick={() => setPaymentMethod("bank")}
                            style={{
                              padding: "10px 16px",
                              cursor: "pointer",
                              backgroundColor: "#fff",
                              border: `1px solid ${
                                paymentMethod === "bank" ? "#FFD700" : "#EAECF0"
                              }`,
                              borderRadius: "8px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              minWidth: "164px",
                              height: "44px",
                              boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
                            }}
                          >
                            <div
                              style={{
                                fontSize: "14px",
                                color: "#344054",
                                fontWeight: 500,
                              }}
                            >
                              Bank Card
                            </div>
                          </div>

                          <div
                            onClick={() => setPaymentMethod("stripe")}
                            style={{
                              padding: "10px 16px",
                              cursor: "pointer",
                              backgroundColor: "#fff",
                              border: `1px solid ${
                                paymentMethod === "stripe"
                                  ? "#FFD700"
                                  : "#EAECF0"
                              }`,
                              borderRadius: "8px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              minWidth: "164px",
                              height: "44px",
                              boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
                            }}
                          >
                            <span
                              style={{
                                fontSize: "14px",
                                color: "#344054",
                                fontWeight: 500,
                              }}
                            >
                              Stripe
                            </span>
                          </div>
                        </div>
                        {paymentMethod === "bank" && (
                          <>
                            <div
                              style={{
                                fontSize: "14px",
                                color: "#344054",
                                marginBottom: "16px",
                              }}
                            >
                              Card Information
                            </div>

                            <div style={{ display: "grid", gap: "16px" }}>
                              <div>
                                <div
                                  style={{
                                    display: "grid",
                                    gridTemplateColumns: "2fr 1fr 1fr",
                                    gap: "16px",
                                  }}
                                >
                                  <div>
                                    <label
                                      style={{
                                        fontSize: "14px",
                                        color: "#344054",
                                        fontWeight: 500,
                                        marginBottom: "6px",
                                        display: "block",
                                      }}
                                    >
                                      Card Number
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="XXXX XXXX XXXX XXXX"
                                      style={{
                                        height: "44px",
                                        fontSize: "16px",
                                        border: "1px solid #D0D5DD",
                                        borderRadius: "8px",
                                        padding: "10px 14px",
                                        boxShadow:
                                          "0px 1px 2px rgba(16, 24, 40, 0.05)",
                                      }}
                                    />
                                  </div>
                                  <div>
                                    <label
                                      style={{
                                        fontSize: "14px",
                                        color: "#344054",
                                        fontWeight: 500,
                                        marginBottom: "6px",
                                        display: "block",
                                      }}
                                    >
                                      MM/YY
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="MM/YY"
                                      style={{
                                        height: "44px",
                                        fontSize: "16px",
                                        border: "1px solid #D0D5DD",
                                        borderRadius: "8px",
                                        padding: "10px 14px",
                                        boxShadow:
                                          "0px 1px 2px rgba(16, 24, 40, 0.05)",
                                      }}
                                    />
                                  </div>
                                  <div>
                                    <label
                                      style={{
                                        fontSize: "14px",
                                        color: "#344054",
                                        fontWeight: 500,
                                        marginBottom: "6px",
                                        display: "block",
                                      }}
                                    >
                                      CVV
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="XXX"
                                      style={{
                                        height: "44px",
                                        fontSize: "16px",
                                        border: "1px solid #D0D5DD",
                                        borderRadius: "8px",
                                        padding: "10px 14px",
                                        boxShadow:
                                          "0px 1px 2px rgba(16, 24, 40, 0.05)",
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>

                              <div>
                                <h6
                                  style={{
                                    fontSize: "14px",
                                    fontWeight: 500,
                                    color: "#344054",
                                    marginBottom: "16px",
                                  }}
                                >
                                  Name on Card
                                </h6>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter name on card"
                                  style={{
                                    height: "44px",
                                    fontSize: "16px",
                                    border: "1px solid #D0D5DD",
                                    borderRadius: "8px",
                                    padding: "10px 14px",
                                    boxShadow:
                                      "0px 1px 2px rgba(16, 24, 40, 0.05)",
                                  }}
                                />
                              </div>
                            </div>
                          </>
                        )}
                        {paymentMethod === "stripe" && clientSecret && (
                          <Elements
                            stripe={stripePromise}
                            options={{ clientSecret }}
                          >
                            <StripePaymentForm
                              clientSecret={clientSecret}
                              teamId={team_id as string}
                            />
                          </Elements>
                        )}
                        {errorMessage && (
                          <Alert color="danger">{errorMessage}</Alert>
                        )}
                        {paymentMethod !== "stripe" && (
                          <div
                            className="d-flex justify-content-end mt-4"
                            style={{ gap: "12px" }}
                          >
                            <Button
                              color="light"
                              onClick={() => router.back()}
                              style={{
                                backgroundColor: "#fff",
                                border: "1px solid #D0D5DD",
                                height: "40px",
                                padding: "10px 16px",
                                borderRadius: "8px",
                                color: "#344054",
                                fontSize: "14px",
                                fontWeight: 500,
                              }}
                              disabled={isProcessing}
                            >
                              Back
                            </Button>
                            <Button
                              onClick={handleSubmit}
                              style={{
                                backgroundColor: "#FFD700",
                                border: "none",
                                height: "40px",
                                padding: "10px 16px",
                                borderRadius: "8px",
                                color: "#000",
                                fontSize: "14px",
                                fontWeight: 500,
                              }}
                              disabled={isProcessing}
                            >
                              Pay Now
                            </Button>
                          </div>
                        )}
                        <CongratulationsModal
                          isOpen={showModal}
                          toggle={() => setShowModal(!showModal)}
                        />
                      </div>
                    )}
                </div>
              )}
            </div>
            <div
              className="bg-white rounded-3 p-4"
              style={{
                boxShadow:
                  "0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)",
                backgroundColor: "#fff",
              }}
            >
              <div className="mb-4">
                <div style={{ fontSize: "14px", color: "#667085" }}>Status</div>
                <div
                  style={{
                    fontSize: "14px",
                    color: "#101828",
                    fontWeight: 500,
                    textTransform: "capitalize",
                  }}
                  className="mb-2"
                >
                  <Badge
                    color={
                      registrationData.tournament.status == "completed"
                        ? "success"
                        : "danger"
                    }
                  >
                    {registrationData.tournament.status}
                  </Badge>
                </div>
                <div style={{ fontSize: "14px", color: "#667085" }}>
                  Entry Fee
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    color: "#101828",
                    fontWeight: 500,
                  }}
                >
                  ${registrationData.tournament.entryFee}
                </div>
              </div>
              <div className="mb-4">
                <div style={{ fontSize: "14px", color: "#667085" }}>
                  Platform
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    color: "#101828",
                    fontWeight: 500,
                  }}
                >
                  {registrationData.tournament.platform}
                </div>
              </div>
              <div className="mb-4">
                <div style={{ fontSize: "14px", color: "#667085" }}>
                  Tournament Type
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    color: "#101828",
                    fontWeight: 500,
                  }}
                >
                  {registrationData.tournament.type}
                </div>
              </div>
              <div className="mb-4">
                <div style={{ fontSize: "14px", color: "#667085" }}>
                  Tournament Size
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    color: "#101828",
                    fontWeight: 500,
                  }}
                >
                  {registrationData.tournament.teamSize}
                </div>
              </div>
              <div className="mb-4">
                <div style={{ fontSize: "14px", color: "#667085" }}>
                  Team Size
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    color: "#101828",
                    fontWeight: 500,
                  }}
                >
                  {registrationData.tournament.teamSize}
                </div>
              </div>
              {/* <div className="mb-4">
                <div style={{ fontSize: "14px", color: "#667085" }}>
                  Country
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    color: "#101828",
                    fontWeight: 500,
                  }}
                >
                  {registrationData.tournament.country}
                </div>
              </div> */}
              <div className="mb-4">
                <div style={{ fontSize: "14px", color: "#667085" }}>Game</div>
                <div
                  style={{
                    fontSize: "14px",
                    color: "#101828",
                    fontWeight: 500,
                  }}
                >
                  {registrationData.tournament.game}
                </div>
              </div>
              <div className="mb-4">
                <div style={{ fontSize: "14px", color: "#667085" }}>
                  Game Mode
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    color: "#101828",
                    fontWeight: 500,
                  }}
                >
                  {registrationData.tournament.gameMode}
                </div>
              </div>

              <div className="mb-4">
                <div style={{ fontSize: "14px", color: "#667085" }}>
                  My Team
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    color: "#101828",
                    fontWeight: 500,
                    marginTop: "8px",
                  }}
                >
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <Image
                      src="/user1.png"
                      alt="Team"
                      width={32}
                      height={32}
                      className="rounded-circle"
                    />
                    <span>{registrationData.team.name}</span>
                  </div>
                  {[
                    ...registrationData.team.members,
                    registrationData.organizer,
                  ].map((member, index) => (
                    <div
                      key={index}
                      className="d-flex justify-content-between align-items-center py-2"
                    >
                      <div className="d-flex align-items-center gap-2">
                        <Image
                          src={member.profileImage ?? "/profile-avatar.png"}
                          alt={member.name}
                          width={24}
                          height={24}
                          className="rounded-circle"
                        />
                        <span style={{ fontSize: "14px" }}>{member.name}</span>
                      </div>
                      <span style={{ color: "#12B76A", fontSize: "12px" }}>
                        {/* {member.status} */}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div
                  style={{
                    fontSize: "14px",
                    color: "#667085",
                    marginBottom: "8px",
                  }}
                >
                  Prizes
                </div>
                {registrationData.tournament.prizeSplit.map((prize, index) => (
                  <div
                    key={index}
                    className="d-flex justify-content-between mb-2"
                  >
                    <span style={{ fontSize: "14px", color: "#101828" }}>
                      Team {index + 1}
                    </span>
                    <span
                      style={{
                        fontSize: "14px",
                        color: "#101828",
                        fontWeight: 500,
                      }}
                    >
                      ${prize}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </UserDashboardLayout>
  );
}
