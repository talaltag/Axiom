
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

  const handleUsernameUpdate = async () => {
    // Username update logic here
  };

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match");
      return;
    }
    setLoading(true);
    // Password change logic here
    setLoading(false);
  };

  return (
    <AdminDashboardLayout>
      <Container fluid className="p-0">
        <div className="p-4" style={{ backgroundColor: "#F9FAFB" }}>
          <Link href="/admin/dashboard">
            <a className="text-decoration-none d-inline-flex align-items-center mb-4">
              <ArrowLeft size={16} className="me-2" style={{ color: "#667085" }} />
              <span style={{ color: "#667085", fontSize: "14px" }}>Settings</span>
            </a>
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

          <div style={{ 
            display: "inline-flex", 
            background: "#F9FAFB", 
            padding: "4px", 
            borderRadius: "8px", 
            border: "1px solid #EAECF0",
            marginBottom: "24px" 
          }}>
            <NavItem style={{ listStyle: "none" }}>
              <NavLink
                className={classnames({ active: activeTab === "myAccount" })}
                onClick={() => setActiveTab("myAccount")}
                style={{
                  cursor: "pointer",
                  padding: "8px 12px",
                  borderRadius: "6px",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#101828",
                  background: activeTab === "myAccount" ? "#FFFFFF" : "transparent",
                  boxShadow: activeTab === "myAccount" ? "0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)" : "none",
                }}
              >
                My Account
              </NavLink>
            </NavItem>
            <NavItem style={{ listStyle: "none" }}>
              <NavLink
                className={classnames({ active: activeTab === "privacySafety" })}
                onClick={() => setActiveTab("privacySafety")}
                style={{
                  cursor: "pointer",
                  padding: "8px 12px",
                  borderRadius: "6px",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#101828",
                  background: activeTab === "privacySafety" ? "#FFFFFF" : "transparent",
                  boxShadow: activeTab === "privacySafety" ? "0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)" : "none",
                }}
              >
                Privacy & Safety
              </NavLink>
            </NavItem>
          </div>

          <TabContent activeTab={activeTab}>
            <TabPane tabId="myAccount">
              <Row>
                <Col md={12} className="mb-4">
                  <div style={{ position: "relative", marginBottom: "32px" }}>
                    <div style={{ 
                      width: "96px", 
                      height: "96px", 
                      borderRadius: "50%",
                      overflow: "hidden",
                      position: "relative",
                      border: "1px solid #EAECF0"
                    }}>
                      <Image 
                        src={previewUrl} 
                        alt="Profile" 
                        layout="fill" 
                        objectFit="cover"
                      />
                    </div>
                    <div style={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      backgroundColor: "#FFD600",
                      borderRadius: "50%",
                      width: "32px",
                      height: "32px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer"
                    }}>
                      <label htmlFor="profile-image" style={{ cursor: "pointer", margin: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12.6667 5.33333L10.6667 3.33333H5.33333L3.33333 5.33333H0.666664V13.3333H15.3333V5.33333H12.6667ZM8 11.3333C6.52724 11.3333 5.33333 10.1394 5.33333 8.66667C5.33333 7.19391 6.52724 6 8 6C9.47276 6 10.6667 7.19391 10.6667 8.66667C10.6667 10.1394 9.47276 11.3333 8 11.3333Z" fill="#101828"/>
                        </svg>
                        <input 
                          type="file" 
                          id="profile-image" 
                          style={{ display: "none" }} 
                          onChange={handleImageUpload}
                          accept="image/*"
                        />
                      </label>
                    </div>
                  </div>
                </Col>
                <Col md={6} className="mb-4">
                  <div style={{ marginBottom: "24px" }}>
                    <Label 
                      for="username" 
                      style={{ 
                        fontSize: "14px", 
                        color: "#344054", 
                        fontWeight: 500, 
                        marginBottom: "6px" 
                      }}
                    >
                      Axiom Username
                    </Label>
                    <Input 
                      type="text" 
                      id="username"
                      placeholder="Axiom Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      style={{
                        height: "44px",
                        padding: "10px 14px",
                        fontSize: "16px",
                        border: "1px solid #D0D5DD",
                        borderRadius: "8px",
                        background: "#FFFFFF"
                      }}
                    />
                  </div>
                </Col>
                <Col md={6} className="mb-4">
                  <div style={{ marginBottom: "24px" }}>
                    <Label 
                      for="verification" 
                      style={{ 
                        fontSize: "14px", 
                        color: "#344054", 
                        fontWeight: 500, 
                        marginBottom: "6px" 
                      }}
                    >
                      Verification Status
                    </Label>
                    <Input 
                      type="text" 
                      id="verification"
                      placeholder="Verification Status"
                      disabled
                      value="Verification Status"
                      style={{
                        height: "44px",
                        padding: "10px 14px",
                        fontSize: "16px",
                        border: "1px solid #D0D5DD",
                        borderRadius: "8px",
                        background: "#FFFFFF"
                      }}
                    />
                  </div>
                </Col>
                <Col md={12} className="mb-4">
                  <h3 style={{ 
                    fontSize: "16px", 
                    fontWeight: 500, 
                    color: "#101828",
                    marginBottom: "24px"
                  }}>
                    Password
                  </h3>
                </Col>
                <Col md={4}>
                  <div style={{ marginBottom: "24px" }}>
                    <Label 
                      for="oldPassword" 
                      style={{ 
                        fontSize: "14px", 
                        color: "#344054", 
                        fontWeight: 500, 
                        marginBottom: "6px" 
                      }}
                    >
                      Old Password
                    </Label>
                    <InputGroup>
                      <Input 
                        type={showOldPassword ? "text" : "password"} 
                        id="oldPassword"
                        placeholder="Old Password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        style={{
                          height: "44px",
                          padding: "10px 14px",
                          fontSize: "16px",
                          border: "1px solid #D0D5DD",
                          borderRadius: "8px 0 0 8px",
                          background: "#FFFFFF"
                        }}
                      />
                      <InputGroupText 
                        onClick={() => setShowOldPassword(!showOldPassword)}
                        style={{
                          background: "#FFFFFF",
                          border: "1px solid #D0D5DD",
                          borderLeft: "none",
                          borderRadius: "0 8px 8px 0",
                          cursor: "pointer"
                        }}
                      >
                        {showOldPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </InputGroupText>
                    </InputGroup>
                  </div>
                </Col>
                <Col md={4}>
                  <div style={{ marginBottom: "24px" }}>
                    <Label 
                      for="newPassword" 
                      style={{ 
                        fontSize: "14px", 
                        color: "#344054", 
                        fontWeight: 500, 
                        marginBottom: "6px" 
                      }}
                    >
                      New Password
                    </Label>
                    <InputGroup>
                      <Input 
                        type={showNewPassword ? "text" : "password"} 
                        id="newPassword"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        style={{
                          height: "44px",
                          padding: "10px 14px",
                          fontSize: "16px",
                          border: "1px solid #D0D5DD",
                          borderRadius: "8px 0 0 8px",
                          background: "#FFFFFF"
                        }}
                      />
                      <InputGroupText 
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        style={{
                          background: "#FFFFFF",
                          border: "1px solid #D0D5DD",
                          borderLeft: "none",
                          borderRadius: "0 8px 8px 0",
                          cursor: "pointer"
                        }}
                      >
                        {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </InputGroupText>
                    </InputGroup>
                  </div>
                </Col>
                <Col md={4}>
                  <div style={{ marginBottom: "24px" }}>
                    <Label 
                      for="confirmPassword" 
                      style={{ 
                        fontSize: "14px", 
                        color: "#344054", 
                        fontWeight: 500, 
                        marginBottom: "6px" 
                      }}
                    >
                      Confirm Password
                    </Label>
                    <InputGroup>
                      <Input 
                        type={showConfirmPassword ? "text" : "password"} 
                        id="confirmPassword"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        style={{
                          height: "44px",
                          padding: "10px 14px",
                          fontSize: "16px",
                          border: "1px solid #D0D5DD",
                          borderRadius: "8px 0 0 8px",
                          background: "#FFFFFF"
                        }}
                      />
                      <InputGroupText 
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        style={{
                          background: "#FFFFFF",
                          border: "1px solid #D0D5DD",
                          borderLeft: "none",
                          borderRadius: "0 8px 8px 0",
                          cursor: "pointer"
                        }}
                      >
                        {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </InputGroupText>
                    </InputGroup>
                  </div>
                </Col>
                <Col md={12}>
                  <div className="d-flex justify-content-end">
                    <Button
                      onClick={handlePasswordChange}
                      disabled={loading}
                      style={{
                        backgroundColor: "#FFD600",
                        border: "none",
                        color: "#000000",
                        fontWeight: 500,
                        borderRadius: "8px",
                        padding: "10px 18px",
                        height: "44px",
                        fontSize: "16px",
                        width: "120px"
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
      </Container>
    </AdminDashboardLayout>
  );
}
