
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
  <div className={styles.match}>
    <div className={styles.teams}>
      <div className={`${styles.team} ${styles[team1Status.toLowerCase()]}`}>
        <span className={styles.teamName}>{team1}</span>
        <span className={styles.status}>{team1Status}</span>
      </div>
      <div className={`${styles.team} ${styles[team2Status.toLowerCase()]}`}>
        <span className={styles.teamName}>{team2}</span>
        <span className={styles.status}>{team2Status}</span>
      </div>
    </div>
    <div className={styles.matchFooter}>
      <span className={styles.matchId}>M-{matchId}</span>
      <button className={styles.viewButton}>View Detail</button>
    </div>
  </div>
);

const TournamentBrackets: React.FC = () => {
  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <a href="#" className={styles.navItem}>Leaderboard</a>
        <a href="#" className={styles.navItem}>Info</a>
        <a href="#" className={styles.navItem}>Rules</a>
        <a href="#" className={styles.navItem}>Payout</a>
        <a href="#" className={`${styles.navItem} ${styles.active}`}>Brackets</a>
      </nav>
      
      <div className={styles.brackets}>
        <div className={styles.round}>
          <h3 className={styles.roundTitle}>ROUND 1</h3>
          <div className={styles.matches}>
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
          <h3 className={styles.roundTitle}>ROUND 2</h3>
          <div className={styles.matches}>
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
          <h3 className={styles.roundTitle}>ROUND 3</h3>
          <div className={styles.matches}>
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
    </div>
  );
};

export default TournamentBrackets;
