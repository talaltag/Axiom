
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
        toolbar: { show: false },
        background: 'transparent'
      },
      plotOptions: {
        bar: {
          columnWidth: '60%',
          colors: {
            ranges: [{
              from: 0,
              to: 100,
              color: '#E4E7EC'
            }]
          }
        }
      },
      colors: ['#FFD600'],
      xaxis: {
        categories: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
        labels: {
          style: { colors: '#667085', fontSize: '12px' }
        }
      },
      yaxis: {
        labels: {
          formatter: function(value) {
            return value + ' hr';
          },
          style: { colors: '#667085', fontSize: '12px' }
        },
        title: {
          text: 'Gaming time',
          style: { color: '#101828', fontSize: '14px' }
        }
      },
      grid: {
        borderColor: '#F2F4F7',
        strokeDashArray: 4
      }
    },
    series: [{
      name: 'Gaming Hours',
      data: [0.5, 0.8, 1.2, 1.5, 1.0, 1.3, 1.7, 2.0, 1.8, 2.1, 2.3, 2.5]
    }]
  };

  const donutChartData = {
    options: {
      chart: {
        type: 'donut',
        background: 'transparent'
      },
      colors: ['#FFD600', '#EAECF0'],
      labels: ['Wins', 'Losses'],
      plotOptions: {
        pie: {
          donut: {
            size: '85%',
            labels: {
              show: true,
              name: { show: true },
              value: { show: true },
              total: {
                show: true,
                label: 'Total',
                formatter: () => '98%'
              }
            }
          }
        }
      },
      dataLabels: { enabled: false },
      legend: {
        position: 'right',
        fontSize: '14px',
        markers: { width: 8, height: 8 },
        labels: { colors: '#344054' }
      }
    },
    series: [98, 2]
  };

  const lineChartData = {
    options: {
      chart: {
        type: 'line',
        height: 350,
        toolbar: { show: false },
        background: 'transparent'
      },
      stroke: {
        curve: 'smooth',
        width: 2
      },
      colors: ['#FFD600', '#12B76A', '#F04438'],
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        labels: {
          style: { colors: '#667085', fontSize: '12px' }
        }
      },
      yaxis: {
        labels: {
          formatter: function(value) {
            return value + '%';
          },
          style: { colors: '#667085', fontSize: '12px' }
        }
      },
      grid: {
        borderColor: '#F2F4F7',
        strokeDashArray: 4
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        fontSize: '14px',
        markers: { width: 8, height: 8 },
        labels: { colors: '#344054' }
      }
    },
    series: [
      {
        name: 'Total Tournaments participated in',
        data: [60, 62, 64, 65, 63, 66, 68, 70, 72, 74, 76, 78]
      },
      {
        name: 'Total Tournament Wins',
        data: [40, 42, 44, 45, 43, 46, 48, 50, 52, 54, 56, 58]
      },
      {
        name: 'Total Tournament Losses',
        data: [20, 22, 24, 25, 23, 26, 28, 30, 32, 34, 36, 38]
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
              <CardBody>
                <h6 className="mb-4">Tournament Statistics</h6>
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
              <CardBody>
                <h6 className="mb-4">Winning Percentage</h6>
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
