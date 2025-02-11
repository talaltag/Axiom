"use client";
import { useEffect, useState } from "react";
import { DollarSign, CreditCard, Award } from "react-feather";
import dynamic from "next/dynamic";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Table,
  Badge,
  Progress,
} from "reactstrap";
import UserDashboardLayout from "../../components/layouts/UserDashboardLayout";
import { PieChart, Pie, ResponsiveContainer } from "recharts"; // Added Recharts imports

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function Statistics() {
  const barChartData = {
    options: {
      chart: {
        type: "bar",
        height: 300,
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
        },
      },
      dataLabels: {
        enabled: false,
      },
      title: {
        text: "",
      },
      fill: {
        opacity: 1,
      },
      stroke: {
        show: true,
        curve: "straight",
        lineCap: "butt",
        colors: ["#E1E1E1"],
        width: 2,
        dashArray: 0,
      },
      colors: ["#FFD700"],
      xaxis: {
        categories: [
          "JAN",
          "FEB",
          "MAR",
          "APR",
          "MAY",
          "JUN",
          "JUL",
          "AUG",
          "SEP",
          "OCT",
          "NOV",
          "DEC",
        ],
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
    series: [
      {
        name: "Gaming Time",
        data: [20, 30, 25, 45, 35, 30, 35, 20, 40, 60, 90, 110],
        zIndex: 2,
      },
    ],
  };

  const donutChartData = {
    options: {
      chart: {
        type: "donut",
        background: "transparent",
      },
      colors: ["#FFD600", "#EAECF0"],
      labels: ["Won", "Lost"],
      plotOptions: {
        pie: {
          donut: {
            size: "90%",
            labels: {
              show: true,
              name: {
                show: false,
              },
              value: {
                show: true,
                fontSize: "24px",
                fontWeight: 600,
                color: "#101828",
                offsetY: 0,
              },
              total: {
                show: false,
              },
            },
          },
        },
      },
      stroke: {
        width: 0,
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
    },
    series: [98, 2],
  };

  const lineChartData = {
    options: {
      chart: {
        type: "line",
        height: 350,
        toolbar: {
          show: false,
        },
        dropShadow: {
          enabled: true,
          top: 0,
          left: 0,
          blur: 10,
          opacity: 0.1,
        },
      },
      stroke: {
        curve: "smooth",
        width: 2,
      },
      colors: ["#FFD700"],
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "vertical",
          shadeIntensity: 0.5,
          gradientToColors: ["#FFFFFF"],
          inverseColors: false,
          opacityFrom: 0.8,
          opacityTo: 0.1,
          stops: [0, 100],
        },
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
        ],
      },
      legend: {
        show: false,
      },
    },
    series: [
      {
        name: "Team A",
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
      },
      {
        name: "Team B",
        data: [20, 35, 40, 45, 50, 55, 65, 85, 100],
      },
      {
        name: "Team C",
        data: [15, 25, 30, 35, 40, 45, 55, 75, 90],
      },
    ],
  };

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
            <Card
              className="border-0"
              style={{
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.05)",
                borderRadius: "12px",
                backgroundColor: "transparent",
              }}
            >
              <CardBody
                className="chart-card-body"
                style={{
                  backgroundColor: "#FAFBFC",
                  borderRadius: "12px",
                  padding: "0",
                }}
              >
                <div style={{ padding: "14px 24px 0 24px" }}>
                  <div
                    className="d-flex justify-content-between align-items-center"
                    style={{
                      borderBottom: "1px solid #EAECF0",
                      paddingBottom: "16px",
                    }}
                  >
                    <div className="d-flex align-items-center gap-2">
                      <h6
                        style={{
                          fontSize: "16px",
                          fontWeight: 500,
                          color: "#101828",
                          margin: 0,
                        }}
                      >
                        Gaming time
                      </h6>
                      <span style={{ color: "#7A798A", marginLeft: "10px" }}>
                        Daily Average
                      </span>
                      <span
                        style={{
                          fontSize: "14px",
                          color: "#12B76A",
                          margin: 0,
                        }}
                      >
                        2 Hrs. 25 min
                      </span>
                    </div>
                    <div
                      style={{
                        padding: "6px 10px",
                        borderRadius: "6px",
                        backgroundColor: "transparent",
                        cursor: "pointer",
                        fontSize: "14px",
                        color: "#344054",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      Month
                      <i
                        className="fas fa-chevron-down"
                        style={{ fontSize: "10px" }}
                      ></i>
                    </div>
                  </div>
                </div>
                <Chart
                  options={barChartData.options}
                  series={barChartData.series}
                  type="bar"
                  height={350}
                />
              </CardBody>
            </Card>
          </Col>
          <Col md={4}>
            <Card
              className="border-0"
              style={{
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.05)",
                borderRadius: "12px",
              }}
            >
              <CardBody style={{ padding: "24px", backgroundColor: "#FFFFFF", borderRadius: "12px", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)" }}>
                <h6
                  style={{
                    fontSize: "16px",
                    fontWeight: 500,
                    color: "#101828",
                    marginBottom: "32px",
                  }}
                >
                  Winning Percentage
                </h6>
                <div className="d-flex" style={{ gap: "40px" }}>
                  <div style={{ position: "relative", width: "45%", height: 180 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { name: "Wins", value: 100, fill: "#F8CA15" },
                            { name: "Losses", value: 40, fill: "#E1E1E1" },
                          ]}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          startAngle={360}
                          endAngle={0}
                          style={{
                            filter: "drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.10))"
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      textAlign: "center",
                    }}
                  >
                    <div style={{ color: "#667085", fontSize: "14px" }}>
                      Total
                    </div>
                    <div
                      style={{
                        color: "#101828",
                        fontSize: "28px",
                        fontWeight: 600,
                      }}
                    >
                      98%
                    </div>
                  </div>
                </div>
                <div className="stats-details" style={{ width: "55%", paddingLeft: "24px" }}>
                  <div style={{ 
                    backgroundColor: "#F9FAFB", 
                    padding: "20px", 
                    borderRadius: "8px",
                    boxShadow: "0px 1px 3px rgba(16, 24, 40, 0.1)"
                  }}>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <div className="d-flex align-items-center gap-2">
                        <div
                          style={{
                            width: "8px",
                            height: "8px",
                            borderRadius: "50%",
                            backgroundColor: "#F8CA15",
                            flexShrink: 0,
                          }}
                        ></div>
                        <span
                          style={{
                            color: "#344054",
                            fontSize: "14px",
                            fontWeight: "500",
                          }}
                        >
                          Total Wins
                        </span>
                      </div>
                      <span
                        style={{
                          color: "#101828",
                          fontSize: "16px",
                          fontWeight: "600",
                        }}
                      >
                        1,230
                      </span>
                    </div>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="d-flex align-items-center gap-2">
                      <div
                        style={{
                          width: "8px",
                          height: "8px",
                          borderRadius: "50%",
                          backgroundColor: "#8B4513",
                          flexShrink: 0,
                        }}
                      ></div>
                      <span
                        style={{
                          color: "#344054",
                          fontSize: "14px",
                          fontWeight: "400",
                        }}
                      >
                        Total Losses
                      </span>
                    </div>
                    <span
                      style={{
                        color: "#101828",
                        fontSize: "14px",
                        fontWeight: "500",
                      }}
                    >
                      130
                    </span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <div className="d-flex align-items-center gap-2">
                      <span
                        style={{
                          width: "8px",
                          height: "8px",
                          borderRadius: "50%",
                          backgroundColor: "#F2F4F7",
                        }}
                      ></span>
                      <span
                        style={{
                          color: "#667085",
                          fontSize: "14px",
                          fontWeight: "400",
                        }}
                      >
                        Total Games Played
                      </span>
                    </div>
                    <span
                      style={{
                        color: "#344054",
                        fontSize: "14px",
                        fontWeight: "500",
                      }}
                    >
                      24
                    </span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center gap-2">
                      <span
                        style={{
                          width: "8px",
                          height: "8px",
                          borderRadius: "50%",
                          backgroundColor: "#E4E7EC",
                        }}
                      ></span>
                      <span
                        style={{
                          color: "#667085",
                          fontSize: "14px",
                          fontWeight: "400",
                        }}
                      >
                        Total Tournaments participated in
                      </span>
                    </div>
                    <span
                      style={{
                        color: "#344054",
                        fontSize: "14px",
                        fontWeight: "500",
                      }}
                    >
                      12
                    </span>
                  </div>
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
