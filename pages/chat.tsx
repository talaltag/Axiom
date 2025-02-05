
import { useState } from 'react';
import { Box, Typography, Avatar, TextField, Button, Tab, Tabs, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import SendIcon from '@mui/icons-material/Send';
import UserDashboardLayout from '../components/layouts/UserDashboardLayout';

const StyledTab = styled(Tab)({
  textTransform: 'none',
  minWidth: 80,
  fontWeight: 600,
  color: '#666',
  '&.Mui-selected': {
    color: '#000',
  }
});

const ChatContainer = styled(Box)({
  display: 'flex',
  height: 'calc(100vh - 100px)',
  backgroundColor: '#fff',
  borderRadius: '8px',
});

const UsersList = styled(Box)({
  width: '300px',
  borderRight: '1px solid #eee',
  overflowY: 'auto',
});

const ChatArea = styled(Box)({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
});

const MessageInput = styled(Box)({
  padding: '16px',
  borderTop: '1px solid #eee',
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
});

const UserItem = styled(Box)({
  padding: '12px 16px',
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#f5f5f5',
  },
  position: 'relative',
});

const OnlineStatus = styled(Box)({
  width: '10px',
  height: '10px',
  borderRadius: '50%',
  backgroundColor: '#4CAF50',
  position: 'absolute',
  bottom: '12px',
  left: '44px',
  border: '2px solid white',
});

const MessageBubble = styled(Box)({
  padding: '10px 16px',
  borderRadius: '16px',
  maxWidth: '70%',
  marginBottom: '8px',
});

export default function ChatPage() {
  const [tab, setTab] = useState(0);
  const [message, setMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  const users = [
    { id: 1, name: 'Alex Lucas Jack', online: true },
    { id: 2, name: 'Dianne Team', online: true },
    { id: 3, name: 'Eleanor Pena', online: false },
    { id: 4, name: 'Theresa Webb', online: true },
    { id: 5, name: 'Robert Fox', online: false },
  ];

  return (
    <UserDashboardLayout>
      <Box sx={{ p: 3 }}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h5" component="h1" gutterBottom>
            Chat
          </Typography>
          <Tabs value={tab} onChange={(_, newValue) => setTab(newValue)} sx={{ mb: 2 }}>
            <StyledTab label="Users" />
            <StyledTab label="Admin" />
          </Tabs>
        </Box>

        <ChatContainer>
          <UsersList>
            <Box sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <Button 
                  variant={tab === 0 ? "contained" : "outlined"} 
                  size="small"
                  sx={{ flex: 1, bgcolor: tab === 0 ? '#FFB800' : 'transparent' }}
                >
                  All
                </Button>
                <Button 
                  variant={tab === 1 ? "contained" : "outlined"} 
                  size="small"
                  sx={{ flex: 1, bgcolor: tab === 1 ? '#FFB800' : 'transparent' }}
                >
                  Unread
                </Button>
              </Box>
            </Box>
            {users.map((user) => (
              <UserItem key={user.id}>
                <Avatar>{user.name[0]}</Avatar>
                {user.online && <OnlineStatus />}
                <Box>
                  <Typography variant="subtitle2">{user.name}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    Typing something...
                  </Typography>
                </Box>
              </UserItem>
            ))}
          </UsersList>

          <ChatArea>
            <Box sx={{ flex: 1, p: 2, overflowY: 'auto' }}>
              {/* Chat messages will be rendered here */}
            </Box>
            <MessageInput>
              <TextField
                fullWidth
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                variant="outlined"
                size="small"
                InputProps={{
                  endAdornment: (
                    <IconButton color="primary">
                      <SendIcon />
                    </IconButton>
                  )
                }}
              />
            </MessageInput>
          </ChatArea>
        </ChatContainer>
      </Box>
    </UserDashboardLayout>
  );
}
