
import { useState } from 'react';
import { Container, Button, Nav } from 'reactstrap';
import UserDashboardLayout from '../../components/layouts/UserDashboardLayout';
import Image from 'next/image';

export default function Notifications() {
  const [activeTab, setActiveTab] = useState('all');

  const notifications = [
    {
      type: 'friend_request',
      title: 'John send you a friend request',
      time: '40 minutes ago',
      actions: ['Accept', 'Reject']
    },
    {
      type: 'tournament',
      title: 'New Tournament announced!',
      description: 'Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first Lorem Ipsum generators on the Internet tend to repea',
      time: '40 minutes ago'
    },
    {
      type: 'tournament',
      title: 'New Tournament announced!',
      description: 'Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first Lorem Ipsum generators on the Internet tend to repea',
      time: '40 minutes ago'
    },
    {
      type: 'tournament',
      title: 'New Tournament announced!',
      description: 'Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first Lorem Ipsum generators on the Internet tend to repea',
      time: '40 minutes ago'
    }
  ];

  return (
    <UserDashboardLayout>
      <Container fluid className="p-4">
        <div className="bg-white rounded-3 shadow-sm">
          <div className="p-4 border-bottom">
            <div className="d-flex justify-content-between align-items-center">
              <h4 className="mb-0">Notifications</h4>
              <Nav className="gap-3">
                <Button 
                  color="link" 
                  className={activeTab === 'all' ? 'text-dark p-0' : 'text-muted p-0'}
                  onClick={() => setActiveTab('all')}
                >
                  All
                </Button>
                <Button 
                  color="link" 
                  className={activeTab === 'unread' ? 'text-dark p-0' : 'text-muted p-0'}
                  onClick={() => setActiveTab('unread')}
                >
                  Unread
                </Button>
              </Nav>
            </div>
          </div>
          <div>
            {notifications.map((notification, index) => (
              <div key={index} className="p-4 border-bottom notification-item">
                <div className="d-flex justify-content-between align-items-start">
                  <div className="d-flex gap-3">
                    {notification.type === 'friend_request' && (
                      <Image
                        src="/user1.png"
                        alt="User"
                        width={48}
                        height={48}
                        className="rounded-circle"
                      />
                    )}
                    {notification.type === 'tournament' && (
                      <Image
                        src="/fortnite-banner.png"
                        alt="Tournament"
                        width={48}
                        height={48}
                        className="rounded"
                      />
                    )}
                    <div className="flex-grow-1">
                      <h6 className="mb-1">{notification.title}</h6>
                      {notification.description && (
                        <p className="mb-1 text-muted small">{notification.description}</p>
                      )}
                      <small className="text-muted">{notification.time}</small>
                    </div>
                  </div>
                  {notification.actions && (
                    <div className="d-flex gap-2">
                      <Button color="danger" size="sm">Reject</Button>
                      <Button color="warning" size="sm">Accept</Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </UserDashboardLayout>
  );
}
