import React, { useState } from "react";
import AdminDashboardLayout from "../../components/layouts/AdminDashboardLayout";
import { Container, Row, Col, Card, CardBody, Button, Table, Pagination, PaginationItem, PaginationLink } from "reactstrap";
import Image from "next/image";
import { ArrowLeft, Plus, Send, ArrowLeft as ArrowLeftIcon } from "react-feather";
import Link from "next/link";

export default function AdminPayouts() {
  const [activePage, setActivePage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

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

        <Row className="mb-4 gy-4">
          <Col md={3}>
            <Card className="h-100 border-0 shadow-sm" style={{ borderRadius: "8px" }}>
              <CardBody className="p-4">
                <h6 className="mb-2" style={{ color: "#667085", fontSize: "14px", fontWeight: "500" }}>Tournament Payout</h6>
                <h3 className="mb-3" style={{ fontSize: "24px", fontWeight: "600" }}>$ 2734</h3>
                <div style={{ height: "80px" }}>
                  <Image
                    src="/admin/chart-green.svg"
                    alt="Chart"
                    width={200}
                    height={80}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="h-100 border-0 shadow-sm" style={{ borderRadius: "8px" }}>
              <CardBody className="p-4">
                <h6 className="mb-2" style={{ color: "#667085", fontSize: "14px", fontWeight: "500" }}>Owners Payout</h6>
                <h3 className="mb-3" style={{ fontSize: "24px", fontWeight: "600" }}>$ 2734</h3>
                <div style={{ height: "80px" }}>
                  <Image
                    src="/admin/chart-green.svg"
                    alt="Chart"
                    width={200}
                    height={80}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="h-100 border-0 shadow-sm" style={{ borderRadius: "8px" }}>
              <CardBody className="p-4">
                <div className="text-center mb-0">
                  <h2 style={{ fontSize: "36px", fontWeight: "600", marginBottom: "4px" }}>$68,790</h2>
                  <p style={{ color: "#667085", fontSize: "14px", marginBottom: "16px" }}>Available Funds</p>

                  <div className="text-start">
                    <h6 style={{ color: "#101828", marginBottom: "4px", fontSize: "14px", fontWeight: "500" }}>Main Account</h6>
                    <p style={{ color: "#667085", fontSize: "14px", marginBottom: "4px" }}>John Doe</p>
                    <div style={{ marginBottom: "16px" }}>
                      <span style={{ color: "#667085", fontSize: "14px", marginRight: "8px" }}>1234</span>
                      <span style={{ color: "#667085", fontSize: "14px", marginRight: "8px" }}>1123</span>
                      <span style={{ color: "#667085", fontSize: "14px", marginRight: "8px" }}>3456</span>
                      <span style={{ color: "#667085", fontSize: "14px" }}>0012</span>
                    </div>

                    <div className="d-flex justify-content-between mb-4">
                      <div className="d-flex align-items-center">
                        <div className="d-flex justify-content-center align-items-center" style={{ backgroundColor: "#ECFDF3", width: "28px", height: "28px", borderRadius: "50%", marginRight: "8px" }}>
                          <span style={{ color: "#12B76A", fontSize: "12px" }}>↑</span>
                        </div>
                        <div>
                          <div style={{ color: "#101828", fontSize: "14px" }}>Credit</div>
                          <div style={{ color: "#101828", fontWeight: "500" }}>$ 3,450</div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center">
                        <div className="d-flex justify-content-center align-items-center" style={{ backgroundColor: "#FFF4ED", width: "28px", height: "28px", borderRadius: "50%", marginRight: "8px" }}>
                          <span style={{ color: "#F79009", fontSize: "12px" }}>↓</span>
                        </div>
                        <div>
                          <div style={{ color: "#101828", fontSize: "14px" }}>Debit</div>
                          <div style={{ color: "#101828", fontWeight: "500" }}>$ 3,450</div>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex gap-2">
                      <Button 
                        color="warning" 
                        className="d-flex align-items-center justify-content-center gap-2"
                        style={{ backgroundColor: "#FFD600", border: "none", flex: "1", borderRadius: "8px" }}
                      >
                        <Plus size={16} />
                        <span>Add</span>
                      </Button>
                      <Button 
                        color="warning" 
                        className="d-flex align-items-center justify-content-center gap-2"
                        style={{ backgroundColor: "#FFD600", border: "none", flex: "1", borderRadius: "8px" }}
                      >
                        <Send size={16} />
                        <span>Send</span>
                      </Button>
                      <Button 
                        color="warning" 
                        className="d-flex align-items-center justify-content-center gap-2"
                        style={{ backgroundColor: "#FFD600", border: "none", flex: "1", borderRadius: "8px" }}
                      >
                        <ArrowLeftIcon size={16} />
                        <span>Request</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="h-100 border-0 shadow-sm" style={{ borderRadius: "8px" }}>
              <CardBody className="p-4">
                <h6 className="mb-2" style={{ color: "#667085", fontSize: "14px", fontWeight: "500" }}>Refunds/Dispute</h6>
                <h3 className="mb-3" style={{ fontSize: "24px", fontWeight: "600" }}>$ 2734</h3>
                <div style={{ height: "80px" }}>
                  <Image
                    src="/admin/chart-green.svg"
                    alt="Chart"
                    width={200}
                    height={80}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="h-100 border-0 shadow-sm" style={{ borderRadius: "8px" }}>
              <CardBody className="p-4">
                <h6 className="mb-2" style={{ color: "#667085", fontSize: "14px", fontWeight: "500" }}>Credits/Crypto</h6>
                <h3 className="mb-3" style={{ fontSize: "24px", fontWeight: "600" }}>$ 2734</h3>
                <div style={{ height: "80px" }}>
                  <Image
                    src="/admin/chart-green.svg"
                    alt="Chart"
                    width={200}
                    height={80}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Card className="border-0 shadow-sm mb-4">
          <CardBody>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="mb-0">Recent Tournament Registrations</h5>
              <div className="d-flex gap-2">
                <Button color="primary" outline size="sm">
                  All
                </Button>
                <Button color="primary" outline size="sm">
                  Team
                </Button>
                <Button color="primary" outline size="sm">
                  Solo
                </Button>
              </div>
            </div>

            <div className="table-responsive">
              <Table hover className="mb-0">
                <thead>
                  <tr>
                    <th>Tournament</th>
                    <th>ID</th>
                    <th>Mode</th>
                    <th>Date</th>
                    <th>Prize</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data
                    .slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage)
                    .map((item, index) => (
                      <tr key={index}>
                        <td>{item.tournament}</td>
                        <td>{item.id}</td>
                        <td>{item.mode}</td>
                        <td>{item.date}</td>
                        <td>{item.prize}</td>
                        <td className="text-center">
                          <Button color="link" className="p-0">
                            View
                          </Button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </div>
          </CardBody>
        </Card>

        <div className="d-flex justify-content-between align-items-center">
          <Pagination>
            <PaginationItem disabled={activePage === 1}>
              <PaginationLink previous onClick={() => handlePageChange(activePage - 1)} />
            </PaginationItem>
            {[...Array(Math.ceil(data.length / itemsPerPage))].map((_, i) => (
              <PaginationItem active={activePage === i + 1} key={i}>
                <PaginationLink onClick={() => handlePageChange(i + 1)}>
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem disabled={activePage === Math.ceil(data.length / itemsPerPage)}>
              <PaginationLink next onClick={() => handlePageChange(activePage + 1)} />
            </PaginationItem>
          </Pagination>

          <div className="d-flex align-items-center">
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