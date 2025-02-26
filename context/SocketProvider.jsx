import { useMemo } from "react";
import { io } from "socket.io-client";

export const useSocket = () => {
  const socket = useMemo(
    () => io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://0.0.0.0:3000"),
    []
  );

  return socket;
};
