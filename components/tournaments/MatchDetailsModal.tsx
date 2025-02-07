
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
        <div className={styles.matchTeams}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="d-flex align-items-center gap-2">
              <div className={`${styles.statusIndicator} ${styles.winner}`}>W</div>
              <span>{match?.participants?.[0]?.name}</span>
            </div>
            <div className={`${styles.statusIndicator} ${styles.winner}`}>
              M-{match?.id}
            </div>
            <div className="d-flex align-items-center gap-2">
              <div className={`${styles.statusIndicator} ${styles.loser}`}>L</div>
              <span>{match?.participants?.[1]?.name}</span>
            </div>
          </div>
          <div className="text-center text-success mb-3">Match Completed</div>
        </div>

        <div className="d-flex mb-3">
          <button className={`${styles.tab} ${styles.active}`}>Results</button>
          <button className={styles.tab}>Info</button>
        </div>

        <div className={styles.matchContent}>
          <div className={styles.tableHeader}>
            <span>Name</span>
            <span>For/Hit</span>
            <span>Score</span>
            <span>Result</span>
          </div>

          {match?.participants?.map((participant: any, index: number) => (
            <div key={index} className={styles.participantRow}>
              <div className={styles.participantName}>
                {participant.name}
              </div>
              <div className={styles.inputContainer}>
                <input type="text" className={styles.scoreInput} />
              </div>
              <div className={styles.inputContainer}>
                <input type="text" className={styles.scoreInput} />
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
