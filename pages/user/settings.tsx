
import { useState } from "react";
import UserDashboardLayout from "../../components/layouts/UserDashboardLayout";
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
} from "reactstrap";
import Image from "next/image";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("myAccount");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // Add password update logic here
  };

  return (
    <UserDashboardLayout>
      <Container fluid className="p-4">
        <h3 className="mb-2">Settings</h3>
        <p className="text-muted mb-4">Manage your team and preferences here.</p>

        <Nav tabs className="mb-4 border-0">
          <NavItem>
            <NavLink
              className={`border-0 px-4 ${
                activeTab === "myAccount" ? "bg-warning text-dark" : "text-muted"
              }`}
              onClick={() => setActiveTab("myAccount")}
              style={{ cursor: "pointer" }}
            >
              My Account
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={`border-0 px-4 ${
                activeTab === "notifications" ? "bg-warning text-dark" : "text-muted"
              }`}
              onClick={() => setActiveTab("notifications")}
              style={{ cursor: "pointer" }}
            >
              Notifications
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={`border-0 px-4 ${
                activeTab === "billings" ? "bg-warning text-dark" : "text-muted"
              }`}
              onClick={() => setActiveTab("billings")}
              style={{ cursor: "pointer" }}
            >
              Billings
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={`border-0 px-4 ${
                activeTab === "platformIntegration" ? "bg-warning text-dark" : "text-muted"
              }`}
              onClick={() => setActiveTab("platformIntegration")}
              style={{ cursor: "pointer" }}
            >
              Platform Integration
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={`border-0 px-4 ${
                activeTab === "privacyPolicy" ? "bg-warning text-dark" : "text-muted"
              }`}
              onClick={() => setActiveTab("privacyPolicy")}
              style={{ cursor: "pointer" }}
            >
              Privacy Policy
            </NavLink>
          </NavItem>
        </Nav>

        <TabContent activeTab={activeTab}>
          <TabPane tabId="myAccount">
            <div className="bg-white rounded-3 p-4">
              <div className="mb-4 text-center" style={{ maxWidth: "150px" }}>
                <div className="position-relative">
                  <Image
                    src="/user1.png"
                    alt="Profile"
                    width={120}
                    height={120}
                    className="rounded-circle border border-2 border-warning"
                  />
                  <div
                    className="position-absolute bottom-0 end-0 bg-warning rounded-circle p-2"
                    style={{ cursor: "pointer" }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="17 8 12 3 7 8"/>
                      <line x1="12" y1="3" x2="12" y2="15"/>
                    </svg>
                  </div>
                </div>
              </div>

              <Row>
                <Col md={6} className="mb-4">
                  <FormGroup>
                    <Label>Axiom Username</Label>
                    <Input
                      type="text"
                      placeholder="Axiom Username"
                      className="bg-light"
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
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <div className="text-end mt-3">
                  <Button color="warning">Update Password</Button>
                </div>
              </Form>
            </div>
          </TabPane>
          
          <TabPane tabId="notifications">
            <div className="bg-white rounded-3 p-4">
              <h5 className="mb-4">Notification Settings</h5>
              {/* Add notification settings here */}
            </div>
          </TabPane>
          
          <TabPane tabId="billings">
            <div className="bg-white rounded-3 p-4">
              <h5 className="mb-4">Billing Information</h5>
              {/* Add billing information here */}
            </div>
          </TabPane>
          
          <TabPane tabId="platformIntegration">
            <div className="bg-white rounded-3 p-4">
              <h5 className="mb-4">Platform Integration Settings</h5>
              {/* Add platform integration settings here */}
            </div>
          </TabPane>
          
          <TabPane tabId="privacyPolicy">
            <div className="bg-white rounded-3 p-4">
              <h5 className="mb-4">Privacy Policy</h5>
              {/* Add privacy policy content here */}
            </div>
          </TabPane>
        </TabContent>
      </Container>
    </UserDashboardLayout>
  );
}
