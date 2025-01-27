import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Tournament from "../../../models/Tournament";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!process.env.MONGODB_URI) {
    return res
      .status(500)
      .json({ success: false, message: "MongoDB URI not configured" });
  }

  try {
    await dbConnect();
    if (req.method === "POST") {
      try {
        const { images, ...rest } = req.body;
        const uploadedImages = [];

        if (Array.isArray(images)) {
          for (const image of images) {
            const base64Data = image.url.replace(
              /^data:image\/\w+;base64,/,
              ""
            );
            const buffer = Buffer.from(base64Data, "base64");
            const fileName = `${Date.now()}-${Math.random()
              .toString(36)
              .substr(2, 9)}.png`;
            const filePath = `./public/uploads/${fileName}`;

            require("fs").writeFileSync(filePath, buffer);
            uploadedImages.push(`/uploads/${fileName}`);
          }
        }

        const tournament = await Tournament.create({
          ...rest,
          prizeSplit: Array.isArray(req.body.prizeSplit)
            ? req.body.prizeSplit
            : [],
          images: uploadedImages,
        });

        return res.status(201).json({ success: true, data: tournament });
      } catch (error: any) {
        console.error("Tournament creation error:", error);
        return res.status(400).json({
          success: false,
          message: error.message || "Error creating tournament",
          details: error.errors || error.message,
        });
      }
    } else if (req.method === "GET") {
      const tournaments = await Tournament.find({}).sort({ createdAt: -1 });
      return res.status(200).json({ success: true, data: tournaments });
    } else if (req.method === "DELETE") {
      const { id } = req.query;
      const deletedTournament = await Tournament.findByIdAndDelete(id);
      if (!deletedTournament) {
        return res
          .status(404)
          .json({ success: false, message: "Tournament not found" });
      }
      return res.status(200).json({ success: true, data: deletedTournament });
    } else if (req.method === "PUT") {
      const { id } = req.query;
      const updatedTournament = await Tournament.findByIdAndUpdate(
        id,
        req.body,
        { new: true }
      );
      if (!updatedTournament) {
        return res
          .status(404)
          .json({ success: false, message: "Tournament not found" });
      }
      return res.status(200).json({ success: true, data: updatedTournament });
    }

    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  } catch (error: any) {
    console.error("Server error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Database connection failed" });
  }
}
