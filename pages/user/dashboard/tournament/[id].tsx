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
import TournamentBrackets from "../../../../components/tournaments/TournamentBrackets";

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
        const response = await fetch('/api/agent/users');
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
            <Nav className="tournament-nav mb-4" style={{ borderBottom: '1px solid #EAECF0' }}>
              <NavItem>
                <NavLink
                  className={`${activeTab === "leaderboard" ? "active bg-warning" : ""}`}
                  onClick={() => setActiveTab("leaderboard")}
                  style={{ cursor: "pointer", borderRadius: "4px 4px 0 0", color: activeTab === 'leaderboard' ? '#101828' : '#667085', borderBottom: activeTab === 'leaderboard' ? '2px solid #FFD600' : 'none', padding: '12px 16px', background: activeTab === 'leaderboard' ? '#FFD600' : 'none' }}
                >
                  Leaderboard
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={activeTab === "info" ? "active bg-warning" : ""}
                  onClick={() => setActiveTab("info")}
                  style={{ cursor: "pointer", color: activeTab === 'info' ? '#101828' : '#667085', borderBottom: activeTab === 'info' ? '2px solid #FFD600' : 'none', padding: '12px 16px', background: activeTab === 'info' ? '#FFD600' : 'none' }}
                >
                  Info
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={activeTab === "rules" ? "active bg-warning" : ""}
                  onClick={() => setActiveTab("rules")}
                  style={{ cursor: "pointer", color: activeTab === 'rules' ? '#101828' : '#667085', borderBottom: activeTab === 'rules' ? '2px solid #FFD600' : 'none', padding: '12px 16px', background: activeTab === 'rules' ? '#FFD600' : 'none' }}
                >
                  Rules
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={activeTab === "payout" ? "active bg-warning" : ""}
                  onClick={() => setActiveTab("payout")}
                  style={{ cursor: "pointer", color: activeTab === 'payout' ? '#101828' : '#667085', borderBottom: activeTab === 'payout' ? '2px solid #FFD600' : 'none', padding: '12px 16px', background: activeTab === 'payout' ? '#FFD600' : 'none' }}
                >
                  Payout
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={activeTab === "scoring" ? "active bg-warning" : ""}
                  onClick={() => setActiveTab("scoring")}
                  style={{ cursor: "pointer", color: activeTab === 'scoring' ? '#101828' : '#667085', borderBottom: activeTab === 'scoring' ? '2px solid #FFD600' : 'none', padding: '12px 16px', background: activeTab === 'scoring' ? '#FFD600' : 'none' }}
                >
                  Scoring
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={activeTab === "brackets" ? "active bg-warning" : ""}
                  onClick={() => setActiveTab("brackets")}
                  style={{ cursor: "pointer", color: activeTab === 'brackets' ? '#101828' : '#667085', borderBottom: activeTab === 'brackets' ? '2px solid #FFD600' : 'none', padding: '12px 16px', background: activeTab === 'brackets' ? '#FFD600' : 'none' }}
                >
                  Brackets
                </NavLink>
              </NavItem>
            </Nav>

            {activeTab === "leaderboard" && (
              <div style={{ 
                background: '#2A2B31', 
                borderRadius: '8px', 
                padding: '24px',
                maxHeight: '600px',
                overflowY: 'auto'
              }}>
                <div style={{ minWidth: '800px' }}>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '80px 200px 120px 120px 120px 120px 120px',
                    padding: '12px 16px',
                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                    color: '#FFD600',
                    fontSize: '14px',
                    fontWeight: 500,
                  }}>
                    <div>Rank</div>
                    <div>Team Name</div>
                    <div style={{textAlign: 'center'}}>Total Kills</div>
                    <div style={{textAlign: 'center'}}>Total Deaths</div>
                    <div style={{textAlign: 'center'}}>Total Placement</div>
                    <div style={{textAlign: 'center'}}>Total Score</div>
                    <div style={{textAlign: 'center'}}>Tournament Score</div>
                  </div>
                  {Array(7).fill(null).map((_, index) => (
                    <div key={index} style={{
                      display: 'grid',
                      gridTemplateColumns: '80px 200px 120px 120px 120px 120px 120px',
                      padding: '12px 16px',
                      borderBottom: '1px solid rgba(255,255,255,0.1)',
                      color: 'white',
                      fontSize: '14px',
                      alignItems: 'center'
                    }}>
                      <div style={{ color: '#FFD600' }}>{String(index + 1).padStart(2, '0')}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Image 
                          src="/user1.png" 
                          alt="Team Avatar" 
                          width={24} 
                          height={24} 
                          style={{ borderRadius: '4px' }} 
                        />
                        <span>Schumacher</span>
                      </div>
                      <div style={{textAlign: 'center'}}>145</div>
                      <div style={{textAlign: 'center'}}>99</div>
                      <div style={{textAlign: 'center'}}>800</div>
                      <div style={{textAlign: 'center'}}>12</div>
                      <div style={{textAlign: 'center'}}>678</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "info" && (
              <div className="p-4 rounded" style={{ boxShadow: '0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)', backgroundColor: 'rgba(250, 251, 252, 1)' }}>
                <h4 className="mb-3" style={{ fontSize: '24px', fontWeight: 600, color: '#101828' }}>Support</h4>
                <p className="text-muted mb-4" style={{ fontSize: '14px', color: '#667085', lineHeight: '20px' }}>
                  If you have questions or issues in relation to online tournaments, please contact us via following support emails and we'll be with you shortly.
                </p>

                <div className="d-flex justify-content-between mb-4" style={{ padding: '0 8px' }}>
                  <div style={{ flex: 1 }}><h6 style={{ color: '#101828', fontSize: '14px', fontWeight: 500 }}>Name</h6></div>
                  <div><h6 style={{ color: '#101828', fontSize: '14px', fontWeight: 500 }}>Messages</h6></div>
                </div>

                {supportAgents?.map((agent, index) => (
                  <div key={agent._id} className="d-flex justify-content-between align-items-center mb-3" style={{ padding: '8px' }}>
                    <div className="d-flex align-items-center" style={{ flex: 1 }}>
                      <div className="position-relative" style={{ width: '32px', height: '32px', marginRight: '12px' }}>
                        <Image
                          src={agent.profileImage || "/user1.png"}
                          alt={agent.name}
                          layout="fill"
                          className="rounded-circle"
                          style={{ border: '2px solid #fff' }}
                        />
                        <div style={{ position: 'absolute', right: '-2px', bottom: '-2px', width: '8px', height: '8px', backgroundColor: '#12B76A', borderRadius: '50%', border: '2px solid #fff' }}></div>
                      </div>
                      <div>
                        <div style={{ color: '#101828', fontWeight: 500, fontSize: '14px', lineHeight: '20px' }}>{agent.name}</div>
                        <div style={{ color: '#667085', fontSize: '12px', lineHeight: '18px' }}>{agent.role}</div>
                      </div>
                    </div>
                    <button
                      className="btn"
                      onClick={() => {
                        const agentId = agent._id;
                        router.push({
                          pathname: '/chat',
                          query: { receiver: agentId }
                        });
                      }}
                      style={{
                        width: '32px',
                        height: '32px',
                        backgroundColor: '#F2F4F7',
                        border: 'none',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 0
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

            {activeTab === "scoring" && (
              <div className="p-4 rounded" style={{ background: 'rgba(250, 251, 252, 1)' }}>
                <h4 className="mb-4" style={{ fontSize: '24px', fontWeight: 600, color: '#101828' }}>Scoring System</h4>

                <div className="mb-5">
                  <h5 className="mb-3" style={{ color: '#101828' }}>Criteria For Placement Points</h5>
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Match Ranking</th>
                          <th>Placement Points</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1 (Win)</td>
                          <td>50 Points</td>
                        </tr>
                        <tr>
                          <td>2-3</td>
                          <td>40 Points</td>
                        </tr>
                        <tr>
                          <td>4-6</td>
                          <td>35 Points</td>
                        </tr>
                        <tr>
                          <td>7-2</td>
                          <td>50 Points</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h5 className="mb-3" style={{ color: '#101828' }}>Criteria For Tournament Score</h5>
                  <p className="text-muted">Tournament Score = Avg Kill + Avg Placement + Avg Score</p>
                </div>
              </div>
            )}

            {activeTab === "rules" && (
              <div className="p-4 rounded" style={{ background: 'rgba(250, 251, 252, 1)' }}>
                <h4 className="mb-4" style={{ fontSize: '24px', fontWeight: 600, color: '#101828' }}>Tournament Rules</h4>

                <div className="mb-4">
                  <h5 className="mb-3" style={{ color: '#101828' }}>1. Planting & Defusing:</h5>
                  <ul className="list-unstyled ps-3">
                    <li className="mb-2 text-muted">• Planting or defusing the bomb through any unbroken object (such as destructible walls) will result in a forfeit of the round.</li>
                    <li className="mb-2 text-muted">• Repeated offences will result in a forfeit of the match.</li>
                  </ul>
                </div>

                <div className="mb-4">
                  <h5 className="mb-3" style={{ color: '#101828' }}>2. Warm-Up & Practice Games:</h5>
                  <ul className="list-unstyled ps-3">
                    <li className="mb-2 text-muted">• No warm-up or practise games are permitted once the match's first game has begun. If a match is played before the scheduled time, it will not be considered a warm-up and will count as the official results</li>
                  </ul>
                </div>

                <div className="mb-4">
                  <h5 className="mb-3" style={{ color: '#101828' }}>3. Delays:</h5>
                  <ul className="list-unstyled ps-3">
                    <li className="mb-2 text-muted">• Teams may not delay the match for more than 5 Minutes between each Game.</li>
                    <li className="mb-2 text-muted">• Teams must contact Tournament Live Support to report a delay of the game.</li>
                    <li className="mb-2 text-muted">• Failure to begin the game when requested by a Tournament Official may result in a forfeit of the match.</li>
                  </ul>
                </div>

                <div className="mb-4">
                  <h5 className="mb-3" style={{ color: '#101828' }}>4. Connection Issues & Lag:</h5>
                  <ul className="list-unstyled ps-3">
                    <li className="mb-2 text-muted">• In the event that lag occurs, the game should be completed.</li>
                    <li className="mb-2 text-muted">• The player experiencing connection issues should capture video proof before contacting Tournament Live Support after the game has concluded.</li>
                    <li className="mb-2 text-muted">• It is required that multiple players capture proof of the connection issues.</li>
                    <li className="mb-2 text-muted">• Leaving the game prematurely may result in a forfeit of the round or game.</li>
                  </ul>
                </div>

                <div className="mb-4">
                  <h5 className="mb-3" style={{ color: '#101828' }}>5. Disconnections:</h5>
                  <ul className="list-unstyled ps-3">
                    <li className="mb-2 text-muted">• If a player disconnects within the first thirty (30) seconds and/or before the first kill, the game should be ended. All players must leave the match to end the game.</li>
                    <li className="mb-2 text-muted">• If a player disconnects after the first thirty seconds (30) and/or the first kill, the map must be continued and the missing player should be reinvited to the lobby.</li>
                    <li className="mb-2 text-muted">• Leaving the lobby may result in a forfeit of the round or game.</li>
                  </ul>
                </div>

                <div className="mb-4">
                  <h5 className="mb-3" style={{ color: '#101828' }}>6. Unknown Player Interference:</h5>
                  <ul className="list-unstyled ps-3">
                    <li className="mb-2 text-muted">• If an unknown player enters the lobby, please request that they leave.</li>
                    <li className="mb-2 text-muted">• If the player leaves immediately without disrupting the match, the match must continue.</li>
                    <li className="mb-2 text-muted">• If the player disrupts the match, the host may end the game & restart from the score at which the player entered.</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === "payout" && (
              <div className="p-6 rounded" style={{ background: 'rgba(250, 251, 252, 1)' }}>
                <h4 className="mb-3" style={{ fontSize: '24px', fontWeight: 600, color: '#101828' }}>Payout</h4>
                <p className="text-muted mb-8" style={{ color: '#667085', fontSize: '14px', lineHeight: '20px' }}>
                  If you have questions or issues in relation to online tournaments, please contact us via following support emails and we'll be with you shortly.
                </p>

                <h5 className="mb-5" style={{ color: '#101828', fontSize: '16px', fontWeight: 500 }}>Prizes</h5>
                <div className="d-flex flex-column gap-4">
                  <div className="d-flex justify-content-between align-items-center px-4 py-3" style={{ background: '#F9FAFB', borderRadius: '8px' }}>
                    <span style={{ color: '#101828', fontWeight: 500, fontSize: '14px' }}>1st Winner Prize</span>
                    <span style={{ color: '#101828', fontWeight: 600, fontSize: '14px' }}>${776}</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center px-4 py-3" style={{ background: '#F9FAFB', borderRadius: '8px' }}>
                    <span style={{ color: '#101828', fontWeight: 500, fontSize: '14px' }}>2nd Winner Prize</span>
                    <span style={{ color: '#101828', fontWeight: 600, fontSize: '14px' }}>${776}</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center px-4 py-3" style={{ background: '#F9FAFB', borderRadius: '8px' }}>
                    <span style={{ color: '#101828', fontWeight: 500, fontSize: '14px' }}>3rd Winner Prize</span>
                    <span style={{ color: '#101828', fontWeight: 600, fontSize: '14px' }}>${776}</span>
                  </div>
                </div>
              </div>
            )}

            {
              activeTab ==='brackets' && (
                <TournamentBrackets/>
              )
            }
          </Col>

          <Col md={4}>
            <div className="p-4 rounded" style={{ background: 'rgba(250, 251, 252, 1)' }}>
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

            <div className="p-4 rounded" style={{ background: 'rgba(250, 251, 252, 1)' }}>
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

            <div className="p-4 rounded" style={{ background: 'rgba(250, 251, 252, 1)' }}>
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