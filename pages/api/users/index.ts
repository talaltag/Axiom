
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User";
import FriendRequest from "../../../models/FriendRequest";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await dbConnect();

    if (req.method === "GET") {
      // Get authentication token
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: 'Not authenticated' });
      }

      const token = authHeader.split(' ')[1];
      
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key") as any;
        const userId = decoded.userId;

        const currentUser = await User.findById(userId);
        if (!currentUser) {
          return res.status(404).json({ success: false, message: 'User not found' });
        }

        const { page = 1, limit = 10, search = "", role = "" } = req.query;
        const skip = (Number(page) - 1) * Number(limit);

        let query: any = {};

        if (search) {
          query.$or = [
            { name: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
          ];
        }

        if (role) {
          query.role = role;
        }

        // Different behavior based on user role
        if (currentUser.role === 'Admin') {
          query._id = { $ne: userId };
        } else {
          const friendIds = currentUser.friends?.map(friend => friend.toString()) || [];
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

          query._id = { 
            $ne: userId,
            $nin: [...new Set([...friendIds, ...requestUserIds])]
          };
          query.role = { $ne: "Admin" };
        }

        const users = await User.find(query)
          .select("-password")
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(Number(limit));

        const total = await User.countDocuments(query);

        return res.status(200).json({
          success: true,
          data: users,
          total,
          page: Number(page),
          totalPages: Math.ceil(total / Number(limit)),
        });
      } catch (error) {
        return res.status(401).json({ success: false, message: 'Invalid token' });
      }
    } else if (req.method === "POST") {
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
        cName
      });

      const userWithoutPassword = {
        ...user.toObject(),
        password: undefined,
      };

      return res.status(201).json({ 
        success: true, 
        data: userWithoutPassword 
      });
    }

    return res.status(405).json({ 
      success: false, 
      message: "Method not allowed" 
    });
  } catch (error: any) {
    console.error("Server error:", error);
    return res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
}
