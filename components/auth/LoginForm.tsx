import { useState } from 'react';
import { Box, TextField, Button, Typography, InputAdornment, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
}

export default function LoginForm({ onSubmit }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', maxWidth: '400px' }}>
      <Box sx={{ mb: 3 }}>
        <Typography sx={{ color: '#666', mb: 1 }}>Email</Typography>
        <TextField
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Shawn@axiom.com"
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'white',
              borderRadius: '8px',
              color: 'black'
            }
          }}
        />
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography sx={{ color: '#666', mb: 1 }}>Password</Typography>
        <TextField
          fullWidth
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'white',
              borderRadius: '8px',
              color: 'black'
            }
          }}
        />
      </Box>

      <Typography 
        sx={{ 
          textAlign: 'right', 
          mb: 3, 
          color: '#666',
          cursor: 'pointer',
          '&:hover': { textDecoration: 'underline' }
        }}
      >
        Forgot password?
      </Typography>

      <Button
        fullWidth
        type="submit"
        sx={{
          backgroundColor: '#FFD700',
          color: 'black',
          py: 1.5,
          borderRadius: '8px',
          '&:hover': {
            backgroundColor: '#F4C430',
          }
        }}
      >
        Login
      </Button>
    </Box>
  );
}