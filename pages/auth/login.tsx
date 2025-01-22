
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
        <Col md={5} className="d-flex flex-column bg-white p-5" style={{ height: '100vh', maxWidth: '580px', borderTopRightRadius: '100px', borderBottomRightRadius: '100px' }}>
          <div className="text-center mt-4">
            <h1 className="display-6 fw-bold">Welcome to</h1>
          </div>
          <div className="flex-grow-1 d-flex align-items-center justify-content-center">
            <Logo />
          </div>
          <div className="text-center text-muted mb-4">
            © 2024 Axiom
          </div>
        </Col>
        <Col md={7} className="d-flex justify-content-center align-items-center" 
          style={{
            height: '100vh',
            backgroundImage: 'url(/login-bg.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}>
          <LoginForm onSubmit={handleLogin} />
        </Col>
      </Row>
    </Container>
  );
}
