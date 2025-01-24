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
} from "react-feather";

export default function UserDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { text: "Dashboard", icon: <Grid size={20} />, path: "/user/dashboard" },
    {
      text: "Tournaments",
      icon: <Award size={20} />,
      path: "/user/dashboard/tournaments",
    },
    { text: "Friends", icon: <Users size={20} />, path: "/user/friends" },
    { text: "Wallet", icon: <DollarSign size={20} />, path: "/user/wallet" },
    { text: "Chat", icon: <MessageSquare size={20} />, path: "/user/chat" },
    { text: "Settings", icon: <Settings size={20} />, path: "/user/settings" },
  ];

  return (
    <div className="d-flex">
      <Nav
        vertical
        className={`bg-white border-end sidebar ${sidebarOpen ? "open" : ""}`}
        style={{
          width: sidebarOpen ? "240px" : "64px",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          zIndex: 1030,
          transition: "all 0.3s ease-in-out",
        }}
      >
        <div className="p-3 d-flex align-items-center mb-2">
          <div className="d-flex w-100 align-items-center justify-content-between">
            {sidebarOpen && (
              <Image src="/axiom-logo.png" alt="Axiom" width={70} height={45} />
            )}
            <Button
              className="p-0"
              color="initial"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <ChevronsLeft
                size={24}
                style={{
                  transform: sidebarOpen ? "rotate(0deg)" : "rotate(180deg)",
                  transition: "transform 0.3s ease-in-out",
                }}
              />
            </Button>
          </div>
        </div>
        {menuItems.map((item) => (
          <NavItem key={item.text}>
            <NavLink
              href={item.path}
              className={`d-flex align-items-center mb-2 px-3 py-2 ${
                router.pathname === item.path
                  ? "bg-warning text-dark"
                  : "text-muted"
              }`}
              style={{
                justifyContent: sidebarOpen ? "flex-start" : "center",
                whiteSpace: "nowrap",
              }}
            >
              <span className={sidebarOpen ? "me-2" : ""}>{item.icon}</span>
              {sidebarOpen && item.text}
            </NavLink>
          </NavItem>
        ))}
      </Nav>

      <div
        className="flex-grow-1"
        style={{
          marginLeft: sidebarOpen ? "240px" : "64px",
          transition: "margin 0.3s ease-in-out",
        }}
      >
        <Navbar
          color="white"
          light
          className="border-bottom py-2 position-sticky top-0"
          style={{ zIndex: 1020 }}
        >
          <Breadcrumb listClassName="mb-0" listTag="div">
            <BreadcrumbItem href="#">Dashboard</BreadcrumbItem>
          </Breadcrumb>

          <Nav className="ms-auto d-flex align-items-center" navbar>
            <div className="d-flex align-items-center me-3">
              <NavItem className="me-3">
                <Button color="link" className="position-relative p-0">
                  <Bell size={20} className="text-muted" />
                  <Badge
                    color="danger"
                    pill
                    className="position-absolute top-0 end-0 d-flex align-items-center justify-content-center"
                    style={{ width: "16px", height: "16px" }}
                  >
                    2
                  </Badge>
                </Button>
              </NavItem>
              <NavItem className="me-3">
                <Button color="link" className="position-relative p-0">
                  <MessageSquare size={20} className="text-muted" />
                  <Badge
                    color="danger"
                    pill
                    className="position-absolute top-0 end-0 d-flex align-items-center justify-content-center"
                    style={{ width: "16px", height: "16px" }}
                  >
                    4
                  </Badge>
                </Button>
              </NavItem>
              <UncontrolledDropdown dropup nav inNavbar>
                <DropdownToggle nav>
                  <Image
                    src="/user1.png"
                    alt="username"
                    width={40}
                    height={40}
                    className="me-2"
                  />
                  Shan Hacks <ChevronDown size={16} />
                </DropdownToggle>
                <DropdownMenu className="position-absolute" right>
                  <DropdownItem>Profile</DropdownItem>
                  <DropdownItem>Settings</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem
                    onClick={() => {
                      dispatch(logout());
                      router.push("/auth/login");
                    }}
                  >
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
          </Nav>
        </Navbar>
        <main className="bg-light min-vh-100">{children}</main>
      </div>
    </div>
  );
}
import { ReactNode, useState } from 'react';
import {
  Container,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  Home,
  Award,
  BarChart2,
  Users,
  User,
  Settings,
  LogOut,
  MessageSquare,
  Wallet,
} from 'react-feather';
import Image from 'next/image';

interface Props {
  children: ReactNode;
}

export default function UserDashboardLayout({ children }: Props) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/auth/login');
  };

  const isActive = (path: string) => router.pathname === path;

  return (
    <div className="d-flex">
      <div
        className="bg-white shadow-sm"
        style={{
          width: '240px',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          overflowY: 'auto',
        }}
      >
        <div className="p-4">
          <Image src="/axiom.png" alt="Logo" width={120} height={40} priority />
        </div>
        <Nav vertical className="p-3">
          <NavItem>
            <Link href="/user/dashboard" passHref legacyBehavior>
              <NavLink
                className={`mb-2 ${isActive('/user/dashboard') ? 'bg-warning text-white' : ''}`}
                style={{ borderRadius: '8px' }}
              >
                <Home size={18} className="me-2" /> Dashboard
              </NavLink>
            </Link>
          </NavItem>
          <NavItem>
            <Link href="/user/dashboard/tournaments" passHref legacyBehavior>
              <NavLink
                className={`mb-2 ${isActive('/user/dashboard/tournaments') ? 'bg-warning text-white' : ''}`}
                style={{ borderRadius: '8px' }}
              >
                <Award size={18} className="me-2" /> Tournaments
              </NavLink>
            </Link>
          </NavItem>
          <NavItem>
            <Link href="/user/dashboard/statistics" passHref legacyBehavior>
              <NavLink
                className={`mb-2 ${isActive('/user/dashboard/statistics') ? 'bg-warning text-white' : ''}`}
                style={{ borderRadius: '8px' }}
              >
                <BarChart2 size={18} className="me-2" /> Statistics
              </NavLink>
            </Link>
          </NavItem>
          <NavItem>
            <Link href="/user/dashboard/friends" passHref legacyBehavior>
              <NavLink
                className={`mb-2 ${isActive('/user/dashboard/friends') ? 'bg-warning text-white' : ''}`}
                style={{ borderRadius: '8px' }}
              >
                <Users size={18} className="me-2" /> Friends
              </NavLink>
            </Link>
          </NavItem>
          <NavItem>
            <Link href="/user/dashboard/wallet" passHref legacyBehavior>
              <NavLink
                className={`mb-2 ${isActive('/user/dashboard/wallet') ? 'bg-warning text-white' : ''}`}
                style={{ borderRadius: '8px' }}
              >
                <Wallet size={18} className="me-2" /> Wallet
              </NavLink>
            </Link>
          </NavItem>
          <NavItem>
            <Link href="/user/dashboard/chat" passHref legacyBehavior>
              <NavLink
                className={`mb-2 ${isActive('/user/dashboard/chat') ? 'bg-warning text-white' : ''}`}
                style={{ borderRadius: '8px' }}
              >
                <MessageSquare size={18} className="me-2" /> Chat
              </NavLink>
            </Link>
          </NavItem>
          <NavItem>
            <Link href="/user/dashboard/settings" passHref legacyBehavior>
              <NavLink
                className={`mb-2 ${isActive('/user/dashboard/settings') ? 'bg-warning text-white' : ''}`}
                style={{ borderRadius: '8px' }}
              >
                <Settings size={18} className="me-2" /> Settings
              </NavLink>
            </Link>
          </NavItem>
        </Nav>
      </div>
      <div style={{ marginLeft: '240px', width: 'calc(100% - 240px)' }}>
        <Navbar color="white" light className="shadow-sm">
          <Nav className="ms-auto" navbar>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav>
                <div className="d-flex align-items-center">
                  <div className="position-relative me-2" style={{ width: '32px', height: '32px' }}>
                    <Image
                      src="/user1.png"
                      alt="Profile"
                      fill
                      style={{ objectFit: 'cover', borderRadius: '50%' }}
                    />
                  </div>
                  <User size={20} />
                </div>
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem>Profile</DropdownItem>
                <DropdownItem>Settings</DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={handleLogout}>
                  <LogOut size={14} className="me-2" /> Logout
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Navbar>
        {children}
      </div>
    </div>
  );
}
