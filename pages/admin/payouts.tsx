import React, { useEffect, useState } from "react";
import AdminDashboardLayout from "../../components/layouts/AdminDashboardLayout";
import { Row, Col, Card, CardBody, Button } from "reactstrap";
import Image from "next/image";
import { ArrowLeft, Plus, Send, ArrowUp, ArrowDown } from "react-feather";
import { useRouter } from "next/router";
import PaginationComponent from "../../components/common/PaginationComponent";
import Loader from "../../components/common/Loader";

export default function Payouts() {
  const router = useRouter();
  const [tournaments, setTournaments] = useState(null);
  const [loading, setIsLoading] = useState(false);
  const fetchTournaments = async (page?: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/admin/tournament-win-history?page=${page}`
      );
      const data = await response.json();
      setTournaments(data);
    } catch (error) {
      console.error("Error fetching tournaments:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTournaments();
  }, []);

  const onPageChange = (pageNumber) => {
    const query = `${pageNumber}`;
    fetchTournaments(query);
  };

  return (
    <AdminDashboardLayout>
      <div className="p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="mb-0">Payouts</h3>
        </div>

        {/* <Row className="mb-4">
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
        </Row> */}

        <Card className="border-0 shadow-sm">
          <CardBody>
            {loading ? (
              <Loader />
            ) : (
              <div className="table-responsive">
                <div style={{ borderRadius: "8px", overflow: "hidden" }}>
                  <h4
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      marginBottom: "16px",
                    }}
                  >
                    Tournament Won - History
                  </h4>
                  <table
                    className="table table-striped"
                    style={{ width: "100%", borderCollapse: "collapse" }}
                  >
                    <thead>
                      <tr
                        style={{ backgroundColor: "#F9FAFB", height: "40px" }}
                      >
                        <th
                          style={{
                            padding: "10px 16px",
                            fontSize: "14px",
                            fontWeight: "500",
                            color: "#667085",
                            textAlign: "left",
                            borderBottom: "1px solid #EAECF0",
                          }}
                        >
                          Tournament
                        </th>
                        <th
                          style={{
                            padding: "10px 16px",
                            fontSize: "14px",
                            fontWeight: "500",
                            color: "#667085",
                            textAlign: "left",
                            borderBottom: "1px solid #EAECF0",
                          }}
                        >
                          Mode
                        </th>
                        <th
                          style={{
                            padding: "10px 16px",
                            fontSize: "14px",
                            fontWeight: "500",
                            color: "#667085",
                            textAlign: "left",
                            borderBottom: "1px solid #EAECF0",
                          }}
                        >
                          Date
                        </th>
                        <th
                          style={{
                            padding: "10px 16px",
                            fontSize: "14px",
                            fontWeight: "500",
                            color: "#667085",
                            textAlign: "left",
                            borderBottom: "1px solid #EAECF0",
                          }}
                        >
                          Prize
                        </th>
                        <th
                          style={{
                            padding: "10px 16px",
                            fontSize: "14px",
                            fontWeight: "500",
                            color: "#667085",
                            textAlign: "left",
                            borderBottom: "1px solid #EAECF0",
                          }}
                        >
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {tournaments?.data?.map((item, index) => (
                        <tr
                          key={index}
                          style={{
                            backgroundColor:
                              index % 2 === 0 ? "#FFFFFF" : "#F9FAFB",
                            height: "48px",
                          }}
                        >
                          <td
                            style={{
                              padding: "10px 16px",
                              fontSize: "14px",
                              color: "#101828",
                              borderBottom: "1px solid #EAECF0",
                            }}
                          >
                            {item.tournament.name}
                          </td>
                          <td
                            className="text-transform-capitalize"
                            style={{
                              padding: "10px 16px",
                              fontSize: "14px",
                              color: "#101828",
                              borderBottom: "1px solid #EAECF0",
                            }}
                          >
                            {item.tournament.teamSize}
                          </td>
                          <td
                            style={{
                              padding: "10px 16px",
                              fontSize: "14px",
                              color: "#101828",
                              borderBottom: "1px solid #EAECF0",
                            }}
                          >
                            {item.tournament.date} {item.tournament.time}
                            {"-"}
                            {item.tournament.end}
                          </td>
                          <td
                            style={{
                              padding: "10px 16px",
                              fontSize: "14px",
                              color: "#101828",
                              borderBottom: "1px solid #EAECF0",
                            }}
                          >
                            ${item.tournament.totalPrizePool}
                          </td>
                          <td
                            style={{
                              padding: "10px 16px",
                              fontSize: "14px",
                              color: "#101828",
                              borderBottom: "1px solid #EAECF0",
                            }}
                          >
                            <Button
                              color="light"
                              size="sm"
                              onClick={() =>
                                router.push(
                                  `/admin/payouts/${item.tournament._id}`
                                )
                              }
                              style={{
                                backgroundColor: "transparent",
                                border: "none",
                                borderRadius: "8px",
                                fontWeight: 500,
                                fontSize: "14px",
                                padding: "6px 12px",
                                textAlign: "center",
                                boxShadow: "none",
                                textDecoration: "underline",
                              }}
                            >
                              View Details
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {tournaments?.pagination &&
              tournaments?.pagination?.totalPages > 1 && (
                <div className="d-flex justify-content-between align-items-center mt-4">
                  <PaginationComponent
                    pagination={tournaments?.pagination}
                    onPageChange={onPageChange}
                  />
                </div>
              )}
          </CardBody>
        </Card>
      </div>
    </AdminDashboardLayout>
  );
}
