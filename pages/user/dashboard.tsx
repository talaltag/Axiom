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
              onClick={() => router.push('/user/dashboard/register-tournament/1')}
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
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0" style={{ fontSize: "16px", fontWeight: 600 }}>Leaderboard</h5>
              <span style={{ cursor: "pointer", fontSize: "14px", color: "#101828" }}>More</span>
            </div>
            <Card
              className="border-0 mb-4"
              style={{
                borderRadius: "16px",
                background: "#FFD600",
                boxShadow: "0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)",
                height: "500px"
              }}
            >
              <CardBody style={{ maxHeight: "100%", overflowY: "auto" }}>
                <div className="text-center mb-4">
                  <div className="d-flex justify-content-between align-items-end mb-4 px-5">
                    <div className="text-center" style={{ marginTop: "40px" }}>
                      <div className="position-relative d-inline-block">
                        <Image
                          src="/user1.png"
                          alt="2nd"
                          width={56}
                          height={56}
                          className="rounded-circle"
                          style={{ border: "3px solid white" }}
                        />
                        <div
                          className="position-absolute"
                          style={{
                            bottom: "-8px",
                            left: "50%",
                            transform: "translateX(-50%)",
                            background: "white",
                            padding: "2px 8px",
                            borderRadius: "12px",
                            fontSize: "12px",
                            fontWeight: 600,
                            boxShadow: "0px 2px 4px rgba(0,0,0,0.1)"
                          }}
                        >
                          2
                        </div>
                      </div>
                      <div className="mt-2">
                        <div style={{ fontSize: "14px", fontWeight: 600, color: "#101828" }}>
                          MirayK
                        </div>
                        <div style={{ fontSize: "12px", color: "#101828", opacity: 0.8 }}>
                          1223
                        </div>
                      </div>
                    </div>
                    <div className="text-center" style={{ marginTop: "-20px" }}>
                      <div className="position-relative d-inline-block">
                        <Image
                          src="/user1.png"
                          alt="1st"
                          width={80}
                          height={80}
                          className="rounded-circle"
                          style={{ border: "4px solid white" }}
                        />
                        <span
                          className="position-absolute"
                          style={{
                            top: "-20px",
                            right: "-12px",
                            fontSize: "28px",
                          }}
                        >
                          👑
                        </span>
                        <div
                          className="position-absolute"
                          style={{
                            bottom: "-8px",
                            left: "50%",
                            transform: "translateX(-50%)",
                            background: "white",
                            padding: "2px 8px",
                            borderRadius: "12px",
                            fontSize: "12px",
                            fontWeight: 600,
                            boxShadow: "0px 2px 4px rgba(0,0,0,0.1)"
                          }}
                        >
                          1
                        </div>
                      </div>
                      <div className="mt-2">
                        <div style={{ fontSize: "16px", fontWeight: 600, color: "#101828" }}>
                          Mert Kahveci
                        </div>
                        <div style={{ fontSize: "14px", color: "#101828", opacity: 0.8 }}>
                          1452
                        </div>
                      </div>
                    </div>
                    <div
                      className="text-center order-2"
                      style={{ marginTop: "80px" }}
                    >
                      <div className="position-relative">
                        <Image
                          src="/user1.png"
                          alt="3rd"
                          width={48}
                          height={48}
                          className="rounded-circle mb-2"
                          style={{ border: "2px solid white" }}
                        />
                        <div
                          className="position-absolute"
                          style={{
                            bottom: "-10px",
                            left: "50%",
                            transform: "translateX(-50%)",
                            background: "white",
                            padding: "4px 12px",
                            borderRadius: "16px",
                            fontSize: "12px",
                            fontWeight: 500,
                          }}
                        >
                          3rd
                        </div>
                      </div>
                      <div
                        className="mt-3"
                        style={{ fontSize: "14px", fontWeight: 500 }}
                      >
                        Onur O.
                      </div>
                      <div style={{ fontSize: "12px", color: "#101828" }}>
                        968
                      </div>
                    </div>
                  </div>
                </div>
                {leaderboardData.map((player, index) => (
                  <div
                    key={index}
                    className="d-flex align-items-center mb-2 p-3"
                    style={{
                      backgroundColor: "white",
                      borderRadius: "8px",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <div
                      className="me-3"
                      style={{
                        color: "#101828",
                        width: "20px",
                        fontSize: "14px",
                        fontWeight: 600,
                      }}
                    >
                      {player.rank}
                    </div>
                    <Image
                      src={player.avatar}
                      alt={player.name}
                      width={36}
                      height={36}
                      className="rounded-circle me-3"
                      style={{ border: "2px solid #FFD600" }}
                    />
                    <div className="flex-grow-1">
                      <div
                        style={{
                          fontSize: "14px",
                          fontWeight: 600,
                          color: "#101828",
                        }}
                      >
                        {player.name}
                      </div>
                      <div style={{ fontSize: "12px", color: "#666", fontWeight: 500 }}>
                        {player.time}
                      </div>
                    </div>
                  </div>
                ))}
              </CardBody>
            </Card>
          </Col>
          <Col md={4}>
            <h5 className="mb-4 fw-bold" style={{ fontSize: "16px" }}>Last Game Stats</h5>
            <Card
              className="border-0 mb-4"
              style={{
                borderRadius: "16px",
                background: "#FFFFFF",
                boxShadow: "0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)"
              }}
            >
              <CardBody className="p-4">
                {gameStats.map((stat, index) => (
                  <div key={index} className="mb-4">
                    <div className="d-flex flex-column mb-1">
                      <span style={{ fontSize: "14px", color: "#344054", marginBottom: "4px" }}>
                        {stat.name}
                      </span>
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <small className="text-muted" style={{ fontSize: "12px" }}>
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
                        backgroundImage: "linear-gradient(90deg, #FFD600 75%, #F2F4F7 75%)"
                      }}
                    />
                  </div>
                ))}
                <div className="mt-4 p-3 text-center" style={{ background: "#FFD600", borderRadius: "8px" }}>
                  <div className="fw-bold mb-1" style={{ fontSize: "24px", color: "#101828" }}>
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