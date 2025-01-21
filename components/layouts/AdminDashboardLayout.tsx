
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
            <Typography variant="h6" color="black">
              Dashboard
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Badge badgeContent={2} color="error">
              <NotificationsIcon color="action" />
            </Badge>
            <Badge badgeContent={4} color="error">
              <ChatIcon color="action" />
            </Badge>
            <Avatar>SH</Avatar>
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
            bgcolor: '#f8f9fa',
            border: 'none',
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
                  bgcolor: router.pathname === item.path ? '#ffc107' : 'transparent',
                  '&:hover': {
                    bgcolor: router.pathname === item.path ? '#ffc107' : '#f0f0f0',
                  },
                }}
                onClick={() => router.push(item.path)}
              >
                <ListItemIcon sx={{ color: router.pathname === item.path ? 'black' : 'inherit' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text}
                  sx={{ 
                    '& .MuiTypography-root': { 
                      fontWeight: router.pathname === item.path ? 600 : 400 
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
