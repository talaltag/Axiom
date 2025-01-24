
import { useState } from "react";
import UserDashboardLayout from "../../../components/layouts/UserDashboardLayout";
import { Container, Row, Col, Card, CardBody, CardTitle, CardText, Button, Input } from "reactstrap";
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
                          <CardText>
                            <small className="text-muted d-block mb-2">
                              May 23, 2023 • 9:00PM - 10:30PM EST
                            </small>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                              <div>
                                <small className="text-muted">Prize Pool</small>
                                <h6 className="mb-0">$200</h6>
                              </div>
                              <div className="text-end">
                                <small className="text-muted">Entry Fee</small>
                                <h6 className="mb-0">$500</h6>
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
      </Container>
    </UserDashboardLayout>
  );
}
