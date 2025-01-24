
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import AdminDashboardLayout from "../../components/layouts/AdminDashboardLayout";
import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Select,
  MenuItem,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function TournamentManagement() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState<string>("10");
  const [tournaments, setTournaments] = useState([]);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedTournament, setSelectedTournament] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    game: "",
    gameMode: "",
    platform: "",
    time: "",
    status: "",
  });

  useEffect(() => {
    fetchTournaments();
  }, []);

  const fetchTournaments = async () => {
    try {
      const response = await fetch("/api/tournaments");
      const data = await response.json();
      if (data.success) {
        setTournaments(data.data);
      }
    } catch (error) {
      console.error("Error fetching tournaments:", error);
    }
  };

  const handleEdit = (tournament) => {
    setSelectedTournament(tournament);
    setEditFormData({
      name: tournament.name,
      game: tournament.game,
      gameMode: tournament.gameMode,
      platform: tournament.platform,
      time: tournament.time,
      status: tournament.status,
    });
    setOpenEditDialog(true);
  };

  const handleDelete = (tournament) => {
    setSelectedTournament(tournament);
    setOpenDeleteDialog(true);
  };

  const handleEditSubmit = async () => {
    try {
      const response = await fetch(`/api/tournaments?id=${selectedTournament._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editFormData),
      });
      const data = await response.json();
      if (data.success) {
        setOpenEditDialog(false);
        fetchTournaments();
      }
    } catch (error) {
      console.error("Error updating tournament:", error);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await fetch(`/api/tournaments?id=${selectedTournament._id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data.success) {
        setOpenDeleteDialog(false);
        fetchTournaments();
      }
    } catch (error) {
      console.error("Error deleting tournament:", error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return { bg: "#E8F5E9", color: "#2E7D32" };
      case "Registration Open":
        return { bg: "#FFF8E1", color: "#F57C00" };
      case "Ongoing":
        return { bg: "#FFF4E5", color: "#ED6C02" };
      default:
        return { bg: "#E8F5E9", color: "#2E7D32" };
    }
  };

  return (
    <AdminDashboardLayout>
      <Box sx={{ p: 3, bgcolor: "#fff", borderRadius: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 500 }}>
            Tournament Management
          </Typography>
          <Button
            variant="contained"
            onClick={() => router.push("/admin/create-tournament")}
            sx={{
              bgcolor: "#F8B602",
              color: "#000",
              "&:hover": {
                bgcolor: "#e6a800",
              },
              textTransform: "none",
              px: 3,
            }}
          >
            + Create
          </Button>
        </Box>

        <TableContainer sx={{ boxShadow: "none" }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "#F8F9FA" }}>
                <TableCell sx={{ color: "#6C757D", fontWeight: 500 }}>T-ID</TableCell>
                <TableCell sx={{ color: "#6C757D", fontWeight: 500 }}>Tournament Name</TableCell>
                <TableCell sx={{ color: "#6C757D", fontWeight: 500 }}>Game</TableCell>
                <TableCell sx={{ color: "#6C757D", fontWeight: 500 }}>Mode</TableCell>
                <TableCell sx={{ color: "#6C757D", fontWeight: 500 }}>Time</TableCell>
                <TableCell sx={{ color: "#6C757D", fontWeight: 500 }}>Platform</TableCell>
                <TableCell sx={{ color: "#6C757D", fontWeight: 500 }}>Status</TableCell>
                <TableCell sx={{ color: "#6C757D", fontWeight: 500 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tournaments.map((tournament) => (
                <TableRow
                  key={tournament._id}
                  sx={{ "&:nth-of-type(even)": { bgcolor: "#F8F9FA" } }}
                >
                  <TableCell>{tournament._id}</TableCell>
                  <TableCell sx={{ color: "#000000", fontWeight: 500 }}>
                    {tournament.name}
                  </TableCell>
                  <TableCell>{tournament.game}</TableCell>
                  <TableCell>{tournament.gameMode}</TableCell>
                  <TableCell>{tournament.time}</TableCell>
                  <TableCell>{tournament.platform}</TableCell>
                  <TableCell>
                    <Chip
                      label={tournament.status}
                      size="small"
                      sx={{
                        bgcolor: getStatusColor(tournament.status).bg,
                        color: getStatusColor(tournament.status).color,
                        borderRadius: "4px",
                        fontWeight: 500,
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(tournament)} color="primary" size="small">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(tournament)} color="error" size="small">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 3,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
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

        {/* Edit Dialog */}
        <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
          <DialogTitle>Edit Tournament</DialogTitle>
          <DialogContent>
            <Box sx={{ mt: 2 }}>
              <TextField
                fullWidth
                label="Tournament Name"
                value={editFormData.name}
                onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Game"
                value={editFormData.game}
                onChange={(e) => setEditFormData({ ...editFormData, game: e.target.value })}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Game Mode"
                value={editFormData.gameMode}
                onChange={(e) => setEditFormData({ ...editFormData, gameMode: e.target.value })}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Platform"
                value={editFormData.platform}
                onChange={(e) => setEditFormData({ ...editFormData, platform: e.target.value })}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Time"
                value={editFormData.time}
                onChange={(e) => setEditFormData({ ...editFormData, time: e.target.value })}
                sx={{ mb: 2 }}
              />
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={editFormData.status}
                  label="Status"
                  onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value })}
                >
                  <MenuItem value="Registration Open">Registration Open</MenuItem>
                  <MenuItem value="Ongoing">Ongoing</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
            <Button onClick={handleEditSubmit} variant="contained">
              Save Changes
            </Button>
          </DialogActions>
        </Dialog>

        {/* Delete Dialog */}
        <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
          <DialogTitle>Delete Tournament</DialogTitle>
          <DialogContent>
            Are you sure you want to delete this tournament? This action cannot be undone.
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
            <Button onClick={handleDeleteConfirm} color="error" variant="contained">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </AdminDashboardLayout>
  );
}
