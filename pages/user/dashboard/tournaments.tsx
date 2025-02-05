import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import UserDashboardLayout from "../../../components/layouts/UserDashboardLayout";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Button,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  CardText,
  Alert,
} from "reactstrap";
import Image from "next/image";
import { ArrowRight, Search } from "react-feather";
import Loader from "../../../components/common/Loader";
import { useRouter } from "next/router";

export default function Tournaments() {
  const { data: session } = useSession();
  const router = useRouter();
  const [tournaments, setTournaments] = useState([]);
  const [registeredTournaments, setRegisteredTournaments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("upcoming");
  const [selectedTournament, setSelectedTournament] = useState(null);
  const [registrationModalOpen, setRegistrationModalOpen] = useState(false);

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const url =
          activeTab === "my"
            ? `/api/tournaments?filter=my&userId=${session?.user?.id}`
            : "/api/tournaments";
        const response = await fetch(url);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch tournaments");
        }
        const data = await response.json();
        if (data.success) {
          if (activeTab === "my") {
            setRegisteredTournaments(data.data);
          } else {
            setTournaments(data.data);
          }
        } else {
          throw new Error(data.message || "An unexpected error occurred");
        }
      } catch (error) {
        console.error("Error fetching tournaments:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (session?.user?.id) {
      fetchTournaments();
    }
  }, [activeTab, session?.user?.id]);

  const closeRegistrationModal = () => setRegistrationModalOpen(false);

  return (
    <UserDashboardLayout>
      <Container fluid className="p-4">
        {isLoading && <Loader fullscreen />}
        <Row className="mb-4">
          <Col>
            <Card className="border-0 shadow-sm">
              <CardBody>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div>
                    <Button
                      color={activeTab === "upcoming" ? "warning" : "light"}
                      className="me-2"
                      onClick={() => setActiveTab("upcoming")}
                    >
                      Upcoming Tournaments
                    </Button>
                    <Button
                      color={activeTab === "my" ? "warning" : "light"}
                      onClick={() => setActiveTab("my")}
                    >
                      My Tournaments
                    </Button>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="position-relative">
                      <Search
                        size={20}
                        className="position-absolute"
                        style={{
                          top: "50%",
                          transform: "translateY(-50%)",
                          left: "12px",
                          color: "#667085",
                          zIndex: 1,
                        }}
                      />
                      <Input
                        type="search"
                        className="form-control me-2 ps-5"
                        placeholder="Search"
                        style={{ 
                          width: "360px",
                          height: "40px",
                          backgroundColor: "#F9FAFB",
                          border: "1px solid #EAECF0",
                          borderRadius: "8px",
                          fontSize: "14px",
                          color: "#667085",
                          boxShadow: "none"
                        }}
                      />
                    </div>
                  </div>
                </div>

                <Row>
                  {error ? (
                    <Col xs={12}>
                      <Alert color="danger">{error}</Alert>
                    </Col>
                  ) : activeTab === "my" ? (
                    registeredTournaments.map((registration) => (
                      <Col md={4} key={registration._id} className="mb-4">
                        <Card className="tournament-card h-100 border-0">
                          <div style={{ position: "relative", height: "200px", borderRadius: "8px", overflow: "hidden" }}>
                            <div style={{ position: "absolute", top: "12px", left: "12px", zIndex: 1, backgroundColor: "white", padding: "4px 8px", borderRadius: "4px" }}>
                              <span style={{ fontSize: "12px", color: "#344054" }}>Closing in:10:88:00</span>
                            </div>
                            {registration.status === "Registered" && (
                              <div style={{ position: "absolute", top: "12px", right: "12px", zIndex: 1, backgroundColor: "white", padding: "4px 8px", borderRadius: "4px" }}>
                                <span style={{ fontSize: "12px", color: "#12B76A" }}>✓ Registered</span>
                              </div>
                            )}
                            <Image
                              src={registration?.tournament?.images?.[0] || "/fortnite-banner.png"}
                              alt={registration?.tournament?.name || "Tournament"}
                              layout="fill"
                              objectFit="cover"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                          </div>
                          <CardBody className="px-3 pt-3 pb-4">
                            <CardTitle tag="h5" style={{ fontSize: "16px", fontWeight: 500, color: "#101828", marginBottom: "4px" }}>
                              {registration.tournament.name}
                            </CardTitle>
                            <div style={{ fontSize: "14px", color: "#667085", marginBottom: "16px" }}>
                              {registration.tournament.date} • {registration.tournament.time}
                            </div>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                              <div>
                                <div style={{ fontSize: "12px", color: "#667085", marginBottom: "4px" }}>Prize</div>
                                <div style={{ fontSize: "16px", fontWeight: 500, color: "#DC3545" }}>${registration.tournament.totalPrizePool}</div>
                              </div>
                              <div className="text-end">
                                <div style={{ fontSize: "12px", color: "#667085", marginBottom: "4px" }}>Entry Cost</div>
                                <div style={{ fontSize: "16px", fontWeight: 500, color: "#DC3545" }}>${registration.tournament.entryFee}</div>
                              </div>
                            </div>
                            <Button
                              color="warning"
                              block
                              onClick={() => router.push(`/user/dashboard/confirm/${registration._id}`)}
                              style={{
                                backgroundColor: "transparent",
                                border: "none",
                                color: "#FFD600",
                                fontWeight: 600,
                                fontSize: "14px",
                                padding: "4px",
                                marginTop: "12px"
                              }}
                            >
                              View Details <ArrowRight size={16} className="ms-2" />
                            </Button>
                            </CardText>
                          </CardBody>
                        </Card>
                      </Col>
                    ))
                  ) : tournaments.length === 0 ? (
                    <Col xs={12}>
                      <Alert color="info">No tournaments found.</Alert>
                    </Col>
                  ) : (
                    tournaments.map((tournament) => (
                      <Col md={4} key={tournament._id} className="mb-4">
                        <Card className="tournament-card h-100 border-0">
                          <div style={{ position: "relative", height: "200px", borderRadius: "8px", overflow: "hidden" }}>
                            <div style={{ position: "absolute", top: "12px", left: "12px", zIndex: 1, backgroundColor: "white", padding: "4px 8px", borderRadius: "4px" }}>
                              <span style={{ fontSize: "12px", color: "#344054" }}>Closing in:10:88:00</span>
                            </div>
                            <Image
                              src={tournament.images?.[0] || "/fortnite-banner.png"}
                              alt={tournament.name || "Tournament"}
                              layout="fill"
                              objectFit="cover"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                          </div>
                          <CardBody className="px-3 pt-3 pb-4">
                            <CardTitle tag="h5" style={{ fontSize: "16px", fontWeight: 500, color: "#101828", marginBottom: "4px" }}>
                              {tournament.name}
                            </CardTitle>
                            <div style={{ fontSize: "14px", color: "#667085", marginBottom: "16px" }}>
                              {tournament.date} • {tournament.time}
                            </div>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                              <div>
                                <div style={{ fontSize: "12px", color: "#667085", marginBottom: "4px" }}>Prize</div>
                                <div style={{ fontSize: "16px", fontWeight: 500, color: "#DC3545" }}>${tournament.totalPrizePool}</div>
                              </div>
                              <div className="text-end">
                                <div style={{ fontSize: "12px", color: "#667085", marginBottom: "4px" }}>Entry Cost</div>
                                <div style={{ fontSize: "16px", fontWeight: 500, color: "#DC3545" }}>${tournament.entryFee}</div>
                              </div>
                            </div>
                            <Button
                              color="warning"
                              block
                              onClick={() => router.push(`/user/dashboard/register-tournament/${tournament._id}`)}
                              style={{
                                backgroundColor: "transparent",
                                border: "none",
                                color: "#FFD600",
                                fontWeight: 600,
                                fontSize: "14px",
                                padding: "4px",
                                marginTop: "12px"
                              }}
                            >
                              Register Now <ArrowRight size={16} className="ms-2" />
                            </Button>
                            </CardText>
                          </CardBody>
                        </Card>
                      </Col>
                    ))
                  )}
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </UserDashboardLayout>
  );
}