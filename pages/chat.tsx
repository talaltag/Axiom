
import { useState, useEffect } from 'react';
import { Box, Grid, Paper, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';
import UserDashboardLayout from '../components/layouts/UserDashboardLayout';
import ChatWindow from '../components/chat/ChatWindow';

export default function Chat() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetchUsers();
    // Get current user from local storage
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    setCurrentUser(user);
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/users');
      const data = await res.json();
      if (data.success) {
        setUsers(data.data.filter(user => user._id !== currentUser?._id));
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
