import React from 'react';
import Image from 'next/image';
import { Button } from 'reactstrap';

interface Platform {
  id: string;
  name: string;
  icon: string;
}

const platforms: Platform[] = [
  { id: 'dota', name: 'Dota', icon: '/user1.png' },
  { id: 'freefire', name: 'Freefire', icon: '/user1.png' },
  { id: 'pubg', name: 'PUBG', icon: '/user1.png' },
  { id: 'counterstrike', name: 'Counterstrike', icon: '/user1.png' },
  { id: 'fortnite', name: 'Fortnite', icon: '/user1.png' },
  { id: 'darksouls', name: 'Dark Souls', icon: '/user1.png' },
  { id: 'gta', name: 'GTA', icon: '/user1.png' },
  { id: 'lol', name: 'League of Legends', icon: '/user1.png' },
  { id: 'valorant', name: 'Valorant', icon: '/user1.png' },
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
      <div className="d-flex flex-wrap gap-3 mb-5" style={{ margin: '-8px', padding: '24px', backgroundColor: '#FAFBFC' }}>
        {platforms.map((platform) => (
          <div
            key={platform.id}
            className="d-flex flex-column align-items-center"
            style={{ 
              width: '100px',
              padding: '8px',
              cursor: 'pointer',
              transition: 'transform 0.2s',
              ':hover': {
                transform: 'scale(1.05)'
              }
            }}
          >
            <div
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                overflow: 'hidden',
                position: 'relative',
                border: '2px solid #EAECF0',
                backgroundColor: '#F9FAFB'
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
                fontWeight: '500',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                width: '100%'
              }}
            >
              {platform.name}
            </span>
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h6 className="mb-0" style={{ fontSize: '18px', color: '#101828', fontWeight: 500 }}>Added Platforms</h6>
        <Button
          color="warning"
          style={{
            backgroundColor: '#FFD600',
            border: 'none',
            height: '36px',
            padding: '8px 14px',
            fontSize: '14px',
            borderRadius: '8px',
            fontWeight: '500',
            color: '#101828',
            boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)'
          }}
        >
          Add Platform
        </Button>
      </div>

      <div className="platform-list">
        <div className="row">
          {addedPlatforms.map((platform, index) => (
            <div className="col-md-6" key={platform.id}>
              <div
                className="platform-item d-flex justify-content-between align-items-center px-3 py-2 mb-2"
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #EAECF0',
                  borderRadius: '8px',
                  transition: 'all 0.2s',
                  boxShadow: '0px 1px 3px rgba(16, 24, 40, 0.1)'
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
                  <span style={{ 
                    fontSize: '14px', 
                    color: '#344054',
                    fontWeight: '500'
                  }}>
                    {platform.name}
                  </span>
                </div>
                <button
                  className="btn btn-link p-2"
                  style={{ 
                    color: '#667085',
                    transition: 'color 0.2s',
                    backgroundColor: 'transparent',
                    border: 'none',
                    borderRadius: '4px'
                  }}
                >
                  <i className="fas fa-pencil-alt" style={{ fontSize: '14px' }}></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .platform-item:hover {
          background-color: #F9FAFB !important;
        }
        .btn-link:hover {
          color: #344054 !important;
        }
      `}</style>
    </div>
  );
};

export default PlatformList;