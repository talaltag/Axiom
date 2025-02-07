import React, { useMemo } from "react";
import { SingleEliminationBracket, Match, SVGViewer } from "@g-loot/react-tournament-brackets";

const TournamentBrackets: React.FC = () => {
  const matches = useMemo(
    () => [
      {
        id: 1,
        name: "Round 1",
        nextMatchId: 2,
        participants: [
          { id: 1, name: "Scorpio", resultText: "L", isWinner: false, status: "PLAYED" },
          { id: 2, name: "BeeHives", resultText: "W", isWinner: true, status: "PLAYED" },
        ],
      },
      {
        id: 2,
        name: "Round 2",
        participants: [
          { id: 2, name: "Scorpio", resultText: "L", isWinner: false, status: "PLAYED" },
          { id: 3, name: "BeeHives", resultText: "W", isWinner: true, status: "PLAYED" },
        ],
      },
    ],
    []
  );

  const options = useMemo(
    () => ({
      style: {
        roundHeader: { backgroundColor: "#E5E5E5", fontSize: "14px", padding: "8px 12px" },
        connectorColor: "#E5E5E5",
        connectorColorHighlight: "#FFD600",
        matchBackground: "#F8F8F8",
        matchBorderColor: "#E5E5E5",
      },
    }),
    []
  );

  const svgWrapper = useMemo(
    () =>
      ({ children, ...props }) => (
        <SVGViewer width={props.width} height={props.height} background="#fff">
          {children}
        </SVGViewer>
      ),
    []
  );

  return (
    <div style={{ background: "#fff", padding: "24px" }}>
      <div style={{ width: "100%", height: "400px" }}>
        <SingleEliminationBracket
          matches={matches}
          matchComponent={Match}
          svgWrapper={svgWrapper}
          options={options}
        />
      </div>
    </div>
  );
};

export default TournamentBrackets;
