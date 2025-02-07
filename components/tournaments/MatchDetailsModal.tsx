
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
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h5>Match Details</h5>
          <div className={styles.matchInfo}>
            <div className={styles.teamStatus}>
              <span className={`${styles.statusBadge} ${styles.winBadge}`}>W</span>
              <span className={styles.teamName}>{match?.participants?.[0]?.name}</span>
            </div>
            <span className={styles.matchId}>M-{match?.id}</span>
            <div className={styles.teamStatus}>
              <span className={`${styles.statusBadge} ${styles.loseBadge}`}>L</span>
              <span className={styles.teamName}>{match?.participants?.[1]?.name}</span>
            </div>
          </div>
          <button onClick={toggle} className={styles.closeButton}>×</button>
        </div>

        <div className={styles.matchStatus}>Match Completed</div>

        <div className={styles.tabContainer}>
          <button className={`${styles.tab} ${styles.active}`}>Results</button>
          <button className={styles.tab}>Info</button>
        </div>

        <div className={styles.resultContent}>
          <table className={styles.resultTable}>
            <thead>
              <tr>
                <th>Name</th>
                <th>For/Hit</th>
                <th>Score</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              {match?.participants?.map((participant: any, index: number) => (
                <tr key={index}>
                  <td>{participant.name}</td>
                  <td>
                    <input type="text" className={styles.scoreInput} />
                  </td>
                  <td>
                    <input type="text" className={styles.scoreInput} />
                  </td>
                  <td>
                    <div className={styles.resultButtons}>
                      <button className={`${styles.resultButton} ${styles.winButton}`}>W</button>
                      <button className={`${styles.resultButton} ${styles.drawButton}`}>D</button>
                      <button className={`${styles.resultButton} ${styles.loseButton}`}>L</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button className={styles.saveButton}>Save</button>
      </div>
    </Modal>
  );
};

export default MatchDetailsModal;
