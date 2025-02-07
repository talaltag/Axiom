
import React from 'react';
import { SingleEliminationBracket, Match, MATCH_STATES, SVGViewer } from '@g-loot/react-tournament-brackets';

const matches = [
  {
    id: 1,
    name: 'Round 1',
    nextMatchId: 2,
    participants: [
      { id: 1, name: "Scorpio", resultText: "L", isWinner: false, status: "PLAYED" },
      { id: 2, name: "BeeHives", resultText: "W", isWinner: true, status: "PLAYED" }
    ]
  },
  {
    id: 3,
    name: 'Round 1',
    nextMatchId: 2,
    participants: [
      { id: 1, name: "Scorpio", resultText: "L", isWinner: false, status: "PLAYED" },
      { id: 2, name: "BeeHives", resultText: "W", isWinner: true, status: "PLAYED" }
    ]
  },
  {
    id: 2,
    name: 'Round 2',
    nextMatchId: 4,
    participants: [
      { id: 2, name: "Scorpio", resultText: "L", isWinner: false, status: "PLAYED" },
      { id: 3, name: "BeeHives", resultText: "W", isWinner: true, status: "PLAYED" }
    ]
  },
  {
    id: 4,
    name: 'Round 3',
    participants: [
      { id: 3, name: "Scorpio", resultText: "L", isWinner: false, status: "PLAYED" },
      { id: 4, name: "BeeHives", resultText: "W", isWinner: true, status: "PLAYED" }
    ]
  }
];

const TournamentBrackets: React.FC = () => {
  return (
    <div style={{ background: '#fff', padding: '24px' }}>
      <div style={{ width: '100%', height: '400px' }}>
        <SingleEliminationBracket
          matches={matches}
          matchComponent={Match}
          svgWrapper={({ children, ...props }) => (
            <SVGViewer width={props.width} height={props.height} background="#fff">
              {children}
            </SVGViewer>
          )}
          options={{
            style: {
              roundHeader: {
                backgroundColor: '#E5E5E5',
                fontSize: '14px',
                padding: '8px 12px',
                color: '#666666',
                borderRadius: '4px'
              },
              connectorColor: '#E5E5E5',
              connectorColorHighlight: '#FFD600',
              matchBackground: '#F8F8F8',
              matchPadding: 12,
              matchBorderColor: '#E5E5E5',
              matchBorderRadius: 4,
              matchNameFontSize: 14,
              matchResultFontSize: 12,
              winnerBadgeColor: '#00B300',
              loserBadgeColor: '#FF0000',
              participantFontSize: 14,
              participantSpacing: 4
            }
          }}
        />
      </div>
    </div>
  );
};

export default TournamentBrackets;
