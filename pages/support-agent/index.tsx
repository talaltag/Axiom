
import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  ListGroup,
  Tab,
  Nav,
  Badge,
  Image,
} from "react-bootstrap";
import SupportAgentLayout from "../../components/layouts/SupportAgentLayout";
import ChatWindow from "../../components/chat/ChatWindow";

interface User {
  _id: string;
  name: string;
  profileImage?: string;
  role: string;
}

export default function SupportAgentChatScreen() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [currentAgent] = useState<User>({
    _id: "support-agent",
    name: "Support Agent",
    role: "Support"
  });
  const [activeTab, setActiveTab] = useState("users");

  const fetchUsers = async (role: string = "User") => {
    try {
      const response = await fetch(`/api/users?role=${role}`);
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

  return (
    <SupportAgentLayout>
      <Container fluid className="h-100">
        <Row className="h-100">
          <Col md={3} className="border-end p-0">
            <Nav 
              variant="pills" 
              className="bg-light p-2 justify-content-center"
              onSelect={(k) => {
                setActiveTab(k || "users");
                setSelectedUser(null);
              }}
            >
              <Nav.Item>
                <Nav.Link eventKey="users" active={activeTab === "users"}>
                  Users
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="admin" active={activeTab === "admin"}>
                  Admin
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <ListGroup variant="flush">
              {users.map((user) => (
                <ListGroup.Item
                  key={user._id}
                  action
                  active={selectedUser?._id === user._id}
                  className="d-flex align-items-center p-3"
                  onClick={() => setSelectedUser(user)}
                >
                  <Image
                    src={user.profileImage || "/user1.png"}
                    roundedCircle
                    width={40}
                    height={40}
                    className="me-3"
                  />
                  <div>
                    <div className="fw-bold">{user.name}</div>
                    <small className="text-muted">{user.role}</small>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          <Col md={9} className="p-0">
            {selectedUser ? (
              <ChatWindow
                currentUser={currentAgent}
                receiver={selectedUser}
              />
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
