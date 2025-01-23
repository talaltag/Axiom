import { useEffect, useState } from "react";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

export default function UserDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userCookie = Cookies.get("user");
    if (!userCookie) {
      router.push("/auth/login");
      return;
    }

    try {
      const parsedUser = JSON.parse(userCookie);
      setUser(parsedUser);
    } catch (error) {
      router.push("/auth/login");
    }
  }, [router]);

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
