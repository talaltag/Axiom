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

interface GameStats {
  name: string;
  lastScore: string;
  score: number;
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
    { rank: 1, name: "John Anderson", score: 8733, avatar: "/user1.png" },
    { rank: 2, name: "MiracK", score: 8456, avatar: "/user1.png" },
    { rank: 3, name: "Omar O.", score: 8105, avatar: "/user1.png" },
  ];

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const response = await fetch("/api/tournaments");
        const data = await response.json();
        if (data.success) {
          setTournaments(data.data);
        }
      } catch (error) {
        console.error("Error fetching tournaments:", error);
      }
    };

    fetchTournaments();
  }, []);

  return (
    <UserDashboardLayout>
      <Container fluid className="p-4">
        {/* Banner Section */}
        <Card className="mb-4 border-0 overflow-hidden">
          <div className="position-relative" style={{ height: "300px" }}>
            <Image
              src="/fortnite-banner.png"
              alt="Warzone"
              fill
              style={{ objectFit: "cover" }}
            />
            <div className="position-absolute p-4 text-white" style={{ top: 0, left: 0, right: 0 }}>
              <h2>Warzone</h2>
              <p>May 18, 2023 9:00PM - 10:30PM EST</p>
              <h3>2022 world champs gaming</h3>
              <Button color="warning" className="mt-2">Register Now</Button>
            </div>
          </div>
        </Card>

        {/* Tournaments Section */}
        <Row className="g-4 mb-4">
          {tournaments.map((tournament) => (
            <Col md={3} key={tournament._id}>
              <Card className="border-0 h-100">
                <div style={{ height: "150px", position: "relative" }}>
                  <Image
                    src={tournament.image || "/fortnite-banner.png"}
                    alt={tournament.name}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <CardBody>
                  <h5>{tournament.name}</h5>
                  <div className="d-flex justify-content-between mb-2">
                    <small className="text-muted">Prize</small>
                    <small className="text-muted">Entry Cost</small>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <span className="text-danger">${tournament.totalPrizePool}</span>
                    <span className="text-danger">${tournament.entryFee}</span>
                  </div>
                  <Button 
                    color="warning" 
                    block
                    onClick={() => router.push(`/user/dashboard/register-tournament/${tournament._id}`)}
                  >
                    Register Now
                  </Button>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>

        <Row>
          {/* Leaderboard Section */}
          <Col md={8}>
            <Card className="border-0 mb-4">
              <CardBody>
                <CardTitle tag="h5" className="mb-4">Leaderboard</CardTitle>
                <div className="position-relative" style={{ height: "300px", background: "#FFD600", borderRadius: "15px", padding: "20px" }}>
                  {leaderboardData.map((player, index) => (
                    <div key={index} className="d-flex align-items-center mb-3">
                      <Image
                        src={player.avatar}
                        alt={player.name}
                        width={40}
                        height={40}
                        className="rounded-circle me-3"
                      />
                      <div className="flex-grow-1">
                        <h6 className="mb-0">{player.name}</h6>
                        <small>{player.score} Points</small>
                      </div>
                      <span className="badge bg-white text-dark">#{index + 1}</span>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </Col>

          {/* Game Stats Section */}
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
                      color="warning"
                      style={{ height: "8px" }}
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