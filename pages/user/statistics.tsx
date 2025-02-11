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
import { PieChart, Pie, ResponsiveContainer } from "recharts";

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

  const lineChartData = {
    options: {
      chart: {
        type: "line",
        height: 350,
        toolbar: {
          show: false,
        },
        background: "transparent",
      },
      stroke: {
        curve: "smooth",
        width: 2,
      },
      colors: ["#F8CA15", "#FFB547", "#8B4513"],
      grid: {
        borderColor: "#EAECF0",
        strokeDashArray: 4,
        xaxis: {
          lines: {
            show: true,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
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
          "Oct",
          "Nov",
          "Dec",
        ],
        labels: {
          style: {
            colors: "#667085",
            fontSize: "12px",
            fontWeight: 400,
          },
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        min: 0,
        max: 100,
        tickAmount: 5,
        labels: {
          style: {
            colors: "#667085",
            fontSize: "12px",
            fontWeight: 400,
          },
          formatter: (value) => `${value}%`,
        },
      },
      legend: {
        show: true,
        position: "top",
        horizontalAlign: "right",
        labels: {
          colors: "#101828",
        },
      },
      dataLabels: {
        enabled: false,
      },
      markers: {
        size: 0,
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.1,
          opacityTo: 0,
          stops: [0, 95.55],
          colorStops: [
            {
              offset: 0,
              color: "#F8CA15",
              opacity: 0.1,
            },
            {
              offset: 95.55,
              color: "#F8CA15",
              opacity: 0,
            },
          ],
        },
      },
      colors: ["#F8CA15"],
    },
    series: [
      {
        name: "Total Tournaments participated in",
        data: [38, 40, 45, 48, 50, 55, 60, 65, 68, 72, 75, 80],
      },
      {
        name: "Total Tournament Wins",
        data: [30, 35, 38, 40, 45, 48, 50, 52, 55, 58, 60, 62],
      },
      {
        name: "Total Tournament Losses",
        data: [15, 18, 20, 25, 28, 30, 35, 38, 40, 42, 45, 48],
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
          <Col md={6}>
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
          <Col md={6}>
            <Card
              className="border-0"
              style={{
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.05)",
                borderRadius: "12px",
                backgroundColor: "#FAFBFC",
                height: "100%",
              }}
            >
              <CardBody style={{ padding: "32px" }}>
                <div style={{ marginBottom: "50px" }}>
                  <h6
                    style={{
                      fontSize: "16px",
                      fontWeight: 500,
                      color: "#101828",
                      marginBottom: "8px",
                    }}
                  >
                    Winning Percentage
                  </h6>
                  <div style={{ height: "1px", backgroundColor: "#EAECF0" }} />
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <div
                    style={{
                      width: "240px",
                      height: "240px",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={[
                              { name: "Wins", value: 100, fill: "#A48610" },
                              { name: "Losses", value: 40, fill: "#E1E1E1" },
                            ]}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            startAngle={360}
                            endAngle={0}
                            stroke="none"
                          />
                          <Pie
                            data={[
                              { name: "Games", value: 75, fill: "#F8CA15" },
                              {
                                name: "Tournaments",
                                value: 25,
                                fill: "#E1E1E1",
                              },
                            ]}
                            cx="50%"
                            cy="50%"
                            innerRadius={85}
                            outerRadius={105}
                            startAngle={360}
                            endAngle={0}
                            stroke="none"
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
                  </div>
                  <div style={{ marginLeft: "10px", flex: 1 }}>
                    <Row className="g-4 text-nowrap">
                      <Col xs={6} className="mb-4">
                        <div className="d-flex align-items-center gap-2">
                          <div
                            style={{
                              width: "8px",
                              height: "8px",
                              borderRadius: "50%",
                              backgroundColor: "#FFD600",
                              boxShadow: "0 0 0 2px rgba(255, 214, 0, 0.2)",
                            }}
                          />
                          <div className="d-flex flex-column">
                            <span
                              style={{ color: "#344054", fontSize: "14px" }}
                            >
                              Total Wins
                            </span>
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
                        </div>
                      </Col>
                      <Col xs={6} className="mb-4">
                        <div className="d-flex align-items-center gap-2">
                          <div
                            style={{
                              width: "8px",
                              height: "8px",
                              borderRadius: "50%",
                              backgroundColor: "#8B4513",
                              boxShadow: "0 0 0 2px rgba(139, 69, 19, 0.2)",
                            }}
                          />
                          <div className="d-flex flex-column">
                            <span
                              style={{ color: "#344054", fontSize: "14px" }}
                            >
                              Total Losses
                            </span>
                            <span
                              style={{
                                color: "#101828",
                                fontSize: "16px",
                                fontWeight: "600",
                              }}
                            >
                              130
                            </span>
                          </div>
                        </div>
                      </Col>
                      <Col xs={6}>
                        <div className="d-flex align-items-center gap-2">
                          <div
                            style={{
                              width: "8px",
                              height: "8px",
                              borderRadius: "50%",
                              backgroundColor: "#F2F4F7",
                              boxShadow: "0 0 0 2px rgba(242, 244, 247, 0.4)",
                            }}
                          />
                          <div className="d-flex flex-column">
                            <span
                              style={{ color: "#344054", fontSize: "14px" }}
                            >
                              Total Games Played
                            </span>
                            <span
                              style={{
                                color: "#101828",
                                fontSize: "16px",
                                fontWeight: "600",
                              }}
                            >
                              24
                            </span>
                          </div>
                        </div>
                      </Col>
                      <Col xs={6}>
                        <div className="d-flex align-items-center gap-2">
                          <div
                            style={{
                              width: "8px",
                              height: "8px",
                              borderRadius: "50%",
                              backgroundColor: "#E4E7EC",
                              boxShadow: "0 0 0 2px rgba(228, 231, 236, 0.4)",
                            }}
                          />
                          <div className="d-flex flex-column">
                            <span
                              style={{ color: "#344054", fontSize: "14px" }}
                            >
                              Total Tournaments
                            </span>
                            <span
                              style={{
                                color: "#101828",
                                fontSize: "16px",
                                fontWeight: "600",
                              }}
                            >
                              12
                            </span>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={12}>
            <Card className="border-0 shadow-sm">
              <CardBody style={{ padding: "24px" }}>
                <div className="d-flex justify-content-between">
                  <div className="flex-grow-1">
                    <div className="mb-4">
                      <h6
                        style={{
                          fontSize: "16px",
                          fontWeight: 500,
                          color: "#101828",
                          marginBottom: "4px",
                        }}
                      >
                        Tournament Stats
                      </h6>
                      <div
                        style={{ height: "1px", backgroundColor: "#EAECF0" }}
                      />
                    </div>
                    <Chart
                      options={lineChartData.options}
                      series={lineChartData.series}
                      type="area"
                      height={350}
                    />
                  </div>
                  <div
                    className="d-flex flex-column gap-4"
                    style={{ width: "250px", paddingLeft: "24px" }}
                  >
                    <div
                      style={{
                        padding: "6px 12px",
                        backgroundColor: "#F9FAFB",
                        borderRadius: "8px",
                        fontSize: "14px",
                        color: "#344054",
                        cursor: "pointer",
                        textAlign: "center",
                      }}
                    >
                      Month{" "}
                      <i
                        className="fas fa-chevron-down"
                        style={{ fontSize: "10px", marginLeft: "6px" }}
                      ></i>
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: "14px",
                          color: "#FFD600",
                          marginBottom: "4px",
                        }}
                      >
                        Total Tournaments participated in
                      </div>
                      <div
                        style={{
                          fontSize: "24px",
                          fontWeight: 600,
                          color: "#101828",
                        }}
                      >
                        1,230
                      </div>
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: "14px",
                          color: "#12B76A",
                          marginBottom: "4px",
                        }}
                      >
                        Total Tournament Wins
                      </div>
                      <div
                        style={{
                          fontSize: "24px",
                          fontWeight: 600,
                          color: "#101828",
                        }}
                      >
                        24
                      </div>
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: "14px",
                          color: "#F04438",
                          marginBottom: "4px",
                        }}
                      >
                        Total Tournament Losses
                      </div>
                      <div
                        style={{
                          fontSize: "24px",
                          fontWeight: 600,
                          color: "#101828",
                        }}
                      >
                        24
                      </div>
                    </div>
                  </div>
                </div>
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
