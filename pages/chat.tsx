
import { useState, useEffect } from 'react';
import { Box, List, ListItem, ListItemAvatar, ListItemText, Avatar, Paper, Grid } from '@mui/material';
import ChatWindow from '../components/chat/ChatWindow';
import UserDashboardLayout from '../components/layouts/UserDashboardLayout';

export default function Chat() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetchUsers();
    // For demo, get current user from localStorage. In production, use proper authentication
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    setCurrentUser(user);
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/users');
      const data = await res.json();
      if (data.success) {
        setUsers(data.data.filter((user: any) => user._id !== currentUser?._id));
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  return (
    <UserDashboardLayout>
      <Box sx={{ flexGrow: 1, height: 'calc(100vh - 100px)' }}>
        <Grid container spacing={2} sx={{ height: '100%' }}>
          <Grid item xs={3}>
            <Paper sx={{ height: '100%', overflow: 'auto' }}>
              <List>
                {users.map((user: any) => (
                  <ListItem
                    button
                    key={user._id}
                    selected={selectedUser?._id === user._id}
                    onClick={() => setSelectedUser(user)}
                  >
                    <ListItemAvatar>
                      <Avatar src={user.profileImage} />
                    </ListItemAvatar>
                    <ListItemText primary={user.name} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
          <Grid item xs={9}>
            <Paper sx={{ height: '100%' }}>
              {selectedUser && currentUser ? (
                <ChatWindow currentUser={currentUser} receiver={selectedUser} />
              ) : (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                  Select a user to start chatting
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </UserDashboardLayout>
  );
}
