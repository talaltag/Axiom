import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import UserDashboardLayout from "../../../../components/layouts/UserDashboardLayout";
import { Container, Row, Col, Button, Input } from "reactstrap";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { StripePaymentForm } from "../../../../components/stripe/StripePaymentForm";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function ConfirmRegistration() {
  const router = useRouter();
  const { team_id } = router.query;
  const [paymentMethod, setPaymentMethod] = useState("wallet");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [walletBalance, setWalletBalance] = useState(1000);
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
        { name: "John Smith", role: "Team Leader", status: "Pending", avatar: "/user1.png" },
        { name: "Sam Winchester", role: "Team Member", status: "Pending", avatar: "/user1.png" },
        { name: "Daniel Craig", role: "Team Member", status: "Pending", avatar: "/user1.png" },
        { name: "Gilbert Blythe", role: "Team Member", status: "Pending", avatar: "/user1.png" },
      ]
    }
  };

  return (
    <UserDashboardLayout>
      <Container fluid className="p-4">
        <div className="d-flex align-items-center mb-4">
          <Link href="/dashboard" className="text-decoration-none text-muted">Dashboard</Link>
          <span className="mx-2">/</span>
          <span>{tournamentDetails.name}</span>
        </div>

        <div className="d-flex gap-4 align-items-start mb-4">
          <Image
            src="/fortnite-banner.png"
            alt="Tournament"
            width={120}
            height={120}
            className="rounded-3"
          />
          <div>
            <h4 className="mb-2">{tournamentDetails.name}</h4>
            <p className="text-muted mb-0">{tournamentDetails.date} · {tournamentDetails.time}</p>
          </div>
        </div>

        <Row>
          <Col md={8}>
            <div className="bg-white rounded-3 p-4 mb-4" style={{ boxShadow: "0px 1px 3px rgba(16, 24, 40, 0.1)" }}>
              <div className="mb-4">
                <div className="d-flex justify-content-between">
                  <div className="mb-3">
                    <h6 className="text-muted mb-2">Entry Fee</h6>
                    <p className="mb-0">{tournamentDetails.entryFee}</p>
                  </div>
                  <div className="mb-3">
                    <h6 className="text-muted mb-2">Platform</h6>
                    <p className="mb-0">{tournamentDetails.platform}</p>
                  </div>
                  <div className="mb-3">
                    <h6 className="text-muted mb-2">Team Size</h6>
                    <p className="mb-0">{tournamentDetails.teamSize}</p>
                  </div>
                </div>

                <div className="d-flex justify-content-between">
                  <div>
                    <h6 className="text-muted mb-2">Tournament Type</h6>
                    <p className="mb-0">{tournamentDetails.tournamentType}</p>
                  </div>
                  <div>
                    <h6 className="text-muted mb-2">Game</h6>
                    <p className="mb-0">{tournamentDetails.game}</p>
                  </div>
                  <div>
                    <h6 className="text-muted mb-2">Game Mode</h6>
                    <p className="mb-0">{tournamentDetails.gameMode}</p>
                  </div>
                </div>
              </div>

              <h5 className="mb-4">Payment Method</h5>
              <div className="d-flex gap-3 mb-4">
                <div 
                  className={`p-4 rounded-3 text-center cursor-pointer ${paymentMethod === 'wallet' ? 'border-warning' : 'border'}`}
                  style={{ minWidth: "150px" }}
                  onClick={() => setPaymentMethod('wallet')}
                >
                  <h5 className="mb-1">${walletBalance}</h5>
                  <div className="text-muted">Axiom Wallet</div>
                </div>
                <div 
                  className={`p-4 rounded-3 text-center cursor-pointer ${paymentMethod === 'bank' ? 'border-warning' : 'border'}`}
                  style={{ minWidth: "150px" }}
                  onClick={() => setPaymentMethod('bank')}
                >
                  <h5 className="mb-1">Bank Card</h5>
                </div>
                <div 
                  className={`p-4 rounded-3 text-center cursor-pointer ${paymentMethod === 'stripe' ? 'border-warning' : 'border'}`}
                  style={{ minWidth: "150px" }}
                  onClick={() => setPaymentMethod('stripe')}
                >
                  <h5 className="mb-1">Stripe</h5>
                </div>
              </div>

              {paymentMethod === 'bank' && (
                <div>
                  <h5 className="mb-4">Card Information</h5>
                  <Row>
                    <Col md={6} className="mb-3">
                      <label className="mb-2">Card Number</label>
                      <Input
                        type="text"
                        placeholder="XXXX XXXX XXXX"
                        value={cardDetails.number}
                        onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
                      />
                    </Col>
                    <Col md={6} className="mb-3">
                      <label className="mb-2">Security Code</label>
                      <Input
                        type="text"
                        placeholder="XXXX XXXX XXXX"
                        value={cardDetails.security}
                        onChange={(e) => setCardDetails({...cardDetails, security: e.target.value})}
                      />
                    </Col>
                  </Row>
                  <div className="mb-3">
                    <label className="mb-2">Name on Card</label>
                    <Input
                      type="text"
                      placeholder="XXXX XXXX XXXX"
                      value={cardDetails.name}
                      onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
                    />
                  </div>
                  <Row>
                    <Col md={6}>
                      <label className="mb-2">Expiration Date</label>
                      <Input
                        type="select"
                        value={cardDetails.expMonth}
                        onChange={(e) => setCardDetails({...cardDetails, expMonth: e.target.value})}
                      >
                        <option value="">Month</option>
                        {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                          <option key={month} value={month}>{month}</option>
                        ))}
                      </Input>
                    </Col>
                    <Col md={6}>
                      <label className="mb-2">&nbsp;</label>
                      <Input
                        type="select"
                        value={cardDetails.expYear}
                        onChange={(e) => setCardDetails({...cardDetails, expYear: e.target.value})}
                      >
                        <option value="">Year</option>
                        {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map((year) => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </Input>
                    </Col>
                  </Row>
                </div>
              )}
            </div>

            <div className="d-flex justify-content-between gap-3">
              <Button
                color="light"
                className="px-4"
                onClick={() => router.back()}
              >
                Back
              </Button>
              <Button
                color="warning"
                className="px-4"
                style={{ backgroundColor: "#FFD600", border: "none" }}
              >
                Pay Now
              </Button>
            </div>
          </Col>

          <Col md={4}>
            <div className="bg-white rounded-3 p-4" style={{ boxShadow: "0px 1px 3px rgba(16, 24, 40, 0.1)" }}>
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="mb-0">My Team</h5>
                  <div className="bg-success bg-opacity-10 text-success px-2 py-1 rounded">New</div>
                </div>
                <div className="d-flex align-items-center gap-3 mb-3">
                  <Image
                    src="/user1.png"
                    alt="Team Logo"
                    width={40}
                    height={40}
                    className="rounded-circle"
                  />
                  <h6 className="mb-0">{tournamentDetails.team.name}</h6>
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
                      <p className="mb-0">{member.name}</p>
                      <small className="text-muted">{member.role}</small>
                    </div>
                    <span className="text-success">{member.status}</span>
                  </div>
                ))}
              </div>

              <div>
                <h5 className="mb-3">Prizes</h5>
                <div className="d-flex justify-content-between mb-2">
                  <span>1st Winner Prize</span>
                  <span>$776</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>2nd Winner Prize</span>
                  <span>$776</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>3rd Winner Prize</span>
                  <span>$776</span>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </UserDashboardLayout>
  );
}