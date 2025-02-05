
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
    prize: "$500",
    platform: "XBOX",
    tournamentType: "KILL RACE",
    tournamentSize: "0 of 64 teams",
    teamSize: "Quad",
    entryFee: "$25"
  };

  return (
    <UserDashboardLayout>
      <Container fluid>
        <div className="d-flex align-items-center mb-4 pt-3">
          <Link href="/dashboard" className="text-decoration-none" style={{ color: "#667085", fontSize: "14px" }}>
            Dashboard
          </Link>
          <span className="mx-2" style={{ color: "#667085" }}>/</span>
          <span style={{ color: "#101828", fontSize: "14px" }}>{tournamentDetails.name}</span>
        </div>

        <div className="bg-white rounded-3 p-4 mb-4">
          <div className="d-flex gap-4">
            <div style={{ position: 'relative', width: '80px', height: '80px', flexShrink: 0 }}>
              <Image
                src="/fortnite-banner.png"
                alt="Tournament"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-3"
              />
            </div>
            <div className="flex-grow-1">
              <h4 style={{ fontSize: "18px", fontWeight: 500, color: "#101828", marginBottom: "4px" }}>
                {tournamentDetails.name}
              </h4>
              <p style={{ fontSize: "14px", color: "#667085", marginBottom: "16px" }}>
                {tournamentDetails.date} • {tournamentDetails.time}
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
            <div>
              <span className="badge bg-success bg-opacity-10 text-success px-2 py-1" 
                style={{ fontSize: "12px", fontWeight: 500 }}>
                New
              </span>
            </div>
          </div>
        </div>

        <Row>
          <Col lg={8}>
            <div className="bg-white rounded-3 p-4 mb-4">
              <Row>
                {[
                  { label: "Entry Fee", value: tournamentDetails.entryFee },
                  { label: "Platform", value: tournamentDetails.platform },
                  { label: "Tournament Type", value: tournamentDetails.tournamentType },
                  { label: "Tournament Size", value: tournamentDetails.tournamentSize }
                ].map((item, index) => (
                  <Col md={6} lg={3} key={index} className="mb-3">
                    <div style={{ fontSize: "14px", color: "#667085" }}>
                      {item.label}
                    </div>
                    <div style={{ fontSize: "14px", color: "#101828", fontWeight: 500 }}>
                      {item.value}
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          </Col>
        </Row>

        <div className="bg-white rounded-3 p-4">
          <h5 style={{ fontSize: "16px", color: "#101828", marginBottom: "24px", fontWeight: 500 }}>
            Payment Method
          </h5>
          
          <div className="d-flex gap-3 mb-4">
            <div
              onClick={() => setPaymentMethod("wallet")}
              className={`rounded-3 cursor-pointer ${paymentMethod === "wallet" ? "border-2 border-warning" : "border"}`}
              style={{
                padding: "24px",
                width: "240px",
                cursor: "pointer",
                backgroundColor: paymentMethod === "wallet" ? "#FFFDF5" : "#FFFFFF",
                borderColor: paymentMethod === "wallet" ? "#FFD600" : "#D0D5DD",
              }}
            >
              <div style={{ fontSize: "18px", fontWeight: 600, color: "#101828", marginBottom: "4px" }}>
                ${walletBalance}
              </div>
              <div style={{ fontSize: "14px", color: "#667085" }}>Axiom Wallet</div>
            </div>

            <div
              onClick={() => setPaymentMethod("bank")}
              className={`rounded-3 cursor-pointer ${paymentMethod === "bank" ? "border-2 border-warning" : "border"}`}
              style={{
                padding: "24px",
                width: "240px",
                cursor: "pointer",
                backgroundColor: paymentMethod === "bank" ? "#FFFDF5" : "#FFFFFF",
                borderColor: paymentMethod === "bank" ? "#FFD600" : "#D0D5DD",
              }}
            >
              <div style={{ fontSize: "16px", color: "#101828" }}>Bank Card</div>
            </div>

            <div
              onClick={() => setPaymentMethod("stripe")}
              className={`rounded-3 cursor-pointer ${paymentMethod === "stripe" ? "border-2 border-warning" : "border"}`}
              style={{
                padding: "24px",
                width: "240px",
                cursor: "pointer",
                backgroundColor: paymentMethod === "stripe" ? "#FFFDF5" : "#FFFFFF",
                borderColor: paymentMethod === "stripe" ? "#FFD600" : "#D0D5DD",
              }}
            >
              <Image src="/stripe.png" alt="Stripe" width={70} height={32} />
            </div>
          </div>

          {paymentMethod === "bank" && (
            <Row>
              <Col md={6} className="mb-3">
                <label style={{ fontSize: "14px", color: "#344054", fontWeight: 500, marginBottom: "6px" }}>
                  Card Number
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="XXXX XXXX XXXX XXXX"
                  style={{ height: "44px", fontSize: "16px" }}
                />
              </Col>
              <Col md={3} className="mb-3">
                <label style={{ fontSize: "14px", color: "#344054", fontWeight: 500, marginBottom: "6px" }}>
                  MM/YY
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="MM/YY"
                  style={{ height: "44px", fontSize: "16px" }}
                />
              </Col>
              <Col md={3} className="mb-3">
                <label style={{ fontSize: "14px", color: "#344054", fontWeight: 500, marginBottom: "6px" }}>
                  CVV
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="XXX"
                  style={{ height: "44px", fontSize: "16px" }}
                />
              </Col>
            </Row>
          )}

          <div className="d-flex justify-content-between mt-4">
            <Button color="link" className="text-decoration-none" style={{ color: "#667085" }}>
              Back
            </Button>
            <Button
              color="warning"
              style={{
                backgroundColor: "#FFD600",
                border: "none",
                height: "44px",
                width: "120px",
                fontSize: "16px",
                fontWeight: 500
              }}
            >
              Pay Now
            </Button>
          </div>
        </div>
      </Container>
    </UserDashboardLayout>
  );
}
