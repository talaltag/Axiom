import { useEffect } from "react";
import { useRouter } from "next/router";
import AdminDashboardLayout from "../../components/layouts/AdminDashboardLayout";
import { Container, Row, Col, Card, CardBody, Input } from "reactstrap";
import dynamic from "next/dynamic";
import Image from "next/image";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function AdminDashboard() {
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      router.push("/auth/login");
      return;
    }
  }, [router]);

  const statsData = [
    { title: "Gross Profit", amount: "1000", percent: "40", trend: "up" },
    { title: "Current Net Profit", amount: "3400", percent: "40", trend: "up" },
    { title: "Current Amount", amount: "2000", percent: "40", trend: "up" },
    { title: "Total Paid Out", amount: "3400", percent: "40", trend: "up" },
  ];

  const lineChartOptions = {
    chart: {
      toolbar: { show: false },
      sparkline: { enabled: true },
    },
    stroke: { curve: "smooth", width: 2 },
    colors: ["#28C76F"],
    grid: { show: false },
    tooltip: { enabled: false },
    xaxis: { labels: { show: false }, axisBorder: { show: false } },
    yaxis: { labels: { show: false }, axisBorder: { show: false } },
  };

  const messages = [
    {
      name: "Dianne Team",
      message: "Im facing a issue with my teammates.",
      time: "9:13 AM",
    },
    {
      name: "Dianne Team",
      message: "Im facing a issue with my teammates.",
      time: "9:13 AM",
    },
    {
      name: "Dianne Team",
      message: "Im facing a issue with my teammates.",
      time: "9:13 AM",
    },
    {
      name: "Dianne Team",
      message: "Im facing a issue with my teammates.",
      time: "9:13 AM",
    },
  ];

  const donutChartOptions = {
    chart: { toolbar: { show: false } },
    colors: ["#28C76F", "#EA5455", "#FF9F43"],
    labels: ["Profit", "Loss", "Cancelled"],
    legend: {
      position: "right",
      fontSize: "14px",
      markers: { width: 10, height: 10, radius: 50 },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "75%",
          labels: {
            show: true,
            name: { show: false },
            total: {
              show: true,
              label: "Profit",
              formatter: () => "14",
            },
          },
        },
      },
    },
    dataLabels: { enabled: false },
  };

  const highestPayoutOptions = {
    chart: {
      type: "line",
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    stroke: { curve: "smooth", width: 2 },
    colors: ["#28C76F", "#FF9F43", "#00CFE8", "#EA5455"],
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
    },
    legend: { show: true },
  };

  const playerEngagementOptions = {
    ...highestPayoutOptions,
    colors: ["#FF9F43"],
  };

  return (
    <AdminDashboardLayout>
      <Container fluid className="p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h4 className="mb-1">Axiom Dashboard</h4>
            <p className="text-muted mb-0">
              Track, manage and forecast your tournaments
            </p>
          </div>
          <Input type="select" className="w-auto">
            <option>This Month</option>
            <option>Last Month</option>
            <option>This Year</option>
          </Input>
        </div>

        <Row>
          {statsData.map((stat, index) => (
            <Col key={index} xs={12} sm={6} md={3}>
              <Card className="mb-4">
                <CardBody>
                  <h6 className="text-muted mb-2">{stat.title}</h6>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h3 className="mb-0">{stat.amount}</h3>
                    <Chart
                      options={lineChartOptions}
                      series={[
                        { data: [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54] },
                      ]}
                      type="line"
                      width={60}
                      height={30}
                    />
                  </div>
                  <p className="text-success mb-0">
                    ↑ {stat.percent}% vs last month
                  </p>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>

        <Row>
          <Col md={6} className="mb-4">
            <Card>
              <CardBody>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5 className="mb-0">Messages</h5>
                  <Input type="select" className="w-auto">
                    <option>Week</option>
                    <option>Month</option>
                  </Input>
                </div>
                <div className="messages-list">
                  {messages.map((msg, index) => (
                    <div key={index} className="d-flex align-items-center mb-3">
                      <div className="me-3">
                        <Image
                          src="/axiom.png"
                          alt={msg.name}
                          width={40}
                          height={40}
                          className="rounded-circle"
                        />
                      </div>
                      <div className="flex-grow-1">
                        <h6 className="mb-1">{msg.name}</h6>
                        <p className="text-muted mb-0">{msg.message}</p>
                      </div>
                      <small className="text-muted">{msg.time}</small>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col md={6} className="mb-4">
            <Card className=" h-100">
              <CardBody>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5 className="mb-0">Total Profit Scale</h5>
                  <Input type="select" className="w-auto">
                    <option>Week</option>
                    <option>Month</option>
                  </Input>
                </div>
                <div className="d-flex justify-content-between">
                  <Chart
                    options={donutChartOptions}
                    series={[5, 321, 69]}
                    type="donut"
                    height={350}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="mb-4">
              <CardBody>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5 className="mb-0">Highest Payout</h5>
                  <Input type="select" className="w-auto">
                    <option>Week</option>
                    <option>Month</option>
                  </Input>
                </div>
                <Chart
                  options={highestPayoutOptions}
                  series={[
                    {
                      name: "Active",
                      data: [65, 59, 80, 81, 56, 55, 40, 60, 70, 75, 80, 85],
                    },
                    {
                      name: "Pending",
                      data: [28, 48, 40, 19, 86, 27, 90, 50, 60, 65, 70, 75],
                    },
                    {
                      name: "Completed",
                      data: [45, 55, 65, 70, 75, 80, 85, 90, 92, 95, 97, 100],
                    },
                    {
                      name: "Cancelled",
                      data: [15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70],
                    },
                  ]}
                  type="line"
                  height={350}
                />
              </CardBody>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="mb-4">
              <CardBody>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5 className="mb-0">Player Engagement Stats</h5>
                  <Input type="select" className="w-auto">
                    <option>Week</option>
                    <option>Month</option>
                  </Input>
                </div>
                <Chart
                  options={playerEngagementOptions}
                  series={[
                    {
                      name: "Players",
                      data: [
                        2100, 2200, 2300, 2345, 2400, 2450, 2500, 2550, 2600,
                        2650, 2700, 2750,
                      ],
                    },
                  ]}
                  type="line"
                  height={350}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </AdminDashboardLayout>
  );
}
