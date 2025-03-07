import { withAuth } from "next-auth/middleware";

export default withAuth({
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: "/auth/login",
  },
});

export const config = {
  matcher: ["/((?!api/auth|public|.*\\.(?:png|jpg|jpeg|gif|svg)$).*)"],
};
