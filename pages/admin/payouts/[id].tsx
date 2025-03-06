import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Image from "next/image";
import { 
  Container, 
  Row, 
  Col, 
  Button,
  Table
} from "reactstrap";
import AdminDashboardLayout from "../../../components/layouts/AdminDashboardLayout";
import { ChevronLeft, Send } from "react-feather";

export default function PayoutDetail() {
  const router = useRouter();
  const { id } = router.query;

  // Mock tournament data that matches the image
  const [tournament, setTournament] = useState({
    name: "Tournament Name",
    date: "5/22/2023",
    winningTeam: "Wolves",
    game: "PUBG - SUMMER CAMP",
    totalPayouts: "$1,234",
    members: [
      { id: 1, name: "Jake", rank: "EXP", stats: "10 Kills", amount: "$250", selected: false },
      { id: 2, name: "Adam", rank: "AMA", stats: "10 Kills", amount: "$250", selected: false },
      { id: 3, name: "Smith", rank: "EXP", stats: "10 Kills", amount: "$250", selected: false },
      { id: 4, name: "Mark", rank: "VET", stats: "10 Kills", amount: "$250", selected: false },
      { id: 5, name: "John", rank: "AMA", stats: "10 Kills", amount: "$250", selected: false },
      { id: 6, name: "0121", rank: "AMA", stats: "10 Kills", amount: "$250", selected: false },
    ],
  });

  // Toggle selection of all members
  const toggleAllMembers = (checked) => {
    setTournament(prev => ({
      ...prev,
      members: prev.members.map(member => ({
        ...member,
        selected: checked
      }))
    }));
  };

  // Toggle selection of a single member
  const toggleMember = (id, checked) => {
    setTournament(prev => ({
      ...prev,
      members: prev.members.map(member => 
        member.id === id ? { ...member, selected: checked } : member
      )
    }));
  };

  return (
    <AdminDashboardLayout>
      <div className="p-4">
        {/* Header with back button */}
        <div className="d-flex align-items-center mb-4">
          <Button
            color="link"
            className="p-0 text-dark me-2"
            onClick={() => router.push('/admin/payouts')}
            style={{ textDecoration: 'none' }}
          >
            <div className="d-flex align-items-center">
              <ChevronLeft size={20} />
              <span className="ms-1">Back</span>
            </div>
          </Button>
        </div>

        {/* Tournament Name */}
        <h3 className="mb-4" style={{ fontSize: '24px', fontWeight: '600', color: '#101828' }}>
          {tournament.name}
        </h3>

        {/* Tournament Banner Image */}
        <div 
          className="mb-4 position-relative rounded overflow-hidden"
          style={{ height: '200px', width: '100%' }}
        >
          <Image
            src="/fortnite-banner.png"
            alt="Tournament Banner"
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>

        {/* Tournament Won Section */}
        <h5 className="mb-3" style={{ fontSize: '18px', fontWeight: '600', color: '#101828' }}>
          Tournament Won
        </h5>

        <div className="d-flex mb-4">
          {/* Left: Tournament Image */}
          <div 
            className="position-relative rounded overflow-hidden me-3"
            style={{ width: '180px', height: '120px', flexShrink: 0 }}
          >
            <Image
              src="/fortnite-banner.png"
              alt="Tournament Game"
              layout="fill"
              objectFit="cover"
            />
          </div>

          {/* Middle: Tournament Details */}
          <div className="me-3 d-flex flex-column justify-content-center" style={{ flex: 1 }}>
            <div className="mb-2" style={{ fontSize: '16px', fontWeight: '600', color: '#101828' }}>
              {tournament.game}
            </div>
            <div className="mb-2" style={{ fontSize: '14px', color: '#667085' }}>
              {tournament.date}
            </div>
            <div className="d-flex align-items-center">
              <span style={{ fontSize: '14px', color: '#667085' }}>
                Winning Team
              </span>
              <div className="d-flex align-items-center ms-2">
                <div 
                  className="position-relative me-1"
                  style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#E0F2FE' }}
                >
                  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: '#0369A1', fontSize: '10px' }}>W</div>
                </div>
                <span style={{ fontSize: '14px', fontWeight: '500' }}>
                  {tournament.winningTeam}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Total Payouts */}
          <div 
            className="d-flex flex-column align-items-end"
            style={{ 
              minWidth: '200px', 
              padding: '20px',
              borderRadius: '8px',
              border: '1px solid #EAECF0',
              backgroundColor: '#FFFFFF'
            }}
          >
            <div className="d-flex align-items-center mb-2">
              <div 
                className="position-relative me-2"
                style={{ width: '40px', height: '40px' }}
              >
                <Image
                  src="/platforms/medal-icon.svg"
                  alt="Medal Icon"
                  width={40}
                  height={40}
                  onError={(e) => {
                    e.target.src = "/admin/crown-icon.svg"; // Fallback icon
                  }}
                />
              </div>
              <div>
                <div style={{ fontSize: '14px', color: '#667085' }}>
                  Total Payouts
                </div>
                <div style={{ fontSize: '18px', fontWeight: '600', color: '#101828' }}>
                  {tournament.totalPayouts}
                </div>
              </div>
            </div>
            <Button
              color="warning"
              className="d-flex align-items-center justify-content-center"
              style={{ 
                backgroundColor: '#FFD600', 
                color: '#101828',
                border: 'none',
                borderRadius: '8px',
                padding: '8px 12px',
                width: '100%',
                fontWeight: '500',
                fontSize: '14px'
              }}
            >
              Send to all <Send size={16} className="ms-1" />
            </Button>
          </div>
        </div>

        {/* Members Table */}
        <div 
          className="mt-4"
          style={{ 
            backgroundColor: '#FFFFFF',
            borderRadius: '8px',
            border: '1px solid #EAECF0',
            overflow: 'hidden'
          }}
        >
          <Table responsive borderless className="mb-0">
            <thead>
              <tr style={{ backgroundColor: '#F9FAFB' }}>
                <th className="px-4 py-3" style={{ width: '40px' }}>
                  <input 
                    type="checkbox" 
                    className="form-check-input" 
                    onChange={(e) => toggleAllMembers(e.target.checked)}
                  />
                </th>
                <th className="px-4 py-3" style={{ fontSize: '14px', fontWeight: '500', color: '#667085' }}>
                  Member
                </th>
                <th className="px-4 py-3" style={{ fontSize: '14px', fontWeight: '500', color: '#667085' }}>
                  Rank
                </th>
                <th className="px-4 py-3" style={{ fontSize: '14px', fontWeight: '500', color: '#667085' }}>
                  Stats
                </th>
                <th className="px-4 py-3" style={{ fontSize: '14px', fontWeight: '500', color: '#667085' }}>
                  Payouts
                </th>
                <th className="px-4 py-3 text-center" style={{ fontSize: '14px', fontWeight: '500', color: '#667085' }}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {tournament.members.map((member, index) => (
                <tr key={member.id}>
                  <td className="px-4 py-3">
                    <input 
                      type="checkbox" 
                      className="form-check-input"
                      checked={member.selected}
                      onChange={(e) => toggleMember(member.id, e.target.checked)}
                    />
                  </td>
                  <td className="px-4 py-3" style={{ fontSize: '14px', color: '#101828' }}>
                    {member.name}
                  </td>
                  <td className="px-4 py-3" style={{ fontSize: '14px', color: '#101828' }}>
                    {member.rank}
                  </td>
                  <td className="px-4 py-3" style={{ fontSize: '14px', color: '#101828' }}>
                    {member.stats}
                  </td>
                  <td className="px-4 py-3" style={{ fontSize: '14px', color: '#101828' }}>
                    {member.amount}
                  </td>
                  <td className="px-4 py-3">
                    <div className="d-flex justify-content-center">
                      <Button
                        color="warning"
                        size="sm"
                        className="d-flex align-items-center"
                        style={{ 
                          backgroundColor: '#FFD600', 
                          color: '#101828',
                          border: 'none',
                          borderRadius: '4px',
                          padding: '6px 12px',
                          fontWeight: '500',
                          fontSize: '14px'
                        }}
                      >
                        Send <Send size={14} className="ms-1" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </AdminDashboardLayout>
  );
}