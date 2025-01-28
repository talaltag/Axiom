import { getToken } from "next-auth/jwt";
import { NextApiRequest, NextApiResponse } from "next";

declare module "next" {
  interface NextApiRequest {
    user?: any;
  }
}

export function withAuth(handler: any) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = await getToken({ req, secret: process.env.JWT_SECRET });

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Not authenticated" });
    }

    req.user = token;
    return handler(req, res);
  };
}
