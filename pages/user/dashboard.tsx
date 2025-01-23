
import { useEffect, useState } from "react";
import { Container, Row, Col, Card, CardBody, CardTitle, CardText, Badge, Progress } from "reactstrap";
import { useRouter } from "next/router";
import AdminDashboardLayout from "../../components/layouts/AdminDashboardLayout";

interface GameStats {
  name: string;
  lastScore: string;
  progress: number;
}

export default function UserDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  
  const gameStats: GameStats[] = [
    { name: "Fortnite", lastScore: "102234", progress: 75 },
    { name: "Pubg", lastScore: "102234", progress: 85 },
    { name: "Apex", lastScore: "102234", progress: 90 },
  ];

  const upcomingTournaments = [
    {
      title: "Warzone",
      date: "May 23, 2023",
      time: "9:00PM - 10:30PM EST",
      prize: "$500",
      entryCost: "$200",
    },
    {
      title: "Fortnite Summer Battle",
      date: "May 23, 2023",
      time: "9:00PM - 10:30PM EST",
      prize: "$500",
      entryCost: "$200",
    },
  ];

  useEffect(() => {
    try {
      const userData = localStorage.getItem("user");
      if (!userData) {
        router.push("/auth/login");
        return;
      }
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
    } catch (error) {
      router.push("/auth/login");
    }
  }, [router]);

  if (!user) return null;

  return (
    <Container fluid className="p-4">
      {/* Welcome Section */}
      <Row className="mb-4">
        <Col>
          <h4 className="mb-1">Welcome back, {user.name}</h4>
          <p className="text-muted mb-0">Track your gaming progress and upcoming tournaments</p>
        </Col>
      </Row>

      {/* Game Stats */}
      <Row className="mb-4">
        {gameStats.map((game, index) => (
          <Col md={4} key={index}>
            <Card className="mb-3">
              <CardBody>
                <CardTitle tag="h5">{game.name}</CardTitle>
                <CardText>
                  Last Score: {game.lastScore}
                  <Progress 
                    value={game.progress} 
                    className="mt-2"
                    color="warning"
                  />
                </CardText>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Tournaments Section */}
      <Row>
        <Col md={8}>
          <Card>
            <CardBody>
              <h5 className="mb-3">Upcoming Tournaments</h5>
              {upcomingTournaments.map((tournament, index) => (
                <div key={index} className="d-flex justify-content-between align-items-center mb-3 p-3 bg-light rounded">
                  <div>
                    <h6 className="mb-1">{tournament.title}</h6>
                    <small className="text-muted">
                      {tournament.date} • {tournament.time}
                    </small>
                  </div>
                  <div className="text-end">
                    <div className="mb-1">
                      Prize: <Badge color="success">{tournament.prize}</Badge>
                    </div>
                    <div>
                      Entry: <Badge color="warning">{tournament.entryCost}</Badge>
                    </div>
                  </div>
                </div>
              ))}
            </CardBody>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <CardBody>
              <h5 className="mb-3">Winning Streak</h5>
              <div className="text-center">
                <h2 className="mb-0">98%</h2>
                <p className="text-muted">Current Win Rate</p>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
