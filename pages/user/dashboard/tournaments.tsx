
import { useState } from "react";
import UserDashboardLayout from "../../../components/layouts/UserDashboardLayout";
import { Container, Row, Col, Card, CardBody, CardTitle, Button, Input } from "reactstrap";
import Image from "next/image";
import { ArrowRight } from "react-feather";

export default function Tournaments() {
  const [activeTab, setActiveTab] = useState('upcoming');

  return (
    <UserDashboardLayout>
      <Container fluid className="p-4">
        <Row className="mb-4">
          <Col>
            <Card className="border-0 shadow-sm">
              <CardBody>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div>
                    <Button 
                      color={activeTab === 'upcoming' ? "warning" : "light"}
                      className="me-2"
                      onClick={() => setActiveTab('upcoming')}
                    >
                      Upcoming Tournaments
                    </Button>
                    <Button
                      color={activeTab === 'my' ? "warning" : "light"}
                      onClick={() => setActiveTab('my')}
                    >
                      My Tournaments
                    </Button>
                  </div>
                  <div className="d-flex align-items-center">
                    <Input
                      type="search"
                      className="form-control me-2"
                      placeholder="Search tournaments..."
                      style={{ width: '250px' }}
                    />
                  </div>
                </div>
                <Row>
                  {[1, 2, 3].map((_, index) => (
                    <Col md={4} key={index} className="mb-4">
                      <Card className="border-0 shadow-sm h-100">
                        <div style={{ height: "200px", position: "relative" }}>
                          <Image
                            src={`/game-${index === 0 ? 'warzone' : index === 1 ? 'fortnite' : 'pubg'}.jpg`}
                            alt="Game"
                            width={400}
                            height={200}
                            style={{ objectFit: 'cover' }}
                            priority={index === 0}
                          />
                          <div 
                            style={{
                              position: 'absolute',
                              top: '10px',
                              right: '10px',
                              background: 'rgba(255,0,0,0.8)',
                              padding: '4px 8px',
                              borderRadius: '4px',
                              color: 'white',
                              fontSize: '12px'
                            }}
                          >
                            Closing in 10:88:00
                          </div>
                        </div>
                        <CardBody>
                          <CardTitle tag="h5">Fortnite Summer Battle</CardTitle>
                          <div className="text-muted small mb-2">
                            May 23, 2023 • 9:00PM - 10:30PM EST
                          </div>
                          <div className="d-flex justify-content-between align-items-center mb-3">
                            <div>
                              <small className="text-muted d-block">Prize Pool</small>
                              <div className="h6 mb-0">$200</div>
                            </div>
                            <div className="text-end">
                              <small className="text-muted d-block">Entry Fee</small>
                              <div className="h6 mb-0">$500</div>
                            </div>
                          </div>
                          <Button color="warning" className="w-100">
                            Register Now <ArrowRight size={16} className="ms-2" />
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
      </Container>
    </UserDashboardLayout>
  );
}
