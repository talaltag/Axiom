
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, AppBar, Toolbar, Typography, Avatar, Badge } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import GroupIcon from '@mui/icons-material/Group';
import PaymentsIcon from '@mui/icons-material/Payments';
import ChatIcon from '@mui/icons-material/Chat';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Image from 'next/image';
import { useRouter } from 'next/router';

const drawerWidth = 240;

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin/dashboard' },
    { text: 'Tournament Management', icon: <EmojiEventsIcon />, path: '/admin/tournaments' },
    { text: 'User Management', icon: <GroupIcon />, path: '/admin/users' },
    { text: 'Pay Outs', icon: <PaymentsIcon />, path: '/admin/payouts' },
    { text: 'Chat', icon: <ChatIcon />, path: '/admin/chat' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/admin/settings' },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar 
        position="fixed" 
        sx={{ 
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: 'white',
          boxShadow: 'none',
          borderBottom: '1px solid #eee'
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Image src="/axiom.png" alt="Axiom Gaming" width={40} height={40} />
            <Typography variant="h6" color="black" sx={{ ml: 1 }}>
              Dashboard
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Badge badgeContent={2} color="error">
              <NotificationsIcon sx={{ color: '#666' }} />
            </Badge>
            <Badge badgeContent={4} color="error">
              <ChatIcon sx={{ color: '#666' }} />
            </Badge>
            <Avatar sx={{ ml: 2 }}>SH</Avatar>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor: 'white',
            borderRight: '1px solid #eee',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto', mt: 2 }}>
          <List>
            {menuItems.map((item) => (
              <ListItem
                button
                key={item.text}
                sx={{
                  mb: 1,
                  mx: 1,
                  borderRadius: 1,
                  bgcolor: router.pathname === item.path ? '#ffbb00' : 'transparent',
                  '&:hover': {
                    bgcolor: router.pathname === item.path ? '#ffbb00' : '#f5f5f5',
                  },
                }}
                onClick={() => router.push(item.path)}
              >
                <ListItemIcon sx={{ 
                  color: router.pathname === item.path ? '#000' : '#666',
                  minWidth: '40px'
                }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text}
                  sx={{ 
                    '& .MuiTypography-root': { 
                      fontWeight: router.pathname === item.path ? 600 : 400,
                      color: router.pathname === item.path ? '#000' : '#666',
                      fontSize: '0.9rem'
                    }
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: '#f8f9fa', minHeight: '100vh' }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
