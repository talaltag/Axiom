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
  endTime: string;
  entryFee: string;
  platform: string;
  teamSize: string;
  prize: string;
  type: string;
  game: string;
  images: String[];
  gameMode: string;
}

export default function UserDashboard() {
  const router = useRouter();
  const session = useSession();
  const [tournaments, setTournaments] = useState<Tournament[]>([]);

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const url = "/api/tournaments";
        const response = await fetch(url);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch tournaments");
        }
        const data = await response.json();
        if (data.success) {
          setTournaments(data.data);
        } else {
          throw new Error(data.message || "An unexpected error occurred");
        }
      } catch (error) {
        console.error("Error fetching tournaments:", error);
      }
    };

    fetchTournaments();
  }, []);

  const gameStats = [
    { name: "Fortnite", lastScore: "102234", score: 75 },
    { name: "Pubg", lastScore: "102234", score: 85 },
    { name: "Apex", lastScore: "102234", score: 90 },
  ];

  const leaderboardData = [
    {
      rank: "4",
      name: "Jennings Stohler",
      time: "912 Points",
      avatar: "/user1.png",
    },
    {
      rank: "5",
      name: "Scotty Tovias",
      time: "846 Points",
      avatar: "/user1.png",
    },
    {
      rank: "6",
      name: "Amelina Aguila",
      time: "771 Points",
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
              onClick={() => router.push("/user/dashboard/tournaments")}
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
          {tournaments && tournaments.length > 0 && (
            <div
              className="position-absolute"
              style={{ bottom: "-151px", left: "32px", right: "32px" }}
            >
              <Row className="g-4">
                {tournaments.slice(0, 3).map((tournament, index) => (
                  <Col md={3} key={index}>
                    <Card
                      className="border-0 h-100 tournament-card bg-white"
                      style={{ borderRadius: "12px", overflow: "hidden" }}
                    >
                      <div style={{ height: "160px", position: "relative" }}>
                        <Image
                          src={
                            tournament?.images?.[0] || "/fortnite-banner.png"
                          }
                          alt={tournament?.name || "Tournament"}
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
                              ${tournament.entryFee}
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
                          onClick={() =>
                            router.push(
                              `/user/dashboard/register-tournament/${tournament._id}`
                            )
                          }
                        >
                          Register Now <span>→</span>
                        </Button>
                      </CardBody>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          )}
        </div>

        <Row style={{ paddingTop: "128px" }}>
          <Col md={8}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5
                className="mb-0"
                style={{ fontSize: "16px", fontWeight: 600 }}
              >
                Leaderboard
              </h5>
              <span
                style={{
                  cursor: "pointer",
                  fontSize: "14px",
                  color: "#101828",
                }}
              >
                More
              </span>
            </div>
            <Card
              className="border-0 mb-4 leaderboard-card"
              style={{
                borderRadius: "16px",
                background: "#FFD600",
                boxShadow: "0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)",
                height: "500px",
                padding: "24px",
                overflow: "hidden"
              }}
            >
              <CardBody className="p-0" style={{ background: "#FFD600" }}>
                <div className="position-relative podium-container mb-4" style={{ height: "220px" }}>
                  {/* Second Place */}
                  <div className="position-absolute" style={{ left: "15%", bottom: "20px" }}>
                    <div className="d-flex flex-column align-items-center">
                      <div className="position-relative mb-2">
                        <div style={{ width: "64px", height: "64px", position: "relative" }}>
                          <Image
                            src="/user1.png"
                            alt="2nd Place"
                            layout="fill"
                            className="rounded-circle"
                            style={{ border: "3px solid white" }}
                          />
                        </div>
                        <div
                          className="position-absolute start-50 translate-middle-x"
                          style={{
                            bottom: "-12px",
                            background: "white",
                            padding: "8px 16px",
                            borderRadius: "16px",
                            fontSize: "14px",
                            fontWeight: 600,
                            boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                            whiteSpace: "nowrap",
                            border: "1px solid #FFD600"
                          }}
                        >
                          2nd • 1223 pts
                        </div>
                      </div>
                      <div className="text-center mt-3">
                        <div style={{ fontSize: "14px", fontWeight: 600, color: "#101828" }}>MirayK</div>
                      </div>
                    </div>
                  </div>

                  {/* First Place */}
                  <div className="position-absolute" style={{ left: "50%", transform: "translateX(-50%)", bottom: "40px" }}>
                    <div className="d-flex flex-column align-items-center">
                      <div className="position-relative mb-2">
                        <div style={{ width: "88px", height: "88px", position: "relative" }}>
                          <Image
                            src="/user1.png"
                            alt="1st Place"
                            layout="fill"
                            className="rounded-circle"
                            style={{ border: "4px solid white" }}
                          />
                          <span
                            className="position-absolute"
                            style={{
                              top: "-24px",
                              right: "-12px",
                              fontSize: "32px",
                            }}
                          >
                            👑
                          </span>
                        </div>
                        <div
                          className="position-absolute start-50 translate-middle-x"
                          style={{
                            display: "flex",
                            width: "62.142px",
                            height: "86.998px",
                            padding: "12.428px 22.526px",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "6.214px",
                            background: "white",
                            borderRadius: "16px",
                            fontSize: "14px",
                            fontWeight: 600,
                            boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                            whiteSpace: "nowrap",
                            border: "1px solid #FFD600"
                          }}
                        >
                          <span>1st</span>
                          <span>🔥1452</span>
                        </div>
                      </div>
                      <div className="text-center mt-3">
                        <div style={{ fontSize: "16px", fontWeight: 600, color: "#101828" }}>Mert Kahveci</div>
                      </div>
                    </div>
                  </div>

                  {/* Third Place */}
                  <div className="position-absolute" style={{ right: "15%", bottom: "10px" }}>
                    <div className="d-flex flex-column align-items-center">
                      <div className="position-relative mb-2">
                        <div style={{ width: "56px", height: "56px", position: "relative" }}>
                          <Image
                            src="/user1.png"
                            alt="3rd Place"
                            layout="fill"
                            className="rounded-circle"
                            style={{ border: "3px solid white" }}
                          />
                        </div>
                        <div
                          className="position-absolute start-50 translate-middle-x"
                          style={{
                            bottom: "-12px",
                            background: "white",
                            padding: "8px 16px",
                            borderRadius: "16px",
                            fontSize: "14px",
                            fontWeight: 600,
                            boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                            whiteSpace: "nowrap",
                            border: "1px solid #FFD600"
                          }}
                        >
                          3rd • 968 pts
                        </div>
                      </div>
                      <div className="text-center mt-3">
                        <div style={{ fontSize: "14px", fontWeight: 600, color: "#101828" }}>Onur O.</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="leaderboard-list px-3" style={{ maxHeight: "220px", overflowY: "auto" }}>
                  {leaderboardData.map((player, index) => (
                    <div
                      key={index}
                      className="d-flex align-items-center mb-2 p-3"
                      style={{
                        backgroundColor: "white",
                        borderRadius: "12px",
                        transition: "all 0.2s ease",
                        boxShadow: "0px 1px 3px rgba(16, 24, 40, 0.1)",
                      }}
                    >
                      <div
                        className="me-3"
                        style={{
                          color: "#101828",
                          width: "24px",
                          fontSize: "14px",
                          fontWeight: 600,
                        }}
                      >
                        {player.rank}
                      </div>
                      <div style={{ width: "40px", height: "40px", position: "relative" }} className="me-3">
                        <Image
                          src={player.avatar}
                          alt={player.name}
                          layout="fill"
                          className="rounded-circle"
                          style={{ border: "2px solid #FFD600" }}
                        />
                      </div>
                      <div className="flex-grow-1 d-flex justify-content-between align-items-center">
                        <div>
                          <div style={{ fontSize: "14px", fontWeight: 600, color: "#101828" }}>
                            {player.name}
                          </div>
                          <div style={{ fontSize: "12px", color: "#666", fontWeight: 500 }}>
                            {player.time}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col md={4}>
            <h5 className="mb-4 fw-bold" style={{ fontSize: "16px" }}>
              Last Game Stats
            </h5>
            <Card
              className="border-0 mb-4"
              style={{
                borderRadius: "16px",
                background: "#FFFFFF",
                boxShadow:
                  "0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)",
              }}
            >
              <CardBody className="p-4">
                {gameStats.map((stat, index) => (
                  <div key={index} className="mb-4">
                    <div className="d-flex flex-column mb-1">
                      <span
                        style={{
                          fontSize: "14px",
                          color: "#344054",
                          marginBottom: "4px",
                        }}
                      >
                        {stat.name}
                      </span>
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <small
                          className="text-muted"
                          style={{ fontSize: "12px" }}
                        >
                          Last Score
                        </small>
                        <span style={{ fontSize: "12px", color: "#344054" }}>
                          {stat.lastScore}
                        </span>
                      </div>
                    </div>
                    <Progress
                      value={stat.score}
                      style={{
                        height: "8px",
                        borderRadius: "16px",
                        backgroundColor: "#F2F4F7",
                        backgroundImage:
                          "linear-gradient(90deg, #FFD600 75%, #F2F4F7 75%)",
                      }}
                    />
                  </div>
                ))}
                <div
                  className="mt-4 p-3 text-center"
                  style={{ background: "#FFD600", borderRadius: "8px" }}
                >
                  <div
                    className="fw-bold mb-1"
                    style={{ fontSize: "24px", color: "#101828" }}
                  >
                    98%
                  </div>
                  <div style={{ fontSize: "14px", color: "#101828" }}>
                    Winning streak
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </UserDashboardLayout>
  );
}