
import { Server as SocketServer } from 'socket.io';
import { Server as HTTPServer } from 'http';
import { Server as HTTPSServer } from 'https';

export function initSocket(server: HTTPServer | HTTPSServer) {
  const io = new SocketServer(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    socket.on('join', (roomId: string) => {
      socket.join(roomId);
    });

    socket.on('leave', (roomId: string) => {
      socket.leave(roomId);
    });

    socket.on('message', async (data) => {
      io.to(data.roomId).emit('message', data);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });

  return io;
}
