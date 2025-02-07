
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
        <div className={styles.matchHeader} style={{ padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div className={styles.statusIndicator} style={{ background: '#ECFDF3', color: '#039855', width: '32px', height: '32px', fontSize: '14px' }}>
                W
              </div>
              <div style={{ color: '#344054', fontSize: '14px', fontWeight: 500 }}>Avengers Reborn</div>
            </div>
            <div style={{ flex: 1, textAlign: 'center' }}>
              <div style={{ color: '#667085', fontSize: '14px' }}>M-1.1</div>
              <div style={{ color: '#12B76A', fontSize: '14px', marginTop: '4px' }}>Match Completed</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ color: '#344054', fontSize: '14px', fontWeight: 500 }}>DC Champions</div>
              <div className={styles.statusIndicator} style={{ background: '#FEF3F2', color: '#D92D20', width: '32px', height: '32px', fontSize: '14px' }}>
                L
              </div>
            </div>
          </div>
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
              <div className="bg-light p-3 rounded" style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ flex: 1, marginRight: '12px' }}>
                  <label style={{ display: 'block', color: '#344054', fontWeight: 500, marginBottom: '6px', fontSize: '14px' }}>Date</label>
                  <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: '8px', border: '1px solid #D0D5DD', padding: '8px 12px' }}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '8px' }}>
                      <path d="M6.66667 1.66666V4.16666M13.3333 1.66666V4.16666M2.91667 7.57499H17.0833M3.33333 3.33332H16.6667C17.1269 3.33332 17.5 3.70641 17.5 4.16666V16.6667C17.5 17.1269 17.1269 17.5 16.6667 17.5H3.33333C2.87309 17.5 2.5 17.1269 2.5 16.6667V4.16666C2.5 3.70641 2.87309 3.33332 3.33333 3.33332Z" stroke="#667085" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <input
                      type="text"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      style={{
                        border: 'none',
                        outline: 'none',
                        width: '100%',
                        fontSize: '14px',
                        color: '#101828'
                      }}
                    />
                  </div>
                </div>
                <div style={{ flex: 1, marginLeft: '12px' }}>
                  <label style={{ display: 'block', color: '#344054', fontWeight: 500, marginBottom: '6px', fontSize: '14px' }}>Time</label>
                  <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: '8px', border: '1px solid #D0D5DD', padding: '8px 12px' }}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '8px' }}>
                      <path d="M10 5V10L13.3333 11.6667M10 18.3333C14.6024 18.3333 18.3333 14.6024 18.3333 10C18.3333 5.39763 14.6024 1.66667 10 1.66667C5.39763 1.66667 1.66667 5.39763 1.66667 10C1.66667 14.6024 5.39763 18.3333 10 18.3333Z" stroke="#667085" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <input
                      type="text"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      style={{
                        border: 'none',
                        outline: 'none',
                        width: '100%',
                        fontSize: '14px',
                        color: '#101828'
                      }}
                    />
                  </div>
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
