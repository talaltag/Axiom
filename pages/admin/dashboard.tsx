import { useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminDashboardLayout from '../../components/layouts/AdminDashboardLayout';
import { Container, Row, Col, Card, CardBody, CardTitle, Input } from 'reactstrap';
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function AdminDashboard() {
  const router = useRouter();

  useEffect(() => {
    const isAdmin = localStorage.getItem('adminAuth');
    if (!isAdmin) {
      router.push('/auth/login');
    }
  }, []);

  const statsData = [
    { title: 'Gross Profit', amount: '1000', percent: '40', trend: 'up' },
    { title: 'Current Net Profit', amount: '3400', percent: '40', trend: 'up' },
    { title: 'Current Amount', amount: '2000', percent: '40', trend: 'up' },
    { title: 'Total Paid Out', amount: '3400', percent: '40', trend: 'up' },
  ];

  const profitChartOptions = {
    chart: {
      type: 'line',
      toolbar: { show: false }
    },
    stroke: { curve: 'smooth', width: 2 },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    colors: ['#28a745', '#ffc107', '#007bff', '#dc3545']
  };

  const profitChartSeries = [
    {
      name: 'Active',
      data: [65, 59, 80, 81, 56, 55, 40, 60, 70, 75, 80, 85]
    },
    {
      name: 'Pending',
      data: [28, 48, 40, 19, 86, 27, 90, 50, 60, 65, 70, 75]
    },
    {
      name: 'Completed',
      data: [45, 55, 65, 70, 75, 80, 85, 90, 92, 95, 97, 100]
    },
    {
      name: 'Cancelled',
      data: [15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70]
    }
  ];

  const doughnutChartOptions = {
    labels: ['Profit', 'Loss', 'Cancelled'],
    colors: ['#28a745', '#dc3545', '#ffc107'],
    legend: { position: 'right' as const }
  };

  const doughnutChartSeries = [5, 321, 69];

  return (
    <AdminDashboardLayout>
      <Container fluid className="p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h4 className="mb-1">Axiom Dashboard</h4>
            <p className="text-muted">Track, manage and forecast your tournaments</p>
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
                  <CardTitle tag="h6" className="text-muted">{stat.title}</CardTitle>
                  <h3 className="my-3">{stat.amount}</h3>
                  <p className="text-success mb-0">↑ {stat.percent}% vs last month</p>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>

        <Row>
          <Col md={6}>
            <Card className="mb-4">
              <CardBody>
                <div className="d-flex justify-content-between mb-4">
                  <CardTitle tag="h5">Messages</CardTitle>
                  <Input type="select" className="w-auto">
                    <option>Week</option>
                    <option>Month</option>
                  </Input>
                </div>
                {/* Message list content */}
              </CardBody>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="mb-4">
              <CardBody>
                <div className="d-flex justify-content-between mb-4">
                  <CardTitle tag="h5">Total Profit Scale</CardTitle>
                  <Input type="select" className="w-auto">
                    <option>Week</option>
                    <option>Month</option>
                  </Input>
                </div>
                <Chart
                  options={doughnutChartOptions}
                  series={doughnutChartSeries}
                  type="donut"
                  height={350}
                />
              </CardBody>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="mb-4">
              <CardBody>
                <div className="d-flex justify-content-between mb-4">
                  <CardTitle tag="h5">Highest Payout</CardTitle>
                  <Input type="select" className="w-auto">
                    <option>Week</option>
                    <option>Month</option>
                  </Input>
                </div>
                <Chart
                  options={profitChartOptions}
                  series={profitChartSeries}
                  type="line"
                  height={350}
                />
              </CardBody>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="mb-4">
              <CardBody>
                <div className="d-flex justify-content-between mb-4">
                  <CardTitle tag="h5">Player Engagement Stats</CardTitle>
                  <Input type="select" className="w-auto">
                    <option>Week</option>
                    <option>Month</option>
                  </Input>
                </div>
                <Chart
                  options={{
                    ...profitChartOptions,
                    colors: ['#ffc107']
                  }}
                  series={[{
                    name: 'Players',
                    data: [2100, 2200, 2300, 2345, 2400, 2450, 2500, 2550, 2600, 2650, 2700, 2750]
                  }]}
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