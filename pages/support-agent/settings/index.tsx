
import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Avatar,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Grid,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import SupportAgentLayout from "../../../components/layouts/SupportAgentLayout";
import { useSession } from "next-auth/react";

export default function Settings() {
  const session = useSession();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    name: session.data?.user?.name || "",
  });
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    name: false,
    password: false,
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const validateForm = () => {
    const newErrors = {
      name: !formData.name.trim(),
      password: false,
    };

    if (formData.oldPassword || formData.newPassword || formData.confirmPassword) {
      newErrors.password = !(formData.oldPassword && formData.newPassword && formData.confirmPassword);
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      const submitData = new FormData();
      
      if (profileImage) {
        submitData.append('profileImage', profileImage);
      }
      submitData.append('name', formData.name);

      if (formData.oldPassword && formData.newPassword && formData.confirmPassword) {
        submitData.append('oldPassword', formData.oldPassword);
        submitData.append('newPassword', formData.newPassword);
        submitData.append('confirmPassword', formData.confirmPassword);
      }

      const response = await fetch('/api/agent/profile', {
        method: 'PUT',
        body: submitData,
      });

      if (response.ok) {
        alert('Profile updated successfully');
      } else {
        const data = await response.json();
        throw new Error(data.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert(error.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

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
              src={imagePreview || session.data?.user?.image || "/user1.png"}
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
              <label htmlFor="profile-image" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span role="img" aria-label="camera">📸</span>
                <input
                  type="file"
                  id="profile-image"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleImageChange}
                />
              </label>
            </Box>
          </Box>
        </Box>

        <Box sx={{ width: '100%' }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 3 }}>
                <Typography sx={{ mb: 1, fontWeight: 500 }}>Full Name*</Typography>
                <TextField
                  fullWidth
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  error={errors.name}
                  helperText={errors.name && "Full name is required"}
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
                <Typography sx={{ mb: 1, fontWeight: 500 }}>Email</Typography>
                <TextField
                  fullWidth
                  disabled
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
                  error={errors.password && !!formData.newPassword}
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
                  error={errors.password && !!formData.oldPassword}
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
                  error={errors.password && !!formData.oldPassword}
                  helperText={errors.password && "All password fields are required when changing password"}
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
              onClick={handleSubmit}
              disabled={loading}
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
              {loading ? 'Updating...' : 'Update'}
            </Button>
          </Box>
        </Box>
      </Box>
    </SupportAgentLayout>
  );
}
