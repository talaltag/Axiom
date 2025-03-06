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
    name: "Tournament Name",
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
      <div className="p-4">
        {/* Back button */}
        <div className="d-flex justify-content-between">
          <div className="d-flex align-items-center mb-4">
            <Link href="/admin/payouts">
              <button
                className="btn d-flex align-items-center"
                style={{
                  background: "#F0F0F0",
                  border: "none",
                  borderRadius: "8px",
                  padding: "8px 12px",
                }}
              >
                <span style={{ marginRight: "8px" }}>Back</span>
              </button>
            </Link>
          </div>
        </div>

        {/* Tournament Name */}
        <h3 className="mb-4">{tournament.name}</h3>

        {/* Game Banner */}
        <div 
          className="position-relative mb-4 rounded overflow-hidden"
          style={{ height: "200px", width: "100%" }}
        >
          <Image
            src="/fortnite-banner.png"
            layout="fill"
            objectFit="cover"
            alt="Tournament Banner"
          />
        </div>

        {/* Tournament Won Section */}
        <h5 
          className="mb-3"
          style={{ 
            fontSize: "18px", 
            fontWeight: 500,
            color: "#101828" 
          }}
        >Tournament Won</h5>

        <div className="d-flex mb-4">
          {/* Left Side - Tournament Information */}
          <div
            className="d-flex"
            style={{
              flex: 2,
              borderRadius: "8px",
              backgroundColor: "#fff",
              boxShadow: "0px 1px 3px rgba(16, 24, 40, 0.1)",
              overflow: "hidden",
              marginRight: "16px",
            }}
          >
            {/* Tournament Image */}
            <div
              className="position-relative"
              style={{ width: "180px", height: "120px" }}
            >
              <Image
                src="/fortnite-banner.png"
                layout="fill"
                objectFit="cover"
                alt="Tournament"
              />
            </div>

            {/* Tournament Details */}
            <div className="p-3 d-flex flex-column justify-content-between">
              <div>
                <h6 
                  style={{ 
                    fontSize: "16px", 
                    fontWeight: 600,
                    marginBottom: "4px",
                    color: "#101828" 
                  }}
                >
                  PUBG - SUMMER CAMP
                </h6>
                <p 
                  style={{ 
                    fontSize: "14px", 
                    color: "#667085",
                    margin: 0
                  }}
                >
                  {tournament.date}
                </p>
              </div>

              <div className="d-flex align-items-center">
                <span 
                  style={{ 
                    fontSize: "14px", 
                    color: "#667085",
                    marginRight: "8px"
                  }}
                >
                  Winning Team:
                </span>
                <div className="d-flex align-items-center">
                  <div
                    className="rounded-circle me-2 d-flex align-items-center justify-content-center"
                    style={{
                      width: "20px",
                      height: "20px",
                      backgroundColor: "#F5F5F5",
                      marginRight: "4px"
                    }}
                  >
                    <Image
                      src="/favicon.ico"
                      width={16}
                      height={16}
                      alt="Team Logo"
                    />
                  </div>
                  <span style={{ fontWeight: 500 }}>{tournament.winningTeam}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Total Payouts Card */}
          <div
            className="d-flex align-items-center"
            style={{
              flex: 1,
              backgroundColor: "#fff",
              borderRadius: "8px",
              boxShadow: "0px 1px 3px rgba(16, 24, 40, 0.1)",
              padding: "16px",
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
              <h5 className="mb-0">{tournament.totalAmount}</h5>
            </div>
            <button
              className="btn d-flex align-items-center"
              style={{
                backgroundColor: "#FFD600",
                color: "#101828",
                border: "none",
                borderRadius: "8px",
                padding: "8px 14px",
                fontWeight: "500",
                fontSize: "14px",
              }}
            >
              Send to all
              <Image
                src="/admin/send-icon.svg"
                width={16}
                height={16}
                alt="Send"
                style={{ marginLeft: "4px" }}
              />
            </button>
          </div>
        </div>

        {/* Players Table */}
        <div
          style={{
            backgroundColor: "#fff",
            borderRadius: "8px",
            boxShadow: "0px 1px 3px rgba(16, 24, 40, 0.1)",
            overflow: "hidden",
          }}
        >
          <table className="table table-hover mb-0" style={{ fontSize: "14px" }}>
            <thead style={{ backgroundColor: "#F9FAFB" }}>
              <tr>
                <th style={{ padding: "12px 16px", fontWeight: 500, width: "40px" }}>
                  <input type="checkbox" />
                </th>
                <th style={{ padding: "12px 16px", fontWeight: 500 }}>Member</th>
                <th style={{ padding: "12px 16px", fontWeight: 500 }}>Rank</th>
                <th style={{ padding: "12px 16px", fontWeight: 500 }}>Stats</th>
                <th style={{ padding: "12px 16px", fontWeight: 500 }}>Payouts</th>
                <th style={{ padding: "12px 16px", fontWeight: 500, textAlign: "center" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {tournament.members.map((member) => (
                <tr key={member.id}>
                  <td style={{ padding: "12px 16px", verticalAlign: "middle" }}>
                    <input type="checkbox" />
                  </td>
                  <td style={{ padding: "12px 16px", verticalAlign: "middle" }}>
                    {member.name}
                  </td>
                  <td style={{ padding: "12px 16px", verticalAlign: "middle" }}>
                    {member.rank}
                  </td>
                  <td style={{ padding: "12px 16px", verticalAlign: "middle" }}>
                    {member.stats}
                  </td>
                  <td style={{ padding: "12px 16px", verticalAlign: "middle" }}>
                    {member.amount}
                  </td>
                  <td style={{ padding: "12px 16px", verticalAlign: "middle", textAlign: "center" }}>
                    <button
                      className="btn"
                      style={{
                        backgroundColor: "#FFD600",
                        color: "#101828",
                        border: "none",
                        borderRadius: "8px",
                        padding: "6px 16px",
                        fontWeight: "500",
                        fontSize: "14px",
                        display: "inline-flex",
                        alignItems: "center",
                        minWidth: "90px",
                        justifyContent: "center"
                      }}
                    >
                      Send
                      <svg 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        style={{ marginLeft: "4px" }}
                      >
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminDashboardLayout>
  );
}