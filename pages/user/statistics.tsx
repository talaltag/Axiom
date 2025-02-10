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
  Progress
} from "reactstrap";
import UserDashboardLayout from "../../components/layouts/UserDashboardLayout";
const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false
});

export default function Statistics() {
  const barChartData = {
      options: {
        chart: {
          type: 'bar',
          height: 350,
          toolbar: {
            show: false
          },
          background: '#FFFFFF',
          dropShadow: {
            enabled: true,
            top: 4,
            left: 0,
            blur: 8,
            opacity: 0.1
          }
        },
        plotOptions: {
          bar: {
            columnWidth: '55%',
            borderRadius: 4,
          }
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'light',
            type: 'vertical',
            gradientToColors: ['#FFFFFF'],
            stops: [0, 100],
            colorStops: [
              {
                offset: 0,
                color: '#FFD700',
                opacity: 1
              },
              {
                offset: 100,
                color: '#FFFFFF',
                opacity: 0.8
              }
            ]
          }
        },
        colors: ['#FFD700'],
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          labels: {
            style: {
              fontSize: '12px',
              fontWeight: 500,
              colors: '#475467'
            }
          }
        },
        yaxis: {
          labels: {
            formatter: function (value) {
              return "$" + value;
            },
            style: {
              fontSize: '12px',
              fontWeight: 500,
              colors: '#475467'
            }
          }
        },
        grid: {
          borderColor: '#F0F0F0'
        }
      },
    series: [{
      name: 'Tournament Earnings',
      data: [2100, 2300, 2000, 2700, 2400, 2800, 3000, 2900, 3200, 3400, 3600, 3800]
    }]
  };

  const donutChartData = {
    options: {
      chart: {
        type: 'donut',
        background: '#FFFFFF',
        dropShadow: {
          enabled: true,
          top: 4,
          left: 0,
          blur: 8,
          opacity: 0.1
        }
      },
      colors: ['#FFD700', '#F2F4F7'],
      labels: ['Won', 'Lost'],
      plotOptions: {
        pie: {
          donut: {
            size: '75%',
            labels: {
              show: true,
              name: {
                show: false
              },
              value: {
                show: true,
                fontSize: '24px',
                fontWeight: 600,
                color: '#101828',
                offsetY: 0
              },
              total: {
                show: true,
                label: 'Tournament Win Rate',
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
          type: 'line',
          height: 350,
          toolbar: {
            show: false
          },
          dropShadow: {
            enabled: true,
            top: 0,
            left: 0,
            blur: 10,
            opacity: 0.1
          }
        },
        stroke: {
          curve: 'smooth',
          width: 2,
        },
        colors: ['#F8CA15', '#A48610', '#FFD600'],
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'light',
            type: 'vertical',
            shadeIntensity: 0.8,
            gradientToColors: ['rgba(248, 202, 21, 0)', 'rgba(164, 134, 16, 0)', 'rgba(255, 214, 0, 0)'],
            inverseColors: false,
            opacityFrom: 0.9,
            opacityTo: 0.3,
            stops: [0, 100]
          }
        },
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
        },
        legend: {
          show: false
        }
      },
    series: [
      {
        name: 'Team A',
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
      },
      {
        name: 'Team B',
        data: [20, 35, 40, 45, 50, 55, 65, 85, 100]
      },
      {
        name: 'Team C',
        data: [15, 25, 30, 35, 40, 45, 55, 75, 90]
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
            <Card className="border-0" style={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.05)', borderRadius: '12px' }}>
              <CardBody>
                <h6 className="mb-4" style={{ fontSize: '18px', fontWeight: 600, color: '#101828' }}>Tournament Statistics</h6>
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
            <Card className="border-0" style={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.05)', borderRadius: '12px' }}>
              <CardBody>
                <h6 className="mb-4" style={{ fontSize: '18px', fontWeight: 600, color: '#101828' }}>Winning Percentage</h6>
                <div className="text-center">
                  <Chart
                    options={donutChartData.options}
                    series={donutChartData.series}
                    type="donut"
                    height={250}
                  />
                  <div className="mt-3">
                    <h3 className="mb-0">75%</h3>
                    <small className="text-muted">Tournament Win Rate</small>
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
                  <DollarSign size={24} className="text-warning"/>
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
                  <CreditCard size={24} className="text-warning"/>
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
                  <Award size={24} className="text-warning"/>
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
                              color={tournament.status === "Completed" ? "success" : "danger"}
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
                      {[2,3,4,5].map(page => (
                        <button key={page} className="btn btn-light btn-sm me-2">{page}</button>
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