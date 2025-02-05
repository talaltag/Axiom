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
      <Container fluid style={{ padding: '24px' }}>
        <div className="d-flex align-items-center mb-3">
          <Link href="/dashboard" className="text-decoration-none" style={{ color: "#667085" }}>Dashboard</Link>
          <span className="mx-2" style={{ color: "#667085" }}>/</span>
          <Link href="/tournaments" className="text-decoration-none" style={{ color: "#667085" }}>Tournament Name</Link>
        </div>

        <div className="d-flex align-items-center gap-3 mb-4 p-4 bg-white rounded-3">
          <Image
            src="/fortnite-banner.png"
            alt="Tournament"
            width={80}
            height={80}
            style={{ objectFit: "cover", borderRadius: '8px' }}
          />
          <div>
            <h4 className="mb-2" style={{ fontSize: "18px", color: "#101828" }}>{tournamentDetails.name}</h4>
            <p className="mb-3" style={{ fontSize: "14px", color: "#667085" }}>{tournamentDetails.date} · {tournamentDetails.time}</p>
            <div className="d-flex gap-4">
              <div>
                <p style={{ fontSize: "12px", color: "#667085", marginBottom: "4px" }}>Entry Cost</p>
                <p style={{ fontSize: "14px", color: "#101828", fontWeight: 500, marginBottom: 0 }}>{tournamentDetails.entryCost}</p>
              </div>
              <div>
                <p style={{ fontSize: "12px", color: "#667085", marginBottom: "4px" }}>Prize</p>
                <p style={{ fontSize: "14px", color: "#101828", fontWeight: 500, marginBottom: 0 }}>{tournamentDetails.prize}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <h5 className="mb-3" style={{ fontSize: "16px", color: "#101828" }}>Payment Method</h5>
          <div className="d-flex gap-3">
            <button
              className={`p-3 rounded-3 border d-flex flex-column align-items-start ${paymentMethod === 'wallet' ? 'border-warning' : ''}`}
              style={{ 
                minWidth: "160px",
                cursor: "pointer",
                backgroundColor: 'white',
                borderColor: paymentMethod === 'wallet' ? '#FFD600' : '#D0D5DD'
              }}
              onClick={() => setPaymentMethod('wallet')}
            >
              <span style={{ fontSize: "16px", color: "#101828", fontWeight: 500 }}>${walletBalance}</span>
              <span style={{ fontSize: "14px", color: "#667085" }}>Axiom Wallet</span>
            </button>

            <button
              className={`p-3 rounded-3 border d-flex flex-column align-items-start ${paymentMethod === 'bank' ? 'border-warning' : ''}`}
              style={{ 
                minWidth: "160px",
                cursor: "pointer",
                backgroundColor: 'white',
                borderColor: paymentMethod === 'bank' ? '#FFD600' : '#D0D5DD'
              }}
              onClick={() => setPaymentMethod('bank')}
            >
              <span style={{ fontSize: "16px", color: "#101828", fontWeight: 500 }}>Bank Card</span>
            </button>

            <button
              className={`p-3 rounded-3 border d-flex flex-column align-items-start ${paymentMethod === 'stripe' ? 'border-warning' : ''}`}
              style={{ 
                minWidth: "160px",
                cursor: "pointer",
                backgroundColor: 'white',
                borderColor: paymentMethod === 'stripe' ? '#FFD600' : '#D0D5DD'
              }}
              onClick={() => setPaymentMethod('stripe')}
            >
              <span style={{ fontSize: "16px", color: "#101828", fontWeight: 500 }}>Stripe</span>
            </button>
          </div>

          {paymentMethod === 'bank' && (
            <div className="mt-4">
              <h5 className="mb-4" style={{ fontSize: "14px", color: "#101828" }}>Card Information</h5>
              <Row>
                <Col md={4} className="mb-3">
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
                <Col md={4} className="mb-3">
                  <label className="mb-2" style={{ fontSize: "14px", color: "#344054" }}>Security Code</label>
                  <Input
                    type="text"
                    placeholder="CVV"
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
                <Col md={4} className="mb-3">
                  <label className="mb-2" style={{ fontSize: "14px", color: "#344054" }}>Name on Card</label>
                  <Input
                    type="text"
                    placeholder="Full Name"
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
                </Col>
              </Row>
              <Row>
                <Col md={4}>
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

        <div className="d-flex justify-content-between mt-4">
          <Button
            color="light"
            className="px-4"
            onClick={() => router.back()}
            style={{
              height: '44px',
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
              height: '44px',
              width: '170px',
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
      </Container>
    </UserDashboardLayout>
  );
}