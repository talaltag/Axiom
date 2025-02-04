
import { useState } from "react";
import { Form, FormGroup, Label, Input, Button, Container, Row, Col } from "reactstrap";
import Logo from "./Logo";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState(["", "", "", "", "", ""]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [countdown, setCountdown] = useState(45);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isVerifying && countdown > 0) {
      timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            setCanResend(true);
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isVerifying, countdown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsEmailSent(true);
    setIsVerifying(true);
    setCountdown(45);
    setCanResend(false);
  };

  const handleVerifyCode = async () => {
    const code = verificationCode.join("");
    if (code.length === 6) {
      // Add your verification logic here
      console.log("Verifying code:", code);
      // Navigate to set new password screen on successful verification
      setIsVerifying(false);
    }
  };

  const handleResendCode = () => {
    if (canResend) {
      setCountdown(45);
      setCanResend(false);
      // Add your resend code logic here
    }
  };

  const handleVerificationCodeChange = (index: number, value: string) => {
    if (value.length <= 1 && !isNaN(Number(value))) {
      const newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);

      // Move to next input
      if (value !== "" && index < 5) {
        const nextInput = document.getElementById(`code-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleVerifyCode = () => {
    // Handle verification logic here
    setIsVerifying(false);
  };

  const renderVerificationScreen = () => (
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
          <div className="text-center" style={{ width: "400px" }}>
            <h2 className="mb-4">Check Your Email</h2>
            <p className="text-muted mb-4">
              We've sent you a code<br />
              The code was sent to {email}
            </p>
            <div className="d-flex justify-content-center gap-2 mb-4">
              {verificationCode.map((digit, index) => (
                <Input
                  key={index}
                  id={`code-${index}`}
                  type="text"
                  value={digit}
                  onChange={(e) => handleVerificationCodeChange(index, e.target.value)}
                  maxLength={1}
                  style={{
                    width: "40px",
                    height: "40px",
                    textAlign: "center",
                    fontSize: "20px",
                    padding: "0",
                  }}
                />
              ))}
            </div>
            <p className="text-muted mb-4">
              {canResend ? (
                <span
                  onClick={handleResendCode}
                  style={{ cursor: "pointer", textDecoration: "underline" }}
                >
                  Resend code
                </span>
              ) : (
                `Resend code in ${String(Math.floor(countdown / 60)).padStart(2, '0')}:${String(countdown % 60).padStart(2, '0')}`
              )}
            </p>
            <Button
              color="warning"
              block
              className="py-2 mb-4"
              onClick={handleVerifyCode}
              disabled={verificationCode.some(digit => digit === "")}
              style={{
                backgroundColor: "#FFD600",
                borderRadius: "8px",
                borderColor: "#FFD600"
              }}
            >
              Verify Code
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );

  if (isVerifying) {
    return renderVerificationScreen();
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
                style={{ 
                  border: "1px solid #D0D5DD",
                  outline: "none",
                  boxShadow: "none"
                }}
                required
              />
            </FormGroup>
            <Button
              color="warning"
              block
              className="py-2 mb-4"
              disabled={!email}
              style={{
                backgroundColor: !email ? "rgba(16, 24, 40, 0.25)" : "#FFD600",
                borderRadius: "8px",
                borderColor: !email ? "rgba(16, 24, 40, 0.25)" : "#FFD600",
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
