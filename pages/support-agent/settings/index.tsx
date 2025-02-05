
import { Box, Tabs, Tab, Typography, Avatar, TextField, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import SupportAgentLayout from '../../../components/layouts/SupportAgentLayout';

const StyledTab = styled(Tab)({
  textTransform: 'none',
  minWidth: 80,
  fontWeight: 600,
  marginRight: '16px',
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
  width: '280px',
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

export default function Settings() {
  const [tab, setTab] = useState(0);
  const [message, setMessage] = useState('');

  return (
    <SupportAgentLayout>
      <Box sx={{ p: 3 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Tabs value={tab} onChange={(_, newValue) => setTab(newValue)}>
            <StyledTab label="Users" />
            <StyledTab label="Admin" />
          </Tabs>
        </Box>

        <ChatContainer>
          <UsersList>
            {/* User list items */}
            {['Alex Lucas Jack', 'Dianne Team', 'Eleanor Pena'].map((name) => (
              <Box
                key={name}
                sx={{
                  p: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  cursor: 'pointer',
                  '&:hover': { backgroundColor: '#f5f5f5' },
                }}
              >
                <Avatar>{name[0]}</Avatar>
                <Typography>{name}</Typography>
              </Box>
            ))}
          </UsersList>

          <ChatArea>
            <Box sx={{ flex: 1, p: 2, overflowY: 'auto' }}>
              {/* Chat messages will go here */}
            </Box>

            <MessageInput>
              <TextField
                fullWidth
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                variant="outlined"
                size="small"
              />
              <Button 
                variant="contained" 
                sx={{ 
                  backgroundColor: '#007bff',
                  '&:hover': { backgroundColor: '#0056b3' }
                }}
              >
                Send
              </Button>
            </MessageInput>
          </ChatArea>
        </ChatContainer>
      </Box>
    </SupportAgentLayout>
  );
}
