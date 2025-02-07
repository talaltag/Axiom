
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
      className={styles.matchDetailsModal}
      contentClassName={styles.matchDetailsContent}
    >
      <div className={styles.matchDetailsHeader}>
        <h5>Match Details</h5>
        <button onClick={toggle} className={styles.closeButton}>×</button>
      </div>

      <div className={styles.matchInfo}>
        <div className={styles.matchTitle}>
          M-{match?.id}
          <span className={styles.matchStatus}>Match Completed</span>
        </div>

        <div className={styles.teamsContainer}>
          <div className={styles.teamHeader}>
            <span>Name</span>
            <span>For/Hit</span>
            <span>Score</span>
            <span>Result</span>
          </div>

          {match?.participants?.map((participant: any, index: number) => (
            <div key={index} className={styles.teamRow}>
              <div className={styles.teamName}>
                <span className={`${styles.resultIndicator} ${participant.isWinner ? styles.winner : styles.loser}`}>
                  {participant.isWinner ? 'W' : 'L'}
                </span>
                {participant.name}
              </div>
              <div className={styles.teamStats}>
                <input type="text" className={styles.statInput} />
              </div>
              <div className={styles.teamStats}>
                <input type="text" className={styles.statInput} />
              </div>
              <div className={styles.resultButtons}>
                <button className={`${styles.resultButton} ${styles.winButton}`}>W</button>
                <button className={`${styles.resultButton} ${styles.drawButton}`}>D</button>
                <button className={`${styles.resultButton} ${styles.loseButton}`}>L</button>
              </div>
            </div>
          ))}
        </div>

        <button className={styles.saveButton}>Save</button>
      </div>
    </Modal>
  );
};

export default MatchDetailsModal;
