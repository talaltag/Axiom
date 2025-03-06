import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  Card,
  Button,
  Spinner,
} from "reactstrap";
import UserDashboardLayout from "../../components/layouts/UserDashboardLayout";
import Image from "next/image";
import classnames from "classnames";

export default function Notifications() {
  const [activeTab, setActiveTab] = useState("all");
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/notifications", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        setNotifications(data.data);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (notificationId: string, action: string) => {
    try {
      const response = await fetch(
        `/api/notifications/${notificationId}/handle`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ action }),
        }
      );

      if (response.ok) {
        // Update friend request status
        const data = await response.json();
        if (data.friendRequestId) {
          await fetch(`/api/friend-requests/${data.friendRequestId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: action }),
          });

          // Emit event to refresh users list
          const event = new CustomEvent("friendRequestHandled");
          window.dispatchEvent(event);

          // Update notifications state locally
          setNotifications((prevNotifications) =>
            prevNotifications.map((notification) =>
              notification._id === notificationId
                ? { ...notification, status: action }
                : notification
            )
          );
        }
      }
    } catch (error) {
      console.error("Error handling notification action:", error);
    }
  };

  return (
    <UserDashboardLayout>
      <Container>
        <h2 className="mb-4">Notifications</h2>
        <Nav tabs className="mb-4">
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "all" })}
              onClick={() => setActiveTab("all")}
            >
              All
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "unread" })}
              onClick={() => setActiveTab("unread")}
            >
              Unread
            </NavLink>
          </NavItem>
        </Nav>

        {loading ? (
          <div className="text-center">
            <Spinner color="primary" />
          </div>
        ) : (
          <Row>
            {notifications.map((notification: any) => (
              <Col md={12} key={notification._id} className="mb-3">
                <Card body>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <Image
                        src="/user1.png"
                        alt="User"
                        width={40}
                        height={40}
                        className="rounded-circle me-3"
                      />
                      <div>
                        <h6 className="mb-1">{notification.title}</h6>
                        <small className="text-muted">
                          {new Date(notification.createdAt).toLocaleString()}
                        </small>
                      </div>
                    </div>
                    {notification.type === "friend_request" &&
                      notification.status === "pending" && (
                        <div>
                          <Button
                            color="success"
                            size="sm"
                            className="me-2"
                            onClick={() =>
                              handleAction(notification._id, "accepted")
                            }
                          >
                            Accept
                          </Button>
                          <Button
                            color="danger"
                            size="sm"
                            onClick={() =>
                              handleAction(notification._id, "rejected")
                            }
                          >
                            Reject
                          </Button>
                        </div>
                      )}
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </UserDashboardLayout>
  );
}
