
import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends NextApiRequest {
  user?: any;
}

export function isAdmin(
  req: AuthRequest,
  res: NextApiResponse,
  next: () => void
) {
  const isAdminUser = localStorage.getItem('adminAuth') === 'true';
  
  if (!isAdminUser) {
    return res.status(403).json({ success: false, message: 'Admin access required' });
  }
  
  next();
}
