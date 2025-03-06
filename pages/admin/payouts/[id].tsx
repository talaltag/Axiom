
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
    date: "5/22/2021",
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
            src={tournamentData.banner}
            layout="fill"
            objectFit="cover"
            alt="Tournament Banner"
            priority
          />
        </div>

        <h3 
          className="mb-4"
          style={{
            fontSize: "20px",
            fontWeight: 500,
            color: "#101828",
          }}
        >
          Tournament Won
        </h3>

        <Row className="mb-4">
          <Col>
            <div className="d-flex">
              <div 
                className="position-relative me-4" 
                style={{ 
                  width: "220px", 
                  height: "160px", 
                  borderRadius: "8px",
                  overflow: "hidden"
                }}
              >
                <Image
                  src={tournamentData.detailImage}
                  layout="fill"
                  objectFit="cover"
                  alt="Tournament Detail"
                  priority
                />
              </div>
              
              <div className="d-flex flex-column justify-content-center">
                <div 
                  className="d-flex align-items-center mb-2"
                  style={{
                    color: "#101828",
                    fontSize: "16px",
                    fontWeight: 600,
                  }}
                >
                  {tournamentData.tournament}
                  <div 
                    className="ms-4 position-relative"
                    style={{ 
                      width: "24px", 
                      height: "24px" 
                    }}
                  >
                    <Image
                      src="/admin/medal-icon.svg"
                      layout="fill"
                      objectFit="contain"
                      alt="Medal"
                    />
                  </div>
                </div>
                
                <div 
                  className="mb-3"
                  style={{
                    color: "#667085",
                    fontSize: "14px",
                  }}
                >
                  {tournamentData.date}
                </div>
                
                <div 
                  className="d-flex align-items-center"
                  style={{
                    color: "#344054",
                    fontSize: "14px",
                    fontWeight: 500,
                  }}
                >
                  Winning Team
                  <div 
                    className="ms-3 d-flex align-items-center"
                    style={{
                      backgroundColor: "#EFF8FF",
                      borderRadius: "16px",
                      padding: "2px 8px",
                    }}
                  >
                    <div 
                      className="position-relative me-1"
                      style={{ 
                        width: "16px", 
                        height: "16px",
                        borderRadius: "50%",
                        overflow: "hidden",
                      }}
                    >
                      <Image
                        src="/user1.png"
                        layout="fill"
                        objectFit="cover"
                        alt="Team"
                      />
                    </div>
                    <span>{tournamentData.winningTeam}</span>
                  </div>
                </div>
              </div>
              
              <div className="ms-auto">
                <Card
                  className="border-0"
                  style={{
                    borderRadius: "8px",
                    width: "240px",
                    boxShadow: "0px 1px 3px rgba(16, 24, 40, 0.1)",
                  }}
                >
                  <CardBody className="p-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <div
                        className="position-relative"
                        style={{ width: "40px", height: "40px" }}
                      >
                        <Image
                          src="/admin/medal-icon.svg"
                          layout="fill"
                          objectFit="contain"
                          alt="Medal"
                        />
                      </div>
                      <div>
                        <div
                          style={{
                            color: "#667085",
                            fontSize: "14px",
                            textAlign: "right",
                          }}
                        >
                          Total Payouts
                        </div>
                        <div
                          style={{
                            fontSize: "18px",
                            fontWeight: 600,
                            color: "#101828",
                            textAlign: "right",
                          }}
                        >
                          {tournamentData.totalPayout}
                        </div>
                      </div>
                    </div>
                    <Button
                      color="warning"
                      className="w-100"
                      style={{
                        backgroundColor: "#FFD600",
                        borderColor: "#FFD600",
                        color: "#101828",
                        fontWeight: 500,
                        fontSize: "14px",
                        borderRadius: "8px",
                      }}
                    >
                      Send to all →
                    </Button>
                  </CardBody>
                </Card>
              </div>
            </div>
          </Col>
        </Row>

        {/* Table */}
        <div className="mb-4">
          <Table responsive borderless className="mb-0">
            <thead>
              <tr
                style={{
                  backgroundColor: "#F9FAFB",
                  border: "1px solid #EAECF0",
                  borderRadius: "8px",
                }}
              >
                <th
                  style={{
                    padding: "12px 24px",
                    color: "#667085",
                    fontSize: "12px",
                    fontWeight: 500,
                    width: "24px",
                  }}
                >
                  <input type="checkbox" style={{ borderRadius: "4px" }} />
                </th>
                <th
                  style={{
                    padding: "12px 24px",
                    color: "#667085",
                    fontSize: "12px",
                    fontWeight: 500,
                  }}
                >
                  Member
                </th>
                <th
                  style={{
                    padding: "12px 24px",
                    color: "#667085",
                    fontSize: "12px",
                    fontWeight: 500,
                  }}
                >
                  Rank
                </th>
                <th
                  style={{
                    padding: "12px 24px",
                    color: "#667085",
                    fontSize: "12px",
                    fontWeight: 500,
                  }}
                >
                  Stats
                </th>
                <th
                  style={{
                    padding: "12px 24px",
                    color: "#667085",
                    fontSize: "12px",
                    fontWeight: 500,
                  }}
                >
                  Payouts
                </th>
                <th
                  style={{
                    padding: "12px 24px",
                    color: "#667085",
                    fontSize: "12px",
                    fontWeight: 500,
                    textAlign: "right",
                  }}
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {tournamentData.players.map((player) => (
                <tr
                  key={player.id}
                  style={{
                    border: "1px solid #EAECF0",
                    borderTop: "none",
                  }}
                >
                  <td style={{ padding: "16px 24px" }}>
                    <input type="checkbox" style={{ borderRadius: "4px" }} />
                  </td>
                  <td
                    style={{
                      padding: "16px 24px",
                      color: "#101828",
                      fontSize: "14px",
                      fontWeight: 500,
                    }}
                  >
                    {player.name}
                  </td>
                  <td
                    style={{
                      padding: "16px 24px",
                      color: "#101828",
                      fontSize: "14px",
                    }}
                  >
                    {player.rank}
                  </td>
                  <td
                    style={{
                      padding: "16px 24px",
                      color: "#101828",
                      fontSize: "14px",
                    }}
                  >
                    {player.stats}
                  </td>
                  <td
                    style={{
                      padding: "16px 24px",
                      color: "#101828",
                      fontSize: "14px",
                    }}
                  >
                    {player.payout}
                  </td>
                  <td
                    style={{
                      padding: "16px 24px",
                      textAlign: "right",
                    }}
                  >
                    <Button
                      color="warning"
                      size="sm"
                      style={{
                        backgroundColor: "#FFD600",
                        borderColor: "#FFD600",
                        borderRadius: "8px",
                        color: "#101828",
                        fontWeight: 500,
                        fontSize: "14px",
                        padding: "6px 12px",
                      }}
                    >
                      Send →
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>
    </AdminDashboardLayout>
  );
}
