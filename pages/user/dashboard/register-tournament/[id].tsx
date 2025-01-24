
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import UserDashboardLayout from '../../../../components/layouts/UserDashboardLayout';
import { Container, Row, Col, Card, CardBody, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import Image from 'next/image';
import { Search, ArrowLeft } from 'react-feather';

interface Friend {
  id: string;
  name: string;
  avatar: string;
  status: string;
}

export default function TournamentRegistration() {
  const router = useRouter();
  const { id } = router.query;
  const [tournament, setTournament] = useState<any>(null);
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

  const handleSubmit = async (e: React.FormEvent) => {
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
        <div className="mb-4 d-flex align-items-center">
          <ArrowLeft className="cursor-pointer me-2" onClick={() => router.back()} />
          <span>Dashboard / {tournament?.name}</span>
        </div>

        <div className="tournament-header mb-4">
          <Row>
            <Col md={8}>
              <div className="d-flex">
                <Image
                  src={tournament?.image || '/game-default.jpg'}
                  alt={tournament?.name || 'Tournament'}
                  width={150}
                  height={150}
                  className="rounded me-4"
                />
                <div>
                  <h2 className="mb-2">{tournament?.name}</h2>
                  <p className="text-muted">
                    {tournament?.startDate} {tournament?.startTime} - {tournament?.endTime} EST
                  </p>
                  <div className="mt-2">
                    <span className="text-danger h4">${tournament?.entryFee}</span>
                  </div>
                </div>
              </div>

              <Card className="mt-4 border-0 shadow-sm">
                <CardBody>
                  <Form>
                    <h5 className="mb-4">Create Team</h5>
                    <FormGroup>
                      <Label for="teamName">Team Name <span className="text-danger">*</span></Label>
                      <Input
                        id="teamName"
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                        placeholder="Enter your team name"
                        required
                      />
                    </FormGroup>

                    <h5 className="mt-5 mb-4">Invite Friends</h5>
                    <div className="mb-4">
                      <div className="search-box position-relative">
                        <Search size={18} className="position-absolute" style={{ top: '12px', left: '12px' }} />
                        <Input
                          placeholder="Search Friends"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="ps-5"
                        />
                      </div>
                    </div>

                    {filteredFriends.map((friend) => (
                      <div key={friend.id} className="d-flex align-items-center justify-content-between mb-3 p-2">
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

                    <div className="mt-5">
                      <h5 className="mb-4">Terms & Conditions</h5>
                      <ul className="ps-3">
                        <li className="mb-2">The Tournament entry fee deduction and winning payment distribution shall be made equally among the respective team members</li>
                        <li className="mb-2">Your invited team member will received an email to confirm their registration and participation for this tournament</li>
                        <li className="mb-2">Once all team members have confirmed their registration, the entry fee will be automatically deducted from their linked active wallet.</li>
                        <li className="mb-2">You can find your overall team registration status in Tournaments section</li>
                      </ul>
                      <FormGroup check className="mt-3">
                        <Input
                          type="checkbox"
                          checked={agreed}
                          onChange={(e) => setAgreed(e.target.checked)}
                        />
                        <Label check>I have read Terms and Conditions and agree</Label>
                      </FormGroup>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="border-0 shadow-sm">
                <CardBody>
                  <div className="mb-3">
                    <div className="text-success d-inline-block px-2 py-1 rounded" style={{ backgroundColor: '#E8F5E9' }}>New</div>
                  </div>
                  <div className="mb-3">
                    <small className="text-muted d-block">Prize</small>
                    <h4 className="mb-0">${tournament?.totalPrize || 500}</h4>
                  </div>
                  <div className="mb-3 pb-3 border-bottom">
                    <small className="text-muted d-block">Entry Fee</small>
                    <h4 className="mb-0">${tournament?.entryFee || 25}</h4>
                  </div>
                  <div className="mb-3 pb-3 border-bottom">
                    <small className="text-muted d-block">Platform</small>
                    <div>{tournament?.platform || 'XBOX'}</div>
                  </div>
                  <div className="mb-3 pb-3 border-bottom">
                    <small className="text-muted d-block">Tournament Type</small>
                    <div>{tournament?.type || 'KILL RACE'}</div>
                  </div>
                  <div className="mb-3 pb-3 border-bottom">
                    <small className="text-muted d-block">Tournament Size</small>
                    <div>0 of 64 teams</div>
                  </div>
                  <div className="mb-3 pb-3 border-bottom">
                    <small className="text-muted d-block">Team Size</small>
                    <div>Quad</div>
                  </div>
                  <div className="mb-3 pb-3 border-bottom">
                    <small className="text-muted d-block">Country</small>
                    <div>USA</div>
                  </div>
                  <div className="mb-3 pb-3 border-bottom">
                    <small className="text-muted d-block">Game</small>
                    <div>Call of Duty</div>
                  </div>
                  <div className="mb-4">
                    <small className="text-muted d-block">Game Mode</small>
                    <div>Battle Royale</div>
                  </div>

                  <h6 className="mb-3">Prizes</h6>
                  <div className="d-flex justify-content-between mb-2">
                    <span>1st Winner Prize</span>
                    <span>${tournament?.firstPrize || 776}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>2nd Winner Prize</span>
                    <span>${tournament?.secondPrize || 776}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-4">
                    <span>3rd Winner Prize</span>
                    <span>${tournament?.thirdPrize || 776}</span>
                  </div>

                  <Button color="warning" block size="lg">
                    Register
                  </Button>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
    </UserDashboardLayout>
  );
}
