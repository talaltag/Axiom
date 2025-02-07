import React from "react";
import {
  SingleEliminationBracket,
  Match,
  SVGViewer,
} from "@g-loot/react-tournament-brackets";
import styles from "../../styles/Brackets.module.css";

import MatchDetailsModal from './MatchDetailsModal';

const TournamentBrackets: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const matches: Match[] = [
    {
      id: 1,
      name: "Round 1",
      nextMatchId: 3,
      tournamentRoundText: "1",
      startTime: "M-2.2",
      state: "DONE",
      participants: [
        {
          id: "dragons-1",
          resultText: "W",
          isWinner: true,
          name: "Dragons",
        },
        {
          id: "phoenix-1",
          resultText: "L",
          isWinner: false,
          name: "Phoenix",
        },
      ],
    },
    {
      id: 2,
      name: "Round 1",
      nextMatchId: 3,
      tournamentRoundText: "1",
      startTime: "M-2.2",
      state: "DONE",
      participants: [
        {
          id: "tigers-1",
          resultText: "W",
          isWinner: true,
          name: "Tigers",
        },
        {
          id: "eagles-1",
          resultText: "L",
          isWinner: false,
          name: "Eagles",
        },
      ],
    },
    {
      id: 6,
      name: "Round 1",
      nextMatchId: 4,
      tournamentRoundText: "1",
      startTime: "M-2.2",
      state: "DONE",
      participants: [
        {
          id: "wolves-1",
          resultText: "W",
          isWinner: true,
          name: "Wolves",
        },
        {
          id: "hawks-1",
          resultText: "L",
          isWinner: false,
          name: "Hawks",
        },
      ],
    },
    {
      id: 7,
      name: "Round 1",
      nextMatchId: 4,
      tournamentRoundText: "1",
      startTime: "M-2.2",
      state: "DONE",
      participants: [
        {
          id: "lions-1",
          resultText: "W",
          isWinner: true,
          name: "Lions",
        },
        {
          id: "bears-1",
          resultText: "L",
          isWinner: false,
          name: "Bears",
        },
      ],
    },
    {
      id: 3,
      name: "Round 2",
      nextMatchId: 5,
      tournamentRoundText: "2",
      startTime: "M-2.2",
      state: "DONE",
      participants: [
        {
          id: "beehives-1",
          resultText: "W",
          isWinner: true,
          name: "Ali",
        },
        {
          id: "beehives-2",
          resultText: "L",
          isWinner: false,
          name: "BeeHives",
        },
      ],
    },
    {
      id: 4,
      name: "Round 2",
      nextMatchId: 5,
      tournamentRoundText: "2",
      startTime: "M-2.2",
      state: "DONE",
      participants: [
        {
          id: "scorpio-1",
          Hamza: "L",
          isWinner: false,
          name: "Scorpio",
        },
        {
          id: "scorpio-2",
          resultText: "W",
          isWinner: true,
          name: "Scorpio",
        },
      ],
    },
    {
      id: 5,
      name: "Round 3",
      nextMatchId: null,
      tournamentRoundText: "3",
      startTime: "M-2.2",
      state: "DONE",
      participants: [
        {
          id: "scorpio-5",
          resultText: "L",
          isWinner: false,
          name: "Scorpio",
        },
        {
          id: "beehives-5",
          resultText: "W",
          isWinner: true,
          name: "BeeHives",
        },
      ],
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.bracketWrapper}>
        <SingleEliminationBracket
          matches={matches}
          options={{
            style: {
              roundHeader: {
                backgroundColor: "#F8F9FA",
                fontSize: "16px",
                padding: "8px 16px",
              },
              connectorColor: "#DEE2E6",
              connectorColorHighlight: "#FFD600",
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
              {/* <div className={styles.matchHeader}>
                {match.name}
              </div> */}
              {match.participants.map((participant, index) => (
                <div
                  key={index}
                  className={`${styles.participant} ${participant.isWinner ? styles.winner : styles.loser}`}
                >
                  <span className={styles.participantName}>
                    {participant.name}
                  </span>
                  <span
                    className={`${styles.result} ${participant.isWinner ? styles.winBadge : styles.loseBadge}`}
                  >
                    {participant.resultText}
                  </span>
                  <span>
                    <button 
                      className={styles.viewDetail}
                      onClick={() => {
                        setSelectedMatch(match);
                        setIsModalOpen(true);
                      }}
                    >
                      View Detail
                    </button>
                  </span>
                </div>
              ))}
              <div className={styles.matchFooter}></div>
            </div>
          )}
          svgWrapper={({ children, ...props }) => (
            <SVGViewer
              width={1200}
              height={1000}
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
      <MatchDetailsModal
        isOpen={isModalOpen}
        toggle={() => setIsModalOpen(false)}
        match={selectedMatch}
      />
    </div>
  );
};

export default TournamentBrackets;
