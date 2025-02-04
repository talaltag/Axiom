
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
    { rank: "4", name: "Jennings Stohler", time: "912 Points", avatar: "/user1.png" },
    { rank: "5", name: "Scotty Tovias", time: "845 Points", avatar: "/user1.png" },
    { rank: "6", name: "Ameline Aquila", time: "789 Points", avatar: "/user1.png" },
  ];

  return (
    <UserDashboardLayout>
      <Container fluid className="p-4">
        <Card className="mb-4 border-0">
          <div className="position-relative" style={{ height: "300px", borderRadius: "16px", overflow: "hidden" }}>
            <Image
              src="/fortnite-banner.png"
              alt="Warzone"
              fill
              style={{ objectFit: "cover" }}
            />
            <div className="position-absolute p-4 text-white">
              <h2 className="mb-1">Warzone</h2>
              <p className="mb-2">May 23, 2023 9:00PM - 10:30PM EST</p>
              <h3 className="mb-3">2022 world champs gaming</h3>
              <Button color="warning" style={{ backgroundColor: "#FFD600", border: "none" }}>
                Register Now
              </Button>
            </div>
          </div>
        </Card>

        <Row className="g-4 mb-4">
          {[
            {
              name: "Fortnite Summer Battle",
              date: "May 23, 2023",
              time: "9:00PM - 10:30PM EST",
              prize: "$500",
              entryCost: "$200",
              image: "/fortnite-banner.png"
            },
            {
              name: "PUBG tournament by Red Bull",
              date: "May 23, 2023",
              time: "9:00PM - 10:30PM EST",
              prize: "$500",
              entryCost: "$200",
              image: "/fortnite-banner.png"
            },
            {
              name: "Apex Legends tournament",
              date: "May 23, 2023",
              time: "9:00PM - 10:30PM EST",
              prize: "$500",
              entryCost: "$200",
              image: "/fortnite-banner.png"
            },
            {
              name: "Rocket League Finals",
              date: "May 23, 2023",
              time: "9:00PM - 10:30PM EST",
              prize: "$500",
              entryCost: "$200",
              image: "/fortnite-banner.png"
            }
          ].map((tournament, index) => (
            <Col md={3} key={index}>
              <Card className="border-0 h-100" style={{ borderRadius: "16px", overflow: "hidden" }}>
                <div style={{ height: "150px", position: "relative" }}>
                  <Image
                    src={tournament.image}
                    alt={tournament.name}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <CardBody>
                  <h5 className="mb-3">{tournament.name}</h5>
                  <div className="d-flex justify-content-between mb-2">
                    <div className="text-muted">Prize</div>
                    <div className="text-muted">Entry Cost</div>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <div className="text-danger">{tournament.prize}</div>
                    <div className="text-danger">{tournament.entryCost}</div>
                  </div>
                  <Button 
                    color="warning" 
                    className="w-100"
                    style={{ backgroundColor: "#FFD600", border: "none" }}
                  >
                    Register Now
                  </Button>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>

        <Row>
          <Col md={8}>
            <Card className="border-0 mb-4">
              <CardBody>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <CardTitle tag="h5" className="mb-0">Leaderboard</CardTitle>
                  <Button color="link" className="text-muted p-0">More</Button>
                </div>
                <div className="position-relative" style={{ background: "#FFD600", borderRadius: "16px", padding: "20px" }}>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    {leaderboardData.slice(0, 3).map((player, index) => (
                      <div key={index} className="text-center">
                        <Image
                          src={player.avatar}
                          alt={player.name}
                          width={50}
                          height={50}
                          className="rounded-circle mb-2"
                        />
                        <div>{player.name}</div>
                        <div>{player.score} Points</div>
                        <div className="mt-2">{player.rank}</div>
                      </div>
                    ))}
                  </div>
                  {leaderboardData.slice(3).map((player, index) => (
                    <div key={index} className="d-flex align-items-center mb-3 bg-white rounded p-2">
                      <div className="me-3">{player.rank}</div>
                      <Image
                        src={player.avatar}
                        alt={player.name}
                        width={30}
                        height={30}
                        className="rounded-circle me-3"
                      />
                      <div className="flex-grow-1">
                        <div>{player.name}</div>
                        <small className="text-muted">{player.time}</small>
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="border-0 mb-4">
              <CardBody>
                <CardTitle tag="h5" className="mb-4">Last Game Stats</CardTitle>
                {gameStats.map((game, index) => (
                  <div key={index} className="mb-4">
                    <div className="d-flex justify-content-between mb-2">
                      <span>{game.name}</span>
                      <span>{game.lastScore}</span>
                    </div>
                    <Progress
                      value={game.score}
                      className="mb-2"
                      style={{ height: "8px", backgroundColor: "#E9ECEF" }}
                      color="warning"
                    />
                  </div>
                ))}
                <div className="text-center mt-4">
                  <h2 className="mb-0">98%</h2>
                  <small className="text-muted">Winning Streak</small>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </UserDashboardLayout>
  );
}
