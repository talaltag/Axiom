import { useState, useEffect, useRef } from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

interface User {
  _id: string;
  name: string;
}

interface Message {
  _id: string;
  sender: string;
  receiver: string;
  content: string;
  createdAt: string;
}

interface ChatWindowProps {
  currentUser: User;
  receiver: User;
}

export default function ChatWindow({ currentUser, receiver }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, [currentUser._id, receiver._id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchMessages = async () => {
    try {
      const response = await fetch(
        `/api/chat?sender=${currentUser._id}&receiver=${receiver._id}`
      );
      if (response.ok) {
        const data = await response.json();
        setMessages(data.data);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sender: currentUser._id,
          receiver: receiver._id,
          content: newMessage,
        }),
      });

      if (response.ok) {
        setNewMessage("");
        fetchMessages();
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Box sx={{ p: 2, borderBottom: 1, borderColor: "divider" }}>
        <Typography variant="h6">{receiver.name}</Typography>
      </Box>

      <Box sx={{ flexGrow: 1, overflow: "auto", p: 2 }}>
        {messages &&
          messages.map((message) => (
            <Box
              key={message._id}
              sx={{
                display: "flex",
                justifyContent:
                  message.sender === currentUser._id
                    ? "flex-end"
                    : "flex-start",
                mb: 2,
              }}
            >
              <Paper
                sx={{
                  p: 2,
                  maxWidth: "70%",
                  bgcolor:
                    message.sender === currentUser._id
                      ? "primary.main"
                      : "grey.100",
                  color:
                    message.sender === currentUser._id
                      ? "white"
                      : "text.primary",
                }}
              >
                <Typography>{message.content}</Typography>
              </Paper>
            </Box>
          ))}
        <div ref={messagesEndRef} />
      </Box>

      <Box
        component="form"
        onSubmit={handleSend}
        sx={{ p: 2, borderTop: 1, borderColor: "divider" }}
      >
        <Box sx={{ display: "flex", gap: 1 }}>
          <TextField
            fullWidth
            size="small"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
          />
          <Button type="submit" variant="contained" endIcon={<SendIcon />}>
            Send
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
