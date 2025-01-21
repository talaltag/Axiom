
import { useState } from 'react';
import AdminDashboardLayout from '../../components/layouts/AdminDashboardLayout';
import { Box, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, Pagination } from '@mui/material';

export default function TournamentManagement() {
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

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

  return (
    <AdminDashboardLayout>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          Tournament Management
        </Typography>
        <Button 
          variant="contained" 
          sx={{ 
            bgcolor: '#ffbb00', 
            color: 'black',
            '&:hover': {
              bgcolor: '#e6a800'
            }
          }}
        >
          + Create
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>T-ID</TableCell>
              <TableCell>Tournament Name</TableCell>
              <TableCell>Game</TableCell>
              <TableCell>Mode</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Platform</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tournaments.map((tournament, index) => (
              <TableRow key={index} sx={{ '&:nth-of-type(odd)': { bgcolor: '#f8f9fa' } }}>
                <TableCell>{tournament.id}</TableCell>
                <TableCell sx={{ color: '#0066cc', textDecoration: 'underline', cursor: 'pointer' }}>
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
                      bgcolor: tournament.status === 'Completed' ? '#e8f5e9' : 
                             tournament.status === 'Registration Open' ? '#fff3e0' :
                             '#ffebee',
                      color: tournament.status === 'Completed' ? '#2e7d32' :
                             tournament.status === 'Registration Open' ? '#e65100' :
                             '#c62828',
                      borderRadius: '4px',
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Items per page
          </Typography>
          <select style={{ padding: '4px', borderRadius: '4px', border: '1px solid #ddd' }}>
            <option>12</option>
          </select>
        </Box>
        <Pagination 
          count={Math.ceil(tournaments.length / rowsPerPage)} 
          page={page} 
          onChange={(e, value) => setPage(value)}
          color="primary"
        />
      </Box>
    </AdminDashboardLayout>
  );
}
