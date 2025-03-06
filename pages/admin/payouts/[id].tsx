import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Container, Row, Col, Table, Badge } from 'reactstrap';
import AdminDashboardLayout from '../../../components/layouts/AdminDashboardLayout';

export default function PayoutDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [tournament, setTournament] = useState({
    name: 'PUBG - SUMMER CAMP',
    date: '5/22/2023',
    winningTeam: 'Wolves',
    totalAmount: '$1,234',
    members: [
      { id: 1, name: 'Jake', rank: 'EXP', stats: '10 Kills', amount: '$250' },
      { id: 2, name: 'Adam', rank: 'AMA', stats: '10 Kills', amount: '$250' },
      { id: 3, name: 'Smith', rank: 'EXP', stats: '10 Kills', amount: '$250' },
      { id: 4, name: 'Mark', rank: 'VET', stats: '10 Kills', amount: '$250' },
      { id: 5, name: 'John', rank: 'AMA', stats: '10 Kills', amount: '$250' },
      { id: 6, name: '0121', rank: 'AMA', stats: '10 Kills', amount: '$250' },
    ]
  });

  return (
    <AdminDashboardLayout>
      <div className="px-4 py-3">
        <div className="d-flex align-items-center mb-4">
          <Link href="/admin/payouts" legacyBehavior>
            <a className="btn btn-link text-dark p-0 me-3" style={{ textDecoration: 'none' }}>
              <div className="d-flex align-items-center">
                <Image src="/admin/arrow-left.svg" alt="Back" width={20} height={20} />
                <span className="ms-2">Back</span>
              </div>
            </a>
          </Link>
          <h4 className="mb-0 ms-2">Tournament Name</h4>
        </div>

        <div className="tournament-banner position-relative mb-4" style={{ height: '150px', borderRadius: '8px', overflow: 'hidden' }}>
          <Image src="/fortnite-banner.png" alt="Tournament Banner" layout="fill" objectFit="cover" />
        </div>

        <div className="d-flex justify-content-between align-items-start mb-4">
          <div>
            <h5 className="mb-3">Tournament Won</h5>

            <div className="d-flex">
              <div className="position-relative me-4" style={{ width: '200px', height: '120px', borderRadius: '8px', overflow: 'hidden' }}>
                <Image src="/fortnite-banner.png" alt="Tournament Image" layout="fill" objectFit="cover" />
              </div>

              <div>
                <div className="mb-2">
                  <h5 className="mb-1">{tournament.name}</h5>
                  <div className="text-muted">{tournament.date}</div>
                </div>

                <div className="d-flex align-items-center">
                  <span className="me-2">Winning Team</span>
                  <div className="d-flex align-items-center">
                    <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center me-1" style={{ width: '24px', height: '24px' }}>
                      <span className="text-white" style={{ fontSize: '12px' }}>W</span>
                    </div>
                    <span>{tournament.winningTeam}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Col md={4}>
            <div className="bg-white shadow-sm rounded-3 p-4 h-100">
              <div className="d-flex align-items-center h-100">
                <div>
                  <div className="d-flex align-items-center mb-2">
                    <Image 
                      src="/admin/crown-icon.svg" 
                      alt="Medal" 
                      width={24}
                      height={24}
                      className="me-2"
                    />
                    <span style={{ fontSize: '14px', color: '#667085' }}>Total Payouts</span>
                  </div>
                  <h5 style={{ fontSize: '20px', fontWeight: 600, color: '#101828' }}>{tournament.totalAmount}</h5>
                  <button 
                    className="btn btn-warning mt-2 d-flex align-items-center" 
                    style={{ 
                      backgroundColor: '#FFD600',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '8px 16px',
                      fontSize: '14px',
                      fontWeight: 500
                    }}
                  >
                    <span>Send to all</span>
                    <Image 
                      src="/admin/arrow-right-black.svg" 
                      alt="Arrow" 
                      width={16} 
                      height={16} 
                      className="ms-2"
                    />
                  </button>
                </div>
              </div>
            </div>
          </Col>
        </div>

        <div className="bg-white rounded-3 p-4">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th style={{ width: '40px' }}></th>
                  <th>Member</th>
                  <th>Rank</th>
                  <th>Stats</th>
                  <th>Payouts</th>
                  <th style={{ width: '120px' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {tournament.members.map(member => (
                  <tr key={member.id}>
                    <td>
                      <input type="checkbox" className="form-check-input" />
                    </td>
                    <td>{member.name}</td>
                    <td>{member.rank}</td>
                    <td>{member.stats}</td>
                    <td>{member.amount}</td>
                    <td>
                      <button 
                        className="btn btn-warning d-flex align-items-center justify-content-center" 
                        style={{ 
                          backgroundColor: '#FFD600',
                          border: 'none',
                          borderRadius: '6px',
                          padding: '6px 12px',
                          fontSize: '14px',
                          fontWeight: 500,
                          width: '84px'
                        }}
                      >
                        <span>Send</span>
                        <Image 
                          src="/admin/arrow-right-black.svg" 
                          alt="Arrow" 
                          width={16} 
                          height={16} 
                          className="ms-1"
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminDashboardLayout>
  );
}