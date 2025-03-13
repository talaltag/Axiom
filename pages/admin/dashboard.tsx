import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AdminDashboardLayout from "../../components/layouts/AdminDashboardLayout";
import { Container, Row, Col, Card, CardBody, Input } from "reactstrap";
import dynamic from "next/dynamic";
import Image from "next/image";
import moment from "moment";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function AdminDashboard() {
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState([])
  const [timelines, setTimelines] = useState({
    dashboard: "this_month",
    messages: "week",
    profitScale: "week",
    highestPayout: "week",
    playerEngagement: "week",
  });

  const handleTimelineChange = (key, value) => {
    setTimelines((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

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

  const getData = async () => {
    try {
      const response = await fetch(
        `/api/admin/tournament-win-history/dashboard?dashboard=${timelines.dashboard}&messages=${timelines.messages}&profitScale=${timelines.profitScale}&highestPayout=${timelines.highestPayout}&playerEngagement=${timelines.playerEngagement}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create tournament");
      }

      if (data.success) {
        setDashboardData(data.data)
      } else {
        throw new Error(data.message || "Failed to create tournament");
      }
    } catch (error) {
      console.log(error, 'error')
    }
  }

  useEffect(() => {
    getData()
  }, [timelines])


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
          <Input type="select" className="w-auto" value={timelines.dashboard}
            onChange={(e) => handleTimelineChange("dashboard", e.target.value)}>
            <option value={'this_month'}>This Month</option>
            <option value={'last_month'}>Last Month</option>
            <option value={'this_year'}>This Year</option>
          </Input>
        </div>

        <Row>
          {dashboardData.statsData?.map((stat, index) => (
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
                  <p className={`${stat.trend == 'up' ? 'text-success' : 'text-danger'}  mb-0`}>
                    {stat.trend === 'up' ? '↑' : '↓'}  {stat.percent} vs {timelines.dashboard}
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
                  <Input type="select" className="w-auto" value={timelines.messages}
                    onChange={(e) => handleTimelineChange("messages", e.target.value)}>
                    <option value={'week'}>Week</option>
                    <option value={'month'}>Month</option>
                  </Input>
                </div>
                <div className="messages-list">
                  {dashboardData.messages?.map((msg, index) => (
                    <div key={index} className="d-flex align-items-center mb-3">
                      <div className="me-3">
                        <Image
                          src={msg.senderInfo.profileImage}
                          alt={'image'}
                          width={40}
                          height={40}
                          className="rounded-circle"
                        />
                      </div>
                      <div className="flex-grow-1">
                        <h6 className="mb-1">{msg.senderInfo.name}</h6>
                        {msg.content ? (
                          <p className="text-muted mb-0">{msg.content}</p>
                        ) : msg.media && msg.media.length > 0 ? (
                          msg.media.map((file, index) => (
                            <div key={index} className="mb-2">
                              {file.fileType.startsWith("image/") ? (
                                <img
                                  src={file.fileUrl}
                                  alt={file.fileName}
                                  className="img-fluid rounded"
                                  style={{ maxWidth: "40px", maxHeight: "40px" }}
                                />
                              ) : (
                                <a href={file.fileUrl} target="_blank" rel="noopener noreferrer">
                                  {file.fileName}
                                </a>
                              )}
                            </div>
                          ))
                        ) : (
                          <p className="text-muted mb-0">No message</p>
                        )}
                      </div>
                      <small className="text-muted">{moment(msg.createdAt).format('hh:mm A - MM-DD-YYYY')}</small>
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
                  <Input type="select" className="w-auto" value={timelines.profitScale}
                    onChange={(e) => handleTimelineChange("profitScale", e.target.value)}
                  >
                    <option value="week">Week</option>
                    <option value="month">Month</option>
                  </Input>
                </div>
                <div className="d-flex justify-content-between">
                  <Chart
                    options={donutChartOptions}
                    series={dashboardData?.profitScale || []}
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
                  <Input type="select" className="w-auto" value={timelines.highestPayout}
                    onChange={(e) => handleTimelineChange("highestPayout", e.target.value)}
                  >
                    <option value="week">Week</option>
                    <option value="month">Month</option>
                  </Input>
                </div>
                <Chart
                  options={highestPayoutOptions}
                  series={dashboardData?.highestPayoutGraph || []}
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
                  <Input type="select" className="w-auto" value={timelines.playerEngagement}
                    onChange={(e) => handleTimelineChange("playerEngagement", e.target.value)}
                  >
                    <option value="week">Week</option>
                    <option value="month">Month</option>
                  </Input>
                </div>
                <Chart
                  options={playerEngagementOptions}
                  series={dashboardData?.engagementStats || []}
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
