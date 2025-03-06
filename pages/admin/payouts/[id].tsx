import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container, Row, Col, Table, Badge } from "reactstrap";
import AdminDashboardLayout from "../../../components/layouts/AdminDashboardLayout";

export default function PayoutDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [tournament, setTournament] = useState({
    name: "PUBG - SUMMER CAMP",
    date: "5/22/2023",
    winningTeam: "Wolves",
    totalAmount: "$1,234",
    members: [
      { id: 1, name: "Jake", rank: "EXP", stats: "10 Kills", amount: "$250" },
      { id: 2, name: "Adam", rank: "AMA", stats: "10 Kills", amount: "$250" },
      { id: 3, name: "Smith", rank: "EXP", stats: "10 Kills", amount: "$250" },
      { id: 4, name: "Mark", rank: "VET", stats: "10 Kills", amount: "$250" },
      { id: 5, name: "John", rank: "AMA", stats: "10 Kills", amount: "$250" },
      { id: 6, name: "0121", rank: "AMA", stats: "10 Kills", amount: "$250" },
    ],
  });

  return (
    <AdminDashboardLayout>
      <div style={{ padding: "24px" }}>
        <div className="d-flex align-items-center mb-4">
          <button
            onClick={() => router.back()}
            className="btn p-0 me-3"
            style={{ background: "transparent", border: "none" }}
          >
            <Image
              src="/admin/arrow-left.svg"
              width={20}
              height={20}
              alt="Back"
            />
          </button>
          <h3 className="mb-0" style={{ fontSize: "20px", fontWeight: "600", color: "#101828" }}>Tournament Payout</h3>
        </div>

        {/* Banner Image */}
        <div
          className="position-relative mb-4 rounded overflow-hidden"
          style={{ height: "150px", width: "100%" }}
        >
          <Image
            src="/fortnite-banner.png"
            alt="Tournament Banner"
            layout="fill"
            objectFit="cover"
          />
        </div>

        <h4 className="mb-4" style={{ fontSize: "18px", fontWeight: "600", color: "#101828" }}>Tournament Won</h4>

        <Row>
          <Col md={4}>
            <div
              className="mb-4"
              style={{
                backgroundColor: "#fff",
                borderRadius: "8px",
                boxShadow: "0px 1px 3px rgba(16, 24, 40, 0.1)",
              }}
            >
              <div
                className="position-relative rounded overflow-hidden mb-3"
                style={{ height: "200px" }}
              >
                <Image
                  src="/fortnite-banner.png"
                  alt="Tournament"
                  layout="responsive"
                  width={350}
                  height={200}
                  objectFit="cover"
                />
              </div>
            </div>
          </Col>
          <Col md={4}>
            <div
              className="d-flex p-3"
              style={{
                backgroundColor: "#fff",
                borderRadius: "8px",
                boxShadow: "0px 1px 3px rgba(16, 24, 40, 0.1)",
              }}
            >
              <div>
                <h5
                  className="mb-1"
                  style={{ fontSize: "16px", fontWeight: "600" }}
                >
                  {tournament.name}
                </h5>
                <p
                  className="mb-1"
                  style={{ fontSize: "14px", color: "#667085" }}
                >
                  {tournament.date}
                </p>
                <p
                  className="mb-1"
                  style={{ fontSize: "14px", color: "#344054" }}
                >
                  Winning Team: {tournament.winningTeam}
                </p>
              </div>
            </div>
          </Col>
          <Col md={4}>
            <div
              className="d-flex p-3 align-items-center"
              style={{
                backgroundColor: "#fff",
                borderRadius: "8px",
                boxShadow: "0px 1px 3px rgba(16, 24, 40, 0.1)",
              }}
            >
              <div
                className="rounded-circle me-3 d-flex align-items-center justify-content-center"
                style={{
                  width: "48px",
                  height: "48px",
                  backgroundColor: "#FDF8E8",
                }}
              >
                <Image
                  src="/admin/crown-icon.svg"
                  width={24}
                  height={24}
                  alt="Trophy"
                />
              </div>
              <div className="flex-grow-1">
                <p
                  className="mb-1"
                  style={{ fontSize: "14px", color: "#667085" }}
                >
                  Total Payouts
                </p>
                <h5 className="mb-0" style={{ fontSize: "16px", fontWeight: "600", color: "#101828" }}>{tournament.totalAmount}</h5>
              </div>
              <button
                className="btn d-flex align-items-center"
                style={{
                  backgroundColor: "#1D4ED8",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  padding: "8px 14px",
                  fontWeight: "500",
                  fontSize: "14px",
                }}
              >
                Send to all
                <Image
                  src="/admin/arrow-right-white.svg"
                  width={16}
                  height={16}
                  alt="Send"
                  className="ms-1"
                />
              </button>
            </div>
          </Col>
        </Row>


        {/* Team Members Table */}
        <div
          style={{
            backgroundColor: "#fff",
            borderRadius: "8px",
            boxShadow: "0px 1px 3px rgba(16, 24, 40, 0.1)",
            overflow: "hidden",
            marginTop: "24px"
          }}
        >
          <Table responsive>
            <thead>
              <tr style={{ backgroundColor: "#FAFBFC" }}>
                <th style={{ width: "40px", padding: "12px 16px" }}>
                  <input type="checkbox" className="form-check-input" />
                </th>
                <th style={{ padding: "12px 16px", fontSize: "14px", fontWeight: "500", color: "#667085" }}>Member</th>
                <th style={{ padding: "12px 16px", fontSize: "14px", fontWeight: "500", color: "#667085" }}>Rank</th>
                <th style={{ padding: "12px 16px", fontSize: "14px", fontWeight: "500", color: "#667085" }}>Stats</th>
                <th style={{ padding: "12px 16px", fontSize: "14px", fontWeight: "500", color: "#667085" }}>Payouts</th>
                <th style={{ padding: "12px 16px", fontSize: "14px", fontWeight: "500", color: "#667085", textAlign: "center" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {tournament.members.map((member, index) => (
                <tr key={index}>
                  <td style={{ padding: "12px 16px" }}>
                    <input type="checkbox" className="form-check-input" />
                  </td>
                  <td style={{ padding: "12px 16px", fontSize: "14px", color: "#101828" }}>{member.name}</td>
                  <td style={{ padding: "12px 16px", fontSize: "14px", color: "#101828" }}>{member.rank}</td>
                  <td style={{ padding: "12px 16px", fontSize: "14px", color: "#101828" }}>{member.stats}</td>
                  <td style={{ padding: "12px 16px", fontSize: "14px", color: "#101828", fontWeight: "500" }}>{member.amount}</td>
                  <td style={{ padding: "12px 16px", textAlign: "center" }}>
                    <button
                      className="btn d-flex align-items-center justify-content-center mx-auto"
                      style={{
                        backgroundColor: "#1D4ED8",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        padding: "6px 16px",
                        fontWeight: "500",
                        fontSize: "14px",
                        width: "80px",
                      }}
                    >
                      Send
                      <Image
                        src="/admin/arrow-right-white.svg"
                        width={16}
                        height={16}
                        alt="Send"
                        className="ms-1"
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </AdminDashboardLayout>
  );
}