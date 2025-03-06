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
            src="/admin/pubg-banner.jpg"
            alt="Tournament Banner"
            layout="fill"
            objectFit="cover"
          />
        </div>

        <h5 className="mb-4">Tournament Won</h5>

        <div className="d-flex gap-4 mb-4">
          {/* First Card - Tournament Info */}
          <div
            style={{
              borderRadius: "8px",
              border: "1px solid #EAECF0",
              padding: "24px",
              flex: 1,
              backgroundColor: "#fff",
              display: "flex",
              justifyContent: "space-between"
            }}
          >
            <div>
              <div style={{ marginBottom: "8px" }}>
                <h5 className="mb-1" style={{ fontSize: "18px", fontWeight: "600" }}>
                  PUBG - SUMMER CAMP
                </h5>
                <p style={{ color: "#667085", margin: 0 }}>5/22/2023</p>
              </div>

              <div className="d-flex align-items-center mt-3">
                <span style={{ marginRight: "12px", color: "#344054" }}>Winning Team</span>
                <div className="d-flex align-items-center">
                  <div 
                    className="position-relative" 
                    style={{ 
                      width: "24px", 
                      height: "24px", 
                      borderRadius: "50%", 
                      overflow: "hidden",
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
                  <span style={{ fontWeight: "500" }}>Wolves</span>
                </div>
              </div>
            </div>
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
                src="/admin/crown.svg"
                alt="Crown"
                width={24}
                height={24}
              />
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
                  color: "#101828",
                  fontWeight: "500",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  padding: "8px 16px",
                  borderRadius: "8px",
                  width: "100%"
                }}
              >
                Send to all 
                <Image src="/admin/arrow-right.svg" alt="Send" width={16} height={16} />
              </Button>
            </div>
          </div>
        </div>

        {/* Players Table */}
        <div
          style={{
            borderRadius: "8px",
            border: "1px solid #EAECF0",
            backgroundColor: "#fff",
            overflow: "hidden"
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#F9FAFB", borderBottom: "1px solid #EAECF0" }}>
                <th style={{ padding: "12px 24px", textAlign: "left", fontWeight: "500", fontSize: "14px", color: "#667085" }}>
                  <input type="checkbox" disabled />
                </th>
                <th style={{ padding: "12px 24px", textAlign: "left", fontWeight: "500", fontSize: "14px", color: "#667085" }}>
                  Member
                </th>
                <th style={{ padding: "12px 24px", textAlign: "left", fontWeight: "500", fontSize: "14px", color: "#667085" }}>
                  Rank
                </th>
                <th style={{ padding: "12px 24px", textAlign: "left", fontWeight: "500", fontSize: "14px", color: "#667085" }}>
                  Stats
                </th>
                <th style={{ padding: "12px 24px", textAlign: "left", fontWeight: "500", fontSize: "14px", color: "#667085" }}>
                  Payouts
                </th>
                <th style={{ padding: "12px 24px", textAlign: "center", fontWeight: "500", fontSize: "14px", color: "#667085" }}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {players.map((player) => (
                <tr key={player.id} style={{ borderBottom: "1px solid #EAECF0" }}>
                  <td style={{ padding: "16px 24px" }}>
                    <input type="checkbox" />
                  </td>
                  <td style={{ padding: "16px 24px", color: "#101828", fontWeight: "500" }}>
                    {player.name}
                  </td>
                  <td style={{ padding: "16px 24px", color: "#101828" }}>
                    {player.rank}
                  </td>
                  <td style={{ padding: "16px 24px", color: "#101828" }}>
                    {player.stats}
                  </td>
                  <td style={{ padding: "16px 24px", color: "#101828", fontWeight: "500" }}>
                    {player.payout}
                  </td>
                  <td style={{ padding: "16px 24px", textAlign: "center" }}>
                    <Button
                      style={{
                        backgroundColor: "#FFD600",
                        border: "none",
                        color: "#101828",
                        fontWeight: "500",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                        padding: "8px 16px",
                        borderRadius: "8px",
                        margin: "0 auto"
                      }}
                    >
                      Send
                      <Image src="/admin/arrow-right.svg" alt="Send" width={16} height={16} />
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