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
  User,
  Menu,
  X,
  ChevronDown,
  ChevronsLeft,
} from "react-feather";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const session = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { text: "Dashboard", icon: <Grid size={20} />, path: "/admin/dashboard" },
    {
      text: "Tournaments",
      icon: <Award size={20} />,
      path: "/admin/tournaments",
    },
    {
      text: "User Management",
      icon: <Users size={20} />,
      path: "/admin/users",
    },
    { text: "Pay Outs", icon: <DollarSign size={20} />, path: "/admin/payouts" },
    { text: "Chat", icon: <MessageSquare size={20} />, path: "/admin-chat" },
    { text: "Settings", icon: <Settings size={20} />, path: "/admin/settings" },
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
            <Link
              href={item.path}
              className={`d-flex align-items-center text-decoration-none mb-2 px-3 py-2 ${
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
            </Link>
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
          className="border-bottom  py-2 position-sticky top-0"
          style={{ zIndex: 1020 }}
        >
          <Button
            color="link"
            className="d-lg-none p-0 me-3"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={24} />
          </Button>

          <Breadcrumb listClassName="mb-0" listTag="div">
            <BreadcrumbItem href="#">Dashboard</BreadcrumbItem>
            <BreadcrumbItem href="#">Tournament Name</BreadcrumbItem>
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
                    src={
                      session.data?.user.profileImage ?? "/profile-avatar.png"
                    }
                    alt={session.data?.user?.name}
                    width={40}
                    height={40}
                    className="me-2"
                  />
                  {session.data?.user?.name} <ChevronDown size={16} />
                </DropdownToggle>
                <DropdownMenu className="position-absolute" right>
                  <DropdownItem>Profile</DropdownItem>
                  <DropdownItem>Settings</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem
                    onClick={() => {
                      dispatch(logout());
                      signOut({ redirect: false }).then(() =>
                        router.push("/auth/login")
                      );
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