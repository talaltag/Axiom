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
      <div className={styles.roundTabs}>
        <button className={styles.tab}>Leaderboard</button>
        <button className={styles.tab}>Info</button>
        <button className={styles.tab}>Rules</button>
        <button className={styles.tab}>Payout</button>
        <button className={styles.tab}>Scoring</button>
        <button className={`${styles.tab} ${styles.active}`}>Brackets</button>
      </div>

      <div className={styles.brackets}>
        <div className={styles.round}>
          <div className={styles.roundTitleWrapper}>
            <h3 className={styles.roundTitle}>ROUND 1</h3>
          </div>
          <div className={styles.matches}>
            <Match team1="Scorpio" team2="BeeHives" team1Status="L" team2Status="W" matchId="2.2" />
            <Match team1="Scorpio" team2="BeeHives" team1Status="L" team2Status="W" matchId="2.2" />
          </div>
        </div>

        <div className={styles.round}>
          <div className={styles.roundTitleWrapper}>
            <h3 className={styles.roundTitle}>ROUND 2</h3>
          </div>
          <div className={styles.matches}>
            <Match team1="Scorpio" team2="BeeHives" team1Status="L" team2Status="W" matchId="2.2" />
            <Match team1="Scorpio" team2="BeeHives" team1Status="L" team2Status="W" matchId="2.2" />
          </div>
        </div>

        <div className={styles.round}>
          <div className={styles.roundTitleWrapper}>
            <h3 className={styles.roundTitle}>ROUND 3</h3>
          </div>
          <div className={styles.matches}>
            <Match team1="Scorpio" team2="BeeHives" team1Status="L" team2Status="W" matchId="2.2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TournamentBrackets;