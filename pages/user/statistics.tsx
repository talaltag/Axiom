"use client";
import React from "react";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import UserDashboardLayout from "../../components/layouts/UserDashboardLayout";
import dynamic from "next/dynamic";
import { ResponsiveContainer, PieChart, Pie } from "recharts";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function Statistics() {
  const barChartData = {
    options: {
      chart: {
        type: "bar",
        height: 350,
        toolbar: { show: false },
        background: "#FAFBFC",
        fontFamily: "Inter, sans-serif",
      },
      grid: {
        show: false,
      },
      plotOptions: {
        bar: {
          columnWidth: 13.87,
          borderRadius: 7,
          colors: {
            backgroundBarColors: ["#E1E1E1"],
            backgroundBarOpacity: 0.5,
            backgroundBarRadius: 7,
          },
          dataLabels: {
            position: "top",
            enabled: false
          }
        },
      },
      title: {
        text: "Gaming time",
      },
      fill: {
        type: "gradient",
        gradient: {
          type: "vertical",
          shadeIntensity: 0.8,
          gradientToColors: ["rgba(248, 202, 21, 0)"],
          inverseColors: false,
          opacityFrom: 0.8,
          opacityTo: 0,
          stops: [48.49, 282.14]
        }
      },
      colors: ["#FFD700"],
      xaxis: {
        categories: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
        labels: {
          style: {
            fontSize: "12px",
            fontWeight: 400,
            colors: "#667085",
            fontFamily: "Inter, sans-serif",
          },
        },
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      yaxis: {
        min: 0,
        max: 120,
        tickAmount: 4,
      },
    },
    series: [{
      name: "Gaming Time",
      data: [20, 30, 25, 45, 35, 30, 35, 20, 40, 60, 90, 110],
    }],
  };

  const data = [
    { name: "Total Wins", value: 1230, color: "#FFD600" },
    { name: "Total Losses", value: 130, color: "#8B4513" },
    { name: "Total Games Played", value: 24, color: "#F2F4F7" },
    { name: "Total Tournaments", value: 12, color: "#E4E7EC" }
  ];

  const tournamentHistory = [
    { name: "Vanguard Royale", id: 22, amount: "$150", status: "Completed" },
    { name: "Vanguard Royale", id: 21, amount: "$150", status: "Completed" },
    { name: "Vanguard Royale", id: 20, amount: "$150", status: "Completed" },
    { name: "Vanguard Royale", id: 19, amount: "$150", status: "Completed" },
    { name: "Vanguard Royale", id: 18, amount: "$150", status: "Declined" },
    { name: "Vanguard Royale", id: 17, amount: "$150", status: "Declined" },
  ];

  return (
    <UserDashboardLayout>
      <Container fluid className="p-4">
        <Row className="mb-4">
          <Col md={8}>
            <Card className="border-0" style={{ boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.05)", borderRadius: "12px" }}>
              <CardBody className="p-0" style={{ backgroundColor: "#FAFBFC", borderRadius: "12px" }}>
                <div style={{ padding: "14px 24px 0 24px" }}>
                  <div className="d-flex justify-content-between align-items-center" style={{ borderBottom: "1px solid #EAECF0", paddingBottom: "16px" }}>
                    <div className="d-flex align-items-center gap-2">
                      <h6 style={{ fontSize: "16px", fontWeight: 500, color: "#101828", margin: 0 }}>Gaming time</h6>
                      <span style={{ color: "#7A798A", marginLeft: "10px" }}>Daily Average</span>
                      <span style={{ fontSize: "14px", color: "#12B76A", margin: 0 }}>2 Hrs. 25 min</span>
                    </div>
                    <div style={{ padding: "6px 10px", borderRadius: "6px", backgroundColor: "transparent", cursor: "pointer", fontSize: "14px", color: "#344054", display: "flex", alignItems: "center", gap: "6px" }}>
                      Month
                      <i className="fas fa-chevron-down" style={{ fontSize: "10px" }}></i>
                    </div>
                  </div>
                </div>
                <Chart options={barChartData.options} series={barChartData.series} type="bar" height={350} />
              </CardBody>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="border-0" style={{ boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.05)", borderRadius: "12px" }}>
              <CardBody style={{ padding: "24px" }}>
                <h6 style={{ fontSize: "16px", fontWeight: 500, color: "#101828", marginBottom: "24px" }}>
                  Winning Percentage
                </h6>
                <div style={{ position: "relative", width: "100%", height: 200 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[{ value: 98 }, { value: 2 }]}
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#FFD600"
                        startAngle={90}
                        endAngle={-270}
                      />
                      <Pie
                        data={[{ value: 75 }, { value: 25 }]}
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                        innerRadius={85}
                        outerRadius={105}
                        fill="#FFA500"
                        startAngle={90}
                        endAngle={-270}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center" }}>
                    <div style={{ color: "#667085", fontSize: "14px" }}>Total</div>
                    <div style={{ color: "#101828", fontSize: "28px", fontWeight: 600 }}>98%</div>
                  </div>
                </div>
                <div className="mt-4 pt-2">
                  {data.map((item, index) => (
                    <div key={index} className="d-flex justify-content-between align-items-center mb-3">
                      <div className="d-flex align-items-center gap-2">
                        <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: item.color }}></div>
                        <span style={{ color: "#344054", fontSize: "14px", fontWeight: "400" }}>{item.name}</span>
                      </div>
                      <span style={{ color: "#101828", fontSize: "14px", fontWeight: "500" }}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col md={12}>
            <Card className="border-0 shadow-sm">
              <CardBody>
                <h6 className="mb-4">Tournament Group Stats</h6>
                <Chart
                  options={lineChartData.options}
                  series={lineChartData.series}
                  type="line"
                  height={350}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col md={4}>
            <Card className="border-0 shadow-sm bg-white text-dark p-4">
              <div className="d-flex align-items-center mb-3">
                <div className="bg-light rounded p-3 me-3">
                  <DollarSign size={24} className="text-warning" />
                </div>
                <div>
                  <small className="text-muted">Total Earnings</small>
                  <h4 className="mb-0">$2000</h4>
                </div>
              </div>
              <small className="text-success">+15% from last month</small>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="border-0 shadow-sm bg-white text-dark p-4">
              <div className="d-flex align-items-center mb-3">
                <div className="bg-light rounded p-3 me-3">
                  <CreditCard size={24} className="text-warning" />
                </div>
                <div>
                  <small className="text-muted">Prize Money</small>
                  <h4 className="mb-0">$2000</h4>
                </div>
              </div>
              <small className="text-success">+10% from last month</small>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="border-0 shadow-sm bg-white text-dark p-4">
              <div className="d-flex align-items-center mb-3">
                <div className="bg-light rounded p-3 me-3">
                  <Award size={24} className="text-warning" />
                </div>
                <div>
                  <small className="text-muted">Tournaments Played</small>
                  <h4 className="mb-0">12</h4>
                </div>
              </div>
              <small className="text-success">4 wins this month</small>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Card className="border-0 shadow-sm">
              <CardBody>
                <h6 className="mb-4">Tournament History</h6>
                <div className="table-responsive">
                  <Table className="align-middle">
                    <thead>
                      <tr>
                        <th>Tournament</th>
                        <th>Tournament ID</th>
                        <th>Amount</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tournamentHistory.map((tournament, index) => (
                        <tr key={index}>
                          <td>{tournament.name}</td>
                          <td>{tournament.id}</td>
                          <td>{tournament.amount}</td>
                          <td>
                            <Badge
                              color={
                                tournament.status === "Completed"
                                  ? "success"
                                  : "danger"
                              }
                              className="rounded-pill"
                            >
                              {tournament.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  <div className="d-flex justify-content-between align-items-center mt-4">
                    <div className="d-flex">
                      <button className="btn btn-warning btn-sm me-2">1</button>
                      {[2, 3, 4, 5].map((page) => (
                        <button
                          key={page}
                          className="btn btn-light btn-sm me-2"
                        >
                          {page}
                        </button>
                      ))}
                      <button className="btn btn-light btn-sm">...</button>
                    </div>
                    <div>
                      <small className="text-muted">1-20 of 320 entries</small>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </UserDashboardLayout>
  );
}