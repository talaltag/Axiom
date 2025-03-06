
import { useState, useEffect } from "react";
import AdminDashboardLayout from "../../components/layouts/AdminDashboardLayout";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { 
  Container, 
  Row, 
  Col, 
  Nav, 
  NavItem, 
  NavLink, 
  TabContent, 
  TabPane,
  FormGroup,
  Label,
  Input,
  Button,
  InputGroup,
  InputGroupText
} from "reactstrap";
import classnames from "classnames";
import { ArrowLeft, Eye, EyeOff } from "react-feather";
import Link from "next/link";

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState("myAccount");
  const [username, setUsername] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const session = useSession();

  useEffect(() => {
    if (session?.data?.user) {
      setUsername(session.data.user.username || "");
      setPreviewUrl(session.data.user.profileImage || "/profile-avatar.png");
    }
  }, [session]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const saveProfileImage = async () => {
    if (!file) return;
    
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
      } else {
        alert(data.message || "Error updating profile image");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error updating profile image");
    }
  };

  const updateUsername = async () => {
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
    <AdminDashboardLayout>
      <Container fluid className="p-0">
        <div className="p-4">
          <div className="mb-1">
            <h2
              style={{
                marginBottom: "6px",
                fontSize: "24px",
                fontWeight: 600,
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

          <Nav tabs className="border-0 mb-4">
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === "myAccount" })}
                onClick={() => setActiveTab("myAccount")}
                style={{
                  cursor: "pointer",
                  borderTop: "none",
                  borderLeft: "none",
                  borderRight: "none",
                  borderBottom: activeTab === "myAccount" ? "2px solid #000" : "none",
                  backgroundColor: "transparent",
                  color: activeTab === "myAccount" ? "#000" : "#667085",
                  fontWeight: activeTab === "myAccount" ? "500" : "400",
                  paddingLeft: "0",
                  paddingRight: "16px",
                }}
              >
                My Account
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === "privacySafety" })}
                onClick={() => setActiveTab("privacySafety")}
                style={{
                  cursor: "pointer",
                  borderTop: "none",
                  borderLeft: "none",
                  borderRight: "none",
                  borderBottom: activeTab === "privacySafety" ? "2px solid #000" : "none",
                  backgroundColor: "transparent",
                  color: activeTab === "privacySafety" ? "#000" : "#667085",
                  fontWeight: activeTab === "privacySafety" ? "500" : "400",
                  paddingLeft: "0",
                  paddingRight: "16px",
                }}
              >
                Privacy & Safety
              </NavLink>
            </NavItem>
          </Nav>

          <TabContent activeTab={activeTab}>
            <TabPane tabId="myAccount">
              <Row>
                <Col md={12}>
                  <div className="mb-5">
                    <div className="position-relative" style={{ width: "100px", height: "100px" }}>
                      <Image
                        src={previewUrl}
                        alt="Profile"
                        width={100}
                        height={100}
                        className="rounded-circle"
                        style={{ objectFit: "cover" }}
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
                          style={{ cursor: "pointer", margin: 0, display: "flex" }}
                        >
                          <span style={{ fontSize: "18px" }}>📷</span>
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
                  </div>

                  <Row className="mb-4">
                    <Col md={6}>
                      <FormGroup>
                        <Label for="username" style={{ fontWeight: 500, marginBottom: "8px" }}>Axiom Username</Label>
                        <Input
                          type="text"
                          id="username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          placeholder="Axiom Username"
                          style={{ 
                            height: "44px",
                            borderRadius: "4px",
                            border: "1px solid #D0D5DD",
                          }}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="verification" style={{ fontWeight: 500, marginBottom: "8px" }}>Verification Status</Label>
                        <Input
                          type="text"
                          id="verification"
                          value="Verification Status"
                          disabled
                          style={{ 
                            height: "44px",
                            borderRadius: "4px",
                            border: "1px solid #D0D5DD",
                            backgroundColor: "#f8f9fa"
                          }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <h5 className="mb-4" style={{ fontWeight: 500 }}>Password</h5>
                  <Row className="mb-4">
                    <Col md={4}>
                      <FormGroup>
                        <Label for="oldPassword" style={{ fontWeight: 500, marginBottom: "8px" }}>Old Password</Label>
                        <InputGroup>
                          <Input
                            type={showOldPassword ? "text" : "password"}
                            id="oldPassword"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            placeholder="••••••••"
                            style={{ 
                              height: "44px",
                              borderRadius: "4px",
                              border: "1px solid #D0D5DD",
                            }}
                          />
                          <InputGroupText 
                            style={{ cursor: "pointer", backgroundColor: "#fff", border: "1px solid #D0D5DD" }}
                            onClick={() => setShowOldPassword(!showOldPassword)}
                          >
                            {showOldPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </InputGroupText>
                        </InputGroup>
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                        <Label for="newPassword" style={{ fontWeight: 500, marginBottom: "8px" }}>New Password</Label>
                        <InputGroup>
                          <Input
                            type={showNewPassword ? "text" : "password"}
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="••••••••"
                            style={{ 
                              height: "44px",
                              borderRadius: "4px",
                              border: "1px solid #D0D5DD",
                            }}
                          />
                          <InputGroupText 
                            style={{ cursor: "pointer", backgroundColor: "#fff", border: "1px solid #D0D5DD" }}
                            onClick={() => setShowNewPassword(!showNewPassword)}
                          >
                            {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </InputGroupText>
                        </InputGroup>
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                        <Label for="confirmPassword" style={{ fontWeight: 500, marginBottom: "8px" }}>Confirm Password</Label>
                        <InputGroup>
                          <Input
                            type={showConfirmPassword ? "text" : "password"}
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="••••••••"
                            style={{ 
                              height: "44px",
                              borderRadius: "4px",
                              border: "1px solid #D0D5DD",
                            }}
                          />
                          <InputGroupText 
                            style={{ cursor: "pointer", backgroundColor: "#fff", border: "1px solid #D0D5DD" }}
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </InputGroupText>
                        </InputGroup>
                      </FormGroup>
                    </Col>
                  </Row>

                  <div className="text-end">
                    <Button
                      onClick={handlePasswordChange}
                      disabled={loading}
                      style={{
                        backgroundColor: "#FFD600",
                        border: "none",
                        color: "#000",
                        fontWeight: 500,
                        borderRadius: "4px",
                        padding: "10px 16px",
                      }}
                    >
                      {loading ? "Updating..." : "Update"}
                    </Button>
                  </div>
                </Col>
              </Row>
            </TabPane>
            
            <TabPane tabId="privacySafety">
              <Row>
                <Col md={12}>
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
                </Col>
              </Row>
            </TabPane>
          </TabContent>
        </div>
      </Container>
    </AdminDashboardLayout>
  );
}
