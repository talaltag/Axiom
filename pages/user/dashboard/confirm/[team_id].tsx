import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import UserDashboardLayout from "../../../../components/layouts/UserDashboardLayout";
import { Container, Button } from "reactstrap";

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
      <div style={{ backgroundColor: '#F9FAFB', minHeight: '100vh' }}>
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
            <div className="bg-white rounded-3 p-4 mb-4" style={{ boxShadow: '0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)' }}>
              <div className="d-flex gap-3">
                <div style={{ position: 'relative', width: '64px', height: '64px' }}>
                  <Image
                    src="/fortnite-banner.png"
                    alt="Tournament"
                    fill
                    style={{ objectFit: "cover", borderRadius: '8px' }}
                  />
                </div>
                <div className="d-flex flex-column justify-content-center">
                  <h4 style={{ fontSize: "16px", fontWeight: 500, color: "#101828", marginBottom: "4px" }}>
                    {tournamentDetails.name}
                  </h4>
                  <p style={{ fontSize: "14px", color: "#667085", margin: 0 }}>
                    {tournamentDetails.date} • {tournamentDetails.time}
                  </p>
                </div>
                <div style={{ marginLeft: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: "14px", color: "#667085" }}>Entry Cost</div>
                    <div style={{ fontSize: "24px", fontWeight: 600, color: "#DC3545" }}>
                      {tournamentDetails.entryCost}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3 p-4" style={{ boxShadow: '0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)', backgroundColor: '#fff' }}>
              <h5 style={{ fontSize: "16px", color: "#101828", marginBottom: "24px", fontWeight: 500 }}>
                Payment Method
              </h5>

              <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                <div
                  onClick={() => setPaymentMethod("wallet")}
                  style={{
                    padding: "10px 16px",
                    cursor: "pointer",
                    backgroundColor: "#fff",
                    border: "1px solid #EAECF0",
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    minWidth: '164px',
                    height: '44px',
                    boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',
                  }}
                >
                  <div style={{ fontSize: "14px", color: "#000000", fontWeight: 500 }}>$1,000.00</div>
                  <div style={{ fontSize: "14px", color: "#667085", marginLeft: '8px' }}>Axiom Wallet</div>
                </div>

                <div
                  onClick={() => setPaymentMethod("bank")}
                  style={{
                    padding: "10px 16px",
                    cursor: "pointer",
                    backgroundColor: "#fff",
                    border: "1px solid #EAECF0",
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: '164px',
                    height: '44px',
                    boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',
                  }}
                >
                  <div style={{ fontSize: "14px", color: "#344054", fontWeight: 500 }}>Bank Card</div>
                </div>

                <div
                  onClick={() => setPaymentMethod("stripe")}
                  style={{
                    padding: "10px 16px",
                    cursor: "pointer",
                    backgroundColor: "#fff",
                    border: "1px solid #EAECF0",
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: '164px',
                    height: '44px',
                    boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',
                  }}
                >
                  <span style={{ fontSize: "14px", color: "#344054", fontWeight: 500 }}>Stripe</span>
                </div>
              </div>

              <div style={{ fontSize: "14px", color: "#344054", marginBottom: "16px" }}>Card Information</div>
              {paymentMethod === "bank" && (
                <div style={{ display: 'grid', gap: '16px' }}>
                  <div>
                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '16px' }}>
                      <div>
                        <label style={{ fontSize: "14px", color: "#344054", fontWeight: 500, marginBottom: "6px", display: 'block' }}>
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
                            boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',
                          }}
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
                          style={{ 
                            height: "44px", 
                            fontSize: "16px",
                            border: "1px solid #D0D5DD",
                            borderRadius: "8px",
                            padding: "10px 14px",
                            boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',
                          }}
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
                          style={{ 
                            height: "44px", 
                            fontSize: "16px",
                            border: "1px solid #D0D5DD",
                            borderRadius: "8px",
                            padding: "10px 14px",
                            boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h6 style={{ fontSize: "14px", fontWeight: 500, color: "#344054", marginBottom: "16px" }}>
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
                        boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',
                      }}
                    />
                  </div>
                </div>
              )}

              <div className="d-flex justify-content-end mt-4" style={{ gap: '12px' }}>
                <Button 
                  color="light"
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
                >
                  Back
                </Button>
                <Button
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
                >
                  Pay Now
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3 p-4" style={{ boxShadow: '0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)', backgroundColor: '#fff' }}>
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
              <div style={{ fontSize: "14px", color: "#667085" }}>Team Size</div>
              <div style={{ fontSize: "14px", color: "#101828", fontWeight: 500 }}>{tournamentDetails.teamSize}</div>
            </div>
            <div className="mb-4">
              <div style={{ fontSize: "14px", color: "#667085" }}>Country</div>
              <div style={{ fontSize: "14px", color: "#101828", fontWeight: 500 }}>{tournamentDetails.country}</div>
            </div>
            <div className="mb-4">
              <div style={{ fontSize: "14px", color: "#667085" }}>Game</div>
              <div style={{ fontSize: "14px", color: "#101828", fontWeight: 500 }}>{tournamentDetails.game}</div>
            </div>
            <div className="mb-4">
              <div style={{ fontSize: "14px", color: "#667085" }}>Game Mode</div>
              <div style={{ fontSize: "14px", color: "#101828", fontWeight: 500 }}>{tournamentDetails.gameMode}</div>
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
      </div>
    </UserDashboardLayout>
  );
}