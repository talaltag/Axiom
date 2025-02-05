
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

  const tournamentDetails = {
    name: "Fortnite Summer Battle",
    date: "May 23, 2023",
    time: "5:00PM - 10:30PM EST",
    entryCost: "$200",
    prize: "$500",
    entryFee: "$25",
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
        { name: "John Smith", status: "Pending" },
        { name: "Sam Winchester", status: "Pending" },
        { name: "Daniel Craig", status: "Pending" },
        { name: "Gilbert Blythe", status: "Pending" }
      ]
    },
    prizes: [
      { place: "1st Winner Prize", amount: "$775" },
      { place: "2nd Winner Prize", amount: "$775" },
      { place: "3rd Winner Prize", amount: "$775" }
    ]
  };

  return (
    <UserDashboardLayout>
      <Container fluid style={{ padding: '24px' }}>
        <div className="d-flex align-items-center mb-4">
          <Link href="/dashboard" style={{ color: "#667085", fontSize: "14px", textDecoration: 'none' }}>
            Dashboard
          </Link>
          <span className="mx-2" style={{ color: "#667085" }}>/</span>
          <span style={{ color: "#101828", fontSize: "14px" }}>Tournament Name</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
          <div>
            <div className="bg-white rounded-3 p-4 mb-4">
              <div className="d-flex gap-4">
                <div style={{ position: 'relative', width: '80px', height: '80px' }}>
                  <Image
                    src="/fortnite-banner.png"
                    alt="Tournament"
                    fill
                    style={{ objectFit: "cover", borderRadius: '8px' }}
                  />
                  <span className="badge bg-success bg-opacity-10 text-success" 
                    style={{ position: 'absolute', top: '-10px', right: '-10px', fontSize: '12px', padding: '4px 8px' }}>
                    New
                  </span>
                </div>
                <div>
                  <h4 style={{ fontSize: "18px", fontWeight: 500, color: "#101828", marginBottom: "4px" }}>
                    {tournamentDetails.name}
                  </h4>
                  <p style={{ fontSize: "14px", color: "#667085", marginBottom: "16px" }}>
                    {tournamentDetails.date} • {tournamentDetails.time}
                  </p>
                  <div className="d-flex gap-4">
                    <div>
                      <div style={{ fontSize: "12px", color: "#667085", marginBottom: "4px" }}>Entry Cost</div>
                      <div style={{ fontSize: "16px", fontWeight: 600, color: "#DC3545" }}>
                        {tournamentDetails.entryCost}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: "12px", color: "#667085", marginBottom: "4px" }}>Prize</div>
                      <div style={{ fontSize: "16px", fontWeight: 600, color: "#DC3545" }}>
                        {tournamentDetails.prize}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3 p-4">
              <h5 style={{ fontSize: "16px", color: "#101828", marginBottom: "24px", fontWeight: 500 }}>
                Payment Method
              </h5>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
                <div
                  onClick={() => setPaymentMethod("wallet")}
                  className={`rounded-3 cursor-pointer ${paymentMethod === "wallet" ? "border-2 border-warning" : "border"}`}
                  style={{
                    padding: "24px",
                    cursor: "pointer",
                    backgroundColor: paymentMethod === "wallet" ? "#FFFDF5" : "#FFFFFF",
                    borderColor: paymentMethod === "wallet" ? "#FFD600" : "#D0D5DD",
                  }}
                >
                  <div style={{ fontSize: "18px", fontWeight: 600, color: "#101828", marginBottom: "4px" }}>
                    $1200
                  </div>
                  <div style={{ fontSize: "14px", color: "#667085" }}>Axiom Wallet</div>
                </div>

                <div
                  onClick={() => setPaymentMethod("bank")}
                  className={`rounded-3 cursor-pointer ${paymentMethod === "bank" ? "border-2 border-warning" : "border"}`}
                  style={{
                    padding: "24px",
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
                    cursor: "pointer",
                    backgroundColor: paymentMethod === "stripe" ? "#FFFDF5" : "#FFFFFF",
                    borderColor: paymentMethod === "stripe" ? "#FFD600" : "#D0D5DD",
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <Image src="/stripe.png" alt="Stripe" width={70} height={32} />
                </div>
              </div>

              {paymentMethod === "bank" && (
                <div style={{ display: 'grid', gap: '16px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ fontSize: "14px", color: "#344054", fontWeight: 500, marginBottom: "6px", display: 'block' }}>
                        Card Number
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="XXXX XXXX XXXX"
                        style={{ height: "44px", fontSize: "16px" }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: "14px", color: "#344054", fontWeight: 500, marginBottom: "6px", display: 'block' }}>
                        MM/YY
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="MM/YY"
                        style={{ height: "44px", fontSize: "16px" }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: "14px", color: "#344054", fontWeight: 500, marginBottom: "6px", display: 'block' }}>
                        CVV
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="XXX"
                        style={{ height: "44px", fontSize: "16px" }}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="d-flex justify-content-between mt-4">
                <Button color="link" className="text-decoration-none px-0" style={{ color: "#667085" }}>
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
          </div>

          <div className="bg-white rounded-3 p-4 h-100">
            <div className="mb-4">
              <div style={{ fontSize: "14px", color: "#667085" }}>Entry Fee</div>
              <div style={{ fontSize: "14px", color: "#101828", fontWeight: 500 }}>{tournamentDetails.entryFee}</div>
            </div>
            <div className="mb-4">
              <div style={{ fontSize: "14px", color: "#667085" }}>Platform</div>
              <div style={{ fontSize: "14px", color: "#101828", fontWeight: 500 }}>{tournamentDetails.platform}</div>
            </div>
            <div className="mb-4">
              <div style={{ fontSize: "14px", color: "#667085" }}>Tournament Type</div>
              <div style={{ fontSize: "14px", color: "#101828", fontWeight: 500 }}>{tournamentDetails.tournamentType}</div>
            </div>
            <div className="mb-4">
              <div style={{ fontSize: "14px", color: "#667085" }}>Tournament Size</div>
              <div style={{ fontSize: "14px", color: "#101828", fontWeight: 500 }}>{tournamentDetails.tournamentSize}</div>
            </div>

            <div className="mb-4">
              <div style={{ fontSize: "14px", color: "#667085" }}>My Team</div>
              <div style={{ fontSize: "14px", color: "#101828", fontWeight: 500, marginTop: "8px" }}>
                <div className="d-flex align-items-center gap-2 mb-2">
                  <Image src="/user1.png" alt="Team" width={32} height={32} className="rounded-circle" />
                  <span>{tournamentDetails.team.name}</span>
                </div>
                {tournamentDetails.team.members.map((member, index) => (
                  <div key={index} className="d-flex justify-content-between align-items-center py-2">
                    <div className="d-flex align-items-center gap-2">
                      <Image src="/user1.png" alt={member.name} width={24} height={24} className="rounded-circle" />
                      <span style={{ fontSize: "14px" }}>{member.name}</span>
                    </div>
                    <span style={{ color: "#12B76A", fontSize: "12px" }}>{member.status}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div style={{ fontSize: "14px", color: "#667085", marginBottom: "8px" }}>Prizes</div>
              {tournamentDetails.prizes.map((prize, index) => (
                <div key={index} className="d-flex justify-content-between mb-2">
                  <span style={{ fontSize: "14px", color: "#101828" }}>{prize.place}</span>
                  <span style={{ fontSize: "14px", color: "#101828", fontWeight: 500 }}>{prize.amount}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </UserDashboardLayout>
  );
}
