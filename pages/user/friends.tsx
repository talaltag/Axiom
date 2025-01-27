
import { useState } from 'react';
import UserDashboardLayout from '../../components/layouts/UserDashboardLayout';
import { Container, Row, Col, Input, Nav, NavItem, NavLink, Button, Badge } from 'reactstrap';
import Image from 'next/image';
import { Search, MessageCircle, MoreVertical } from 'react-feather';

interface Friend {
  id: string;
  name: string;
  image: string;
  mutualFriends: {
    image: string;
    count: number;
  }[];
  status?: 'request_sent' | 'add_friend';
}

export default function Friends() {
  const [activeTab, setActiveTab] = useState('myFriends');
  const [searchQuery, setSearchQuery] = useState('');

  const mockFriends: Friend[] = Array(6).fill({
    id: '1',
    name: 'Vernon Miller',
    image: '/user1.png',
    mutualFriends: [
      { image: '/user1.png', count: 3 },
      { image: '/user1.png', count: 0 },
      { image: '/user1.png', count: 0 }
    ],
    status: 'add_friend'
  });

  return (
    <UserDashboardLayout>
      <Container fluid className="p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <Nav tabs className="border-0">
            <NavItem>
              <NavLink
                className={`border-0 px-4 ${activeTab === 'myFriends' ? 'bg-warning text-dark' : 'text-muted'}`}
                onClick={() => setActiveTab('myFriends')}
                style={{ cursor: 'pointer' }}
              >
                My Friends
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={`border-0 px-4 ${activeTab === 'players' ? 'bg-warning text-dark' : 'text-muted'}`}
                onClick={() => setActiveTab('players')}
                style={{ cursor: 'pointer' }}
              >
                Players
              </NavLink>
            </NavItem>
          </Nav>
          <div className="position-relative" style={{ width: '300px' }}>
            <Search size={18} className="position-absolute" style={{ top: '10px', left: '10px' }} />
            <Input
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="ps-5"
            />
          </div>
        </div>

        {activeTab === 'myFriends' ? (
          <Row>
            {mockFriends.map((friend, index) => (
              <Col md={6} key={index} className="mb-3">
                <div className="d-flex justify-content-between align-items-center p-3 bg-white rounded shadow-sm">
                  <div className="d-flex align-items-center">
                    <Image
                      src={friend.image}
                      alt={friend.name}
                      width={48}
                      height={48}
                      className="rounded-circle"
                    />
                    <div className="ms-3">
                      <h6 className="mb-1">{friend.name}</h6>
                      <div className="d-flex align-items-center">
                        <small className="text-muted me-2">Also followed by</small>
                        <div className="d-flex align-items-center">
                          {friend.mutualFriends.map((mutual, mIndex) => (
                            <div key={mIndex} className="position-relative" style={{ marginLeft: mIndex > 0 ? '-8px' : 0 }}>
                              <Image
                                src={mutual.image}
                                alt="Mutual friend"
                                width={24}
                                height={24}
                                className="rounded-circle border border-white"
                              />
                              {mutual.count > 0 && (
                                <Badge color="warning" className="position-absolute top-0 end-0 rounded-circle">
                                  +{mutual.count}
                                </Badge>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <Button color="warning" size="sm" className="me-2">
                      <MessageCircle size={16} />
                    </Button>
                    <Button color="light" size="sm">
                      <MoreVertical size={16} />
                    </Button>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        ) : (
          <Row>
            {mockFriends.map((friend, index) => (
              <Col md={6} key={index} className="mb-3">
                <div className="d-flex justify-content-between align-items-center p-3 bg-white rounded shadow-sm">
                  <div className="d-flex align-items-center">
                    <Image
                      src={friend.image}
                      alt={friend.name}
                      width={48}
                      height={48}
                      className="rounded-circle"
                    />
                    <div className="ms-3">
                      <h6 className="mb-1">{friend.name}</h6>
                      <div className="d-flex align-items-center">
                        <small className="text-muted">Mutual Friend</small>
                        <div className="d-flex align-items-center ms-2">
                          {friend.mutualFriends.map((mutual, mIndex) => (
                            <div key={mIndex} className="position-relative" style={{ marginLeft: mIndex > 0 ? '-8px' : 0 }}>
                              <Image
                                src={mutual.image}
                                alt="Mutual friend"
                                width={24}
                                height={24}
                                className="rounded-circle border border-white"
                              />
                            </div>
                          ))}
                          <small className="text-warning ms-2">+3</small>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button
                    color={friend.status === 'request_sent' ? 'success' : 'info'}
                    size="sm"
                    className={friend.status === 'request_sent' ? 'text-white' : ''}
                  >
                    {friend.status === 'request_sent' ? 'Request Sent' : 'Add Friend'}
                  </Button>
                </div>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </UserDashboardLayout>
  );
}
