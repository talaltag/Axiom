
import { useState, useEffect } from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Badge } from 'reactstrap';
import { Bell } from 'react-feather';

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
      <DropdownMenu end style={{ width: '300px', maxHeight: '400px', overflowY: 'auto' }}>
        {notifications.length === 0 ? (
          <DropdownItem text>No notifications</DropdownItem>
        ) : (
          notifications.map((notification) => (
            <DropdownItem key={notification._id}>
              <div className="d-flex flex-column">
                <small className="text-muted">{new Date(notification.createdAt).toLocaleString()}</small>
                <span>{notification.title}</span>
                {notification.description && (
                  <small>{notification.description}</small>
                )}
              </div>
            </DropdownItem>
          ))
        )}
      </DropdownMenu>
    </UncontrolledDropdown>
  );
}
