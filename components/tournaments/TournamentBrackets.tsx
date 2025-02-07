
import React from 'react';
import { Bracket } from 'brackets-viewer';
import 'brackets-viewer/dist/index.css';
import styles from '../../styles/Brackets.module.css';

const TournamentBrackets: React.FC = () => {
  const rounds = [
    {
      title: 'Round 1',
      seeds: [
        {
          id: 1,
          date: new Date().toDateString(),
          teams: [{ name: 'Team A' }, { name: 'Team B' }],
          score: 0
        },
        {
          id: 2,
          date: new Date().toDateString(),
          teams: [{ name: 'Team C' }, { name: 'Team D' }],
          score: 0
        }
      ]
    },
    {
      title: 'Round 2',
      seeds: [
        {
          id: 3,
          date: new Date().toDateString(),
          teams: [{ name: 'TBD' }, { name: 'TBD' }],
          score: 0
        }
      ]
    }
  ];

  return (
    <div className={styles.container}>
      <Bracket rounds={rounds} />
    </div>
  );
};

export default TournamentBrackets;
