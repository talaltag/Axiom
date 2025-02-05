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
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTournaments = activeTab === "upcoming" 
    ? tournaments.slice(indexOfFirstItem, indexOfLastItem)
    : registeredTournaments.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil((activeTab === "upcoming" ? tournaments.length : registeredTournaments.length) / itemsPerPage);

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
                        <Card className="tournament-card h-100">
                          <div style={{ position: "relative", height: "200px" }}>
                            <Image
                              src={registration?.tournament?.images?.[0] || "/fortnite-banner.png"}
                              alt={registration?.tournament?.name || "Tournament"}
                              layout="fill"
                              objectFit="cover"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                          </div>
                          <CardBody>
                            <CardTitle tag="h5" className="mb-3">
                              {registration.tournament.name}
                            </CardTitle>
                            <CardText>
                              <small className="text-muted">
                                {registration.tournament.date} • {registration.tournament.time}
                              </small>
                              <div className="d-flex justify-content-between align-items-center mb-3">
                                <div>
                                  <small className="text-muted">Prize Pool</small>
                                  <h6 className="mb-0">${registration.tournament.totalPrizePool}</h6>
                                </div>
                                <div className="text-end">
                                  <small className="text-muted">Entry Fee</small>
                                  <h6 className="mb-0">${registration.tournament.entryFee}</h6>
                                </div>
                              </div>
                              <Button
                                color="warning"
                                block
                                onClick={() => router.push(`/user/dashboard/confirm/${registration._id}`)}
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
                    currentTournaments.map((tournament) => (
                      <Col md={3} key={tournament._id} className="mb-4">
                        <Card className="tournament-card h-100" style={{ borderRadius: '12px', overflow: 'hidden', border: 'none', boxShadow: '0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)' }}>
                          <div style={{ position: "relative", height: "160px" }}>
                            <div style={{ position: 'absolute', top: '12px', left: '12px', zIndex: 2, background: 'rgba(255, 255, 255, 0.9)', padding: '4px 8px', borderRadius: '6px', fontSize: '12px' }}>
                              Closing in:10:88:00
                            </div>
                            <Image
                              src={tournament.images?.[0] || "/fortnite-banner.png"}
                              alt={tournament.name || "Tournament"}
                              layout="fill"
                              objectFit="cover"
                              style={{ borderRadius: '12px 12px 0 0' }}
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                          </div>
                          <CardBody className="p-3">
                            <h5 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px', color: '#101828' }}>
                              {tournament.name}
                            </h5>
                            <div style={{ fontSize: '12px', color: '#667085', marginBottom: '16px' }}>
                              {tournament.date} {tournament.time}
                            </div>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                              <div>
                                <div style={{ fontSize: '12px', color: '#667085', marginBottom: '4px' }}>Prize</div>
                                <div style={{ fontSize: '16px', fontWeight: 600, color: '#DC3545' }}>${tournament.totalPrizePool}</div>
                              </div>
                              <div className="text-end">
                                <div style={{ fontSize: '12px', color: '#667085', marginBottom: '4px' }}>Entry Cost</div>
                                <div style={{ fontSize: '16px', fontWeight: 600, color: '#DC3545' }}>${tournament.entryFee}</div>
                              </div>
                            </div>
                            <div className="d-grid">
                              <Button
                                color="link"
                                className="text-decoration-none d-flex align-items-center justify-content-center"
                                style={{
                                  color: '#FFD600',
                                  fontSize: '14px',
                                  fontWeight: 600,
                                  padding: '4px'
                                }}
                                onClick={() => router.push(`/user/dashboard/register-tournament/${tournament._id}`)}
                              >
                                Register Now <ArrowRight size={16} className="ms-2" />
                              </Button>
                            </div>
                          </CardBody>
                        </Card>
                      </Col>
                    ))
                  )}
                </Row>
                
                {/* Pagination Controls */}
                <div className="d-flex justify-content-center align-items-center mt-4 gap-1">
                  <Button
                    onClick={() => setCurrentPage(1)}
                    disabled={currentPage === 1}
                    style={{
                      padding: '8px',
                      backgroundColor: 'transparent',
                      border: 'none',
                      color: '#667085',
                      minWidth: '32px',
                      height: '32px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    ⟨⟨
                  </Button>
                  <Button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    style={{
                      padding: '8px',
                      backgroundColor: 'transparent',
                      border: 'none',
                      color: '#667085',
                      minWidth: '32px',
                      height: '32px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    ⟨
                  </Button>
                  
                  {[...Array(Math.min(3, totalPages))].map((_, idx) => {
                    const pageNum = currentPage <= 2
                      ? idx + 1
                      : currentPage >= totalPages - 1
                        ? totalPages - 2 + idx
                        : currentPage - 1 + idx;
                    
                    if (pageNum > totalPages) return null;
                    
                    return (
                      <Button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        style={{
                          padding: '4px 12px',
                          backgroundColor: pageNum === currentPage ? '#FFD600' : 'transparent',
                          border: 'none',
                          color: pageNum === currentPage ? '#000' : '#667085',
                          minWidth: '32px',
                          height: '32px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: '4px',
                          fontWeight: pageNum === currentPage ? '600' : '400'
                        }}
                      >
                        {pageNum}
                      </Button>
                    );
                  })}

                  <Button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    style={{
                      padding: '8px',
                      backgroundColor: 'transparent',
                      border: 'none',
                      color: '#667085',
                      minWidth: '32px',
                      height: '32px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    ⟩
                  </Button>
                  <Button
                    onClick={() => setCurrentPage(totalPages)}
                    disabled={currentPage === totalPages}
                    style={{
                      padding: '8px',
                      backgroundColor: 'transparent',
                      border: 'none',
                      color: '#667085',
                      minWidth: '32px',
                      height: '32px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    ⟩⟩
                  </Button>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </UserDashboardLayout>
  );
}