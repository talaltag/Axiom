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
import { totalCountInArray } from "../../utils/helper";

interface CompletedTournamentProps {
  data: RegistrationData;
}

export default function CompletedTournamentDetail(
  props: CompletedTournamentProps
) {
  const { data } = props;
  const [activeTab, setActiveTab] = useState("leaderboard");
  console.log(data);
  return (
    <Container fluid className="confirm-container">
      {/* Navigation Tabs */}
      <Nav tabs className="mb-4 gap-2">
        {["Leaderboard", "Info", "Rules", "Payout", "Scoring"].map((tab) => (
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

      <Card className="text-white bg-transparent shadow-none border-0">
        <CardBody className="px-0">
          <Table dark responsive className="mb-0">
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
