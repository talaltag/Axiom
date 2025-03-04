"use client";

import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Nav,
  NavItem,
  NavLink,
  Table,
  Badge,
} from "reactstrap";
import Image from "next/image";
import { RegistrationData } from "../../pages/user/dashboard/confirm/[team_id]";
import { positionToRank, totalCountInArray } from "../../utils/helper";

interface CompletedTournamentProps {
  data: RegistrationData;
}

export default function CompletedTournamentDetail(
  props: CompletedTournamentProps
) {
  const { data } = props;
  const [activeTab, setActiveTab] = useState("leaderboard");
  return (
    <Container fluid className="confirm-container">
      {/* Navigation Tabs */}
      <Nav tabs className="mb-4 gap-2">
        {["Leaderboard", "Rules", "Payout", "Scoring"].map((tab) => (
          <NavItem key={tab}>
            <NavLink
              className={`cursor-pointer ${
                activeTab === tab.toLowerCase()
                  ? "active bg-[#f8ca15] text-black"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTab(tab.toLowerCase())}
            >
              {tab}
            </NavLink>
          </NavItem>
        ))}
      </Nav>

      <Card className="bg-transparent shadow-none border-0">
        <CardBody className="px-0">
          {activeTab === "leaderboard" && (
            <Table dark responsive className="mb-0 text-white ">
              <thead>
                <tr className="text-[#7a798a]">
                  <th>Team Name</th>
                  <th>Total Kills</th>
                  <th>Total Deaths</th>
                  <th>Total Placement</th>
                  <th>Total Score</th>
                  <th>Tournament Score</th>
                </tr>
              </thead>
              <tbody>
                {data?.leads?.map((row: any) => (
                  <tr key={row.ranking}>
                    <td>
                      <div className="flex items-center gap-3">
                        <span className="me-2">{row.ranking}</span>
                        <Image
                          src="/leader-icon.png?height=32&width=32"
                          alt="Team Logo"
                          width={55}
                          height={30}
                          className="rounded-full me-2"
                        />
                        {row.team.name}
                      </div>
                    </td>
                    <td>
                      {totalCountInArray(row.stats, "kills").toLocaleString()}
                    </td>
                    <td>
                      {totalCountInArray(row.stats, "deaths").toLocaleString()}
                    </td>
                    <td>0</td>
                    <td>{row.totalScore.toLocaleString()}</td>
                    <td>{row.totalScore.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
          {activeTab === "rules" && (
            <div
              dangerouslySetInnerHTML={{
                __html: data?.tournament?.description,
              }}
            ></div>
          )}
          {activeTab === "payout" && (
            <div>
              {data.tournament.prizeSplit.map((prize, index) => (
                <div
                  key={index}
                  className="d-flex justify-content-between mb-3"
                >
                  <span style={{ fontSize: "14px", color: "#101828" }}>
                    {positionToRank(index + 1)} Winner
                  </span>
                  <span
                    style={{
                      fontSize: "14px",
                      color: "#101828",
                      fontWeight: 500,
                    }}
                  >
                    ${prize}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardBody>
      </Card>
    </Container>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-[#7a798a]">{label}</span>
      <span>{value}</span>
    </div>
  );
}
