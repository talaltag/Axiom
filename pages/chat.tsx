
import { useState, useEffect } from 'react';
import { Box, Grid, Paper, List, ListItem, ListItemAvatar, Avatar, ListItemText, CircularProgress } from '@mui/material';
import UserDashboardLayout from '../components/layouts/UserDashboardLayout';
import ChatWindow from '../components/chat/ChatWindow';

interface User {
  _id: string;
  name: string;
  profileImage?: string;
}

export default function ChatPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCurrentUser = () => {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      setCurrentUser(user);
    };

    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data.data || []);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Failed to load users');
      } finally {
        setLoading(false);
      }
    };

    loadCurrentUser();
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <UserDashboardLayout>
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <CircularProgress />
        </Box>
      </UserDashboardLayout>
    );
  }

  if (error) {
    return (
      <UserDashboardLayout>
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          {error}
        </Box>
      </UserDashboardLayout>
    );
  }

  return (
    <UserDashboardLayout>
      <Box sx={{ flexGrow: 1, height: 'calc(100vh - 100px)' }}>
        <Grid container spacing={2} sx={{ height: '100%' }}>
          <Grid item xs={3}>
            <Paper sx={{ height: '100%', overflow: 'auto' }}>
              <List>
                {users && users.map((user) => (
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
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center', 
                  height: '100%',
                  color: 'text.secondary'
                }}>
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
