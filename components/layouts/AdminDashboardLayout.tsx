import { Container, Nav, NavItem, NavLink, Navbar, NavbarBrand, Button, Badge } from 'reactstrap';
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
  User
} from 'react-feather';

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
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
      <Nav vertical className="bg-white border-end" style={{ width: '240px', height: '100vh', position: 'fixed' }}>
        <div className="p-3">
          <Image src="/axiom.png" alt="Axiom" width={40} height={40} />
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

      <div style={{ marginLeft: '240px', width: 'calc(100% - 240px)' }}>
        <Navbar color="white" light className="border-bottom px-4">
          <NavbarBrand className="d-flex align-items-center">
            <Image src="/axiom.png" alt="Axiom" width={40} height={40} />
          </NavbarBrand>
          <Nav className="ms-auto d-flex align-items-center" navbar>
            <NavItem className="me-3">
              <Button color="link" className="position-relative p-0">
                <Bell size={20} className="text-muted" />
                <Badge color="danger" pill className="position-absolute top-0 end-0">2</Badge>
              </Button>
            </NavItem>
            <NavItem className="me-3">
              <Button color="link" className="position-relative p-0">
                <MessageSquare size={20} className="text-muted" />
                <Badge color="danger" pill className="position-absolute top-0 end-0">4</Badge>
              </Button>
            </NavItem>
            <NavItem className="dropdown">
              <Button color="link" className="nav-link dropdown-toggle d-flex align-items-center">
                <User size={20} className="me-2" />
                <span>Shawn Hanks</span>
              </Button>
              <div className="dropdown-menu dropdown-menu-end">
                <NavLink href="#" className="dropdown-item">Profile</NavLink>
                <NavLink
                  href="#"
                  className="dropdown-item"
                  onClick={() => {
                    localStorage.removeItem('adminAuth');
                    router.push('/auth/login');
                  }}
                >
                  Logout
                </NavLink>
              </div>
            </NavItem>
          </Nav>
        </Navbar>
        <main className="bg-light min-vh-100 p-4">
          {children}
        </main>
      </div>
    </div>
  );
}