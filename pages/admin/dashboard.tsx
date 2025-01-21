
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminDashboardLayout from '../../components/layouts/AdminDashboardLayout';
import { Typography, Grid, Paper, Box, Select, MenuItem } from '@mui/material';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

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

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const profitData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Active',
        data: [65, 59, 80, 81, 56, 55, 40, 60, 70, 75, 80, 85],
        borderColor: '#4CAF50',
        backgroundColor: '#4CAF50',
        tension: 0.4,
      },
      {
        label: 'Pending',
        data: [28, 48, 40, 19, 86, 27, 90, 50, 60, 65, 70, 75],
        borderColor: '#2196F3',
        backgroundColor: '#2196F3',
        tension: 0.4,
      },
      {
        label: 'Completed',
        data: [45, 55, 65, 70, 75, 80, 85, 90, 92, 95, 97, 100],
        borderColor: '#FFC107',
        backgroundColor: '#FFC107',
        tension: 0.4,
      },
      {
        label: 'Cancelled',
        data: [15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70],
        borderColor: '#F44336',
        backgroundColor: '#F44336',
        tension: 0.4,
      },
    ],
  };

  const doughnutData = {
    labels: ['Profit', 'Loss', 'Cancelled'],
    datasets: [{
      data: [5, 321, 69],
      backgroundColor: ['#4CAF50', '#F44336', '#FFC107'],
    }],
  };

  return (
    <AdminDashboardLayout>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, alignItems: 'center' }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333' }}>
            Axiom Dashboard
          </Typography>
          <Typography variant="body2" sx={{ color: '#666' }}>
            Track, manage and forecast your tournaments
          </Typography>
        </Box>
        <Select 
          defaultValue="thisMonth" 
          size="small"
          sx={{ 
            bgcolor: 'white',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#eee'
            }
          }}
        >
          <MenuItem value="thisMonth">This Month</MenuItem>
          <MenuItem value="lastMonth">Last Month</MenuItem>
          <MenuItem value="thisYear">This Year</MenuItem>
        </Select>
      </Box>

      <Grid container spacing={3}>
        {statsData.map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.title}>
            <Paper sx={{ p: 3, height: '100%', borderRadius: 2 }}>
              <Typography color="textSecondary" variant="subtitle2">
                {stat.title}
              </Typography>
              <Typography variant="h4" sx={{ my: 1, fontWeight: 'bold' }}>
                {stat.amount}
              </Typography>
              <Typography variant="body2" sx={{ color: '#4CAF50', display: 'flex', alignItems: 'center' }}>
                ↑ {stat.percent}% vs last month
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h6">Highest Payout</Typography>
              <Select defaultValue="week" size="small">
                <MenuItem value="week">Week</MenuItem>
                <MenuItem value="month">Month</MenuItem>
              </Select>
            </Box>
            <Line data={profitData} options={lineOptions} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h6">Total Profit Scale</Typography>
              <Select defaultValue="week" size="small">
                <MenuItem value="week">Week</MenuItem>
                <MenuItem value="month">Month</MenuItem>
              </Select>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box sx={{ width: '60%' }}>
                <Doughnut data={doughnutData} />
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </AdminDashboardLayout>
  );
}
