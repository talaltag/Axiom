
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import UserDashboardLayout from "../../../../../components/layouts/UserDashboardLayout";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Form,
  Button,
  Alert,
} from "reactstrap";

export default function ConfirmRegistration() {
  const router = useRouter();
  const { tournament_id, team_id } = router.query;
  const [registration, setRegistration] = useState<any>(null);
  const [tournament, setTournament] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (tournament_id && team_id) {
      fetchRegistrationDetails();
    }
  }, [tournament_id, team_id]);

  const fetchRegistrationDetails = async () => {
    try {
      const response = await fetch(`/api/tournaments/registration/${team_id}`);
      const data = await response.json();
      if (data.success) {
        setRegistration(data.data.registration);
        setTournament(data.data.tournament);
      }
    } catch (error) {
      setError("Error fetching registration details");
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    // Implement payment logic here
    try {
      const response = await fetch(`/api/tournaments/registration/${team_id}/pay`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ /* payment details */ })
      });
      const data = await response.json();
      if (data.success) {
        router.push('/user/dashboard/tournaments');
      }
    } catch (error) {
      setError("Payment failed");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <Alert color="danger">{error}</Alert>;

  return (
    <UserDashboardLayout>
      <Container fluid className="p-4">
        <Card>
          <CardBody>
            <h4>Tournament Registration Confirmation</h4>
            {registration?.paymentStatus === 'completed' ? (
              <div>
                <Alert color="success">
                  Payment completed. You are registered for the tournament.
                </Alert>
                {/* Display registration details */}
              </div>
            ) : (
              <Form onSubmit={handlePayment}>
                {/* Add payment form fields here */}
                <Button color="warning" type="submit">
                  Complete Payment
                </Button>
              </Form>
            )}
          </CardBody>
        </Card>
      </Container>
    </UserDashboardLayout>
  );
}
