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
  CircularProgress,
} from "@mui/material";
import AdminDashboardLayout from "../components/layouts/AdminDashboardLayout";
import ChatWindow from "../components/chat/ChatWindow";
import { useSession } from "next-auth/react";

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
  const session = useSession();
  useEffect(() => {
    if (session.data) {
      const fetchUsers = async () => {
        try {
          setLoading(true);
          const response =
            session.data.user.role == "Admin"
              ? await fetch("/api/users")
              : await fetch("/api/users/me/friends");
          if (!response.ok) {
            throw new Error("Failed to fetch users");
          }
          const data = await response.json();
          if (session.data.user.role !== "Admin") {
            setUsers([
              ...data.data,
              {
                _id: "6792d847811967dbede75c5b",
                name: "Admin ",
                email: "admin@admin.com",
                cName: "talal@theappguys.com",
                role: "Admin",
              },
            ]);
          } else {
            setUsers(data.data.filter((user) => user.role !== "Admin"));
          }
        } catch (error) {
          console.error("Error fetching users:", error);
          setError("Failed to load users");
        } finally {
          setLoading(false);
        }
      };

      fetchUsers();
    }
  }, [session.data]);

  useEffect(() => {
    if (session.data?.user?.id && session.data.user.name) {
      setCurrentUser({
        _id: session.data.user.id,
        name: session.data.user.name,
        profileImage: session.data.user.image,
      });
    }
  }, [session.data]);

  if (loading) {
    return (
      <AdminDashboardLayout>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <CircularProgress />
        </Box>
      </AdminDashboardLayout>
    );
  }

  if (error) {
    return (
      <AdminDashboardLayout>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          {error}
        </Box>
      </AdminDashboardLayout>
    );
  }

  return (
    <AdminDashboardLayout>
      <Box sx={{ flexGrow: 1, height: "calc(100vh - 100px)" }}>
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
                <ChatWindow currentUser={currentUser} receiver={selectedUser} />
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
    </AdminDashboardLayout>
  );
}
