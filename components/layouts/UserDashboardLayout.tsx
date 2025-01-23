import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, AppBar, Toolbar, Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import PeopleIcon from '@mui/icons-material/People';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ChatIcon from '@mui/icons-material/Chat';
import SettingsIcon from '@mui/icons-material/Settings';
import { useRouter } from 'next/router'; // Import useRouter

const drawerWidth = 240;

export default function UserDashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard', onClick: () => router.push('/dashboard') },
    { text: 'Tournaments', icon: <EmojiEventsIcon />, path: '/tournaments', onClick: () => router.push('/tournaments') },
    { text: 'Leaderboard', icon: <LeaderboardIcon />, path: '/leaderboard', onClick: () => router.push('/leaderboard') },
    { text: 'Friends', icon: <PeopleIcon />, path: '/friends', onClick: () => router.push('/friends') },
    { text: 'Wallet', icon: <AccountBalanceWalletIcon />, path: '/wallet', onClick: () => router.push('/wallet') },
    { text: 'Chat', icon: <ChatIcon />, path: '/chat', onClick: () => router.push('/chat') },
    { text: 'Settings', icon: <SettingsIcon />, path: '/settings', onClick: () => router.push('/settings') },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Axiom Gaming
          </Typography>
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
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {menuItems.map((item) => (
              <ListItem button key={item.text} onClick={item.onClick}> {/* Added onClick handler */}
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}