import { Box, Container, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import LoginForm from '../../components/auth/LoginForm';
import Logo from '../../components/auth/Logo';

const ADMIN_CREDENTIALS = {
  email: 'admin@axiom.com',
  password: 'admin123'
};

export default function Login() {
  const router = useRouter();

  const handleLogin = (email: string, password: string) => {
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      localStorage.setItem('adminAuth', 'true');
      router.push('/admin/dashboard');
    } else {
      //This part is added to handle the error case as in original code.
      alert("Invalid Credentials")
    }
  };

  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        display: 'flex',
        background: 'linear-gradient(to right, #FFFFFF 50%, #f5f5f5 50%)'
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          p: 4,
          position: 'relative'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4
          }}
        >
          <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
            Welcome to
          </Typography>
          <Logo />
        </Box>
        <Typography 
          sx={{ 
            position: 'absolute', 
            bottom: 24, 
            color: '#666'
          }}
        >
          © 2024 Axiom
        </Typography>
      </Box>

      <Box
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          p: 4,
        }}
      >
        <LoginForm onSubmit={handleLogin} />
      </Box>
    </Box>
  );
}