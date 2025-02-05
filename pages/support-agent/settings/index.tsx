
import { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import SupportAgentLayout from "../../../components/layouts/SupportAgentLayout";
import { useSession } from "next-auth/react";

export default function Settings() {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const session = useSession();

  return (
    <SupportAgentLayout>
      <Box sx={{ p: 3, width: '100%' }}>
        <Typography variant="h6" sx={{ mb: 1, fontWeight: 500 }}>
          Settings
        </Typography>
        <Typography variant="body2" sx={{ mb: 4, color: "#6C757D" }}>
          Manage your team and preferences here.
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
          <Box sx={{ position: 'relative' }}>
            <Avatar
              src={session.data?.user?.image || "/user1.png"}
              sx={{ width: 100, height: 100, mr: 2 }}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: -5,
                right: 10,
                backgroundColor: '#FFD700',
                borderRadius: '50%',
                width: 32,
                height: 32,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <span role="img" aria-label="camera">📸</span>
            </Box>
          </Box>
        </Box>

        <Box sx={{ width: '100%' }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 3 }}>
                <Typography sx={{ mb: 1, fontWeight: 500 }}>Axiom Username</Typography>
                <TextField
                  fullWidth
                  placeholder="Axiom Username"
                  value={session.data?.user?.email || ""}
                  sx={{
                    backgroundColor: "#F8F9FA",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#E9ECEF",
                      },
                    },
                  }}
                />
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 3 }}>
                <Typography sx={{ mb: 1, fontWeight: 500 }}>Verification Status</Typography>
                <TextField
                  fullWidth
                  placeholder="Verification Status"
                  disabled
                  sx={{
                    backgroundColor: "#F8F9FA",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#E9ECEF",
                      },
                    },
                  }}
                />
              </Box>
            </Grid>

          <Typography variant="h6" sx={{ mt: 2, mb: 3, fontWeight: 500 }}>
            Password
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Box sx={{ mb: 3 }}>
                <Typography sx={{ mb: 1, fontWeight: 500 }}>Old Password</Typography>
                <TextField
                  fullWidth
                  type={showOldPassword ? "text" : "password"}
                  placeholder="Old Password"
                  value={formData.oldPassword}
                  onChange={(e) => setFormData({ ...formData, oldPassword: e.target.value })}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowOldPassword(!showOldPassword)} edge="end">
                          {showOldPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    backgroundColor: "#F8F9FA",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#E9ECEF",
                      },
                    },
                  }}
                />
              </Box>
            </Grid>

            <Grid item xs={12} md={4}>
              <Box sx={{ mb: 3 }}>
                <Typography sx={{ mb: 1, fontWeight: 500 }}>New Password</Typography>
                <TextField
                  fullWidth
                  type={showNewPassword ? "text" : "password"}
                  placeholder="New Password"
                  value={formData.newPassword}
                  onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowNewPassword(!showNewPassword)} edge="end">
                          {showNewPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    backgroundColor: "#F8F9FA",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#E9ECEF",
                      },
                    },
                  }}
                />
              </Box>
            </Grid>

            <Grid item xs={12} md={4}>
              <Box sx={{ mb: 3 }}>
                <Typography sx={{ mb: 1, fontWeight: 500 }}>Confirm Password</Typography>
                <TextField
                  fullWidth
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                          {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    backgroundColor: "#F8F9FA",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#E9ECEF",
                      },
                    },
                  }}
                />
              </Box>
            </Grid>
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#FFD700",
                color: "#000",
                textTransform: "none",
                px: 4,
                "&:hover": {
                  backgroundColor: "#FFC700",
                },
              }}
            >
              Update
            </Button>
          </Box>
        </Box>
      </Box>
    </SupportAgentLayout>
  );
}
