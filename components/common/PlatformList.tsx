
import React from 'react';
import Image from 'next/image';
import { Button } from 'reactstrap';

interface Platform {
  id: string;
  name: string;
  icon: string;
}

const platforms: Platform[] = [
  { id: 'dota', name: 'Dota', icon: '/profile-avatar.png' },
  { id: 'freefire', name: 'Freefire', icon: '/profile-avatar.png' },
  { id: 'pubg', name: 'PUBG', icon: '/profile-avatar.png' },
  { id: 'counterstrike', name: 'Counterstrike', icon: '/profile-avatar.png' },
  { id: 'fortnite', name: 'Fortnite', icon: '/profile-avatar.png' },
  { id: 'darksouls', name: 'Dark Souls', icon: '/profile-avatar.png' },
  { id: 'gta', name: 'GTA', icon: '/profile-avatar.png' },
  { id: 'lol', name: 'League of Legends', icon: '/profile-avatar.png' },
  { id: 'valorant', name: 'Valorant', icon: '/profile-avatar.png' },
];

const PlatformList: React.FC = () => {
  const [addedPlatforms, setAddedPlatforms] = React.useState<Platform[]>([
    platforms[0], // Dota
    platforms[1], // Freefire
    platforms[3], // Counterstrike
    platforms[4], // Fortnite
    platforms[5], // Dark Souls
    platforms[6], // GTA
    platforms[7], // League of Legends
    platforms[8], // Valorant
  ]);

  return (
    <div>
      <div className="d-flex flex-wrap gap-4 mb-5">
        {platforms.map((platform) => (
          <div
            key={platform.id}
            className="d-flex flex-column align-items-center"
            style={{ width: '72px' }}
          >
            <div
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '12px',
                overflow: 'hidden',
                position: 'relative',
                cursor: 'pointer',
                border: '1px solid #EAECF0',
              }}
            >
              <Image
                src={platform.icon}
                alt={platform.name}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <span
              style={{
                fontSize: '12px',
                color: '#344054',
                textAlign: 'center',
                marginTop: '8px',
              }}
            >
              {platform.name}
            </span>
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h6 className="mb-0">Added Platforms</h6>
        <Button
          color="warning"
          style={{
            backgroundColor: '#FFD600',
            border: 'none',
            height: '36px',
            padding: '8px 14px',
            fontSize: '14px',
            borderRadius: '8px',
          }}
        >
          Add Platform
        </Button>
      </div>

      <div>
        {addedPlatforms.map((platform) => (
          <div
            key={platform.id}
            className="d-flex justify-content-between align-items-center p-3 mb-2"
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #EAECF0',
              borderRadius: '8px',
            }}
          >
            <div className="d-flex align-items-center gap-2">
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '6px',
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                <Image
                  src={platform.icon}
                  alt={platform.name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <span style={{ fontSize: '14px', color: '#344054' }}>
                {platform.name}
              </span>
            </div>
            <button
              className="btn btn-link p-0"
              style={{ color: '#667085' }}
            >
              <i className="fas fa-pencil-alt"></i>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlatformList;
