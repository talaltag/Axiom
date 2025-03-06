
import React from "react";
import AdminDashboardLayout from "../../../components/layouts/AdminDashboardLayout";
import { Card, Row, Col, Button } from "reactstrap";
import { ArrowLeft, Send } from "react-feather";
import Image from "next/image";
import Link from "next/link";

export default function PayoutDetailPage() {
  return (
    <AdminDashboardLayout>
      <div className="p-4">
        <div className="d-flex align-items-center mb-4">
          <Link href="/admin/payouts">
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: "16px",
                boxShadow: "0px 1px 3px rgba(16, 24, 40, 0.1)",
                cursor: "pointer",
              }}
            >
              <ArrowLeft size={20} color="#667085" />
            </div>
          </Link>
          <h4
            style={{
              margin: 0,
              fontSize: "24px",
              fontWeight: 500,
              color: "#101828",
            }}
          >
            Payout Details
          </h4>
        </div>

        <Row>
          <Col md={8}>
            <Card
              className="p-4 mb-4"
              style={{
                border: "none",
                boxShadow: "0px 1px 3px rgba(16, 24, 40, 0.1)",
                borderRadius: "12px",
              }}
            >
              <div className="d-flex gap-4">
                <div className="w-50">
                  <div
                    style={{
                      padding: "24px",
                      backgroundColor: "#FAFAFA",
                      borderRadius: "8px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      height: "100%",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "24px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <div>
                          <h5
                            style={{
                              fontSize: "20px",
                              fontWeight: "500",
                              margin: 0,
                              color: "#101828",
                            }}
                          >
                            PUBG - SUMMER CAMP
                          </h5>
                          <p
                            style={{
                              fontSize: "16px",
                              color: "#667085",
                              margin: "8px 0 0 0",
                            }}
                          >
                            5/22/2023
                          </p>
                        </div>
                        <div
                          style={{
                            width: "48px",
                            height: "48px",
                            backgroundColor: "#FFD600",
                            borderRadius: "8px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="#101828" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M9 22V12H15V22" stroke="#101828" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      </div>
                      <div>
                        <p
                          style={{
                            fontSize: "16px",
                            fontWeight: "500",
                            margin: 0,
                            color: "#344054",
                          }}
                        >
                          Winning Team
                        </p>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            marginTop: "8px",
                          }}
                        >
                          <div
                            style={{
                              width: "32px",
                              height: "32px",
                              borderRadius: "50%",
                              overflow: "hidden",
                              position: "relative",
                            }}
                          >
                            <Image
                              src="/user1.png"
                              alt="Team Logo"
                              layout="fill"
                              objectFit="cover"
                            />
                          </div>
                          <span
                            style={{
                              fontSize: "16px",
                              fontWeight: "500",
                              color: "#101828",
                            }}
                          >
                            Wolves
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-50">
                  <div
                    style={{
                      padding: "24px",
                      backgroundColor: "#FAFAFA",
                      borderRadius: "8px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      height: "100%",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "24px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <div>
                          <h5
                            style={{
                              fontSize: "20px",
                              fontWeight: "500",
                              margin: 0,
                              color: "#101828",
                            }}
                          >
                            Total Payouts
                          </h5>
                          <p
                            style={{
                              fontSize: "24px",
                              fontWeight: "600",
                              color: "#101828",
                              margin: "8px 0 0 0",
                            }}
                          >
                            $1,234
                          </p>
                        </div>
                        <div
                          style={{
                            width: "56px",
                            height: "56px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M28 10L32.6075 22.1475L45.5 23.4725L36.3 32.37L38.71 45.15L28 38.5475L17.29 45.15L19.7 32.37L10.5 23.4725L23.3925 22.1475L28 10Z" fill="#AA8600" stroke="#AA8600" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      </div>
                      <Button
                        style={{
                          backgroundColor: "#FFD600",
                          border: "none",
                          color: "#101828",
                          fontWeight: "500",
                          padding: "10px 18px",
                          fontSize: "16px",
                          borderRadius: "8px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "8px",
                        }}
                      >
                        Send to all <Send size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card
              className="p-4"
              style={{
                border: "none",
                boxShadow: "0px 1px 3px rgba(16, 24, 40, 0.1)",
                borderRadius: "12px",
              }}
            >
              <h5
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#101828",
                  marginBottom: "24px",
                }}
              >
                Team Members
              </h5>

              <table
                style={{
                  width: "100%",
                  borderCollapse: "separate",
                  borderSpacing: "0 8px",
                }}
              >
                <thead>
                  <tr>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "12px 24px",
                        color: "#667085",
                        fontWeight: "500",
                        fontSize: "14px",
                        backgroundColor: "#F9FAFB",
                        borderTopLeftRadius: "8px",
                        borderBottomLeftRadius: "8px",
                      }}
                    >
                      Username
                    </th>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "12px 24px",
                        color: "#667085",
                        fontWeight: "500",
                        fontSize: "14px",
                        backgroundColor: "#F9FAFB",
                      }}
                    >
                      Email
                    </th>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "12px 24px",
                        color: "#667085",
                        fontWeight: "500",
                        fontSize: "14px",
                        backgroundColor: "#F9FAFB",
                      }}
                    >
                      Phone
                    </th>
                    <th
                      style={{
                        textAlign: "right",
                        padding: "12px 24px",
                        color: "#667085",
                        fontWeight: "500",
                        fontSize: "14px",
                        backgroundColor: "#F9FAFB",
                      }}
                    >
                      Amount
                    </th>
                    <th
                      style={{
                        textAlign: "center",
                        padding: "12px 24px",
                        color: "#667085",
                        fontWeight: "500",
                        fontSize: "14px",
                        backgroundColor: "#F9FAFB",
                        borderTopRightRadius: "8px",
                        borderBottomRightRadius: "8px",
                      }}
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4].map((item) => (
                    <tr key={item}>
                      <td
                        style={{
                          padding: "16px 24px",
                          backgroundColor: "#fff",
                          border: "1px solid #EAECF0",
                          borderRight: "none",
                          borderTopLeftRadius: "8px",
                          borderBottomLeftRadius: "8px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                          }}
                        >
                          <div
                            style={{
                              width: "40px",
                              height: "40px",
                              borderRadius: "50%",
                              overflow: "hidden",
                              position: "relative",
                            }}
                          >
                            <Image
                              src="/user1.png"
                              alt="User"
                              layout="fill"
                              objectFit="cover"
                            />
                          </div>
                          <span
                            style={{
                              fontSize: "14px",
                              fontWeight: "500",
                              color: "#101828",
                            }}
                          >
                            John Doe
                          </span>
                        </div>
                      </td>
                      <td
                        style={{
                          padding: "16px 24px",
                          backgroundColor: "#fff",
                          border: "1px solid #EAECF0",
                          borderRight: "none",
                          borderLeft: "none",
                          fontSize: "14px",
                          color: "#667085",
                        }}
                      >
                        johndoe@example.com
                      </td>
                      <td
                        style={{
                          padding: "16px 24px",
                          backgroundColor: "#fff",
                          border: "1px solid #EAECF0",
                          borderRight: "none",
                          borderLeft: "none",
                          fontSize: "14px",
                          color: "#667085",
                        }}
                      >
                        +1 234 567 890
                      </td>
                      <td
                        style={{
                          padding: "16px 24px",
                          backgroundColor: "#fff",
                          border: "1px solid #EAECF0",
                          borderRight: "none",
                          borderLeft: "none",
                          fontSize: "14px",
                          fontWeight: "500",
                          color: "#101828",
                          textAlign: "right",
                        }}
                      >
                        $308.50
                      </td>
                      <td
                        style={{
                          padding: "16px 24px",
                          backgroundColor: "#fff",
                          border: "1px solid #EAECF0",
                          borderLeft: "none",
                          borderTopRightRadius: "8px",
                          borderBottomRightRadius: "8px",
                          textAlign: "center",
                        }}
                      >
                        <Button
                          style={{
                            backgroundColor: "#FFD600",
                            border: "none",
                            color: "#101828",
                            fontWeight: "500",
                            padding: "8px 14px",
                            fontSize: "14px",
                            borderRadius: "8px",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px",
                          }}
                        >
                          <Send size={14} />
                          Send
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </Col>
          <Col md={4}>
            <Card
              className="p-4"
              style={{
                border: "none",
                boxShadow: "0px 1px 3px rgba(16, 24, 40, 0.1)",
                borderRadius: "12px",
              }}
            >
              <h5
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#101828",
                  marginBottom: "24px",
                }}
              >
                Payout Details
              </h5>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "12px 16px",
                    backgroundColor: "#F9FAFB",
                    borderRadius: "8px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#344054",
                    }}
                  >
                    Tournament ID
                  </span>
                  <span
                    style={{
                      fontSize: "14px",
                      color: "#101828",
                    }}
                  >
                    #TRN-123456
                  </span>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "12px 16px",
                    backgroundColor: "#F9FAFB",
                    borderRadius: "8px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#344054",
                    }}
                  >
                    Tournament Date
                  </span>
                  <span
                    style={{
                      fontSize: "14px",
                      color: "#101828",
                    }}
                  >
                    05/22/2023
                  </span>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "12px 16px",
                    backgroundColor: "#F9FAFB",
                    borderRadius: "8px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#344054",
                    }}
                  >
                    Prize Pool
                  </span>
                  <span
                    style={{
                      fontSize: "14px",
                      color: "#101828",
                    }}
                  >
                    $5,000
                  </span>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "12px 16px",
                    backgroundColor: "#F9FAFB",
                    borderRadius: "8px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#344054",
                    }}
                  >
                    Winner Payout
                  </span>
                  <span
                    style={{
                      fontSize: "14px",
                      color: "#101828",
                    }}
                  >
                    $1,234
                  </span>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "12px 16px",
                    backgroundColor: "#F9FAFB",
                    borderRadius: "8px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#344054",
                    }}
                  >
                    Total Players
                  </span>
                  <span
                    style={{
                      fontSize: "14px",
                      color: "#101828",
                    }}
                  >
                    4
                  </span>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "12px 16px",
                    backgroundColor: "#F9FAFB",
                    borderRadius: "8px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#344054",
                    }}
                  >
                    Payment Status
                  </span>
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#F04438",
                      backgroundColor: "#FEF3F2",
                      padding: "2px 8px",
                      borderRadius: "16px",
                    }}
                  >
                    Pending
                  </span>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </AdminDashboardLayout>
  );
}
