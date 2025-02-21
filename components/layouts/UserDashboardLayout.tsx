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
  ChevronsLeft,
  LogOut,
  BarChart2,
  ChevronDown,
} from "react-feather";
import Link from "next/link";
import NotificationsDropdown from "../common/NotificationsDropdown"; // Added import
import { signOut, useSession } from "next-auth/react";

export default function UserDashboardLayout({ children }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const session = useSession();

  const menuItems = [
    { text: "Dashboard", path: "/user/dashboard", icon: <Grid size={18} /> },
    {
      text: "Tournaments",
      path: "/user/dashboard/tournaments",
      icon: <Award size={18} />,
    },
    { text: "Friends", path: "/user/friends", icon: <Users size={18} /> },
    {
      text: "Statistics",
      path: "/user/statistics",
      icon: <BarChart2 size={18} />,
    },
    { text: "Wallet", path: "/user/wallet", icon: <DollarSign size={18} /> },
    { text: "Chat", path: "/chat", icon: <MessageSquare size={18} /> },
    { text: "Settings", path: "/user/settings", icon: <Settings size={18} /> },
  ];

  const handleLogout = () => {
    dispatch(logout());
    signOut({ redirect: false }).then(() => router.push("/auth/login"));
  };

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
            <Link
              href={item.path}
              className={`d-flex align-items-center mb-2 px-3 py-2 ${
                router.pathname === item.path
                  ? "bg-warning text-dark"
                  : "text-muted"
              }`}
              style={{ textDecoration: "none" }}
            >
              {item.icon}
              {sidebarOpen && <span className="ms-2">{item.text}</span>}
            </Link>
          </NavItem>
        ))}
      </Nav>

      <div
        style={{
          marginLeft: sidebarOpen ? "240px" : "64px",
          transition: "margin-left 0.3s ease-in-out",
          width: "100%",
        }}
      >
        <Navbar className="bg-white border-bottom px-4" container={false}>
          <Nav className="ms-auto d-flex align-items-center" navbar>
            <div className="d-flex align-items-center me-3">
              <NotificationsDropdown />{" "}
              {/* Placeholder for NotificationsDropdown */}
              <UncontrolledDropdown inNavbar nav className="ms-3">
                <DropdownToggle nav>
                  <Image
                    src={
                      session.data?.user.profileImage ?? "/profile-avatar.png"
                    }
                    alt={session.data?.user?.name}
                    width={32}
                    height={32}
                    className="rounded-circle me-2"
                  />
                  {session.data?.user?.name} <ChevronDown size={16} />
                </DropdownToggle>
                <DropdownMenu end className="position-absolute">
                  <DropdownItem onClick={handleLogout}>
                    <LogOut size={14} className="me-2" />
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
          </Nav>
        </Navbar>
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
}
