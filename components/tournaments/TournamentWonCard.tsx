
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../../styles/TournamentCard.module.css';

interface TournamentWonCardProps {
  tournamentName: string;
  tournamentDate: string;
  winningTeam: string;
  totalPayout: string;
  id: string;
}

const TournamentWonCard: React.FC<TournamentWonCardProps> = ({
  tournamentName,
  tournamentDate,
  winningTeam,
  totalPayout,
  id,
}) => {
  return (
    <div className="mb-4">
      <h4 className="mb-3" style={{ fontSize: '18px', fontWeight: '600' }}>Tournament Won</h4>
      <div className="d-flex" style={{ 
        backgroundColor: '#F9FAFB', 
        borderRadius: '8px',
        boxShadow: '0px 1px 3px rgba(16, 24, 40, 0.1)'
      }}>
        {/* Tournament image column - first column */}
        <div style={{ 
          width: '200px', 
          borderRadius: '8px 0 0 8px',
          overflow: 'hidden',
          position: 'relative'
        }}>
          <Image
            src="/admin/tournament-bg.jpg"
            alt="Tournament"
            width={200}
            height={100}
            style={{ objectFit: 'cover', height: '100%' }}
          />
        </div>
        
        {/* Tournament details column - second column */}
        <div className="p-3" style={{ width: '220px', borderRight: '1px solid #EAECF0' }}>
          <div className="d-flex justify-content-between align-items-start mb-2">
            <div>
              <div style={{ 
                fontSize: '14px', 
                fontWeight: '600', 
                color: '#101828',
                marginBottom: '4px'
              }}>
                {tournamentName}
              </div>
              <div style={{ fontSize: '14px', color: '#667085' }}>
                {tournamentDate}
              </div>
            </div>
            <div>
              <Image
                src="/admin/crown-icon.svg"
                alt="Crown"
                width={24}
                height={24}
              />
            </div>
          </div>
          <div className="mt-2">
            <div style={{ fontSize: '14px', color: '#344054' }}>
              Winning Team:
            </div>
            <div className="d-flex align-items-center">
              <div
                className="rounded-circle d-flex align-items-center justify-content-center me-2"
                style={{
                  width: "24px",
                  height: "24px",
                  backgroundColor: "#1D4ED8",
                  color: "white",
                  fontSize: "12px",
                }}
              >
                W
              </div>
              <span style={{ fontSize: '14px', fontWeight: '500' }}>
                {winningTeam}
              </span>
            </div>
          </div>
        </div>
        
        {/* Total payouts column - third column */}
        <div className="p-3 d-flex flex-column justify-content-center" style={{ width: '200px' }}>
          <div className="d-flex align-items-center mb-2">
            <Image
              src="/admin/medal-icon.svg"
              alt="Medal"
              width={24}
              height={24}
              className="me-2"
            />
            <span style={{ fontSize: '14px', color: '#667085' }}>
              Total Payouts
            </span>
          </div>
          <div style={{ fontSize: '24px', fontWeight: '600', color: '#101828', marginBottom: '8px' }}>
            ${totalPayout}
          </div>
          <Link href={`/admin/payouts/${id}`}>
            <div
              className="d-flex justify-content-center align-items-center"
              style={{
                backgroundColor: '#FFD600',
                color: '#000000',
                fontSize: '14px',
                fontWeight: '500',
                padding: '8px 16px',
                borderRadius: '8px',
                width: '100%',
                cursor: 'pointer',
              }}
            >
              Send to all
              <Image
                src="/admin/arrow-right-black.svg"
                alt="Arrow"
                width={16}
                height={16}
                className="ms-1"
              />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TournamentWonCard;
