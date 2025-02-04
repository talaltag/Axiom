
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
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import classnames from "classnames";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("myAccount");
  const [file, setFile] = useState<File | null>(null);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    // Add password change logic here
  };

  return (
    <UserDashboardLayout>
      <Container fluid className="p-4">
        <h3 className="mb-2">Settings</h3>
        <p className="text-muted mb-4">Manage your team and preferences here.</p>
        
        <Nav tabs className="mb-4">
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "myAccount" })}
              onClick={() => setActiveTab("myAccount")}
              style={{ cursor: "pointer" }}
            >
              My Account
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "notifications" })}
              onClick={() => setActiveTab("notifications")}
              style={{ cursor: "pointer" }}
            >
              Notifications
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "billings" })}
              onClick={() => setActiveTab("billings")}
              style={{ cursor: "pointer" }}
            >
              Billings
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "platformIntegration" })}
              onClick={() => setActiveTab("platformIntegration")}
              style={{ cursor: "pointer" }}
            >
              Platform Integration
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "privacySafety" })}
              onClick={() => setActiveTab("privacySafety")}
              style={{ cursor: "pointer" }}
            >
              Privacy & Safety
            </NavLink>
          </NavItem>
        </Nav>

        <TabContent activeTab={activeTab}>
          <TabPane tabId="myAccount">
            <Row>
              <Col md={6}>
                <h5 className="mb-4">Profile Picture</h5>
                <div className="mb-4">
                  <Input type="file" onChange={handleImageUpload} accept="image/*" />
                </div>

                <h5 className="mb-4">Change Password</h5>
                <Form onSubmit={handlePasswordChange}>
                  <FormGroup>
                    <Label for="oldPassword">Current Password</Label>
                    <Input
                      type="password"
                      id="oldPassword"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="newPassword">New Password</Label>
                    <Input
                      type="password"
                      id="newPassword"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="confirmPassword">Confirm New Password</Label>
                    <Input
                      type="password"
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </FormGroup>
                  <Button color="primary" type="submit">
                    Update Password
                  </Button>
                </Form>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </Container>
    </UserDashboardLayout>
  );
}
