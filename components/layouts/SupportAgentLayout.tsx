import { useState } from "react";
import {
  Nav,
  NavItem,
  NavLink,
  Navbar,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import Image from "next/image";
import { MessageSquare, ChevronsLeft, LogOut, Settings } from "react-feather";
import NotificationsDropdown from "../common/NotificationsDropdown";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function SupportAgentLayout({ children }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const session = useSession();
  const menuItems = [
    { text: "Chat", path: "/support-agent", icon: <MessageSquare size={18} /> },
    {
      text: "Settings",
      path: "/support-agent/settings",
      icon: <Settings size={18} />,
    },
  ];

  const handleLogout = () => {
    dispatch(logout());
    signOut({ redirect: false });
    router.push("/auth/login");
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
              <NotificationsDropdown role={"support-agent"} />{" "}
              {/* Placeholder for NotificationsDropdown */}
              <UncontrolledDropdown dropup inNavbar nav className="ms-3">
                <DropdownToggle nav>
                  <Image
                    src={
                      session?.data?.user?.profileImage || "/profile-avatar.png"
                    }
                    alt="User"
                    width={32}
                    height={32}
                    className="rounded-circle"
                  />
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
