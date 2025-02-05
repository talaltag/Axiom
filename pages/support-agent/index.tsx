
import { useState } from 'react';
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Avatar,
  TextField,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  styled,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SupportAgentLayout from '../../components/layouts/SupportAgentLayout';

const StyledTab = styled(Tab)({
  textTransform: 'none',
  minWidth: 80,
  fontWeight: 500,
  color: '#666',
  '&.Mui-selected': {
    color: '#000',
  }
});

const ChatContainer = styled(Box)({
  display: 'flex',
  height: 'calc(100vh - 120px)',
  backgroundColor: '#fff',
  borderRadius: '8px',
  overflow: 'hidden',
  border: '1px solid #eee',
});

const Sidebar = styled(Box)({
  width: '280px',
  borderRight: '1px solid #eee',
  display: 'flex',
  flexDirection: 'column',
});

const ChatArea = styled(Box)({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#fff',
});

const MessageInput = styled(Box)({
  padding: '16px',
  borderTop: '1px solid #eee',
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  backgroundColor: '#fff',
});

const ChatMessage = styled(Box)(({ isUser }: { isUser: boolean }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  padding: '8px 16px',
  gap: '12px',
  justifyContent: isUser ? 'flex-end' : 'flex-start',
}));

const MessageBubble = styled(Box)(({ isUser }: { isUser: boolean }) => ({
  backgroundColor: isUser ? '#f5f5f5' : '#fff',
  padding: '12px 16px',
  borderRadius: '12px',
  maxWidth: '70%',
  wordBreak: 'break-word',
}));

const UserItem = styled(ListItem)({
  padding: '12px 16px',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#f5f5f5',
  },
  '&.selected': {
    backgroundColor: '#f0f0f0',
  },
});

const StatusDot = styled('span')({
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  backgroundColor: '#4CAF50',
  display: 'inline-block',
  marginLeft: '8px',
});

export default function SupportAgentChat() {
  const [tab, setTab] = useState(0);
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState('');

  const users = [
    { id: 1, name: 'Alex Lucas Jack', avatar: '/user1.png', status: 'online' },
    { id: 2, name: 'Dianne Team', avatar: '/user1.png', status: 'online' },
    { id: 3, name: 'Eleanor Pena', avatar: '/user1.png', status: 'offline' },
    { id: 4, name: 'Theresa Webb', avatar: '/user1.png', status: 'online' },
    { id: 5, name: 'Robert Fox', avatar: '/user1.png', status: 'offline' },
    { id: 6, name: 'Marvin McKinney', avatar: '/user1.png', status: 'online' },
  ];

  const handleSend = () => {
    if (message.trim()) {
      // Handle message sending logic here
      setMessage('');
    }
  };

  return (
    <SupportAgentLayout>
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'center' }}>
          <Typography variant="h5" fontWeight={500}>Chat</Typography>
          <Box>
            <Button 
              variant="contained" 
              sx={{ 
                mr: 1,
                backgroundColor: '#FFD700',
                color: '#000',
                '&:hover': { backgroundColor: '#FFC700' }
              }}
            >
              Users
            </Button>
            <Button 
              variant="text" 
              sx={{ color: '#666' }}
            >
              Admin
            </Button>
          </Box>
        </Box>

        <ChatContainer>
          <Sidebar>
            <Box sx={{ p: 2, borderBottom: '1px solid #eee' }}>
              <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                <Button 
                  variant={tab === 0 ? "contained" : "text"}
                  size="small"
                  onClick={() => setTab(0)}
                  sx={{ textTransform: 'none' }}
                >
                  All
                </Button>
                <Button 
                  variant={tab === 1 ? "contained" : "text"}
                  size="small"
                  onClick={() => setTab(1)}
                  sx={{ textTransform: 'none' }}
                >
                  Unread
                </Button>
              </Box>
              <Typography variant="subtitle2" color="text.secondary">Chat</Typography>
            </Box>
            
            <List sx={{ flex: 1, overflow: 'auto', p: 0 }}>
              {users.map((user) => (
                <UserItem
                  key={user.id}
                  className={selectedUser?.id === user.id ? 'selected' : ''}
                  onClick={() => setSelectedUser(user)}
                >
                  <ListItemAvatar>
                    <Avatar src={user.avatar} />
                  </ListItemAvatar>
                  <ListItemText 
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {user.name}
                        {user.status === 'online' && <StatusDot />}
                      </Box>
                    }
                    secondary="Typing Something..."
                  />
                </UserItem>
              ))}
            </List>
          </Sidebar>

          <ChatArea>
            {selectedUser ? (
              <>
                <Box sx={{ p: 2, borderBottom: '1px solid #eee' }}>
                  <Typography variant="subtitle1" fontWeight={500}>
                    {selectedUser.name}
                  </Typography>
                </Box>
                <Box sx={{ flex: 1, overflowY: 'auto', p: 2 }}>
                  {/* Example messages */}
                  <ChatMessage>
                    <Avatar src="/user1.png" />
                    <MessageBubble isUser={false}>
                      So, what's your plan this weekend?
                    </MessageBubble>
                  </ChatMessage>
                  <ChatMessage isUser>
                    <MessageBubble isUser>
                      What's the progress on that task?
                    </MessageBubble>
                    <Avatar src="/user1.png" />
                  </ChatMessage>
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
                      startAdornment: (
                        <span role="img" aria-label="emoji" style={{ marginRight: 8 }}>
                          😊
                        </span>
                      ),
                    }}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSend}
                    sx={{ 
                      minWidth: 'auto',
                      backgroundColor: '#FFD700',
                      color: '#000',
                      '&:hover': { backgroundColor: '#FFC700' }
                    }}
                  >
                    <SendIcon />
                  </Button>
                </MessageInput>
              </>
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  color: 'text.secondary',
                }}
              >
                Select a user to start chatting
              </Box>
            )}
          </ChatArea>
        </ChatContainer>
      </Box>
    </SupportAgentLayout>
  );
}
