import { useState } from "react";
import { Container, Row, Col, Alert } from "reactstrap";
import { useRouter } from "next/router";
import LoginForm from "../../components/auth/LoginForm";
import Logo from "../../components/auth/Logo";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/authSlice";
import type { AppDispatch, RootState } from "../../store/store";

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { error, isLoading } = useSelector((state: RootState) => state.auth);

  const handleLogin = async (email: string, password: string) => {
    try {
      const resultAction = await dispatch(loginUser({ email, password }));
      if (loginUser.fulfilled.match(resultAction)) {
        const { user } = resultAction.payload;
        if (user.role === "admin") {
          router.push("/admin/dashboard");
        } else {
          router.push("/user/dashboard");
        }
      }
    } catch (err) {
      console.error("Login failed:", err);
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
          <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
        </Col>
      </Row>
    </Container>
  );
}