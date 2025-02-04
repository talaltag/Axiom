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
        <Input
          type={showPassword ? "text" : "password"}
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="py-2 rounded-3"
          required
        />
        <Button
          type="button"
          color="link"
          className="position-absolute end-0 top-50 translate-middle-y border-0 p-0 me-2"
          onClick={() => setShowPassword(!showPassword)}
          style={{ color: "#6C757D", transform: "translateY(-50%)" }}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </Button>
      </FormGroup>
      <div className="d-flex justify-content-end mb-4">
        <a
          href="#"
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