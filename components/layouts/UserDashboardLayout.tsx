import { useState } from "react";
import {
  Container,
  Nav,
  NavItem,
  NavLink,
  Navbar,
  Button,
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import Image from "next/image";
import Link from 'next/link';
import {
  Grid,
  Award,
  Users,
  DollarSign,
  MessageSquare,
  Settings,
  Bell,
  ChevronDown,
  ChevronsLeft,
  Home,
  BarChart2,
  User,
  LogOut,
  Wallet
} from "react-feather";

interface Props {
  children: React.ReactNode;
}

export default function UserDashboardLayout({ children }: Props) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    dispatch(logout());
    router.push('/auth/login');
  };

  const isActive = (path: string) => router.pathname === path;

  const menuItems = [
    { text: "Dashboard", icon: <Home size={18} />, path: "/user/dashboard" },
    { text: "Tournaments", icon: <Award size={18} />, path: "/user/dashboard/tournaments" },
    { text: "Statistics", icon: <BarChart2 size={18} />, path: "/user/dashboard/statistics" },
    { text: "Friends", icon: <Users size={18} />, path: "/user/dashboard/friends" },
    { text: "Wallet", icon: <Wallet size={18} />, path: "/user/dashboard/wallet" },
    { text: "Chat", icon: <MessageSquare size={18} />, path: "/user/dashboard/chat" },
    { text: "Settings", icon: <Settings size={18} />, path: "/user/dashboard/settings" }
  ];

  return (
    <div className="d-flex">
      <Nav
        vertical
        className={`bg-white shadow-sm ${sidebarOpen ? "open" : ""}`}
        style={{
          width: sidebarOpen ? "240px" : "64px",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          overflowY: "auto",
          transition: "width 0.3s ease-in-out"
        }}
      >
        <div className="p-4 d-flex align-items-center">
          {sidebarOpen && <Image src="/axiom.png" alt="Logo" width={120} height={40} priority />}
          <Button
            color="link"
            className="ms-auto p-0"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <ChevronsLeft
              size={24}
              style={{
                transform: sidebarOpen ? "rotate(0deg)" : "rotate(180deg)",
                transition: "transform 0.3s ease-in-out"
              }}
            />
          </Button>
        </div>

        <Nav vertical className="p-3">
          {menuItems.map((item) => (
            <NavItem key={item.path}>
              <Link href={item.path} passHref legacyBehavior>
                <NavLink
                  className={`mb-2 ${isActive(item.path) ? "bg-warning text-white" : ""}`}
                  style={{ borderRadius: "8px" }}
                >
                  <span className="me-2">{item.icon}</span>
                  {sidebarOpen && item.text}
                </NavLink>
              </Link>
            </NavItem>
          ))}
        </Nav>
      </Nav>

      <div
        style={{
          marginLeft: sidebarOpen ? "240px" : "64px",
          width: `calc(100% - ${sidebarOpen ? "240px" : "64px"})`,
          transition: "margin-left 0.3s ease-in-out, width 0.3s ease-in-out"
        }}
      >
        <Navbar color="white" light className="shadow-sm">
          <Nav className="ms-auto" navbar>
            <NavItem className="me-3">
              <Button color="link" className="position-relative p-0">
                <Bell size={20} className="text-muted" />
                <Badge
                  color="danger"
                  pill
                  className="position-absolute top-0 end-0"
                  style={{ width: "16px", height: "16px" }}
                >
                  2
                </Badge>
              </Button>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav>
                <div className="d-flex align-items-center">
                  <Image src="/user1.png" alt="Profile" width={32} height={32} className="me-2" style={{ borderRadius: "50%" }} />
                  <span className="me-1">Shan Hacks</span>
                  <ChevronDown size={16} />
                </div>
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem>Profile</DropdownItem>
                <DropdownItem>Settings</DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={handleLogout}>
                  <LogOut size={14} className="me-2" />Logout
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Navbar>
        <main className="bg-light min-vh-100">{children}</main>
      </div>
    </div>
  );
}