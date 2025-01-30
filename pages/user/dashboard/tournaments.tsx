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
} from "reactstrap";
import Image from "next/image";
import { ArrowRight } from "react-feather";
import Loader from "../../../components/common/Loader";
import { useRouter } from "next/router";

export default function Tournaments() {
  const { data: session } = useSession();
  const router = useRouter();
  const [tournaments, setTournaments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("upcoming");
  const [selectedTournament, setSelectedTournament] = useState(null);
  const [registrationModalOpen, setRegistrationModalOpen] = useState(false);

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        setIsLoading(true);
        const url = activeTab === 'my' 
          ? `/api/tournaments?filter=my&userId=${session?.user?.id}`
          : '/api/tournaments';
        const response = await fetch(url);
        const data = await response.json();
        if (data.success) {
          setTournaments(data.data);
        }
      } catch (error) {
        console.error("Error fetching tournaments:", error);
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
                    <Input
                      type="search"
                      className="form-control me-2"
                      placeholder="Search tournaments..."
                      style={{ width: "250px" }}
                    />
                  </div>
                </div>
                <Row>
                  {tournaments.map((tournament, index) => (
                    <Col md={4} key={tournament._id} className="mb-4">
                      <Card className="border-0 shadow-sm h-100">
                        <div style={{ height: "200px", position: "relative" }}>
                          <Image
                            src={`${
                              tournament.images && tournament.images.length > 0
                                ? tournament.images[0]
                                : "/fortnite-banner.png"
                            }`}
                            alt={tournament.game || "Game"}
                            width={400}
                            height={200}
                            style={{
                              objectFit: "cover",
                              width: "100%",
                              height: "100%",
                            }}
                            priority={index === 0}
                          />
                          <div
                            style={{
                              position: "absolute",
                              top: "10px",
                              right: "10px",
                              background: "rgba(255,0,0,0.8)",
                              padding: "4px 8px",
                              borderRadius: "4px",
                              color: "white",
                              fontSize: "12px",
                            }}
                          >
                            {tournament.status}
                          </div>
                        </div>
                        <CardBody>
                          <CardTitle tag="h5">{tournament.name}</CardTitle>
                          <div className="text-muted small mb-2">
                            {tournament.date} • {tournament.time}
                          </div>
                          <div className="d-flex justify-content-between align-items-center mb-3">
                            <div>
                              <small className="text-muted d-block">
                                Prize Pool
                              </small>
                              <div className="h6 mb-0">
                                ${tournament.totalPrizePool}
                              </div>
                            </div>
                            <div className="text-end">
                              <small className="text-muted d-block">
                                Entry Fee
                              </small>
                              <div className="h6 mb-0">
                                ${tournament.entryFee}
                              </div>
                            </div>
                          </div>
                          <Button
                            color="warning"
                            onClick={() =>
                              router.push(
                                `/user/dashboard/register-tournament/${tournament._id}`
                              )
                            }
                          >
                            Register Now{" "}
                            <ArrowRight size={16} className="ms-2" />
                          </Button>
                        </CardBody>
                      </Card>
                    </Col>
                  ))}
                </Row>
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
