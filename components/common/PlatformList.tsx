import React from "react";
import Image from "next/image";
import { Edit2 } from "react-feather";

const platforms = [
  { id: 1, name: "Dota", icon: "/platforms/dota.png" },
  { id: 2, name: "Freefire", icon: "/platforms/freefire.png" },
  { id: 3, name: "PUBG", icon: "/platforms/pubg.png" },
  { id: 4, name: "Counterstrike", icon: "/platforms/cs.png" },
  { id: 5, name: "Fortnite", icon: "/platforms/fortnite.png" },
  { id: 6, name: "Dark Souls", icon: "/platforms/darksouls.png" },
  { id: 7, name: "GTA", icon: "/platforms/gta.png" },
  { id: 8, name: "League of Legends", icon: "/platforms/lol.png" },
  { id: 9, name: "Valorant", icon: "/platforms/valorant.png" }
];

const connectedPlatforms = [
  { id: 1, name: "Dota", icon: "/platforms/dota.png" },
  { id: 2, name: "Freefire", icon: "/platforms/freefire.png" },
  { id: 3, name: "Counterstrike", icon: "/platforms/cs.png" },
  { id: 4, name: "Fortnite", icon: "/platforms/fortnite.png" },
  { id: 5, name: "Dark Souls", icon: "/platforms/darksouls.png" },
  { id: 6, name: "GTA", icon: "/platforms/gta.png" },
  { id: 7, name: "League of Legends", icon: "/platforms/lol.png" },
  { id: 8, name: "Valorant", icon: "/platforms/valorant.png" }
];

const PlatformList = () => {
  return (
    <div className="platform-integration">
      <h6>Connect your Platforms</h6>
      <p>Connect these accounts to integrate with your Axiom Gaming portal</p>

      <div className="platform-grid">
        {platforms.map((platform) => (
          <div key={platform.id} className="platform-item">
            <div className="platform-icon">
              <Image
                src={platform.icon}
                alt={platform.name}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <span className="platform-name">{platform.name}</span>
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6 className="m-0">Added Platforms</h6>
        <button className="add-platform-btn">
          <span>Add Platform</span>
        </button>
      </div>

      <div className="added-platforms">
        {connectedPlatforms.map((platform) => (
          <div key={platform.id} className="platform-item-row">
            <Image
              src={platform.icon}
              alt={platform.name}
              width={32}
              height={32}
            />
            <span>{platform.name}</span>
            <button>
              <Edit2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlatformList;