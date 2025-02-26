
import type { NextApiRequest, NextApiResponse } from 'next';
import { withAuth } from '../../../middleware/withAuth';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default withAuth(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const form = formidable({
      uploadDir: './public/uploads',
      keepExtensions: true,
      maxFileSize: 5 * 1024 * 1024, // 5MB limit
    });

    form.parse(req, async (err, _, files) => {
      if (err) {
        return res.status(500).json({ message: 'Error uploading file' });
      }

      const image = files.image;
      if (!image) {
        return res.status(400).json({ message: 'No image provided' });
      }

      const imageFile = Array.isArray(image) ? image[0] : image;
      
      // Check file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(imageFile.mimetype)) {
        return res.status(400).json({ message: 'Invalid file type. Only JPEG, PNG and GIF are allowed.' });
      }

      const imagePath = `/uploads/${path.basename(imageFile.filepath)}`;

      return res.status(200).json({
        success: true,
        message: 'Screenshot uploaded successfully',
        path: imagePath
      });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});
