import { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { Eye, EyeOff } from "react-feather";

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
  isLoading?: boolean;
}

const Loader = () => (
  <span style={{ marginLeft: "8px" }}>&nbsp;Loading...</span>
);

export default function LoginForm({
  onSubmit,
  isLoading = false,
}: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <Form onSubmit={handleSubmit} style={{ width: "400px" }}>
      <FormGroup className="mb-4">
        <Label for="email" className="mb-2 text-muted">
          Email
        </Label>
        <Input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Shawn@axiom.com"
          className="py-2 rounded-3"
          required
        />
      </FormGroup>
      <FormGroup className="mb-2 position-relative">
        <Label for="password" className="mb-2 text-muted">
          Password
        </Label>
        <div className="position-relative">
          <Input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="py-2 rounded-3"
            required
          />
          <div className="position-absolute" style={{ 
            right: "10px", 
            top: "50%", 
            transform: "translateY(-50%)",
            zIndex: 1000
          }}>
            <div className="tooltip-container">
              <Button
                type="button"
                color="link"
                className="p-0 border-0"
                onClick={() => setShowPassword(!showPassword)}
                style={{ color: "#6C757D" }}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </Button>
              <div className="password-requirements p-3 bg-white rounded shadow" style={{
                position: "absolute",
                right: "30px",
                top: "-20px",
                width: "220px",
                display: "none",
                border: "1px solid #ddd"
              }}>
                <p className="mb-2" style={{ fontSize: "12px" }}>Password must meet the following requirements:</p>
                <ul className="list-unstyled m-0" style={{ fontSize: "12px" }}>
                  <li className="mb-1 d-flex align-items-center">
                    <span className="me-2" style={{ color: "#12B76A" }}>✓</span> At least 8 characters
                  </li>
                  <li className="mb-1 d-flex align-items-center">
                    <span className="me-2" style={{ color: "#12B76A" }}>✓</span> Must be upper case
                  </li>
                  <li className="mb-1 d-flex align-items-center">
                    <span className="me-2" style={{ color: "#12B76A" }}>✓</span> At least one symbol
                  </li>
                  <li className="d-flex align-items-center">
                    <span className="me-2" style={{ color: "#12B76A" }}>✓</span> At least one number
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <Button
          type="button"
          color="link"
          className="position-absolute end-0 top-50 translate-middle-y border-0 p-0 me-2"
          onClick={() => setShowPassword(!showPassword)}
          style={{ color: "#6C757D", transform: "translateY(-50%)", marginTop: "14px !important" }}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </Button>
      </FormGroup>
      <div className="d-flex justify-content-end mb-4">
        <a
          href="/auth/forgot-password"
          className="text-decoration-none text-muted"
          style={{ fontSize: "14px" }}
        >
          Forgot password?
        </a>
      </div>
      <Button
        color="warning"
        block
        className="py-2 mb-4"
        style={{
          backgroundColor: "#FFD600",
          boxShadow: "0px 4px 4px rgba(16, 24, 40, 0.25)",
          borderRadius: "8px",
        }}
        disabled={isLoading}
      >
        Login {isLoading && <Loader />}
      </Button>
      <div className="flex-grow-1"></div>
      <div className="text-center mt-auto">
        <span className="text-muted" style={{ fontSize: "14px" }}>
          Don't have an account?{" "}
          <a href="#" className="text-decoration-none text-muted fw-bold">
            Get Started
          </a>
        </span>
      </div>
    </Form>
  );
}