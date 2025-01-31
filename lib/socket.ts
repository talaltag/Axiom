
import { Server as SocketServer } from 'socket.io';
import { Server as HTTPServer } from 'http';
import { Server as HTTPSServer } from 'https';

export function initSocket(server: HTTPServer | HTTPSServer) {
  const io = new SocketServer(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
      credentials: true
    },
    transports: ['websocket', 'polling'],
    path: '/socket.io'
  });

  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    socket.on('join', (roomId: string) => {
      socket.join(roomId);
      console.log(`User joined room: ${roomId}`);
    });

    socket.on('leave', (roomId: string) => {
      socket.leave(roomId);
      console.log(`User left room: ${roomId}`);
    });

    socket.on('message', async (data) => {
      io.to(data.roomId).emit('message', data);
      console.log(`Message sent in room: ${data.roomId}`);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });

  return io;
}
