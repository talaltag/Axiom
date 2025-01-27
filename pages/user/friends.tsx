import { useState, useEffect } from 'react';
import UserDashboardLayout from '../../components/layouts/UserDashboardLayout';
import { Container, Row, Col, Input, Nav, NavItem, NavLink, Button } from 'reactstrap';
import Image from 'next/image';
import { Search } from 'react-feather';

interface User {
  _id: string;
  name: string;
  profileImage?: string;
}

export default function Friends() {
  const [activeTab, setActiveTab] = useState('myFriends');
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [sentRequests, setSentRequests] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchUsers();
    fetchSentRequests();
  }, []);

  const fetchSentRequests = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/friend-requests', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setSentRequests(new Set(data.data));
      }
    } catch (error) {
      console.error('Error fetching sent requests:', error);
    }
  };

  useEffect(() => {
    const filtered = users.filter(user => 
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchQuery, users]);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/users', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setUsers(data.data);
        setFilteredUsers(data.data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const mockFriends = Array(6).fill({
    id: '1',
    name: 'Vernon Miller',
    image: '/user1.png',
    mutualFriends: [
      { image: '/user1.png', count: 3 },
      { image: '/user1.png', count: 0 },
      { image: '/user1.png', count: 0 }
    ],
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
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        ) : (
          <Row>
            {filteredUsers.map((user) => (
              <Col md={6} key={user._id} className="mb-3">
                <div className="d-flex justify-content-between align-items-center p-3 bg-white rounded shadow-sm">
                  <div className="d-flex align-items-center">
                    <Image
                      src={user.profileImage || '/user1.png'}
                      alt={user.name}
                      width={48}
                      height={48}
                      className="rounded-circle"
                    />
                    <div className="ms-3">
                      <h6 className="mb-1">{user.name}</h6>
                    </div>
                  </div>
                  <Button 
                    color={sentRequests.has(user._id) ? "success" : "info"}
                    size="sm"
                    onClick={async () => {
                      if (!sentRequests.has(user._id)) {
                        try {
                          const token = localStorage.getItem('token');
                          const response = await fetch('/api/friend-requests', {
                            method: 'POST',
                            headers: {
                              'Content-Type': 'application/json',
                              'Authorization': `Bearer ${token}`
                            },
                            body: JSON.stringify({ receiverId: user._id })
                          });

                          if (response.ok) {
                            setSentRequests(prev => new Set([...prev, user._id]));
                          }
                        } catch (error) {
                          console.error('Error sending friend request:', error);
                        }
                      }
                    }}
                    disabled={sentRequests.has(user._id)}
                  >
                    {sentRequests.has(user._id) ? 'Request Sent' : 'Add Friend'}
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