
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
      <div style={{ padding: '24px' }}>
        <div className="d-flex align-items-center mb-4">
          <button 
            onClick={() => router.back()} 
            className="btn p-0 me-3"
            style={{ background: 'transparent', border: 'none' }}
          >
            <Image 
              src="/admin/arrow-left.svg" 
              width={20} 
              height={20} 
              alt="Back" 
            />
          </button>
          <h3 className="mb-0">Tournament Name</h3>
        </div>

        {/* Banner Image */}
        <div 
          className="position-relative mb-4 rounded overflow-hidden" 
          style={{ height: '150px', width: '100%' }}
        >
          <Image
            src="/fortnite-banner.png"
            alt="Tournament Banner"
            layout="fill"
            objectFit="cover"
          />
        </div>

        <h4 className="mb-4">Tournament Won</h4>
        
        <div className="d-flex mb-4">
          {/* Tournament Details Card */}
          <div 
            className="d-flex p-3 me-4" 
            style={{ 
              backgroundColor: '#fff',
              borderRadius: '8px',
              boxShadow: '0px 1px 3px rgba(16, 24, 40, 0.1)',
              width: '365px'
            }}
          >
            {/* Tournament Image */}
            <div className="me-3">
              <div 
                className="position-relative rounded overflow-hidden" 
                style={{ height: '80px', width: '140px' }}
              >
                <Image
                  src="/admin/payouts/pubg-soldier.png"
                  alt="Tournament"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </div>
            
            {/* Tournament Info */}
            <div>
              <h5 className="mb-1" style={{ fontSize: '16px', fontWeight: '600' }}>
                {tournament.name}
              </h5>
              <p className="mb-1" style={{ fontSize: '14px', color: '#667085' }}>
                {tournament.date}
              </p>
              <div className="d-flex align-items-center">
                <span className="me-2" style={{ fontSize: '14px', color: '#344054' }}>
                  Winning Team:
                </span>
                <div className="d-flex align-items-center">
                  <div 
                    className="rounded-circle me-1 d-flex align-items-center justify-content-center"
                    style={{
                      width: '20px',
                      height: '20px',
                      backgroundColor: '#1D4ED8',
                      color: 'white',
                      fontSize: '10px',
                      fontWeight: 'bold'
                    }}
                  >
                    W
                  </div>
                  <span style={{ fontSize: '14px', fontWeight: '500' }}>
                    {tournament.winningTeam}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Total Payouts Card */}
          <div 
            className="d-flex p-3 justify-content-between align-items-center" 
            style={{ 
              backgroundColor: '#fff',
              borderRadius: '8px',
              boxShadow: '0px 1px 3px rgba(16, 24, 40, 0.1)',
              width: '360px'
            }}
          >
            <div className="d-flex align-items-center">
              <div 
                className="rounded-circle me-3 d-flex align-items-center justify-content-center"
                style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: '#FDF8E8',
                }}
              >
                <Image 
                  src="/admin/crown-icon.svg" 
                  width={24} 
                  height={24} 
                  alt="Trophy" 
                />
              </div>
              <div>
              <p className="mb-1" style={{ fontSize: '14px', color: '#667085' }}>
                Total Payouts
              </p>
              <h5 className="mb-0" style={{ fontWeight: '500' }}>{tournament.totalAmount}</h5>
            </div>
            <button 
              className="btn d-flex align-items-center"
              style={{
                backgroundColor: '#FFD600',
                color: '#101828',
                border: 'none',
                borderRadius: '8px',
                padding: '8px 14px',
                fontWeight: '500',
                fontSize: '14px'
              }}
            >
              Send to all
              <Image 
                src="/admin/arrow-right-black.svg" 
                width={16} 
                height={16} 
                alt="Send" 
                className="ms-1" 
              />
            </button>
          </div>
        </div>
        
        {/* Team Members Table */}
        <div
          style={{
            backgroundColor: '#fff',
            borderRadius: '8px',
            boxShadow: '0px 1px 3px rgba(16, 24, 40, 0.1)',
            overflow: 'hidden'
          }}
        >
          <table className="table mb-0">
            <thead>
              <tr style={{ backgroundColor: '#FAFBFC' }}>
                <th style={{ width: '40px', padding: '12px 24px' }}>
                  <input type="checkbox" className="form-check-input" />
                </th>
                <th style={{ padding: '12px 16px', fontSize: '14px', fontWeight: '500', color: '#667085' }}>
                  Member
                </th>
                <th style={{ padding: '12px 16px', fontSize: '14px', fontWeight: '500', color: '#667085' }}>
                  Rank
                </th>
                <th style={{ padding: '12px 16px', fontSize: '14px', fontWeight: '500', color: '#667085' }}>
                  Stats
                </th>
                <th style={{ padding: '12px 16px', fontSize: '14px', fontWeight: '500', color: '#667085' }}>
                  Payouts
                </th>
                <th style={{ padding: '12px 16px', fontSize: '14px', fontWeight: '500', color: '#667085' }}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {tournament.members.map((member) => (
                <tr key={member.id}>
                  <td style={{ padding: '16px' }}>
                    <input type="checkbox" className="form-check-input" />
                  </td>
                  <td style={{ padding: '16px', fontSize: '14px', color: '#101828' }}>
                    {member.name}
                  </td>
                  <td style={{ padding: '16px', fontSize: '14px', color: '#101828' }}>
                    {member.rank}
                  </td>
                  <td style={{ padding: '16px', fontSize: '14px', color: '#101828' }}>
                    {member.stats}
                  </td>
                  <td style={{ padding: '16px', fontSize: '14px', color: '#101828', fontWeight: '500' }}>
                    {member.amount}
                  </td>
                  <td style={{ padding: '16px' }}>
                    <button 
                      className="btn d-flex align-items-center"
                      style={{
                        backgroundColor: '#FFD600',
                        color: '#101828',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '8px 14px',
                        fontWeight: '500',
                        fontSize: '14px'
                      }}
                    >
                      Send
                      <Image 
                        src="/admin/arrow-right-black.svg" 
                        width={16} 
                        height={16} 
                        alt="Send" 
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
    </AdminDashboardLayout>
  );
}
