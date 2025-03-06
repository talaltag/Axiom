
import React from "react";
import Image from "next/image";
import { Row, Col, Card, CardBody, Button } from "reactstrap";

interface TournamentWonCardProps {
  tournamentName: string;
  tournamentDate: string;
  winningTeam: string;
  teamLogo: string;
  payoutAmount: string;
  tournamentImage: string;
  onSendPayout?: () => void;
}

const TournamentWonCard: React.FC<TournamentWonCardProps> = ({
  tournamentName,
  tournamentDate,
  winningTeam,
  teamLogo,
  payoutAmount,
  tournamentImage,
  onSendPayout
}) => {
  return (
    <Card className="mb-4 border-0" style={{ boxShadow: "0px 1px 3px rgba(16, 24, 40, 0.1)", overflow: "hidden", borderRadius: "8px" }}>
      <CardBody className="p-0">
        <Row className="g-0">
          {/* First column: Tournament Image */}
          <Col xs={12} md={3} style={{ maxHeight: "100px" }}>
            <div style={{ position: "relative", height: "100%", minHeight: "100px" }}>
              <Image
                src={tournamentImage}
                alt={tournamentName}
                layout="fill"
                objectFit="cover"
              />
            </div>
          </Col>

          {/* Second column: Tournament Info */}
          <Col xs={12} md={5} className="d-flex align-items-center">
            <div className="p-3">
              <div className="d-flex justify-content-between">
                <div>
                  <h6 className="mb-1" style={{ color: "#101828", fontSize: "14px", fontWeight: "500" }}>
                    {tournamentName}
                  </h6>
                  <p className="mb-2" style={{ color: "#667085", fontSize: "12px" }}>
                    {tournamentDate}
                  </p>
                  <div className="d-flex align-items-center">
                    <span style={{ color: "#344054", fontSize: "12px", marginRight: "8px" }}>
                      Winning Team
                    </span>
                    <div className="d-flex align-items-center">
                      <div style={{ width: "20px", height: "20px", borderRadius: "50%", overflow: "hidden", marginRight: "4px" }}>
                        <Image
                          src={teamLogo}
                          alt={winningTeam}
                          width={20}
                          height={20}
                        />
                      </div>
                      <span style={{ color: "#101828", fontSize: "12px", fontWeight: "500" }}>
                        {winningTeam}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <div style={{ width: "24px", height: "24px" }}>
                    <Image
                      src="/admin/crown-icon.svg"
                      alt="Winner"
                      width={24}
                      height={24}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Col>

          {/* Third column: Payout */}
          <Col xs={12} md={4} className="d-flex align-items-center">
            <div className="p-3 w-100">
              <div className="d-flex align-items-center mb-1">
                <div style={{ width: "20px", height: "20px", marginRight: "8px" }}>
                  <Image
                    src="/admin/medal-icon.svg"
                    alt="Medal"
                    width={20}
                    height={20}
                  />
                </div>
                <span style={{ color: "#344054", fontSize: "12px" }}>
                  Total Payouts
                </span>
              </div>
              <h6 className="mb-2" style={{ color: "#101828", fontSize: "16px", fontWeight: "600" }}>
                ${payoutAmount}
              </h6>
              <Button
                color="warning"
                size="sm"
                className="w-100"
                onClick={onSendPayout}
                style={{ 
                  backgroundColor: "#FFD600", 
                  border: "none", 
                  color: "#101828", 
                  fontSize: "12px",
                  fontWeight: "500",
                  padding: "6px 12px"
                }}
              >
                <div className="d-flex justify-content-center align-items-center">
                  <span>Send to all</span>
                  <div style={{ width: "16px", height: "16px", marginLeft: "4px" }}>
                    <Image
                      src="/admin/arrow-right-black.svg"
                      alt="Arrow right"
                      width={16}
                      height={16}
                    />
                  </div>
                </div>
              </Button>
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default TournamentWonCard;
