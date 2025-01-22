import { Container, Row, Col } from 'reactstrap';
import { useRouter } from 'next/router';
import LoginForm from '../../components/auth/LoginForm';
import Logo from '../../components/auth/Logo';

const ADMIN_CREDENTIALS = {
  email: 'admin@axiom.com',
  password: 'admin123'
};

export default function Login() {
  const router = useRouter();

  const handleLogin = (email: string, password: string) => {
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      localStorage.setItem('adminAuth', 'true');
      router.push('/admin/dashboard');
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <Container fluid className="min-vh-100">
      <Row className="h-100">
        <Col md={6} className="d-flex flex-column justify-content-center align-items-center bg-white p-4">
          <div className="text-center mb-4">
            <h1 className="h3 fw-bold">Welcome to</h1>
            <Logo />
          </div>
          <div className="position-absolute bottom-0 mb-3 text-muted">
            © 2024 Axiom
          </div>
        </Col>
        <Col md={6} className="d-flex justify-content-center align-items-center bg-light p-4">
          <LoginForm onSubmit={handleLogin} />
        </Col>
      </Row>
    </Container>
  );
}