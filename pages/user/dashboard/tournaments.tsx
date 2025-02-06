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
import { ArrowRight, Search, MessageSquare } from "react-feather"; // Added import for MessageSquare
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
  const [tournamentHistory, setTournamentHistory] = useState([]);
  const [selectedTournament, setSelectedTournament] = useState(null);
  const [registrationModalOpen, setRegistrationModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const getCurrentTournaments = () => {
    switch(activeTab) {
      case "upcoming":
        return tournaments.slice(indexOfFirstItem, indexOfLastItem);
      case "my":
        return registeredTournaments.slice(indexOfFirstItem, indexOfLastItem);
      case "history":
        return tournamentHistory.slice(indexOfFirstItem, indexOfLastItem);
      case "info": //Added case for info tab
        return []; // No tournaments displayed in info tab
      default:
        return tournaments.slice(indexOfFirstItem, indexOfLastItem);
    }
  };
  const currentTournaments = getCurrentTournaments();
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
                      className="me-2"
                    >
                      My Tournaments
                    </Button>
                    <Button
                      color={activeTab === "history" ? "warning" : "light"}
                      onClick={() => setActiveTab("history")}
                      style={{
                        backgroundColor: activeTab === "history" ? "#FFD600" : "#F9FAFB",
                        color: activeTab === "history" ? "#000" : "#667085",
                        border: "1px solid #EAECF0",
                        borderRadius: "8px",
                        fontSize: "14px",
                        fontWeight: 500,
                        padding: "8px 16px"
                      }}
                    >
                      Tournament History
                    </Button>
                    <Button
                      color={activeTab === "info" ? "warning" : "light"} // Added info tab button
                      onClick={() => setActiveTab("info")}
                      className="me-2"
                    >
                      Info
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

                {activeTab === 'info' && (
                  <div className="bg-white p-4 rounded">
                    <h4 className="mb-4" style={{ fontSize: '24px', fontWeight: 600, color: '#101828' }}>Support</h4>
                    <p className="text-muted mb-4" style={{ fontSize: '16px', color: '#667085' }}>
                      If you have questions or issues in relation to online tournaments, please contact us via following support emails and we'll be with you shortly.
                    </p>

                    <div className="d-flex flex-column gap-4">
                      {[
                        { name: 'John Smith', role: 'Operations Manager' },
                        { name: 'Sam Winchester', role: 'OLT Support Specialist' },
                        { name: 'Daniel Craig', role: 'OLT Support Specialist' },
                        { name: 'Gilbert Blythe', role: 'OLT Support Specialist' }
                      ].map((member, index) => (
                        <div key={index} className="d-flex justify-content-between align-items-center p-3" style={{ background: '#F9FAFB', borderRadius: '8px' }}>
                          <div className="d-flex gap-3">
                            <div className="position-relative" style={{ width: '40px', height: '40px' }}>
                              <Image src="/user1.png" alt={member.name} layout="fill" className="rounded-circle" />
                            </div>
                            <div>
                              <h6 className="mb-1" style={{ fontSize: '14px', fontWeight: 500, color: '#101828' }}>{member.name}</h6>
                              <p className="mb-0" style={{ fontSize: '14px', color: '#667085' }}>{member.role}</p>
                            </div>
                          </div>
                          <Button 
                            color="light" 
                            className="rounded-circle p-2"
                            style={{ 
                              backgroundColor: 'white',
                              border: '1px solid #E4E7EC'
                            }}
                          >
                            <MessageSquare size={20} color="#667085" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}


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
                      <Col xs={12} sm={6} md={4} lg={3} key={tournament._id} className="mb-4">
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
                            <div className="d-flex justify-content-between align-items-center">
                              <Button
                                color="link"
                                className="text-decoration-none"
                                style={{
                                  color: '#FFD600',
                                  fontSize: '14px',
                                  fontWeight: 600,
                                  padding: '4px'
                                }}
                                onClick={() => router.push(`/user/dashboard/tournament/${tournament._id}`)}
                              >
                                See Details
                              </Button>
                              <Button
                                color="link"
                                className="text-decoration-none d-flex align-items-center"
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
                <div className="d-flex justify-content-between align-items-center mt-4">
                  <div className="d-flex align-items-center" style={{ gap: '4px' }}>
                    <Button
                      onClick={() => setCurrentPage(1)}
                      disabled={currentPage === 1}
                      style={{
                        padding: '0',
                        backgroundColor: 'transparent',
                        border: 'none',
                        color: '#667085',
                        minWidth: '24px',
                        height: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '14px',
                        cursor: 'pointer',
                        opacity: currentPage === 1 ? 0.5 : 1
                      }}
                    >
                      ≪
                    </Button>
                    <Button
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      style={{
                        padding: '0',
                        backgroundColor: 'transparent',
                        border: 'none',
                        color: '#667085',
                        minWidth: '24px',
                        height: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '14px',
                        cursor: 'pointer',
                        opacity: currentPage === 1 ? 0.5 : 1
                      }}
                    >
                      ‹
                    </Button>

                    {[...Array(6)].map((_, idx) => {
                      const pageNum = idx + 1;
                      if (pageNum > totalPages) return null;

                      return (
                        <Button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          style={{
                            backgroundColor: pageNum === currentPage ? '#FFD700' : 'transparent',
                            border: 'none',
                            color: pageNum === currentPage ? '#000' : '#667085',
                            minWidth: '24px',
                            height: '24px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '14px',
                            fontWeight: '500',
                            padding: '0',
                            margin: '0'
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
                        padding: '0',
                        backgroundColor: 'transparent',
                        border: 'none',
                        color: '#667085',
                        minWidth: '24px',
                        height: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '14px'
                      }}
                    >
                      ›
                    </Button>
                    <Button
                      onClick={() => setCurrentPage(totalPages)}
                      disabled={currentPage === totalPages}
                      style={{
                        padding: '0',
                        backgroundColor: 'transparent',
                        border: 'none',
                        color: '#667085',
                        minWidth: '24px',
                        height: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '14px'
                      }}
                    >
                      ≫
                    </Button>

                    <div style={{ marginLeft: '16px', display: 'flex', alignItems: 'center' }}>
                      <select 
                        value={itemsPerPage}
                        onChange={(e) => setItemsPerPage(Number(e.target.value))}
                        style={{
                          padding: '2px 8px',
                          border: '1px solid #D0D5DD',
                          borderRadius: '4px',
                          color: '#667085',
                          fontSize: '14px',
                          backgroundColor: 'white',
                          cursor: 'pointer',
                          minWidth: '50px',
                          height: '24px',
                          marginRight: '8px'
                        }}
                      >
                        <option value={12}>12</option>
                        <option value={24}>24</option>
                        <option value={36}>36</option>
                      </select>
                      <span style={{ color: '#667085', fontSize: '14px' }}>Items per page</span>
                    </div>
                  </div>

                  <div style={{ color: '#667085', fontSize: '14px' }}>
                    1 - 3 of {totalPages} items
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