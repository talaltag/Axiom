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
            fontSize: "20px",
            fontWeight: 500,
            color: "#101828",
          }}
        >
          Tournament Won
        </h3>

        {/* Tournament Won Section - Updated to match design */}
        <div className="mb-4">
          <h4 style={{ 
            fontSize: "16px", 
            fontWeight: 600,
            marginBottom: "16px" 
          }}>
            Tournament Won
          </h4>
          <div className="d-flex" style={{ gap: "12px" }}>
            {/* First column - Tournament Image */}
            <div style={{
              background: "#FFFFFF",
              borderRadius: "8px",
              boxShadow: "0px 1px 3px rgba(16, 24, 40, 0.1)",
              flex: "1",
              overflow: "hidden",
            }}>
              <div style={{ 
                height: "70px", 
                position: "relative" 
              }}>
                <Image
                  src="/admin/pubg-banner.jpg"
                  layout="fill"
                  objectFit="cover"
                  alt="Tournament Banner"
                />
              </div>
            </div>
            
            {/* Second column - Tournament Details */}
            <div style={{
              background: "#FFFFFF",
              borderRadius: "8px",
              boxShadow: "0px 1px 3px rgba(16, 24, 40, 0.1)",
              flex: "1",
              padding: "12px",
            }}>
              <div className="d-flex flex-column">
                <div style={{ 
                  fontSize: "14px", 
                  fontWeight: 500,
                  color: "#101828",
                  marginBottom: "8px" 
                }}>
                  PUBG - SUMMER CAMP
                </div>
                <div style={{ 
                  fontSize: "14px", 
                  color: "#667085" 
                }}>
                  5/22/2023
                </div>
                <div className="d-flex align-items-center" style={{ marginTop: "8px" }}>
                  <div style={{ 
                    fontSize: "14px",
                    color: "#344054",
                    marginRight: "6px" 
                  }}>
                    Winning Team
                  </div>
                  <div className="d-flex align-items-center">
                    <div style={{ 
                      width: "20px", 
                      height: "20px", 
                      backgroundColor: "#3538CD", 
                      borderRadius: "50%",
                      marginRight: "4px"
                    }}></div>
                    <span style={{
                      fontSize: "14px",
                      color: "#101828"
                    }}>Wolves</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Third column - Total Payouts */}
            <div style={{
              background: "#FFFFFF",
              borderRadius: "8px", 
              boxShadow: "0px 1px 3px rgba(16, 24, 40, 0.1)",
              flex: "1",
              padding: "12px 16px",
            }}>
              <div className="d-flex flex-column align-items-center justify-content-center h-100">
                <div className="d-flex align-items-center mb-2">
                  <div style={{ 
                    width: "24px", 
                    height: "24px", 
                    position: "relative",
                    marginRight: "8px"
                  }}>
                    <Image
                      src="/admin/medal-icon.svg"
                      layout="fill"
                      objectFit="contain"
                      alt="Medal"
                    />
                  </div>
                  <div style={{ 
                    fontSize: "14px",
                    color: "#344054",
                    fontWeight: 500
                  }}>
                    Total Payouts
                  </div>
                </div>
                <div style={{ 
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "#101828"
                }}>
                  $1,234
                </div>
                <button style={{
                  backgroundColor: "#FFD600",
                  border: "none",
                  borderRadius: "8px",
                  padding: "6px 12px",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#101828",
                  marginTop: "8px",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  Send to all
                  <Image 
                    src="/admin/arrow-right-black.svg" 
                    width={16} 
                    height={16} 
                    alt="Send" 
                    style={{ marginLeft: "4px" }}
                  />
                </button>
              </div>
            </div>
          </div>

                {/* Tournament Details */}
                <div className="px-4 py-3 d-flex flex-column justify-content-between">
                  <div className="d-flex align-items-center gap-2">
                    <h5 className="mb-0" style={{ 
                      fontSize: "16px", 
                      fontWeight: 600,
                      color: "#101828"
                    }}>
                      {tournamentData.tournament}
                    </h5>
                    <div style={{ 
                      width: "24px", 
                      height: "24px", 
                      position: "relative"
                    }}>
                      <Image
                        src="/admin/medal-icon.svg"
                        layout="fill"
                        objectFit="contain"
                        alt="Crown"
                      />
                    </div>
                  </div>

                  <div style={{ 
                    fontSize: "14px", 
                    color: "#667085",
                    margin: "6px 0" 
                  }}>
                    {tournamentData.date}
                  </div>

                  <div className="d-flex align-items-center gap-2" style={{ 
                    fontSize: "14px", 
                    color: "#344054",
                    fontWeight: 500
                  }}>
                    <span>Winning Team</span>
                    <div className="d-flex align-items-center" style={{ 
                      backgroundColor: "#F9FAFB", 
                      borderRadius: "50%",
                      width: "20px",
                      height: "20px",
                      justifyContent: "center"
                    }}>
                      <div style={{ 
                        width: "14px", 
                        height: "14px", 
                        borderRadius: "50%", 
                        backgroundColor: "#344054" 
                      }}></div>
                    </div>
                    <span>{tournamentData.winningTeam}</span>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col md={4}>
            <div style={{ 
              width: "280px",
              backgroundColor: "#fff",
              borderRadius: "8px",
              boxShadow: "0px 1px 3px rgba(16, 24, 40, 0.1)",
              padding: "20px"
            }}>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div style={{ 
                  width: "40px", 
                  height: "40px", 
                  position: "relative"
                }}>
                  <Image
                    src="/admin/medal-icon.svg"
                    layout="fill"
                    objectFit="contain"
                    alt="Medal"
                  />
                </div>
                <div className="text-end">
                  <div style={{ 
                    fontSize: "14px", 
                    color: "#667085"
                  }}>
                    Total Payouts
                  </div>
                  <div style={{ 
                    fontSize: "24px", 
                    fontWeight: 600, 
                    color: "#101828"
                  }}>
                    {tournamentData.totalPayout}
                  </div>
                </div>
              </div>
              <Button
                color="warning"
                block
                style={{
                  backgroundColor: "#FFD600",
                  border: "none",
                  color: "#101828",
                  fontWeight: 500,
                  borderRadius: "8px",
                  padding: "8px 16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px"
                }}
              >
                Send to all →
              </Button>
            </div>
          </Col>
          <Col md={4}></Col> {/* Empty Column for spacing */}
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