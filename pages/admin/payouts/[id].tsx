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
          <h3 className="mb-0">Tournament Name</h3>
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

        <h4 className="mb-4">Tournament Won</h4>

        <div className="d-flex mb-4">
          {/* Tournament Details Card */}
          <div
            className="d-flex me-4"
            style={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              boxShadow: "0px 1px 3px rgba(16, 24, 40, 0.1)",
              width: "350px",
            }}
          >
            {/* Tournament Image */}
            <div className="">
              <div
                className="position-relative rounded overflow-hidden"
                style={{ height: "100%", width: "350px" }}
              >
                <Image
                  src="/fortnite-banner.png"
                  alt="Tournament"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </div>
          </div>

          <div
            className="d-flex p-3 me-4"
            style={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              boxShadow: "0px 1px 3px rgba(16, 24, 40, 0.1)",
              width: "350px",
            }}
          >
            {/* Tournament Info */}
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
              <div className="d-flex align-items-center">
                <span
                  className="me-2"
                  style={{ fontSize: "14px", color: "#344054" }}
                >
                  Winning Team:
                </span>
                <div className="d-flex align-items-center">
                  <div
                    className="rounded-circle me-2 d-flex align-items-center justify-content-center"
                    style={{
                      width: "20px",
                      height: "20px",
                      backgroundColor: "#FFD600",
                      color: "#101828",
                      fontSize: "10px",
                    }}
                  >
                    <span style={{ fontSize: "10px" }}>👑</span>
                  </div>
                  <span style={{ fontSize: "14px", fontWeight: "500" }}>
                    {tournament.winningTeam}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Tournament Information Card */}
          <div
            className="p-4 mb-4"
            style={{
              backgroundColor: "#fff",
              borderRadius: "12px",
              boxShadow: "0px 1px 3px rgba(16, 24, 40, 0.1)",
              width: "460px",
              position: "relative"
            }}
          >
            <div 
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
              }}
            >
              <div 
                style={{
                  width: "48px",
                  height: "48px",
                  backgroundColor: "#FFD600",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Image
                  src="/admin/crown-icon.svg"
                  width={24}
                  height={24}
                  alt="Crown"
                />
              </div>
            </div>
            <h3
              style={{
                fontSize: "20px",
                fontWeight: "600",
                color: "#101828",
                marginBottom: "8px"
              }}
            >
              {tournament.name}
            </h3>
            <p
              style={{
                fontSize: "14px",
                color: "#667085",
                marginBottom: "16px"
              }}
            >
              {tournament.date}
            </p>
            <div className="d-flex align-items-center">
              <div style={{ marginRight: "8px" }}>Winning Team:</div>
              <div className="d-flex align-items-center">
                <div 
                  style={{ 
                    marginRight: "4px",
                    display: "flex",
                    alignItems: "center" 
                  }}
                >
                  <div
                    style={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      overflow: "hidden",
                      marginRight: "8px",
                      border: "1px solid #E5E7EB",
                    }}
                  >
                    <Image
                      src="/user1.png"
                      width={24}
                      height={24}
                      alt="Team Logo"
                    />
                  </div>
                  <span style={{ fontSize: "14px", fontWeight: "500" }}>
                    {tournament.winningTeam}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Total Payouts Card */}
          <div
            className="p-4 mb-4"
            style={{
              backgroundColor: "#fff",
              borderRadius: "12px",
              boxShadow: "0px 1px 3px rgba(16, 24, 40, 0.1)",
              width: "460px",
            }}
          >
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: "16px",
                  }}
                >
                  <Image
                    src="/admin/medal-icon.svg" 
                    width={48}
                    height={48}
                    alt="Medal"
                  />
                </div>
                <div>
                  <p
                    style={{
                      fontSize: "16px",
                      fontWeight: "500",
                      color: "#101828",
                      marginBottom: "4px"
                    }}
                  >
                    Total Payouts
                  </p>
                  <h3
                    style={{
                      fontSize: "24px",
                      fontWeight: "600",
                      color: "#101828",
                      marginBottom: "0"
                    }}
                  >
                    {tournament.totalAmount}
                  </h3>
                </div>
              </div>
              <button
                className="btn d-flex align-items-center"
                style={{
                  backgroundColor: "#FFD600",
                  color: "#101828",
                  border: "none",
                  borderRadius: "8px",
                  padding: "10px 16px",
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
                  style={{ marginLeft: "8px" }}
                />
              </button>
            </div>
          </div>
          <Image
                src="/admin/arrow-right-black.svg"
                width={16}
                height={16}
                alt="Send"
                className="ms-1"
              />
            </button>
          </div>
        </div>

        {/* Team Members Table */}
        <div
          style={{
            backgroundColor: "#fff",
            borderRadius: "8px",
            boxShadow: "0px 1px 3px rgba(16, 24, 40, 0.1)",
            overflow: "hidden",
          }}
        >
          <table className="table mb-0">
            <thead>
              <tr style={{ backgroundColor: "#FAFBFC" }}>
                <th style={{ width: "40px", padding: "12px 16px" }}>
                  <input type="checkbox" className="form-check-input" />
                </th>
                <th
                  style={{
                    padding: "12px 16px",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#667085",
                  }}
                >
                  Member
                </th>
                <th
                  style={{
                    padding: "12px 16px",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#667085",
                  }}
                >
                  Rank
                </th>
                <th
                  style={{
                    padding: "12px 16px",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#667085",
                  }}
                >
                  Stats
                </th>
                <th
                  style={{
                    padding: "12px 16px",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#667085",
                  }}
                >
                  Payouts
                </th>
                <th
                  style={{
                    padding: "12px 16px",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#667085",
                    textAlign: "center",
                  }}
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {tournament.members.map((member, index) => (
                <tr key={index}>
                  <td style={{ padding: "12px 16px" }}>
                    <input type="checkbox" className="form-check-input" />
                  </td>
                  <td
                    style={{
                      padding: "12px 16px",
                      fontSize: "14px",
                      color: "#101828",
                    }}
                  >
                    {member.name}
                  </td>
                  <td
                    style={{
                      padding: "12px 16px",
                      fontSize: "14px",
                      color: "#101828",
                    }}
                  >
                    {member.rank}
                  </td>
                  <td
                    style={{
                      padding: "12px 16px",
                      fontSize: "14px",
                      color: "#101828",
                    }}
                  >
                    {member.stats}
                  </td>
                  <td
                    style={{
                      padding: "12px 16px",
                      fontSize: "14px",
                      color: "#101828",
                      fontWeight: "500",
                    }}
                  >
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
                        fontWeight: "500",
                        fontSize: "14px",
                        width: "80px",
                      }}
                    >
                      Send
                      <Image
                        src="/admin/arrow-right-black.svg"
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
          </table>
        </div>
      </div>
    </AdminDashboardLayout>
  );
}