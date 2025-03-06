import { useState, useEffect } from "react";
import { Container, Row, Col, Alert } from "reactstrap";
import { useRouter } from "next/router";
import Logo from "../../components/auth/Logo";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { useSession } from "next-auth/react";
import RegisterForm from "../../components/auth/RegisterForm";

export default function Register() {
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

  const handleSubmit = async (
    email: string,
    password: string,
    name: string,
    userName: string
  ) => {
    setError("");
    setLoading(true);
    const response = await fetch(`/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        name,
        cName: userName,
        role: "User",
      }),
    });

    const data = await response.json();

    setLoading(false);

    if (data.success) {
      router.push("/auth/login");
    } else {
      setError(data.message);
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
          <div>
            {error && (
              <Alert color="danger" className="mb-3">
                {error}
              </Alert>
            )}
            <RegisterForm onSubmit={handleSubmit} isLoading={isLoading} />
          </div>
        </Col>
      </Row>
    </Container>
  );
}
