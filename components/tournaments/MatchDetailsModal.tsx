
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
        <div className={styles.matchHeader} style={{ padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ 
                width: '32px', 
                height: '32px', 
                borderRadius: '50%', 
                background: '#ECFDF3',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#039855',
                fontWeight: 500
              }}>
                W
              </div>
              <div>{match?.participants?.[0]?.name}</div>
            </div>
            <div style={{ color: '#667085' }}>M-{match?.id}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div>{match?.participants?.[1]?.name}</div>
              <div style={{ 
                width: '32px', 
                height: '32px', 
                borderRadius: '50%', 
                background: '#FEF3F2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#D92D20',
                fontWeight: 500
              }}>
                L
              </div>
            </div>
          </div>
          <div style={{ color: '#039855', fontSize: '14px' }}>Match Completed</div>
        </div>

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
