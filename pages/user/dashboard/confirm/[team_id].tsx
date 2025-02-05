      import { useState } from "react";
      import { useRouter } from "next/router";
      import Image from "next/image";
      import UserDashboardLayout from "../../../../components/layouts/UserDashboardLayout";
      import { Container, Row, Col, Input } from "reactstrap";
      import Link from "next/link";

      export default function ConfirmRegistration() {
        const router = useRouter();
        const { team_id } = router.query;
        const [paymentMethod, setPaymentMethod] = useState("wallet");
        const [walletBalance, setWalletBalance] = useState(1200);
        const [cardDetails, setCardDetails] = useState({
          number: "",
          security: "",
          name: "",
          expMonth: "",
          expYear: "",
        });

        const tournamentDetails = {
          name: "Fortnite Summer Battle",
          date: "May 23, 2023",
          time: "9:00PM - 10:30PM EST",
          entryCost: "$200",
          prize: "$500",
          platform: "XBOX",
          tournamentType: "KILL RACE",
          tournamentSize: "0 of 64 teams",
          teamSize: "Quad",
          country: "USA",
          game: "Call of Duty",
          gameMode: "Battle Royale",
          team: {
            name: "Avengers Reborn",
            members: [
              { name: "John Smith", role: "Team Leader", status: "Pending", avatar: "/user1.png" },
              { name: "Sam Winchester", role: "Team Member", status: "Pending", avatar: "/user1.png" },
              { name: "Daniel Craig", role: "Team Member", status: "Pending", avatar: "/user1.png" },
              { name: "Gilbert Blythe", role: "Team Member", status: "Pending", avatar: "/user1.png" },
            ],
          },
        };

        return (
          <UserDashboardLayout>
            <Container fluid className="px-4">
              <div className="d-flex align-items-center mb-4 pt-4">
                <Link href="/dashboard" className="text-decoration-none" style={{ color: "#667085" }}>
                  Dashboard
                </Link>
                <span className="mx-2" style={{ color: "#667085" }}>
                  /
                </span>
                <span style={{ color: "#101828" }}>{tournamentDetails.name}</span>
              </div>

              <div
                className="d-flex gap-4 px-4 mb-4 bg-white rounded-3"
                style={{
                  boxShadow: "0px 1px 3px rgba(16, 24, 40, 0.1)",
                  padding: "24px",
                }}
              >
                <Image
                  src="/fortnite-banner.png"
                  alt="Tournament"
                  width={120}
                  height={120}
                  className="rounded-3"
                  style={{ objectFit: "cover" }}
                />
                <div className="flex-grow-1">
                  <h4
                    className="mb-2"
                    style={{ fontSize: "18px", color: "#101828" }}
                  >
                    {tournamentDetails.name}
                  </h4>
                  <p className="text-muted mb-4" style={{ fontSize: "14px", color: "#667085" }}>
                    {tournamentDetails.date} · {tournamentDetails.time}
                  </p>
                  <div className="d-flex gap-4">
                    <div>
                      <div style={{ fontSize: "12px", color: "#667085", marginBottom: "4px" }}>
                        Entry Cost
                      </div>
                      <div style={{ fontSize: "16px", color: "#DC3545", fontWeight: 600 }}>
                        {tournamentDetails.entryCost}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: "12px", color: "#667085", marginBottom: "4px" }}>
                        Prize
                      </div>
                      <div style={{ fontSize: "16px", color: "#DC3545", fontWeight: 600 }}>
                        {tournamentDetails.prize}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Row className="px-4 mb-4">
                <Col md={12}>
                  <div className="bg-white rounded-3 p-4" style={{ boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)" }}>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <h4 style={{ fontSize: "30px", fontWeight: "600", color: "#101828", margin: 0 }}>
                        {tournamentDetails.prize}
                      </h4>
                      <span
                        className="badge bg-success bg-opacity-10 text-success px-2 py-1"
                        style={{ fontSize: "12px", fontWeight: "500" }}
                      >
                        New
                      </span>
                    </div>
                    <Row>
                      <Col md={3}>
                        <div className="d-flex justify-content-between mb-2">
                          <span className="text-muted" style={{ fontSize: "14px" }}>Entry Fee</span>
                          <span style={{ fontSize: "14px" }}>{tournamentDetails.entryCost}</span>
                        </div>
                      </Col>
                      <Col md={3}>
                        <div className="d-flex justify-content-between mb-2">
                          <span className="text-muted" style={{ fontSize: "14px" }}>Platform</span>
                          <span style={{ fontSize: "14px" }}>{tournamentDetails.platform}</span>
                        </div>
                      </Col>
                      <Col md={3}>
                        <div className="d-flex justify-content-between mb-2">
                          <span className="text-muted" style={{ fontSize: "14px" }}>Tournament Type</span>
                          <span style={{ fontSize: "14px" }}>{tournamentDetails.tournamentType}</span>
                        </div>
                      </Col>
                      <Col md={3}>
                        <div className="d-flex justify-content-between mb-2">
                          <span className="text-muted" style={{ fontSize: "14px" }}>Tournament Size</span>
                          <span style={{ fontSize: "14px" }}>{tournamentDetails.tournamentSize}</span>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>

              <Row className="px-4">
                <Col md={12}>
                  <div className="d-flex gap-4">
                    <div
                      className="bg-white rounded-3 p-4 mb-4"
                      style={{
                        flex: 1,
                        boxShadow: "0px 1px 3px rgba(16, 24, 40, 0.1)",
                      }}
                    >
                      <h5 className="mb-4" style={{ fontSize: "16px", color: "#101828" }}>
                        Payment Method
                      </h5>
                      <div className="d-flex gap-3 mb-4">
                        {/* Wallet Payment */}
                        <div
                          className={`rounded-3 cursor-pointer ${paymentMethod === "wallet" ? "border-2 border-warning" : "border"}`}
                          style={{
                            width: "180px",
                            height: "80px",
                            padding: "16px",
                            backgroundColor: paymentMethod === "wallet" ? "#FFFDF5" : "#FFFFFF",
                            borderColor: paymentMethod === "wallet" ? "#FFD600" : "#D0D5DD",
                          }}
                          onClick={() => setPaymentMethod("wallet")}
                        >
                          <h5 className="mb-1" style={{ fontSize: "18px", fontWeight: "600", color: "#101828" }}>
                            ${walletBalance}
                          </h5>
                          <div style={{ fontSize: "14px", color: "#667085" }}>Axiom Wallet</div>
                        </div>
                        {/* Bank Payment */}
                        <div
                          className={`p-4 rounded-3 cursor-pointer ${paymentMethod === "bank" ? "border border-warning" : "border"}`}
                          style={{
                            minWidth: "200px",
                            borderColor: paymentMethod === "bank" ? "#FFD600" : "#D0D5DD",
                          }}
                          onClick={() => setPaymentMethod("bank")}
                        >
                          <h5 className="mb-1" style={{ fontSize: "16px", color: "#101828" }}>Bank Card</h5>
                        </div>
                        {/* Stripe Payment */}
                        <div
                          className={`p-4 rounded-3 cursor-pointer ${paymentMethod === "stripe" ? "border border-warning" : "border"}`}
                          style={{
                            minWidth: "200px",
                            borderColor: paymentMethod === "stripe" ? "#FFD600" : "#D0D5DD",
                          }}
                          onClick={() => setPaymentMethod("stripe")}
                        >
                          <h5 className="mb-1" style={{ fontSize: "16px", color: "#101828" }}>Stripe</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </UserDashboardLayout>
        );
      }
