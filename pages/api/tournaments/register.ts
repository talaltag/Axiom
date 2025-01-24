import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import dbConnect from '../../../lib/dbConnect';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    await dbConnect();

    const form = formidable({
      uploadDir: path.join(process.cwd(), 'public/uploads'),
      keepExtensions: true,
      maxFiles: 1,
      maxFileSize: 5 * 1024 * 1024, // 5MB
    });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'Error uploading file' });
      }

      const file = files.teamImage?.[0];
      const teamImagePath = file ? `/uploads/${path.basename(file.filepath)}` : null;

      // Here you would save the registration data to your database
      res.status(200).json({ 
        success: true, 
        data: { teamImagePath } 
      });
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
}