
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
    { text: "Tournaments", icon: <Award size={20} />, path: "/user/dashboard/tournaments" },
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
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav>
                <Image
                  src="/user1.png"
                  alt="username"
                  width={40}
                  height={40}
                  className="me-2 rounded-circle"
                />
                <span className="me-1">User Name</span>
                <ChevronDown size={16} />
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem>Profile</DropdownItem>
                <DropdownItem>Settings</DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={() => {
                  dispatch(logout());
                  router.push('/auth/login');
                }}>Logout</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Navbar>
        <main className="bg-light min-vh-100">{children}</main>
      </div>
    </div>
  );
}
