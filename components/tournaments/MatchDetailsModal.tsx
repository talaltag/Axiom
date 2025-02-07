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
      <div className={styles.modalHeader}>
        <div className={styles.titleContainer}>
          <h5>Match Details</h5>
        </div>
        <button onClick={toggle} className={styles.closeButton}>×</button>
      </div>

      <div className={styles.modalBody}>
        <div className={styles.matchInfo}>
          <div className={styles.teamsContainer}>
            <div className={styles.teamInfo}>
              <div className={`${styles.resultIndicator} ${styles.win}`}>W</div>
              <span className={styles.teamName}>{match?.participants?.[0]?.name}</span>
            </div>
            <div className={styles.matchId}>
              {match?.id ? `M-${match.id}` : 'Match ID'}
            </div>
            <div className={styles.teamInfo}>
              <div className={`${styles.resultIndicator} ${styles.loss}`}>L</div>
              <span className={styles.teamName}>{match?.participants?.[1]?.name}</span>
            </div>
          </div>
          <div className={styles.matchStatus}>
            <span>Match Completed</span>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default MatchDetailsModal;