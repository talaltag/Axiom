import { useState, useEffect } from "react";
import { Container, Row, Col, Alert } from "reactstrap";
import { useRouter } from "next/router";
import LoginForm from "../../components/auth/LoginForm";
import Logo from "../../components/auth/Logo";
import { signIn, useSession } from "next-auth/react";

export default function Login() {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const session = useSession();

  useEffect(() => {
    if (session?.data?.user?.role) {
      const route =
        session.data.user.role === "Admin" ||
        session.data.user.role === "admin" ||
        session.data.user.role === "Super"
          ? "/admin/dashboard"
          : "/user/dashboard";
      router.push(route);
    }
  }, [session]);

  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    setError("");
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (result.error) {
      if (result.status == 401) {
        setError("Wrong Credentials");
      }
    }
    setLoading(false);
    if (result.ok) {
      const data = await fetch("/api/auth/session").then((res) => res.json());
      const route =
        data.user.role === "Admin" ||
        data.user.role === "admin" ||
        data.user.role === "Super"
          ? "/admin/dashboard"
          : data.user.role === "Agent"
          ? "/support-agent"
          : "/user/dashboard";
      router.push(route);
    }
  };

  return (
    <Container fluid className="min-vh-100">
      <Row className="h-100">
        <Col
          md={5}
          className="d-flex flex-column bg-white p-5"
          style={{
            height: "100vh",
            maxWidth: "580px",
            borderTopRightRadius: "100px",
            borderBottomRightRadius: "100px",
          }}
        >
          <div className="text-center mt-4">
            <h1 className="display-6 fw-bold">Welcome to Axiom</h1>
          </div>
          <div className="flex-grow-1 d-flex align-items-center justify-content-center">
            <Logo />
          </div>
          <div className="text-center text-muted mb-4">© 2024 Axiom</div>
        </Col>
        <Col
          md={7}
          className="d-flex justify-content-center align-items-center"
          style={{
            height: "100vh",
            backgroundImage: "url(/login-bg.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div>
            {error && (
              <Alert color="danger" className="mb-3">
                {error}
              </Alert>
            )}
            <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
          </div>
        </Col>
      </Row>
    </Container>
  );
}
