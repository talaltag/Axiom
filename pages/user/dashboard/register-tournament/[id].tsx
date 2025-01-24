
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import UserDashboardLayout from '../../../../components/layouts/UserDashboardLayout';
import { Container, Row, Col, Card, CardBody, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import Image from 'next/image';

export default function TournamentRegistration() {
  const router = useRouter();
  const { id } = router.query;
  const [tournament, setTournament] = useState(null);
  const [teamName, setTeamName] = useState('');
  const [teamMembers, setTeamMembers] = useState(['', '', '']);
  const [isLoading, setIsLoading] = useState(true);
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    if (id) {
      fetchTournamentDetails();
    }
  }, [id]);

  const fetchTournamentDetails = async () => {
    try {
      const response = await fetch(`/api/tournaments/${id}`);
      const data = await response.json();
      if (data.success) {
        setTournament(data.data);
      }
    } catch (error) {
      console.error('Error fetching tournament:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreed) {
      alert('Please agree to the terms and conditions');
      return;
    }
    // Add registration logic here
  };

  return (
    <UserDashboardLayout>
      <Container fluid className="p-4">
        <Card className="border-0 shadow-sm">
          <CardBody>
            <div className="d-flex align-items-center mb-4">
              <div>
                <h4 className="mb-1">Tournament Registration</h4>
                <p className="text-muted mb-0">{tournament?.name}</p>
              </div>
            </div>
            
            <Row>
              <Col md={8}>
                <Form onSubmit={handleSubmit}>
                  <Card className="mb-4">
                    <CardBody>
                      <h5 className="mb-3">Team Information</h5>
                      <FormGroup>
                        <Label for="teamName">Team Name</Label>
                        <Input
                          id="teamName"
                          value={teamName}
                          onChange={(e) => setTeamName(e.target.value)}
                          placeholder="Enter your team name"
                          required
                        />
                      </FormGroup>
                      
                      <h6 className="mt-4 mb-3">Invite Team Members</h6>
                      {teamMembers.map((member, index) => (
                        <FormGroup key={index}>
                          <Label>Team Member {index + 1}</Label>
                          <Input
                            value={member}
                            onChange={(e) => {
                              const newMembers = [...teamMembers];
                              newMembers[index] = e.target.value;
                              setTeamMembers(newMembers);
                            }}
                            placeholder="Enter email address"
                          />
                        </FormGroup>
                      ))}
                    </CardBody>
                  </Card>

                  <Card className="mb-4">
                    <CardBody>
                      <h5 className="mb-3">Terms & Conditions</h5>
                      <div className="mb-3">
                        <ul className="mb-4">
                          <li>The Tournament entry fee deduction and winning payment distribution shall be made equally among the respective team members</li>
                          <li>Your invited team member will received an email to confirm their registration and participation for this tournament</li>
                          <li>Once all team members have confirmed their registration, the entry fee will be automatically deducted from their linked active wallet.</li>
                          <li>You can find your overall team registration status in Tournaments section</li>
                        </ul>
                        <FormGroup check>
                          <Input
                            type="checkbox"
                            checked={agreed}
                            onChange={(e) => setAgreed(e.target.checked)}
                          />
                          <Label check>I have read Terms and Conditions and agree</Label>
                        </FormGroup>
                      </div>
                    </CardBody>
                  </Card>

                  <div className="d-flex gap-2">
                    <Button color="secondary" onClick={() => router.back()}>Back</Button>
                    <Button color="warning" type="submit">Register</Button>
                  </div>
                </Form>
              </Col>

              <Col md={4}>
                <Card className="mb-4">
                  <CardBody>
                    <h5 className="mb-3">Tournament Details</h5>
                    <div className="mb-4">
                      <Image
                        src={`/game-${tournament?.game?.toLowerCase() || 'default'}.jpg`}
                        alt={tournament?.game || 'Game'}
                        width={400}
                        height={200}
                        className="rounded"
                        style={{ width: '100%', height: 'auto' }}
                      />
                    </div>
                    <div className="mb-3 pb-3 border-bottom">
                      <small className="text-muted d-block">Entry Cost</small>
                      <div className="h5 mb-0">${tournament?.entryFee}</div>
                    </div>
                    <div className="mb-3 pb-3 border-bottom">
                      <small className="text-muted d-block">Prize</small>
                      <div className="h5 mb-0">${tournament?.totalPrizePool}</div>
                    </div>
                    <div className="mb-3 pb-3 border-bottom">
                      <small className="text-muted d-block">Platform</small>
                      <div>{tournament?.platform}</div>
                    </div>
                    <div className="mb-3 pb-3 border-bottom">
                      <small className="text-muted d-block">Tournament Type</small>
                      <div>{tournament?.type}</div>
                    </div>
                    <div className="mb-3">
                      <small className="text-muted d-block">Team Size</small>
                      <div>{tournament?.teamSize}</div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Container>
    </UserDashboardLayout>
  );
}
