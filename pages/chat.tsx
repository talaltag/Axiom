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
import UserDashboardLayout from "../components/layouts/UserDashboardLayout";
import ChatWindow from "../components/chat/ChatWindow";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

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
  const router = useRouter();
  const { receiver } = router.query;

  useEffect(() => {
    if (session.data) {
      const fetchUsers = async () => {
        try {
          setLoading(true);
          const [usersResponse, receiverResponse] = await Promise.all([
            session.data.user.role === "Admin"
              ? fetch("/api/users")
              : fetch("/api/users/me/friends?others=true"),
            receiver ? fetch(`/api/users/${receiver}`) : Promise.resolve(null),
          ]);

          if (!usersResponse.ok) {
            throw new Error("Failed to fetch users");
          }

          const usersData = await usersResponse.json();
          let receiverData = null;
          if (receiverResponse) {
            const receiverJson = await receiverResponse.json();
            if (receiverJson.success) {
              receiverData = receiverJson.data;
            }
          }

          let usersList = usersData.data;

          setUsers(usersList);

          // Set selected user from receiver query or receiver data
          if (receiverData) {
            setSelectedUser(receiverData);
          } else if (receiver) {
            const receiverUser = usersList.find(
              (user) => user._id === receiver
            );
            if (receiverUser) {
              setSelectedUser(receiverUser);
            }
          }
        } catch (error) {
          console.error("Error fetching data:", error);
          setError("Failed to load users");
        } finally {
          setLoading(false);
        }
      };

      fetchUsers();
    }
  }, [session.data, receiver]);

  useEffect(() => {
    if (session.data?.user?.id && session.data.user.name) {
      setCurrentUser({
        _id: session.data.user.id,
        name: session.data.user.name,
        profileImage: session.data.user.profileImage,
      });
    }
  }, [session.data]);

  if (loading) {
    return (
      <UserDashboardLayout>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <CircularProgress />
        </Box>
      </UserDashboardLayout>
    );
  }

  if (error) {
    return (
      <UserDashboardLayout>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          {error}
        </Box>
      </UserDashboardLayout>
    );
  }

  return (
    <UserDashboardLayout>
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
    </UserDashboardLayout>
  );
}
