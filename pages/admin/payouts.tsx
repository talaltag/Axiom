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
import { ArrowLeft, Plus, Send, ArrowUp, ArrowDown, Eye } from "react-feather";
import Link from "next/link";
import { useRouter } from 'next/router';

export default function Payouts() {
  const router = useRouter();
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 8;

  // Sample data to match the screenshot
  const data = [
    { tournament: "Pubg Summer Camp", tournamentId: "C-2142", mode: "Team", date: "6/22/2023", prize: "$2000", status: "Paid" },
    { tournament: "COD- No mercy Death", tournamentId: "C-2143", mode: "Solo", date: "6/22/2023", prize: "$2000", status: "Pending" },
    { tournament: "Valorant Midnight Special", tournamentId: "C-2144", mode: "Team", date: "6/22/2023", prize: "$2000", status: "Paid" },
    { tournament: "COD- No mercy Deathmar", tournamentId: "C-2145", mode: "Solo", date: "6/22/2023", prize: "$2000", status: "Disputed" },
    { tournament: "Pubg Summer Camp", tournamentId: "C-2146", mode: "Team", date: "6/22/2023", prize: "$2000", status: "Paid" },
    { tournament: "Valorant Midnight Special", tournamentId: "C-2147", mode: "Solo", date: "6/22/2023", prize: "$2000", status: "Pending" },
    { tournament: "COD- No mercy Deathmatch", tournamentId: "C-2148", mode: "Team", date: "6/22/2023", prize: "$2000", status: "Paid" },
    { tournament: "COD- No mercy Deathmar", tournamentId: "C-2149", mode: "Team", date: "6/22/2023", prize: "$2000", status: "Paid" },
  ];

  const handlePageClick = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const indexOfLastItem = activePage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

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
              className="border-0"
              style={{
                boxShadow: "0px 1px 3px rgba(16, 24, 40, 0.1)",
                borderRadius: "8px",
                height: "94% !important",
              }}
            >
              <CardBody className="p-4">
                <div className="text-center">
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

                <div className="mb-4 pt-2">
                  <div
                    style={{
                      background: "#FAFBFC",
                      borderRadius: "12px",
                      padding: "12px",
                    }}
                  >
                    <div>
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
                    <div className="d-flex justify-content-start gap-4">
                      <div
                        className="d-flex align-items-center p-3"
                        style={{ paddingLeft: "0 !important" }}
                      >
                        <div
                          style={{
                            width: "28px",
                            height: "28px",
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
                            width: "28px",
                            height: "28px",
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
                  </div>
                </div>

                <div className="d-flex gap-2 mt-5">
                  <Button
                    color="warning"
                    block
                    style={{
                      height: "42px",
                      width: "100%",
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
                      height: "42px",
                      width: "100%",
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
                      height: "42px",
                      width: "100%",
                      backgroundColor: "#FFCC00",
                      color: "#101828",
                      border: "none",
                      fontWeight: 500,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <ArrowLeft size={16} style={{ marginRight: "8px" }} />
                    Request
                  </Button>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Card className="border-0 shadow-sm">
          <CardBody>
            <div className="table-responsive">
              <div style={{ borderRadius: "8px", overflow: "hidden" }}>
                <h4 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "16px" }}>Tournament Won - History</h4>
                <Table responsive hover style={{ backgroundColor: "white", borderRadius: "8px", overflow: "hidden" }}>
                  <thead style={{ backgroundColor: "#F9FAFB" }}>
                    <tr>
                      <th style={{ fontSize: "14px", fontWeight: "500", color: "#667085", padding: "12px 24px" }}>Tournament</th>
                      <th style={{ fontSize: "14px", fontWeight: "500", color: "#667085", padding: "12px 24px" }}>ID</th>
                      <th style={{ fontSize: "14px", fontWeight: "500", color: "#667085", padding: "12px 24px" }}>Mode</th>
                      <th style={{ fontSize: "14px", fontWeight: "500", color: "#667085", padding: "12px 24px" }}>Date</th>
                      <th style={{ fontSize: "14px", fontWeight: "500", color: "#667085", padding: "12px 24px" }}>Prize</th>
                      <th style={{ fontSize: "14px", fontWeight: "500", color: "#667085", padding: "12px 24px" }}>Status</th>
                      <th style={{ fontSize: "14px", fontWeight: "500", color: "#667085", padding: "12px 24px" }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((item, index) => (
                      <tr key={index}>
                        <td style={{ fontSize: "14px", fontWeight: "500", color: "#101828", padding: "16px 24px" }}>{item.tournament}</td>
                        <td style={{ fontSize: "14px", color: "#667085", padding: "16px 24px" }}>{item.tournamentId}</td>
                        <td style={{ fontSize: "14px", color: "#667085", padding: "16px 24px" }}>{item.mode}</td>
                        <td style={{ fontSize: "14px", color: "#667085", padding: "16px 24px" }}>{item.date}</td>
                        <td style={{ fontSize: "14px", fontWeight: "500", color: "#101828", padding: "16px 24px" }}>{item.prize}</td>
                        <td style={{ fontSize: "14px", color: "#667085", padding: "16px 24px" }}>
                          <span 
                            style={{ 
                              backgroundColor: item.status === "Paid" ? "#D1FAE5" : (item.status === "Pending" ? "#FEF3F2" : "#FFF2DC"), 
                              color: item.status === "Paid" ? "#15803D" : (item.status === "Pending" ? "#B42318" : "#966421"), 
                              padding: "2px 8px", 
                              borderRadius: "16px", 
                              fontSize: "12px" 
                            }}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td style={{ padding: "16px 24px" }}>
                          <Button
                            color="light"
                            size="sm"
                            className="d-flex align-items-center"
                            style={{ 
                              backgroundColor: "#F9FAFB", 
                              borderColor: "#D0D5DD", 
                              color: "#344054",
                              borderRadius: "4px",
                              padding: "6px 12px",
                              fontSize: "14px"
                            }}
                            onClick={() => router.push(`/admin/payouts/${item.id}`)}
                          >
                            <Eye size={14} className="me-1" />
                            <span>View Details</span>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>

            <div className="d-flex justify-content-between align-items-center mt-4">
              <Pagination>
                <PaginationItem disabled={activePage === 1}>
                  <PaginationLink previous onClick={() => handlePageClick(activePage - 1)} />
                </PaginationItem>
                <PaginationItem active={activePage === 1}>
                  <PaginationLink onClick={() => handlePageClick(1)}>1</PaginationLink>
                </PaginationItem>
                <PaginationItem active={activePage === 2}>
                  <PaginationLink onClick={() => handlePageClick(2)}>2</PaginationLink>
                </PaginationItem>
                <PaginationItem active={activePage === 3}>
                  <PaginationLink onClick={() => handlePageClick(3)}>3</PaginationLink>
                </PaginationItem>
                <PaginationItem active={activePage === 4}>
                  <PaginationLink onClick={() => handlePageClick(4)}>4</PaginationLink>
                </PaginationItem>
                <PaginationItem active={activePage === 5}>
                  <PaginationLink onClick={() => handlePageClick(5)}>5</PaginationLink>
                </PaginationItem>
                <PaginationItem active={activePage === 6}>
                  <PaginationLink onClick={() => handlePageClick(6)}>6</PaginationLink>
                </PaginationItem>
                <PaginationItem disabled={activePage === Math.ceil(data.length / itemsPerPage)}>
                  <PaginationLink next onClick={() => handlePageClick(activePage + 1)} />
                </PaginationItem>
              </Pagination>
            </div>
          </CardBody>
        </Card>
      </div>
    </AdminDashboardLayout>
  );
}