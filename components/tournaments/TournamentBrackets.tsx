
import React from 'react';
import { SingleEliminationBracket, Match, SVGViewer } from '@g-loot/react-tournament-brackets';
import styles from '../../styles/Brackets.module.css';

const TournamentBrackets: React.FC = () => {
  const matches: Match[] = [
    {
      id: 1,
      name: 'Round 1',
      nextMatchId: 3,
      tournamentRoundText: 'Round 1',
      startTime: new Date().toDateString(),
      state: 'SCHEDULED',
      participants: [
        {
          id: 'team-1',
          resultText: null,
          isWinner: false,
          name: 'Team A'
        },
        {
          id: 'team-2',
          resultText: null,
          isWinner: false,
          name: 'Team B'
        }
      ]
    },
    {
      id: 2,
      name: 'Round 1',
      nextMatchId: 3,
      tournamentRoundText: 'Round 1',
      startTime: new Date().toDateString(),
      state: 'SCHEDULED',
      participants: [
        {
          id: 'team-3',
          resultText: null,
          isWinner: false,
          name: 'Team C'
        },
        {
          id: 'team-4',
          resultText: null,
          isWinner: false,
          name: 'Team D'
        }
      ]
    },
    {
      id: 3,
      name: 'Final',
      nextMatchId: null,
      tournamentRoundText: 'Final',
      startTime: new Date().toDateString(),
      state: 'SCHEDULED',
      participants: [
        {
          id: 'winner-1',
          resultText: null,
          isWinner: false,
          name: 'TBD'
        },
        {
          id: 'winner-2',
          resultText: null,
          isWinner: false,
          name: 'TBD'
        }
      ]
    }
  ];

  return (
    <div className={styles.container}>
      <div style={{ width: '100%', height: '500px' }}>
        <SingleEliminationBracket
          matches={matches}
          matchComponent={({
            match,
            onMatchClick,
            onPartyClick,
            onMouseEnter,
            onMouseLeave,
            ...props
          }) => (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '300px',
                backgroundColor: '#2D2D2D',
                borderRadius: '8px',
                padding: '12px',
              }}
            >
              <div style={{ fontSize: '14px', color: '#FFD600', marginBottom: '8px' }}>
                {match.name}
              </div>
              {match.participants.map((participant, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '8px',
                    backgroundColor: index === 0 ? '#3D3D3D' : '#333333',
                    borderRadius: '4px',
                    marginBottom: '4px',
                  }}
                >
                  <span style={{ color: '#FFFFFF' }}>{participant.name}</span>
                  {participant.resultText && (
                    <span style={{ marginLeft: 'auto', color: '#FFD600' }}>
                      {participant.resultText}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
          svgWrapper={({ children, ...props }) => (
            <SVGViewer
              width={window ? Math.max(window.innerWidth - 50, 500) : 500}
              height={500}
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
