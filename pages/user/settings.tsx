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
import Image from "next/image";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("myAccount");
  const [file, setFile] = useState<File | null>(null);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async () => {
    if (!file) {
      alert("Please select an image first");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("/api/users/me/profile-image", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        alert("Profile image updated successfully");
        // Update the session with new user data if needed
      } else {
        alert(data.message || "Error updating profile image");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error updating profile image");
    }
  };

  const handleUsernameUpdate = async () => {
    if (!username) {
      alert("Please enter a username");
      return;
    }

    try {
      const response = await fetch("/api/users/me/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Username updated successfully");
        // Update the session with new user data if needed
      } else {
        alert(data.message || "Error updating username");
      }
    } catch (error) {
      console.error("Error updating username:", error);
      alert("Error updating username");
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    setLoading(true);
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

      if (response.ok) {
        alert("Password updated successfully!");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        const data = await response.json();
        alert(data.message || "Error updating password");
      }
    } catch (error) {
      console.error("Error updating password:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserDashboardLayout>
      <Container fluid className="p-4">
        <div className="d-flex align-items-center mb-4">
          <h3 className="mb-0">Settings</h3>
        </div>
        <p className="text-muted">Manage your team and preferences here.</p>

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
              <Col md={8}>
                <div className="bg-white rounded p-4 mb-4">
                  <div className="d-flex align-items-center mb-4">
                    <div className="position-relative" style={{ width: "100px", height: "100px" }}>
                      <Image
                        src={file ? URL.createObjectURL(file) : "/user1.png"}
                        alt="Profile"
                        layout="fill"
                        className="rounded-circle"
                        objectFit="cover"
                      />
                      <div
                        className="position-absolute d-flex align-items-center justify-content-center"
                        style={{
                          bottom: "0",
                          right: "0",
                          width: "32px",
                          height: "32px",
                          backgroundColor: "#FFD600",
                          borderRadius: "50%",
                          cursor: "pointer",
                        }}
                      >
                        <label htmlFor="profile-image" style={{ cursor: "pointer", margin: 0 }}>
                          <span>📷</span>
                          <Input
                            type="file"
                            id="profile-image"
                            onChange={handleImageUpload}
                            accept="image/*"
                            style={{ display: "none" }}
                          />
                        </label>
                      </div>
                    </div>
                    <Button
                      color="warning"
                      className="ms-3"
                      onClick={handleImageUpload}
                      style={{
                        backgroundColor: "#FFD600",
                        border: "none",
                        height: "40px"
                      }}
                    >
                      Update Image
                    </Button>
                  </div>

                  <FormGroup className="mb-4">
                    <Label for="username">Axiom Username</Label>
                    <div className="d-flex gap-2">
                      <Input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your username"
                      />
                      <Button
                        color="warning"
                        onClick={async () => {
                          try {
                            const response = await fetch("/api/users/me", {
                              method: "PUT",
                              headers: {
                                "Content-Type": "application/json",
                              },
                              body: JSON.stringify({ username }),
                            });
                            
                            if (response.ok) {
                              alert("Username updated successfully!");
                            } else {
                              alert("Failed to update username");
                            }
                          } catch (error) {
                            console.error("Error updating username:", error);
                            alert("Error updating username");
                          }
                        }}
                        style={{
                          backgroundColor: "#FFD600",
                          border: "none",
                          width: "120px"
                        }}
                      >
                        Update
                      </Button>
                    </div>
                  </FormGroup>

                  <h5 className="mb-4">Change Password</h5>
                  <Form onSubmit={handlePasswordChange}>
                    <Row>
                      <Col md={4}>
                        <FormGroup>
                          <Label for="oldPassword">Old Password</Label>
                          <Input
                            type="password"
                            id="oldPassword"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        <FormGroup>
                          <Label for="newPassword">New Password</Label>
                          <Input
                            type="password"
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        <FormGroup>
                          <Label for="confirmPassword">Confirm Password</Label>
                          <Input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Button
                      color="warning"
                      type="submit"
                      disabled={loading}
                      style={{ backgroundColor: "#FFD600", border: "none" }}
                    >
                      {loading ? "Updating..." : "Update Password"}
                    </Button>
                  </Form>
                </div>
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
          <TabPane tabId="platformIntegration">
            {/* Platform Integration content */}
          </TabPane>
          <TabPane tabId="privacySafety">
            {/* Privacy & Safety content */}
          </TabPane>
        </TabContent>
      </Container>
    </UserDashboardLayout>
  );
}