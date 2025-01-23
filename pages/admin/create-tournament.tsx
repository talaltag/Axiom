
import { useState } from 'react';
import AdminDashboardLayout from '../../components/layouts/AdminDashboardLayout';
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  InputAdornment,
} from '@mui/material';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { useRouter } from 'next/router';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, TimePicker, DatePicker } from '@mui/x-date-pickers';

export default function CreateTournament() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    game: '',
    platform: '',
    gameMode: '',
    teamSize: '',
    time: null,
    date: null,
    entryFee: '',
    category: '',
    restrictions: '',
    hasLimit: 'no',
    limit: '',
    totalPrizePool: '',
    winnerCount: 3,
    description: '',
    attributes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
    // Redirect back to tournaments page
    router.push('/admin/tournaments');
  };

  return (
    <AdminDashboardLayout>
      <Box sx={{ p: 3, bgcolor: '#fff', borderRadius: 2 }}>
        <Breadcrumb listClassName="mb-3">
          <BreadcrumbItem href="/admin/tournaments">Tournament Management</BreadcrumbItem>
          <BreadcrumbItem active>Create New Tournament</BreadcrumbItem>
        </Breadcrumb>

        <Typography variant="h5" sx={{ mb: 1, fontWeight: 500 }}>Create New Tournament</Typography>
        <Typography variant="subtitle1" sx={{ mb: 4, color: 'text.secondary' }}>
          Create your new tournament here.
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Tournament Name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Tournament Type</InputLabel>
                <Select
                  value={formData.type}
                  label="Tournament Type"
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                >
                  <MenuItem value="Kill Race">Kill Race</MenuItem>
                  <MenuItem value="Battle Royale">Battle Royale</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Select Game</InputLabel>
                <Select
                  value={formData.game}
                  label="Select Game"
                  onChange={(e) => setFormData({...formData, game: e.target.value})}
                >
                  <MenuItem value="COD">Call of Duty</MenuItem>
                  <MenuItem value="Fortnite">Fortnite</MenuItem>
                  <MenuItem value="CS">Counter-Strike</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Select Platform</InputLabel>
                <Select
                  value={formData.platform}
                  label="Select Platform"
                  onChange={(e) => setFormData({...formData, platform: e.target.value})}
                >
                  <MenuItem value="Xbox">Xbox</MenuItem>
                  <MenuItem value="PC">PC</MenuItem>
                  <MenuItem value="PlayStation">PlayStation</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <TimePicker
                  label="Time"
                  value={formData.time}
                  onChange={(newValue) => setFormData({...formData, time: newValue})}
                  slotProps={{ textField: { fullWidth: true } }}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Date"
                  value={formData.date}
                  onChange={(newValue) => setFormData({...formData, date: newValue})}
                  slotProps={{ textField: { fullWidth: true } }}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Entry Fee"
                type="number"
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                value={formData.entryFee}
                onChange={(e) => setFormData({...formData, entryFee: e.target.value})}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={formData.category}
                  label="Category"
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                >
                  <MenuItem value="Cash">Cash</MenuItem>
                  <MenuItem value="Free">Free</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl>
                <FormLabel>Tournament Limit</FormLabel>
                <RadioGroup
                  row
                  value={formData.hasLimit}
                  onChange={(e) => setFormData({...formData, hasLimit: e.target.value})}
                >
                  <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
            </Grid>

            {formData.hasLimit === 'yes' && (
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Limit"
                  type="number"
                  value={formData.limit}
                  onChange={(e) => setFormData({...formData, limit: e.target.value})}
                />
              </Grid>
            )}

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </Grid>

            <Grid item xs={12} sx={{ mt: 2 }}>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button
                  variant="outlined"
                  onClick={() => router.push('/admin/tournaments')}
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    bgcolor: '#F8B602',
                    color: '#000',
                    '&:hover': { bgcolor: '#e6a800' }
                  }}
                >
                  Publish Tournament
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>
    </AdminDashboardLayout>
  );
}
