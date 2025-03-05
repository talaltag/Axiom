import React, { useState } from "react";
import AdminDashboardLayout from "../../components/layouts/AdminDashboardLayout";
import { Container, Row, Col, Card, CardBody, Button, Table, Pagination, PaginationItem, PaginationLink } from "reactstrap";
import Image from "next/image";
import { ArrowLeft, Plus, Send, ArrowLeft as ArrowLeftIcon } from "react-feather";
import Link from "next/link";

export default function Payouts() {
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 5;

  const handlePageClick = (pageNumber: number) => {
    setActivePage(pageNumber);
  };

  const data = [
    { tournament: "Fortnite Tournament", id: "#52341", mode: "Solo", date: "Jan 10, 2023", prize: "$500" },
    { tournament: "CoD Warzone", id: "#52342", mode: "Team", date: "Jan 12, 2023", prize: "$1000" },
    { tournament: "PUBG Mobile", id: "#52343", mode: "Duo", date: "Jan 15, 2023", prize: "$750" },
    { tournament: "Free Fire", id: "#52344", mode: "Squad", date: "Jan 18, 2023", prize: "$1200" },
    { tournament: "Valorant", id: "#52345", mode: "Team", date: "Jan 20, 2023", prize: "$1500" },
    { tournament: "League of Legends", id: "#52346", mode: "Team", date: "Jan 23, 2023", prize: "$2000" },
    { tournament: "DOTA 2", id: "#52347", mode: "Team", date: "Jan 25, 2023", prize: "$1800" },
    { tournament: "CS:GO", id: "#52348", mode: "Team", date: "Jan 28, 2023", prize: "$1600" },
    { tournament: "Rocket League", id: "#52349", mode: "Team", date: "Jan 30, 2023", prize: "$900" },
    { tournament: "Apex Legends", id: "#52350", mode: "Team", date: "Feb 1, 2023", prize: "$1100" },
  ];

  // Calculate the total number of pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Calculate pagination display range
  const maxPagesToShow = 3;
  let startPage = Math.max(1, activePage - Math.floor(maxPagesToShow / 2));
  let endPage = startPage + maxPagesToShow - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  return (
    <AdminDashboardLayout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="mb-0">Payouts</h3>
      </div>

      <Row className="mb-4">
        <Col md={8}>
          <Row>
            <Col md={6} className="mb-4">
              <Card className="border-0" style={{ boxShadow: "0px 1px 3px rgba(16, 24, 40, 0.1)", borderRadius: "8px" }}>
                <CardBody className="p-4">
                  <div style={{ color: "#667085", fontSize: "14px", fontWeight: 500, marginBottom: "6px" }}>Tournament Payout</div>
                  <h4 style={{ fontSize: "24px", fontWeight: 600, marginBottom: "12px", color: "#101828" }}>$ 2734</h4>
                  <div className="position-relative" style={{ height: "80px" }}>
                    <Image src="/admin/chart-green.svg" layout="fill" objectFit="contain" alt="Chart" />
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col md={6} className="mb-4">
              <Card className="border-0" style={{ boxShadow: "0px 1px 3px rgba(16, 24, 40, 0.1)", borderRadius: "8px" }}>
                <CardBody className="p-4">
                  <div style={{ color: "#667085", fontSize: "14px", fontWeight: 500, marginBottom: "6px" }}>Owners Payout</div>
                  <h4 style={{ fontSize: "24px", fontWeight: 600, marginBottom: "12px", color: "#101828" }}>$ 2734</h4>
                  <div className="position-relative" style={{ height: "80px" }}>
                    <Image src="/admin/chart-green.svg" layout="fill" objectFit="contain" alt="Chart" />
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col md={6} className="mb-4">
              <Card className="border-0" style={{ boxShadow: "0px 1px 3px rgba(16, 24, 40, 0.1)", borderRadius: "8px" }}>
                <CardBody className="p-4">
                  <div style={{ color: "#667085", fontSize: "14px", fontWeight: 500, marginBottom: "6px" }}>Refunds/Dispute</div>
                  <h4 style={{ fontSize: "24px", fontWeight: 600, marginBottom: "12px", color: "#101828" }}>$ 2734</h4>
                  <div className="position-relative" style={{ height: "80px" }}>
                    <Image src="/admin/chart-green.svg" layout="fill" objectFit="contain" alt="Chart" />
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col md={6} className="mb-4">
              <Card className="border-0" style={{ boxShadow: "0px 1px 3px rgba(16, 24, 40, 0.1)", borderRadius: "8px" }}>
                <CardBody className="p-4">
                  <div style={{ color: "#667085", fontSize: "14px", fontWeight: 500, marginBottom: "6px" }}>Credits/Crypto</div>
                  <h4 style={{ fontSize: "24px", fontWeight: 600, marginBottom: "12px", color: "#101828" }}>$ 2734</h4>
                  <div className="position-relative" style={{ height: "80px" }}>
                    <Image src="/admin/chart-green.svg" layout="fill" objectFit="contain" alt="Chart" />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col md={4}>
          <Card className="border-0 h-100" style={{ boxShadow: "0px 1px 3px rgba(16, 24, 40, 0.1)", borderRadius: "8px" }}>
            <CardBody className="p-4 d-flex flex-column">
              <div className="text-center mb-2">
                <h2 style={{ fontSize: "32px", fontWeight: 600, margin: 0, color: "#101828" }}>$68,790</h2>
                <div style={{ color: "#667085", fontSize: "14px", fontWeight: 500 }}>Available Funds</div>
              </div>

              <div className="mt-4">
                <div style={{ fontSize: "16px", fontWeight: 500, color: "#101828", marginBottom: "8px" }}>Main Account</div>
                <div style={{ color: "#667085", fontSize: "14px", marginBottom: "4px" }}>John Doe</div>
                <div style={{ color: "#667085", fontSize: "14px", marginBottom: "20px" }}>
                  <span className="me-2">1234</span>
                  <span className="me-2">1123</span>
                  <span className="me-2">3456</span>
                  <span>0012</span>
                </div>

                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div className="d-flex align-items-center">
                    <div className="d-flex align-items-center justify-content-center me-2" 
                         style={{ width: "32px", height: "32px", borderRadius: "16px", backgroundColor: "#ECFDF3" }}>
                      <span style={{ color: "#12B76A" }}>↑</span>
                    </div>
                    <div>
                      <div style={{ fontSize: "14px", color: "#101828" }}>Credit</div>
                      <div style={{ fontSize: "16px", fontWeight: 500, color: "#101828" }}>$ 3,450</div>
                    </div>
                  </div>

                  <div className="d-flex align-items-center">
                    <div className="d-flex align-items-center justify-content-center me-2" 
                         style={{ width: "32px", height: "32px", borderRadius: "16px", backgroundColor: "#FEF3F2" }}>
                      <span style={{ color: "#F04438" }}>↓</span>
                    </div>
                    <div>
                      <div style={{ fontSize: "14px", color: "#101828" }}>Debit</div>
                      <div style={{ fontSize: "16px", fontWeight: 500, color: "#101828" }}>$ 3,450</div>
                    </div>
                  </div>
                </div>

                <div className="d-flex gap-2">
                  <Button color="warning" className="w-100 py-2" 
                          style={{ backgroundColor: "#FFC700", border: "none", borderRadius: "8px", fontWeight: 500 }}>
                    <span className="me-1">+</span> Add
                  </Button>
                  <Button color="warning" className="w-100 py-2" 
                          style={{ backgroundColor: "#FFC700", border: "none", borderRadius: "8px", fontWeight: 500 }}>
                    <span className="me-1">↗</span> Send
                  </Button>
                  <Button color="warning" className="w-100 py-2" 
                          style={{ backgroundColor: "#FFC700", border: "none", borderRadius: "8px", fontWeight: 500 }}>
                    <span className="me-1">←</span> Request
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Card className="border-0 shadow-sm">
        <CardBody>
          <h5 className="mb-4">Recent Payouts</h5>
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

          {totalPages > 1 && (
            <div className="d-flex justify-content-between align-items-center mt-4">
              <Pagination className="mb-0">
                <PaginationItem disabled={activePage === 1}>
                  <PaginationLink previous onClick={() => handlePageClick(activePage - 1)} />
                </PaginationItem>

                {startPage > 1 && (
                  <>
                    <PaginationItem>
                      <PaginationLink onClick={() => handlePageClick(1)}>1</PaginationLink>
                    </PaginationItem>
                    {startPage > 2 && (
                      <PaginationItem disabled>
                        <PaginationLink>...</PaginationLink>
                      </PaginationItem>
                    )}
                  </>
                )}

                {pages.map((page) => (
                  <PaginationItem key={page} active={page === activePage}>
                    <PaginationLink onClick={() => handlePageClick(page)}>
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                {endPage < totalPages && (
                  <>
                    {endPage < totalPages - 1 && (
                      <PaginationItem disabled>
                        <PaginationLink>...</PaginationLink>
                      </PaginationItem>
                    )}
                    <PaginationItem>
                      <PaginationLink onClick={() => handlePageClick(totalPages)}>
                        {totalPages}
                      </PaginationLink>
                    </PaginationItem>
                  </>
                )}

                <PaginationItem disabled={activePage === totalPages}>
                  <PaginationLink next onClick={() => handlePageClick(activePage + 1)} />
                </PaginationItem>
              </Pagination>

              <div>
                Showing {(activePage - 1) * itemsPerPage + 1} to{" "}
                {Math.min(activePage * itemsPerPage, data.length)} of {data.length} entries
              </div>
            </div>
          )}
        </CardBody>
      </Card>
    </AdminDashboardLayout>
  );
}