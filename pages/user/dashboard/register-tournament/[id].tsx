import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import UserDashboardLayout from "../../../../components/layouts/UserDashboardLayout";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import Image from "next/image";
import { Search, ArrowLeft } from "react-feather";

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
  const [teamName, setTeamName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [friends, setFriends] = useState<Friend[]>([]);
  const [teamImage, setTeamImage] = useState("");
  const [teamImageError, setTeamImageError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users");
        const data = await response.json();
        if (data.success) {
          const users = data.data.map((user: any) => ({
            id: user._id,
            name: user.name,
            avatar: user.profileImage || "/user1.png",
            status: "pending",
          }));
          setFriends(users);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);
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
      console.error("Error fetching tournament:", error);
    }
  };

  const handleSendInvite = (friendId: string) => {
    setFriends((prevFriends) =>
      prevFriends.map((friend) =>
        friend.id === friendId ? { ...friend, status: "invited" } : friend
      )
    );
  };

  const handleTeamImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTeamImage(reader.result as string);
        setTeamImageError("");
      };
      reader.onerror = () => {
        setTeamImageError("Error reading image");
      };
      reader.readAsDataURL(file);
    } else {
      setTeamImage("");
      setTeamImageError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      alert("Please agree to the terms and conditions");
      return;
    }

    const selectedFriends = friends
      .filter((f) => f.status === "invited")
      .map((f) => f.id);

    try {
      const response = await fetch("/api/tournaments/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          team_name: teamName,
          tournament_id: id,
          user_ids: [...selectedFriends], // Include current user
          payment_method: "stripe", // You can make this dynamic
          payment_token: null, // Will be added during payment
        }),
      });

      const data = await response.json();
      if (data.success) {
        router.push(`/user/dashboard/confirm/${data.data.team_id}`);
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("Failed to register for tournament");
    }
  };

  const filteredFriends = friends.filter((friend) =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <UserDashboardLayout>
      <Container fluid className="p-4">
        <div className="mb-4 d-flex align-items-center">
          <ArrowLeft
            className="cursor-pointer me-2"
            onClick={() => router.back()}
          />
          <span>Dashboard / {tournament?.name}</span>
        </div>

        <div className="tournament-header mb-5">
          <Row>
            <Col md={8}>
              <div className="d-flex align-items-start gap-4">
                <Image
                  src={tournament?.image || "/fortnite-banner.png"}
                  alt={tournament?.name || "Tournament"}
                  width={140}
                  height={140}
                  className="rounded-3"
                  style={{ objectFit: "cover" }}
                />
                <div>
                  <h1 className="h2 mb-2">
                    {tournament?.name || "Fortnite Summer Battle"}
                  </h1>
                  <p className="text-muted mb-3">
                    {tournament?.date || "May 23, 2023"}{" "}
                    {tournament?.startTime || "9:00PM"} -{" "}
                    {tournament?.endTime || "10:30PM"} EST
                  </p>
                  <div className="d-flex align-items-center gap-3">
                    <div>
                      <small className="text-muted d-block mb-1">
                        Entry Cost
                      </small>
                      <h3 className="text-danger mb-0">
                        ${tournament?.entryFee || "200"}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>

              <Card className="mt-4 border-0 shadow-sm">
                <CardBody>
                  <Form id="registrationForm" onSubmit={handleSubmit}>
                    <div className="d-flex align-items-center gap-3 mb-4">
                      <div className="position-relative">
                        <Image
                          src={teamImage || "/user1.png"}
                          alt="Team Avatar"
                          width={80}
                          height={80}
                          className="rounded-circle"
                        />
                        <label
                          className="position-absolute bottom-0 end-0 bg-warning p-2 rounded-circle d-flex align-items-center justify-content-center"
                          style={{
                            cursor: "pointer",
                            width: "32px",
                            height: "32px",
                          }}
                          htmlFor="teamImageInput"
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                            <circle cx="12" cy="13" r="4"></circle>
                          </svg>
                        </label>
                        <input
                          type="file"
                          id="teamImageInput"
                          accept="image/*"
                          className="d-none"
                          onChange={handleTeamImageChange}
                        />
                        {teamImageError && (
                          <p style={{ color: "red" }}>{teamImageError}</p>
                        )}
                      </div>
                      <div className="flex-grow-1">
                        <h5 className="mb-4">Create Team</h5>
                        <FormGroup className="mb-0">
                          <Label for="teamName">
                            Team Name <span className="text-danger">*</span>
                          </Label>
                          <Input
                            id="teamName"
                            value={teamName}
                            onChange={(e) => setTeamName(e.target.value)}
                            placeholder="Enter team name"
                            className="form-control-lg"
                            required
                          />
                        </FormGroup>
                      </div>
                    </div>

                    <h5 className="mt-5 mb-4">Invite Friends</h5>
                    <div className="mb-4">
                      <div className="search-box position-relative">
                        <Search
                          size={18}
                          className="position-absolute"
                          style={{ top: "12px", left: "12px" }}
                        />
                        <Input
                          placeholder="Search Friends"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="ps-5"
                        />
                      </div>
                    </div>

                    {filteredFriends.map((friend) => (
                      <div
                        key={friend.id}
                        className="d-flex align-items-center justify-content-between mb-3 p-2"
                      >
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
                          outline={friend.status === "invited"}
                          onClick={() => handleSendInvite(friend.id)}
                          disabled={friend.status === "invited"}
                        >
                          {friend.status === "invited"
                            ? "Sent Invite"
                            : "Send Invite"}
                        </Button>
                      </div>
                    ))}

                    <div className="mt-5">
                      <h5 className="mb-4">Terms & Conditions</h5>
                      <ul className="ps-3">
                        <li className="mb-2">
                          The Tournament entry fee deduction and winning payment
                          distribution shall be made equally among the
                          respective team members
                        </li>
                        <li className="mb-2">
                          Your invited team member will received an email to
                          confirm their registration and participation for this
                          tournament
                        </li>
                        <li className="mb-2">
                          Once all team members have confirmed their
                          registration, the entry fee will be automatically
                          deducted from their linked active wallet.
                        </li>
                        <li className="mb-2">
                          You can find your overall team registration status in
                          Tournaments section
                        </li>
                      </ul>
                      <FormGroup check className="mt-3">
                        <Input
                          type="checkbox"
                          checked={agreed}
                          onChange={(e) => setAgreed(e.target.checked)}
                        />
                        <Label check>
                          I have read Terms and Conditions and agree
                        </Label>
                      </FormGroup>
                    </div>
                  </Form>
                </CardBody>
              </Card>
              <div className="fixed-bottom bg-white py-3 shadow-lg">
                <Container>
                  <div className="d-flex justify-content-end gap-3">
                    <Button
                      color="secondary"
                      onClick={() => router.push("/user/dashboard/tournaments")}
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      form="registrationForm"
                      color="warning"
                    >
                      Register
                    </Button>
                  </div>
                </Container>
              </div>
            </Col>

            <Col md={4}>
              <Card className="border-0 shadow-sm">
                <CardBody>
                  <div className="mb-3">
                    <div
                      className="text-success d-inline-block px-2 py-1 rounded"
                      style={{ backgroundColor: "#E8F5E9" }}
                    >
                      New
                    </div>
                  </div>
                  <div className="mb-3">
                    <small className="text-muted d-block">Entry Cost</small>
                    <h4 className="mb-0">${tournament?.entryFee || 25}</h4>
                  </div>
                  <div className="mb-3 pb-3 border-bottom">
                    <small className="text-muted d-block">Prize</small>
                    <h4 className="text-danger mb-0">
                      ${tournament?.totalPrizePool || 200}
                    </h4>
                  </div>
                  <div className="mb-3 pb-3 border-bottom">
                    <small className="text-muted d-block">Platform</small>
                    <div>{tournament?.platform || "XBOX"}</div>
                  </div>
                  <div className="mb-3 pb-3 border-bottom">
                    <small className="text-muted d-block">
                      Tournament Type
                    </small>
                    <div>{tournament?.type || "KILL RACE"}</div>
                  </div>
                  <div className="mb-3 pb-3 border-bottom">
                    <small className="text-muted d-block">
                      Tournament Size
                    </small>
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
                    <span>${tournament?.totalPrizePool * 0.5 || 775}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>2nd Winner Prize</span>
                    <span>${tournament?.totalPrizePool * 0.3 || 775}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-4">
                    <span>3rd Winner Prize</span>
                    <span>${tournament?.totalPrizePool * 0.2 || 775}</span>
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
