
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import UserDashboardLayout from '../../../../components/layouts/UserDashboardLayout';
import { Container, Row, Col, Card, CardBody, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import Image from 'next/image';
import { Search } from 'react-feather';

interface Friend {
  id: string;
  name: string;
  avatar: string;
  status: string;
}

export default function TournamentRegistration() {
  const router = useRouter();
  const { id } = router.query;
  const [tournament, setTournament] = useState(null);
  const [teamName, setTeamName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [friends, setFriends] = useState<Friend[]>([
    { id: '1', name: 'Vernon Miller', avatar: '/user1.png', status: 'pending' },
    { id: '2', name: 'Helen Chuang', avatar: '/user1.png', status: 'pending' },
    { id: '3', name: 'Winifred Groton', avatar: '/user1.png', status: 'pending' },
    { id: '4', name: 'Alice LeBeau', avatar: '/user1.png', status: 'pending' }
  ]);
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
    }
  };

  const handleSendInvite = (friendId: string) => {
    setFriends(prevFriends =>
      prevFriends.map(friend =>
        friend.id === friendId
          ? { ...friend, status: 'invited' }
          : friend
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreed) {
      alert('Please agree to the terms and conditions');
      return;
    }
    // Add registration logic here
  };

  const filteredFriends = friends.filter(friend =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <UserDashboardLayout>
      <Container fluid className="p-4">
        <Card className="border-0 shadow-sm">
          <CardBody>
            <div className="tournament-header mb-4">
              <div className="d-flex align-items-start">
                <div className="tournament-image me-4">
                  <Image
                    src={tournament?.image || '/game-default.jpg'}
                    alt={tournament?.name}
                    width={150}
                    height={150}
                    className="rounded"
                  />
                </div>
                <div className="tournament-info flex-grow-1">
                  <h2 className="mb-2">{tournament?.name}</h2>
                  <p className="text-muted mb-2">
                    {new Date(tournament?.startDate).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })} {tournament?.startTime} - {tournament?.endTime} {tournament?.timeZone}
                  </p>
                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <div>
                      <small className="text-muted d-block">Entry Cost</small>
                      <h3 className="text-danger mb-0">${tournament?.entryFee}</h3>
                    </div>
                  </div>
                </div>
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

                      <h5 className="mt-4 mb-3">Invite Friends</h5>
                      <FormGroup className="mb-4">
                        <div className="position-relative">
                          <Input
                            placeholder="Search Friends"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-4"
                          />
                          <Search size={18} className="position-absolute" style={{ top: '12px', left: '12px' }} />
                        </div>
                      </FormGroup>

                      {filteredFriends.map((friend) => (
                        <div key={friend.id} className="d-flex align-items-center justify-content-between mb-3">
                          <div className="d-flex align-items-center">
                            <Image
                              src={friend.avatar}
                              alt={friend.name}
                              width={40}
                              height={40}
                              className="rounded-circle"
                            />
                            <div className="ms-3">
                              <div>{friend.name}</div>
                              <small className="text-muted">Member</small>
                            </div>
                          </div>
                          <Button
                            color="warning"
                            size="sm"
                            outline={friend.status === 'invited'}
                            onClick={() => handleSendInvite(friend.id)}
                            disabled={friend.status === 'invited'}
                          >
                            {friend.status === 'invited' ? 'Sent Invite' : 'Send Invite'}
                          </Button>
                        </div>
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
                </Form>
                <div className="fixed-bottom p-3 bg-white border-top" style={{ zIndex: 1030 }}>
                  <Container>
                    <div className="d-flex justify-content-end">
                      <Button color="warning" size="lg" onClick={handleSubmit}>
                        Register Now
                      </Button>
                    </div>
                  </Container>
                </div>
              </Col>

              <Col md={4}>
                <Card className="mb-4">
                  <CardBody>
                    <h5 className="mb-3">Tournament Details</h5>
                    <div className="mb-4">
                      <Image
                        src={tournament?.image || '/game-default.jpg'}
                        alt={tournament?.name}
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
                    <div className="mb-3">
                      <h6 className="mb-3">Prizes</h6>
                      <div className="mb-2 d-flex justify-content-between">
                        <span>1st Winner Prize</span>
                        <span>${tournament?.firstPrize || 776}</span>
                      </div>
                      <div className="mb-2 d-flex justify-content-between">
                        <span>2nd Winner Prize</span>
                        <span>${tournament?.secondPrize || 776}</span>
                      </div>
                      <div className="mb-2 d-flex justify-content-between">
                        <span>3rd Winner Prize</span>
                        <span>${tournament?.thirdPrize || 776}</span>
                      </div>
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
