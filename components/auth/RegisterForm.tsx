import { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { Eye, EyeOff } from "react-feather";
import Link from "next/link";

interface RegisterFormProps {
  onSubmit: (
    email: string,
    password: string,
    name: string,
    userName: string
  ) => void;
  isLoading?: boolean;
}

const Loader = () => (
  <span style={{ marginLeft: "8px" }}>&nbsp;Loading...</span>
);

export default function RegisterForm({
  onSubmit,
  isLoading = false,
}: RegisterFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password, name, userName);
  };

  return (
    <Form onSubmit={handleSubmit} style={{ width: "400px" }}>
      <FormGroup className="mb-4">
        <Label for="name" className="mb-2 text-muted">
          Name
        </Label>
        <Input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="John Doe"
          className="py-2 rounded-3"
          required
        />
      </FormGroup>
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
      <FormGroup className="mb-4">
        <Label for="username" className="mb-2 text-muted">
          Username
        </Label>
        <Input
          type="text"
          id="username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="john"
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
          className="position-absolute end-0 top-50 border-0 p-0 me-2"
          onClick={() => setShowPassword(!showPassword)}
          style={{
            color: "#6C757D",
            transform: "translateY(-50%)",
            marginTop: "14px !important",
          }}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </Button>
      </FormGroup>
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
        {isLoading ? <Loader /> : "Register"}
      </Button>
      <div className="flex-grow-1"></div>
      <div className="text-center mt-auto">
        <span className="text-muted" style={{ fontSize: "14px" }}>
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="text-decoration-none text-muted fw-bold"
          >
            Login
          </Link>
        </span>
      </div>
    </Form>
  );
}
