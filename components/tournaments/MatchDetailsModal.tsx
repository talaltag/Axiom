
import React from 'react';
import { Modal } from 'reactstrap';
import styles from '../../styles/Brackets.module.css';

interface MatchDetailsModalProps {
  isOpen: boolean;
  toggle: () => void;
  match: any;
}

const MatchDetailsModal: React.FC<MatchDetailsModalProps> = ({ isOpen, toggle, match }) => {
  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      centered
      backdrop="static"
      className={styles.matchDetailsModal}
      contentClassName={styles.matchDetailsContent}
    >
      <div className={styles.matchDetailsHeader}>
        <h5>Match Details</h5>
        <button onClick={toggle} className={styles.closeButton}>×</button>
      </div>
      
      <div className={styles.matchTeams}>
        {match?.participants?.map((participant: any, index: number) => (
          <div key={index} className={styles.teamRow}>
            <div className={`${styles.teamIndicator} ${participant.isWinner ? styles.winner : styles.loser}`}>
              {participant.isWinner ? 'W' : 'L'}
            </div>
            <div className={styles.teamName}>{participant.name}</div>
            <div className={styles.matchScore}>
              {participant.resultText}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.matchInfo}>
        <div className={styles.infoRow}>
          <span>Date</span>
          <span>20/09/2024</span>
          <button className={styles.timeButton}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z" stroke="#667085" strokeWidth="1.5"/>
              <path d="M8 5V8L10 10" stroke="#667085" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
        <div className={styles.infoRow}>
          <span>Time</span>
          <span>09:00 PM</span>
        </div>
        <div className={styles.infoRow}>
          <span>Notes</span>
          <span className={styles.notes}>Write here...</span>
        </div>
      </div>

      <button className={styles.saveButton}>Save</button>
    </Modal>
  );
};

export default MatchDetailsModal;
