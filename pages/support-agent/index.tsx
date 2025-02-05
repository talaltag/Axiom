
import { useState, useEffect } from 'react';
import {
  Box,
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
import { useSession } from 'next-auth/react';
import { io } from 'socket.io-client';

import { Tab } from '@mui/material';

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

interface Message {
  _id: string;
  sender: string;
  receiver: string;
  content: string;
  createdAt: string;
}

interface User {
  _id: string;
  name: string;
  status?: string;
}

export default function SupportAgentChat() {
  const [tab, setTab] = useState(0);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const session = useSession();
  const [socketRef, setSocketRef] = useState<any>(null);

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3000");
    setSocketRef(socket);

    return () => {
      if (socket) socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socketRef && selectedUser) {
      const roomId = [session.data?.user?.id, selectedUser._id].sort().join("-");
      socketRef.emit("join", roomId);

      socketRef.on("message", (message: Message) => {
        setMessages((prev) => [...prev, message]);
      });

      return () => {
        socketRef.emit("leave", roomId);
        socketRef.off("message");
      };
    }
  }, [socketRef, selectedUser, session.data?.user?.id]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users');
        if (response.ok) {
          const data = await response.json();
          setUsers(data.data.filter((user: User) => user.role === 'User'));
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    if (session.data) {
      fetchUsers();
    }
  }, [session.data]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedUser || !session.data?.user?.id) return;
      
      try {
        const response = await fetch(
          `/api/chat?sender=${session.data.user.id}&receiver=${selectedUser._id}`
        );
        if (response.ok) {
          const data = await response.json();
          setMessages(data.data);
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [selectedUser, session.data?.user?.id]);

  const handleSend = async () => {
    if (!message.trim() || !selectedUser || !session.data?.user?.id) return;

    try {
      const messageData = {
        sender: session.data.user.id,
        receiver: selectedUser._id,
        content: message,
        roomId: [session.data.user.id, selectedUser._id].sort().join("-"),
      };

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(messageData),
      });

      if (response.ok) {
        if (socketRef) {
          socketRef.emit("message", messageData);
        }
        setMessage("");
      }
    } catch (error) {
      console.error("Error sending message:", error);
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
                  key={user._id}
                  className={selectedUser?._id === user._id ? 'selected' : ''}
                  onClick={() => setSelectedUser(user)}
                >
                  <ListItemAvatar>
                    <Avatar src="/user1.png" />
                  </ListItemAvatar>
                  <ListItemText 
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {user.name}
                        <StatusDot />
                      </Box>
                    }
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
                  {messages.map((msg) => (
                    <ChatMessage key={msg._id} isUser={msg.sender === session.data?.user?.id}>
                      <Avatar src="/user1.png" sx={{ order: msg.sender === session.data?.user?.id ? 1 : 0 }} />
                      <MessageBubble isUser={msg.sender === session.data?.user?.id}>
                        {msg.content}
                      </MessageBubble>
                    </ChatMessage>
                  ))}
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
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleSend();
                      }
                    }}
                  />
                  <Button
                    variant="contained"
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
