
import { useState, useEffect } from "react";
import AdminDashboardLayout from "../../components/layouts/AdminDashboardLayout";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
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

  const handleUsernameUpdate = async () => {
    if (!username.trim()) {
      alert("Username cannot be empty");
      return;
    }
    
    setLoading(true);
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
        alert(data.message || "Failed to update username");
      }
    } catch (error) {
      console.error("Error updating username:", error);
      alert("An error occurred while updating username");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!oldPassword || !newPassword || !confirmPassword) {
      alert("All password fields are required");
      return;
    }
    
    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match");
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
      
      const data = await response.json();
      
      if (response.ok) {
        alert("Password updated successfully");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        alert(data.message || "Failed to update password");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      alert("An error occurred while updating password");
    } finally {
      setLoading(false);
    }
  };

  const uploadProfileImage = async () => {
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
        alert(data.message || "Failed to update profile image");
      }
    } catch (error) {
      console.error("Error uploading profile image:", error);
      alert("An error occurred while uploading profile image");
    }
  };

  return (
    <AdminDashboardLayout>
      <Container fluid className="p-0">
        <div className="p-4" style={{ backgroundColor: "#F9FAFB" }}>
          <Link href="/admin/dashboard">
            <div className="text-decoration-none d-inline-flex align-items-center mb-4" style={{ cursor: "pointer" }}>
              <ArrowLeft size={16} className="me-2" style={{ color: "#667085" }} />
              <span style={{ color: "#667085", fontSize: "14px" }}>Settings</span>
            </div>
          </Link>
          
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

          <div 
            className="bg-white rounded p-4"
            style={{ boxShadow: "0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)" }}
          >
            <Nav tabs className="mb-4 border-0">
              <div
                className="d-flex"
                style={{
                  background: "#F9FAFB",
                  padding: "4px",
                  borderRadius: "8px",
                  width: "fit-content",
                }}
              >
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === "myAccount" })}
                    onClick={() => setActiveTab("myAccount")}
                    style={{
                      cursor: "pointer",
                      padding: "8px 12px",
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#101828",
                      borderRadius: "6px",
                      border: "none",
                      backgroundColor: activeTab === "myAccount" ? "#FFFFFF" : "transparent",
                      boxShadow: activeTab === "myAccount" ? "0px 1px 3px rgba(16, 24, 40, 0.1)" : "none",
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
                      padding: "8px 12px",
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#101828",
                      borderRadius: "6px",
                      border: "none",
                      backgroundColor: activeTab === "privacySafety" ? "#FFFFFF" : "transparent",
                      boxShadow: activeTab === "privacySafety" ? "0px 1px 3px rgba(16, 24, 40, 0.1)" : "none",
                    }}
                  >
                    Privacy & Safety
                  </NavLink>
                </NavItem>
              </div>
            </Nav>

            <TabContent activeTab={activeTab}>
              <TabPane tabId="myAccount">
                <Row>
                  <Col lg={8}>
                    <div className="mb-5">
                      <div className="d-flex align-items-center mb-4">
                        <div
                          style={{
                            width: "88px",
                            height: "88px",
                            position: "relative",
                          }}
                        >
                          <div
                            style={{
                              width: "88px",
                              height: "88px",
                              borderRadius: "50%",
                              overflow: "hidden",
                              position: "relative",
                              border: "1px solid #EAECF0",
                            }}
                          >
                            <Image
                              src={previewUrl}
                              alt="Profile"
                              layout="fill"
                              objectFit="cover"
                            />
                          </div>
                          <div
                            style={{
                              position: "absolute",
                              bottom: "0",
                              right: "0",
                              width: "28px",
                              height: "28px",
                              backgroundColor: "#FFD600",
                              borderRadius: "50%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              cursor: "pointer",
                              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                            }}
                          >
                            <label
                              htmlFor="profile-image"
                              style={{ cursor: "pointer", margin: 0 }}
                            >
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.6667 1.33334H3.33333C2.59333 1.33334 2 1.92667 2 2.66667V13.3333C2 14.0733 2.59333 14.6667 3.33333 14.6667H12.6667C13.4067 14.6667 14 14.0733 14 13.3333V2.66667C14 1.92667 13.4067 1.33334 12.6667 1.33334ZM8 5.33334C9.10667 5.33334 10 6.22667 10 7.33334C10 8.44 9.10667 9.33334 8 9.33334C6.89333 9.33334 6 8.44 6 7.33334C6 6.22667 6.89333 5.33334 8 5.33334ZM12 12.6667H4V12C4 10.6667 6.66667 10 8 10C9.33333 10 12 10.6667 12 12V12.6667Z" fill="#101828"/>
                              </svg>
                              <input
                                type="file"
                                id="profile-image"
                                accept="image/*"
                                style={{ display: "none" }}
                                onChange={handleImageUpload}
                              />
                            </label>
                          </div>
                        </div>
                        <div className="ms-3">
                          <div style={{ fontSize: "14px", color: "#344054" }}>
                            We recommend an image of at least 400x400. <br />
                            JPG or PNG. Max 1MB.
                          </div>
                          {file && (
                            <Button
                              color="primary"
                              size="sm"
                              className="mt-2"
                              onClick={uploadProfileImage}
                              style={{
                                backgroundColor: "#FFD600",
                                border: "none",
                                color: "#101828",
                                fontWeight: 500,
                                padding: "6px 14px",
                                fontSize: "14px",
                              }}
                            >
                              Upload
                            </Button>
                          )}
                        </div>
                      </div>

                      <div className="mb-4">
                        <Label
                          for="username"
                          style={{
                            fontSize: "14px",
                            fontWeight: 500,
                            color: "#344054",
                            marginBottom: "6px",
                          }}
                        >
                          Axiom Username
                        </Label>
                        <div className="d-flex gap-2">
                          <Input
                            type="text"
                            id="username"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            style={{
                              height: "44px",
                              padding: "10px 14px",
                              fontSize: "16px",
                              color: "#101828",
                              borderColor: "#D0D5DD",
                              borderRadius: "8px",
                            }}
                          />
                          <Button
                            color="warning"
                            onClick={handleUsernameUpdate}
                            disabled={loading}
                            style={{
                              backgroundColor: "#FFD600",
                              border: "none",
                              color: "#101828",
                              fontWeight: 500,
                              padding: "10px 18px",
                              fontSize: "16px",
                              borderRadius: "8px",
                              height: "44px",
                              width: "100px",
                            }}
                          >
                            Update
                          </Button>
                        </div>
                      </div>

                      <div className="mb-4">
                        <Label
                          style={{
                            fontSize: "16px",
                            fontWeight: 500,
                            color: "#101828",
                            marginBottom: "16px",
                            display: "block",
                          }}
                        >
                          Verification Status
                        </Label>
                        <Input
                          type="text"
                          value="Verification Status"
                          disabled
                          style={{
                            height: "44px",
                            padding: "10px 14px",
                            fontSize: "16px",
                            color: "#667085",
                            backgroundColor: "#F9FAFB",
                            borderColor: "#D0D5DD",
                            borderRadius: "8px",
                          }}
                        />
                      </div>

                      <div>
                        <Label
                          style={{
                            fontSize: "16px",
                            fontWeight: 500,
                            color: "#101828",
                            marginBottom: "16px",
                            display: "block",
                          }}
                        >
                          Password
                        </Label>
                        <form onSubmit={handlePasswordUpdate}>
                          <Row>
                            <Col lg={4} className="mb-3">
                              <Label
                                for="oldPassword"
                                style={{
                                  fontSize: "14px",
                                  fontWeight: 500,
                                  color: "#344054",
                                  marginBottom: "6px",
                                }}
                              >
                                Old Password
                              </Label>
                              <InputGroup>
                                <Input
                                  type={showOldPassword ? "text" : "password"}
                                  id="oldPassword"
                                  value={oldPassword}
                                  onChange={(e) => setOldPassword(e.target.value)}
                                  style={{
                                    height: "44px",
                                    padding: "10px 14px",
                                    fontSize: "16px",
                                    color: "#101828",
                                    borderColor: "#D0D5DD",
                                    borderRadius: "8px 0 0 8px",
                                  }}
                                />
                                <InputGroupText
                                  style={{
                                    backgroundColor: "white",
                                    borderColor: "#D0D5DD",
                                    borderRadius: "0 8px 8px 0",
                                    cursor: "pointer",
                                  }}
                                  onClick={() => setShowOldPassword(!showOldPassword)}
                                >
                                  {showOldPassword ? (
                                    <EyeOff size={18} color="#667085" />
                                  ) : (
                                    <Eye size={18} color="#667085" />
                                  )}
                                </InputGroupText>
                              </InputGroup>
                            </Col>
                            <Col lg={4} className="mb-3">
                              <Label
                                for="newPassword"
                                style={{
                                  fontSize: "14px",
                                  fontWeight: 500,
                                  color: "#344054",
                                  marginBottom: "6px",
                                }}
                              >
                                New Password
                              </Label>
                              <InputGroup>
                                <Input
                                  type={showNewPassword ? "text" : "password"}
                                  id="newPassword"
                                  value={newPassword}
                                  onChange={(e) => setNewPassword(e.target.value)}
                                  style={{
                                    height: "44px",
                                    padding: "10px 14px",
                                    fontSize: "16px",
                                    color: "#101828",
                                    borderColor: "#D0D5DD",
                                    borderRadius: "8px 0 0 8px",
                                  }}
                                />
                                <InputGroupText
                                  style={{
                                    backgroundColor: "white",
                                    borderColor: "#D0D5DD",
                                    borderRadius: "0 8px 8px 0",
                                    cursor: "pointer",
                                  }}
                                  onClick={() => setShowNewPassword(!showNewPassword)}
                                >
                                  {showNewPassword ? (
                                    <EyeOff size={18} color="#667085" />
                                  ) : (
                                    <Eye size={18} color="#667085" />
                                  )}
                                </InputGroupText>
                              </InputGroup>
                            </Col>
                            <Col lg={4} className="mb-3">
                              <Label
                                for="confirmPassword"
                                style={{
                                  fontSize: "14px",
                                  fontWeight: 500,
                                  color: "#344054",
                                  marginBottom: "6px",
                                }}
                              >
                                Confirm Password
                              </Label>
                              <InputGroup>
                                <Input
                                  type={showConfirmPassword ? "text" : "password"}
                                  id="confirmPassword"
                                  value={confirmPassword}
                                  onChange={(e) => setConfirmPassword(e.target.value)}
                                  style={{
                                    height: "44px",
                                    padding: "10px 14px",
                                    fontSize: "16px",
                                    color: "#101828",
                                    borderColor: "#D0D5DD",
                                    borderRadius: "8px 0 0 8px",
                                  }}
                                />
                                <InputGroupText
                                  style={{
                                    backgroundColor: "white",
                                    borderColor: "#D0D5DD",
                                    borderRadius: "0 8px 8px 0",
                                    cursor: "pointer",
                                  }}
                                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                  {showConfirmPassword ? (
                                    <EyeOff size={18} color="#667085" />
                                  ) : (
                                    <Eye size={18} color="#667085" />
                                  )}
                                </InputGroupText>
                              </InputGroup>
                            </Col>
                          </Row>
                          <Button
                            type="submit"
                            disabled={loading}
                            style={{
                              backgroundColor: "#FFD600",
                              border: "none",
                              color: "#101828",
                              fontWeight: 500,
                              padding: "10px 18px",
                              fontSize: "16px",
                              borderRadius: "8px",
                              marginTop: "8px",
                              width: "100px",
                            }}
                          >
                            Update
                          </Button>
                        </form>
                      </div>
                    </div>
                  </Col>
                </Row>
              </TabPane>

              <TabPane tabId="privacySafety">
                <Row>
                  <Col lg={8}>
                    <div>
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
                        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.
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
                        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.
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
                        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.
                      </p>
                    </div>
                  </Col>
                </Row>
              </TabPane>
            </TabContent>
          </div>
        </div>
      </Container>
    </AdminDashboardLayout>
  );
}
