import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Nav,
  NavItem,
  NavLink,
  Badge,
} from "reactstrap";
import SupportAgentLayout from "../../components/layouts/SupportAgentLayout";
import ChatWindow from "../../components/chat/ChatWindow";
import { useSession } from "next-auth/react";

interface User {
  _id: string;
  name: string;
  profileImage?: string;
}

export default function SupportAgentChatScreen() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState("users");

  const session = useSession();

  const fetchUsers = async (role: string = "User") => {
    try {
      const response = await fetch(`/api/agent/users?role=${role}`);
      if (response.ok) {
        const data = await response.json();
        setUsers(data.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers(activeTab === "users" ? "User" : "Admin");
  }, [activeTab]);

  useEffect(() => {
    if (session.data?.user?.id && session.data.user.name) {
      setCurrentUser({
        _id: session.data.user.id,
        name: session.data.user.name,
        profileImage: session.data.user.image,
      });
    }
  }, [session.data]);

  return (
    <SupportAgentLayout>
      <Container fluid className="h-100">
        <Row className="h-100">
          <Col md={3} className="border-end p-0">
            <Nav pills className="bg-light p-2 justify-content-center">
              <NavItem>
                <NavLink
                  active={activeTab === "users"}
                  onClick={() => {
                    setActiveTab("users");
                    setSelectedUser(null);
                  }}
                >
                  Users
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={activeTab === "admin"}
                  onClick={() => {
                    setActiveTab("admin");
                    setSelectedUser(null);
                  }}
                >
                  Admin
                </NavLink>
              </NavItem>
            </Nav>
            <ListGroup flush>
              {users.map((user) => (
                <ListGroupItem
                  key={user._id}
                  action
                  active={selectedUser?._id === user._id}
                  className="d-flex align-items-center p-3"
                  onClick={() => setSelectedUser(user)}
                >
                  <img
                    src={user.profileImage || "/user1.png"}
                    className="rounded-circle me-3"
                    width={40}
                    height={40}
                    alt={user.name}
                  />
                  <div>
                    <div className="fw-bold">{user.name}</div>
                  </div>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>
          <Col md={9} className="p-0">
            {selectedUser ? (
              <ChatWindow currentUser={currentUser} receiver={selectedUser} />
            ) : (
              <div className="h-100 d-flex align-items-center justify-content-center text-muted">
                Select a user to start chatting
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </SupportAgentLayout>
  );
}
