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
import UserDashboardLayout from "@/components/layouts/UserDashboardLayout";
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

        <Row style={{ paddingTop: "128px" }}>
          <Col md={8}>
            <Card className="border-0 mb-4">
              <CardBody className="p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <CardTitle tag="h5" className="mb-0" style={{ fontSize: "16px", fontWeight: 600, color: "#101828" }}>
                    Leaderboard
                  </CardTitle>
                  <Button color="link" className="text-muted p-0" style={{ fontSize: "14px", textDecoration: "none", color: "#667085" }}>
                    More
                  </Button>
                </div>
                <div
                  className="position-relative"
                  style={{
                    background: "#FFD600",
                    borderRadius: "16px",
                    padding: "40px 24px 32px",
                  }}
                >
                  <div 
                    className="position-absolute"
                    style={{
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: "400px",
                      height: "400px",
                      background: "radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)"
                    }}
                  />
                  <div className="d-flex justify-content-between align-items-end position-relative" style={{ marginBottom: "80px" }}>
                    <div className="text-center" style={{ flex: 1, position: "relative", top: "40px" }}>
                      <div className="bg-white rounded-circle p-3 mx-auto d-flex flex-column align-items-center justify-content-center" style={{ width: "120px", height: "120px" }}>
                        <div style={{ fontSize: "20px", fontWeight: 600, color: "#101828" }}>2nd</div>
                        <div style={{ fontSize: "24px", fontWeight: 600, color: "#FFD600" }}>1223</div>
                      </div>
                      <div className="mt-3" style={{ fontSize: "14px", fontWeight: 500 }}>MirayK</div>
                      </div>
                    </div>
                    <div className="text-center" style={{ flex: 1, position: "relative", bottom: "24px" }}>
                      <div style={{ position: "relative", marginBottom: "12px" }}>
                        <div className="position-absolute" style={{ top: "-32px", left: "50%", transform: "translateX(-50%)" }}>
                          <div className="d-flex align-items-center justify-content-center" style={{ width: "32px", height: "32px", background: "white", borderRadius: "50%", boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)" }}>
                            <Image src="/crown-icon.svg" width={20} height={20} alt="Crown" />
                          </div>
                        </div>
                        <Image
                          src="/user1.png"
                          alt="Mert Kahveci"
                          width={72}
                          height={72}
                          className="rounded-circle mx-auto"
                        />
                      </div>
                      <div className="mb-2" style={{ fontSize: "14px", fontWeight: 500 }}>Mert Kahveci</div>
                      <div className="bg-white rounded-circle p-3 mx-auto d-flex flex-column align-items-center justify-content-center" style={{ width: "120px", height: "120px" }}>
                        <div style={{ fontSize: "20px", fontWeight: 600, color: "#101828" }}>1st</div>
                        <div style={{ fontSize: "24px", fontWeight: 600, color: "#FFD600" }}>1452</div>
                      </div>
                    </div>
                    <div className="text-center" style={{ flex: 1, position: "relative", top: "40px" }}>
                      <Image
                        src="/user1.png"
                        alt="Onur O."
                        width={56}
                        height={56}
                        className="rounded-circle mx-auto mb-2"
                      />
                      <div className="mb-2" style={{ fontSize: "14px", fontWeight: 500 }}>Onur O.</div>
                      <div className="bg-white rounded-circle p-3 mx-auto d-flex flex-column align-items-center justify-content-center" style={{ width: "120px", height: "120px" }}>
                        <div style={{ fontSize: "20px", fontWeight: 600, color: "#101828" }}>3rd</div>
                        <div style={{ fontSize: "24px", fontWeight: 600, color: "#FFD600" }}>968</div>
                      </div>
                    </div>
                  </div>
                  {leaderboardData.slice(3).map((player, index) => (
                    <div
                      key={index}
                      className="d-flex align-items-center bg-white rounded-3 p-3 mb-2"
                      style={{ boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)" }}
                    >
                      <div style={{ width: "24px", fontSize: "14px", marginRight: "12px" }}>{player.rank}</div>
                      <div className="d-flex align-items-center flex-grow-1">
                        <div style={{ fontSize: "14px", fontWeight: 500 }}>{player.name}</div>
                        <div className="ms-2" style={{ fontSize: "14px", color: "#667085" }}>{player.time}</div>
                      </div>
                      <Image
                        src={player.avatar}
                        alt={player.name}
                        width={32}
                        height={32}
                        className="rounded-circle"
                      />
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