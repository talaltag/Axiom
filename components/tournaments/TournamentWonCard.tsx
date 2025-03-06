
import React from 'react';
import Image from 'next/image';
import styles from '../../styles/TournamentCard.module.css';

interface TournamentWonCardProps {
  name: string;
  date: string;
  team: string;
  totalPayout: string;
  tournamentImage?: string;
  onSendToAll: () => void;
}

const TournamentWonCard: React.FC<TournamentWonCardProps> = ({
  name,
  date,
  team,
  totalPayout,
  tournamentImage = '/admin/tournament-bg.jpg',
  onSendToAll
}) => {
  return (
    <div className={styles.cardContainer}>
      {/* Tournament Image */}
      <div className={styles.imageColumn}>
        <div className={styles.imageWrapper}>
          <Image
            src={tournamentImage}
            alt={name}
            fill
            style={{ objectFit: 'cover' }}
            className={styles.tournamentImage}
          />
        </div>
      </div>
      
      {/* Tournament Info */}
      <div className={styles.infoColumn}>
        <div className={styles.tournamentInfo}>
          <div className={styles.headerRow}>
            <h3 className={styles.tournamentName}>{name}</h3>
            <div className={styles.crownIconWrapper}>
              <Image 
                src="/admin/crown-icon.svg" 
                alt="Winner" 
                width={24} 
                height={24} 
              />
            </div>
          </div>
          <p className={styles.tournamentDate}>{date}</p>
          <div className={styles.teamRow}>
            <span className={styles.teamLabel}>Winning Team</span>
            <div className={styles.teamInfo}>
              <div className={styles.teamIcon}>
                <span>W</span>
              </div>
              <span className={styles.teamName}>{team}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Payout Info */}
      <div className={styles.payoutColumn}>
        <div className={styles.payoutInfo}>
          <div className={styles.payoutHeader}>
            <Image 
              src="/admin/medal-icon.svg" 
              alt="Medal" 
              width={24} 
              height={24} 
            />
            <span className={styles.payoutLabel}>Total Payouts</span>
          </div>
          <div className={styles.payoutAmount}>${totalPayout}</div>
          <button className={styles.sendButton} onClick={onSendToAll}>
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
    </div>
  );
};

export default TournamentWonCard;
