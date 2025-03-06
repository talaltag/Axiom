import React from "react";
import AdminDashboardLayout from "../../../components/layouts/AdminDashboardLayout";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Table,
} from "reactstrap";
import Image from "next/image";
import { ArrowLeft } from "react-feather";
import Link from "next/link";
import { useRouter } from "next/router";

export default function PayoutDetail() {
  const router = useRouter();
  const { id } = router.query;

  // Sample data to match the screenshot - in a real application, this would be fetched based on the ID
  const tournamentData = {
    name: "Tournament Name",
    banner: "/admin/pubg-banner.jpg",
    detailImage: "/admin/pubg-detail.jpg",
    tournament: "PUBG - SUMMER CAMP",
    date: "5/22/2023", // Updated date
    winningTeam: "Wolves",
    totalPayout: "$1,234",
    players: [
      { id: 1, name: "Jake", rank: "EXP", stats: "10 Kills", payout: "$250" },
      { id: 2, name: "Adam", rank: "AMA", stats: "10 Kills", payout: "$250" },
      { id: 3, name: "Smith", rank: "EXP", stats: "10 Kills", payout: "$250" },
      { id: 4, name: "Mark", rank: "VET", stats: "10 Kills", payout: "$250" },
      { id: 5, name: "John", rank: "AMA", stats: "10 Kills", payout: "$250" },
      { id: 6, name: "J121", rank: "AMA", stats: "10 Kills", payout: "$250" },
    ]
  };

  return (
    <AdminDashboardLayout>
      <Container fluid className="p-4">
        <div className="d-flex align-items-center mb-4">
          <Link href="/admin/payouts">
            <Button
              color="link"
              className="p-0 text-dark me-2"
              style={{ textDecoration: "none" }}
            >
              <ArrowLeft size={20} />
            </Button>
          </Link>
          <h4 className="mb-0">Pay Outs</h4>
        </div>

        <h3 
          className="mb-4"
          style={{
            fontSize: "24px",
            fontWeight: 500,
            color: "#101828",
          }}
        >
          {tournamentData.name}
        </h3>

        {/* Tournament Banner */}
        <div 
          className="position-relative mb-4" 
          style={{ 
            height: "180px", 
            borderRadius: "8px",
            overflow: "hidden" 
          }}
        >
          <Image
            src="/fortnite-banner.png"
            layout="fill"
            objectFit="cover"
            alt="Tournament Banner"
            priority
          />
        </div>

        <h3 
          className="mb-4"
          style={{
            fontSize: "18px",
            fontWeight: 500,
            color: "#101828",
          }}
        >
          Tournament Won
        </h3>

        <Row className="mb-4 g-4">
          <Col md={6}>
            <div className="bg-white p-3 rounded d-flex" style={{ boxShadow: "0px 1px 3px rgba(16, 24, 40, 0.1)" }}>
              <div className="position-relative me-3" style={{ width: "95px", height: "85px", borderRadius: "4px", overflow: "hidden" }}>
                <Image
                  src={tournamentData.detailImage}
                  layout="fill"
                  objectFit="cover"
                  alt="Tournament"
                  priority
                />
              </div>
              <div className="d-flex flex-column justify-content-center">
                <div className="mb-1 d-flex justify-content-between">
                  <span style={{ fontSize: "14px", fontWeight: 500, color: "#101828" }}>{tournamentData.tournament}</span>
                  <div style={{ width: "20px", height: "20px", backgroundColor: "#FFD600", borderRadius: "4px", marginLeft: "8px" }}>
                    <Image 
                      src="/admin/crown-icon.svg" 
                      width={20} 
                      height={20} 
                      alt="Crown Icon" 
                    />
                  </div>
                </div>
                <div className="mb-2" style={{ fontSize: "14px", color: "#667085" }}>{tournamentData.date}</div>
                <div className="d-flex align-items-center">
                  <span style={{ fontSize: "14px", color: "#667085", marginRight: "8px" }}>Winning Team</span>
                  <div className="d-flex align-items-center">
                    <div className="position-relative me-1" style={{ width: "20px", height: "20px", borderRadius: "50%", overflow: "hidden", border: "1px solid #EAECF0" }}>
                      <Image
                        src="/user1.png"
                        layout="fill"
                        objectFit="cover"
                        alt="User"
                      />
                    </div>
                    <span style={{ fontSize: "14px", fontWeight: 500, color: "#101828" }}>{tournamentData.winningTeam}</span>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div className="bg-white p-3 rounded d-flex flex-column align-items-center" style={{ boxShadow: "0px 1px 3px rgba(16, 24, 40, 0.1)" }}>
              <div className="d-flex align-items-center mb-2">
                <Image 
                  src="/admin/medal-icon.svg" 
                  width={24} 
                  height={24} 
                  alt="Medal Icon" 
                />
                <span style={{ fontSize: "14px", color: "#667085", marginLeft: "8px" }}>Total Payouts</span>
              </div>
              <div style={{ 
                fontSize: "24px", 
                fontWeight: 500,
                color: "#101828",
                marginBottom: "16px"
              }}>
                {tournamentData.totalPayout}
              </div>
              <Button
                color="warning"
                className="d-flex align-items-center justify-content-center gap-2 w-100"
                style={{
                  backgroundColor: "#FFD600",
                  border: "none",
                  borderRadius: "8px",
                  padding: "10px",
                  color: "#101828",
                  fontWeight: 500,
                  fontSize: "14px"
                }}
              >
                <span>Send to all</span>
                <Image 
                  src="/admin/arrow-right-black.svg" 
                  width={16} 
                  height={16} 
                  alt="Arrow Right" 
                />
              </Button>
            </div>
          </Col>
        </Row>

        {/* Player List */}
        <Card className="mb-4 border-0" style={{ borderRadius: "8px", overflow: "hidden", boxShadow: "0px 1px 3px rgba(16, 24, 40, 0.1)" }}>
          <CardBody className="p-0">
            <div className="d-flex justify-content-between p-4">
              <h5 className="mb-0" style={{ fontSize: "18px", color: "#101828" }}>Players and Payouts</h5>
            </div>
            <Table responsive bordered={false} className="mb-0">
              <thead>
                <tr style={{ backgroundColor: "#F9FAFB" }}>
                  <th className="p-3" style={{ color: "#667085", fontWeight: "500", fontSize: "14px" }}>Player</th>
                  <th className="p-3" style={{ color: "#667085", fontWeight: "500", fontSize: "14px" }}>Rank</th>
                  <th className="p-3" style={{ color: "#667085", fontWeight: "500", fontSize: "14px" }}>Stats</th>
                  <th className="p-3" style={{ color: "#667085", fontWeight: "500", fontSize: "14px" }}>Payout</th>
                  <th className="p-3" style={{ color: "#667085", fontWeight: "500", fontSize: "14px", width: "120px" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tournamentData.players.map((player) => (
                  <tr key={player.id}>
                    <td className="p-3" style={{ verticalAlign: "middle" }}>
                      <div className="d-flex align-items-center">
                        <div className="position-relative me-2" style={{ width: "32px", height: "32px", borderRadius: "50%", overflow: "hidden", backgroundColor: "#F2F4F7" }}>
                          <Image src="/user1.png" alt={player.name} layout="fill" objectFit="cover" />
                        </div>
                        <span style={{ fontWeight: "500", color: "#101828" }}>{player.name}</span>
                      </div>
                    </td>
                    <td className="p-3" style={{ verticalAlign: "middle", color: "#667085" }}>{player.rank}</td>
                    <td className="p-3" style={{ verticalAlign: "middle", color: "#667085" }}>{player.stats}</td>
                    <td className="p-3" style={{ verticalAlign: "middle", fontWeight: "600", color: "#101828" }}>{player.payout}</td>
                    <td className="p-3" style={{ verticalAlign: "middle" }}>
                      <Button
                        color="warning"
                        size="sm"
                        style={{
                          backgroundColor: "#FFD600",
                          border: "none",
                          fontWeight: "500",
                          borderRadius: "4px",
                          padding: "4px 10px",
                          color: "#101828",
                          fontSize: "12px"
                        }}
                      >
                        Send
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Container>
    </AdminDashboardLayout>
  );
}