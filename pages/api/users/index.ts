
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User";
import FriendRequest from "../../../models/FriendRequest";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const conn = await dbConnect();
    if (!conn) {
      throw new Error("Database connection failed");
    }

    if (req.method === "GET") {
      try {
        const { page = 1, limit = 10, search = "", role = "" } = req.query;
        const skip = (Number(page) - 1) * Number(limit);

        const query: any = {};
        if (search) {
          query.$or = [
            { name: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
          ];
        }
        if (role) {
          query.role = role;
        }

        // Get current user with authentication
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
          return res.status(401).json({ success: false, message: 'Not authenticated' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key") as any;
        const userId = decoded.userId;

        // Get current user with friends list
        const currentUser = await User.findById(userId).populate('friends');
        if (!currentUser) {
          return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Different behavior based on user role
        if (currentUser.role === 'Admin') {
          // For admin, show all users except themselves
          query._id = { $ne: userId };
        } else {
          // For regular users, only show non-admin users excluding friends and friend requests
          const friendIds = currentUser.friends.map(friend => friend.toString());
          const friendRequests = await FriendRequest.find({
            $or: [
              { sender: userId },
              { receiver: userId }
            ]
          });
          const requestUserIds = friendRequests.map(request => 
            request.sender.toString() === userId ? 
              request.receiver.toString() : 
              request.sender.toString()
          );
          const excludeIds = [...new Set([...friendIds, ...requestUserIds])];
          query._id = { 
            $ne: userId,
            $nin: excludeIds
          };
          query.role = { $ne: "Admin" };
        }

        // Get friend IDs as strings
        const friendIds = currentUser.friends.map(friend => friend._id.toString());

        // Get all friend requests (both accepted and pending)
        const friendRequests = await FriendRequest.find({
          $or: [
            { sender: userId },
            { receiver: userId }
          ]
        });

        // Extract user IDs from all friend requests
        const requestUserIds = friendRequests.map(request => 
          request.sender.toString() === userId ? 
            request.receiver.toString() : 
            request.sender.toString()
        );

        // Combine friend IDs and all request IDs
        const excludeIds = [...new Set([...friendIds, ...requestUserIds])];

        // Exclude current user, friends, and users with accepted requests
        query._id = { 
          $ne: userId,
          $nin: excludeIds
        };
        query.role = { $ne: "Admin" };

        const users = await User.find(query)
          .select("-password")
          .sort({ createdAt: -1 });

        const total = await User.countDocuments(query);

        res.status(200).json({
          success: true,
          data: users,
          total,
          page: Number(page),
          totalPages: Math.ceil(total / Number(limit)),
        });
      } catch (error: any) {
        console.error("Error fetching users:", error);
        res.status(500).json({ success: false, message: error.message });
      }
    } else if (req.method === "POST") {
      try {
        const { name, email, password, role = "User", cName } = req.body;

        if (!name || !email || !password) {
          return res.status(400).json({
            success: false,
            message: "Please provide all required fields",
          });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(400).json({
            success: false,
            message: "Email already exists",
          });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
          name,
          email,
          password: hashedPassword,
          role,
          cName,
        });

        const userWithoutPassword = {
          ...user.toObject(),
          password: undefined,
        };

        res.status(201).json({ success: true, data: userWithoutPassword });
      } catch (error: any) {
        console.error("Error creating user:", error);
        res.status(500).json({
          success: false,
          message: error.message,
        });
      }
    } else {
      res.status(405).json({ success: false, message: "Method not allowed" });
    }
  } catch (error: any) {
    console.error("Server error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
}
