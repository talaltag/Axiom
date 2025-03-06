
import React from "react";
import AdminDashboardLayout from "../../../components/layouts/AdminDashboardLayout";
import { Button } from "reactstrap";
import { ArrowLeft } from "react-feather";
import Image from "next/image";
import Link from "next/link";

export default function PayoutDetailPage() {
  const players = [
    { id: 1, name: "Jake", rank: "EXP", stats: "10 Kills", payout: "$250" },
    { id: 2, name: "Adam", rank: "AMA", stats: "10 Kills", payout: "$250" },
    { id: 3, name: "Smith", rank: "EXP", stats: "10 Kills", payout: "$250" },
    { id: 4, name: "Mark", rank: "VET", stats: "10 Kills", payout: "$250" },
    { id: 5, name: "John", rank: "AMA", stats: "10 Kills", payout: "$250" },
    { id: 6, name: "0121", rank: "AMA", stats: "10 Kills", payout: "$250" },
  ];

  return (
    <AdminDashboardLayout>
      <div className="p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="m-0">Tournament Name</h4>
          <Link href="/admin/payouts">
            <Button 
              outline
              style={{ 
                borderColor: "#E4E7EC", 
                color: "#344054",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 16px",
                backgroundColor: "#fff",
                boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)"
              }}
            >
              <ArrowLeft size={16} />
              Back
            </Button>
          </Link>
        </div>

        {/* Tournament Image Banner */}
        <div
          className="position-relative mb-4"
          style={{
            width: "100%",
            height: "180px",
            borderRadius: "8px",
            overflow: "hidden",
            border: "1px solid #0096FF"
          }}
        >
          <Image
            src="/fortnite-banner.png"
            alt="Tournament Banner"
            layout="fill"
            objectFit="cover"
          />
        </div>

        <h5 className="mb-4">Tournament Won</h5>

        {/* Cards Row */}
        <div className="d-flex gap-4 mb-4">
          {/* First Card - Tournament Info */}
          <div
            style={{
              borderRadius: "8px",
              border: "1px solid #EAECF0",
              backgroundColor: "#fff",
              flex: 1,
              overflow: "hidden"
            }}
          >
            <div className="d-flex">
              <div
                style={{
                  width: "170px",
                  height: "140px",
                  position: "relative",
                  borderRight: "1px solid #EAECF0"
                }}
              >
                <Image
                  src="/fortnite-banner.png"
                  alt="Team Logo"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="p-3">
                <div style={{ marginBottom: "12px" }}>
                  <div className="d-flex align-items-center mb-1">
                    <h6 style={{ fontSize: "16px", fontWeight: "600", margin: 0 }}>PUBG - SUMMER CAMP</h6>
                    <div
                      style={{
                        marginLeft: "8px",
                        display: "inline-flex",
                        padding: "0px"
                      }}
                    >
                      <Image
                        src="/admin/crown.svg"
                        alt="Crown"
                        width={24}
                        height={24}
                      />
                    </div>
                  </div>
                  <p style={{ fontSize: "14px", margin: 0, color: "#667085" }}>5/22/2023</p>
                </div>
                <div>
                  <p style={{ fontSize: "14px", margin: "0 0 4px 0", color: "#667085" }}>Winning Team</p>
                  <div className="d-flex align-items-center">
                    <div
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        overflow: "hidden",
                        position: "relative",
                        marginRight: "8px"
                      }}
                    >
                      <Image
                        src="/user1.png"
                        alt="Team Logo"
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <span style={{ fontSize: "14px", fontWeight: "500" }}>Wolves</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Second Card - Total Payouts */}
          <div
            style={{
              borderRadius: "8px",
              border: "1px solid #EAECF0",
              padding: "24px",
              flex: 1,
              backgroundColor: "#fff",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }}
          >
            <div className="d-flex align-items-center" style={{ marginBottom: "16px" }}>
              <div 
                style={{ 
                  width: "48px", 
                  height: "48px", 
                  marginRight: "12px" 
                }}
              >
                <Image
                  src="/admin/medal.svg"
                  alt="Medal"
                  width={48}
                  height={48}
                />
              </div>
              <h5 style={{ fontSize: "18px", margin: 0 }}>Total Payouts</h5>
            </div>

            <div>
              <p style={{ fontSize: "24px", fontWeight: "600", margin: "0 0 16px 0" }}>$1,234</p>
              <Button
                style={{
                  backgroundColor: "#FFD600",
                  border: "none",
                  padding: "8px 16px",
                  fontWeight: "500",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  width: "fit-content"
                }}
              >
                Send to all
                <Image
                  src="/admin/arrow-right.svg"
                  alt="Arrow Right"
                  width={16}
                  height={16}
                />
              </Button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="table-responsive mb-4" style={{ backgroundColor: "#fff", borderRadius: "8px", border: "1px solid #EAECF0" }}>
          <table className="table mb-0">
            <thead>
              <tr style={{ backgroundColor: "#F9FAFB" }}>
                <th style={{ padding: "12px 24px", fontSize: "12px", fontWeight: "500", color: "#667085", border: "none" }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <input type="checkbox" style={{ marginRight: "10px" }} />
                    Member
                  </div>
                </th>
                <th style={{ padding: "12px 24px", fontSize: "12px", fontWeight: "500", color: "#667085", border: "none" }}>Rank</th>
                <th style={{ padding: "12px 24px", fontSize: "12px", fontWeight: "500", color: "#667085", border: "none" }}>Stats</th>
                <th style={{ padding: "12px 24px", fontSize: "12px", fontWeight: "500", color: "#667085", border: "none" }}>Payouts</th>
                <th style={{ padding: "12px 24px", fontSize: "12px", fontWeight: "500", color: "#667085", border: "none" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {players.map((player) => (
                <tr key={player.id} style={{ borderBottom: "1px solid #EAECF0" }}>
                  <td style={{ padding: "16px 24px", fontSize: "14px", fontWeight: "500", color: "#101828" }}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <input type="checkbox" style={{ marginRight: "10px" }} />
                      {player.name}
                    </div>
                  </td>
                  <td style={{ padding: "16px 24px", fontSize: "14px", fontWeight: "500", color: "#101828" }}>{player.rank}</td>
                  <td style={{ padding: "16px 24px", fontSize: "14px", fontWeight: "500", color: "#101828" }}>{player.stats}</td>
                  <td style={{ padding: "16px 24px", fontSize: "14px", fontWeight: "500", color: "#101828" }}>{player.payout}</td>
                  <td style={{ padding: "16px 24px", fontSize: "14px", fontWeight: "500" }}>
                    <Button
                      style={{
                        backgroundColor: "#FFD600",
                        border: "none",
                        padding: "6px 12px",
                        fontWeight: "500",
                        fontSize: "14px",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px"
                      }}
                    >
                      Send
                      <Image
                        src="/admin/arrow-right.svg"
                        alt="Arrow Right"
                        width={16}
                        height={16}
                      />
                    </Button>
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
