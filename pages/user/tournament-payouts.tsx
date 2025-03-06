
import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Card,
  CardBody,
} from "reactstrap";
import UserDashboardLayout from "../../components/layouts/UserDashboardLayout";

export default function TournamentPayouts() {
  // Mock data to match the design
  const tournamentData = {
    name: "Tournament Name",
    banner: "/fortnite-banner.png",
    status: "Won",
    details: {
      name: "PUBG - SUMMER CAMP",
      date: "5/22/2023",
      team: "Wolves",
      totalPayout: "$1,234",
    },
    members: [
      { id: 1, name: "Jake", rank: "EXP", stats: "10 Kills", payout: "$250" },
      { id: 2, name: "Adam", rank: "AMA", stats: "10 Kills", payout: "$250" },
      { id: 3, name: "Smith", rank: "EXP", stats: "10 Kills", payout: "$250" },
      { id: 4, name: "Mark", rank: "VET", stats: "10 Kills", payout: "$250" },
      { id: 5, name: "John", rank: "AMA", stats: "10 Kills", payout: "$250" },
      { id: 6, name: "0121", rank: "AMA", stats: "10 Kills", payout: "$250" },
    ],
  };

  return (
    <UserDashboardLayout>
      <div className="d-flex align-items-center mb-4">
        <Link href="/user/dashboard" passHref>
          <div className="d-flex align-items-center" style={{ cursor: "pointer" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </Link>
        <h4 className="mb-0 ms-2">{tournamentData.name}</h4>
        <div className="ms-auto">
          <Button
            color="light"
            className="rounded-pill"
            style={{
              backgroundColor: "#f8f9fa",
              border: "1px solid #dee2e6",
              padding: "8px 16px",
            }}
          >
            Back
          </Button>
        </div>
      </div>

      <div style={{ marginBottom: "24px" }}>
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "120px",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <Image
            src={tournamentData.banner}
            alt={tournamentData.name}
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>

      <h5 style={{ marginBottom: "16px" }}>Tournament Won</h5>

      <Row className="mb-4">
        <Col md={8}>
          <Card
            style={{
              borderRadius: "8px",
              border: "1px solid #dee2e6",
              boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
            }}
          >
            <CardBody className="p-3 d-flex">
              <div
                style={{
                  width: "160px",
                  height: "90px",
                  position: "relative",
                  borderRadius: "8px",
                  overflow: "hidden",
                  marginRight: "20px",
                }}
              >
                <Image
                  src={tournamentData.banner}
                  alt={tournamentData.details.name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div>
                <div className="d-flex align-items-center mb-1">
                  <h6 className="mb-0">{tournamentData.details.name}</h6>
                  <div
                    style={{
                      background: "#FFD600",
                      width: "24px",
                      height: "24px",
                      borderRadius: "4px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginLeft: "10px",
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 8H4M18 12H6M15 16H9" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                <p className="text-muted mb-1" style={{ fontSize: "14px" }}>
                  {tournamentData.details.date}
                </p>
                <div className="d-flex align-items-center">
                  <span style={{ fontSize: "14px", marginRight: "4px" }}>
                    Winning Team:
                  </span>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      backgroundColor: "#f8f9fa",
                      borderRadius: "50px",
                      padding: "2px 8px",
                    }}
                  >
                    <div
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        backgroundColor: "#007bff",
                        marginRight: "4px",
                        position: "relative",
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          color: "white",
                          fontSize: "10px",
                        }}
                      >
                        W
                      </span>
                    </div>
                    <span style={{ fontSize: "14px" }}>
                      {tournamentData.details.team}
                    </span>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col md={4}>
          <Card
            style={{
              borderRadius: "8px",
              border: "1px solid #dee2e6",
              boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
              height: "100%",
            }}
          >
            <CardBody className="d-flex flex-column justify-content-between p-3">
              <div>
                <div className="d-flex align-items-center mb-2">
                  <div 
                    style={{
                      marginRight: "10px",
                      width: "32px",
                      height: "32px",
                      position: "relative"
                    }}
                  >
                    <Image
                      src="/axiom-logo.png"
                      alt="Trophy"
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                  <span style={{ fontSize: "14px" }}>Total Payouts</span>
                </div>
                <h5 className="mb-0">{tournamentData.details.totalPayout}</h5>
              </div>
              <Button
                color="warning"
                className="w-100 mt-2"
                style={{
                  backgroundColor: "#FFD600",
                  border: "none",
                  color: "#000",
                  fontWeight: "500",
                  borderRadius: "4px",
                }}
              >
                Send to all{" "}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ marginLeft: "4px" }}
                >
                  <path
                    d="M5 12H19M19 12L12 5M19 12L12 19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Button>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <div className="table-responsive">
        <Table
          className="align-middle"
          style={{
            backgroundColor: "#fff",
            borderRadius: "8px",
            overflow: "hidden",
            border: "1px solid #dee2e6",
          }}
        >
          <thead>
            <tr
              style={{
                borderBottom: "1px solid #dee2e6",
                backgroundColor: "#f8f9fa",
              }}
            >
              <th style={{ width: "40px" }}>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="selectAll"
                  />
                </div>
              </th>
              <th style={{ padding: "12px 16px", fontWeight: "500", fontSize: "14px" }}>Member</th>
              <th style={{ padding: "12px 16px", fontWeight: "500", fontSize: "14px" }}>Rank</th>
              <th style={{ padding: "12px 16px", fontWeight: "500", fontSize: "14px" }}>Stats</th>
              <th style={{ padding: "12px 16px", fontWeight: "500", fontSize: "14px" }}>Payouts</th>
              <th style={{ padding: "12px 16px", fontWeight: "500", fontSize: "14px" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {tournamentData.members.map((member) => (
              <tr key={member.id} style={{ borderBottom: "1px solid #eaecf0" }}>
                <td style={{ padding: "12px 16px" }}>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`member-${member.id}`}
                    />
                  </div>
                </td>
                <td style={{ padding: "12px 16px", fontSize: "14px" }}>{member.name}</td>
                <td style={{ padding: "12px 16px", fontSize: "14px" }}>{member.rank}</td>
                <td style={{ padding: "12px 16px", fontSize: "14px" }}>{member.stats}</td>
                <td style={{ padding: "12px 16px", fontSize: "14px" }}>{member.payout}</td>
                <td style={{ padding: "12px 16px" }}>
                  <Button
                    color="warning"
                    size="sm"
                    style={{
                      backgroundColor: "#FFD600",
                      border: "none",
                      color: "#000",
                      fontWeight: "500",
                      borderRadius: "4px",
                      padding: "4px 12px",
                    }}
                  >
                    Send{" "}
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ marginLeft: "4px" }}
                    >
                      <path
                        d="M5 12H19M19 12L12 5M19 12L12 19"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </UserDashboardLayout>
  );
}
