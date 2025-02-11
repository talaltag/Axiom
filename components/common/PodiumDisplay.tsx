
import React from 'react';
import Image from 'next/image';

interface Player {
  name: string;
  points: number;
  avatar: string;
  position: number;
}

const PodiumDisplay: React.FC<{ players: Player[] }> = ({ players }) => {
  const sortedPlayers = [...players].sort((a, b) => a.position - b.position);

  return (
    <div className="podium-container">
      {sortedPlayers.map((player) => (
        <div key={player.name} className="podium-player">
          {player.position === 1 && <span className="podium-crown">👑</span>}
          <div className="podium-avatar">
            <Image
              src={player.avatar}
              alt={player.name}
              width={80}
              height={80}
              objectFit="cover"
            />
          </div>
          <div className="podium-name">{player.name}</div>
          <div className="podium-points">
            <span>🔥</span>
            <span className="podium-points-number">{player.points}</span>
            <span className="podium-points-text">pts</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PodiumDisplay;
