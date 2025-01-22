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
        <Col md={5} className="d-flex flex-column justify-content-between bg-white p-5 rounded-end-5">
          <div className="text-center">
            <h1 className="display-6 fw-bold mb-5">Welcome to</h1>
            <Logo />
          </div>
          <div className="text-center text-muted">
            © 2024 Axiom
          </div>
        </Col>
        <Col md={7} className="d-flex justify-content-center align-items-center" 
          style={{
            background: 'linear-gradient(45deg, rgba(128,128,128,0.1), rgba(128,128,128,0.3))',
            backdropFilter: 'blur(10px)'
          }}>
          <LoginForm onSubmit={handleLogin} />
        </Col>
      </Row>
    </Container>
  );
}