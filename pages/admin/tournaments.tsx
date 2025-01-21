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
      <Box sx={{ p: 3, bgcolor: '#fff', borderRadius: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 500 }}>
            Tournament Management
          </Typography>
          <Button 
            variant="contained" 
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
                  <TableCell sx={{ color: '#000000' }}>{tournament.id}</TableCell>
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
                        bgcolor: tournament.status === 'Completed' ? '#E8F5E9' : 
                               tournament.status === 'Registration Open' ? '#FFF8E1' :
                               '#FFF4E5',
                        color: tournament.status === 'Completed' ? '#2E7D32' :
                               tournament.status === 'Registration Open' ? '#F57C00' :
                               '#ED6C02',
                        borderRadius: '4px',
                        fontWeight: 500,
                        textTransform: 'none'
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
            <select style={{ 
              padding: '4px 8px', 
              borderRadius: '4px', 
              border: '1px solid #ddd',
              backgroundColor: '#fff' 
            }}>
              <option>12</option>
            </select>
          </Box>
          <Pagination 
            count={Math.ceil(tournaments.length / rowsPerPage)} 
            page={page} 
            onChange={(e, value) => setPage(value)}
            sx={{
              '& .MuiPaginationItem-root': {
                color: '#6C757D'
              }
            }}
          />
        </Box>
      </Box>
    </AdminDashboardLayout>
  );
}