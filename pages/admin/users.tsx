
import { useState, useEffect } from 'react';
import CreateUserModal from '../../components/users/CreateUserModal';
import DeleteUserModal from '../../components/users/DeleteUserModal';
import AdminDashboardLayout from '../../components/layouts/AdminDashboardLayout';
import {
  Box,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Menu,
  MenuItem,
  Select,
  Avatar,
  Checkbox,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Search, FilterList, MoreVert, Add } from '@mui/icons-material';
import { useRouter } from 'next/router';

export default function UserManagement() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('');
  const [selected, setSelected] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  
  const toggleCreateModal = () => setCreateModalOpen(!createModalOpen);
  const toggleDeleteModal = () => setDeleteModalOpen(!deleteModalOpen);

  useEffect(() => {
    const isAdmin = localStorage.getItem('adminAuth');
    if (!isAdmin) {
      router.push('/auth/login');
      return;
    }
    fetchUsers();
  }, [page, limit, search, filterType]);

  const fetchUsers = async () => {
    try {
      const res = await fetch(
        `/api/users?page=${page}&limit=${limit}&search=${search}&type=${filterType}`
      );
      const data = await res.json();
      if (data.success) {
        setUsers(data.data);
        setTotal(data.total);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleActionClick = (event, userId) => {
    setAnchorEl({ element: event.currentTarget, id: userId });
  };

  const handleActionClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setCreateModalOpen(true);
    handleActionClose();
  };

  const handleDelete = (user) => {
    setSelectedUser(user);
    setDeleteModalOpen(true);
    handleActionClose();
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelected(users.map(user => user._id));
    } else {
      setSelected([]);
    }
  };

  const handleSelect = (id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = [...selected, id];
    } else {
      newSelected = selected.filter(item => item !== id);
    }

    setSelected(newSelected);
  };

  return (
    <AdminDashboardLayout>
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h5">User Management</Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => {
              setSelectedUser(null);
              setCreateModalOpen(true);
            }}
          >
            Create User
          </Button>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <TextField
            placeholder="Search users..."
            variant="outlined"
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: <Search sx={{ color: 'text.secondary', mr: 1 }} />,
            }}
            sx={{ flexGrow: 1 }}
          />
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Filter Type</InputLabel>
            <Select
              value={filterType}
              label="Filter Type"
              onChange={(e) => setFilterType(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="Basic">Basic</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selected.length === users.length}
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>S.No</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>C-Name</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user, index) => (
                <TableRow key={user._id}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selected.includes(user._id)}
                      onChange={() => handleSelect(user._id)}
                    />
                  </TableCell>
                  <TableCell>{(page - 1) * limit + index + 1}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Avatar src={user.profileImage} alt={user.name} />
                      {user.name}
                    </Box>
                  </TableCell>
                  <TableCell>{user.cName}</TableCell>
                  <TableCell>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <IconButton onClick={(e) => handleActionClick(e, user._id)}>
                      <MoreVert />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Select
            size="small"
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
          >
            <MenuItem value={10}>10 per page</MenuItem>
            <MenuItem value={20}>20 per page</MenuItem>
            <MenuItem value={30}>30 per page</MenuItem>
          </Select>
          <Box>
            Showing {(page - 1) * limit + 1} - {Math.min(page * limit, total)} of {total}
          </Box>
        </Box>

        <Menu
          anchorEl={anchorEl?.element}
          open={Boolean(anchorEl)}
          onClose={handleActionClose}
        >
          <MenuItem onClick={() => handleEdit(users.find(u => u._id === anchorEl?.id))}>Edit</MenuItem>
          <MenuItem onClick={() => handleDelete(users.find(u => u._id === anchorEl?.id))}>Delete</MenuItem>
        </Menu>

        <CreateUserModal
          isOpen={createModalOpen}
          toggle={toggleCreateModal}
          editUser={selectedUser}
          onSuccess={fetchUsers}
        />

        <DeleteUserModal
          isOpen={deleteModalOpen}
          toggle={toggleDeleteModal}
          userId={selectedUser?._id}
          onSuccess={fetchUsers}
        />
      </Box>
    </AdminDashboardLayout>
  );
}
