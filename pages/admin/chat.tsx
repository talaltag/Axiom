import { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
} from "@mui/material";
import AdminDashboardLayout from "../../components/layouts/AdminDashboardLayout";
import ChatWindow from "../../components/chat/ChatWindow";
import { useRouter } from "next/navigation";

interface User {
  _id: string;
  name: string;
  profileImage?: string;
}

export default function AdminChatPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadCurrentUser = () => {
      const isAdmin = localStorage.getItem("adminAuth");
      if (!isAdmin) {
        router.push("/auth/login");
        return;
      }
      setCurrentUser({ _id: "admin", name: "Admin" });
    };

    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users");
        if (response.ok) {
          const data = await response.json();
          setUsers(data.data);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    loadCurrentUser();
    fetchUsers();
  }, []);

  return (
    <AdminDashboardLayout>
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" sx={{ mb: 3 }}>
          Chat Management
        </Typography>
        <Box sx={{ flexGrow: 1, height: "calc(100vh - 200px)" }}>
          <Grid container spacing={2} sx={{ height: "100%" }}>
            <Grid item xs={3}>
              <Paper sx={{ height: "100%", overflow: "auto" }}>
                <List>
                  {users &&
                    users.map((user) => (
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
              <Paper sx={{ height: "100%" }}>
                {selectedUser && currentUser ? (
                  <ChatWindow
                    currentUser={currentUser}
                    receiver={selectedUser}
                  />
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                      color: "text.secondary",
                    }}
                  >
                    Select a user to start chatting
                  </Box>
                )}
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </AdminDashboardLayout>
  );
}
