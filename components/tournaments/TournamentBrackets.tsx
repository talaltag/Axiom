import React from 'react';
import { Bracket } from 'brackets-viewer';
import 'brackets-viewer/dist/index.css';

const TournamentBrackets: React.FC = () => {
  const rounds = [
    {
      matches: [
        {
          player1: { name: "Scorpio", score: 0, status: "lost" },
          player2: { name: "BeeHives", score: 1, status: "won" }
        },
        {
          player1: { name: "Scorpio", score: 0, status: "lost" },
          player2: { name: "BeeHives", score: 1, status: "won" }
        }
      ]
    },
    {
      matches: [
        {
          player1: { name: "Scorpio", score: 0, status: "lost" },
          player2: { name: "BeeHives", score: 1, status: "won" }
        }
      ]
    },
    {
      matches: [
        {
          player1: { name: "Scorpio", score: 0, status: "lost" },
          player2: { name: "BeeHives", score: 1, status: "won" }
        }
      ]
    }
  ];

  return (
    <div style={{ padding: '24px', backgroundColor: '#FFFFFF', borderRadius: '12px' }}>
      <Bracket
        rounds={rounds}
        theme={{
          textColor: { main: '#101828', highlighted: '#101828', dark: '#667085' },
          matchBackground: { wonColor: '#FFD600', lostColor: '#F2F4F7' },
          score: { background: '#F8F8F8', text: '#101828' },
          border: { color: '#E5E5E5', highlightedColor: '#FFD600' },
          victory: { background: '#FFD600', text: '#101828' }
        }}
      />
    </div>
  );
};

export default TournamentBrackets;