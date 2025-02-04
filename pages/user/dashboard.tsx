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
import UserDashboardLayout from "../../components/layouts/UserDashboardLayout";
import Image from "next/image";
import { useSession } from "next-auth/react";

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
    { rank: "1st", name: "Mert Kahveci", score: "8456", avatar: "/user1.png" },
    { rank: "2nd", name: "MirayK", score: "8233", avatar: "/user1.png" },
    { rank: "3rd", name: "Omar O.", score: "8105", avatar: "/user1.png" },
    {
      rank: "4",
      name: "Jennings Stohler",
      time: "912 Points",
      avatar: "/user1.png",
    },
    {
      rank: "5",
      name: "Scotty Tovias",
      time: "845 Points",
      avatar: "/user1.png",
    },
    {
      rank: "6",
      name: "Ameline Aquila",
      time: "789 Points",
      avatar: "/user1.png",
    },
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

        <Row style={{ paddingTop: "128px" }}>
          <Col md={8}>
            <Card className="border-0 mb-4">
              <CardBody className="p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <CardTitle tag="h5" className="mb-0" style={{ fontSize: "18px", fontWeight: 600 }}>
                    Leaderboard
                  </CardTitle>
                  <Button color="link" className="text-muted p-0" style={{ fontSize: "14px", textDecoration: "none" }}>
                    More
                  </Button>
                </div>
                <div
                  className="position-relative"
                  style={{
                    background: "#FFD600",
                    borderRadius: "24px",
                    padding: "24px",
                  }}
                >
                  <div className="d-flex justify-content-between align-items-end mb-5 px-4">
                    {leaderboardData.slice(0, 3).map((player, index) => (
                      <div key={index} className="text-center" style={{ position: "relative", top: index === 1 ? "-20px" : "0" }}>
                        <div style={{ position: "relative" }}>
                          <Image
                            src={player.avatar}
                            alt={player.name}
                            width={48}
                            height={48}
                            className="rounded-circle mb-2"
                          />
                          <div 
                            style={{
                              position: "absolute",
                              top: "-24px",
                              left: "50%",
                              transform: "translateX(-50%)",
                              background: index === 1 ? "#FFD600" : "transparent",
                              borderRadius: "50%",
                              width: "24px",
                              height: "24px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "14px",
                              fontWeight: "600"
                            }}
                          >
                            {index === 1 && "1"}
                          </div>
                        </div>
                        <div style={{ fontSize: "14px", fontWeight: "500", marginBottom: "4px" }}>{player.name}</div>
                        <div style={{ fontSize: "14px", color: "#1C1C1C", marginBottom: "4px" }}>{player.score} Points</div>
                        <div style={{ fontSize: "14px", fontWeight: "600" }}>{player.rank}</div>
                      </div>
                    ))}
                  </div>
                  {leaderboardData.slice(3).map((player, index) => (
                    <div
                      key={index}
                      className="d-flex align-items-center mb-2 bg-white rounded-3 p-3"
                      style={{ boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)" }}
                    >
                      <div className="me-3" style={{ fontSize: "14px", fontWeight: "500", width: "20px" }}>{player.rank}</div>
                      <Image
                        src={player.avatar}
                        alt={player.name}
                        width={32}
                        height={32}
                        className="rounded-circle me-3"
                      />
                      <div className="flex-grow-1">
                        <div style={{ fontSize: "14px", fontWeight: "500" }}>{player.name}</div>
                        <div style={{ fontSize: "12px", color: "#6C757D" }}>{player.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="border-0 mb-4">
              <CardBody className="p-4">
                <CardTitle tag="h5" className="mb-4" style={{ fontSize: "18px", fontWeight: 600 }}>
                  Last Game Stats
                </CardTitle>
                {gameStats.map((game, index) => (
                  <div key={index} className="mb-4">
                    <div className="d-flex justify-content-between mb-2" style={{ fontSize: "14px" }}>
                      <span style={{ fontWeight: "500" }}>{game.name}</span>
                      <span>{game.lastScore}</span>
                    </div>
                    <Progress
                      value={game.score}
                      className="mb-2"
                      style={{ 
                        height: "8px", 
                        backgroundColor: "#F2F4F7",
                        borderRadius: "100px",
                      }}
                      color="warning"
                    />
                  </div>
                ))}
                <div className="text-center mt-4 p-3" style={{ background: "#FFD600", borderRadius: "16px" }}>
                  <h2 className="mb-1" style={{ fontSize: "24px", fontWeight: "600" }}>98%</h2>
                  <div style={{ fontSize: "14px", color: "#1C1C1C" }}>Winning Streak</div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </UserDashboardLayout>
  );
}
