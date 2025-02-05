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
  Spinner,
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
  const [error, setError] = useState(null); // Added error state
  const [activeTab, setActiveTab] = useState("upcoming");
  const [selectedTournament, setSelectedTournament] = useState(null);
  const [registrationModalOpen, setRegistrationModalOpen] = useState(false);

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        setIsLoading(true);
        setError(null); // Reset error on each fetch
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
          // Handle non-success responses
          throw new Error(data.message || "An unexpected error occurred");
        }
      } catch (error) {
        console.error("Error fetching tournaments:", error);
        setError(error.message); // Set error state
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
                        placeholder="Search tournaments..."
                        style={{ width: "250px" }}
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
                        <Card className="border-0 shadow-sm h-100 tournament-card">
                          <div className="tournament-image-wrapper">
                            <Image
                              src={
                                registration?.tournament?.images?.[0] ||
                                "/fortnite-banner.png"
                              }
                              alt={
                                registration?.tournament?.name || "Tournament"
                              }
                              style={{
                                objectFit: "cover",
                                width: "100%",
                              }}
                              width={100}
                              height={200}
                              className="tournament-image"
                              priority
                            />
                            <div className="tournament-status">
                              {registration.tournament.status}
                            </div>
                          </div>
                          <CardBody>
                            <CardTitle tag="h5" className="mb-3">
                              {registration.tournament.name}
                            </CardTitle>
                            <CardText>
                              <small className="text-muted">
                                {registration.tournament.date} •{" "}
                                {registration.tournament.time}
                              </small>
                              <div className="d-flex justify-content-between align-items-center mb-3">
                                <div>
                                  <small className="text-muted">Team</small>
                                  <h6 className="mb-0">
                                    {registration.team?.name}
                                  </h6>
                                </div>
                                <div className="text-end">
                                  <small className="text-muted">Status</small>
                                  <h6 className="mb-0 text-capitalize">
                                    {registration.paymentStatus}
                                  </h6>
                                </div>
                              </div>
                              <div className="d-flex justify-content-between align-items-center mb-3">
                                <div>
                                  <small className="text-muted">
                                    Prize Pool
                                  </small>
                                  <h6 className="mb-0">
                                    ${registration.tournament.totalPrizePool}
                                  </h6>
                                </div>
                                <div className="text-end">
                                  <small className="text-muted">
                                    Entry Fee
                                  </small>
                                  <h6 className="mb-0">
                                    ${registration.tournament.entryFee}
                                  </h6>
                                </div>
                              </div>
                              <Button
                                color="warning"
                                block
                                onClick={() =>
                                  router.push(
                                    `/user/dashboard/confirm/${registration._id}`
                                  )
                                }
                              >
                                View Details{" "}
                                <ArrowRight size={16} className="ms-2" />
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
                        <Card className="border-0 shadow-sm h-100 tournament-card">
                          <div className="tournament-image-wrapper">
                            <Image
                              src={
                                tournament.images?.[0] || "/fortnite-banner.png"
                              }
                              alt={tournament.name || "Tournament"}
                              style={{
                                objectFit: "cover",
                                width: "100%",
                              }}
                              width={100}
                              height={200}
                              className="tournament-image"
                              priority
                            />
                            <div className="tournament-status">
                              {tournament.status}
                            </div>
                          </div>
                          <CardBody>
                            <CardTitle tag="h5" className="mb-3">
                              {tournament.name}
                            </CardTitle>
                            <CardText>
                              <small className="text-muted">
                                {tournament.date} • {tournament.time}
                              </small>
                              <div className="d-flex justify-content-between align-items-center mb-3">
                                <div>
                                  <small className="text-muted">
                                    Prize Pool
                                  </small>
                                  <h6 className="mb-0">
                                    ${tournament.totalPrizePool}
                                  </h6>
                                </div>
                                <div className="text-end">
                                  <small className="text-muted">
                                    Entry Fee
                                  </small>
                                  <h6 className="mb-0">
                                    ${tournament.entryFee}
                                  </h6>
                                </div>
                              </div>

                              <Button
                                color="warning"
                                block
                                onClick={() =>
                                  router.push(
                                    `/user/dashboard/register-tournament/${tournament._id}`
                                  )
                                }
                              >
                                Register Now{" "}
                                <ArrowRight size={16} className="ms-2" />
                              </Button>
                            </CardText>
                          </CardBody>
                        </Card>
                      </Col>
                    ))
                  )}
                </Row>

                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginTop: '24px',
                  color: '#667085'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Button
                      color="light"
                      className="p-0"
                      style={{ 
                        minWidth: '32px',
                        height: '32px',
                        border: '1px solid #D0D5DD',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: '#fff'
                      }}
                    >
                      ‹
                    </Button>

                    {[1, 2, 3, 4, 5, 6].map((page) => (
                      <Button
                        key={page}
                        color={page === 2 ? "warning" : "light"}
                        className="p-0"
                        style={{ 
                          minWidth: '32px',
                          height: '32px',
                          border: page === 2 ? 'none' : '1px solid #D0D5DD',
                          borderRadius: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: page === 2 ? '#FFD700' : '#fff',
                          fontWeight: page === 2 ? 600 : 400,
                          fontSize: '14px'
                        }}
                      >
                        {page}
                      </Button>
                    ))}

                    <span style={{ margin: '0 4px' }}>...</span>

                    <Button
                      color="light"
                      className="p-0"
                      style={{ 
                        minWidth: '32px',
                        height: '32px',
                        border: '1px solid #D0D5DD',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: '#fff',
                        fontSize: '14px'
                      }}
                    >
                      12
                    </Button>

                    <Button
                      color="light"
                      className="p-0"
                      style={{ 
                        minWidth: '32px',
                        height: '32px',
                        border: '1px solid #D0D5DD',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: '#fff'
                      }}
                    >
                      ›
                    </Button>
                  </div>

                  <div style={{ fontSize: '14px', color: '#667085' }}>
                    1 - 3 of 10 items
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Modal isOpen={registrationModalOpen} toggle={closeRegistrationModal}>
          <ModalHeader toggle={closeRegistrationModal}>
            Register for {selectedTournament?.name}
          </ModalHeader>
          <ModalBody>
            {/* Add registration form here */}
            <p>
              Registration form for {selectedTournament?.name} will go here.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={closeRegistrationModal}>
              Register
            </Button>{" "}
            <Button color="secondary" onClick={closeRegistrationModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </Container>
    </UserDashboardLayout>
  );
}
