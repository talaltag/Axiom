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
                      <div className="d-flex align-items-center gap-2">
                        <div
                          style={{
                            width: "8px",
                            height: "8px",
                            borderRadius: "50%",
                            backgroundColor: "#FFD600",
                          }}
                        />
                        <div
                          style={{
                            fontSize: "14px",
                            color: "#344054",
                            marginBottom: "8px",
                          }}
                        >
                          Total Tournaments participated in
                        </div>
                      </div>
                      <div
                        style={{
                          fontSize: "32px",
                          fontWeight: 700,
                          color: "#101828",
                          lineHeight: "1.2",
                        }}
                      >
                        1,230
                      </div>
                    </div>
                    <div>
                      <div className="d-flex align-items-center gap-2">
                        <div
                          style={{
                            width: "8px",
                            height: "8px",
                            borderRadius: "50%",
                            backgroundColor: "#12B76A",
                          }}
                        />
                        <div
                          style={{
                            fontSize: "14px",
                            color: "#344054",
                            marginBottom: "8px",
                          }}
                        >
                          Total Tournament Wins
                        </div>
                      </div>
                      <div
                        style={{
                          fontSize: "32px",
                          fontWeight: 700,
                          color: "#101828",
                          lineHeight: "1.2",
                        }}
                      >
                        24
                      </div>
                    </div>
                    <div>
                      <div className="d-flex align-items-center gap-2">
                        <div
                          style={{
                            width: "8px",
                            height: "8px",
                            borderRadius: "50%",
                            backgroundColor: "#F04438",
                          }}
                        />
                        <div
                          style={{
                            fontSize: "14px",
                            color: "#344054",
                            marginBottom: "8px",
                          }}
                        >
                          Total Tournament Losses
                        </div>
                      </div>
                      <div
                        style={{
                          fontSize: "32px",
                          fontWeight: 700,
                          color: "#101828",
                          lineHeight: "1.2",
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
            <Card
              className="border-0 shadow-sm"
              style={{ padding: "24px", borderRadius: "12px" }}
            >
              <CardBody style={{ padding: "0" }}>
                <div>
                  <h6
                    style={{
                      color: "#344054",
                      fontSize: "14px",
                      marginBottom: "8px",
                    }}
                  >
                    Cash Won{" "}
                    <span style={{ color: "#667085", fontSize: "12px" }}>
                      Total Cash
                    </span>
                  </h6>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h3
                        style={{
                          color: "#101828",
                          fontSize: "30px",
                          fontWeight: "600",
                          marginBottom: "8px",
                        }}
                      >
                        $2000
                      </h3>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <span style={{ color: "#667085", fontSize: "14px" }}>
                          $1000
                        </span>
                        <span style={{ color: "#667085", fontSize: "14px" }}>
                          Last Win
                        </span>
                      </div>
                    </div>
                    <div
                      style={{
                        width: "48px",
                        height: "48px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src="/uploads/Card.png"
                        alt="Cash"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col md={4}>
            <Card
              className="border-0 shadow-sm"
              style={{ padding: "24px", borderRadius: "12px" }}
            >
              <CardBody style={{ padding: "0" }}>
                <div>
                  <h6
                    style={{
                      color: "#344054",
                      fontSize: "14px",
                      marginBottom: "8px",
                    }}
                  >
                    Credits Won{" "}
                    <span style={{ color: "#667085", fontSize: "12px" }}>
                      Total Credits
                    </span>
                  </h6>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h3
                        style={{
                          color: "#101828",
                          fontSize: "30px",
                          fontWeight: "600",
                          marginBottom: "8px",
                        }}
                      >
                        $2000
                      </h3>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <span style={{ color: "#667085", fontSize: "14px" }}>
                          $1000
                        </span>
                        <span style={{ color: "#667085", fontSize: "14px" }}>
                          Last Win
                        </span>
                      </div>
                    </div>
                    <div
                      style={{
                        width: "48px",
                        height: "48px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src="/uploads/Cash.png"
                        alt="Credits"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col md={4}>
            <Card
              className="border-0 shadow-sm"
              style={{ padding: "24px", borderRadius: "12px" }}
            >
              <CardBody style={{ padding: "0" }}>
                <div>
                  <h6
                    style={{
                      color: "#344054",
                      fontSize: "14px",
                      marginBottom: "8px",
                    }}
                  >
                    Tournaments Played{" "}
                    <span style={{ color: "#667085", fontSize: "12px" }}>
                      Total Tournaments
                    </span>
                  </h6>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h3
                        style={{
                          color: "#101828",
                          fontSize: "30px",
                          fontWeight: "600",
                          marginBottom: "8px",
                        }}
                      >
                        12
                      </h3>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <span style={{ color: "#667085", fontSize: "14px" }}>
                          4
                        </span>
                        <span style={{ color: "#667085", fontSize: "14px" }}>
                          Last Win
                        </span>
                        <span style={{ color: "#667085", fontSize: "14px" }}>
                          6
                        </span>
                        <span style={{ color: "#667085", fontSize: "14px" }}>
                          Losses
                        </span>
                      </div>
                    </div>
                    <div
                      style={{
                        width: "48px",
                        height: "48px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src="/uploads/Tournament.png"
                        alt="Trophy"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <h6
              style={{
                fontSize: "18px",
                fontWeight: 500,
                color: "#101828",
                marginBottom: "20px",
              }}
            >
              Tournament History
            </h6>
            <Card
              className="border-0"
              style={{
                padding: "24px",
                backgroundColor: "#FFFFFF",
                borderRadius: "12px",
                boxShadow:
                  "0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)",
              }}
            >
              <div className="table-responsive">
                <Table borderless style={{ marginBottom: "20px" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid #EAECF0" }}>
                      <th
                        style={{
                          color: "#667085",
                          fontSize: "12px",
                          fontWeight: 500,
                          padding: "12px 24px",
                        }}
                      >
                        Tournament
                      </th>
                      <th
                        style={{
                          color: "#667085",
                          fontSize: "12px",
                          fontWeight: 500,
                          padding: "12px 24px",
                        }}
                      >
                        Placement
                      </th>
                      <th
                        style={{
                          color: "#667085",
                          fontSize: "12px",
                          fontWeight: 500,
                          padding: "12px 24px",
                        }}
                      >
                        Rewards
                      </th>
                      <th
                        style={{
                          color: "#667085",
                          fontSize: "12px",
                          fontWeight: 500,
                          padding: "12px 24px",
                        }}
                      >
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        tournament: "Vanguard Royale",
                        placement: "23",
                        rewards: "$2000",
                        status: "Completed",
                      },
                      {
                        tournament: "Vanguard Royale",
                        placement: "12",
                        rewards: "$2000",
                        status: "Completed",
                      },
                      {
                        tournament: "Vanguard Royale",
                        placement: "32",
                        rewards: "$2000",
                        status: "Completed",
                      },
                      {
                        tournament: "Vanguard Royale",
                        placement: "4",
                        rewards: "$2000",
                        status: "Completed",
                      },
                      {
                        tournament: "Vanguard Royale",
                        placement: "44",
                        rewards: "$2500",
                        status: "Completed",
                      },
                      {
                        tournament: "Vanguard Royale",
                        placement: "32",
                        rewards: "$2500",
                        status: "Completed",
                      },
                      {
                        tournament: "Vanguard Royale",
                        placement: "12",
                        rewards: "$2500",
                        status: "Ongoing",
                      },
                      {
                        tournament: "Vanguard Royale",
                        placement: "22",
                        rewards: "$2500",
                        status: "Ongoing",
                      },
                    ].map((item, index) => (
                      <tr
                        key={index}
                        style={{ borderBottom: "1px solid #EAECF0" }}
                      >
                        <td
                          style={{
                            color: "#101828",
                            fontSize: "14px",
                            padding: "16px 24px",
                          }}
                        >
                          {item.tournament}
                        </td>
                        <td
                          style={{
                            color: "#101828",
                            fontSize: "14px",
                            padding: "16px 24px",
                          }}
                        >
                          {item.placement}
                        </td>
                        <td
                          style={{
                            color: "#101828",
                            fontSize: "14px",
                            padding: "16px 24px",
                          }}
                        >
                          {item.rewards}
                        </td>
                        <td style={{ padding: "16px 24px" }}>
                          <span
                            style={{
                              padding: "2px 8px",
                              borderRadius: "16px",
                              fontSize: "12px",
                              fontWeight: 500,
                              backgroundColor:
                                item.status === "Completed"
                                  ? "#ECFDF3"
                                  : "#FEF3F2",
                              color:
                                item.status === "Completed"
                                  ? "#027A48"
                                  : "#B42318",
                            }}
                          >
                            {item.status === "Completed"
                              ? "✓ Completed"
                              : "• Ongoing"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <div
                  className="d-flex justify-content-between align-items-center"
                  style={{ padding: "0 12px" }}
                >
                  <div className="d-flex align-items-center gap-1">
                    <button
                      style={{
                        padding: "8px 14px",
                        border: "1px solid #D0D5DD",
                        borderRadius: "8px",
                        background: "none",
                        cursor: "pointer",
                      }}
                    >
                      <i
                        className="fas fa-chevron-left"
                        style={{ fontSize: "12px", color: "#344054" }}
                      ></i>
                    </button>
                    <button
                      style={{
                        padding: "8px 14px",
                        border: "none",
                        borderRadius: "8px",
                        background: "#FFD600",
                        color: "#344054",
                        fontWeight: 500,
                      }}
                    >
                      1
                    </button>
                    {[2, 3, 4, 5].map((num) => (
                      <button
                        key={num}
                        style={{
                          padding: "8px 14px",
                          border: "1px solid #D0D5DD",
                          borderRadius: "8px",
                          background: "none",
                          color: "#344054",
                        }}
                      >
                        {num}
                      </button>
                    ))}
                    <button
                      style={{
                        padding: "8px 14px",
                        border: "1px solid #D0D5DD",
                        borderRadius: "8px",
                        background: "none",
                        color: "#344054",
                      }}
                    >
                      ...
                    </button>
                    <button
                      style={{
                        padding: "8px 14px",
                        border: "1px solid #D0D5DD",
                        borderRadius: "8px",
                        background: "none",
                        color: "#344054",
                      }}
                    >
                      12
                    </button>
                    <button
                      style={{
                        padding: "8px 14px",
                        border: "1px solid #D0D5DD",
                        borderRadius: "8px",
                        background: "none",
                        cursor: "pointer",
                      }}
                    >
                      <i
                        className="fas fa-chevron-right"
                        style={{ fontSize: "12px", color: "#344054" }}
                      ></i>
                    </button>
                  </div>
                  <div style={{ color: "#344054", fontSize: "14px" }}>
                    1 - 3 of 10 items
                  </div>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </UserDashboardLayout>
  );
}
