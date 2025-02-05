import { useState, useEffect, useRef } from "react";
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
  IconButton,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import MicIcon from "@mui/icons-material/Mic";
import StopIcon from "@mui/icons-material/Stop";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SupportAgentLayout from "../../components/layouts/SupportAgentLayout";
import { useSession } from "next-auth/react";
import { io } from "socket.io-client";
import RecordRTC from "recordrtc";
import { Tab } from "@mui/material";
import { Spinner } from "reactstrap";
import Image from "next/image";
import { ShowNavigatorDeviceModal } from "../../utils/helper";
import { Settings } from "@mui/icons-material";

const StyledTab = styled(Tab)({
  textTransform: "none",
  minWidth: 80,
  fontWeight: 500,
  color: "#666",
  "&.Mui-selected": {
    color: "#000",
  },
});

const ChatContainer = styled(Box)({
  display: "flex",
  height: "calc(100vh - 120px)",
  backgroundColor: "transparent",
  gap: "16px",
});

const Sidebar = styled(Box)({
  width: "280px",
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#fff",
  borderRadius: "8px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  overflow: "hidden",
});

const ChatArea = styled(Box)({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#fff",
  borderRadius: "8px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  overflow: "hidden",
});

const MessageInput = styled(Box)({
  padding: "16px",
  borderTop: "1px solid #eee",
  display: "flex",
  alignItems: "center",
  gap: "12px",
  backgroundColor: "#fff",
});

const ChatMessage = styled(Box)(({ isUser }: { isUser: boolean }) => ({
  display: "flex",
  alignItems: "flex-start",
  padding: "8px 16px",
  gap: "12px",
  justifyContent: isUser ? "flex-end" : "flex-start",
}));

const MessageBubble = styled(Box)(({ isUser }: { isUser: boolean }) => ({
  backgroundColor: isUser ? "#e5ebff" : "#f5f5f5",
  padding: "12px 16px",
  borderRadius: "12px",
  maxWidth: "70%",
  wordBreak: "break-word",
}));

const UserItem = styled(ListItem)({
  padding: "8px 16px",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#f8f9fa",
  },
  "&.selected": {
    backgroundColor: "#f0f0f0",
  },
});

const UserInfo = styled(Box)({
  display: "flex",
  flexDirection: "column",
  flex: 1,
});

const UserName = styled(Typography)({
  fontWeight: 500,
  fontSize: "14px",
});

const LastMessage = styled(Typography)({
  color: "#6c757d",
  fontSize: "12px",
});

const MessageTime = styled(Typography)({
  color: "#6c757d",
  fontSize: "11px",
  marginLeft: "auto",
});

const StatusDot = styled("span")({
  width: "8px",
  height: "8px",
  borderRadius: "50%",
  backgroundColor: "#4CAF50",
  display: "inline-block",
  marginLeft: "8px",
});

interface Message {
  _id: string;
  sender: string;
  receiver: string;
  content: string;
  media: any;
  createdAt: string;
}

interface User {
  _id: string;
  name: string;
  status?: string;
  role: string;
}

export default function SupportAgentChat() {
  const [tab, setTab] = useState(0);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const session = useSession();
  const [socketRef, setSocketRef] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File[]>([]);
  const [recordingTime, setRecordingTime] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [recorder, setRecorder] = useState<RecordRTC | null>(null);

  useEffect(() => {
    const socket = io(
      process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3000"
    );
    setSocketRef(socket);

    return () => {
      if (socket) socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socketRef && selectedUser) {
      const roomId = [session.data?.user?.id, selectedUser._id]
        .sort()
        .join("-");
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

  const fetchUsers = async (role = "User") => {
    setLoading(true);
    try {
      const response = await fetch(`/api/agent/users?role=${role}`);
      if (response.ok) {
        const data = await response.json();
        setUsers(data.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session.data) {
      fetchUsers(tab === 0 ? "User" : "Admin");
    }
  }, [tab, session.data]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(Array.from(e.target.files));
    }
  };

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
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [selectedUser, session.data?.user?.id]);

  const handleSend = async () => {
    if (!selectedUser || !session.data?.user?.id) return;

    try {
      const formData = new FormData();

      formData.append("sender", session.data.user.id);
      formData.append("receiver", selectedUser._id);
      formData.append(
        "roomId",
        [session.data.user.id, selectedUser._id].sort().join("-")
      );

      if (message.trim()) {
        formData.append("content", message);
      }

      if (file) {
        file.forEach((f) => {
          formData.append("files", f);
        });
      }

      const response = await fetch("/api/chat", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        if (socketRef) {
          socketRef.emit("message", data.data);
        }
        setFile([]);
        setMessage("");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    setSelectedUser(null);
  }, [tab]);

  const startRecording = async () => {
    let stream: MediaStream | null = null;
    try {
      if (typeof window !== "undefined" && navigator.mediaDevices) {
        // First request microphone permission
        const permissionResult = await navigator.permissions.query({
          name: "microphone" as PermissionName,
        });
        if (permissionResult.state === "denied") {
          alert(
            "Please allow microphone access in your browser settings to use this feature."
          );
          return;
        }

        // Get list of available audio devices
        const devices = await navigator.mediaDevices.enumerateDevices();
        // Show device selection dialog
        const deviceId = localStorage.getItem("preferredMicrophoneId");

        // Get audio stream from selected device
        stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            deviceId: deviceId ? { exact: deviceId } : undefined,
            echoCancellation: true,
            noiseSuppression: true,
            sampleRate: 44100,
          },
        });

        const mediaRecorder = new MediaRecorder(stream, {
          mimeType: "audio/webm",
        });

        const chunks: BlobPart[] = [];
        mediaRecorder.ondataavailable = (e) => {
          chunks.push(e.data);
        };

        mediaRecorder.onstop = () => {
          const blob = new Blob(chunks, { type: "audio/webm" });
          const audioFile = new File([blob], "voice-message.webm", {
            type: "audio/webm",
          });
          setFile([audioFile]);
        };

        mediaRecorder.start();
        setRecorder(mediaRecorder);
        setIsRecording(true);
        setRecordingTime(0);

        timerRef.current = setInterval(() => {
          setRecordingTime((prev) => prev + 1);
        }, 1000);
      }
    } catch (error) {
      console.error("Error starting recording:", error);
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      setIsRecording(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      alert("Unable to access microphone. Please check your browser settings.");
    }
  };

  const stopRecording = () => {
    if (recorder) {
      recorder.stop();
      setIsRecording(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  return (
    <SupportAgentLayout>
      <Box sx={{ p: 2, pt: 1 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 2,
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              mb: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6">Chat</Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              onClick={() => {
                setTab(0);
              }}
              sx={{
                textTransform: "none",
                minWidth: "80px",
                backgroundColor: tab === 0 ? "#FFD700" : "transparent",
                color: tab === 0 ? "#000" : "#666",
                "&:hover": {
                  backgroundColor: tab === 0 ? "#FFC700" : "rgba(0,0,0,0.05)",
                },
              }}
            >
              Users
            </Button>
            <Button
              onClick={() => {
                setTab(1);
              }}
              sx={{
                textTransform: "none",
                minWidth: "80px",
                backgroundColor: tab === 1 ? "#FFD700" : "transparent",
                color: tab === 1 ? "#000" : "#666",
                "&:hover": {
                  backgroundColor: tab === 1 ? "#FFC700" : "rgba(0,0,0,0.05)",
                },
              }}
            >
              Admin
            </Button>
          </Box>
        </Box>

        <ChatContainer>
          <Sidebar>
            <Box sx={{ p: 2, borderBottom: "1px solid #eee" }}>
              <Box
                sx={{ display: "flex", alignItems: "center", mb: 3, gap: 1.5 }}
              >
                <Avatar
                  src={
                    session?.data?.user?.profileImage || "/profile-avatar.png"
                  }
                  sx={{ width: 40, height: 40 }}
                />
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                    {session?.data?.user?.name}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <Box
                      sx={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        backgroundColor: "#4CAF50",
                      }}
                    />
                    <Typography variant="caption" sx={{ color: "#666" }}>
                      Online
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Typography
                variant="subtitle2"
                sx={{ color: "#666", fontSize: "13px", mb: 1, ml: 0.5 }}
              >
                Chat
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  mb: 2,
                  bgcolor: "#f5f5f5",
                  borderRadius: "4px",
                  padding: "2px",
                }}
              >
                <Button
                  //   onClick={() => setTab(0)}
                  sx={{
                    flex: 1,
                    height: "30px",
                    minWidth: "80px",
                    textTransform: "none",
                    color: "#000",
                    bgcolor: tab === 0 ? "#fff" : "transparent",
                    borderRadius: "4px",
                    boxShadow: tab === 0 ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
                    "&:hover": {
                      bgcolor: tab === 0 ? "#fff" : "rgba(0,0,0,0.05)",
                    },
                  }}
                >
                  All
                </Button>
                <Button
                  //   onClick={() => setTab(1)}
                  sx={{
                    flex: 1,
                    height: "30px",
                    minWidth: "80px",
                    textTransform: "none",
                    color: "#000",
                    bgcolor: tab === 1 ? "#fff" : "transparent",
                    borderRadius: "4px",
                    boxShadow: tab === 1 ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
                    "&:hover": {
                      bgcolor: tab === 1 ? "#fff" : "rgba(0,0,0,0.05)",
                    },
                  }}
                >
                  Unread
                </Button>
              </Box>
            </Box>

            <List sx={{ flex: 1, overflow: "auto", p: 0 }}>
              {!loading ? (
                users.map((user) => (
                  <UserItem
                    key={user._id}
                    className={selectedUser?._id === user._id ? "selected" : ""}
                    onClick={() => setSelectedUser(user)}
                  >
                    <ListItemAvatar>
                      <Avatar
                        src={"profile-avatar.png"}
                        sx={{ width: 40, height: 40 }}
                      />
                    </ListItemAvatar>
                    <UserInfo>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          mb: 0.5,
                        }}
                      >
                        <UserName>{user.name}</UserName>
                        <MessageTime>9:15 AM</MessageTime>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <LastMessage>Typing Something...</LastMessage>
                        <StatusDot sx={{ width: 6, height: 6, ml: 1 }} />
                      </Box>
                    </UserInfo>
                  </UserItem>
                ))
              ) : (
                <div className="text-center my-3">
                  <Spinner color="warning" />
                </div>
              )}
            </List>
          </Sidebar>

          <ChatArea>
            {selectedUser ? (
              <>
                <Box sx={{ p: 2, borderBottom: "1px solid #eee" }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Avatar
                      src={"profile-avatar.png"}
                      sx={{ width: 48, height: 48 }}
                    />
                    <Box>
                      <Typography variant="subtitle1" fontWeight={500}>
                        {selectedUser.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Online
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ flex: 1, overflowY: "auto", p: 2 }}>
                  {messages.map((msg) => (
                    <>
                      <ChatMessage
                        key={msg._id}
                        isUser={msg.sender === session.data?.user?.id}
                      >
                        <Avatar
                          src={
                            msg.sender === session.data?.user?.id
                              ? session.data?.user?.profileImage
                              : "/profile-avatar.png"
                          }
                          sx={{
                            order:
                              msg.sender === session.data?.user?.id ? 1 : 0,
                          }}
                        />
                        {msg.content && (
                          <MessageBubble
                            isUser={msg.sender === session.data?.user?.id}
                          >
                            {msg.content}
                          </MessageBubble>
                        )}
                      </ChatMessage>
                      {msg?.media && msg.media.length > 0 ? (
                        <div
                          className={`d-flex flex-wrap mt-1 ps-5 ${
                            msg.sender === session.data?.user?.id &&
                            "justify-content-end"
                          }`}
                        >
                          {msg.media.map((file) =>
                            file.fileType.includes("audio") ? (
                              <audio src={file.fileUrl} controls />
                            ) : file.fileType.includes("image") ? (
                              <Image
                                alt={file.fileName}
                                src={file.fileUrl}
                                width={200}
                                height={100}
                                className="me-2 mb-2"
                              />
                            ) : file.fileType.includes("video") ? (
                              <video
                                src={file.fileUrl}
                                controls
                                style={{ width: "300px", height: "200px" }}
                              ></video>
                            ) : null
                          )}
                        </div>
                      ) : null}
                    </>
                  ))}
                </Box>

                <MessageInput>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    multiple
                    style={{ display: "none" }}
                  />
                  <IconButton size="small" onClick={ShowNavigatorDeviceModal}>
                    <Settings />
                  </IconButton>
                  <TextField
                    fullWidth
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    variant="outlined"
                    size="small"
                    className="ps-1"
                    InputProps={{
                      startAdornment: (
                        <>
                          <IconButton
                            disabled={isRecording}
                            size="small"
                            className="pe-1 ps-0"
                            onClick={() => fileInputRef.current?.click()}
                          >
                            <AttachFileIcon />
                          </IconButton>
                          <IconButton
                            className="ps-0"
                            size="small"
                            color={isRecording ? "error" : "default"}
                            onClick={() =>
                              isRecording ? stopRecording() : startRecording()
                            }
                          >
                            {isRecording ? <StopIcon /> : <MicIcon />}
                          </IconButton>
                        </>
                      ),
                    }}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleSend();
                      }
                    }}
                  />
                  <Button
                    variant="contained"
                    onClick={handleSend}
                    disabled={!message && file.length === 0}
                    sx={{
                      minWidth: "auto",
                      backgroundColor: "#FFD700",
                      color: "#000",
                      borderRadius: "50%",
                      padding: "10px",
                      "&:hover": { backgroundColor: "#FFC700" },
                    }}
                  >
                    <SendIcon />
                  </Button>
                </MessageInput>
                {file && file.length > 0 && (
                  <Typography
                    className="pb-3 ps-5 ms-3"
                    variant="caption"
                    sx={{ mt: 0 }}
                  >
                    Selected file: {file.map((f) => f.name + " ")}
                  </Typography>
                )}
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
