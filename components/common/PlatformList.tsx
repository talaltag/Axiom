
import React from 'react';
import Image from 'next/image';
import { Button } from 'reactstrap';

interface Platform {
  id: string;
  name: string;
  icon: string;
}

const platforms: Platform[] = [
  { id: 'dota', name: 'Dota', icon: '/platforms/dota.png' },
  { id: 'freefire', name: 'Freefire', icon: '/platforms/freefire.png' },
  { id: 'pubg', name: 'Pubg', icon: '/platforms/pubg.png' },
  { id: 'counterstrike', name: 'Counterstrike', icon: '/platforms/counterstrike.png' },
  { id: 'fortnite', name: 'Fortnite', icon: '/platforms/fortnite.png' },
  { id: 'darksouls', name: 'Dark Souls', icon: '/platforms/darksouls.png' },
  { id: 'gta', name: 'GTA', icon: '/platforms/gta.png' },
  { id: 'lol', name: 'League of Le..', icon: '/platforms/lol.png' },
  { id: 'valorant', name: 'Valorant', icon: '/platforms/valorant.png' },
];

const PlatformList: React.FC = () => {
  const [addedPlatforms, setAddedPlatforms] = React.useState<Platform[]>([
    platforms[0],
    platforms[1],
    platforms[3],
    platforms[4],
    platforms[5],
    platforms[6],
    platforms[7],
    platforms[8],
  ]);

  return (
    <div>
      <h6 className="mb-2" style={{ fontSize: '16px', color: '#101828', fontWeight: 500 }}>
        Connect your Platforms
      </h6>
      <p style={{ fontSize: '14px', color: '#667085', marginBottom: '24px' }}>
        Connect these account to integrate with your Axiom Gaming portal
      </p>

      <div className="d-flex gap-4 mb-5" style={{ overflowX: 'auto', padding: '4px 0' }}>
        {platforms.map((platform) => (
          <div
            key={platform.id}
            className="d-flex flex-column align-items-center"
            style={{ 
              minWidth: '72px',
              cursor: 'pointer',
              transition: 'transform 0.2s'
            }}
          >
            <div
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                overflow: 'hidden',
                position: 'relative',
                backgroundColor: '#F9FAFB',
                border: '1px solid #EAECF0'
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
                fontSize: '14px',
                color: '#344054',
                textAlign: 'center',
                marginTop: '8px',
                fontWeight: '500'
              }}
            >
              {platform.name}
            </span>
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h6 className="mb-0" style={{ fontSize: '14px', color: '#101828', fontWeight: 500 }}>Added Platforms</h6>
        <Button
          color="warning"
          style={{
            backgroundColor: '#FFD600',
            border: 'none',
            height: '36px',
            padding: '8px 14px',
            fontSize: '14px'
          }}
        >
          Add Platform
        </Button>
      </div>

      <div className="platform-list">
        {addedPlatforms.map((platform) => (
          <div
            key={platform.id}
            className="platform-item d-flex justify-content-between align-items-center p-3 mb-2"
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #EAECF0',
              borderRadius: '8px'
            }}
          >
            <div className="d-flex align-items-center gap-3">
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  position: 'relative',
                  border: '1px solid #EAECF0'
                }}
              >
                <Image
                  src={platform.icon}
                  alt={platform.name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <span style={{ fontSize: '14px', color: '#344054', fontWeight: '500' }}>
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

      <style jsx>{`
        .platform-item:hover {
          background-color: #F9FAFB;
        }
        .btn-link:hover {
          color: #344054 !important;
        }
      `}</style>
    </div>
  );
};

export default PlatformList;
