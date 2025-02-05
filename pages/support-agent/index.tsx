
import { useState, useEffect } from "react";
import {
  Box,
  Tabs,
  Tab,
  Avatar,
  Typography,
  TextField,
  IconButton,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  styled,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import SupportAgentLayout from "../../components/layouts/SupportAgentLayout";

const StyledTab = styled(Tab)({
  textTransform: "none",
  minWidth: 80,
  color: "#666",
  "&.Mui-selected": {
    color: "#000",
    fontWeight: 600,
  },
});

const ChatContainer = styled(Box)({
  display: "flex",
  height: "calc(100vh - 100px)",
  backgroundColor: "#fff",
  borderRadius: "8px",
});

const UsersList = styled(Box)({
  width: "280px",
  borderRight: "1px solid #eee",
  overflowY: "auto",
});

const ChatArea = styled(Box)({
  flex: 1,
  display: "flex",
  flexDirection: "column",
});

const MessageInput = styled(Box)({
  padding: "16px",
  borderTop: "1px solid #eee",
  display: "flex",
  alignItems: "center",
  gap: "12px",
});

const UserListItem = styled(ListItem)({
  padding: "12px 16px",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#f5f5f5",
  },
  "&.selected": {
    backgroundColor: "#007bff",
    color: "white",
  },
});

export default function SupportAgentChat() {
  const [tab, setTab] = useState(0);
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState("");

  const users = [
    { id: 1, name: "James", avatar: "/user1.png" },
    { id: 2, name: "Damien Joe", avatar: "/user1.png" },
    { id: 3, name: "lo", avatar: "/user1.png" },
    { id: 4, name: "testing", avatar: "/user1.png" },
    { id: 5, name: "Zubair", avatar: "/user1.png" },
    { id: 6, name: "User", avatar: "/user1.png" },
  ];

  const handleSend = () => {
    if (message.trim()) {
      // Implement send message logic here
      setMessage("");
    }
  };

  return (
    <SupportAgentLayout>
      <Box sx={{ p: 3 }}>
        <ChatContainer>
          <UsersList>
            <Box sx={{ px: 2, py: 1, borderBottom: "1px solid #eee" }}>
              <Tabs 
                value={tab} 
                onChange={(_, newValue) => setTab(newValue)}
                sx={{ minHeight: 36 }}
              >
                <StyledTab label="Users" />
                <StyledTab label="Admin" />
              </Tabs>
            </Box>
            <List sx={{ p: 0 }}>
              {users.map((user) => (
                <UserListItem
                  key={user.id}
                  className={selectedUser?.id === user.id ? "selected" : ""}
                  onClick={() => setSelectedUser(user)}
                >
                  <ListItemAvatar>
                    <Avatar src={user.avatar} />
                  </ListItemAvatar>
                  <ListItemText primary={user.name} />
                </UserListItem>
              ))}
            </List>
          </UsersList>

          <ChatArea>
            {selectedUser ? (
              <>
                <Box sx={{ p: 2, borderBottom: "1px solid #eee" }}>
                  <Typography variant="subtitle1" fontWeight={600}>
                    {selectedUser.name}
                  </Typography>
                </Box>
                <Box sx={{ flex: 1, p: 2, overflowY: "auto" }}>
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
                    endIcon={<SendIcon />}
                    onClick={handleSend}
                    sx={{ minWidth: 100 }}
                  >
                    Send
                  </Button>
                </MessageInput>
              </>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  color: "text.secondary",
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
