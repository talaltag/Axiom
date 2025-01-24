
import { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Input,
  Nav,
  NavItem,
  NavLink,
  Card,
  CardBody,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import UserDashboardLayout from '../../../components/layouts/UserDashboardLayout';
import Image from 'next/image';
import { MoreVertical, MessageSquare } from 'react-feather';

interface User {
  _id: string;
  name: string;
  profileImage?: string;
}

export default function Friends() {
  const [users, setUsers] = useState<User[]>([]);
  const [activeTab, setActiveTab] = useState('my-friends');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users');
        const data = await response.json();
        if (data.success) {
          setUsers(data.data);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <UserDashboardLayout>
      <Container fluid className="p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="mb-0">Friends</h4>
        </div>

        <div className="d-flex justify-content-between align-items-center mb-4">
          <Nav tabs className="border-0">
            <NavItem>
              <NavLink
                className={`border-0 px-3 ${activeTab === 'my-friends' ? 'bg-warning text-white' : ''}`}
                onClick={() => setActiveTab('my-friends')}
                style={{ cursor: 'pointer', borderRadius: '4px' }}
              >
                My Friends
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={`border-0 px-3 ${activeTab === 'players' ? 'bg-warning text-white' : ''}`}
                onClick={() => setActiveTab('players')}
                style={{ cursor: 'pointer', borderRadius: '4px' }}
              >
                Players
              </NavLink>
            </NavItem>
          </Nav>
          <Input
            type="search"
            placeholder="Search"
            className="w-25"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Card className="border-0 shadow-sm">
          <CardBody>
            {filteredUsers.map((user) => (
              <div
                key={user._id}
                className="d-flex align-items-center justify-content-between py-3"
                style={{ borderBottom: '1px solid #eee' }}
              >
                <div className="d-flex align-items-center">
                  <div className="position-relative" style={{ width: '48px', height: '48px' }}>
                    <Image
                      src={user.profileImage || '/user1.png'}
                      alt={user.name}
                      fill
                      style={{ objectFit: 'cover', borderRadius: '50%' }}
                    />
                  </div>
                  <div className="ms-3">
                    <h6 className="mb-0">{user.name}</h6>
                    <small className="text-muted">Also followed by John, Mike +3</small>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <Button color="warning" className="me-2" size="sm">
                    <MessageSquare size={16} className="me-1" />
                    Message
                  </Button>
                  <UncontrolledDropdown>
                    <DropdownToggle color="light" size="sm">
                      <MoreVertical size={16} />
                    </DropdownToggle>
                    <DropdownMenu end>
                      <DropdownItem>View Profile</DropdownItem>
                      <DropdownItem>Remove Friend</DropdownItem>
                      <DropdownItem>Block</DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </div>
              </div>
            ))}
          </CardBody>
        </Card>
      </Container>
    </UserDashboardLayout>
  );
}
