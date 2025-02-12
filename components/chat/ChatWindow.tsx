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
import MicIcon from "@mui/icons-material/Mic";
import StopIcon from "@mui/icons-material/Stop";
import { io } from "socket.io-client";
import Image from "next/image";
import RecordRTC from "recordrtc";
import { Settings } from "@mui/icons-material";
import { ShowNavigatorDeviceModal } from "../../utils/helper";
import CallIcon from "@mui/icons-material/Call";
import VideocamIcon from "@mui/icons-material/Videocam";
import CallWindow from "./CallWindow";

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
  media: any;
}

interface ChatWindowProps {
  currentUser: User;
  receiver: User;
}

export default function ChatWindow({ currentUser, receiver }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState<File[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [recorder, setRecorder] = useState<RecordRTC | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
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

    socketRef.current.on("call-offer", handleCallOffer);
    socketRef.current.on("call-answer", handleCallAnswer);
    socketRef.current.on("ice-candidate", handleIceCandidate);

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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(Array.from(e.target.files));
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() && !file) return;

    try {
      const formData = new FormData();
      formData.append("sender", currentUser._id);
      formData.append("receiver", receiver._id);
      formData.append(
        "roomId",
        [currentUser._id, receiver._id].sort().join("-")
      );

      if (newMessage.trim()) {
        formData.append("content", newMessage);
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
        socketRef.current.emit("message", data.data);
        setNewMessage("");
        setFile([]);
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
          {message?.media && message.media.length > 0 ? (
            <div className="d-flex flex-wrap mt-2">
              {message.media.map((file) =>
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
          {message.fileUrl && (
            <Box>
              {message.fileType?.startsWith("audio/") ? (
                <audio controls style={{ maxWidth: "200px" }}>
                  <source src={`/${message.fileUrl}`} type={message.fileType} />
                  Your browser does not support the audio element.
                </audio>
              ) : message.fileType?.startsWith("image/") ? (
                <img
                  src={`/${message.fileUrl}`}
                  alt={message.fileName}
                  style={{
                    maxWidth: "200px",
                    maxHeight: "200px",
                    borderRadius: "8px",
                    marginTop: "8px",
                  }}
                />
              ) : (
                <Button
                  href={`/${message.fileUrl}`}
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

  const [peerConnection, setPeerConnection] =
    useState<RTCPeerConnection | null>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [isInCall, setIsInCall] = useState(false);

  const startCall = async (video: boolean) => {
    try {
      // Get user media
      const stream = await navigator.mediaDevices.getUserMedia({
        video: video,
        audio: true, // Added audio
      });
      setLocalStream(stream);

      // Create and configure peer connection
      const pc = new RTCPeerConnection({
        iceServers: [
          { urls: "stun:stun.l.google.com:19302" },
          { urls: "stun:stun1.l.google.com:19302" },
        ],
      });

      // Add local stream tracks to peer connection
      stream.getTracks().forEach((track) => {
        pc.addTrack(track, stream);
      });

      // Handle remote stream
      pc.ontrack = (event) => {
        setRemoteStream(event.streams[0]);
      };

      // Handle ICE candidates
      pc.onicecandidate = (event) => {
        if (event.candidate) {
          socketRef.current.emit("ice-candidate", {
            candidate: event.candidate,
            to: receiver._id,
            from: currentUser._id, // Added from
          });
        }
      };

      // Create and send offer
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      socketRef.current.emit("call-offer", {
        offer: offer,
        to: receiver._id,
        from: currentUser._id, // Added from
      });

      setPeerConnection(pc);
      setIsInCall(true);
    } catch (error) {
      console.error("Error starting call:", error);
      alert(
        "Failed to start call. Please check your camera/microphone permissions."
      );
    }
  };

  const handleCallOffer = async (data: {
    offer: RTCSessionDescriptionInit;
    from: string;
  }) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true, // Added audio
      });
      setLocalStream(stream);

      const pc = new RTCPeerConnection({
        iceServers: [
          { urls: "stun:stun.l.google.com:19302" },
          { urls: "stun:stun1.l.google.com:19302" },
        ],
      });

      stream.getTracks().forEach((track) => {
        pc.addTrack(track, stream);
      });

      pc.ontrack = (event) => {
        setRemoteStream(event.streams[0]);
      };

      pc.onicecandidate = (event) => {
        if (event.candidate) {
          socketRef.current.emit("ice-candidate", {
            candidate: event.candidate,
            to: data.from,
            from: currentUser._id, // Added from
          });
        }
      };

      await pc.setRemoteDescription(new RTCSessionDescription(data.offer));
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);

      socketRef.current.emit("call-answer", {
        answer: answer,
        to: data.from,
        from: currentUser._id, // Added from
      });

      setPeerConnection(pc);
      setIsInCall(true);
    } catch (error) {
      console.error("Error handling call offer:", error);
    }
  };

  const handleCallAnswer = async (data: {
    answer: RTCSessionDescriptionInit;
    from: string;
  }) => {
    try {
      if (peerConnection) {
        await peerConnection.setRemoteDescription(
          new RTCSessionDescription(data.answer)
        );
      }
    } catch (error) {
      console.error("Error handling call answer:", error);
    }
  };

  const handleIceCandidate = async (data: {
    candidate: RTCIceCandidateInit;
    from: string;
  }) => {
    try {
      if (peerConnection) {
        await peerConnection.addIceCandidate(
          new RTCIceCandidate(data.candidate)
        );
      }
    } catch (error) {
      console.error("Error handling ICE candidate:", error);
    }
  };

  const endCall = () => {
    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
      setLocalStream(null);
    }
    if (peerConnection) {
      peerConnection.close();
      setPeerConnection(null);
    }
    setRemoteStream(null);
    setIsInCall(false);
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
      {isInCall && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1000,
          }}
        >
          <CallWindow
            peerConnection={peerConnection}
            localStream={localStream}
            remoteStream={remoteStream}
            isVideo={true}
            onEndCall={endCall}
            onToggleVideo={() => {
              if (localStream) {
                const videoTrack = localStream.getVideoTracks()[0];
                if (videoTrack) videoTrack.enabled = !videoTrack.enabled;
              }
            }}
            onToggleAudio={() => {
              if (localStream) {
                const audioTrack = localStream.getAudioTracks()[0];
                if (audioTrack) audioTrack.enabled = !audioTrack.enabled;
              }
            }}
          />
        </Box>
      )}
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
            multiple
            style={{ display: "none" }}
          />
          <IconButton
            onClick={() => fileInputRef.current?.click()}
            size="small"
          >
            <AttachFileIcon />
          </IconButton>
          <IconButton size="small" onClick={ShowNavigatorDeviceModal}>
            <Settings />
          </IconButton>
          <IconButton size="small" onClick={() => startCall(false)}>
            <CallIcon />
          </IconButton>
          <IconButton size="small" onClick={() => startCall(true)}>
            <VideocamIcon />
          </IconButton>
          <IconButton
            onClick={() => (isRecording ? stopRecording() : startRecording())}
            size="small"
            className="ps-0"
            color={isRecording ? "error" : "default"}
          >
            {isRecording ? <StopIcon /> : <MicIcon />}
          </IconButton>
          {isRecording && (
            <Typography variant="caption" color="error">
              {formatTime(recordingTime)}
            </Typography>
          )}
          <TextField
            fullWidth
            size="small"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
          />
          <Button
            type="submit"
            disabled={!newMessage && file.length === 0}
            variant="contained"
            endIcon={<SendIcon />}
          >
            Send
          </Button>
        </Box>
        {file && file.length > 0 && (
          <Typography variant="caption" sx={{ ml: 1, mt: 1 }}>
            Selected file: {file.map((f) => f.name + " ")}
          </Typography>
        )}
      </Box>
    </Box>
  );
}