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
    switch (activeTab) {
      case "upcoming":
        return tournaments.slice(indexOfFirstItem, indexOfLastItem);
      case "my":
        return registeredTournaments.slice(indexOfFirstItem, indexOfLastItem);
      case "history":
        return tournamentHistory.slice(indexOfFirstItem, indexOfLastItem);
      case "info":
        return [];
      default:
        return tournaments.slice(indexOfFirstItem, indexOfLastItem);
    }
  };
  const currentTournaments = getCurrentTournaments();
  const totalPages = Math.ceil(
    (activeTab === "upcoming"
      ? tournaments.length
      : registeredTournaments.length) / itemsPerPage
  );

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
                      onClick={() => setActiveTab("upcoming")}
                      className="me-2"
                      style={{
                        backgroundColor: activeTab === "upcoming" ? "#101828" : "#FFFFFF",
                        color: activeTab === "upcoming" ? "#FFFFFF" : "#344054",
                        border: "1px solid #D0D5DD",
                        borderRadius: "8px",
                        fontSize: "14px",
                        fontWeight: 500,
                        padding: "8px 14px",
                        boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)"
                      }}
                    >
                      Upcoming Tournaments
                    </Button>
                    <Button
                      onClick={() => setActiveTab("my")}
                      className="me-2"
                      style={{
                        backgroundColor: activeTab === "my" ? "#FFD600" : "#FFFFFF",
                        color: "#101828",
                        border: "1px solid #D0D5DD",
                        borderRadius: "8px",
                        fontSize: "14px",
                        fontWeight: 500,
                        padding: "8px 14px",
                        boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)"
                      }}
                    >
                      My Tournaments
                    </Button>
                    <Button
                      onClick={() => setActiveTab("history")}
                      style={{
                        backgroundColor: activeTab === "history" ? "#F2F4F7" : "#FFFFFF",
                        color: "#344054",
                        border: "1px solid #D0D5DD",
                        borderRadius: "8px",
                        fontSize: "14px",
                        fontWeight: 500,
                        padding: "8px 14px",
                        boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)"
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
                          boxShadow: "none",
                        }}
                      />
                    </div>
                  </div>
                </div>

                {activeTab === "history" && (
  <div className="bg-white rounded" style={{ boxShadow: "0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)" }}>
    <div className="d-flex justify-content-between align-items-center p-4 border-bottom">
      <div>
        <h4 className="mb-0" style={{ fontSize: "18px", fontWeight: 600, color: "#101828", lineHeight: "28px" }}>
          Last Played Tournaments History
        </h4>
      </div>
      <Button
        color="light"
        className="d-flex align-items-center"
        style={{
          padding: "8px 14px",
          backgroundColor: "#fff",
          border: "1px solid #D0D5DD",
          borderRadius: "8px",
          color: "#344054",
          fontSize: "14px",
          fontWeight: 500,
          boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)"
        }}
      >
        Back
      </Button>
    </div>

    <div className="table-responsive px-4">
      <table className="table" style={{ marginBottom: 0 }}>
        <thead>
          <tr>
            <th style={{ color: "#667085", fontSize: "12px", fontWeight: 500, padding: "10px 0", borderBottom: "1px solid #EAECF0", width: "40%" }}>Tournament</th>
            <th style={{ color: "#667085", fontSize: "12px", fontWeight: 500, padding: "10px 0", borderBottom: "1px solid #EAECF0", width: "20%" }}>Placement</th>
            <th style={{ color: "#667085", fontSize: "12px", fontWeight: 500, padding: "10px 0", borderBottom: "1px solid #EAECF0", width: "20%" }}>Rewards</th>
            <th style={{ color: "#667085", fontSize: "12px", fontWeight: 500, padding: "10px 0", borderBottom: "1px solid #EAECF0", width: "20%", textAlign: "right" }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {[
            { name: "Vanguard Royale", placement: "23", reward: "$2000", status: "Completed" },
            { name: "Vanguard Royale", placement: "12", reward: "$2000", status: "Completed" },
            { name: "Vanguard Royale", placement: "32", reward: "$2000", status: "Completed" },
            { name: "Vanguard Royale", placement: "4", reward: "$2000", status: "Completed" },
            { name: "Vanguard Royale", placement: "44", reward: "$2500", status: "Completed" },
            { name: "Vanguard Royale", placement: "32", reward: "$2500", status: "Completed" },
            { name: "Vanguard Royale", placement: "12", reward: "$2500", status: "Ongoing" },
            { name: "Vanguard Royale", placement: "22", reward: "$2500", status: "Ongoing" }
          ].map((tournament, index) => (
            <tr key={index}>
              <td style={{ fontSize: "14px", color: "#101828", padding: "16px 0", borderBottom: "1px solid #EAECF0" }}>
                <span style={{ textDecoration: "underline" }}>{tournament.name}</span>
              </td>
              <td style={{ fontSize: "14px", color: "#101828", padding: "16px 0", borderBottom: "1px solid #EAECF0" }}>
                {tournament.placement}
              </td>
              <td style={{ fontSize: "14px", color: "#101828", padding: "16px 0", borderBottom: "1px solid #EAECF0" }}>
                {tournament.reward}
              </td>
              <td style={{ padding: "16px 0", borderBottom: "1px solid #EAECF0", textAlign: "right" }}>
                <span className={`badge ${tournament.status === "Completed" ? "text-success" : "text-danger"}`}
                  style={{ 
                    backgroundColor: tournament.status === "Completed" ? "#ECFDF3" : "#FEF3F2",
                    color: tournament.status === "Completed" ? "#027A48" : "#B42318",
                    padding: "2px 8px",
                    borderRadius: "16px",
                    fontSize: "12px",
                    fontWeight: 500,
                    display: "inline-block",
                    marginLeft: "auto"
                  }}>
                  {tournament.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>


  </div>
)}

{activeTab === "info" && (
                  <div className="bg-white p-4 rounded">
                    <h4
                      className="mb-4"
                      style={{
                        fontSize: "24px",
                        fontWeight: 600,
                        color: "#101828",
                      }}
                    >
                      Support
                    </h4>
                    <p
                      className="text-muted mb-4"
                      style={{ fontSize: "16px", color: "#667085" }}
                    >
                      If you have questions or issues in relation to online
                      tournaments, please contact us via following support
                      emails and we'll be with you shortly.
                    </p>

                    <div className="d-flex flex-column gap-4">
                      {[
                        { name: "John Smith", role: "Operations Manager" },
                        {
                          name: "Sam Winchester",
                          role: "OLT Support Specialist",
                        },
                        {
                          name: "Daniel Craig",
                          role: "OLT Support Specialist",
                        },
                        {
                          name: "Gilbert Blythe",
                          role: "OLT Support Specialist",
                        },
                      ].map((member, index) => (
                        <div
                          key={index}
                          className="d-flex justify-content-between align-items-center p-3"
                          style={{ background: "#F9FAFB", borderRadius: "8px" }}
                        >
                          <div className="d-flex gap-3">
                            <div
                              className="position-relative"
                              style={{ width: "40px", height: "40px" }}
                            >
                              <Image
                                src="/user1.png"
                                alt={member.name}
                                layout="fill"
                                className="rounded-circle"
                              />
                            </div>
                            <div>
                              <h6
                                className="mb-1"
                                style={{
                                  fontSize: "14px",
                                  fontWeight: 500,
                                  color: "#101828",
                                }}
                              >
                                {member.name}
                              </h6>
                              <p
                                className="mb-0"
                                style={{ fontSize: "14px", color: "#667085" }}
                              >
                                {member.role}
                              </p>
                            </div>
                          </div>
                          <Button
                            color="light"
                            className="rounded-circle p-2"
                            style={{
                              backgroundColor: "white",
                              border: "1px solid #E4E7EC",
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
                          <div
                            style={{ position: "relative", height: "200px" }}
                          >
                            <Image
                              src={
                                registration?.tournament?.images?.[0] ||
                                "/fortnite-banner.png"
                              }
                              alt={
                                registration?.tournament?.name || "Tournament"
                              }
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
                                {registration.tournament.date} •{" "}
                                {registration.tournament.time}
                              </small>
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
                    currentTournaments.map((tournament) => (
                      <Col
                        xs={12}
                        sm={6}
                        md={4}
                        lg={3}
                        key={tournament._id}
                        className="mb-4"
                      >
                        <Card
                          className="tournament-card h-100"
                          style={{
                            borderRadius: "12px",
                            overflow: "hidden",
                            border: "none",
                            backgroundColor: "#FAFBFC",
                            boxShadow:
                              "0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)",
                          }}
                        >
                          <div
                            style={{ position: "relative", height: "160px" }}
                          >
                            <div
                              style={{
                                position: "absolute",
                                top: "12px",
                                left: "12px",
                                zIndex: 2,
                                background: "rgba(255, 255, 255, 0.9)",
                                padding: "4px 8px",
                                borderRadius: "6px",
                                fontSize: "12px",
                              }}
                            >
                              Closing in:10:88:00
                            </div>
                            <Image
                              src={
                                tournament.images?.[0] || "/fortnite-banner.png"
                              }
                              alt={tournament.name || "Tournament"}
                              layout="fill"
                              objectFit="cover"
                              style={{ borderRadius: "12px 12px 0 0" }}
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                          </div>
                          <CardBody className="p-3">
                            <h5
                              style={{
                                fontSize: "16px",
                                fontWeight: 600,
                                marginBottom: "8px",
                                color: "#101828",
                              }}
                            >
                              {tournament.name}
                            </h5>
                            <div
                              style={{
                                fontSize: "12px",
                                color: "#667085",
                                marginBottom: "16px",
                              }}
                            >
                              {tournament.date} {tournament.time}
                            </div>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                              <div>
                                <div
                                  style={{
                                    fontSize: "12px",
                                    color: "#667085",
                                    marginBottom: "4px",
                                  }}
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
                                  ${tournament.totalPrizePool}
                                </div>
                              </div>
                              <div className="text-end">
                                <div
                                  style={{
                                    fontSize: "12px",
                                    color: "#667085",
                                    marginBottom: "4px",
                                  }}
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
                            <div className="d-flex justify-content-between align-items-center">
                              <Button
                                color="link"
                                className="text-decoration-none"
                                style={{
                                  color: "#FFD600",
                                  fontSize: "14px",
                                  fontWeight: 600,
                                  padding: "4px",
                                }}
                                onClick={() =>
                                  router.push(
                                    `/user/dashboard/tournament/${tournament._id}`
                                  )
                                }
                              >
                                See Details
                              </Button>
                              <Button
                                color="link"
                                className="text-decoration-none d-flex align-items-center"
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
                                Register Now{" "}
                                <ArrowRight size={16} className="ms-2" />
                              </Button>
                            </div>
                          </CardBody>
                        </Card>
                      </Col>
                    ))
                  )}
                </Row>

                <div className="d-flex justify-content-between align-items-center p-4 border-top">
                  <div className="d-flex align-items-center gap-2">
                    <Button 
                      color="light" 
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} 
                      style={{ 
                        padding: "8px 14px", 
                        border: "1px solid #D0D5DD", 
                        borderRadius: "8px", 
                        minWidth: "40px" 
                      }}
                    >
                      «
                    </Button>
                    {[...Array(Math.min(6, totalPages))].map((_, idx) => {
                      const pageNum = idx + 1;
                      return (
                        <Button
                          key={pageNum}
                          color={pageNum === currentPage ? "warning" : "light"}
                          onClick={() => setCurrentPage(pageNum)}
                          style={{
                            backgroundColor: pageNum === currentPage ? "#FFD600" : undefined,
                            padding: "8px 14px",
                            border: pageNum === currentPage ? "none" : "1px solid #D0D5DD",
                            borderRadius: "8px",
                            minWidth: "40px",
                            fontWeight: 500
                          }}
                        >
                          {pageNum}
                        </Button>
                      );
                    })}
                    <Button 
                      color="light"
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      style={{ 
                        padding: "8px 14px", 
                        border: "1px solid #D0D5DD", 
                        borderRadius: "8px", 
                        minWidth: "40px" 
                      }}
                    >
                      »
                    </Button>
                    <select 
                      className="form-select ms-2" 
                      style={{ width: "70px" }}
                      value={itemsPerPage}
                      onChange={(e) => setItemsPerPage(Number(e.target.value))}
                    >
                      <option value={12}>12</option>
                      <option value={24}>24</option>
                      <option value={36}>36</option>
                    </select>
                  </div>
                  <div style={{ color: "#667085", fontSize: "14px" }}>
                    {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, tournaments.length)} of {tournaments.length} items
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