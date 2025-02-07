
import React from 'react';
import styles from '../../styles/Brackets.module.css';

interface MatchProps {
  team1: string;
  team2: string;
  team1Status: 'W' | 'L';
  team2Status: 'W' | 'L';
  matchId: string;
}

const Match: React.FC<MatchProps> = ({ team1, team2, team1Status, team2Status, matchId }) => (
  <div className={styles['bracket-match']}>
    <div className={styles['match-details']}>
      <div className={`${styles.team} ${team1Status === 'W' ? styles.won : styles.lost}`}>
        <span className={styles['team-name']}>{team1}</span>
        <span className={styles.result}>{team1Status}</span>
      </div>
      <div className={`${styles.team} ${team2Status === 'W' ? styles.won : styles.lost}`}>
        <span className={styles['team-name']}>{team2}</span>
        <span className={styles.result}>{team2Status}</span>
      </div>
    </div>
    <div className={styles['match-id']}>
      <span>M-{matchId}</span>
      <button className={styles['view-detail']}>View Detail</button>
    </div>
  </div>
);

const TournamentBrackets: React.FC = () => {
  return (
    <div className={styles['brackets-container']}>
      <div className={styles.round}>
        <h3 className={styles['round-title']}>ROUND 1</h3>
        <div className={styles['match-container']}>
          <Match 
            team1="Scorpio"
            team2="BeeHives"
            team1Status="L"
            team2Status="W"
            matchId="2.2"
          />
          <Match 
            team1="Scorpio"
            team2="BeeHives"
            team1Status="L"
            team2Status="W"
            matchId="2.2"
          />
        </div>
      </div>
      
      <div className={styles.round}>
        <h3 className={styles['round-title']}>ROUND 2</h3>
        <div className={styles['match-container']}>
          <Match 
            team1="Scorpio"
            team2="BeeHives"
            team1Status="L"
            team2Status="W"
            matchId="2.2"
          />
          <Match 
            team1="Scorpio"
            team2="BeeHives"
            team1Status="L"
            team2Status="W"
            matchId="2.2"
          />
        </div>
      </div>

      <div className={styles.round}>
        <h3 className={styles['round-title']}>ROUND 3</h3>
        <div className={styles['match-container']}>
          <Match 
            team1="Scorpio"
            team2="BeeHives"
            team1Status="L"
            team2Status="W"
            matchId="2.2"
          />
        </div>
      </div>
    </div>
  );
};

export default TournamentBrackets;
