
import React, { useState } from "react";
import AdminDashboardLayout from "../../../components/layouts/AdminDashboardLayout";
import { Button } from "reactstrap";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ArrowLeft } from "react-feather";

export default function PayoutDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [selectedPlayers, setSelectedPlayers] = useState<number[]>([]);

  // Sample data to match the provided design
  const tournamentData = {
    name: "Tournament Name",
    banner: "/fortnite-banner.png",
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
        {/* Header section */}
        <div className="d-flex align-items-center mb-3">
          <Link href="/admin/payouts">
            <a className="d-flex align-items-center text-decoration-none me-3">
              <ArrowLeft size={20} color="#667085" />
              <span 
                style={{ 
                  color: "#667085", 
                  fontSize: "14px",
                  marginLeft: "4px" 
                }}
              >
                Pay Outs
              </span>
            </a>
          </Link>
          
          <div className="ms-auto">
            <Button
              outline
              size="sm"
              className="d-flex align-items-center"
              style={{
                color: "#344054",
                borderColor: "#D0D5DD",
                background: "white",
                padding: "8px 14px",
                fontWeight: 500,
                fontSize: "14px",
                borderRadius: "8px",
              }}
            >
              <ArrowLeft size={16} className="me-1" /> Back
            </Button>
          </div>
        </div>

        {/* Tournament name */}
        <h4 
          className="mb-3" 
          style={{ 
            fontWeight: 500, 
            color: "#101828",
            fontSize: "24px"
          }}
        >
          {tournamentData.name}
        </h4>

        {/* Tournament banner image */}
        <div 
          className="position-relative mb-4" 
          style={{ 
            height: "150px", 
            width: "100%", 
            borderRadius: "12px",
            overflow: "hidden"
          }}
        >
          <Image
            src={tournamentData.banner}
            layout="fill"
            objectFit="cover"
            alt="Tournament Banner"
          />
        </div>

        {/* Tournament Won section */}
        <h5 
          className="mb-3" 
          style={{ 
            fontWeight: 500, 
            color: "#101828",
            fontSize: "18px"
          }}
        >
          Tournament Won
        </h5>

        <div className="d-flex flex-wrap mb-4">
          {/* Tournament details card */}
          <div 
            className="me-4 mb-3" 
            style={{
              flex: "1 1 auto", 
              maxWidth: "560px",
              minWidth: "280px"
            }}
          >
            <div 
              className="bg-white d-flex p-4" 
              style={{
                border: "1px solid #EAECF0", 
                borderRadius: "8px",
                boxShadow: "0px 1px 3px rgba(16, 24, 40, 0.1)"
              }}
            >
              {/* Left side - Tournament image */}
              <div 
                className="position-relative me-4" 
                style={{ 
                  width: "120px", 
                  height: "120px", 
                  borderRadius: "8px",
                  overflow: "hidden"
                }}
              >
                <Image 
                  src={tournamentData.banner}
                  layout="fill"
                  objectFit="cover"
                  alt="Tournament Image" 
                />
              </div>
              
              {/* Right side - Tournament info */}
              <div className="d-flex flex-column justify-content-between">
                <div>
                  <div 
                    style={{ 
                      fontSize: "16px", 
                      fontWeight: 600,
                      color: "#101828",
                      marginBottom: "8px" 
                    }}
                  >
                    {tournamentData.tournament}
                  </div>
                  <div 
                    style={{ 
                      fontSize: "14px", 
                      color: "#667085",
                      marginBottom: "16px" 
                    }}
                  >
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
                boxShadow: "0px 1px 3px rgba(16, 24, 40, 0.1)" 
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
            border: "1px solid #EAECF0",
            borderRadius: "8px",
            boxShadow: "0px 1px 3px rgba(16, 24, 40, 0.1)"
          }}
        >
          <table 
            className="table mb-0" 
            style={{
              color: "#101828"
            }}
          >
            <thead>
              <tr 
                style={{
                  backgroundColor: "#F9FAFB",
                  fontSize: "12px",
                  fontWeight: 500,
                  color: "#667085",
                  textTransform: "uppercase"
                }}
              >
                <th 
                  style={{
                    padding: "12px 24px",
                    borderBottom: "1px solid #EAECF0",
                    fontWeight: 500
                  }}
                >
                  <div className="d-flex align-items-center">
                    <input 
                      type="checkbox" 
                      className="me-2" 
                      style={{
                        width: "16px",
                        height: "16px"
                      }}
                    />
                    <span>Member</span>
                  </div>
                </th>
                <th 
                  style={{
                    padding: "12px 24px",
                    borderBottom: "1px solid #EAECF0",
                    fontWeight: 500
                  }}
                >
                  Rank
                </th>
                <th 
                  style={{
                    padding: "12px 24px",
                    borderBottom: "1px solid #EAECF0",
                    fontWeight: 500
                  }}
                >
                  Stats
                </th>
                <th 
                  style={{
                    padding: "12px 24px",
                    borderBottom: "1px solid #EAECF0",
                    fontWeight: 500
                  }}
                >
                  Payouts
                </th>
                <th 
                  style={{
                    padding: "12px 24px",
                    borderBottom: "1px solid #EAECF0",
                    fontWeight: 500,
                    textAlign: "center"
                  }}
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {tournamentData.players.map((player) => (
                <tr key={player.id}>
                  <td 
                    style={{
                      padding: "16px 24px",
                      borderBottom: "1px solid #EAECF0",
                      fontSize: "14px",
                      fontWeight: 500
                    }}
                  >
                    <div className="d-flex align-items-center">
                      <input 
                        type="checkbox" 
                        className="me-2" 
                        style={{
                          width: "16px",
                          height: "16px"
                        }}
                        checked={selectedPlayers.includes(player.id)}
                        onChange={() => togglePlayerSelection(player.id)}
                      />
                      <span>{player.name}</span>
                    </div>
                  </td>
                  <td 
                    style={{
                      padding: "16px 24px",
                      borderBottom: "1px solid #EAECF0",
                      fontSize: "14px"
                    }}
                  >
                    {player.rank}
                  </td>
                  <td 
                    style={{
                      padding: "16px 24px",
                      borderBottom: "1px solid #EAECF0",
                      fontSize: "14px"
                    }}
                  >
                    {player.stats}
                  </td>
                  <td 
                    style={{
                      padding: "16px 24px",
                      borderBottom: "1px solid #EAECF0",
                      fontSize: "14px"
                    }}
                  >
                    {player.payout}
                  </td>
                  <td 
                    style={{
                      padding: "16px 24px",
                      borderBottom: "1px solid #EAECF0",
                      textAlign: "center"
                    }}
                  >
                    <Button
                      color="warning"
                      size="sm"
                      className="d-flex align-items-center justify-content-center gap-1 mx-auto"
                      style={{
                        backgroundColor: "#FFD600",
                        border: "none",
                        borderRadius: "8px",
                        padding: "6px 12px",
                        fontSize: "14px",
                        fontWeight: 500,
                        color: "#101828"
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
