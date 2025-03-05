import React, { useState } from "react";
import AdminDashboardLayout from "../../components/layouts/AdminDashboardLayout";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import Image from "next/image";
import { ArrowLeft, Plus, Send, ArrowUp, ArrowDown } from "react-feather";
import Link from "next/link";

export default function Payouts() {
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 5;

  const handlePageClick = (pageNumber: number) => {
    setActivePage(pageNumber);
  };

  const data = [
    {
      tournament: "Fortnite Tournament",
      id: "#52341",
      mode: "Solo",
      date: "Jan 10, 2023",
      prize: "$500",
    },
    {
      tournament: "CoD Warzone",
      id: "#52342",
      mode: "Team",
      date: "Jan 12, 2023",
      prize: "$1000",
    },
    {
      tournament: "PUBG Mobile",
      id: "#52343",
      mode: "Duo",
      date: "Jan 15, 2023",
      prize: "$750",
    },
    {
      tournament: "Free Fire",
      id: "#52344",
      mode: "Squad",
      date: "Jan 18, 2023",
      prize: "$1200",
    },
    {
      tournament: "Valorant",
      id: "#52345",
      mode: "Team",
      date: "Jan 20, 2023",
      prize: "$1500",
    },
    {
      tournament: "League of Legends",
      id: "#52346",
      mode: "Team",
      date: "Jan 23, 2023",
      prize: "$2000",
    },
    {
      tournament: "DOTA 2",
      id: "#52347",
      mode: "Team",
      date: "Jan 25, 2023",
      prize: "$1800",
    },
    {
      tournament: "CS:GO",
      id: "#52348",
      mode: "Team",
      date: "Jan 28, 2023",
      prize: "$1600",
    },
    {
      tournament: "Rocket League",
      id: "#52349",
      mode: "Team",
      date: "Jan 30, 2023",
      prize: "$900",
    },
    {
      tournament: "Apex Legends",
      id: "#52350",
      mode: "Team",
      date: "Feb 1, 2023",
      prize: "$1100",
    },
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

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i,
  );

  return (
    <AdminDashboardLayout>
      <div className="p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="mb-0">Payouts</h3>
        </div>

        <Row className="mb-4">
          <Col md={8}>
            <Row>
              <Col md={6} className="mb-4">
                <Card
                  className="border-0"
                  style={{
                    boxShadow: "0px 1px 3px rgba(16, 24, 40, 0.1)",
                    borderRadius: "8px",
                  }}
                >
                  <CardBody className="p-4">
                    <div
                      style={{
                        color: "#667085",
                        fontSize: "14px",
                        fontWeight: 500,
                        marginBottom: "6px",
                      }}
                    >
                      Tournament Payout
                    </div>
                    <h4
                      style={{
                        fontSize: "24px",
                        fontWeight: 600,
                        marginBottom: "12px",
                        color: "#101828",
                      }}
                    >
                      $ 2734
                    </h4>
                    <div
                      className="position-relative"
                      style={{ height: "80px", width: "100%" }}
                    >
                      <Image
                        src="/admin/chart-green.svg"
                        layout="fill"
                        objectFit="cover"
                        alt="Chart"
                        priority
                      />
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col md={6} className="mb-4">
                <Card
                  className="border-0"
                  style={{
                    boxShadow: "0px 1px 3px rgba(16, 24, 40, 0.1)",
                    borderRadius: "8px",
                  }}
                >
                  <CardBody className="p-4">
                    <div
                      style={{
                        color: "#667085",
                        fontSize: "14px",
                        fontWeight: 500,
                        marginBottom: "6px",
                      }}
                    >
                      Owners Payout
                    </div>
                    <h4
                      style={{
                        fontSize: "24px",
                        fontWeight: 600,
                        marginBottom: "12px",
                        color: "#101828",
                      }}
                    >
                      $ 2734
                    </h4>
                    <div
                      className="position-relative"
                      style={{ height: "80px", width: "100%" }}
                    >
                      <Image
                        src="/admin/chart-green.svg"
                        layout="fill"
                        objectFit="cover"
                        alt="Chart"
                        priority
                      />
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-4">
                <Card
                  className="border-0"
                  style={{
                    boxShadow: "0px 1px 3px rgba(16, 24, 40, 0.1)",
                    borderRadius: "8px",
                  }}
                >
                  <CardBody className="p-4">
                    <div
                      style={{
                        color: "#667085",
                        fontSize: "14px",
                        fontWeight: 500,
                        marginBottom: "6px",
                      }}
                    >
                      Refunds/Dispute
                    </div>
                    <h4
                      style={{
                        fontSize: "24px",
                        fontWeight: 600,
                        marginBottom: "12px",
                        color: "#101828",
                      }}
                    >
                      $ 2734
                    </h4>
                    <div
                      className="position-relative"
                      style={{ height: "80px", width: "100%" }}
                    >
                      <Image
                        src="/admin/chart-green.svg"
                        layout="fill"
                        objectFit="cover"
                        alt="Chart"
                        priority
                      />
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col md={6} className="mb-4">
                <Card
                  className="border-0"
                  style={{
                    boxShadow: "0px 1px 3px rgba(16, 24, 40, 0.1)",
                    borderRadius: "8px",
                  }}
                >
                  <CardBody className="p-4">
                    <div
                      style={{
                        color: "#667085",
                        fontSize: "14px",
                        fontWeight: 500,
                        marginBottom: "6px",
                      }}
                    >
                      Credits/Crypto
                    </div>
                    <h4
                      style={{
                        fontSize: "24px",
                        fontWeight: 600,
                        marginBottom: "12px",
                        color: "#101828",
                      }}
                    >
                      $ 2734
                    </h4>
                    <div
                      className="position-relative"
                      style={{ height: "80px", width: "100%" }}
                    >
                      <Image
                        src="/admin/chart-green.svg"
                        layout="fill"
                        objectFit="cover"
                        alt="Chart"
                        priority
                      />
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Col>
          <Col md={4}>
            <Card
              className="border-0 h-100"
              style={{
                boxShadow: "0px 1px 3px rgba(16, 24, 40, 0.1)",
                borderRadius: "8px",
                backgroundColor: "#F9FAFB",
              }}
            >
              <CardBody className="p-4">
                <div className="text-center mb-4">
                  <h2
                    style={{
                      fontSize: "36px",
                      fontWeight: 600,
                      color: "#101828",
                      margin: 0,
                    }}
                  >
                    $68,790
                  </h2>
                  <div style={{ color: "#667085", fontSize: "16px" }}>
                    Available Funds
                  </div>
                </div>
                
                <div className="mb-4">
                  <div style={{ fontSize: "16px", fontWeight: 500, marginBottom: "8px" }}>
                    Main Account
                  </div>
                  <div style={{ fontSize: "14px", color: "#101828" }}>
                    John Doe
                  </div>
                  <div style={{ fontSize: "12px", color: "#667085" }}>
                    1234 1123 3456 0012
                  </div>
                </div>

                <div className="mb-4">
                  <div
                    style={{
                      fontWeight: 500,
                      fontSize: "16px",
                      color: "#101828",
                      marginBottom: "8px",
                    }}
                  >
                    Main Account
                  </div>
                  <div
                    style={{
                      fontSize: "14px",
                      color: "#667085",
                      marginBottom: "4px",
                    }}
                  >
                    John Doe
                  </div>
                  <div style={{ fontSize: "14px", color: "#667085" }}>
                    <span style={{ marginRight: "8px" }}>1234</span>
                    <span style={{ marginRight: "8px" }}>1123</span>
                    <span style={{ marginRight: "8px" }}>3456</span>
                    <span>0012</span>
                  </div>
                </div>

                <div className="d-flex justify-content-between mb-4">
                  <div className="d-flex align-items-center">
                    <div
                      style={{
                        width: "24px",
                        height: "24px",
                        backgroundColor: "#ECFDF3",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: "8px",
                      }}
                    >
                      <ArrowUp size={16} style={{ color: "#12B76A" }} />
                    </div>
                    <div>
                      <div style={{ fontSize: "14px", color: "#101828" }}>
                        Credit
                      </div>
                      <div
                        style={{
                          fontSize: "14px",
                          fontWeight: 500,
                          color: "#101828",
                        }}
                      >
                        $ 3,450
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <div
                      style={{
                        width: "24px",
                        height: "24px",
                        backgroundColor: "#FFF4ED",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: "8px",
                      }}
                    >
                      <ArrowDown size={16} style={{ color: "#F79009" }} />
                    </div>
                    <div>
                      <div style={{ fontSize: "14px", color: "#101828" }}>
                        Debit
                      </div>
                      <div
                        style={{
                          fontSize: "14px",
                          fontWeight: 500,
                          color: "#101828",
                        }}
                      >
                        $ 3,450
                      </div>
                    </div>
                  </div>
                </div>

                <div className="d-flex gap-2">
                  <Button
                    color="warning"
                    block
                    style={{
                      backgroundColor: "#FFCC00",
                      color: "#101828",
                      border: "none",
                      fontWeight: 500,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Plus size={16} style={{ marginRight: "8px" }} /> Add
                  </Button>
                  <Button
                    color="warning"
                    block
                    style={{
                      backgroundColor: "#FFCC00",
                      color: "#101828",
                      border: "none",
                      fontWeight: 500,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Send size={16} style={{ marginRight: "8px" }} /> Send
                  </Button>
                  <Button
                    color="warning"
                    block
                    style={{
                      backgroundColor: "#FFCC00",
                      color: "#101828",
                      border: "none",
                      fontWeight: 500,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <ArrowLeft size={16} style={{ marginRight: "8px" }} />{" "}
                    Request
                  </Button>
                <div className="d-flex justify-content-between">
                  <Button
                    style={{
                      backgroundColor: "#FFD600",
                      border: "none",
                      borderRadius: "6px",
                      padding: "8px 16px",
                      fontSize: "14px",
                      fontWeight: 500,
                      color: "#101828",
                      width: "30%",
                    }}
                  >
                    <span className="mr-1">+</span> Add
                  </Button>
                  <Button
                    style={{
                      backgroundColor: "#FFD600",
                      border: "none",
                      borderRadius: "6px",
                      padding: "8px 16px",
                      fontSize: "14px",
                      fontWeight: 500,
                      color: "#101828",
                      width: "30%",
                    }}
                  >
                    <i className="fas fa-paper-plane mr-1" style={{ fontSize: "12px" }}></i> Send
                  </Button>
                  <Button
                    style={{
                      backgroundColor: "#FFD600",
                      border: "none",
                      borderRadius: "6px",
                      padding: "8px 16px",
                      fontSize: "14px",
                      fontWeight: 500,
                      color: "#101828",
                      width: "30%",
                    }}
                  >
                    <i className="fas fa-arrow-left mr-1" style={{ fontSize: "12px" }}></i> Request
                  </Button>
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
                    .slice(
                      (activePage - 1) * itemsPerPage,
                      activePage * itemsPerPage,
                    )
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
                    <PaginationLink
                      previous
                      onClick={() => handlePageClick(activePage - 1)}
                    />
                  </PaginationItem>

                  {startPage > 1 && (
                    <>
                      <PaginationItem>
                        <PaginationLink onClick={() => handlePageClick(1)}>
                          1
                        </PaginationLink>
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
                        <PaginationLink
                          onClick={() => handlePageClick(totalPages)}
                        >
                          {totalPages}
                        </PaginationLink>
                      </PaginationItem>
                    </>
                  )}

                  <PaginationItem disabled={activePage === totalPages}>
                    <PaginationLink
                      next
                      onClick={() => handlePageClick(activePage + 1)}
                    />
                  </PaginationItem>
                </Pagination>

                <div>
                  Showing {(activePage - 1) * itemsPerPage + 1} to{" "}
                  {Math.min(activePage * itemsPerPage, data.length)} of{" "}
                  {data.length} entries
                </div>
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    </AdminDashboardLayout>
  );
}
