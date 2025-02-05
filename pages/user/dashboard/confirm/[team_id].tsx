import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { Container, Row, Col, Button, Input } from "reactstrap";
import UserDashboardLayout from "../../../../components/layouts/UserDashboardLayout";

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

        <Row>
          <Col md={12}>
            <div className="d-flex gap-4">
              <div className="bg-white rounded-3 p-4 mb-4" style={{ flex: 1, boxShadow: "0px 1px 3px rgba(16, 24, 40, 0.1)" }}>
                <h5 className="mb-4" style={{ fontSize: "16px", color: "#101828" }}>Payment Method</h5>
                <div className="d-flex gap-3 mb-4">
                  <div 
                    className={`rounded-3 cursor-pointer ${paymentMethod === 'wallet' ? 'border-2 border-warning' : 'border'}`}
                    style={{ 
                      width: "180px",
                      height: "80px",
                      padding: "16px",
                      cursor: "pointer",
                      backgroundColor: paymentMethod === 'wallet' ? '#FFFDF5' : '#FFFFFF',
                      borderColor: paymentMethod === 'wallet' ? '#FFD600' : '#D0D5DD'
                    }}
                    onClick={() => setPaymentMethod('wallet')}
                  >
                    <h5 className="mb-1" style={{ fontSize: "18px", fontWeight: "600", color: "#101828" }}>${walletBalance}</h5>
                    <div style={{ fontSize: "14px", color: "#667085" }}>Axiom Wallet</div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            <div className="d-flex justify-content-between px-4 py-3">
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
                  fontSize: "16px",
                  fontWeight: 500,
                  backgroundColor: "#FFD700",
                  border: "none",
                  borderRadius: "8px",
                  color: "#000000",
                  height: "44px"
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