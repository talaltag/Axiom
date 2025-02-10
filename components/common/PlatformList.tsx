
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
    platforms[2], // Counterstrike
    platforms[3], // Fortnite
    platforms[4], // Dark Souls
    platforms[5], // GTA
    platforms[6], // League of Legends
    platforms[7], // Valorant
  ]);

  return (
    <div>
      <div className="d-flex flex-wrap gap-3 mb-5" style={{ margin: '-8px', padding: '24px', backgroundColor: '#FAFBFC' }}>
        <div className="row w-100">
          {platforms.map((platform, index) => (
            <div key={platform.id} className="col-md-6 mb-3">
              <div className="d-flex align-items-center gap-3 p-3" style={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #EAECF0' }}>
                <div
                  style={{
                    width: '48px',
                    height: '48px',
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
                <span style={{
                  fontSize: '14px',
                  color: '#344054',
                  fontWeight: '500',
                }}>
                  {platform.name}
                </span>
                <div className="ms-auto">
                  <button className="btn btn-link p-2" style={{ color: '#667085' }}>
                    <i className="fas fa-pencil-alt"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h6 className="mb-0" style={{ fontSize: '18px', color: '#101828', fontWeight: 600 }}>Added Platforms</h6>
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
        {addedPlatforms.map((platform) => (
          <div
            key={platform.id}
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
        ))}
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
