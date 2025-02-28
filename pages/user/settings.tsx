import { useEffect, useState } from "react";
import UserDashboardLayout from "../../components/layouts/UserDashboardLayout";
import PlatformList from "../../components/common/PlatformList";
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
  const [settings, setSettings] = useState<any>({});

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      const formData = new FormData();
      formData.append("image", e.target.files[0]);

      try {
        const response = await fetch("/api/users/me/profile-image", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        if (response.ok) {
          alert("Profile image updated successfully");
          window.location.reload(); // Refresh to show new image
        } else {
          alert(data.message || "Error updating profile image");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Error updating profile image");
      }
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

  const onNotificationChange = async (type: string, value: boolean) => {
    fetch("/api/users/me/settings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        module: "notifications",
        type,
        enabled: value,
      }),
    });
  };

  const fetchSettings = async () => {
    // setIsLoading(true);
    try {
      const response = await fetch("/api/users/me/settings");
      const data = await response.json();
      if (data.success) {
        setSettings(data.data);
        setUsername(data.data.user.name);
      }
    } catch (error) {
      console.error("Error fetching tournaments:", error);
    } finally {
      // setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const isChecked = (type: string) => {
    const setting = settings?.settings?.find(
      (setting) => setting.type === type
    );
    return setting?.enabled;
  };

  return (
    <UserDashboardLayout>
      <Container fluid className="p-4">
        <div className="mb-1">
          <h2
            style={{
              marginBottom: "6px",
              fontSize: "24px",
              fontWeight: 500,
              color: "#101828",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Settings
          </h2>
        </div>
        <p
          style={{
            color: "#667085",
            fontSize: "14px",
            marginBottom: "32px",
            fontFamily: "Inter, sans-serif",
          }}
        >
          Manage your team and preferences here.
        </p>

        <Nav tabs style={{ border: "none", marginBottom: "24px" }}>
          <div
            className="d-flex gap-1"
            style={{
              background: "#F9FAFB",
              padding: "4px",
              borderRadius: "6px",
              width: "fit-content",
            }}
          >
            {[
              { id: "myAccount", label: "My Account" },
              { id: "notifications", label: "Notifications" },
              { id: "billings", label: "Billings" },
              { id: "platformIntegration", label: "Platform Integration" },
              { id: "privacySafety", label: "Privacy & Safety" },
            ].map((tab) => (
              <NavItem key={tab.id}>
                <NavLink
                  className={classnames({
                    "bg-white": activeTab !== tab.id,
                    "bg-[#ECECEC]": activeTab === tab.id,
                  })}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    cursor: "pointer",
                    padding: "8px 12px",
                    fontSize: "14px",
                    color: "#101828",

                    fontFamily: "Inter, sans-serif",
                    borderRight: "2px solid #ECECEC !important",
                  }}
                >
                  {tab.label}
                </NavLink>
              </NavItem>
            ))}
          </div>
        </Nav>

        <TabContent activeTab={activeTab}>
          <TabPane tabId="myAccount">
            <Row>
              <Col md={12}>
                <div className="bg-white rounded p-4 mb-4">
                  <div className="d-flex align-items-center mb-4">
                    <div
                      className="position-relative"
                      style={{ width: "100px", height: "100px" }}
                    >
                      <Image
                        src={
                          file
                            ? URL.createObjectURL(file)
                            : settings?.user?.profileImage || "/user1.png"
                        }
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
                        <label
                          htmlFor="profile-image"
                          style={{ cursor: "pointer", margin: 0 }}
                        >
                          <span>📷</span>
                          <Input
                            type="file"
                            id="profile-image"
                            onChange={(e) => handleImageUpload(e)}
                            accept="image/*"
                            style={{ display: "none" }}
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  <FormGroup className="mb-4">
                    <Label for="username">Name</Label>
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
                        onClick={handleUsernameUpdate}
                        style={{
                          backgroundColor: "#FFD600",
                          border: "none",
                          width: "120px",
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
            <div className="bg-white p-4">
              <div className="mb-4">
                <div
                  className="p-2 mb-2"
                  style={{
                    background: "#F9FAFB",
                    borderRadius: "8px",
                    border: "1px solid #EAECF0",
                  }}
                >
                  <h6
                    style={{
                      margin: 0,
                      fontSize: "14px",
                      color: "#101828",
                      fontWeight: 500,
                    }}
                  >
                    Incoming Message Notifications
                  </h6>
                </div>
                <div
                  style={{
                    background: "#FFFFFF",
                    border: "1px solid #EAECF0",
                    borderRadius: "8px",
                  }}
                >
                  <div className="p-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <div
                          style={{
                            fontSize: "14px",
                            color: "#344054",
                            marginBottom: "4px",
                            fontWeight: 500,
                          }}
                        >
                          Message Notifications
                        </div>
                        <div style={{ fontSize: "14px", color: "#667085" }}>
                          Show notifications for new messages
                        </div>
                      </div>
                      <FormGroup switch className="mb-0">
                        <Input
                          type="switch"
                          role="switch"
                          onChange={(e) =>
                            onNotificationChange("message", e.target.checked)
                          }
                          defaultChecked={isChecked("message")}
                        />
                      </FormGroup>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <div
                  className="p-2 mb-2"
                  style={{
                    background: "#F9FAFB",
                    borderRadius: "8px",
                    border: "1px solid #EAECF0",
                  }}
                >
                  <h6
                    style={{
                      margin: 0,
                      fontSize: "14px",
                      color: "#101828",
                      fontWeight: 500,
                    }}
                  >
                    Tournament Notifications
                  </h6>
                </div>
                <div
                  style={{
                    background: "#FFFFFF",
                    border: "1px solid #EAECF0",
                    borderRadius: "8px",
                  }}
                >
                  <div
                    className="p-3"
                    style={{ borderBottom: "1px solid #EAECF0" }}
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <div
                          style={{
                            fontSize: "14px",
                            color: "#344054",
                            marginBottom: "4px",
                            fontWeight: 500,
                          }}
                        >
                          Announcement
                        </div>
                        <div style={{ fontSize: "14px", color: "#667085" }}>
                          Show notifications for new tournaments
                        </div>
                      </div>
                      <FormGroup switch className="mb-0">
                        <Input
                          type="switch"
                          role="switch"
                          onChange={(e) =>
                            onNotificationChange(
                              "announcement",
                              e.target.checked
                            )
                          }
                          defaultChecked={isChecked("announcement")}
                        />
                      </FormGroup>
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <div
                          style={{
                            fontSize: "14px",
                            color: "#344054",
                            marginBottom: "4px",
                            fontWeight: 500,
                          }}
                        >
                          Reminder
                        </div>
                        <div style={{ fontSize: "14px", color: "#667085" }}>
                          Remind me about tournament registration
                        </div>
                      </div>
                      <FormGroup switch className="mb-0">
                        <Input
                          type="switch"
                          role="switch"
                          onChange={(e) =>
                            onNotificationChange("reminder", e.target.checked)
                          }
                          defaultChecked={isChecked("reminder")}
                        />
                      </FormGroup>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div
                  className="p-2 mb-2"
                  style={{
                    background: "#F9FAFB",
                    borderRadius: "8px",
                    border: "1px solid #EAECF0",
                  }}
                >
                  <h6
                    style={{
                      margin: 0,
                      fontSize: "14px",
                      color: "#101828",
                      fontWeight: 500,
                    }}
                  >
                    Friends Notifications
                  </h6>
                </div>
                <div
                  style={{
                    background: "#FFFFFF",
                    border: "1px solid #EAECF0",
                    borderRadius: "8px",
                  }}
                >
                  <div className="p-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <div
                          style={{
                            fontSize: "14px",
                            color: "#344054",
                            marginBottom: "4px",
                            fontWeight: 500,
                          }}
                        >
                          User Requests
                        </div>
                        <div style={{ fontSize: "14px", color: "#667085" }}>
                          When another user send you a friend request
                        </div>
                      </div>
                      <FormGroup switch className="mb-0">
                        <Input
                          type="switch"
                          role="switch"
                          onChange={(e) =>
                            onNotificationChange(
                              "friend_request",
                              e.target.checked
                            )
                          }
                          defaultChecked={isChecked("friend_request")}
                        />
                      </FormGroup>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
                          <Input
                            type="text"
                            id="cardName"
                            placeholder="John Doe"
                          />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="cardNumber">Card Number</Label>
                          <Input
                            type="text"
                            id="cardNumber"
                            placeholder="**** **** **** ****"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="expiryDate">Expiry Date</Label>
                          <Input
                            type="text"
                            id="expiryDate"
                            placeholder="MM/YY"
                          />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="cvv">CVV</Label>
                          <Input type="text" id="cvv" placeholder="***" />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Button
                      color="warning"
                      style={{ backgroundColor: "#FFD600", border: "none" }}
                    >
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
                          <td>
                            <span className="badge bg-success">Paid</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="platformIntegration">
            <div className="bg-white p-4">
              <h6
                className="mb-2"
                style={{ fontSize: "18px", color: "#101828", fontWeight: 500 }}
              >
                Connect your Platforms
              </h6>
              <p
                style={{
                  fontSize: "16px",
                  color: "#667085",
                  marginBottom: "24px",
                }}
              >
                Connect these account to integrate with your Axiom Gaming portal
              </p>
              <PlatformList />
            </div>
          </TabPane>
          <TabPane tabId="privacySafety">
            <div className="bg-white p-4">
              <div className="mb-4">
                <h6
                  className="mb-4"
                  style={{
                    fontSize: "18px",
                    color: "#101828",
                    fontWeight: 500,
                  }}
                >
                  Privacy & Policy
                </h6>
                <p
                  style={{
                    color: "#667085",
                    fontSize: "14px",
                    marginBottom: "24px",
                    lineHeight: "20px",
                  }}
                >
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                  The point of using Lorem Ipsum is that it has a more-or-less
                  normal distribution of letters, as opposed to using 'Content
                  here, content here', making it look like readable English.
                  Many desktop publishing packages and web page editors now use
                  Lorem ipsum as their default model text, and a search for
                  'lorem ipsum' will uncover many web sites still in their
                  infancy. Various versions have evolved over the years,
                  sometimes by accident, sometimes on purpose (injected humour
                  and the like).
                </p>
              </div>

              <div className="mb-4">
                <h6
                  className="mb-4"
                  style={{
                    fontSize: "18px",
                    color: "#101828",
                    fontWeight: 500,
                  }}
                >
                  Rules & Regulations
                </h6>
                <p
                  style={{
                    color: "#667085",
                    fontSize: "14px",
                    marginBottom: "24px",
                    lineHeight: "20px",
                  }}
                >
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                  The point of using Lorem Ipsum is that it has a more-or-less
                  normal distribution of letters, as opposed to using 'Content
                  here, content here', making it look like readable English.
                  Many desktop publishing packages and web page editors now use
                  Lorem ipsum as their default model text, and a search for
                  'lorem ipsum' will uncover many web sites still in their
                  infancy. Various versions have evolved over the years,
                  sometimes by accident, sometimes on purpose (injected humour
                  and the like).
                </p>
              </div>

              <div>
                <h6
                  className="mb-4"
                  style={{
                    fontSize: "18px",
                    color: "#101828",
                    fontWeight: 500,
                  }}
                >
                  Terms & Condition
                </h6>
                <p
                  style={{
                    color: "#667085",
                    fontSize: "14px",
                    lineHeight: "20px",
                  }}
                >
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                  The point of using Lorem Ipsum is that it has a more-or-less
                  normal distribution of letters, as opposed to using 'Content
                  here, content here', making it look like readable English.
                  Many desktop publishing packages and web page editors now use
                  Lorem ipsum as their default model text, and a search for
                  'lorem ipsum' will uncover many web sites still in their
                  infancy. Various versions have evolved over the years,
                  sometimes by accident, sometimes on purpose (injected humour
                  and the like).
                </p>
              </div>
            </div>
          </TabPane>
        </TabContent>
      </Container>
    </UserDashboardLayout>
  );
}
