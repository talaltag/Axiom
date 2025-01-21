
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminDashboardLayout from '../../components/layouts/AdminDashboardLayout';
import { Typography, Grid, Paper, Box } from '@mui/material';

export default function AdminDashboard() {
  const router = useRouter();

  useEffect(() => {
    const isAdmin = localStorage.getItem('adminAuth');
    if (!isAdmin) {
      router.push('/auth/login');
    }
  }, []);

  return (
    <AdminDashboardLayout>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
            }}
          >
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Total Users
            </Typography>
            <Typography component="p" variant="h4">
              0
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </AdminDashboardLayout>
  );
}
