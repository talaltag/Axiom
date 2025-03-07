import { withAuth } from "next-auth/middleware";

export default withAuth({
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: "/auth/login", // Redirect to login page if not authenticated
  },
  ignore: ["/public", "/public/*", "/axiom.png", "axiom.png", "/api/auth/*"], // You can add routes you want to exclude from the middleware
});
