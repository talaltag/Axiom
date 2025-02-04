import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Button,
  Progress,
} from "reactstrap";
import { useRouter } from "next/router";

import Image from "next/image";
import { useSession } from "next-auth/react";
import UserDashboardLayout from "../../components/layouts/UserDashboardLayout";

interface Tournament {
  _id: string;
  name: string;
  date: string;
  time: string;
  prize: string;
  entryCost: string;
  image: string;
  totalPrizePool: string;
  entryFee: string;
}

export default function UserDashboard() {
  const router = useRouter();
  const session = useSession();
  const [tournaments, setTournaments] = useState<Tournament[]>([]);

  const gameStats = [
    { name: "Fortnite", lastScore: "102234", score: 75 },
    { name: "Pubg", lastScore: "102234", score: 85 },
    { name: "Apex", lastScore: "102234", score: 90 },
  ];

  const leaderboardData = [
    { rank: "4", name: "Jennings Stohler", time: "912 Points", avatar: "/user1.png" },
    { rank: "5", name: "Scotty Tovias", time: "846 Points", avatar: "/user1.png" },
    { rank: "6", name: "Amelina Aguila", time: "771 Points", avatar: "/user1.png" },
  ];

  return (
    <UserDashboardLayout>
      <Container fluid className="p-4">
        <div className="position-relative mb-5" style={{ height: "400px" }}>
          <Image
            src="/fortnite-banner.png"
            alt="Warzone"
            fill
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
          <div
            className="position-absolute text-white"
            style={{
              top: "32px",
              left: "32px",
              right: "32px",
            }}
          >
            <div className="d-flex justify-content-between align-items-start mb-2">
              <div>
                <h2
                  className="mb-0"
                  style={{ fontSize: "24px", fontWeight: 600 }}
                >
                  Warzone
                </h2>
                <div style={{ fontSize: "14px" }}>
                  May 23, 2023 9:00PM - 10:30PM EST
                </div>
              </div>
            </div>
            <h3
              style={{
                fontSize: "40px",
                fontWeight: 700,
                marginBottom: "24px",
              }}
            >
              2022 world champs gaming
            </h3>
            <Button
              color="warning"
              className="px-4"
              style={{
                backgroundColor: "#FFD600",
                border: "none",
                padding: "8px 16px",
                fontWeight: 600,
              }}
            >
              Register Now
            </Button>
          </div>

          <div
            className="position-absolute"
            style={{ bottom: "-151px", left: "32px", right: "32px" }}
          >
            <Row className="g-4">
              {[
                {
                  name: "Fortnite Summer Battle",
                  date: "May 23, 2023",
                  time: "9:00PM - 10:30PM EST",
                  prize: "$500",
                  entryCost: "$200",
                  image: "/fortnite-banner.png",
                },
                {
                  name: "PUBG tournament by Red Bull",
                  date: "May 23, 2023",
                  time: "9:00PM - 10:30PM EST",
                  prize: "$500",
                  entryCost: "$200",
                  image: "/fortnite-banner.png",
                },
                {
                  name: "Apex Legends tournament",
                  date: "May 23, 2023",
                  time: "9:00PM - 10:30PM EST",
                  prize: "$500",
                  entryCost: "$200",
                  image: "/fortnite-banner.png",
                },
                {
                  name: "Rocket League Finals",
                  date: "May 23, 2023",
                  time: "9:00PM - 10:30PM EST",
                  prize: "$500",
                  entryCost: "$200",
                  image: "/fortnite-banner.png",
                },
              ].map((tournament, index) => (
                <Col md={3} key={index}>
                  <Card
                    className="border-0 h-100 tournament-card bg-white"
                    style={{ borderRadius: "12px", overflow: "hidden" }}
                  >
                    <div style={{ height: "160px", position: "relative" }}>
                      <Image
                        src={tournament.image}
                        alt={tournament.name}
                        fill
                        sizes="100vw"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <CardBody className="p-3">
                      <h5
                        className="mb-2"
                        style={{ fontSize: "16px", fontWeight: 600 }}
                      >
                        {tournament.name}
                      </h5>
                      <div
                        style={{ fontSize: "12px" }}
                        className="text-muted mb-2"
                      >
                        {tournament.date} {tournament.time}
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <div
                            className="text-muted mb-1"
                            style={{ fontSize: "12px" }}
                          >
                            Prize
                          </div>
                          <div
                            style={{
                              fontSize: "16px",
                              fontWeight: 600,
                              color: "#DC3545",
                            }}
                          >
                            {tournament.prize}
                          </div>
                        </div>
                        <div className="text-end">
                          <div
                            className="text-muted mb-1"
                            style={{ fontSize: "12px" }}
                          >
                            Entry Cost
                          </div>
                          <div
                            style={{
                              fontSize: "16px",
                              fontWeight: 600,
                              color: "#DC3545",
                            }}
                          >
                            {tournament.entryCost}
                          </div>
                        </div>
                      </div>
                      <Button
                        color="link"
                        className="w-100 text-decoration-none d-flex align-items-center justify-content-center gap-2 mt-3"
                        style={{
                          color: "#FFD600",
                          fontSize: "14px",
                          fontWeight: 600,
                          padding: "4px",
                        }}
                      >
                        Register Now <span>→</span>
                      </Button>
                    </CardBody>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </div>

        <Row className="pt-5" style={{ paddingTop: "128px" }}>
          <Col md={8}>
            <Card className="border-0 mb-4 shadow-sm" style={{ borderRadius: "16px", background: "rgba(248, 202, 21, 1)" }}>
              <CardBody>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <CardTitle tag="h5" className="mb-0 fw-bold">Leaderboard</CardTitle>
                  <span className="text-muted" style={{ cursor: "pointer", fontSize: "14px" }}>More</span>
                </div>
                <div className="text-center mb-4 position-relative">
                  <div className="d-flex justify-content-around align-items-end mb-4">
                    <div className="text-center order-1" style={{ marginBottom: "20px" }}>
                      <div className="position-relative">
                        <Image src="/user1.png" alt="2nd" width={48} height={48} className="rounded-circle mb-2" style={{ border: "2px solid #FFD600" }} />
                        <div className="position-absolute" style={{ bottom: "-10px", left: "50%", transform: "translateX(-50%)", background: "#FFD600", padding: "2px 8px", borderRadius: "12px", fontSize: "12px" }}>2nd</div>
                      </div>
                      <div className="mt-3 fw-bold">Mirayk</div>
                    </div>
                    <div className="text-center order-0">
                      <div className="position-relative">
                        <Image src="/user1.png" alt="1st" width={64} height={64} className="rounded-circle mb-2" style={{ border: "3px solid #FFD600" }} />
                        <span className="position-absolute top-0 start-100 translate-middle">👑</span>
                      </div>
                      <div className="mt-3 fw-bold">Matt Safaied</div>
                    </div>
                    <div className="text-center order-2" style={{ marginBottom: "20px" }}>
                      <div className="position-relative">
                        <Image src="/user1.png" alt="3rd" width={48} height={48} className="rounded-circle mb-2" style={{ border: "2px solid #FFD600" }} />
                        <div className="position-absolute" style={{ bottom: "-10px", left: "50%", transform: "translateX(-50%)", background: "#FFD600", padding: "2px 8px", borderRadius: "12px", fontSize: "12px" }}>3rd</div>
                      </div>
                      <div className="mt-3 fw-bold">Omar O.</div>
                    </div>
                  </div>
                </div>
                {leaderboardData.map((player, index) => (
                  <div key={index} className="d-flex align-items-center mb-3 p-3" style={{ backgroundColor: "rgba(255, 214, 0, 0.05)", borderRadius: "12px", transition: "all 0.3s ease" }}>
                    <div className="me-3 fw-bold" style={{ color: "#FFD600", width: "24px" }}>{player.rank}</div>
                    <Image src={player.avatar} alt={player.name} width={32} height={32} className="rounded-circle me-3" style={{ border: "2px solid #FFD600" }} />
                    <div className="flex-grow-1">
                      <div className="fw-bold" style={{ fontSize: "14px" }}>{player.name}</div>
                      <div style={{ fontSize: "12px", color: "#6C757D" }}>{player.time}</div>
                    </div>
                  </div>
                ))}
              </CardBody>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="border-0 mb-4 shadow-sm" style={{ borderRadius: "16px", background: "linear-gradient(to bottom, #fff, #fafafa)" }}>
              <CardBody>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <CardTitle tag="h5" className="mb-0 fw-bold">Last Game Stats</CardTitle>
                </div>
                {gameStats.map((stat, index) => (
                  <div key={index} className="mb-4">
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-dark">{stat.name}</span>
                      <span className="text-dark">{stat.lastScore}</span>
                    </div>
                    <Progress 
                      value={stat.score} 
                      style={{
                        height: "8px",
                        borderRadius: "4px",
                        backgroundColor: "rgba(255, 214, 0, 0.1)",
                      }}
                      color="warning"
                    />
                  </div>
                ))}
                <div className="mt-4 p-4 text-center" style={{ 
                  background: "linear-gradient(45deg, #FFD600, #FFC107)",
                  borderRadius: "16px",
                  boxShadow: "0 4px 12px rgba(255, 214, 0, 0.2)"
                }}>
                  <div className="fw-bold mb-1" style={{ fontSize: "24px", color: "#fff" }}>98%</div>
                  <div style={{ color: "rgba(255, 255, 255, 0.9)" }}>Winning streak</div>
                </div>
              </CardBody>
            </Card>
          </Col>

        </Row>
      </Container>
    </UserDashboardLayout>
  );
}