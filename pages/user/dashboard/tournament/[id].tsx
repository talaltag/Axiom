import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";
import {
  Container,
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  Table,
  Button
} from "reactstrap";
import UserDashboardLayout from "../../../../components/layouts/UserDashboardLayout";

export default function TournamentDetails() {
  const { data: session } = useSession();
  const router = useRouter();
  const { id } = router.query;
  const [activeTab, setActiveTab] = useState("leaderboard");
  const [tournament, setTournament] = useState(null);
  const [supportAgents, setSupportAgents] = useState([]);

  useEffect(() => {
    const fetchSupportAgents = async () => {
      try {
        const response = await fetch('/api/agent/users?role=Admin');
        const data = await response.json();
        if (data.success) {
          setSupportAgents(data.data);
        }
      } catch (error) {
        console.error('Error fetching support agents:', error);
      }
    };

    fetchSupportAgents();
  }, []);

  const leaderboardData = [
    {
      rank: "01",
      name: "Schumacher",
      kills: "145",
      deaths: "99",
      placement: "800",
      score: "12",
      tournamentScore: "678"
    },
    // Add more mock data as needed
  ];

  const teamMembers = [
    { name: "John Smith", role: "Team Leader", avatar: "/user1.png" },
    { name: "Sam Winchester", role: "Team Member", avatar: "/user1.png" },
    { name: "Daniel Craig", role: "Team Member", avatar: "/user1.png" },
    { name: "Gilbert Blythe", role: "Team Member", avatar: "/user1.png" }
  ];

  const ongoingMatches = [
    { team1: "Snipers", team2: "Dragons", score: "V/S" },
    { team1: "Snipers", team2: "Dragons", score: "V/S" },
    { team1: "Snipers", team2: "Dragons", score: "V/S" }
  ];

  return (
    <UserDashboardLayout>
      <Container fluid className="p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="d-flex align-items-center">
            <h5 className="mb-0">Tournaments</h5>
          </div>
          <Button
            color="light"
            className="d-flex align-items-center"
            onClick={() => router.push("/user/dashboard/tournaments")}
          >
            <span className="me-2">←</span> Back
          </Button>
        </div>

        <div className="position-relative mb-4" style={{ height: "300px" }}>
          <Image
            src="/fortnite-banner.png"
            alt="Tournament Banner"
            fill
            style={{ objectFit: "cover", borderRadius: "12px" }}
          />
          <div className="position-absolute text-white p-4" style={{ bottom: 0, left: 0, right: 0 }}>
            <h1 className="mb-2">Warzone</h1>
            <h2 style={{ fontSize: "2.5rem", fontWeight: "bold" }}>2022 world champs gaming</h2>
            <p>May 23, 2023 9:00PM - 10:30PM EST</p>
          </div>
        </div>

        <Row>
          <Col md={8}>
            <Nav tabs className="mb-4">
              <NavItem>
                <NavLink
                  className={`${activeTab === "leaderboard" ? "active bg-warning" : ""}`}
                  onClick={() => setActiveTab("leaderboard")}
                  style={{ cursor: "pointer", borderRadius: "4px 4px 0 0" }}
                >
                  Leaderboard
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={activeTab === "info" ? "active" : ""}
                  onClick={() => setActiveTab("info")}
                  style={{ cursor: "pointer" }}
                >
                  Info
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={activeTab === "rules" ? "active" : ""}
                  onClick={() => setActiveTab("rules")}
                  style={{ cursor: "pointer" }}
                >
                  Rules
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={activeTab === "payout" ? "active" : ""}
                  onClick={() => setActiveTab("payout")}
                  style={{ cursor: "pointer" }}
                >
                  Payout
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={activeTab === "scoring" ? "active" : ""}
                  onClick={() => setActiveTab("scoring")}
                  style={{ cursor: "pointer" }}
                >
                  Scoring
                </NavLink>
              </NavItem>
            </Nav>

            {activeTab === "leaderboard" && (
              <div className="bg-dark text-white p-4 rounded">
                <Table dark borderless className="mb-0">
                  <thead>
                    <tr>
                      <th>Team Name</th>
                      <th>Total Kills</th>
                      <th>Total Deaths</th>
                      <th>Total Placement</th>
                      <th>Total Score</th>
                      <th>Tournament Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboardData.map((team, index) => (
                      <tr key={index}>
                        <td>
                          <div className="d-flex align-items-center">
                            <span className="me-3">{team.rank}</span>
                            <Image src="/user1.png" alt={team.name} width={24} height={24} className="rounded-circle me-2" />
                            {team.name}
                          </div>
                        </td>
                        <td>{team.kills}</td>
                        <td>{team.deaths}</td>
                        <td>{team.placement}</td>
                        <td>{team.score}</td>
                        <td>{team.tournamentScore}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            )}

            {activeTab === "info" && (
              <div className="bg-white p-4 rounded">
                <h4 className="mb-4" style={{ fontSize: '24px', fontWeight: 600, color: '#101828' }}>Support</h4>
                <p className="text-muted mb-4" style={{ color: '#667085' }}>
                  If you have questions or issues in relation to online tournaments, please contact us via following support emails and we'll be with you shortly.
                </p>
                
                <div className="d-flex justify-content-between mb-4">
                  <div style={{ flex: 1 }}><h6 style={{ color: '#101828' }}>Name</h6></div>
                  <div style={{ flex: 1, textAlign: 'right' }}><h6 style={{ color: '#101828' }}>Messages</h6></div>
                </div>

                {supportAgents?.map((agent, index) => (
                  <div key={agent._id} className="d-flex justify-content-between align-items-center mb-3">
                    <div className="d-flex align-items-center" style={{ flex: 1 }}>
                      <div className="position-relative" style={{ width: '40px', height: '40px', marginRight: '12px' }}>
                        <Image
                          src={agent.profileImage || "/user1.png"}
                          alt={agent.name}
                          layout="fill"
                          className="rounded-circle"
                        />
                      </div>
                      <div>
                        <div style={{ color: '#101828', fontWeight: 500 }}>{agent.name}</div>
                        <div style={{ color: '#667085', fontSize: '14px' }}>{agent.role}</div>
                      </div>
                    </div>
                    <button
                      className="btn rounded-circle"
                      style={{
                        width: '40px',
                        height: '40px',
                        backgroundColor: '#F2F4F7',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.6667 14.1667V5.83333C16.6667 4.91286 15.9205 4.16667 15 4.16667H5C4.07953 4.16667 3.33334 4.91286 3.33334 5.83333V14.1667C3.33334 15.0871 4.07953 15.8333 5 15.8333H15C15.9205 15.8333 16.6667 15.0871 16.6667 14.1667Z" stroke="#667085" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M3.33334 7.5L8.51501 11.0833C9.43548 11.7167 10.5645 11.7167 11.485 11.0833L16.6667 7.5" stroke="#667085" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </Col>

          <Col md={4}>
            <div className="bg-white rounded p-4 mb-4">
              <h6 className="mb-3">Tournament Details</h6>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Prize</span>
                <span className="fw-bold">$500</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Entry Fee</span>
                <span className="fw-bold">$25</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Platform</span>
                <span>XBOX</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Tournament Type</span>
                <span>KILL RACE</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Tournament Size</span>
                <span>0 of 64 teams</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Team Size</span>
                <span>Quad</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Country</span>
                <span>USA</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Game</span>
                <span>Call of Duty</span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="text-muted">Game Mode</span>
                <span>Battle Royale</span>
              </div>
            </div>

            <div className="bg-white rounded p-4 mb-4">
              <h6 className="mb-3">My Team</h6>
              <div className="d-flex align-items-center mb-4">
                <Image src="/user1.png" alt="Team Logo" width={48} height={48} className="rounded me-3" />
                <div>
                  <h6 className="mb-1">Avengers Reborn</h6>
                  {teamMembers.map((member, index) => (
                    <div key={index} className="d-flex align-items-center mt-2">
                      <Image src={member.avatar} alt={member.name} width={32} height={32} className="rounded-circle me-2" />
                      <div>
                        <div className="small fw-bold">{member.name}</div>
                        <div className="small text-muted">{member.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="mb-0">Latest Result</h6>
                <small className="text-muted">Total Played Hour: 1hr 2m</small>
              </div>
              <div className="d-flex align-items-center justify-content-between mb-4">
                <div className="d-flex align-items-center">
                  <Image src="/user1.png" alt="Team 1" width={40} height={40} className="rounded me-2" />
                  <div>
                    <div className="small fw-bold">Special Force</div>
                    <small className="text-muted">Won</small>
                  </div>
                </div>
                <div className="fw-bold">V/S</div>
                <div className="d-flex align-items-center">
                  <div className="text-end me-2">
                    <div className="small fw-bold">Cyborgs</div>
                    <small className="text-muted">Lost</small>
                  </div>
                  <Image src="/user1.png" alt="Team 2" width={40} height={40} className="rounded" />
                </div>
              </div>

              <h6 className="mb-3">Ongoing Matches</h6>
              {ongoingMatches.map((match, index) => (
                <div key={index} className="d-flex align-items-center justify-content-between mb-3">
                  <div className="d-flex align-items-center">
                    <Image src="/user1.png" alt={match.team1} width={32} height={32} className="rounded me-2" />
                    <div className="small fw-bold">{match.team1}</div>
                  </div>
                  <div className="small fw-bold">{match.score}</div>
                  <div className="d-flex align-items-center">
                    <div className="small fw-bold me-2">{match.team2}</div>
                    <Image src="/user1.png" alt={match.team2} width={32} height={32} className="rounded" />
                  </div>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </UserDashboardLayout>
  );
}