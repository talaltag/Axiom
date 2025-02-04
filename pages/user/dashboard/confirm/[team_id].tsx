import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import UserDashboardLayout from "../../../../components/layouts/UserDashboardLayout";
import { Container, Row, Col, Button, Input } from "reactstrap";
import Link from "next/link";

export default function ConfirmRegistration() {
  const router = useRouter();
  const { team_id } = router.query;
  const [paymentMethod, setPaymentMethod] = useState("wallet");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
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
      ]
    }
  };

  return (
    <UserDashboardLayout>
      <Container fluid className="px-4">
        <div className="d-flex align-items-center mb-4 pt-4">
          <Link href="/dashboard" className="text-decoration-none" style={{ color: "#667085" }}>Dashboard</Link>
          <span className="mx-2" style={{ color: "#667085" }}>/</span>
          <span style={{ color: "#101828" }}>{tournamentDetails.name}</span>
        </div>

        <div className="d-flex gap-4 px-4 mb-4 bg-white rounded-3" style={{ boxShadow: "0px 1px 3px rgba(16, 24, 40, 0.1)", padding: "24px" }}>
          <Image
            src="/fortnite-banner.png"
            alt="Tournament"
            width={120}
            height={120}
            className="rounded-3"
            style={{ objectFit: "cover" }}
          />
          <div className="flex-grow-1">
            <h4 className="mb-2" style={{ fontSize: "18px", color: "#101828" }}>{tournamentDetails.name}</h4>
            <p className="text-muted mb-4" style={{ fontSize: "14px", color: "#667085" }}>{tournamentDetails.date} · {tournamentDetails.time}</p>
            <div className="d-flex gap-4">
              <div>
                <div style={{ fontSize: "12px", color: "#667085", marginBottom: "4px" }}>Entry Cost</div>
                <div style={{ fontSize: "16px", color: "#DC3545", fontWeight: 600 }}>{tournamentDetails.entryCost}</div>
              </div>
              <div>
                <div style={{ fontSize: "12px", color: "#667085", marginBottom: "4px" }}>Prize</div>
                <div style={{ fontSize: "16px", color: "#DC3545", fontWeight: 600 }}>{tournamentDetails.prize}</div>
              </div>
            </div>
          </div>
        </div>

        <Row>
          <Col md={8}>
            <div className="bg-white rounded-3 p-4 mb-4" style={{ boxShadow: "0px 1px 3px rgba(16, 24, 40, 0.1)" }}>
              <h5 className="mb-4" style={{ fontSize: "16px", color: "#101828" }}>Payment Method</h5>
              <div className="d-flex gap-3 mb-4">
                <div 
                  className={`p-4 rounded-3 cursor-pointer ${paymentMethod === 'wallet' ? 'border border-warning' : 'border'}`}
                  style={{ 
                    minWidth: "200px", 
                    cursor: "pointer",
                    borderColor: paymentMethod === 'wallet' ? '#FFD600' : '#D0D5DD'
                  }}
                  onClick={() => setPaymentMethod('wallet')}
                >
                  <h5 className="mb-1" style={{ fontSize: "16px", color: "#101828" }}>${walletBalance}</h5>
                  <div style={{ fontSize: "14px", color: "#667085" }}>Axiom Wallet</div>
                </div>
                <div 
                  className={`p-4 rounded-3 cursor-pointer ${paymentMethod === 'bank' ? 'border border-warning' : 'border'}`}
                  style={{ 
                    minWidth: "200px", 
                    cursor: "pointer",
                    borderColor: paymentMethod === 'bank' ? '#FFD600' : '#D0D5DD'
                  }}
                  onClick={() => setPaymentMethod('bank')}
                >
                  <h5 className="mb-1" style={{ fontSize: "16px", color: "#101828" }}>Bank Card</h5>
                </div>
                <div 
                  className={`p-4 rounded-3 cursor-pointer ${paymentMethod === 'stripe' ? 'border border-warning' : 'border'}`}
                  style={{ 
                    minWidth: "200px", 
                    cursor: "pointer",
                    borderColor: paymentMethod === 'stripe' ? '#FFD600' : '#D0D5DD'
                  }}
                  onClick={() => setPaymentMethod('stripe')}
                >
                  <h5 className="mb-1" style={{ fontSize: "16px", color: "#101828" }}>Stripe</h5>
                </div>
              </div>

              {paymentMethod === 'bank' && (
                <div>
                  <h5 className="mb-4" style={{ fontSize: "14px", color: "#101828" }}>Card Information</h5>
                  <Row>
                    <Col md={6} className="mb-3">
                      <label className="mb-2" style={{ fontSize: "14px", color: "#344054" }}>Card Number</label>
                      <Input
                        type="text"
                        placeholder="XXXX XXXX XXXX"
                        value={cardDetails.number}
                        onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
                        style={{ 
                          height: "44px",
                          border: "1px solid #D0D5DD",
                          borderRadius: "8px",
                          fontSize: "14px",
                          color: "#101828"
                        }}
                      />
                    </Col>
                    <Col md={6} className="mb-3">
                      <label className="mb-2" style={{ fontSize: "14px", color: "#344054" }}>Security Code</label>
                      <Input
                        type="text"
                        placeholder="XXXX XXXX XXXX"
                        value={cardDetails.security}
                        onChange={(e) => setCardDetails({...cardDetails, security: e.target.value})}
                        style={{ 
                          height: "44px",
                          border: "1px solid #D0D5DD",
                          borderRadius: "8px",
                          fontSize: "14px",
                          color: "#101828"
                        }}
                      />
                    </Col>
                  </Row>
                  <div className="mb-3">
                    <label className="mb-2" style={{ fontSize: "14px", color: "#344054" }}>Name on Card</label>
                    <Input
                      type="text"
                      placeholder="XXXX XXXX XXXX"
                      value={cardDetails.name}
                      onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
                      style={{ 
                        height: "44px",
                        border: "1px solid #D0D5DD",
                        borderRadius: "8px",
                        fontSize: "14px",
                        color: "#101828"
                      }}
                    />
                  </div>
                  <Row>
                    <Col md={6}>
                      <label className="mb-2" style={{ fontSize: "14px", color: "#344054" }}>Expiration Date</label>
                      <div className="d-flex gap-2">
                        <Input
                          type="select"
                          value={cardDetails.expMonth}
                          onChange={(e) => setCardDetails({...cardDetails, expMonth: e.target.value})}
                          style={{ 
                            height: "44px",
                            border: "1px solid #D0D5DD",
                            borderRadius: "8px",
                            fontSize: "14px",
                            color: "#101828"
                          }}
                        >
                          <option value="">Month</option>
                          {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                            <option key={month} value={month}>{month}</option>
                          ))}
                        </Input>
                        <Input
                          type="select"
                          value={cardDetails.expYear}
                          onChange={(e) => setCardDetails({...cardDetails, expYear: e.target.value})}
                          style={{ 
                            height: "44px",
                            border: "1px solid #D0D5DD",
                            borderRadius: "8px",
                            fontSize: "14px",
                            color: "#101828"
                          }}
                        >
                          <option value="">Year</option>
                          {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map((year) => (
                            <option key={year} value={year}>{year}</option>
                          ))}
                        </Input>
                      </div>
                    </Col>
                  </Row>
                </div>
              )}
            </div>
          </Col>

          <Col md={4}>
            <div className="bg-white rounded-3 p-4" style={{ boxShadow: "0px 1px 3px rgba(16, 24, 40, 0.1)" }}>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="fs-2 fw-bold text-dark mb-0">$500</h4>
                <span className="badge bg-success bg-opacity-10 text-success px-2 py-1" style={{ fontSize: "12px" }}>New</span>
              </div>
              <p className="text-muted mb-4" style={{ fontSize: "14px" }}>Prize</p>

              <div className="mb-3">
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted" style={{ fontSize: "14px" }}>Entry Fee</span>
                  <span style={{ fontSize: "14px" }}>$25</span>
                </div>
              </div>

              <div className="mb-3">
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted" style={{ fontSize: "14px" }}>Platform</span>
                  <span style={{ fontSize: "14px" }}>XBOX</span>
                </div>
              </div>

              <div className="mb-3">
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted" style={{ fontSize: "14px" }}>Tournament Type</span>
                  <span style={{ fontSize: "14px" }}>KILL RACE</span>
                </div>
              </div>

              <div className="mb-3">
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted" style={{ fontSize: "14px" }}>Tournament Size</span>
                  <span style={{ fontSize: "14px" }}>0 of 64 teams</span>
                </div>
              </div>

              <div className="mb-3">
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted" style={{ fontSize: "14px" }}>Team Size</span>
                  <span style={{ fontSize: "14px" }}>Quad</span>
                </div>
              </div>

              <div className="mb-3">
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted" style={{ fontSize: "14px" }}>Country</span>
                  <span style={{ fontSize: "14px" }}>USA</span>
                </div>
              </div>

              <div className="mb-3">
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted" style={{ fontSize: "14px" }}>Game</span>
                  <span style={{ fontSize: "14px" }}>Call of Duty</span>
                </div>
              </div>

              <div className="mb-4">
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted" style={{ fontSize: "14px" }}>Game Mode</span>
                  <span style={{ fontSize: "14px" }}>Battle Royale</span>
                </div>
              </div>

              <div className="mb-4">
                <h5 className="mb-3" style={{ fontSize: "14px", color: "#101828" }}>My Team</h5>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="mb-0" style={{ fontSize: "14px", color: "#101828" }}>My Team</h5>
                  <div className="badge bg-success bg-opacity-10 text-success px-2 py-1" style={{ fontSize: "12px" }}>New</div>
                </div>
                <div className="d-flex align-items-center gap-3 mb-3">
                  <Image
                    src="/user1.png"
                    alt="Team Logo"
                    width={40}
                    height={40}
                    className="rounded-circle"
                  />
                  <h6 className="mb-0" style={{ fontSize: "14px", color: "#101828" }}>{tournamentDetails.team.name}</h6>
                </div>

                {tournamentDetails.team.members.map((member, index) => (
                  <div key={index} className="d-flex align-items-center gap-3 mb-3">
                    <Image
                      src={member.avatar}
                      alt={member.name}
                      width={32}
                      height={32}
                      className="rounded-circle"
                    />
                    <div className="flex-grow-1">
                      <p className="mb-0" style={{ fontSize: "14px", color: "#101828" }}>{member.name}</p>
                      <small style={{ fontSize: "12px", color: "#667085" }}>{member.role}</small>
                    </div>
                    <span style={{ fontSize: "12px", color: "#12B76A" }}>{member.status}</span>
                  </div>
                ))}
              </div>

              <div>
                <h5 className="mb-3" style={{ fontSize: "14px", color: "#101828" }}>Prizes</h5>
                <div className="d-flex justify-content-between mb-2">
                  <span style={{ fontSize: "14px", color: "#667085" }}>1st Winner Prize</span>
                  <span style={{ fontSize: "14px", color: "#101828" }}>$776</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span style={{ fontSize: "14px", color: "#667085" }}>2nd Winner Prize</span>
                  <span style={{ fontSize: "14px", color: "#101828" }}>$776</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span style={{ fontSize: "14px", color: "#667085" }}>3rd Winner Prize</span>
                  <span style={{ fontSize: "14px", color: "#101828" }}>$776</span>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            <div className="d-flex justify-content-between mt-4 p-4">
              <Button
                color="light"
                className="px-4"
                onClick={() => router.back()}
                style={{
                  padding: "10px 24px",
                  fontSize: "14px",
                  fontWeight: 500,
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #D0D5DD",
                  borderRadius: "8px",
                  color: "#344054"
                }}
              >
                Back
              </Button>
              <Button
                color="warning"
                className="px-4"
                style={{
                  padding: "10px 24px",
                  fontSize: "14px",
                  fontWeight: 500,
                  backgroundColor: "#FFD600",
                  border: "none",
                  borderRadius: "8px",
                  color: "#101828"
                }}
              >
                Pay Now
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </UserDashboardLayout>
  );
}