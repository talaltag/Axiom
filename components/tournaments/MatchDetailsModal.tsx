
import React, { useState } from 'react';
import { Modal } from 'reactstrap';
import styles from '../../styles/Brackets.module.css';

interface MatchDetailsModalProps {
  isOpen: boolean;
  toggle: () => void;
  match: any;
}

const MatchDetailsModal: React.FC<MatchDetailsModalProps> = ({ isOpen, toggle, match }) => {
  const [activeTab, setActiveTab] = useState('results');
  const [notes, setNotes] = useState('');
  const [date, setDate] = useState('12/06/2024');
  const [time, setTime] = useState('09:00AM');

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
              <div className={styles.statusIndicator} style={{ background: '#ECFDF3', color: '#039855' }}>
                W
              </div>
              <div>Avengers Reborn</div>
            </div>
            <div style={{ color: '#667085' }}>M-{match?.id}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div>DC Champions</div>
              <div className={styles.statusIndicator} style={{ background: '#FEF3F2', color: '#D92D20' }}>
                L
              </div>
            </div>
          </div>
          <div style={{ color: '#039855', fontSize: '14px' }}>Match Completed</div>
        </div>

        <div className={styles.tabContainer}>
          <button 
            className={`${styles.tab} ${activeTab === 'results' ? styles.active : ''}`}
            onClick={() => setActiveTab('results')}
          >
            Results
          </button>
          <button 
            className={`${styles.tab} ${activeTab === 'info' ? styles.active : ''}`}
            onClick={() => setActiveTab('info')}
          >
            Info
          </button>
        </div>

        {activeTab === 'results' && (
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
        )}

        {activeTab === 'info' && (
          <div className={styles.infoContent}>
            <div className={styles.timeInputs}>
              <div className={styles.inputGroup}>
                <label>Date</label>
                <div className={styles.inputWithIcon}>
                  <input
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                  <button>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.66667 1.66666V4.16666M13.3333 1.66666V4.16666M2.91667 7.57499H17.0833M17.5 7.08332V14.1667C17.5 16.6667 16.25 18.3333 13.3333 18.3333H6.66667C3.75 18.3333 2.5 16.6667 2.5 14.1667V7.08332C2.5 4.58332 3.75 2.91666 6.66667 2.91666H13.3333C16.25 2.91666 17.5 4.58332 17.5 7.08332Z" stroke="#667085" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
              <div className={styles.inputGroup}>
                <label>Time</label>
                <div className={styles.inputWithIcon}>
                  <input
                    type="text"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                  <button>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z" stroke="#667085" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M10 5.83334V10H14.1667" stroke="#667085" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className={styles.notesSection}>
              <label>Notes</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Note here..."
              />
            </div>
            <button className={styles.saveButton}>Save</button>
          </div>
        )}

        <button className={styles.saveButton}>Save</button>
      </div>
    </Modal>
  );
};

export default MatchDetailsModal;
