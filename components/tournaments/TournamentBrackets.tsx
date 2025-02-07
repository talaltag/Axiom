
import React from 'react';
import { Bracket, RoundProps, Seed, SeedItem, SeedTeam } from 'react-brackets';

const TournamentBrackets: React.FC = () => {
  const rounds: RoundProps[] = [
    {
      title: 'Round 1',
      seeds: [
        {
          id: 1,
          date: new Date().toDateString(),
          teams: [
            { id: 1, name: 'Scorpio', score: 'L' },
            { id: 2, name: 'BeeHives', score: 'W' },
          ],
        },
        {
          id: 2,
          date: new Date().toDateString(),
          teams: [
            { id: 3, name: 'Scorpio', score: 'L' },
            { id: 4, name: 'BeeHives', score: 'W' },
          ],
        },
      ],
    },
    {
      title: 'Round 2',
      seeds: [
        {
          id: 3,
          date: new Date().toDateString(),
          teams: [
            { id: 5, name: 'Scorpio', score: 'L' },
            { id: 6, name: 'BeeHives', score: 'W' },
          ],
        },
      ],
    },
    {
      title: 'Round 3',
      seeds: [
        {
          id: 4,
          date: new Date().toDateString(),
          teams: [
            { id: 7, name: 'Scorpio', score: 'L' },
            { id: 8, name: 'BeeHives', score: 'W' },
          ],
        },
      ],
    },
  ];

  const CustomSeed = ({ seed, breakpoint }: { seed: Seed; breakpoint: string }) => {
    return (
      <div style={{ 
        backgroundColor: '#F8F8F8',
        padding: '12px',
        borderRadius: '4px',
        border: '1px solid #E5E5E5',
        width: '180px',
      }}>
        {seed.teams?.map((team: SeedTeam, index: number) => (
          <div
            key={index}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '4px',
              backgroundColor: index === 0 ? '#FFFFFF' : '#F8F8F8',
              borderRadius: '2px',
            }}
          >
            <span style={{ fontWeight: 500 }}>{team.name}</span>
            <span
              style={{
                backgroundColor: team.score === 'W' ? '#FFD600' : '#F2F4F7',
                padding: '2px 8px',
                borderRadius: '12px',
                fontSize: '12px',
              }}
            >
              {team.score}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div style={{ padding: '24px', backgroundColor: '#FFFFFF', borderRadius: '12px' }}>
      <Bracket
        rounds={rounds}
        renderSeedComponent={CustomSeed}
        swipeableProps={{
          enableMouseEvents: true,
          animateHeight: true,
        }}
        roundTitleComponent={(title: string) => (
          <div style={{
            backgroundColor: '#E5E5E5',
            padding: '8px 12px',
            borderRadius: '4px',
            fontSize: '14px',
            color: '#666666',
            marginBottom: '20px',
          }}>
            {title}
          </div>
        )}
      />
    </div>
  );
};

export default TournamentBrackets;
