
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface TournamentWonCardProps {
  tournamentName: string;
  tournamentDate: string;
  winningTeam: string;
  totalPayouts: string;
  members: {
    name: string;
    rank: string;
    stats: string;
    payout: string;
  }[];
}

const TournamentWonCard: React.FC<TournamentWonCardProps> = ({
  tournamentName,
  tournamentDate,
  winningTeam,
  totalPayouts,
  members,
}) => {
  return (
    <div className="mt-4">
      <h4 className="mb-4">Tournament Won</h4>
      
      <div className="d-flex mb-4 gap-3">
        {/* First column - Tournament background image */}
        <div 
          style={{
            width: "175px",
            height: "120px",
            borderRadius: "8px",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <Image
            src="/admin/tournament-bg.jpg"
            alt="Tournament Background"
            layout="fill"
            objectFit="cover"
          />
        </div>

        {/* Second column - Tournament details */}
        <div
          style={{
            backgroundColor: "#fff",
            borderRadius: "8px",
            boxShadow: "0px 1px 3px rgba(16, 24, 40, 0.1)",
            padding: "16px",
            flex: "1",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          <div>
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <h5 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "8px" }}>
                  {tournamentName}
                </h5>
                <p style={{ fontSize: "14px", color: "#667085", marginBottom: "8px" }}>
                  {tournamentDate}
                </p>
              </div>
              <div 
                style={{
                  position: "absolute",
                  top: "16px",
                  right: "16px",
                }}
              >
                <Image
                  src="/admin/crown-icon.svg"
                  alt="Crown"
                  width={24}
                  height={24}
                />
              </div>
            </div>
            <div className="d-flex align-items-center">
              <span style={{ fontSize: "14px", color: "#344054", marginRight: "8px" }}>
                Winning Team:
              </span>
              <div className="d-flex align-items-center">
                <div
                  className="rounded-circle me-2 d-flex align-items-center justify-content-center"
                  style={{
                    width: "20px",
                    height: "20px",
                    backgroundColor: "#1D4ED8",
                    color: "white",
                    fontSize: "10px",
                  }}
                >
                  W
                </div>
                <span style={{ fontSize: "14px", fontWeight: "500" }}>
                  {winningTeam}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Third column - Total payouts */}
        <div
          style={{
            backgroundColor: "#fff",
            borderRadius: "8px",
            boxShadow: "0px 1px 3px rgba(16, 24, 40, 0.1)",
            padding: "16px",
            width: "200px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div className="d-flex align-items-center gap-2 mb-1">
            <Image
              src="/admin/medal-icon.svg"
              alt="Medal"
              width={24}
              height={24}
            />
            <span style={{ fontSize: "14px", fontWeight: "500" }}>Total Payouts</span>
          </div>
          <div style={{ fontSize: "20px", fontWeight: "600", marginBottom: "12px" }}>
            ${totalPayouts}
          </div>
          <button
            className="btn"
            style={{
              backgroundColor: "#FFD600",
              color: "#101828",
              fontWeight: "500",
              fontSize: "14px",
              padding: "8px 16px",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              width: "100%",
            }}
          >
            Send to all 
            <Image
              src="/admin/arrow-right-black.svg"
              alt="Arrow"
              width={16}
              height={16}
            />
          </button>
        </div>
      </div>

      {/* Member list table */}
      <div className="table-responsive">
        <table className="table" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#F9FAFB", height: "40px" }}>
              <th style={{ padding: "10px 16px", fontSize: "14px", fontWeight: "500", color: "#667085", textAlign: "left", width: "40px" }}>
                <input type="checkbox" />
              </th>
              <th style={{ padding: "10px 16px", fontSize: "14px", fontWeight: "500", color: "#667085", textAlign: "left" }}>
                Member
              </th>
              <th style={{ padding: "10px 16px", fontSize: "14px", fontWeight: "500", color: "#667085", textAlign: "left" }}>
                Rank
              </th>
              <th style={{ padding: "10px 16px", fontSize: "14px", fontWeight: "500", color: "#667085", textAlign: "left" }}>
                Stats
              </th>
              <th style={{ padding: "10px 16px", fontSize: "14px", fontWeight: "500", color: "#667085", textAlign: "left" }}>
                Payouts
              </th>
              <th style={{ padding: "10px 16px", fontSize: "14px", fontWeight: "500", color: "#667085", textAlign: "right" }}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {members.map((member, index) => (
              <tr key={index} style={{ borderBottom: "1px solid #EAECF0" }}>
                <td style={{ padding: "16px", textAlign: "left" }}>
                  <input type="checkbox" />
                </td>
                <td style={{ padding: "16px", fontSize: "14px" }}>{member.name}</td>
                <td style={{ padding: "16px", fontSize: "14px" }}>{member.rank}</td>
                <td style={{ padding: "16px", fontSize: "14px" }}>{member.stats}</td>
                <td style={{ padding: "16px", fontSize: "14px" }}>${member.payout}</td>
                <td style={{ padding: "16px", textAlign: "right" }}>
                  <button
                    className="btn"
                    style={{
                      backgroundColor: "#FFD600",
                      color: "#101828",
                      fontWeight: "500",
                      fontSize: "14px",
                      padding: "8px 16px",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      marginLeft: "auto",
                    }}
                  >
                    Send
                    <Image
                      src="/admin/arrow-right-black.svg"
                      alt="Arrow"
                      width={16}
                      height={16}
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TournamentWonCard;
