
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import UserDashboardLayout from "../../../../components/layouts/UserDashboardLayout";
import { Container, Row, Col, Button } from "reactstrap";
import Image from "next/image";

export default function TournamentDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [tournament, setTournament] = useState<any>(null);
  const [teams, setTeams] = useState([
    {
      name: "Schumacher",
      kills: "145",
      deaths: "99",
      placement: "800",
      points: "12",
      score: "678"
    },
    {
      name: "Schumacher",
      kills: "145",
      deaths: "99",
      placement: "800",
      points: "12",
      score: "678"
    },
    {
      name: "Schumacher",
      kills: "145",
      deaths: "99",
      placement: "800",
      points: "12",
      score: "678"
    },
    {
      name: "Schumacher",
      kills: "145",
      deaths: "99",
      placement: "800",
      points: "12",
      score: "678"
    },
    {
      name: "Schumacher",
      kills: "145",
      deaths: "99",
      placement: "800",
      points: "12",
      score: "678"
    },
    {
      name: "Schumacher",
      kills: "145",
      deaths: "99",
      placement: "800",
      points: "12",
      score: "678"
    },
    {
      name: "Schumacher",
      kills: "145",
      deaths: "99",
      placement: "800",
      points: "12",
      score: "678"
    }
  ]);

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

  return (
    <UserDashboardLayout>
      <Container fluid className="p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0">Fortnite Summer Battle</h2>
          <Button 
            color="light" 
            onClick={() => router.back()}
            className="d-flex align-items-center gap-2"
          >
            ← Back
          </Button>
        </div>

        <div className="position-relative mb-5" style={{ height: "300px" }}>
          <Image
            src="/fortnite-banner.png"
            alt="Tournament Banner"
            fill
            style={{ objectFit: "cover", borderRadius: "12px" }}
          />
          <div className="position-absolute text-white" style={{ bottom: "24px", left: "24px" }}>
            <h2 className="mb-2">Warzone</h2>
            <div style={{ fontSize: "18px" }}>2022 world champs gaming</div>
            <div className="mt-2" style={{ fontSize: "14px" }}>May 23, 2023 9:00PM - 10:30PM EST</div>
          </div>
        </div>

        <div className="bg-white rounded-3 p-4 mb-4">
          <nav className="mb-4">
            <ul className="nav nav-pills">
              <li className="nav-item">
                <a className="nav-link active" href="#">Leaderboard</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Info</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Rules</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Payout</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Scoring</a>
              </li>
            </ul>
          </nav>

          <div className="table-responsive">
            <table className="table" style={{ backgroundColor: '#1F2128', borderRadius: '12px', overflow: 'hidden' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255, 214, 0, 0.1)' }}>
                  <th style={{ padding: '16px', color: '#FFD600', fontWeight: 500 }}>#</th>
                  <th style={{ padding: '16px', color: '#FFD600', fontWeight: 500 }}>Team Name</th>
                  <th style={{ padding: '16px', color: '#FFD600', fontWeight: 500 }}>Total Kills</th>
                  <th style={{ padding: '16px', color: '#FFD600', fontWeight: 500 }}>Total Deaths</th>
                  <th style={{ padding: '16px', color: '#FFD600', fontWeight: 500 }}>Total Placement</th>
                  <th style={{ padding: '16px', color: '#FFD600', fontWeight: 500 }}>Total Score</th>
                  <th style={{ padding: '16px', color: '#FFD600', fontWeight: 500 }}>Tournament Score</th>
                </tr>
              </thead>
              <tbody>
                {teams.map((team, index) => (
                  <tr key={index} style={{ borderBottom: '1px solid rgba(255, 214, 0, 0.1)' }}>
                    <td style={{ padding: '16px', color: '#fff' }}>
                      <div className="d-flex align-items-center">
                        <span style={{ 
                          backgroundColor: '#FFD600',
                          width: '32px',
                          height: '32px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: '4px',
                          marginRight: '12px',
                          color: '#1F2128',
                          fontWeight: 600
                        }}>
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>
                    </td>
                    <td style={{ padding: '16px', color: '#fff' }}>
                      <div className="d-flex align-items-center">
                        <Image
                          src="/axiom-logo.png"
                          alt="Team Logo"
                          width={32}
                          height={32}
                          style={{ marginRight: '12px', borderRadius: '4px' }}
                        />
                        {team.name}
                      </div>
                    </td>
                    <td style={{ padding: '16px', color: '#fff' }}>{team.kills}</td>
                    <td style={{ padding: '16px', color: '#fff' }}>{team.deaths}</td>
                    <td style={{ padding: '16px', color: '#fff' }}>{team.placement}</td>
                    <td style={{ padding: '16px', color: '#fff' }}>{team.points}</td>
                    <td style={{ padding: '16px', color: '#fff' }}>{team.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-3 p-4">
          <div style={{ display: 'flex', gap: '24px' }}>
            <div style={{ flex: '1' }}>
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div style={{ fontSize: '20px', fontWeight: 600, color: '#101828' }}>$500</div>
                  <div className="px-2 py-1" style={{ backgroundColor: '#ECFDF3', color: '#027A48', borderRadius: '16px', fontSize: '12px' }}>
                    Completed
                  </div>
                </div>
                <div style={{ color: "#667085", fontSize: "14px" }}>Prize</div>
              </div>

              <div className="mb-4">
                <div style={{ fontSize: '14px', color: '#101828', marginBottom: '4px' }}>$25</div>
                <div style={{ color: "#667085", fontSize: "14px" }}>Entry Fee</div>
              </div>

              <div className="mb-4">
                <div style={{ fontSize: '14px', color: '#101828', marginBottom: '4px' }}>XBOX</div>
                <div style={{ color: "#667085", fontSize: "14px" }}>Platform</div>
              </div>

              <div className="mb-4">
                <div style={{ fontSize: '14px', color: '#101828', marginBottom: '4px' }}>KILL RACE</div>
                <div style={{ color: "#667085", fontSize: "14px" }}>Tournament Type</div>
              </div>

              <div className="mb-4">
                <div style={{ fontSize: '14px', color: '#101828', marginBottom: '4px' }}>0 of 64 teams</div>
                <div style={{ color: "#667085", fontSize: "14px" }}>Tournament Size</div>
              </div>

              <div className="mb-4">
                <div style={{ fontSize: '14px', color: '#101828', marginBottom: '4px' }}>Quad</div>
                <div style={{ color: "#667085", fontSize: "14px" }}>Team Size</div>
              </div>

              <div className="mb-4">
                <div style={{ fontSize: '14px', color: '#101828', marginBottom: '4px' }}>USA</div>
                <div style={{ color: "#667085", fontSize: "14px" }}>Country</div>
              </div>

              <div className="mb-4">
                <div style={{ fontSize: '14px', color: '#101828', marginBottom: '4px' }}>Call of Duty</div>
                <div style={{ color: "#667085", fontSize: "14px" }}>Game</div>
              </div>

              <div className="mb-4">
                <div style={{ fontSize: '14px', color: '#101828', marginBottom: '4px' }}>Battle Royale</div>
                <div style={{ color: "#667085", fontSize: "14px" }}>Game Mode</div>
              </div>

              <div className="mt-5">
                <h6 className="mb-4">My Team</h6>
                <div className="card p-3 mb-4" style={{ background: '#F9FAFB', border: 'none' }}>
                  <div className="d-flex align-items-center mb-3">
                    <Image
                      src="/user1.png"
                      alt="Team Logo"
                      width={40}
                      height={40}
                      className="rounded"
                    />
                    <div className="ms-3">
                      <div style={{ fontSize: '16px', fontWeight: 500 }}>Avengers Reborn</div>
                      <div style={{ fontSize: '14px', color: '#667085' }}>Team Name</div>
                    </div>
                  </div>

                  {[
                    { name: 'John Smith', role: 'Team Leader' },
                    { name: 'Sam Winchester', role: 'Team Member' },
                    { name: 'Daniel Craig', role: 'Team Member' },
                    { name: 'Gilbert Blythe', role: 'Team Member' }
                  ].map((member, index) => (
                    <div key={index} className="d-flex align-items-center mb-2">
                      <Image
                        src="/user1.png"
                        alt={member.name}
                        width={32}
                        height={32}
                        className="rounded-circle"
                      />
                      <div className="ms-3">
                        <div style={{ fontSize: '14px', fontWeight: 500 }}>{member.name}</div>
                        <div style={{ fontSize: '12px', color: '#667085' }}>{member.role}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h6 className="mb-0">Latest Result</h6>
                    <small className="text-muted">Total Played Hour: 1hr 2m</small>
                  </div>
                  <div className="d-flex align-items-center justify-content-between p-3" style={{ background: '#F9FAFB', borderRadius: '8px' }}>
                    <div className="d-flex align-items-center">
                      <Image src="/user1.png" alt="Team 1" width={32} height={32} className="rounded-circle" />
                      <span className="mx-2" style={{ fontSize: '14px' }}>Special Force</span>
                    </div>
                    <div style={{ color: '#667085' }}>V/S</div>
                    <div className="d-flex align-items-center">
                      <span className="mx-2" style={{ fontSize: '14px' }}>Cyborgs</span>
                      <Image src="/user1.png" alt="Team 2" width={32} height={32} className="rounded-circle" />
                    </div>
                  </div>
                </div>

                <div>
                  <h6 className="mb-3">Ongoing Matches</h6>
                  {[1, 2, 3].map((match, index) => (
                    <div key={index} className="d-flex align-items-center justify-content-between p-3 mb-2" style={{ background: '#F9FAFB', borderRadius: '8px' }}>
                      <div className="d-flex align-items-center">
                        <Image src="/user1.png" alt="Team" width={32} height={32} className="rounded-circle" />
                        <span className="mx-2" style={{ fontSize: '14px' }}>Snipers</span>
                      </div>
                      <div style={{ color: '#667085' }}>V/S</div>
                      <div className="d-flex align-items-center">
                        <span className="mx-2" style={{ fontSize: '14px' }}>Dragons</span>
                        <Image src="/user1.png" alt="Team" width={32} height={32} className="rounded-circle" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </UserDashboardLayout>
  );
}
