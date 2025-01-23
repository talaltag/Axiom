import { useState } from "react";
import { Container, Row, Col, Alert } from "reactstrap";
import { useRouter } from "next/router";
import LoginForm from "../../components/auth/LoginForm";
import Logo from "../../components/auth/Logo";

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleLogin = async (email: string, password: string) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      // Set localStorage for client-side
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Set cookie for server-side with proper settings
      document.cookie = `auth-token=${data.token}; path=/; secure; samesite=strict; domain=${window.location.hostname}`;

      if (data.user.role === "Admin") {
        router.push("/admin/dashboard");
      } else {
        window.location.href = "/user/dashboard";
      }
    } catch (err: any) {
      setError(err.message);
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
            <h1 className="display-6 fw-bold">Welcome to</h1>
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
          {error && (
            <Alert color="danger" className="mb-3">
              {error}
            </Alert>
          )}
          <LoginForm onSubmit={handleLogin} />
        </Col>
      </Row>
    </Container>
  );
}
