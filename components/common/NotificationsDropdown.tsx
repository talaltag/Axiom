
import React, { useState } from 'react';
import { Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Bell, MoreVertical } from 'react-feather';
import Link from 'next/link';

const NotificationsDropdown = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);

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
    }
  ];

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle nav className="position-relative p-0">
        <Bell size={20} className="text-muted" />
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          2
        </span>
      </DropdownToggle>
      <DropdownMenu end className="notification-dropdown p-0" style={{ width: '400px', maxHeight: '600px', overflow: 'auto' }}>
        <div className="p-3 border-bottom">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Notifications</h5>
            <div className="d-flex gap-2">
              <Button color="link" className="text-dark p-0">All</Button>
              <Button color="link" className="text-muted p-0">Unread</Button>
            </div>
          </div>
        </div>
        <div>
          {notifications.map((notification, index) => (
            <div key={index} className="p-3 border-bottom notification-item">
              <div className="d-flex justify-content-between align-items-start">
                <div className="d-flex gap-3">
                  {notification.type === 'friend_request' && (
                    <img src="/user1.png" alt="User" className="rounded-circle" width={40} height={40} />
                  )}
                  {notification.type === 'tournament' && (
                    <img src="/fortnite-banner.png" alt="Tournament" width={40} height={40} />
                  )}
                  <div className="flex-grow-1">
                    <h6 className="mb-1">{notification.title}</h6>
                    {notification.description && (
                      <p className="mb-1 text-muted small">{notification.description}</p>
                    )}
                    <small className="text-muted">{notification.time}</small>
                  </div>
                </div>
                <div className="d-flex align-items-start">
                  {notification.actions ? (
                    <div className="d-flex gap-2">
                      <Button color="danger" size="sm">Reject</Button>
                      <Button color="warning" size="sm">Accept</Button>
                    </div>
                  ) : (
                    <Button color="link" className="p-0">
                      <MoreVertical size={16} />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </DropdownMenu>
    </Dropdown>
  );
};

export default NotificationsDropdown;
