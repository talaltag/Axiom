
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
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="d-flex align-items-center gap-2">
            <div className={`${styles.statusIndicator} ${styles.winner}`}>W</div>
            <span>{match?.participants?.[0]?.name}</span>
          </div>
          <div style={{ color: '#667085' }}>
            M-{match?.id}
          </div>
          <div className="d-flex align-items-center gap-2">
            <div className={`${styles.statusIndicator} ${styles.loser}`}>L</div>
            <span>{match?.participants?.[1]?.name}</span>
          </div>
        </div>
        <div className="text-center text-success mb-4" style={{ color: '#027A48' }}>Match Completed</div>

        <div className="d-flex mb-3">
          <button className={`${styles.tab} ${styles.active}`}>Results</button>
          <button className={styles.tab}>Info</button>
        </div>

        <table className="table">
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
                  <input type="text" className="form-control form-control-sm" />
                </td>
                <td>
                  <input type="text" className="form-control form-control-sm" />
                </td>
                <td>
                  <div className="btn-group" role="group">
                    <button type="button" className="btn btn-sm btn-outline-success">W</button>
                    <button type="button" className="btn btn-sm btn-outline-warning">D</button>
                    <button type="button" className="btn btn-sm btn-outline-danger">L</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button className={styles.saveButton}>Save</button>
      </div>
    </Modal>
  );
};

export default MatchDetailsModal;
