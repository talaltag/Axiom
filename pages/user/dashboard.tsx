
import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Badge,
  Progress,
  Button,
} from "reactstrap";
import { useRouter } from "next/router";
import UserDashboardLayout from "../../components/layouts/UserDashboardLayout";
import { ArrowRight } from "react-feather";
import Image from "next/image";

interface Tournament {
  title: string;
  date: string;
  time: string;
  prize: string;
  entryCost: string;
  image: string;
}

export default function UserDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  const gameStats = [
    { name: "Fortnite", lastScore: "102234", progress: 75 },
    { name: "Pubg", lastScore: "102234", progress: 85 },
    { name: "Apex", lastScore: "102234", progress: 90 },
  ];

  const tournaments: Tournament[] = [
    {
      title: "Warzone",
      date: "May 23, 2023",
      time: "9:00PM - 10:30PM EST",
      prize: "$500",
      entryCost: "$200",
      image: "/game-warzone.jpg"
    },
    {
      title: "Fortnite Summer Battle",
      date: "May 23, 2023",
      time: "9:00PM - 10:30PM EST",
      prize: "$500",
      entryCost: "$200",
      image: "/game-fortnite.jpg"
    },
    {
      title: "PUBG Tournament",
      date: "May 23, 2023",
      time: "9:00PM - 10:30PM EST",
      prize: "$500",
      entryCost: "$200",
      image: "/game-pubg.jpg"
    },
  ];

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      router.push("/auth/login");
      return;
    }
    setUser(JSON.parse(userData));
  }, [router]);

  if (!user) return null;

  return (
    <UserDashboardLayout>
      <Container fluid className="p-4">
        <Row className="mb-4">
          <Col>
            <h4 className="mb-1">Welcome back, {user.name}</h4>
            <p className="text-muted mb-0">Track your gaming progress and upcoming tournaments</p>
          </Col>
        </Row>

        <Row className="mb-4">
          {gameStats.map((game, index) => (
            <Col md={4} key={index}>
              <Card className="border-0 shadow-sm">
                <CardBody>
                  <CardTitle tag="h5">{game.name}</CardTitle>
                  <CardText>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span>Last Score</span>
                      <span className="fw-bold">{game.lastScore}</span>
                    </div>
                    <Progress 
                      value={game.progress} 
                      className="mt-2"
                      color="warning"
                      style={{ height: "8px" }}
                    />
                  </CardText>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>

        <Row className="mb-4">
          <Col>
            <Card className="border-0 shadow-sm">
              <CardBody>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5 className="mb-0">Upcoming Tournaments</h5>
                  <Button color="warning" size="sm">View All</Button>
                </div>
                <Row>
                  {tournaments.map((tournament, index) => (
                    <Col md={4} key={index}>
                      <Card className="border-0 shadow-sm h-100">
                        <div style={{ height: "200px", position: "relative" }}>
                          <Image
                            src={tournament.image}
                            alt={tournament.title}
                            layout="fill"
                            objectFit="cover"
                          />
                        </div>
                        <CardBody>
                          <CardTitle tag="h5">{tournament.title}</CardTitle>
                          <CardText>
                            <small className="text-muted d-block mb-2">
                              {tournament.date} • {tournament.time}
                            </small>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                              <div>
                                <small className="text-muted">Prize Pool</small>
                                <h6 className="mb-0">{tournament.prize}</h6>
                              </div>
                              <div className="text-end">
                                <small className="text-muted">Entry Fee</small>
                                <h6 className="mb-0">{tournament.entryCost}</h6>
                              </div>
                            </div>
                            <Button color="warning" block>
                              Register Now <ArrowRight size={16} className="ms-2" />
                            </Button>
                          </CardText>
                        </CardBody>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col md={4}>
            <Card className="border-0 shadow-sm">
              <CardBody>
                <h5 className="mb-3">Winning Streak</h5>
                <div className="text-center">
                  <h2 className="mb-0 text-warning">98%</h2>
                  <p className="text-muted">Current Win Rate</p>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </UserDashboardLayout>
  );
}
