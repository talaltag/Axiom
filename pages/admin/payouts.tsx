
import React, { useState } from "react";
import AdminDashboardLayout from "../../components/layouts/AdminDashboardLayout";
import { Container, Row, Col, Card, CardBody, Button, Table, Pagination, PaginationItem, PaginationLink } from "reactstrap";
import Image from "next/image";
import { ArrowLeft } from "react-feather";
import Link from "next/link";

export default function AdminPayouts() {
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 10;

  const data = [
    { tournament: "Pubg Summer Camp", id: "C-2142", mode: "Team", date: "8/22/2023", prize: "$2000" },
    { tournament: "COD- No mercy Death", id: "C-2142", mode: "Solo", date: "8/22/2023", prize: "$2000" },
    { tournament: "Valorant Midnight Special", id: "C-2142", mode: "Team", date: "8/22/2023", prize: "$2000" },
    { tournament: "COD- No mercy Deathme", id: "C-2142", mode: "Solo", date: "8/22/2023", prize: "$2000" },
    { tournament: "Pubg Summer Camp", id: "C-2142", mode: "Team", date: "8/22/2023", prize: "$2000" },
    { tournament: "Valorant Midnight Special", id: "C-2142", mode: "Solo", date: "8/22/2023", prize: "$2000" },
    { tournament: "COD- No mercy Deathmatch", id: "C-2142", mode: "Team", date: "8/22/2023", prize: "$2000" },
    { tournament: "COD- No mercy Deathme", id: "C-2142", mode: "Team", date: "8/22/2023", prize: "$2000" },
  ];

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  return (
    <AdminDashboardLayout>
      <Container fluid className="p-4">
        <div className="d-flex align-items-center mb-4">
          <Link href="/admin/dashboard">
            <div className="d-flex align-items-center" style={{ cursor: "pointer" }}>
              <ArrowLeft size={20} className="me-2" />
            </div>
          </Link>
          <h4 className="mb-0 ms-2">Pay Outs</h4>
        </div>

        <Row className="mb-4">
          <Col md={3}>
            <Card className="h-100 border-0" style={{ boxShadow: "0 2px 6px rgba(0,0,0,0.08)" }}>
              <CardBody>
                <h6 className="mb-3">Tournament Payout</h6>
                <h4 className="mb-3">$ 2734</h4>
                <div style={{ height: "80px" }}>
                  <Image
                    src="/admin/chart-green.svg"
                    alt="Chart"
                    width={200}
                    height={80}
                    className="mb-2"
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="h-100 border-0" style={{ boxShadow: "0 2px 6px rgba(0,0,0,0.08)" }}>
              <CardBody>
                <h6 className="mb-3">Owners Payout</h6>
                <h4 className="mb-3">$ 2734</h4>
                <div style={{ height: "80px" }}>
                  <Image
                    src="/admin/chart-green.svg"
                    alt="Chart"
                    width={200}
                    height={80}
                    className="mb-2"
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="h-100 border-0" style={{ boxShadow: "0 2px 6px rgba(0,0,0,0.08)" }}>
              <CardBody className="d-flex flex-column">
                <div className="text-center mb-3">
                  <h2 className="mb-1">$68,790</h2>
                  <p className="text-muted mb-3">Available Funds</p>
                </div>
                
                <div className="mb-4">
                  <h6 className="mb-2">Main Account</h6>
                  <div className="d-flex mb-2">
                    <span>John Doe</span>
                  </div>
                  <div className="d-flex mb-3">
                    <span className="text-muted">1234 1123 3456 0012</span>
                  </div>
                  
                  <div className="d-flex justify-content-between mb-4">
                    <div className="d-flex align-items-center">
                      <div 
                        style={{ 
                          width: "24px", 
                          height: "24px", 
                          borderRadius: "50%", 
                          backgroundColor: "#4CAF50",
                          marginRight: "10px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "white",
                          fontSize: "14px"
                        }}
                      >
                        ↑
                      </div>
                      <div>
                        <div>Credit</div>
                        <div>$ 3,450</div>
                      </div>
                    </div>
                    
                    <div className="d-flex align-items-center">
                      <div 
                        style={{ 
                          width: "24px", 
                          height: "24px", 
                          borderRadius: "50%", 
                          backgroundColor: "#FF9800",
                          marginRight: "10px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "white",
                          fontSize: "14px"
                        }}
                      >
                        ↓
                      </div>
                      <div>
                        <div>Debit</div>
                        <div>$ 3,450</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="d-flex gap-2 mt-auto">
                  <Button 
                    className="px-4 py-2" 
                    style={{ 
                      backgroundColor: "#FFC107", 
                      border: "none", 
                      borderRadius: "4px",
                      color: "#000",
                      fontWeight: "500",
                      flex: "1"
                    }}
                  >
                    <span className="me-2">+</span> Add
                  </Button>
                  <Button 
                    className="px-4 py-2" 
                    style={{ 
                      backgroundColor: "#FFC107", 
                      border: "none", 
                      borderRadius: "4px",
                      color: "#000",
                      fontWeight: "500",
                      flex: "1"
                    }}
                  >
                    <span className="me-2">→</span> Send
                  </Button>
                  <Button 
                    className="px-4 py-2" 
                    style={{ 
                      backgroundColor: "#FFC107", 
                      border: "none", 
                      borderRadius: "4px",
                      color: "#000",
                      fontWeight: "500",
                      flex: "1"
                    }}
                  >
                    <span className="me-2">←</span> Request
                  </Button>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={3}>
            <Card className="h-100 border-0" style={{ boxShadow: "0 2px 6px rgba(0,0,0,0.08)" }}>
              <CardBody>
                <h6 className="mb-3">Refunds/Dispute</h6>
                <h4 className="mb-3">$ 2734</h4>
                <div style={{ height: "80px" }}>
                  <Image
                    src="/admin/chart-green.svg"
                    alt="Chart"
                    width={200}
                    height={80}
                    className="mb-2"
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="h-100 border-0" style={{ boxShadow: "0 2px 6px rgba(0,0,0,0.08)" }}>
              <CardBody>
                <h6 className="mb-3">Credits/Crypto</h6>
                <h4 className="mb-3">$ 2734</h4>
                <div style={{ height: "80px" }}>
                  <Image
                    src="/admin/chart-green.svg"
                    alt="Chart"
                    width={200}
                    height={80}
                    className="mb-2"
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <div className="mb-3">
          <h4>Tournament Won - History</h4>
        </div>

        <div className="table-responsive mb-4">
          <Table hover className="bg-white" style={{ borderCollapse: "separate", borderSpacing: "0 8px" }}>
            <thead>
              <tr style={{ backgroundColor: "#f8f9fa" }}>
                <th>Tournament</th>
                <th>ID</th>
                <th>Mode</th>
                <th>Date</th>
                <th>Prize</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.tournament}</td>
                  <td>{item.id}</td>
                  <td>{item.mode}</td>
                  <td>{item.date}</td>
                  <td>{item.prize}</td>
                  <td>
                    <Button 
                      color="link" 
                      className="p-0" 
                      style={{ textDecoration: "none", color: "#0056b3" }}
                    >
                      View Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <Pagination>
              <PaginationItem>
                <PaginationLink previous href="#" />
              </PaginationItem>
              {[1, 2, 3, 4, 5, 6].map((page) => (
                <PaginationItem key={page} active={activePage === page}>
                  <PaginationLink
                    onClick={() => handlePageChange(page)}
                    style={{
                      backgroundColor: activePage === page ? "#FFC107" : "white",
                      color: activePage === page ? "black" : "#6c757d",
                      borderColor: "#dee2e6"
                    }}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationLink next href="#" />
              </PaginationItem>
            </Pagination>

            <div className="ms-3 d-flex align-items-center">
              <select 
                className="form-select form-select-sm" 
                style={{ width: "60px" }}
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
              >
                <option value="10">10</option>
                <option value="12">12</option>
              </select>
              <span className="ms-2">Items per page</span>
            </div>
          </div>
          <div>
            <small className="text-muted">1 - 5 of 10 items</small>
          </div>
        </div>
      </Container>
    </AdminDashboardLayout>
  );
}
