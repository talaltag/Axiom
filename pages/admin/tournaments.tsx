import { useState } from 'react';
import { useRouter } from 'next/router';
import AdminDashboardLayout from '../../components/layouts/AdminDashboardLayout';
import { Box, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Select, MenuItem } from '@mui/material';

export default function TournamentManagement() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const tournaments = [
    { id: '141414', name: 'COD KILL RACE', game: 'COD', mode: 'Team', time: '9:00pm - 12:00pm', platform: 'XBOX', status: 'Completed' },
    { id: '141414', name: 'Fortnight Champions', game: 'Fornite', mode: 'Individual', time: '9:00pm - 12:00pm', platform: 'PC', status: 'Registration Open' },
    { id: '141414', name: 'CS GO LIVE', game: 'CS', mode: 'Team', time: '9:00pm - 12:00pm', platform: 'Xbox', status: 'Completed' },
    { id: '141414', name: 'Battle Arena 2023', game: 'COD', mode: 'Team', time: '9:00pm - 12:00pm', platform: 'Xbox', status: 'Completed' },
    { id: '141414', name: 'COD KILL RACE', game: 'CS', mode: 'Team', time: '9:00pm - 12:00pm', platform: 'Xbox', status: 'Completed' },
    { id: '141414', name: 'Fortnight Champions', game: 'Fornite', mode: 'Team', time: '9:00pm - 12:00pm', platform: 'Xbox', status: 'Completed' },
    { id: '141414', name: 'CS GO LIVE', game: 'CS', mode: 'Team', time: '9:00pm - 12:00pm', platform: 'Xbox', status: 'Ongoing' },
    { id: '141414', name: 'GOLF PLUS 2k24', game: 'COD', mode: 'Team', time: '9:00pm - 12:00pm', platform: 'Xbox', status: 'Ongoing' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return { bg: '#E8F5E9', color: '#2E7D32' };
      case 'Registration Open':
        return { bg: '#FFF8E1', color: '#F57C00' };
      case 'Ongoing':
        return { bg: '#FFF4E5', color: '#ED6C02' };
      default:
        return { bg: '#E8F5E9', color: '#2E7D32' };
    }
  };

  return (
    <AdminDashboardLayout>
      <Box sx={{ p: 3, bgcolor: '#fff', borderRadius: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 500 }}>
            Tournament Management
          </Typography>
          <Button 
            variant="contained"
            onClick={() => router.push('/admin/create-tournament')}
            sx={{ 
              bgcolor: '#F8B602', 
              color: '#000',
              '&:hover': {
                bgcolor: '#e6a800'
              },
              textTransform: 'none',
              px: 3
            }}
          >
            + Create
          </Button>
        </Box>

        <TableContainer sx={{ boxShadow: 'none' }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#F8F9FA' }}>
                <TableCell sx={{ color: '#6C757D', fontWeight: 500 }}>T-ID</TableCell>
                <TableCell sx={{ color: '#6C757D', fontWeight: 500 }}>Tournament Name</TableCell>
                <TableCell sx={{ color: '#6C757D', fontWeight: 500 }}>Game</TableCell>
                <TableCell sx={{ color: '#6C757D', fontWeight: 500 }}>Mode</TableCell>
                <TableCell sx={{ color: '#6C757D', fontWeight: 500 }}>Time</TableCell>
                <TableCell sx={{ color: '#6C757D', fontWeight: 500 }}>Platform</TableCell>
                <TableCell sx={{ color: '#6C757D', fontWeight: 500 }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tournaments.map((tournament, index) => (
                <TableRow key={index} sx={{ '&:nth-of-type(even)': { bgcolor: '#F8F9FA' } }}>
                  <TableCell>{tournament.id}</TableCell>
                  <TableCell sx={{ 
                    color: '#000000',
                    textDecoration: 'underline', 
                    cursor: 'pointer',
                    fontWeight: 500
                  }}>
                    {tournament.name}
                  </TableCell>
                  <TableCell>{tournament.game}</TableCell>
                  <TableCell>{tournament.mode}</TableCell>
                  <TableCell>{tournament.time}</TableCell>
                  <TableCell>{tournament.platform}</TableCell>
                  <TableCell>
                    <Chip 
                      label={tournament.status} 
                      size="small"
                      sx={{
                        bgcolor: getStatusColor(tournament.status).bg,
                        color: getStatusColor(tournament.status).color,
                        borderRadius: '4px',
                        fontWeight: 500
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Items per page
            </Typography>
            <Select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(e.target.value)}
              size="small"
              sx={{ minWidth: 80 }}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={30}>30</MenuItem>
            </Select>
          </Box>
          <Typography variant="body2" color="text.secondary">
            1-{itemsPerPage} of {tournaments.length} items
          </Typography>
        </Box>
      </Box>
    </AdminDashboardLayout>
  );
}