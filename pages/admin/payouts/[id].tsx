
import React, { useState, useEffect } from "react";
import AdminDashboardLayout from "../../../components/layouts/AdminDashboardLayout";
import { useRouter } from "next/router";
import {
  Button,
  Table,
  Badge,
} from "reactstrap";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Send } from "react-feather";

export default function TournamentDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(true);
  const [tournament, setTournament] = useState({
    name: "PUBG - SUMMER CAMP",
    date: "5/22/2023",
    winningTeam: "Wolves",
    image: "/admin/pubg-detail.jpg",
    banner: "/admin/pubg-banner.jpg",
    totalPayout: "$1,234",
    players: [
      { name: "Jake", rank: "EXP", stats: "10 Kills", payout: "$250" },
      { name: "Adam", rank: "AMA", stats: "10 Kills", payout: "$250" },
      { name: "Smith", rank: "EXP", stats: "10 Kills", payout: "$250" },
      { name: "Mark", rank: "VET", stats: "10 Kills", payout: "$250" },
      { name: "John", rank: "AMA", stats: "10 Kills", payout: "$250" },
      { name: "0121", rank: "AMA", stats: "10 Kills", payout: "$250" },
    ],
  });

  useEffect(() => {
    // In a real application, you would fetch the tournament data here
    // For now, we'll use the mock data defined above
    setLoading(false);
  }, [id]);

  const handleSendPayment = (player) => {
    // Logic to handle sending payment to a player
    console.log(`Sending payment to ${player}`);
  };

  const handleSendAllPayments = () => {
    // Logic to handle sending all payments
    console.log("Sending all payments");
  };

  if (loading) {
    return (
      <AdminDashboardLayout>
        <div className="p-4">Loading...</div>
      </AdminDashboardLayout>
    );
  }

  return (
    <AdminDashboardLayout>
      <div style={{ padding: "24px" }}>
        {/* Header with Back Button */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <Link href="/admin/payouts" passHref>
            <div className="d-flex align-items-center" style={{ cursor: "pointer", color: "#344054" }}>
              <ArrowLeft size={20} />
              <span className="ms-2">Pay Outs</span>
            </div>
          </Link>
        </div>
        
        {/* Tournament Name */}
        <h3 style={{ 
          marginBottom: "24px", 
          fontSize: "24px", 
          fontWeight: "600",
          color: "#101828" 
        }}>
          Tournament Name
        </h3>
        
        {/* Banner Image */}
        <div 
          className="position-relative rounded mb-4" 
          style={{ 
            height: "136px", 
            overflow: "hidden",
            borderRadius: "8px"
          }}
        >
          <Image 
            src={tournament.banner} 
            alt={tournament.name} 
            layout="fill" 
            objectFit="cover"
          />
        </div>
        
        {/* Tournament Won */}
        <h4 style={{ 
          marginBottom: "24px", 
          fontSize: "18px", 
          fontWeight: "600",
          color: "#101828" 
        }}>
          Tournament Won
        </h4>
        
        {/* Tournament Details and Payouts */}
        <div className="row mb-4">
          <div className="col-md-8">
            <div className="d-flex">
              {/* Tournament Image */}
              <div className="position-relative me-4" style={{ width: "170px", height: "120px", borderRadius: "8px", overflow: "hidden" }}>
                <Image
                  src={tournament.image}
                  alt={tournament.name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              
              <div>
                {/* Tournament Info */}
                <h5 style={{ 
                  fontSize: "16px", 
                  fontWeight: "600", 
                  marginBottom: "6px",
                  color: "#101828" 
                }}>
                  {tournament.name}
                </h5>
                <p style={{ 
                  fontSize: "14px", 
                  color: "#667085", 
                  marginBottom: "12px" 
                }}>
                  {tournament.date}
                </p>
                
                {/* Winning Team */}
                <div style={{ fontSize: "14px", color: "#101828" }}>
                  <span>Winning Team</span>
                  <div className="d-flex align-items-center mt-2">
                    <div className="position-relative me-2" style={{ width: "24px", height: "24px", borderRadius: "50%", overflow: "hidden" }}>
                      <Image
                        src="/user1.png"
                        alt="Team Logo"
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <span style={{ color: "#344054" }}>{tournament.winningTeam}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-md-4">
            {/* Total Payouts Card */}
            <div 
              style={{
                border: "1px solid #EAECF0",
                borderRadius: "8px",
                padding: "24px",
                backgroundColor: "white"
              }}
            >
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex align-items-center">
                  <div style={{ marginRight: "12px" }}>
                    <Image
                      src="/admin/medal-icon.svg"
                      alt="Medal"
                      width={40}
                      height={40}
                    />
                  </div>
                  <span style={{ fontSize: "16px", fontWeight: "600", color: "#101828" }}>
                    Total Payouts
                  </span>
                </div>
              </div>
              <h4 style={{ fontSize: "24px", fontWeight: "700", color: "#101828", marginBottom: "16px" }}>
                {tournament.totalPayout}
              </h4>
              <Button
                color="warning"
                block
                className="d-flex align-items-center justify-content-center"
                style={{ backgroundColor: "#FFD600", borderColor: "#FFD600", height: "40px", color: "#101828" }}
                onClick={handleSendAllPayments}
              >
                <span>Send to all</span>
                <Send size={14} className="ms-2" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Players Table */}
        <div className="mt-4">
          <Table responsive hover style={{ backgroundColor: "white", borderRadius: "8px", overflow: "hidden" }}>
            <thead style={{ backgroundColor: "#F9FAFB" }}>
              <tr>
                <th style={{ width: "40px" }}></th>
                <th style={{ fontSize: "14px", fontWeight: "500", color: "#667085", padding: "12px 24px" }}>Member</th>
                <th style={{ fontSize: "14px", fontWeight: "500", color: "#667085", padding: "12px 24px" }}>Rank</th>
                <th style={{ fontSize: "14px", fontWeight: "500", color: "#667085", padding: "12px 24px" }}>Stats</th>
                <th style={{ fontSize: "14px", fontWeight: "500", color: "#667085", padding: "12px 24px" }}>Payouts</th>
                <th style={{ fontSize: "14px", fontWeight: "500", color: "#667085", padding: "12px 24px" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {tournament.players.map((player, index) => (
                <tr key={index}>
                  <td className="align-middle text-center">
                    <input 
                      type="checkbox" 
                      className="form-check-input" 
                      style={{ marginLeft: "16px" }} 
                    />
                  </td>
                  <td style={{ fontSize: "14px", fontWeight: "500", color: "#101828", padding: "16px 24px" }}>
                    {player.name}
                  </td>
                  <td style={{ fontSize: "14px", color: "#667085", padding: "16px 24px" }}>
                    {player.rank}
                  </td>
                  <td style={{ fontSize: "14px", color: "#667085", padding: "16px 24px" }}>
                    {player.stats}
                  </td>
                  <td style={{ fontSize: "14px", fontWeight: "500", color: "#101828", padding: "16px 24px" }}>
                    {player.payout}
                  </td>
                  <td style={{ padding: "16px 24px" }}>
                    <Button
                      color="warning"
                      size="sm"
                      className="d-flex align-items-center"
                      style={{ 
                        backgroundColor: "#FFD600", 
                        borderColor: "#FFD600", 
                        color: "#101828",
                        borderRadius: "4px",
                        padding: "6px 12px",
                        fontSize: "14px"
                      }}
                      onClick={() => handleSendPayment(player.name)}
                    >
                      <span>Send</span>
                      <Send size={14} className="ms-1" />
                    </Button>
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
