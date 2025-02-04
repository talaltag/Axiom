import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import UserDashboardLayout from "../../../../components/layouts/UserDashboardLayout";
import { Container, Row, Col, Input, Button, Form, Badge } from "reactstrap";
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
        friend.id === friendId ? { ...friend, status: "invited" } : friend,
      ),
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
    friend.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <UserDashboardLayout>
      <Container fluid>
        <Row>
          <Col md={8}>
            <div
              className="d-flex gap-4 p-4 mb-4 bg-white rounded-3 shadow-sm"
              style={{
                boxShadow:
                  "0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)",
              }}
            >
              <div className="d-flex align-items-center gap-4 w-100">
                <Image
                  src={tournament?.images?.[0] || "/fortnite-banner.png"}
                  alt="Tournament"
                  width={120}
                  height={120}
                  className="rounded-3"
                  style={{ objectFit: "cover" }}
                />
                <div className="flex-grow-1">
                  <h2 className="fs-3 mb-2">Fortnite Summer Battle</h2>
                  <p className="text-muted mb-0" style={{ fontSize: "14px" }}>
                    May 23, 2023 9:00PM - 10:30PM EST
                  </p>
                </div>
                <div className="text-end">
                  <div className="text-muted mb-1" style={{ fontSize: "14px" }}>
                    Entry Cost
                  </div>
                  <h3 className="text-danger fs-2 fw-bold mb-0">$200</h3>
                </div>
              </div>
            </div>

            <div
              className="mb-5 p-4 bg-white rounded-3"
              style={{
                boxShadow: "0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)",
                border: "1px solid #EAECF0"
              }}
            >
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

            <div
              className="mb-5 p-4 bg-white rounded-3"
              style={{
                boxShadow: "0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)",
                border: "1px solid #EAECF0"
              }}
            >
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="mb-0">Invite Friends</h5>
                <div className="position-relative" style={{ width: "300px" }}>
                  <Search
                    size={20}
                    className="position-absolute"
                    style={{
                      top: "50%",
                      transform: "translateY(-50%)",
                      left: "12px",
                      color: "#667085",
                      zIndex: 1,
                    }}
                  />
                  <Input
                    placeholder="Search Friends"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="ps-5"
                    style={{
                      backgroundColor: "#fff",
                      border: "1px solid #D0D5DD",
                      borderRadius: "8px",
                      height: "40px",
                    }}
                  />
                </div>
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
                      <div
                        style={{
                          fontSize: "14px",
                          fontWeight: 500,
                          color: "#101828",
                        }}
                      >
                        {friend.name}
                      </div>
                      <div style={{ fontSize: "14px", color: "#667085" }}>
                        Member
                      </div>
                    </div>
                  </div>
                  <Button
                    color="warning"
                    size="sm"
                    onClick={() => handleSendInvite(friend.id)}
                    disabled={friend.status === "invited"}
                    style={{
                      backgroundColor:
                        friend.status === "invited" ? "#FFF" : "#FFD600",
                      border:
                        friend.status === "invited"
                          ? "1px solid #D0D5DD"
                          : "1px solid #FFD600",
                      color: "#101828",
                      borderRadius: "8px",
                      padding: "6px 12px",
                      fontSize: "14px",
                      fontWeight: 500,
                    }}
                  >
                    {friend.status === "invited"
                      ? "Sent Invite"
                      : "Send Invite"}
                  </Button>
                </div>
              ))}
            </div>

            <div
              className="mb-5 p-4 bg-white rounded-3"
              style={{
                boxShadow: "0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)",
                border: "1px solid #EAECF0"
              }}
            >
              <h5
                style={{
                  fontSize: "18px",
                  fontWeight: 500,
                  color: "#101828",
                  marginBottom: "24px",
                }}
              >
                Terms and Conditions
              </h5>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                <li
                  style={{
                    color: "#475467",
                    fontSize: "14px",
                    marginBottom: "16px",
                    lineHeight: "20px",
                  }}
                >
                  The Tournament entry fee deduction and winning payment
                  distribution shall be made equally among the respective team
                  members
                </li>
                <li
                  style={{
                    color: "#475467",
                    fontSize: "14px",
                    marginBottom: "16px",
                    lineHeight: "20px",
                  }}
                >
                  Your invited team member will received an email to confirm
                  their registration and participation for this tournament
                </li>
                <li
                  style={{
                    color: "#475467",
                    fontSize: "14px",
                    marginBottom: "16px",
                    lineHeight: "20px",
                  }}
                >
                  Once all team members have confirmed their registration, the
                  entry fee will be automatically deducted from their linked
                  active wallet
                </li>
                <li
                  style={{
                    color: "#475467",
                    fontSize: "14px",
                    marginBottom: "16px",
                    lineHeight: "20px",
                  }}
                >
                  You can find your overall team registration status in
                  Tournaments section
                </li>
              </ul>
              <div
                className="mt-3"
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  id="terms"
                  style={{
                    width: "16px",
                    height: "16px",
                    accentColor: "#FFD600",
                  }}
                />
                <label
                  htmlFor="terms"
                  style={{ fontSize: "14px", color: "#475467", margin: 0 }}
                >
                  I have read Terms and Conditions and agree
                </label>
              </div>
            </div>
          </Col>

          <Col md={4}>
            <div
              className="bg-white p-4 rounded-3"
              style={{
                boxShadow: "0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)",
              }}
            >
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="fs-2 fw-bold text-dark mb-0">$500</h4>
                <span className="badge bg-success bg-opacity-10 text-success px-2 py-1" style={{ fontSize: '12px' }}>
                  New
                </span>
              </div>
              <p className="text-muted mb-4" style={{ fontSize: '14px' }}>Prize</p>

              <div className="mb-3">
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted" style={{ fontSize: '14px' }}>Entry Fee</span>
                  <span style={{ fontSize: '14px' }}>$25</span>
                </div>
              </div>

              <div className="mb-3">
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted" style={{ fontSize: '14px' }}>Platform</span>
                  <span style={{ fontSize: '14px' }}>XBOX</span>
                </div>
              </div>

              <div className="mb-3">
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted" style={{ fontSize: '14px' }}>Tournament Type</span>
                  <span style={{ fontSize: '14px' }}>KILL RACE</span>
                </div>
              </div>

              <div className="mb-3">
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted" style={{ fontSize: '14px' }}>Tournament Size</span>
                  <span style={{ fontSize: '14px' }}>0 of 64 teams</span>
                </div>
              </div>

              <div className="mb-3">
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted" style={{ fontSize: '14px' }}>Team Size</span>
                  <span style={{ fontSize: '14px' }}>Quad</span>
                </div>
              </div>

              <div className="mb-3">
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted" style={{ fontSize: '14px' }}>Country</span>
                  <span style={{ fontSize: '14px' }}>USA</span>
                </div>
              </div>

              <div className="mb-3">
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted" style={{ fontSize: '14px' }}>Game</span>
                  <span style={{ fontSize: '14px' }}>Call of Duty</span>
                </div>
              </div>

              <div className="mb-4">
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted" style={{ fontSize: '14px' }}>Game Mode</span>
                  <span style={{ fontSize: '14px' }}>Battle Royale</span>
                </div>
              </div>

              <Button
                color="warning"
                block
                className="mb-4"
                style={{
                  backgroundColor: "#FFD600",
                  border: "none",
                  padding: "12px",
                  fontSize: "14px",
                  fontWeight: 500,
                  borderRadius: "8px",
                }}
              >
                Register
              </Button>

              <div className="mt-2">
                <h6 className="mb-3" style={{ fontSize: '14px', color: '#101828' }}>Prizes</h6>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted" style={{ fontSize: '14px' }}>1st Winner Prize</span>
                  <span style={{ fontSize: '14px' }}>$776</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted" style={{ fontSize: '14px' }}>2nd Winner Prize</span>
                  <span style={{ fontSize: '14px' }}>$776</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-muted" style={{ fontSize: '14px' }}>3rd Winner Prize</span>
                  <span style={{ fontSize: '14px' }}>$776</span>
                </div>
              </div>
            </div>
          </Col>
          <Col>
            <div className="d-flex justify-content-end gap-3 mt-4">
              <Button
                color="light"
                onClick={() => router.back()}
                style={{
                  padding: "10px 24px",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#344054",
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #D0D5DD",
                  borderRadius: "8px",
                  boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
                }}
              >
                ← Back
              </Button>
              <Button
                color="warning"
                onClick={handleSubmit}
                style={{
                  padding: "10px 24px",
                  fontSize: "14px",
                  fontWeight: 500,
                  backgroundColor: "#FFD600",
                  border: "none",
                  borderRadius: "8px",
                  boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
                  minWidth: "120px",
                }}
              >
                Register
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </UserDashboardLayout>
  );
}