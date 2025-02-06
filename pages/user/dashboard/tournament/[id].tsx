
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
          <Row>
            <Col md={8}>
              <div className="d-flex justify-content-between mb-4">
                <div>
                  <div style={{ color: "#667085", fontSize: "14px" }}>Prize</div>
                  <div style={{ fontSize: "24px", fontWeight: 600 }}>$500</div>
                </div>
                <div className="text-end">
                  <div style={{ color: "#667085", fontSize: "14px" }}>Entry Fee</div>
                  <div style={{ fontSize: "24px", fontWeight: 600 }}>$25</div>
                </div>
              </div>

              <div className="mb-4">
                <div style={{ color: "#667085", fontSize: "14px" }}>Platform</div>
                <div>XBOX</div>
              </div>

              <div className="mb-4">
                <div style={{ color: "#667085", fontSize: "14px" }}>Tournament Type</div>
                <div>KILL RACE</div>
              </div>

              <div className="mb-4">
                <div style={{ color: "#667085", fontSize: "14px" }}>Tournament Size</div>
                <div>0 of 64 teams</div>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </UserDashboardLayout>
  );
}
