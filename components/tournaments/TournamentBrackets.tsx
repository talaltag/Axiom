
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
    <>
      <nav className={styles.navigation}>
        <ul>
          <li>Leaderboard</li>
          <li>Info</li>
          <li>Rules</li>
          <li>Payout</li>
          <li>Scoring</li>
          <li className={styles.active}>Brackets</li>
        </ul>
      </nav>
      <div className={styles.bracketLayout}>
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
        <div className={styles.tournamentDetails}>
          <h3>Tournament Details</h3>
          <div className={styles.detailItem}>
            <span>Prize</span>
            <span>$500</span>
          </div>
          <div className={styles.detailItem}>
            <span>Entry Fee</span>
            <span>$25</span>
          </div>
          <div className={styles.detailItem}>
            <span>Platform</span>
            <span>XBOX</span>
          </div>
          <div className={styles.detailItem}>
            <span>Tournament Type</span>
            <span>KILL RACE</span>
          </div>
          <div className={styles.detailItem}>
            <span>Tournament Size</span>
            <span>0 of 64 teams</span>
          </div>
          <div className={styles.detailItem}>
            <span>Team Size</span>
            <span>Quad</span>
          </div>
          <div className={styles.detailItem}>
            <span>Country</span>
            <span>USA</span>
          </div>
          <div className={styles.detailItem}>
            <span>Game</span>
            <span>Call of Duty</span>
          </div>
          <div className={styles.detailItem}>
            <span>Game Mode</span>
            <span>Battle Royale</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default TournamentBrackets;
