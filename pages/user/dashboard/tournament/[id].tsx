
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
      rank: "01",
      name: "Schumacher",
      kills: "145",
      deaths: "99",
      placement: "800",
      points: "12",
      score: "678"
    },
    // Add more teams as needed
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
            <table className="table">
              <thead>
                <tr style={{ background: "#1A1D1F" }}>
                  <th>Rank</th>
                  <th>Team Name</th>
                  <th>Total Kills</th>
                  <th>Total Deaths</th>
                  <th>Total Placement</th>
                  <th>Points</th>
                  <th>Tournament Score</th>
                </tr>
              </thead>
              <tbody>
                {teams.map((team, index) => (
                  <tr key={index}>
                    <td>{team.rank}</td>
                    <td>{team.name}</td>
                    <td>{team.kills}</td>
                    <td>{team.deaths}</td>
                    <td>{team.placement}</td>
                    <td>{team.points}</td>
                    <td>{team.score}</td>
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
