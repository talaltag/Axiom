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
} from "reactstrap";
import UserDashboardLayout from "../../components/layouts/UserDashboardLayout";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function Statistics() {
  const barChartData = {
    options: {
      chart: {
        type: "bar",
        height: 350,
        toolbar: {
          show: false,
        },
        background: "#FFFFFF",
      },
      plotOptions: {
        bar: {
          columnWidth: "55%",
          borderRadius: 4,
          distributed: false,
        },
      },
      fill: {
        colors: ["#FFD600"],
        opacity: 1,
      },
      colors: ["#FFD600"],
      xaxis: {
        categories: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
        labels: {
          style: {
            fontSize: "12px",
            fontWeight: 400,
            colors: "#667085",
          },
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      },
      yaxis: {
        labels: {
          formatter: function (value) {
            return "$" + value;
          },
          style: {
            fontSize: "12px",
            fontWeight: 400,
            colors: "#667085",
          },
        }
      },
      grid: {
        borderColor: "#EAECF0",
        strokeDashArray: 4,
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      }
    },
    series: [{
      name: "Earnings",
      data: [2100,2300,2000,2700,2400,2800,3000,2900,3200,3400,3600,3800]
    }]
  };

  const donutChartData = {
    options: {
      chart: {
        type: "donut"
      },
      colors: ["#FFD600", "#EAECF0"],
      labels: ["Won", "Lost"],
      plotOptions: {
        pie: {
          donut: {
            size: "75%",
            labels: {
              show: true,
              name: {
                show: true,
                fontSize: '14px',
                fontWeight: 400,
                color: '#667085'
              },
              value: {
                show: true,
                fontSize: "24px",
                fontWeight: 600,
                color: "#101828"
              },
              total: {
                show: true,
                label: "Win Rate",
                fontSize: '14px',
                fontWeight: 400,
                color: '#667085'
              }
            }
          }
        }
      },
      stroke: {
        width: 0
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      }
    },
    series: [75, 25]
  };

  const lineChartData = {
    options: {
      chart: {
        type: "line",
        height: 350,
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false
        }
      },
      stroke: {
        curve: "smooth",
        width: 2
      },
      colors: ["#FFD600", "#FDB022", "#7F56D9"],
      xaxis: {
        categories: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep"],
        labels: {
          style: {
            fontSize: "12px",
            fontWeight: 400,
            colors: "#667085"
          }
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      },
      yaxis: {
        labels: {
          style: {
            fontSize: "12px",
            fontWeight: 400,
            colors: "#667085"
          }
        }
      },
      grid: {
        borderColor: "#EAECF0",
        strokeDashArray: 4
      },
      legend: {
        show: true,
        position: "top",
        horizontalAlign: "right",
        fontSize: "14px",
        fontWeight: 500,
        markers: {
          width: 8,
          height: 8,
          radius: 12
        }
      },
      dataLabels: {
        enabled: false
      }
    },
    series: [
      {
        name: "Team A",
        data: [30,40,35,50,49,60,70,91,125]
      },
      {
        name: "Team B",
        data: [20,35,40,45,50,55,65,85,100]
      },
      {
        name: "Team C",
        data: [15,25,30,35,40,45,55,75,90]
      }
    ]
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
            <Card className="border-0 shadow-sm">
              <CardBody className="p-4">
                <h6 className="mb-4" style={{ fontSize: "18px", color: "#101828", fontWeight: "600" }}>
                  Earning Stats
                </h6>
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
            <Card className="border-0 shadow-sm">
              <CardBody className="p-4">
                <h6 className="mb-4" style={{ fontSize: "18px", color: "#101828", fontWeight: "600" }}>
                  Winning Percentage
                </h6>
                <Chart
                  options={donutChartData.options}
                  series={donutChartData.series}
                  type="donut"
                  height={250}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={12}>
            <Card className="border-0 shadow-sm">
              <CardBody className="p-4">
                <h6 className="mb-4" style={{ fontSize: "18px", color: "#101828", fontWeight: "600" }}>
                  Tournament Group Stats
                </h6>
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
            <Card className="border-0 shadow-sm bg-white">
              <CardBody className="p-4">
                <div className="d-flex align-items-center mb-2">
                  <div className="bg-light rounded p-3 me-3">
                    <DollarSign size={24} className="text-warning" />
                  </div>
                  <div>
                    <small style={{ color: "#667085", fontSize: "14px", fontWeight: "400" }}>Total Earnings</small>
                    <h4 style={{ margin: "0", color: "#101828", fontSize: "24px", fontWeight: "600" }}>$2000</h4>
                  </div>
                </div>
                <small style={{ color: "#027A48", fontSize: "14px", fontWeight: "500" }}>↑ 15% from last month</small>
              </CardBody>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="border-0 shadow-sm bg-white">
              <CardBody className="p-4">
                <div className="d-flex align-items-center mb-2">
                  <div className="bg-light rounded p-3 me-3">
                    <CreditCard size={24} className="text-warning" />
                  </div>
                  <div>
                    <small style={{ color: "#667085", fontSize: "14px", fontWeight: "400" }}>Prize Money</small>
                    <h4 style={{ margin: "0", color: "#101828", fontSize: "24px", fontWeight: "600" }}>$2000</h4>
                  </div>
                </div>
                <small style={{ color: "#027A48", fontSize: "14px", fontWeight: "500" }}>↑ 10% from last month</small>
              </CardBody>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="border-0 shadow-sm bg-white">
              <CardBody className="p-4">
                <div className="d-flex align-items-center mb-2">
                  <div className="bg-light rounded p-3 me-3">
                    <Award size={24} className="text-warning" />
                  </div>
                  <div>
                    <small style={{ color: "#667085", fontSize: "14px", fontWeight: "400" }}>Tournaments Played</small>
                    <h4 style={{ margin: "0", color: "#101828", fontSize: "24px", fontWeight: "600" }}>12</h4>
                  </div>
                </div>
                <small style={{ color: "#027A48", fontSize: "14px", fontWeight: "500" }}>4 wins this month</small>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <Card className="border-0 shadow-sm">
              <CardBody className="p-4">
                <h6 className="mb-4" style={{ fontSize: "18px", color: "#101828", fontWeight: "600" }}>
                  Tournament History
                </h6>
                <Table borderless responsive className="mb-4">
                  <thead>
                    <tr>
                      <th style={{ color: "#667085", fontSize: "12px", fontWeight: "500", borderBottom: "1px solid #EAECF0", padding: "12px 24px" }}>Tournament</th>
                      <th style={{ color: "#667085", fontSize: "12px", fontWeight: "500", borderBottom: "1px solid #EAECF0", padding: "12px 24px" }}>Tournament ID</th>
                      <th style={{ color: "#667085", fontSize: "12px", fontWeight: "500", borderBottom: "1px solid #EAECF0", padding: "12px 24px" }}>Amount</th>
                      <th style={{ color: "#667085", fontSize: "12px", fontWeight: "500", borderBottom: "1px solid #EAECF0", padding: "12px 24px" }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...Array(6)].map((_, index) => (
                      <tr key={index}>
                        <td style={{ color: "#101828", fontSize: "14px", fontWeight: "500", padding: "16px 24px" }}>Vanguard Royale</td>
                        <td style={{ color: "#667085", fontSize: "14px", padding: "16px 24px" }}>{22 - index}</td>
                        <td style={{ color: "#101828", fontSize: "14px", fontWeight: "500", padding: "16px 24px" }}>$150</td>
                        <td style={{ padding: "16px 24px" }}>
                          <Badge
                            color={index < 4 ? "success" : "danger"}
                            style={{
                              backgroundColor: index < 4 ? "#ECFDF3" : "#FEF3F2",
                              color: index < 4 ? "#027A48" : "#B42318",
                              fontSize: "12px",
                              fontWeight: "500",
                              padding: "2px 8px",
                              borderRadius: "16px"
                            }}
                          >
                            {index < 4 ? "Completed" : "Declined"}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center gap-2">
                    {[1, 2, 3, 4, 5].map((page) => (
                      <button
                        key={page}
                        className="btn"
                        style={{
                          backgroundColor: page === 1 ? "#FFD600" : "#F9FAFB",
                          border: "1px solid #EAECF0",
                          borderRadius: "8px",
                          padding: "8px 14px",
                          fontSize: "14px",
                          color: page === 1 ? "#101828" : "#667085"
                        }}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      className="btn"
                      style={{
                        backgroundColor: "#F9FAFB",
                        border: "1px solid #EAECF0",
                        borderRadius: "8px",
                        padding: "8px 14px",
                        fontSize: "14px",
                        color: "#667085"
                      }}
                    >
                      ...
                    </button>
                  </div>
                  <div>
                    <small style={{ color: "#667085", fontSize: "14px" }}>1-20 of 320 entries</small>
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