import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import UserDashboardLayout from "../../../components/layouts/UserDashboardLayout";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Input,
  Alert,
} from "reactstrap";
import Image from "next/image";
import { ArrowRight, Search, MessageSquare } from "react-feather";
import Loader from "../../../components/common/Loader";
import { useRouter } from "next/router";
import TournamentHistoryTable from "../../../components/tournaments/TournamentHistoryTable";
import TournamentCard from "../../../components/tournaments/TournamentCard";

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
    if (activeTab !== "history") {
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
                        backgroundColor:
                          activeTab === "upcoming" ? "#FFD600" : "#FFFFFF",
                        color: "#101828",
                        border: "1px solid #D0D5DD",
                        borderRadius: "8px",
                        fontSize: "14px",
                        fontWeight: 500,
                        padding: "8px 14px",
                        boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
                      }}
                    >
                      Upcoming Tournaments
                    </Button>
                    <Button
                      onClick={() => setActiveTab("my")}
                      className="me-2"
                      style={{
                        backgroundColor:
                          activeTab === "my" ? "#FFD600" : "#FFFFFF",
                        color: "#101828",
                        border: "1px solid #D0D5DD",
                        borderRadius: "8px",
                        fontSize: "14px",
                        fontWeight: 500,
                        padding: "8px 14px",
                        boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
                      }}
                    >
                      My / Invited Tournaments
                    </Button>
                  </div>
                  <div className="d-flex align-items-center gap-3">
                    {activeTab === "my" && (
                      <Button
                        onClick={() => setActiveTab("history")}
                        className="me-2"
                        style={{
                          backgroundColor:
                            activeTab === "history" ? "#FFD600" : "#FFFFFF",
                          color: "#101828",
                          border: "1px solid #D0D5DD",
                          borderRadius: "8px",
                          fontSize: "14px",
                          fontWeight: 500,
                          padding: "8px 14px",
                          boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
                        }}
                      >
                        Tournament History
                      </Button>
                    )}
                    <Button
                      onClick={() => setActiveTab("info")}
                      style={{
                        backgroundColor:
                          activeTab === "info" ? "#FFD600" : "#FFFFFF",
                        color: "#101828",
                        border: "1px solid #D0D5DD",
                        borderRadius: "8px",
                        fontSize: "14px",
                        fontWeight: 500,
                        padding: "8px 14px",
                        boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
                      }}
                    >
                      Info
                    </Button>
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
                  <div
                    className="bg-white rounded"
                    style={{
                      boxShadow:
                        "0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)",
                    }}
                  >
                    <div className="d-flex justify-content-between align-items-center p-4 border-bottom">
                      <div>
                        <h4
                          className="mb-0"
                          style={{
                            fontSize: "18px",
                            fontWeight: 600,
                            color: "#101828",
                            lineHeight: "28px",
                          }}
                        >
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
                          boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
                        }}
                      >
                        Back
                      </Button>
                    </div>

                    <div className="table-responsive">
                      <TournamentHistoryTable />
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
                      <Col
                        xs={12}
                        sm={6}
                        md={4}
                        lg={3}
                        key={registration._id}
                        className="mb-4"
                      >
                        <TournamentCard
                          item={{
                            ...{
                              ...registration.tournament,
                              _id: registration._id,
                            },

                            memberPayments: registration.memberPayments,
                          }}
                        />
                      </Col>
                    ))
                  ) : tournaments.length === 0 && activeTab !== "history" ? (
                    <Col xs={12}>
                      <Alert color="danger">No tournaments found.</Alert>
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
                        <TournamentCard item={tournament} isRegister={true} />
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
                        minWidth: "40px",
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
                            backgroundColor:
                              pageNum === currentPage ? "#FFD600" : undefined,
                            padding: "8px 14px",
                            border:
                              pageNum === currentPage
                                ? "none"
                                : "1px solid #D0D5DD",
                            borderRadius: "8px",
                            minWidth: "40px",
                            fontWeight: 500,
                          }}
                        >
                          {pageNum}
                        </Button>
                      );
                    })}
                    <Button
                      color="light"
                      disabled={currentPage === totalPages}
                      onClick={() =>
                        setCurrentPage((p) => Math.min(totalPages, p + 1))
                      }
                      style={{
                        padding: "8px 14px",
                        border: "1px solid #D0D5DD",
                        borderRadius: "8px",
                        minWidth: "40px",
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
                    {indexOfFirstItem + 1} -{" "}
                    {Math.min(indexOfLastItem, tournaments.length)} of{" "}
                    {tournaments.length} items
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
