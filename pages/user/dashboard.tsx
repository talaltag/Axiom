
import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, CardBody } from 'reactstrap';
import { useRouter } from 'next/router';

export default function UserDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/auth/login');
      return;
    }

    const parsedUser = JSON.parse(userData);
    if (parsedUser.role === 'Admin') {
      router.push('/admin/dashboard');
      return;
    }

    setUser(parsedUser);
  }, []);

  if (!user) return null;

  return (
    <Container fluid className="p-4">
      <h1>Welcome, {user.name}</h1>
      <Row className="mt-4">
        <Col md={4}>
          <Card>
            <CardBody>
              <h5>My Profile</h5>
              <p>Email: {user.email}</p>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
