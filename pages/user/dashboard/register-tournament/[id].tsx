import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import UserDashboardLayout from "../../../../components/layouts/UserDashboardLayout";
import { Container, Row, Col, Input, Button, Form } from "reactstrap";
import Image from "next/image";
import { Search, ArrowLeft, Bell } from "react-feather";

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
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    if (id) {
      fetchTournamentDetails();
    }
  }, [id]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users/me/friends");
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
          user_ids: [...selectedFriends],
          payment_method: "stripe",
          payment_token: null,
        }),
      });

      const data = await response.json();
      if (data.success) {
        router.push(`/user/dashboard/confirm/${data.data.registration_id}`);
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
      <Container fluid>
        <div className="d-flex justify-content-between align-items-center py-2 px-4 border-bottom">
          <div className="d-flex align-items-center gap-2">
            <ArrowLeft
              className="cursor-pointer"
              size={20}
              onClick={() => router.back()}
            />
            <span style={{ color: "#667085", fontSize: "14px" }}>
              Dashboard{" "}
              {tournament?.name && (
                <>
                  / <span className="text-dark">{tournament.name}</span>
                </>
              )}
            </span>
          </div>
          <div className="d-flex align-items-center gap-3">
            <Button color="link" className="p-0 position-relative">
              <Bell size={20} className="text-muted" />
              <Badge color="danger" pill className="position-absolute top-0 end-0" style={{ width: "8px", height: "8px", padding: 0 }} />
            </Button>
            <Image
              src="/user1.png" 
              alt="Profile"
              width={32}
              height={32}
              className="rounded-circle"
            />
          </div>
        </div>

        <Row>
          <Col md={8}>
            <div className="d-flex gap-3 mb-4">
              <Image
                src={tournament?.images?.[0] || "/fortnite-banner.png"}
                alt="Tournament"
                width={180}
                height={180}
                className="rounded-3"
                style={{ objectFit: "cover" }}
              />
              <div>
                <h2>Fortnite Summer Battle</h2>
                <p className="text-muted">
                  May 23, 2023 9:00PM - 10:30PM EST
                </p>
                <div className="d-flex align-items-center gap-3">
                  <div>
                    <small className="text-muted d-block">Entry Cost</small>
                    <h3 className="text-danger mb-0">$200</h3>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-5">
              <h5 className="mb-3">Create Team</h5>
              <div className="d-flex align-items-center gap-3 mb-4">
                <Image
                  src="/user1.png"
                  alt="Team Avatar"
                  width={48}
                  height={48}
                  className="rounded-circle"
                />
                <div className="flex-grow-1">
                  <div className="mb-1">Team Name *</div>
                  <Input
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    placeholder="Team Name"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="mb-5">
              <h5 className="mb-3">Invite Friends</h5>
              <div className="position-relative mb-4">
                <Search
                  size={20}
                  className="position-absolute"
                  style={{ top: "10px", left: "12px", color: "#667085" }}
                />
                <Input
                  placeholder="Search Friends"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="ps-5"
                />
              </div>

              {filteredFriends.map((friend) => (
                <div
                  key={friend.id}
                  className="d-flex align-items-center justify-content-between mb-3"
                >
                  <div className="d-flex align-items-center">
                    <Image
                      src={friend.avatar}
                      alt={friend.name}
                      width={40}
                      height={40}
                      className="rounded-circle me-3"
                    />
                    <div>
                      <div>{friend.name}</div>
                      <small className="text-muted">Member</small>
                    </div>
                  </div>
                  <Button
                    color="warning"
                    size="sm"
                    onClick={() => handleSendInvite(friend.id)}
                    disabled={friend.status === "invited"}
                    style={{
                      backgroundColor: friend.status === "invited" ? "#FFF" : "#FFD600",
                      border: "1px solid #FFD600",
                      color: friend.status === "invited" ? "#000" : "#000",
                    }}
                  >
                    {friend.status === "invited" ? "Sent Invite" : "Send Invite"}
                  </Button>
                </div>
              ))}
            </div>

            <div className="mb-5">
              <h5 className="mb-3">Terms & Conditions</h5>
              <ul className="ps-3">
                <li className="mb-2">
                  The Tournament entry fee deduction and winning payment distribution shall
                  be made equally among the respective team members
                </li>
                <li className="mb-2">
                  Your invited team member will received an email to confirm their
                  registration and participation for this tournament
                </li>
                <li className="mb-2">
                  Once all team members have confirmed their registration, the entry fee
                  will be automatically deducted from their linked active wallet
                </li>
                <li className="mb-2">
                  You can find your overall team registration status in Tournaments section
                </li>
              </ul>
              <div className="form-check mt-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  id="terms"
                />
                <label className="form-check-label" htmlFor="terms">
                  I have read Terms and Conditions and agree
                </label>
              </div>
            </div>
          </Col>

          <Col md={4}>
            <div className="bg-white p-4 rounded-3">
              <div className="mb-3">
                <span className="badge bg-success bg-opacity-10 text-success">New</span>
              </div>

              <div className="mb-4">
                <div className="text-muted mb-1">Entry Cost</div>
                <h5 className="mb-0">$25</h5>
              </div>

              <div className="mb-4">
                <div className="text-muted mb-1">Platform</div>
                <div>XBOX</div>
              </div>

              <div className="mb-4">
                <div className="text-muted mb-1">Tournament Type</div>
                <div>KILL RACE</div>
              </div>

              <div className="mb-4">
                <div className="text-muted mb-1">Tournament Size</div>
                <div>0 of 64 teams</div>
              </div>

              <div className="mb-4">
                <div className="text-muted mb-1">Team Size</div>
                <div>Quad</div>
              </div>

              <div className="mb-4">
                <div className="text-muted mb-1">Country</div>
                <div>USA</div>
              </div>

              <div className="mb-4">
                <div className="text-muted mb-1">Game</div>
                <div>Call of Duty</div>
              </div>

              <div className="mb-4">
                <div className="text-muted mb-1">Game Mode</div>
                <div>Battle Royale</div>
              </div>

              <div className="mb-4">
                <h6>Prizes</h6>
                <div className="d-flex justify-content-between mb-2">
                  <span>1st Winner Prize</span>
                  <span>$775</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>2nd Winner Prize</span>
                  <span>$775</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>3rd Winner Prize</span>
                  <span>$775</span>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        <div className="fixed-bottom bg-white py-3 shadow-lg">
          <Container>
            <div className="d-flex justify-content-between">
              <Button
                color="secondary"
                onClick={() => router.back()}
                style={{ minWidth: "120px" }}
              >
                Back
              </Button>
              <Button
                color="warning"
                onClick={handleSubmit}
                style={{
                  minWidth: "120px",
                  backgroundColor: "#FFD600",
                  border: "none",
                }}
              >
                Register
              </Button>
            </div>
          </Container>
        </div>
      </Container>
    </UserDashboardLayout>
  );
}