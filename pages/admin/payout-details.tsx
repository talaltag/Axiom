
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import AdminDashboardLayout from "../../components/layouts/AdminDashboardLayout";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
} from "reactstrap";
import Link from "next/link";

export default function PayoutDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [tournament, setTournament] = useState({
    name: "Tournament Name",
    date: "5/22/2023",
    title: "PUBG - SUMMER CAMP",
    winningTeam: "Wolves",
    totalAmount: "$1,250",
    members: [
      { id: 1, name: "Jake", rank: "EXP", stats: "10 Kills", amount: "$250", checked: false },
      { id: 2, name: "Adam", rank: "AMA", stats: "10 Kills", amount: "$250", checked: false },
      { id: 3, name: "Smith", rank: "EXP", stats: "10 Kills", amount: "$250", checked: false },
      { id: 4, name: "Mark", rank: "VET", stats: "10 Kills", amount: "$250", checked: false },
      { id: 5, name: "John", rank: "AMA", stats: "10 Kills", amount: "$250", checked: false },
      { id: 6, name: "0121", rank: "AMA", stats: "10 Kills", amount: "$250", checked: false },
    ],
  });

  const handleCheckboxChange = (id: number) => {
    setTournament(prevState => ({
      ...prevState,
      members: prevState.members.map(member => 
        member.id === id ? { ...member, checked: !member.checked } : member
      )
    }));
  };

  return (
    <AdminDashboardLayout>
      <div className="d-flex align-items-center justify-content-between p-3 border-bottom">
        <div className="d-flex align-items-center">
          <h5 className="mb-0 me-4">Pay Outs</h5>
        </div>
        <div className="d-flex align-items-center">
          <div className="position-relative me-3">
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              2
            </span>
            <Image src="/admin/bell-icon.svg" width={20} height={20} alt="Notifications" />
          </div>
          <div className="position-relative me-3">
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              5
            </span>
            <Image src="/admin/mail-icon.svg" width={20} height={20} alt="Messages" />
          </div>
          <div className="d-flex align-items-center">
            <Image
              src="/user1.png"
              width={30}
              height={30}
              alt="User"
              className="rounded-circle me-2"
            />
            <span className="me-2 fw-medium">Steven Hanks</span>
            <i className="fas fa-chevron-down"></i>
          </div>
        </div>
      </div>

      <Container fluid className="p-4">
        <div className="mb-4">
          <Link href="/admin/payouts">
            <a className="d-flex align-items-center text-decoration-none">
              <i className="fas fa-chevron-left me-2"></i>
              <span style={{ color: "#101828", fontWeight: 500 }}>Back</span>
            </a>
          </Link>
        </div>

        <div className="mb-4">
          <h3 className="mb-3" style={{ color: "#101828", fontSize: "20px", fontWeight: 600 }}>
            {tournament.name}
          </h3>
          
          <div className="position-relative mb-4" style={{ height: "200px", borderRadius: "8px", overflow: "hidden" }}>
            <Image 
              src="/fortnite-banner.png" 
              layout="fill" 
              objectFit="cover" 
              alt="Tournament Banner" 
              priority 
            />
          </div>

          <h4 className="mb-4" style={{ color: "#101828", fontSize: "18px", fontWeight: 600 }}>
            Tournament Won
          </h4>

          <Row className="mb-4">
            <Col md={8}>
              <div className="d-flex">
                <div className="position-relative me-3" style={{ height: "120px", width: "200px", borderRadius: "8px", overflow: "hidden" }}>
                  <Image 
                    src="/fortnite-banner.png" 
                    layout="fill" 
                    objectFit="cover" 
                    alt="Tournament Image" 
                    priority 
                  />
                </div>
                <div className="border rounded p-3" style={{ flex: 1 }}>
                  <h5 className="fw-bold" style={{ color: "#101828", marginBottom: "8px" }}>
                    {tournament.title}
                  </h5>
                  <p className="text-muted mb-2" style={{ fontSize: "14px" }}>
                    5/22/2023
                  </p>
                  <div className="d-flex align-items-center mt-3">
                    <span style={{ color: "#101828", fontWeight: 500, marginRight: "10px" }}>
                      Winning Team
                    </span>
                    <div className="d-flex align-items-center">
                      <div style={{ 
                        width: "24px", 
                        height: "24px", 
                        backgroundColor: "#265AE8", 
                        borderRadius: "50%", 
                        marginRight: "5px",
                        color: "white",
                        fontSize: "10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}>
                        W
                      </div>
                      <span style={{ color: "#101828", fontWeight: 500 }}>
                        {tournament.winningTeam}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col md={4}>
              <div className="border rounded p-3 h-100 d-flex flex-column align-items-center justify-content-center">
                <div style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  width: "48px",
                  height: "48px",
                  backgroundColor: "#FDF8E8",
                  borderRadius: "50%",
                  marginBottom: "10px"
                }}>
                  <Image
                    src="/admin/crown-icon.svg"
                    width={24}
                    height={24}
                    alt="Trophy"
                  />
                </div>
                <p className="text-muted mb-1" style={{ fontSize: "14px" }}>
                  Total Payouts
                </p>
                <h5 className="fw-bold mb-3" style={{ color: "#101828" }}>
                  {tournament.totalAmount}
                </h5>
                <Button
                  className="d-flex align-items-center"
                  style={{
                    backgroundColor: "#FFD600",
                    color: "#101828",
                    border: "none",
                    borderRadius: "8px",
                    padding: "8px 14px",
                    fontWeight: 500,
                    fontSize: "14px",
                  }}
                >
                  Send to all
                  <i className="fas fa-arrow-right ms-2" style={{ fontSize: "12px" }}></i>
                </Button>
              </div>
            </Col>
          </Row>

          <div className="table-responsive">
            <table className="table" style={{ borderCollapse: "separate", borderSpacing: "0 8px" }}>
              <thead>
                <tr style={{ backgroundColor: "#FAFBFC" }}>
                  <th style={{ padding: "12px 16px", width: "40px" }}>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      onChange={() => {
                        const allChecked = tournament.members.every(member => member.checked);
                        setTournament(prevState => ({
                          ...prevState,
                          members: prevState.members.map(member => ({
                            ...member,
                            checked: !allChecked
                          }))
                        }));
                      }}
                      checked={tournament.members.length > 0 && tournament.members.every(member => member.checked)}
                    />
                  </th>
                  <th style={{ padding: "12px 16px", fontSize: "14px", color: "#667085", fontWeight: 500 }}>
                    Member
                  </th>
                  <th style={{ padding: "12px 16px", fontSize: "14px", color: "#667085", fontWeight: 500 }}>
                    Rank
                  </th>
                  <th style={{ padding: "12px 16px", fontSize: "14px", color: "#667085", fontWeight: 500 }}>
                    Stats
                  </th>
                  <th style={{ padding: "12px 16px", fontSize: "14px", color: "#667085", fontWeight: 500 }}>
                    Payouts
                  </th>
                  <th style={{ padding: "12px 16px", fontSize: "14px", color: "#667085", fontWeight: 500, textAlign: "center" }}>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {tournament.members.map((member) => (
                  <tr key={member.id} style={{ backgroundColor: "#FFFFFF", boxShadow: "0px 1px 3px rgba(16, 24, 40, 0.1)", borderRadius: "8px" }}>
                    <td style={{ padding: "12px 16px" }}>
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={member.checked}
                        onChange={() => handleCheckboxChange(member.id)}
                      />
                    </td>
                    <td style={{ padding: "12px 16px", fontSize: "14px", color: "#101828", fontWeight: 500 }}>
                      {member.name}
                    </td>
                    <td style={{ padding: "12px 16px", fontSize: "14px", color: "#101828" }}>
                      {member.rank}
                    </td>
                    <td style={{ padding: "12px 16px", fontSize: "14px", color: "#101828" }}>
                      {member.stats}
                    </td>
                    <td style={{ padding: "12px 16px", fontSize: "14px", color: "#101828", fontWeight: 500 }}>
                      {member.amount}
                    </td>
                    <td style={{ padding: "12px 16px", textAlign: "center" }}>
                      <button
                        className="btn d-flex align-items-center justify-content-center mx-auto"
                        style={{
                          backgroundColor: "#FFD600",
                          color: "#101828",
                          border: "none",
                          borderRadius: "8px",
                          padding: "6px 16px",
                          fontWeight: 500,
                          fontSize: "14px",
                          width: "80px",
                        }}
                      >
                        Send
                        <i className="fas fa-arrow-right ms-1" style={{ fontSize: "12px" }}></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Container>

      <style jsx>{`
        .form-check-input {
          width: 16px;
          height: 16px;
          cursor: pointer;
          border-color: #D0D5DD;
        }
        .form-check-input:checked {
          background-color: #FFD600;
          border-color: #FFD600;
        }
        th {
          border: none;
        }
        td {
          border: none;
        }
        tbody tr {
          margin-bottom: 8px;
          border-radius: 8px;
        }
        tbody tr td:first-child {
          border-top-left-radius: 8px;
          border-bottom-left-radius: 8px;
        }
        tbody tr td:last-child {
          border-top-right-radius: 8px;
          border-bottom-right-radius: 8px;
        }
      `}</style>
    </AdminDashboardLayout>
  );
}
