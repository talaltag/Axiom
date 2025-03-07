import { useEffect, useMemo, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
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
  end: string;
}

export default function UserDashboard() {
  const router = useRouter();
  const [tournaments, setTournaments] = useState<Tournament[]>([]);

  const [leaderStat, setLeaderStat] = useState(null);

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

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const url = "/api/tournaments/stats";
        const response = await fetch(url);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch tournaments");
        }
        const data = await response.json();
        if (data.success) {
          setLeaderStat(data.data);
        } else {
          throw new Error(data.message || "An unexpected error occurred");
        }
      } catch (error) {
        console.error("Error fetching tournaments:", error);
      }
    };

    fetchStats();
  }, []);

  const gameStats = useMemo(() => {
    if (leaderStat?.afterTournamentScore)
      return [
        {
          name: "Fortnite",
          lastScore: leaderStat.afterTournamentScore.reduce(
            (acc, curr) => acc + parseInt(curr.score),
            0
          ),
          score: 80,
        },
      ];
    else return [{ name: "Fortnite", lastScore: 0, score: 0 }];
  }, [leaderStat]);

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
                          {tournament.date} {tournament.time} - {tournament.end}
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                          <div></div>
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
        {leaderStat && (
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
                  boxShadow:
                    "0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)",
                  height: "420px",
                  padding: "0 24px 24px 24px",
                  overflow: "hidden",
                }}
              >
                <CardBody className="p-0" style={{ background: "#FFD600" }}>
                  <div
                    className="position-relative podium-container mb-4"
                    style={{ height: "240px" }}
                  >
                    <div className="d-flex justify-content-center align-items-center">
                      {leaderStat.afterTournamentScore
                        .slice(0, 3)
                        .sort((a, b) => b.score - a.score)
                        .map((item, i) => (
                          <>
                            {/* Second Place - Left */}

                            {i === 1 && (
                              <div
                                className="podium-player"
                                style={{ marginTop: "40px", order: 1 }}
                              >
                                <div className="podium-avatar-container">
                                  <Image
                                    src={
                                      item.user.profileImage ??
                                      "/profile-avatar.png"
                                    }
                                    alt="2nd Place"
                                    width={64}
                                    height={64}
                                    className="rounded-circle"
                                    style={{ border: "3px solid white" }}
                                  />
                                </div>
                                <div className="podium-name">
                                  {item.user.name}
                                </div>
                                <div
                                  className="podium-info"
                                  style={{
                                    minWidth: "62.142px",
                                    height: "86.998px",
                                    borderRadius: "32px !important",
                                  }}
                                >
                                  2nd
                                  <div
                                    style={{
                                      background: "#FFF3DA",
                                      marginTop: "12px",
                                      fontSize: "12px",
                                      color: "rgba(254, 168, 0, 1)",
                                      borderRadius: "10px",
                                    }}
                                  >
                                    {item.score}
                                  </div>
                                </div>
                              </div>
                            )}
                            {/* First Place - Center */}
                            {i === 0 && (
                              <div
                                className="podium-player"
                                style={{ margin: "0 40px", order: 2 }}
                              >
                                <div className="podium-avatar-container">
                                  <div className="crown-container">👑</div>
                                  <Image
                                    src={
                                      item.user.profileImage ??
                                      "/profile-avatar.png"
                                    }
                                    alt="1st Place"
                                    width={80}
                                    height={80}
                                    className="rounded-circle"
                                    style={{ border: "4px solid white" }}
                                  />
                                </div>
                                <div className="podium-name">
                                  {item.user.name}
                                </div>
                                <div
                                  className="podium-info"
                                  style={{
                                    minWidth: "62.142px",
                                    height: "86.998px",
                                    borderRadius: "32px !important",
                                  }}
                                >
                                  <div>
                                    1st
                                    <p
                                      style={{
                                        background: "#FFF3DA",
                                        marginTop: "12px",
                                        fontSize: "12px",
                                        color: "rgba(254, 168, 0, 1)",
                                        borderRadius: "10px",
                                      }}
                                    >
                                      {item.score}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Third Place - Right */}
                            {i === 2 && (
                              <div
                                className="podium-player"
                                style={{ marginTop: "60px", order: 3 }}
                              >
                                <div className="podium-avatar-container">
                                  <Image
                                    src={
                                      item.user.profileImage ??
                                      "/profile-avatar.png"
                                    }
                                    alt="3rd Place"
                                    width={56}
                                    height={56}
                                    className="rounded-circle"
                                    style={{ border: "3px solid white" }}
                                  />
                                </div>
                                <div className="podium-name">
                                  {item.user.name}
                                </div>
                                <div
                                  className="podium-info"
                                  style={{
                                    minWidth: "62.142px",
                                    height: "86.998px",
                                    borderRadius: "32px !important",
                                  }}
                                >
                                  3rd
                                  <div
                                    style={{
                                      background: "#FFF3DA",
                                      marginTop: "12px",
                                      fontSize: "12px",
                                      color: "rgba(254, 168, 0, 1)",
                                      borderRadius: "10px",
                                    }}
                                  >
                                    {item.score}
                                  </div>
                                </div>
                              </div>
                            )}
                          </>
                        ))}
                    </div>
                  </div>

                  {/* <div
                                      className="leaderboard-list px-3"
                                      style={{
                                        maxHeight: "220px",
                                        overflowY: "auto",
                                      }}
                                    >
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
                                              fontSize: "16px",
                                              fontWeight: 600,
                                              textAlign: "center",
                                            }}
                                          >
                                            {player.rank}
                                          </div>
                                          <div
                                            style={{
                                              width: "40px",
                                              height: "40px",
                                              position: "relative",
                                            }}
                                            className="me-3"
                                          >
                                            <Image
                                              src={player.avatar}
                                              alt={player.name}
                                              width={40}
                                              height={40}
                                              className="rounded-circle"
                                              style={{ border: "2px solid #FFD600" }}
                                            />
                                          </div>
                                          <div className="flex-grow-1 d-flex justify-content-between align-items-center">
                                            <div style={{ fontSize: "14px", color: "#101828" }}>
                                              {player.name}
                                            </div>
                                            <div
                                              style={{
                                                fontSize: "14px",
                                                color: "#667085",
                                                fontWeight: 500,
                                              }}
                                            >
                                              {player.time}
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                    </div> */}
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
                          backgroundImage:
                            "linear-gradient(to right, rgba(92, 92, 216, 0.7), rgba(255, 214, 0, 0.7))",
                        }}
                      />
                    </div>
                  ))}
                  <div
                    className="mt-4 p-3 text-center"
                    style={{
                      background: "#FFD600",
                      borderRadius: "8px",
                      marginTop: "44px !important",
                    }}
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
        )}
      </Container>
    </UserDashboardLayout>
  );
}
