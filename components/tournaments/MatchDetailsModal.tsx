
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
          <div className={styles.infoContent} style={{ padding: '20px' }}>
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', color: '#667085', marginBottom: '6px' }}>Date</label>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                      type="text"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      style={{
                        padding: '8px',
                        border: '1px solid #D0D5DD',
                        borderRadius: '6px',
                        width: '120px'
                      }}
                    />
                    <button className={styles.timeButton}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z" stroke="#667085" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', color: '#667085', marginBottom: '6px' }}>Time</label>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                      type="text"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      style={{
                        padding: '8px',
                        border: '1px solid #D0D5DD',
                        borderRadius: '6px',
                        width: '120px'
                      }}
                    />
                    <button className={styles.timeButton}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z" stroke="#667085" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <label style={{ display: 'block', color: '#667085', marginBottom: '6px' }}>Notes</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Note here..."
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #D0D5DD',
                    borderRadius: '6px',
                    minHeight: '100px',
                    resize: 'vertical'
                  }}
                />
              </div>
            </div>
          </div>
        )}

        <button className={styles.saveButton}>Save</button>
      </div>
    </Modal>
  );
};

export default MatchDetailsModal;
