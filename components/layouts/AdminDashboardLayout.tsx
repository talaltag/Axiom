
import { useState } from 'react';
import { Container, Nav, NavItem, NavLink, Navbar, Button, Badge } from 'reactstrap';
import { useRouter } from 'next/router';
import Image from 'next/image';
import {
  Grid,
  Award,
  Users,
  DollarSign,
  MessageSquare,
  Settings,
  Bell,
  User,
  Menu,
  X
} from 'react-feather';

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { text: 'Dashboard', icon: <Grid size={20} />, path: '/admin/dashboard' },
    { text: 'Tournament Management', icon: <Award size={20} />, path: '/admin/tournaments' },
    { text: 'User Management', icon: <Users size={20} />, path: '/admin/users' },
    { text: 'Pay Outs', icon: <DollarSign size={20} />, path: '/admin/payouts' },
    { text: 'Chat', icon: <MessageSquare size={20} />, path: '/admin/chat' },
    { text: 'Settings', icon: <Settings size={20} />, path: '/admin/settings' },
  ];

  return (
    <div className="d-flex">
      <Nav
        vertical
        className={`bg-white border-end sidebar ${sidebarOpen ? 'open' : ''}`}
        style={{
          width: '240px',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          zIndex: 1030,
          transition: 'transform 0.3s ease-in-out',
          transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)'
        }}
      >
        <div className="p-3 d-flex align-items-center">
          <Image src="/axiom.png" alt="Axiom" width={40} height={40} />
          <Button
            color="link"
            className="d-lg-none ms-auto p-0"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={24} />
          </Button>
        </div>
        {menuItems.map((item) => (
          <NavItem key={item.text}>
            <NavLink
              href={item.path}
              className={`d-flex align-items-center px-3 py-2 ${
                router.pathname === item.path ? 'bg-warning text-dark' : 'text-muted'
              }`}
            >
              <span className="me-2">{item.icon}</span>
              {item.text}
            </NavLink>
          </NavItem>
        ))}
      </Nav>

      <div className="flex-grow-1" style={{ marginLeft: sidebarOpen ? '240px' : '0', transition: 'margin 0.3s ease-in-out' }}>
        <Navbar color="white" light className="border-bottom px-4 py-3 position-sticky top-0" style={{ zIndex: 1020 }}>
          <Button
            color="link"
            className="d-lg-none p-0 me-3"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={24} />
          </Button>
          <div className="d-flex align-items-center">
            <Image src="/axiom.png" alt="Axiom" width={40} height={40} />
          </div>
          <Nav className="ms-auto d-flex align-items-center" navbar>
            <div className="d-flex align-items-center me-3">
              <NavItem className="me-3">
                <Button color="link" className="position-relative p-0">
                  <Bell size={20} className="text-muted" />
                  <Badge color="danger" pill className="position-absolute top-0 end-0">2</Badge>
                </Button>
              </NavItem>
              <NavItem>
                <Button color="link" className="position-relative p-0">
                  <MessageSquare size={20} className="text-muted" />
                  <Badge color="danger" pill className="position-absolute top-0 end-0">4</Badge>
                </Button>
              </NavItem>
            </div>
            <NavItem className="dropdown">
              <Button color="link" className="nav-link dropdown-toggle d-flex align-items-center">
                <User size={20} className="me-2" />
                <span>Shawn Hanks</span>
              </Button>
            </NavItem>
          </Nav>
        </Navbar>
        <main className="bg-light min-vh-100">
          {children}
        </main>
      </div>
    </div>
  );
}
