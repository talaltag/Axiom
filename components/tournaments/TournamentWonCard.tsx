
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface TournamentWonCardProps {
  tournamentName: string;
  date: string;
  winningTeam: string;
  totalPayouts: string;
}

const TournamentWonCard: React.FC<TournamentWonCardProps> = ({
  tournamentName,
  date,
  winningTeam,
  totalPayouts
}) => {
  return (
    <div className="tournament-won-container">
      <h2 className="section-title">Tournament Won</h2>
      <div className="tournament-won-card">
        {/* First column - Background Image */}
        <div className="tournament-image-container">
          <Image 
            src="/admin/tournament-bg.jpg" 
            alt="Tournament Background" 
            layout="fill"
            objectFit="cover"
            className="tournament-image"
          />
        </div>
        
        {/* Second column - Tournament Info */}
        <div className="tournament-info">
          <div className="tournament-header">
            <div>
              <h3 className="tournament-name">{tournamentName}</h3>
              <p className="tournament-date">{date}</p>
              <div className="team-info">
                <span className="team-label">Winning Team:</span>
                <div className="team-badge">
                  <div className="team-icon">W</div>
                  <span className="team-name">{winningTeam}</span>
                </div>
              </div>
            </div>
            <div className="crown-icon-container">
              <Image 
                src="/admin/crown-icon.svg" 
                alt="Crown" 
                width={24} 
                height={24}
              />
            </div>
          </div>
        </div>
        
        {/* Third column - Payouts */}
        <div className="payouts-info">
          <div className="payouts-header">
            <div className="medal-icon-container">
              <Image 
                src="/admin/medal-icon.svg" 
                alt="Medal" 
                width={24} 
                height={24}
              />
            </div>
            <span className="payouts-label">Total Payouts</span>
          </div>
          <p className="payouts-amount">${totalPayouts}</p>
          <button className="send-all-button">
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

      <style jsx>{`
        .tournament-won-container {
          margin-bottom: 24px;
        }
        
        .section-title {
          font-size: 16px;
          font-weight: 600;
          color: #101828;
          margin-bottom: 16px;
        }
        
        .tournament-won-card {
          display: flex;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1);
        }
        
        .tournament-image-container {
          position: relative;
          width: 184px;
          height: 84px;
          overflow: hidden;
        }
        
        .tournament-image {
          border-radius: 8px 0 0 8px;
        }
        
        .tournament-info {
          background: white;
          padding: 16px;
          flex: 1;
          border-right: 1px solid #EAECF0;
        }
        
        .tournament-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }
        
        .tournament-name {
          font-size: 16px;
          font-weight: 600;
          color: #101828;
          margin: 0 0 4px 0;
        }
        
        .tournament-date {
          font-size: 14px;
          color: #667085;
          margin: 0 0 8px 0;
        }
        
        .team-info {
          display: flex;
          align-items: center;
        }
        
        .team-label {
          font-size: 14px;
          color: #344054;
          margin-right: 8px;
        }
        
        .team-badge {
          display: flex;
          align-items: center;
        }
        
        .team-icon {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background-color: #1D4ED8;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          margin-right: 4px;
        }
        
        .team-name {
          font-size: 14px;
          font-weight: 500;
          color: #101828;
        }
        
        .crown-icon-container {
          padding: 4px;
        }
        
        .payouts-info {
          background: white;
          padding: 16px;
          width: 220px;
          display: flex;
          flex-direction: column;
        }
        
        .payouts-header {
          display: flex;
          align-items: center;
          margin-bottom: 8px;
        }
        
        .medal-icon-container {
          margin-right: 8px;
        }
        
        .payouts-label {
          font-size: 14px;
          font-weight: 500;
          color: #344054;
        }
        
        .payouts-amount {
          font-size: 18px;
          font-weight: 600;
          color: #101828;
          margin: 0 0 12px 0;
        }
        
        .send-all-button {
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #FFD600;
          border: none;
          border-radius: 8px;
          padding: 8px 16px;
          font-size: 14px;
          font-weight: 500;
          color: #101828;
          cursor: pointer;
          gap: 8px;
        }
      `}</style>
    </div>
  );
};

export default TournamentWonCard;
