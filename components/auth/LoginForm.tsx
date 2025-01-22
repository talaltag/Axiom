import { useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { Eye, EyeOff } from 'react-feather';

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
}

export default function LoginForm({ onSubmit }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <Form onSubmit={handleSubmit} className="w-100 max-w-400">
      <FormGroup>
        <Label for="email">Email</Label>
        <Input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
      </FormGroup>
      <FormGroup className="position-relative">
        <Label for="password">Password</Label>
        <Input
          type={showPassword ? 'text' : 'password'}
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
        />
        <Button
          type="button"
          color="link"
          className="position-absolute end-0 top-50 translate-middle-y border-0"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </Button>
      </FormGroup>
      <Button color="primary" block className="mt-4">
        Sign In
      </Button>
    </Form>
  );
}