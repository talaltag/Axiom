
import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import UserDashboardLayout from "../../../../components/layouts/UserDashboardLayout";
import { Container, Row, Col, Button } from "reactstrap";

export default function ConfirmRegistration() {
  const router = useRouter();
  const { team_id } = router.query;
  const [paymentMethod, setPaymentMethod] = useState("wallet");
  const [walletBalance, setWalletBalance] = useState(1200);

  const tournamentDetails = {
    name: "Fortnite Summer Battle",
    date: "May 23, 2023",
    time: "9:00PM - 10:30PM EST",
    entryCost: "$200",
    entryFee: "$25",
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
          <span className="mx-2" style={{ color: "#667085" }}>/</span>
          <span style={{ color: "#101828" }}>{tournamentDetails.name}</span>
        </div>

        <div className="bg-white rounded-3 p-4 mb-4" style={{ boxShadow: "0px 1px 3px rgba(16, 24, 40, 0.1)" }}>
          <div className="d-flex gap-4">
            <div style={{ position: 'relative', width: '120px', height: '120px' }}>
              <Image
                src="/fortnite-banner.png"
                alt="Tournament"
                fill
                className="rounded-3"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="flex-grow-1">
              <h4 style={{ fontSize: "18px", color: "#101828", marginBottom: "8px" }}>
                {tournamentDetails.name}
              </h4>
              <p style={{ fontSize: "14px", color: "#667085", marginBottom: "24px" }}>
                {tournamentDetails.date} · {tournamentDetails.time}
              </p>
              <div className="d-flex gap-4">
                <div>
                  <div style={{ fontSize: "12px", color: "#667085", marginBottom: "4px" }}>
                    Entry Cost
                  </div>
                  <div style={{ fontSize: "16px", fontWeight: 600, color: "#DC3545" }}>
                    {tournamentDetails.entryCost}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: "12px", color: "#667085", marginBottom: "4px" }}>
                    Prize
                  </div>
                  <div style={{ fontSize: "16px", fontWeight: 600, color: "#DC3545" }}>
                    {tournamentDetails.prize}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Row className="px-0 mb-4">
          <Col md={12}>
            <div className="bg-white rounded-3 p-4" style={{ boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)" }}>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 style={{ fontSize: "30px", fontWeight: 600, color: "#101828", margin: 0 }}>
                  {tournamentDetails.prize}
                </h4>
                <span className="badge bg-success bg-opacity-10 text-success px-2 py-1" style={{ fontSize: "12px", fontWeight: 500 }}>
                  New
                </span>
              </div>
              <Row>
                {[
                  { label: "Entry Fee", value: tournamentDetails.entryFee },
                  { label: "Platform", value: tournamentDetails.platform },
                  { label: "Tournament Type", value: tournamentDetails.tournamentType },
                  { label: "Tournament Size", value: tournamentDetails.tournamentSize }
                ].map((item, index) => (
                  <Col md={3} key={index}>
                    <div className="d-flex justify-content-between mb-2">
                      <span style={{ fontSize: "14px", color: "#667085" }}>{item.label}</span>
                      <span style={{ fontSize: "14px", color: "#101828" }}>{item.value}</span>
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          </Col>
        </Row>

        <Row className="px-0">
          <Col md={12}>
            <div className="bg-white rounded-3 p-4 mb-4" style={{ boxShadow: "0px 1px 3px rgba(16, 24, 40, 0.1)" }}>
              <h5 style={{ fontSize: "16px", color: "#101828", marginBottom: "24px" }}>
                Payment Method
              </h5>
              <div className="d-flex gap-3 mb-4">
                <div
                  className={`rounded-3 cursor-pointer ${paymentMethod === "wallet" ? "border-2 border-warning" : "border"}`}
                  style={{
                    width: "180px",
                    height: "80px",
                    padding: "16px",
                    cursor: "pointer",
                    backgroundColor: paymentMethod === "wallet" ? "#FFFDF5" : "#FFFFFF",
                    borderColor: paymentMethod === "wallet" ? "#FFD600" : "#D0D5DD",
                  }}
                  onClick={() => setPaymentMethod("wallet")}
                >
                  <h5 style={{ fontSize: "18px", fontWeight: 600, color: "#101828", marginBottom: "4px" }}>
                    ${walletBalance}
                  </h5>
                  <div style={{ fontSize: "14px", color: "#667085" }}>Axiom Wallet</div>
                </div>

                <div
                  className={`rounded-3 cursor-pointer ${paymentMethod === "bank" ? "border-2 border-warning" : "border"}`}
                  style={{
                    minWidth: "200px",
                    height: "80px",
                    padding: "16px",
                    cursor: "pointer",
                    backgroundColor: paymentMethod === "bank" ? "#FFFDF5" : "#FFFFFF",
                    borderColor: paymentMethod === "bank" ? "#FFD600" : "#D0D5DD",
                  }}
                  onClick={() => setPaymentMethod("bank")}
                >
                  <h5 style={{ fontSize: "16px", color: "#101828", marginBottom: 0 }}>Bank Card</h5>
                </div>

                <div
                  className={`rounded-3 cursor-pointer ${paymentMethod === "stripe" ? "border-2 border-warning" : "border"}`}
                  style={{
                    minWidth: "200px",
                    height: "80px",
                    padding: "16px",
                    cursor: "pointer",
                    backgroundColor: paymentMethod === "stripe" ? "#FFFDF5" : "#FFFFFF",
                    borderColor: paymentMethod === "stripe" ? "#FFD600" : "#D0D5DD",
                  }}
                  onClick={() => setPaymentMethod("stripe")}
                >
                  <h5 style={{ fontSize: "16px", color: "#101828", marginBottom: 0 }}>Stripe</h5>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </UserDashboardLayout>
  );
}
