
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import UserDashboardLayout from "../../../../components/layouts/UserDashboardLayout";
import { Container, Row, Col, Card, CardBody, Form, Button, Alert } from "reactstrap";

export default function ConfirmRegistration() {
  const router = useRouter();
  const { team_id } = router.query;
  const [team, setTeam] = useState<any>(null);
  const [tournament, setTournament] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (team_id) {
      fetchTeamDetails();
    }
  }, [team_id]);

  const fetchTeamDetails = async () => {
    try {
      const response = await fetch(`/api/teams/${team_id}`);
      const data = await response.json();
      if (data.success) {
        setTeam(data.data.team);
        setTournament(data.data.tournament);
      }
    } catch (error) {
      setError("Error fetching team details");
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/teams/${team_id}/pay`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
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
            {team?.paymentStatus === 'completed' ? (
              <div>
                <Alert color="success">
                  Payment completed. You are registered for the tournament.
                </Alert>
                <div>
                  <h5>Team Details</h5>
                  <p>Team Name: {team?.name}</p>
                  <p>Tournament: {tournament?.name}</p>
                  <p>Entry Fee: ${tournament?.entryFee}</p>
                </div>
              </div>
            ) : (
              <Form onSubmit={handlePayment}>
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
