
import { useState, useEffect } from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Badge } from 'reactstrap';
import { Bell } from 'react-feather';
import Link from 'next/link';
import Image from 'next/image';

export default function NotificationsDropdown() {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/notifications', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setNotifications(data.data);
        setUnreadCount(data.data.filter(n => !n.isRead).length);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  return (
    <UncontrolledDropdown>
      <DropdownToggle nav className="position-relative">
        <Bell size={20} />
        {unreadCount > 0 && (
          <Badge color="danger" pill className="position-absolute" style={{ top: '-5px', right: '-5px' }}>
            {unreadCount}
          </Badge>
        )}
      </DropdownToggle>
      <DropdownMenu end className="notification-dropdown p-0" style={{ width: '320px', maxHeight: '400px' }}>
        <div className="p-2 border-bottom d-flex justify-content-between align-items-center">
          <h6 className="mb-0">Notifications</h6>
          <Link href="/user/notifications" className="text-muted small">
            View All
          </Link>
        </div>
        <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
          {notifications.length === 0 ? (
            <DropdownItem text>No notifications</DropdownItem>
          ) : (
            notifications.slice(0, 5).map((notification) => (
              <DropdownItem key={notification._id} className="border-bottom">
                <div className="d-flex align-items-center">
                  <Image
                    src="/user1.png"
                    alt="User"
                    width={40}
                    height={40}
                    className="rounded-circle me-2"
                  />
                  <div>
                    <div className="fw-bold">{notification.title}</div>
                    <small className="text-muted">
                      {new Date(notification.createdAt).toLocaleString()}
                    </small>
                  </div>
                </div>
              </DropdownItem>
            ))
          )}
        </div>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
}
