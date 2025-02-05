
import { useState, useEffect, useRef } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
  IconButton,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { io } from "socket.io-client";

interface User {
  _id: string;
  name: string;
}

interface Message {
  _id: string;
  sender: string;
  receiver: string;
  content: string;
  fileUrl?: string;
  fileName?: string;
  fileType?: string;
  createdAt: string;
}

interface ChatWindowProps {
  currentUser: User;
  receiver: User;
}

export default function ChatWindow({ currentUser, receiver }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const socketRef = useRef<any>(null);
  const roomId = [currentUser._id, receiver._id].sort().join("-");

  useEffect(() => {
    socketRef.current = io(
      process.env.NEXT_PUBLIC_SOCKET_URL || "http://0.0.0.0:3000"
    );
    socketRef.current.emit("join", roomId);

    socketRef.current.on("message", (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socketRef.current.emit("leave", roomId);
      socketRef.current.disconnect();
    };
  }, [roomId]);

  useEffect(() => {
    fetchMessages();
  }, [currentUser._id, receiver._id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/chat?sender=${currentUser._id}&receiver=${receiver._id}`
      );
      if (response.ok) {
        const data = await response.json();
        setMessages(data.data);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() && !file) return;

    try {
      const formData = new FormData();
      formData.append("sender", currentUser._id);
      formData.append("receiver", receiver._id);
      formData.append("roomId", roomId.toString());
      
      if (newMessage.trim()) {
        formData.append("content", newMessage.toString());
      }
      
      if (file) {
        formData.append("file", file);
      }

      const response = await fetch("/api/chat", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        socketRef.current.emit("message", data.data);
        setNewMessage("");
        setFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const renderMessage = (message: Message) => {
    const isCurrentUser = message.sender === currentUser._id;
    return (
      <Box
        key={message._id}
        sx={{
          display: "flex",
          justifyContent: isCurrentUser ? "flex-end" : "flex-start",
          mb: 2,
        }}
      >
        <Paper
          sx={{
            p: 2,
            maxWidth: "70%",
            bgcolor: isCurrentUser ? "primary.main" : "grey.100",
            color: isCurrentUser ? "white" : "text.primary",
          }}
        >
          {message.content && (
            <Typography sx={{ mb: message.fileUrl ? 1 : 0 }}>
              {message.content}
            </Typography>
          )}
          {message.fileUrl && (
            <Box>
              {message.fileType?.startsWith("image/") ? (
                <img 
                  src={message.fileUrl} 
                  alt={message.fileName}
                  style={{ maxWidth: "200px", maxHeight: "200px" }}
                />
              ) : (
                <Button
                  href={message.fileUrl}
                  target="_blank"
                  variant="contained"
                  size="small"
                  sx={{ mt: 1 }}
                >
                  Download {message.fileName}
                </Button>
              )}
            </Box>
          )}
        </Paper>
      </Box>
    );
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Box sx={{ p: 2, borderBottom: 1, borderColor: "divider" }}>
        <Typography variant="h6">{receiver.name}</Typography>
      </Box>

      <Box sx={{ flexGrow: 1, overflow: "auto", p: 2 }}>
        {messages.map(renderMessage)}
        <div ref={messagesEndRef} />
      </Box>

      <Box
        component="form"
        onSubmit={handleSend}
        sx={{ p: 2, borderTop: 1, borderColor: "divider" }}
      >
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            style={{ display: "none" }}
          />
          <IconButton
            onClick={() => fileInputRef.current?.click()}
            size="small"
          >
            <AttachFileIcon />
          </IconButton>
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
        {file && (
          <Typography variant="caption" sx={{ ml: 1, mt: 1 }}>
            Selected file: {file.name}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
