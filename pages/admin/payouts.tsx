import React, { useState } from "react";
import AdminDashboardLayout from "../../components/layouts/AdminDashboardLayout";
import { Container, Row, Col, Card, CardBody, Button, Table, Pagination, PaginationItem, PaginationLink } from "reactstrap";
import Image from "next/image";
import { ArrowLeft } from "react-feather";
import Link from "next/link";

export default function AdminPayouts() {
  const [activePage, setActivePage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Added state for itemsPerPage

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

        <Row className="mb-4 g-4">
          <Col sm={6} lg={3}>
            <Card className="border-0 shadow-sm h-100">
              <CardBody className="p-3">
                <div className="mb-1" style={{ fontSize: "14px", color: "#667085" }}>Tournament Payout</div>
                <div className="mb-2" style={{ fontSize: "24px", fontWeight: "600" }}>$ 2734</div>
                <Image
                  src="/admin/chart-green.svg"
                  alt="Chart"
                  width={220}
                  height={84}
                />
              </CardBody>
            </Card>
          </Col>
          <Col sm={6} lg={3}>
            <Card className="border-0 shadow-sm h-100">
              <CardBody className="p-3">
                <div className="mb-1" style={{ fontSize: "14px", color: "#667085" }}>Owners Payout</div>
                <div className="mb-2" style={{ fontSize: "24px", fontWeight: "600" }}>$ 2734</div>
                <Image
                  src="/admin/chart-green.svg"
                  alt="Chart"
                  width={220}
                  height={84}
                />
              </CardBody>
            </Card>
          </Col>
          <Col sm={6} lg={6}>
            <Card className="border-0 shadow-sm h-100">
              <CardBody className="p-3">
                <div className="d-flex flex-column h-100">
                  <div className="text-center mb-1">
                    <div style={{ fontSize: "32px", fontWeight: "700" }}>$68,790</div>
                    <div style={{ fontSize: "14px", color: "#667085" }}>Available Funds</div>
                  </div>

                  <div className="mt-3">
                    <div style={{ fontSize: "16px", fontWeight: "500" }}>Main Account</div>
                    <div style={{ fontSize: "14px", color: "#667085" }}>John Doe</div>
                    <div style={{ fontSize: "12px", color: "#667085", letterSpacing: "0.5px" }}>
                      1234&nbsp;&nbsp;&nbsp;1123&nbsp;&nbsp;&nbsp;3456&nbsp;&nbsp;&nbsp;0012
                    </div>
                  </div>

                  <div className="d-flex align-items-center mt-3">
                    <div className="d-flex align-items-center me-4">
                      <div className="d-flex align-items-center justify-content-center rounded-circle" 
                        style={{ width: "24px", height: "24px", backgroundColor: "#ECFDF3", marginRight: "8px" }}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8 3.33337V12.6667M8 3.33337L12.6667 8.00004M8 3.33337L3.33333 8.00004" stroke="#12B76A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div>
                        <div style={{ fontSize: "12px", color: "#667085" }}>Credit</div>
                        <div style={{ fontSize: "14px", fontWeight: "500" }}>$ 3,450</div>
                      </div>
                    </div>
                    <div className="d-flex align-items-center">
                      <div className="d-flex align-items-center justify-content-center rounded-circle" 
                        style={{ width: "24px", height: "24px", backgroundColor: "#FFF4ED", marginRight: "8px" }}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8 12.6666V3.33329M8 12.6666L3.33333 7.99996M8 12.6666L12.6667 7.99996" stroke="#F79009" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div>
                        <div style={{ fontSize: "12px", color: "#667085" }}>Debit</div>
                        <div style={{ fontSize: "14px", fontWeight: "500" }}>$ 3,450</div>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex gap-2 mt-4">
                    <Button 
                      style={{ 
                        backgroundColor: "#FFDA16", 
                        border: "none", 
                        color: "#000", 
                        fontWeight: "500",
                        padding: "0.5rem 1rem",
                        fontSize: "14px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "0.5rem"
                      }}
                    >
                      <span>+</span> Add
                    </Button>
                    <Button 
                      style={{ 
                        backgroundColor: "#FFDA16", 
                        border: "none", 
                        color: "#000", 
                        fontWeight: "500",
                        padding: "0.5rem 1rem",
                        fontSize: "14px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "0.5rem"
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 8.00004H2M14 8.00004L9.33333 3.33337M14 8.00004L9.33333 12.6667" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Send
                    </Button>
                    <Button 
                      style={{ 
                        backgroundColor: "#FFDA16", 
                        border: "none", 
                        color: "#000", 
                        fontWeight: "500",
                        padding: "0.5rem 1rem",
                        fontSize: "14px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "0.5rem"
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 8.00004H14M2 8.00004L6.66667 3.33337M2 8.00004L6.66667 12.6667" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Request
                    </Button>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col sm={6} lg={3}>
            <Card className="border-0 shadow-sm h-100">
              <CardBody className="p-3">
                <div className="mb-1" style={{ fontSize: "14px", color: "#667085" }}>Refunds/Dispute</div>
                <div className="mb-2" style={{ fontSize: "24px", fontWeight: "600" }}>$ 2734</div>
                <Image
                  src="/admin/chart-green.svg"
                  alt="Chart"
                  width={220}
                  height={84}
                />
              </CardBody>
            </Card>
          </Col>
          <Col sm={6} lg={3}>
            <Card className="border-0 shadow-sm h-100">
              <CardBody className="p-3">
                <div className="mb-1" style={{ fontSize: "14px", color: "#667085" }}>Credits/Crypto</div>
                <div className="mb-2" style={{ fontSize: "24px", fontWeight: "600" }}>$ 2734</div>
                <Image
                  src="/admin/chart-green.svg"
                  alt="Chart"
                  width={220}
                  height={84}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>

        <div className="mb-4">
          <h5 className="mb-4">Tournament Won - History</h5>
          <div className="table-responsive">
            <Table className="bg-white" bordered={false} style={{ borderCollapse: "separate", borderSpacing: "0 0.5rem" }}>
              <thead>
                <tr style={{ backgroundColor: "#F9FAFB" }}>
                  <th style={{ padding: "12px 16px", fontWeight: "500", fontSize: "14px", color: "#667085" }}>Tournament</th>
                  <th style={{ padding: "12px 16px", fontWeight: "500", fontSize: "14px", color: "#667085" }}>ID</th>
                  <th style={{ padding: "12px 16px", fontWeight: "500", fontSize: "14px", color: "#667085" }}>Mode</th>
                  <th style={{ padding: "12px 16px", fontWeight: "500", fontSize: "14px", color: "#667085" }}>Date</th>
                  <th style={{ padding: "12px 16px", fontWeight: "500", fontSize: "14px", color: "#667085" }}>Prize</th>
                  <th style={{ padding: "12px 16px", fontWeight: "500", fontSize: "14px", color: "#667085" }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index} className="shadow-sm" style={{ backgroundColor: "#FFFFFF" }}>
                    <td style={{ padding: "12px 16px", fontSize: "14px", fontWeight: "500" }}>{item.tournament}</td>
                    <td style={{ padding: "12px 16px", fontSize: "14px", color: "#667085" }}>{item.id}</td>
                    <td style={{ padding: "12px 16px", fontSize: "14px", color: "#667085" }}>{item.mode}</td>
                    <td style={{ padding: "12px 16px", fontSize: "14px", color: "#667085" }}>{item.date}</td>
                    <td style={{ padding: "12px 16px", fontSize: "14px", color: "#667085" }}>{item.prize}</td>
                    <td style={{ padding: "12px 16px", fontSize: "14px", color: "#667085" }}>
                      <Button size="sm" color="link" className="text-primary p-0" style={{ textDecoration: "none" }}>
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex">
            <Pagination>
              <PaginationItem>
                <PaginationLink first onClick={() => handlePageChange(1)} />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink previous onClick={() => handlePageChange(Math.max(1, activePage - 1))} />
              </PaginationItem>
              {[...Array(Math.ceil(data.length / itemsPerPage)).keys()].map(page => ( // Corrected pagination range
                  <PaginationItem key={page + 1} active={activePage === page + 1}>
                    <PaginationLink onClick={() => handlePageChange(page + 1)}>
                      {page + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
              <PaginationItem>
                <PaginationLink next onClick={() => handlePageChange(Math.min(Math.ceil(data.length / itemsPerPage), activePage + 1))} />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink last onClick={() => handlePageChange(Math.ceil(data.length / itemsPerPage))} />
              </PaginationItem>
            </Pagination>
            <div className="ms-3 d-flex align-items-center">
              <span style={{ fontSize: "14px", color: "#667085" }}>Items per page:</span>
              <select className="form-select ms-2" style={{ width: "70px", fontSize: "14px" }} value={itemsPerPage} onChange={e => setItemsPerPage(parseInt(e.target.value, 10))}>
                <option value="10">10</option>
                <option value="12">12</option>
              </select>
            </div>
          </div>
          <div style={{ fontSize: "14px", color: "#667085" }}>
            {((activePage - 1) * itemsPerPage) + 1} - {Math.min(activePage * itemsPerPage, data.length)} of {data.length} items
          </div>
        </div>
      </Container>
    </AdminDashboardLayout>
  );
}