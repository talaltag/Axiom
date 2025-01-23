
import { useState, useEffect, useRef } from 'react';
import { Box, TextField, Button, Typography, Avatar } from '@mui/material';
import { io, Socket } from 'socket.io-client';
import { Send } from '@mui/icons-material';

interface Message {
  _id: string;
  sender: { _id: string; name: string; profileImage: string };
  receiver: { _id: string; name: string; profileImage: string };
  message: string;
  createdAt: string;
}

interface ChatWindowProps {
  currentUser: any;
  receiver: any;
}

export default function ChatWindow({ currentUser, receiver }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState<Socket | null>(null);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    const newSocket = io();
    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [currentUser, receiver]);

  useEffect(() => {
    if (socket) {
      socket.on('message', (message: Message) => {
        if (
          (message.sender._id === currentUser._id && message.receiver._id === receiver._id) ||
          (message.sender._id === receiver._id && message.receiver._id === currentUser._id)
        ) {
          setMessages(prev => [...prev, message]);
        }
      });
    }
  }, [socket, currentUser, receiver]);

  const fetchMessages = async () => {
    try {
      const res = await fetch(`/api/chat?userId=${currentUser._id}&receiverId=${receiver._id}`);
      const data = await res.json();
      if (data.success) {
        setMessages(data.data);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sender: currentUser._id,
          receiver: receiver._id,
          message: newMessage
        })
      });

      const data = await res.json();
      if (data.success) {
        socket?.emit('message', data.data);
        setNewMessage('');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h6">{receiver.name}</Typography>
      </Box>
      
      <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
        {messages.map((message) => (
          <Box
            key={message._id}
            sx={{
              display: 'flex',
              justifyContent: message.sender._id === currentUser._id ? 'flex-end' : 'flex-start',
              mb: 2
            }}
          >
            <Box sx={{ display: 'flex', maxWidth: '70%' }}>
              {message.sender._id !== currentUser._id && (
                <Avatar src={message.sender.profileImage} sx={{ mr: 1 }} />
              )}
              <Box
                sx={{
                  backgroundColor: message.sender._id === currentUser._id ? 'primary.main' : 'grey.100',
                  color: message.sender._id === currentUser._id ? 'white' : 'text.primary',
                  p: 2,
                  borderRadius: 2
                }}
              >
                <Typography variant="body1">{message.message}</Typography>
                <Typography variant="caption" sx={{ opacity: 0.7 }}>
                  {new Date(message.createdAt).toLocaleTimeString()}
                </Typography>
              </Box>
            </Box>
          </Box>
        ))}
        <div ref={messagesEndRef} />
      </Box>

      <Box component="form" onSubmit={sendMessage} sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            fullWidth
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            size="small"
          />
          <Button type="submit" variant="contained" endIcon={<Send />}>
            Send
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
