
import { useState } from "react";
import { Form, FormGroup, Label, Input, Button, Container, Row, Col } from "reactstrap";
import Logo from "./Logo";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement password reset logic
    setIsEmailSent(true);
  };

  if (isEmailSent) {
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
            <div className="text-center">
              <h2 className="mb-4">Check your email</h2>
              <p className="text-muted">
                We've sent a password reset link to your email address.
              </p>
              <a href="/auth/login" className="text-decoration-none text-muted">
                Back to Login
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }

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
          <Form onSubmit={handleSubmit} style={{ width: "400px" }}>
            <h2 className="mb-4">Forgot Password?</h2>
            <p className="text-muted mb-4">
              Enter your email address below to receive the password reset link
            </p>
            <FormGroup className="mb-4">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="py-2 rounded-3"
                required
              />
            </FormGroup>
            <Button
              color="warning"
              block
              className="py-2 mb-4"
              disabled={!email}
              style={{
                backgroundColor: "#FFD600",
                boxShadow: "0px 4px 4px rgba(16, 24, 40, 0.25)",
                borderRadius: "8px",
              }}
            >
              Submit
            </Button>
            <div className="text-center">
              <a href="/auth/login" className="text-decoration-none text-muted">
                Back to Login
              </a>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
