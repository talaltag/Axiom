
import { useEffect, useRef, useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import {
  Call as CallIcon,
  CallEnd as CallEndIcon,
  Videocam as VideocamIcon,
  VideocamOff as VideocamOffIcon,
  Mic as MicIcon,
  MicOff as MicOffIcon,
} from "@mui/icons-material";

interface CallWindowProps {
  peerConnection: RTCPeerConnection | null;
  localStream: MediaStream | null;
  remoteStream: MediaStream | null;
  isVideo: boolean;
  onEndCall: () => void;
  onToggleVideo: () => void;
  onToggleAudio: () => void;
}

export default function CallWindow({
  peerConnection,
  localStream,
  remoteStream,
  isVideo,
  onEndCall,
  onToggleVideo,
  onToggleAudio,
}: CallWindowProps) {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const [isVideoEnabled, setIsVideoEnabled] = useState(isVideo);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);

  useEffect(() => {
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream;
    }
    if (remoteVideoRef.current && remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [localStream, remoteStream]);

  const handleToggleVideo = () => {
    setIsVideoEnabled(!isVideoEnabled);
    onToggleVideo();
  };

  const handleToggleAudio = () => {
    setIsAudioEnabled(!isAudioEnabled);
    onToggleAudio();
  };

  return (
    <Box sx={{ width: "100%", height: "100%", position: "relative" }}>
      <Box sx={{ display: "flex", height: "100%" }}>
        {remoteStream && (
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        )}
        {localStream && (
          <video
            ref={localVideoRef}
            autoPlay
            playsInline
            muted
            style={{
              position: "absolute",
              width: "150px",
              height: "150px",
              bottom: 80,
              right: 20,
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
        )}
      </Box>
      <Box
        sx={{
          position: "absolute",
          bottom: 20,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 2,
          backgroundColor: "rgba(0,0,0,0.5)",
          padding: 2,
          borderRadius: 4,
        }}
      >
        <IconButton onClick={handleToggleVideo} color="primary">
          {isVideoEnabled ? <VideocamIcon /> : <VideocamOffIcon />}
        </IconButton>
        <IconButton onClick={handleToggleAudio} color="primary">
          {isAudioEnabled ? <MicIcon /> : <MicOffIcon />}
        </IconButton>
        <IconButton onClick={onEndCall} color="error">
          <CallEndIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
