
import { useState } from "react";
import UserDashboardLayout from "../../components/layouts/UserDashboardLayout";
import classnames from "classnames";
import {
  Container,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Row,
  Col,
  Input,
  Button,
  Form,
  FormGroup,
  Label,
  Alert,
} from "reactstrap";
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("myAccount");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [notificationSettings, setNotificationSettings] = useState({
    messageNotifications: true,
    tournamentAnnouncements: false,
    tournamentReminders: true,
    friendRequests: false
  });
  const [message, setMessage] = useState({ type: "", content: "" });
  const [profileImage, setProfileImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("/user1.png");
  const { data: session } = useSession();

  const handleNotificationToggle = (setting: string) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage({ type: "", content: "" });

    if (newPassword !== confirmPassword) {
      setMessage({ type: "danger", content: "New passwords do not match" });
      return;
    }

    try {
      const response = await fetch("/api/users/me/password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          oldPassword,
          newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: "success", content: "Password updated successfully" });
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setMessage({ type: "danger", content: data.message });
      }
    } catch (error) {
      setMessage({ type: "danger", content: "Failed to update password" });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleImageUpload = async () => {
    if (!profileImage) return;

    const formData = new FormData();
    formData.append("image", profileImage);

    try {
      const response = await fetch("/api/users/me/profile-image", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: "success", content: "Profile image updated successfully" });
      } else {
        setMessage({ type: "danger", content: data.message });
      }
    } catch (error) {
      setMessage({ type: "danger", content: "Failed to upload image" });
    }
  };

  return (
    <UserDashboardLayout>
      <Container fluid className="p-4">
        <h3 className="mb-2">Settings</h3>
        <p className="text-muted mb-4">Manage your team and preferences here.</p>

        <Nav tabs className="mb-4 border-0">
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === 'myAccount' })}
              onClick={() => setActiveTab('myAccount')}
              style={{ cursor: 'pointer' }}
            >
              My Account
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === 'notifications' })}
              onClick={() => setActiveTab('notifications')}
              style={{ cursor: 'pointer' }}
            >
              Notifications
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === 'billings' })}
              onClick={() => setActiveTab('billings')}
              style={{ cursor: 'pointer' }}
            >
              Billings
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === 'platformIntegration' })}
              onClick={() => setActiveTab('platformIntegration')}
              style={{ cursor: 'pointer' }}
            >
              Platform Integration
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === 'privacyPolicy' })}
              onClick={() => setActiveTab('privacyPolicy')}
              style={{ cursor: 'pointer' }}
            >
              Privacy & Safety
            </NavLink>
          </NavItem>
        </Nav>

        <TabContent activeTab={activeTab}>
          <TabPane tabId="myAccount">
            <div className="bg-white rounded-3 p-4">
              {message.content && (
                <Alert color={message.type} className="mb-4">
                  {message.content}
                </Alert>
              )}

              <div className="mb-4 text-center" style={{ maxWidth: "150px" }}>
                <div className="position-relative">
                  <Image
                    src={previewUrl}
                    alt="Profile"
                    width={120}
                    height={120}
                    className="rounded-circle border border-2 border-warning"
                  />
                  <label
                    className="position-absolute bottom-0 end-0 bg-warning rounded-circle p-2"
                    style={{ cursor: "pointer" }}
                  >
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="17 8 12 3 7 8"/>
                      <line x1="12" y1="3" x2="12" y2="15"/>
                    </svg>
                  </label>
                </div>
                {profileImage && (
                  <Button
                    color="warning"
                    size="sm"
                    className="mt-2"
                    onClick={handleImageUpload}
                  >
                    Upload Image
                  </Button>
                )}
              </div>

              <Row>
                <Col md={6} className="mb-4">
                  <FormGroup>
                    <Label>Axiom Username</Label>
                    <Input
                      type="text"
                      placeholder="Axiom Username"
                      className="bg-light"
                      defaultValue={session?.user?.name || ""}
                    />
                  </FormGroup>
                </Col>
                <Col md={6} className="mb-4">
                  <FormGroup>
                    <Label>Verification Status</Label>
                    <Input
                      type="text"
                      placeholder="Verification Status"
                      disabled
                      className="bg-light"
                    />
                  </FormGroup>
                </Col>
              </Row>

              <h5 className="mb-4">Password</h5>
              <Form onSubmit={handlePasswordUpdate}>
                <Row>
                  <Col md={4}>
                    <FormGroup>
                      <Label>Old Password</Label>
                      <Input
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        className="bg-light"
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label>New Password</Label>
                      <Input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="bg-light"
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label>Confirm Password</Label>
                      <Input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="bg-light"
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <div className="text-end mt-3">
                  <Button color="warning" type="submit">
                    Update Password
                  </Button>
                </div>
              </Form>
            </div>
          </TabPane>
          <TabPane tabId="notifications">
            <div className="bg-white rounded-3 p-4">
              <div className="mb-4">
                <h5 className="mb-3">Incoming Message Notifications</h5>
                <div className="bg-light p-3 rounded mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                      <h6 className="mb-1">Message Notifications</h6>
                      <small className="text-muted">Show notifications for new messages</small>
                    </div>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={notificationSettings.messageNotifications}
                        onChange={() => handleNotificationToggle('messageNotifications')}
                      />
                    </div>
                  </div>
                </div>

                <h5 className="mb-3">Tournament Notifications</h5>
                <div className="bg-light p-3 rounded mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                      <h6 className="mb-1">Announcement</h6>
                      <small className="text-muted">Show notifications for new tournaments</small>
                    </div>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={notificationSettings.tournamentAnnouncements}
                        onChange={() => handleNotificationToggle('tournamentAnnouncements')}
                      />
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="mb-1">Reminder</h6>
                      <small className="text-muted">Remind me about tournament registration</small>
                    </div>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={notificationSettings.tournamentReminders}
                        onChange={() => handleNotificationToggle('tournamentReminders')}
                      />
                    </div>
                  </div>
                </div>

                <h5 className="mb-3">Friends Notifications</h5>
                <div className="bg-light p-3 rounded">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="mb-1">User Requests</h6>
                      <small className="text-muted">When another user sends you a friend request</small>
                    </div>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={notificationSettings.friendRequests}
                        onChange={() => handleNotificationToggle('friendRequests')}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabPane>
          <TabPane tabId="billings">
            <div className="bg-white rounded-3 p-4">
              <h5 className="mb-4">Payment method</h5>
              <div className="d-flex align-items-center">
                <div 
                  className="border rounded-3 p-3 me-4" 
                  style={{ 
                    width: "200px",
                    cursor: "pointer",
                    borderColor: "#E4E7EC"
                  }}
                >
                  <div className="d-flex align-items-center justify-content-center">
                    <Image
                      src="/stripe-logo.png"
                      alt="Stripe"
                      width={100}
                      height={40}
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                  <div className="text-center mt-2" style={{ fontSize: "14px", color: "#101828" }}>
                    Stripe
                  </div>
                </div>
                <div 
                  className="rounded-circle d-flex align-items-center justify-content-center"
                  style={{ 
                    width: "48px",
                    height: "48px",
                    backgroundColor: "#F04438",
                    color: "white",
                    fontSize: "18px"
                  }}
                >
                  M
                </div>
              </div>
            </div>
          </TabPane>
          <TabPane tabId="platformIntegration">
            <div className="bg-white rounded-3 p-4">
              <h5>Platform Integration</h5>
              <p>Coming soon...</p>
            </div>
          </TabPane>
          <TabPane tabId="privacyPolicy">
            <div className="bg-white rounded-3 p-4">
              <h5>Privacy & Safety</h5>
              <p>Coming soon...</p>
            </div>
          </TabPane>
        </TabContent>
      </Container>
    </UserDashboardLayout>
  );
}
