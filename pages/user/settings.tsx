
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
  const [notificationSettings, setNotificationSettings] = useState({
    email: false,
    push: false,
    tournament: false,
    friends: false
  });

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
                  <Button color="warning" type="submit" style={{ backgroundColor: "#FFD600", border: "none" }}>
                    Update Password
                  </Button>
                </Form>
              </Col>
            </Row>
          </TabPane>

          <TabPane tabId="notifications">
            <Row>
              <Col md={8}>
                <h5 className="mb-4">Notification Preferences</h5>
                <div className="bg-white rounded p-4">
                  <FormGroup check className="mb-3">
                    <Input type="checkbox" id="emailNotifications" />
                    <Label check for="emailNotifications">
                      Email Notifications
                    </Label>
                  </FormGroup>
                  <FormGroup check className="mb-3">
                    <Input type="checkbox" id="pushNotifications" />
                    <Label check for="pushNotifications">
                      Push Notifications
                    </Label>
                  </FormGroup>
                  <FormGroup check className="mb-3">
                    <Input type="checkbox" id="tournamentUpdates" />
                    <Label check for="tournamentUpdates">
                      Tournament Updates
                    </Label>
                  </FormGroup>
                  <FormGroup check className="mb-3">
                    <Input type="checkbox" id="friendRequests" />
                    <Label check for="friendRequests">
                      Friend Requests
                    </Label>
                  </FormGroup>
                  <Button color="warning" style={{ backgroundColor: "#FFD600", border: "none" }}>
                    Save Preferences
                  </Button>
                </div>
              </Col>
            </Row>
          </TabPane>

          <TabPane tabId="billings">
            <Row>
              <Col md={8}>
                <h5 className="mb-4">Billing Information</h5>
                <div className="bg-white rounded p-4">
                  <Form>
                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="cardName">Name on Card</Label>
                          <Input type="text" id="cardName" placeholder="John Doe" />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="cardNumber">Card Number</Label>
                          <Input type="text" id="cardNumber" placeholder="**** **** **** ****" />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="expiryDate">Expiry Date</Label>
                          <Input type="text" id="expiryDate" placeholder="MM/YY" />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="cvv">CVV</Label>
                          <Input type="text" id="cvv" placeholder="***" />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Button color="warning" style={{ backgroundColor: "#FFD600", border: "none" }}>
                      Save Card Details
                    </Button>
                  </Form>

                  <hr className="my-4" />

                  <h6 className="mb-3">Payment History</h6>
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Description</th>
                          <th>Amount</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>01/20/2024</td>
                          <td>Tournament Registration</td>
                          <td>$50.00</td>
                          <td><span className="badge bg-success">Paid</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </Container>
    </UserDashboardLayout>
  );
}
