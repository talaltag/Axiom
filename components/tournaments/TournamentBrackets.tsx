
import React from 'react';
import { SingleEliminationBracket, Match, SVGViewer } from '@g-loot/react-tournament-brackets';
import styles from '../../styles/Brackets.module.css';

const TournamentBrackets: React.FC = () => {
  const matches: Match[] = [
    {
      id: 1,
      name: 'Round 1',
      nextMatchId: 3,
      tournamentRoundText: '1',
      startTime: 'M-2.2',
      state: 'DONE',
      participants: [
        {
          id: 'scorpio-1',
          resultText: 'L',
          isWinner: false,
          name: 'Scorpio'
        },
        {
          id: 'beehives-1',
          resultText: 'W',
          isWinner: true,
          name: 'BeeHives'
        }
      ]
    },
    {
      id: 2,
      name: 'Round 1',
      nextMatchId: 3,
      tournamentRoundText: '1',
      startTime: 'M-2.2',
      state: 'DONE',
      participants: [
        {
          id: 'scorpio-2',
          resultText: 'L',
          isWinner: false,
          name: 'Scorpio'
        },
        {
          id: 'beehives-2',
          resultText: 'W',
          isWinner: true,
          name: 'BeeHives'
        }
      ]
    },
    {
      id: 3,
      name: 'Semi Final',
      nextMatchId: 6,
      tournamentRoundText: '2',
      startTime: 'M-2.2',
      state: 'DONE',
      participants: [
        {
          id: 'scorpio-3',
          resultText: 'L',
          isWinner: false,
          name: 'Scorpio'
        },
        {
          id: 'beehives-3',
          resultText: 'W',
          isWinner: true,
          name: 'BeeHives'
        }
      ]
    },
    {
      id: 4,
      name: 'Semi Final',
      nextMatchId: 6,
      tournamentRoundText: '2',
      startTime: 'M-2.2',
      state: 'DONE',
      participants: [
        {
          id: 'scorpio-4',
          resultText: 'L',
          isWinner: false,
          name: 'Scorpio'
        },
        {
          id: 'beehives-4',
          resultText: 'W',
          isWinner: true,
          name: 'BeeHives'
        }
      ]
    },
    {
      id: 6,
      name: 'Final',
      nextMatchId: null,
      tournamentRoundText: '3',
      startTime: 'M-2.2',
      state: 'DONE',
      participants: [
        {
          id: 'scorpio-5',
          resultText: 'L',
          isWinner: false,
          name: 'Scorpio'
        },
        {
          id: 'beehives-5',
          resultText: 'W',
          isWinner: true,
          name: 'BeeHives'
        }
      ]
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.bracketWrapper}>
        <SingleEliminationBracket
          matches={matches}
          options={{
            style: {
              roundHeader: {
                backgroundColor: '#F8F9FA',
                fontSize: '16px',
                padding: '8px 16px',
              },
              connectorColor: '#DEE2E6',
              connectorColorHighlight: '#FFD600',
            },
          }}
          matchComponent={({
            match,
            onMatchClick,
            onPartyClick,
            onMouseEnter,
            onMouseLeave,
            ...props
          }) => (
            <div className={styles.matchCard}>
              <div className={styles.matchHeader}>
                {match.name}
              </div>
              {match.participants.map((participant, index) => (
                <div
                  key={index}
                  className={`${styles.participant} ${participant.isWinner ? styles.winner : styles.loser}`}
                >
                  <span className={styles.participantName}>{participant.name}</span>
                  <span className={`${styles.result} ${participant.isWinner ? styles.winBadge : styles.loseBadge}`}>
                    {participant.resultText}
                  </span>
                </div>
              ))}
              <div className={styles.matchFooter}>
                <span className={styles.matchId}>{match.startTime}</span>
                <button className={styles.viewDetail}>View Detail</button>
              </div>
            </div>
          )}
          svgWrapper={({ children, ...props }) => (
            <SVGViewer
              width={1200}
              height={800}
              background="transparent"
              SVGBackground="transparent"
              scale={1}
              {...props}
            >
              {children}
            </SVGViewer>
          )}
        />
      </div>
    </div>
  );
};

export default TournamentBrackets;
