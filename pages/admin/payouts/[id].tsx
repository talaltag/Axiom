
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
      <div className="p-4">
        {/* Header with back button */}
        <div className="d-flex align-items-center mb-4">
          <Link href="/admin/payouts">
            <a className="d-flex align-items-center" style={{ textDecoration: "none", color: "#667085" }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.8332 10.0001H4.1665M4.1665 10.0001L9.99984 15.8334M4.1665 10.0001L9.99984 4.16675" stroke="#667085" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="ms-2">Pay Outs</span>
            </a>
          </Link>
        </div>

        {/* Tournament Title */}
        <h1 style={{ 
          fontSize: "24px", 
          fontWeight: 600, 
          color: "#101828",
          marginBottom: "24px"
        }}>
          Tournament Name
        </h1>

        {/* Tournament Banner */}
        <div className="position-relative mb-4" style={{ 
          height: "200px", 
          borderRadius: "8px",
          overflow: "hidden" 
        }}>
          <Image
            src="/fortnite-banner.png"
            layout="fill"
            objectFit="cover"
            alt="Tournament Banner"
          />
        </div>

        {/* Tournament Won Section */}
        <h2 style={{ 
          fontSize: "18px", 
          fontWeight: 600, 
          color: "#101828",
          marginBottom: "16px" 
        }}>
          Tournament Won
        </h2>

        {/* Tournament Info and Total Payouts Cards */}
        <div className="d-flex gap-4 mb-4">
          {/* Tournament Info Card */}
          <div 
            className="flex-grow-1 bg-white p-4" 
            style={{
              border: "1px solid #E5E7EB", 
              borderRadius: "8px",
              boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.05)" 
            }}
          >
            <div className="d-flex align-items-start">
              {/* Tournament Image */}
              <div 
                style={{ 
                  width: "140px", 
                  height: "100px", 
                  borderRadius: "6px",
                  overflow: "hidden",
                  position: "relative",
                  marginRight: "16px"
                }}
              >
                <Image
                  src="/fortnite-banner.png"
                  layout="fill"
                  objectFit="cover"
                  alt="Tournament"
                />
              </div>
              
              {/* Tournament Details */}
              <div>
                <div style={{ 
                  fontSize: "16px", 
                  fontWeight: 600,
                  color: "#101828",
                  marginBottom: "8px" 
                }}>
                  {tournamentData.tournament}
                </div>
                <div style={{ 
                  fontSize: "14px", 
                  color: "#667085",
                  marginBottom: "12px" 
                }}>
                  {tournamentData.date}
                </div>
                
                {/* Winning Team */}
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
                        src="/admin/crown-icon.svg" 
                        width={16} 
                        height={16} 
                        alt="Crown Icon" 
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
                  src="/admin/crown-icon.svg" 
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
                <Image 
                  src="/admin/arrow-right-black.svg" 
                  width={16} 
                  height={16} 
                  alt="Arrow Right" 
                />
              </Button>
            </div>
          </div>
        </div>

        {/* Members Table */}
        <div 
          className="bg-white" 
          style={{
            border: "1px solid #E5E7EB", 
            borderRadius: "8px",
            boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.05)"
          }}
        >
          {/* Table Header */}
          <div 
            className="d-flex py-3 px-4 border-bottom" 
            style={{ 
              background: "#F9FAFB",
              borderTopLeftRadius: "8px",
              borderTopRightRadius: "8px"
            }}
          >
            <div style={{ width: "40px" }}></div>
            <div style={{ width: "200px", fontSize: "12px", fontWeight: 500, color: "#667085" }}>Member</div>
            <div style={{ width: "100px", fontSize: "12px", fontWeight: 500, color: "#667085" }}>Rank</div>
            <div style={{ width: "150px", fontSize: "12px", fontWeight: 500, color: "#667085" }}>Stats</div>
            <div style={{ width: "150px", fontSize: "12px", fontWeight: 500, color: "#667085" }}>Payouts</div>
            <div style={{ width: "150px", fontSize: "12px", fontWeight: 500, color: "#667085" }}>Action</div>
          </div>
          
          {/* Table Body */}
          {tournamentData.players.map(player => (
            <div 
              key={player.id}
              className="d-flex align-items-center py-3 px-4 border-bottom"
            >
              <div style={{ width: "40px" }}>
                <input
                  type="checkbox"
                  checked={selectedPlayers.includes(player.id)}
                  onChange={() => togglePlayerSelection(player.id)}
                  style={{
                    width: "16px",
                    height: "16px",
                    accentColor: "#FFD600"
                  }}
                />
              </div>
              <div style={{ width: "200px", fontSize: "14px", fontWeight: 500, color: "#101828" }}>{player.name}</div>
              <div style={{ width: "100px", fontSize: "14px", color: "#667085" }}>{player.rank}</div>
              <div style={{ width: "150px", fontSize: "14px", color: "#667085" }}>{player.stats}</div>
              <div style={{ width: "150px", fontSize: "14px", color: "#667085" }}>{player.payout}</div>
              <div style={{ width: "150px" }}>
                <Button
                  color="warning"
                  className="d-flex align-items-center justify-content-center gap-1"
                  style={{
                    backgroundColor: "#FFD600",
                    border: "none",
                    borderRadius: "8px",
                    padding: "8px 16px",
                    color: "#101828",
                    fontWeight: 500,
                    fontSize: "14px",
                    width: "80px"
                  }}
                >
                  <span>Send</span>
                  <Image 
                    src="/admin/arrow-right-black.svg" 
                    width={16} 
                    height={16} 
                    alt="Arrow Right" 
                  />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminDashboardLayout>
  );
}
