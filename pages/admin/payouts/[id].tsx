
import React, { useState } from "react";
import AdminDashboardLayout from "../../../components/layouts/AdminDashboardLayout";
import { Row, Col, Button } from "reactstrap";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function PayoutDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [selectedPlayers, setSelectedPlayers] = useState<number[]>([]);

  // Sample data to match the provided design
  const tournamentData = {
    name: "Tournament Name",
    banner: "/admin/pubg-banner.jpg",
    detailImage: "/admin/pubg-detail.jpg",
    tournament: "PUBG - SUMMER CAMP",
    date: "5/22/2023",
    winningTeam: "Wolves",
    totalPayout: "$1,234",
    players: [
      { id: 1, name: "Jake", rank: "EXP", stats: "10 Kills", payout: "$250" },
      { id: 2, name: "Adam", rank: "AMA", stats: "10 Kills", payout: "$250" },
      { id: 3, name: "Smith", rank: "EXP", stats: "10 Kills", payout: "$250" },
      { id: 4, name: "Mark", rank: "VET", stats: "10 Kills", payout: "$250" },
      { id: 5, name: "John", rank: "AMA", stats: "10 Kills", payout: "$250" },
      { id: 6, name: "0121", rank: "AMA", stats: "10 Kills", payout: "$250" },
    ]
  };

  const togglePlayerSelection = (playerId: number) => {
    if (selectedPlayers.includes(playerId)) {
      setSelectedPlayers(selectedPlayers.filter(id => id !== playerId));
    } else {
      setSelectedPlayers([...selectedPlayers, playerId]);
    }
  };

  return (
    <AdminDashboardLayout>
      <div className="p-3 d-flex flex-column" style={{ height: "100vh" }}>
        {/* Header with Back Button */}
        <div className="d-flex align-items-center mb-3">
          <Link href="/admin/payouts">
            <span className="d-flex align-items-center" style={{ cursor: "pointer", color: "#667085" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="ms-2">Pay Outs</span>
            </span>
          </Link>
        </div>

        {/* Tournament Title */}
        <h1 
          style={{
            fontSize: "24px",
            fontWeight: 600,
            color: "#101828",
            marginBottom: "16px"
          }}
        >
          {tournamentData.name}
        </h1>

        {/* Tournament Banner */}
        <div 
          className="position-relative mb-4" 
          style={{ 
            height: "150px", 
            borderRadius: "8px",
            overflow: "hidden" 
          }}
        >
          <Image
            src="/admin/pubg-banner.jpg"
            layout="fill"
            objectFit="cover"
            alt="Tournament Banner"
            priority
          />
        </div>

        {/* Tournament Won Section */}
        <h3 
          style={{
            fontSize: "18px",
            fontWeight: 600,
            color: "#101828",
            marginBottom: "16px"
          }}
        >
          Tournament Won
        </h3>

        {/* Tournament Info Cards */}
        <div className="d-flex mb-4 gap-3">
          {/* Tournament Info Card */}
          <div className="flex-grow-1" style={{ maxWidth: "400px" }}>
            <div className="d-flex bg-white p-3 rounded" style={{ 
              border: "1px solid #E5E7EB", 
              borderRadius: "8px",
              boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.05)" 
            }}>
              {/* Tournament Image */}
              <div className="me-3">
                <Image 
                  src="/admin/pubg-detail.jpg" 
                  width={95} 
                  height={95} 
                  objectFit="cover"
                  style={{ borderRadius: "4px" }}
                  alt="Tournament Detail" 
                />
              </div>
              
              {/* Tournament Details */}
              <div className="d-flex flex-column justify-content-between">
                <div>
                  <div style={{ 
                    fontSize: "14px", 
                    fontWeight: 600,
                    color: "#101828",
                    marginBottom: "4px" 
                  }}>
                    {tournamentData.tournament}
                  </div>
                  <div style={{ 
                    fontSize: "14px", 
                    color: "#667085" 
                  }}>
                    {tournamentData.date}
                  </div>
                </div>
                
                <div className="d-flex align-items-center">
                  <div style={{ 
                    fontSize: "14px", 
                    color: "#667085",
                    marginRight: "8px" 
                  }}>
                    Winning Team
                  </div>
                  <div className="d-flex align-items-center">
                    <div 
                      className="d-flex align-items-center justify-content-center me-1" 
                      style={{ 
                        width: "24px", 
                        height: "24px",
                        borderRadius: "50%", 
                        backgroundColor: "#EEF4FF", 
                        border: "1px solid #D1E0FF"
                      }}
                    >
                      <Image 
                        src="/platforms/fortnite-logo.webp" 
                        width={16} 
                        height={16} 
                        alt="Team Logo" 
                      />
                    </div>
                    <div style={{ 
                      fontSize: "14px", 
                      fontWeight: 500,
                      color: "#101828" 
                    }}>
                      {tournamentData.winningTeam}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Total Payouts Card */}
          <div>
            <div 
              className="bg-white p-3 d-flex flex-column align-items-center" 
              style={{ 
                width: "240px",
                border: "1px solid #E5E7EB", 
                borderRadius: "8px",
                boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.05)" 
              }}
            >
              <div className="mb-1">
                <Image 
                  src="/admin/medal-icon.svg" 
                  width={40} 
                  height={40} 
                  alt="Medal Icon" 
                />
              </div>
              <div style={{ 
                fontSize: "14px", 
                color: "#667085",
                marginBottom: "4px" 
              }}>
                Total Payouts
              </div>
              <div style={{ 
                fontSize: "24px", 
                fontWeight: 600,
                color: "#101828",
                marginBottom: "12px"
              }}>
                {tournamentData.totalPayout}
              </div>
              <Button
                color="warning"
                className="d-flex align-items-center justify-content-center gap-2 w-100"
                style={{
                  backgroundColor: "#FFD600",
                  border: "none",
                  borderRadius: "8px",
                  padding: "8px 16px",
                  color: "#101828",
                  fontWeight: 500,
                  fontSize: "14px"
                }}
              >
                <span>Send to all</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.33337 8H12.6667" stroke="#101828" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 3.33301L12.6667 7.99967L8 12.6663" stroke="#101828" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Button>
            </div>
          </div>
        </div>

        {/* Players Table */}
        <div className="bg-white" style={{ 
          border: "1px solid #E5E7EB", 
          borderRadius: "8px",
          boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.05)",
          overflow: "hidden"
        }}>
          <table className="table mb-0" style={{ tableLayout: "fixed" }}>
            <thead style={{ backgroundColor: "#F9FAFB" }}>
              <tr>
                <th style={{ width: "40px", padding: "12px 16px" }}>
                  <div className="d-flex align-items-center justify-content-center">
                    <input 
                      type="checkbox" 
                      style={{ 
                        width: "16px", 
                        height: "16px", 
                        borderRadius: "4px",
                        accentColor: "#FFD600" 
                      }} 
                    />
                  </div>
                </th>
                <th style={{ width: "200px", padding: "12px 16px", fontSize: "14px", fontWeight: 500, color: "#667085" }}>Member</th>
                <th style={{ width: "120px", padding: "12px 16px", fontSize: "14px", fontWeight: 500, color: "#667085" }}>Rank</th>
                <th style={{ width: "120px", padding: "12px 16px", fontSize: "14px", fontWeight: 500, color: "#667085" }}>Stats</th>
                <th style={{ width: "120px", padding: "12px 16px", fontSize: "14px", fontWeight: 500, color: "#667085" }}>Payouts</th>
                <th style={{ width: "120px", padding: "12px 16px", fontSize: "14px", fontWeight: 500, color: "#667085" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {tournamentData.players.map((player, index) => (
                <tr key={player.id} style={{ borderBottom: "1px solid #E5E7EB" }}>
                  <td style={{ padding: "12px 16px" }}>
                    <div className="d-flex align-items-center justify-content-center">
                      <input 
                        type="checkbox" 
                        checked={selectedPlayers.includes(player.id)}
                        onChange={() => togglePlayerSelection(player.id)}
                        style={{ 
                          width: "16px", 
                          height: "16px", 
                          borderRadius: "4px",
                          accentColor: "#FFD600" 
                        }} 
                      />
                    </div>
                  </td>
                  <td style={{ padding: "12px 16px", fontSize: "14px", color: "#101828" }}>{player.name}</td>
                  <td style={{ padding: "12px 16px", fontSize: "14px", color: "#101828" }}>{player.rank}</td>
                  <td style={{ padding: "12px 16px", fontSize: "14px", color: "#101828" }}>{player.stats}</td>
                  <td style={{ padding: "12px 16px", fontSize: "14px", color: "#101828" }}>{player.payout}</td>
                  <td style={{ padding: "12px 16px" }}>
                    <Button
                      color="warning"
                      className="d-flex align-items-center justify-content-center gap-2"
                      style={{
                        backgroundColor: "#FFD600",
                        border: "none",
                        borderRadius: "8px",
                        padding: "6px 12px",
                        color: "#101828",
                        fontWeight: 500,
                        fontSize: "14px",
                        width: "80px"
                      }}
                    >
                      <span>Send</span>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.33337 8H12.6667" stroke="#101828" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M8 3.33301L12.6667 7.99967L8 12.6663" stroke="#101828" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style jsx>{`
        .table th, .table td {
          vertical-align: middle;
        }
        
        input[type="checkbox"] {
          cursor: pointer;
        }
      `}</style>
    </AdminDashboardLayout>
  );
}
