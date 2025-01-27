import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
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

        // Get the logged-in user from the request headers
        const token = req.headers.authorization?.split(' ')[1];
        let loggedInUserId;
        
        if (token) {
          const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
          loggedInUserId = decoded.id;
        }

        const users = await User.find(query)
          .where("role")
          .ne("Admin")
          .where("_id")
          .ne(loggedInUserId)
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
        const { name, email, password, role = "Basic", cName } = req.body;

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
