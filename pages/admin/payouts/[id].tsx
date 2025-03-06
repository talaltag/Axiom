import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Container, Row, Col, Table, Badge } from 'reactstrap';
import AdminLayout from '../../../components/layouts/AdminLayout';

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
    <AdminLayout>
      <Container fluid className="p-4">
        {/* Header with back button */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <Link href="/admin/payouts" className="d-flex align-items-center text-decoration-none">
            <div className="d-flex align-items-center">
              <div className="me-2">
                <Image src="/admin/arrow-right-black.svg" alt="Back" width={20} height={20} style={{ transform: 'rotate(180deg)' }} />
              </div>
              <span style={{ color: '#101828', fontSize: '14px', fontWeight: 500 }}>Back</span>
            </div>
          </Link>
        </div>

        {/* Tournament Name */}
        <h3 className="mb-4" style={{ fontSize: '24px', fontWeight: 600, color: '#101828' }}>
          Tournament Name
        </h3>

        {/* Tournament Banner */}
        <div className="mb-4 position-relative" style={{ height: '150px', borderRadius: '8px', overflow: 'hidden' }}>
          <Image 
            src="/admin/pubg-banner.jpg" 
            alt="Tournament Banner" 
            layout="fill" 
            objectFit="cover"
            style={{ borderRadius: '8px' }}
          />
          <div 
            className="position-absolute w-100 h-100" 
            style={{ 
              background: 'linear-gradient(90deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)',
              borderRadius: '8px'
            }}
          >
          </div>
        </div>

        {/* Tournament Won Section */}
        <h4 className="mb-3" style={{ fontSize: '18px', fontWeight: 600, color: '#101828' }}>
          Tournament Won
        </h4>

        <div className="mb-4">
          <Row>
            <Col md={8}>
              <div className="bg-white shadow-sm rounded-3 p-4">
                <div className="d-flex">
                  {/* Tournament Image */}
                  <div className="me-4" style={{ width: '140px', height: '80px', borderRadius: '6px', overflow: 'hidden', position: 'relative' }}>
                    <Image 
                      src="/admin/pubg-detail.jpg" 
                      alt="Tournament Detail" 
                      layout="fill" 
                      objectFit="cover"
                    />
                  </div>

                  {/* Tournament Details */}
                  <div className="d-flex flex-column justify-content-center">
                    <div className="d-flex align-items-center mb-2">
                      <h5 className="mb-0 me-4" style={{ fontSize: '16px', fontWeight: 600, color: '#101828' }}>
                        {tournament.name}
                      </h5>
                      <div className="d-flex align-items-center" style={{ gap: '6px' }}>
                        <Image src="/admin/crown-icon.svg" alt="Crown" width={18} height={18} />
                        <span style={{ fontSize: '14px', color: '#667085' }}>
                          {tournament.date}
                        </span>
                      </div>
                    </div>
                    <div className="d-flex align-items-center">
                      <span className="me-2" style={{ fontSize: '14px', color: '#667085' }}>Winning Team</span>
                      <Badge 
                        pill 
                        className="d-flex align-items-center" 
                        style={{ 
                          backgroundColor: '#F2F4F7', 
                          color: '#344054', 
                          padding: '2px 8px',
                          fontWeight: 500
                        }}
                      >
                        <div className="me-1" style={{ width: '18px', height: '18px', borderRadius: '50%', overflow: 'hidden', position: 'relative' }}>
                          <Image 
                            src="/admin/medal-icon.svg" 
                            alt="Medal" 
                            layout="fill"
                          />
                        </div>
                        <span style={{ fontSize: '12px' }}>{tournament.winningTeam}</span>
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </Col>

            <Col md={4}>
              <div className="bg-white shadow-sm rounded-3 p-4 h-100">
                <div className="d-flex align-items-center h-100">
                  <div>
                    <div className="d-flex align-items-center mb-2">
                      <Image 
                        src="/admin/medal-icon.svg" 
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
          </Row>
        </div>

        {/* Team Members Table */}
        <div className="bg-white shadow-sm rounded-3 mb-4">
          <Table responsive hover borderless className="mb-0">
            <thead style={{ backgroundColor: '#F9FAFB' }}>
              <tr>
                <th style={{ width: '40px', padding: '12px 16px', fontWeight: 500, fontSize: '14px', color: '#667085' }}>
                  <input type="checkbox" className="form-check-input" />
                </th>
                <th style={{ padding: '12px 16px', fontWeight: 500, fontSize: '14px', color: '#667085' }}>Member</th>
                <th style={{ padding: '12px 16px', fontWeight: 500, fontSize: '14px', color: '#667085' }}>Rank</th>
                <th style={{ padding: '12px 16px', fontWeight: 500, fontSize: '14px', color: '#667085' }}>Stats</th>
                <th style={{ padding: '12px 16px', fontWeight: 500, fontSize: '14px', color: '#667085' }}>Payouts</th>
                <th style={{ padding: '12px 16px', fontWeight: 500, fontSize: '14px', color: '#667085' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {tournament.members.map((member) => (
                <tr key={member.id}>
                  <td style={{ padding: '16px', verticalAlign: 'middle' }}>
                    <input type="checkbox" className="form-check-input" />
                  </td>
                  <td style={{ padding: '16px', verticalAlign: 'middle', fontSize: '14px', color: '#101828', fontWeight: 500 }}>
                    {member.name}
                  </td>
                  <td style={{ padding: '16px', verticalAlign: 'middle', fontSize: '14px', color: '#667085' }}>
                    {member.rank}
                  </td>
                  <td style={{ padding: '16px', verticalAlign: 'middle', fontSize: '14px', color: '#667085' }}>
                    {member.stats}
                  </td>
                  <td style={{ padding: '16px', verticalAlign: 'middle', fontSize: '14px', color: '#667085' }}>
                    {member.amount}
                  </td>
                  <td style={{ padding: '16px', verticalAlign: 'middle' }}>
                    <button 
                      className="btn btn-warning d-flex align-items-center" 
                      style={{ 
                        backgroundColor: '#FFD600',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '6px 12px',
                        fontSize: '14px',
                        fontWeight: 500
                      }}
                    >
                      <span>Send</span>
                      <Image 
                        src="/admin/arrow-right-black.svg" 
                        alt="Arrow" 
                        width={16} 
                        height={16} 
                        className="ms-2"
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>
    </AdminLayout>
  );
}