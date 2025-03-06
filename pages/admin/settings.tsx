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
  Input,
  Button,
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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setPreviewUrl(URL.createObjectURL(e.target.files[0]));

      const formData = new FormData();
      formData.append("image", e.target.files[0]);

      try {
        const response = await fetch("/api/users/me/profile-image", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        if (!response.ok) {
          console.error("Error updating profile image:", data.message);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleUsernameUpdate = async () => {
    if (!username) return;

    try {
      const response = await fetch("/api/users/me/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });

      if (!response.ok) {
        const data = await response.json();
        console.error("Error updating username:", data.message);
      }
    } catch (error) {
      console.error("Error updating username:", error);
    }
  };

  const handlePasswordUpdate = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) return;
    if (newPassword !== confirmPassword) {
      alert("New password and confirm password don't match");
      return;
    }

    try {
      const response = await fetch("/api/users/me/password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ oldPassword, newPassword }),
      });

      if (!response.ok) {
        const data = await response.json();
        console.error("Error updating password:", data.message);
      } else {
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      console.error("Error updating password:", error);
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

          <div className="bg-white rounded-3 p-4">
            <Nav tabs className="border-0 mb-4">
              <div className="d-flex" style={{ gap: "8px" }}>
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === "myAccount" })}
                    onClick={() => setActiveTab("myAccount")}
                    style={{
                      cursor: "pointer",
                      padding: "8px 12px",
                      fontSize: "14px",
                      color: "#101828",
                      borderRadius: "8px",
                      fontWeight: 500,
                      backgroundColor: activeTab === "myAccount" ? "#f9fafb" : "transparent",
                      border: "none"
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
                      color: "#101828",
                      borderRadius: "8px",
                      fontWeight: 500,
                      backgroundColor: activeTab === "privacySafety" ? "#f9fafb" : "transparent",
                      border: "none"
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
                  <Col>
                    <div className="mb-5">
                      <div className="d-flex justify-content-center mb-3" style={{ position: "relative" }}>
                        <div 
                          style={{ 
                            width: "96px", 
                            height: "96px", 
                            borderRadius: "50%", 
                            position: "relative",
                            backgroundColor: "#f2f4f7",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            overflow: "hidden"
                          }}
                        >
                          {previewUrl ? (
                            <Image 
                              src={previewUrl} 
                              alt="Profile" 
                              layout="fill" 
                              objectFit="cover" 
                            />
                          ) : (
                            <div style={{ fontSize: "36px", color: "#d0d5dd" }}>
                              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                                <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="#D0D5DD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="#D0D5DD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                          )}
                        </div>
                        <div 
                          style={{ 
                            position: "absolute", 
                            bottom: "0px", 
                            right: "calc(50% - 58px)", 
                            width: "28px", 
                            height: "28px", 
                            backgroundColor: "#FFD600", 
                            borderRadius: "50%", 
                            display: "flex", 
                            justifyContent: "center", 
                            alignItems: "center",
                            cursor: "pointer",
                            border: "2px solid #FFFFFF"
                          }}
                        >
                          <label htmlFor="profile-image" style={{ cursor: "pointer", margin: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Image src="/admin/camera-icon.svg" width={14} height={14} alt="Upload" />
                            <input
                              type="file"
                              id="profile-image"
                              onChange={handleImageUpload}
                              accept="image/*"
                              style={{ display: "none" }}
                            />
                          </label>
                        </div>
                      </div>

                      <div className="text-center mb-2">
                        <p style={{ fontSize: "12px", color: "#667085", margin: 0 }}>
                          We recommend an image of at least 400×400.
                        </p>
                        <p style={{ fontSize: "12px", color: "#667085", margin: 0 }}>
                          JPG or PNG. Max 1MB.
                        </p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <label 
                        htmlFor="axiomUsername" 
                        style={{ 
                          fontSize: "14px", 
                          fontWeight: 500, 
                          color: "#344054", 
                          marginBottom: "6px", 
                          display: "block" 
                        }}
                      >
                        Axiom Username
                      </label>
                      <div className="d-flex" style={{ gap: "12px" }}>
                        <Input
                          type="text"
                          id="axiomUsername"
                          placeholder="Enter username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          style={{
                            height: "44px",
                            fontSize: "16px",
                            padding: "10px 14px",
                            color: "#101828",
                            borderColor: "#D0D5DD",
                            borderRadius: "8px",
                          }}
                        />
                        <Button
                          onClick={handleUsernameUpdate}
                          style={{
                            backgroundColor: "#FFD600",
                            border: "none",
                            color: "#101828",
                            fontWeight: 500,
                            padding: "10px 18px",
                            fontSize: "16px",
                            borderRadius: "8px",
                            width: "100px",
                          }}
                        >
                          Update
                        </Button>
                      </div>
                    </div>

                    <div className="mb-4">
                      <label 
                        htmlFor="verificationStatus" 
                        style={{ 
                          fontSize: "14px", 
                          fontWeight: 500, 
                          color: "#344054", 
                          marginBottom: "6px", 
                          display: "block" 
                        }}
                      >
                        Verification Status
                      </label>
                      <Input
                        type="text"
                        id="verificationStatus"
                        placeholder="Verification Status"
                        readOnly
                        style={{
                          height: "44px",
                          fontSize: "16px",
                          padding: "10px 14px",
                          color: "#667085",
                          backgroundColor: "#F9FAFB",
                          borderColor: "#D0D5DD",
                          borderRadius: "8px",
                        }}
                      />
                    </div>

                    <div className="mt-5 mb-4">
                      <h5 
                        style={{ 
                          fontSize: "16px", 
                          fontWeight: 500, 
                          color: "#344054", 
                          marginBottom: "16px" 
                        }}
                      >
                        Password
                      </h5>
                      <div className="row g-3">
                        <div className="col-md-4">
                          <label 
                            htmlFor="oldPassword" 
                            style={{ 
                              fontSize: "14px", 
                              fontWeight: 500, 
                              color: "#344054", 
                              marginBottom: "6px", 
                              display: "block" 
                            }}
                          >
                            Old Password
                          </label>
                          <div className="position-relative">
                            <Input
                              type={showOldPassword ? "text" : "password"}
                              id="oldPassword"
                              placeholder="••••••••"
                              value={oldPassword}
                              onChange={(e) => setOldPassword(e.target.value)}
                              style={{
                                height: "44px",
                                fontSize: "16px",
                                padding: "10px 14px",
                                paddingRight: "40px",
                                color: "#101828",
                                borderColor: "#D0D5DD",
                                borderRadius: "8px",
                              }}
                            />
                            <div 
                              style={{ 
                                position: "absolute", 
                                top: "0", 
                                right: "0", 
                                height: "100%",
                                display: "flex", 
                                alignItems: "center", 
                                padding: "0 14px",
                                cursor: "pointer" 
                              }}
                              onClick={() => setShowOldPassword(!showOldPassword)}
                            >
                              {showOldPassword ? <EyeOff size={18} color="#667085" /> : <Eye size={18} color="#667085" />}
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <label 
                            htmlFor="newPassword" 
                            style={{ 
                              fontSize: "14px", 
                              fontWeight: 500, 
                              color: "#344054", 
                              marginBottom: "6px", 
                              display: "block" 
                            }}
                          >
                            New Password
                          </label>
                          <div className="position-relative">
                            <Input
                              type={showNewPassword ? "text" : "password"}
                              id="newPassword"
                              placeholder="••••••••"
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                              style={{
                                height: "44px",
                                fontSize: "16px",
                                padding: "10px 14px",
                                paddingRight: "40px",
                                color: "#101828",
                                borderColor: "#D0D5DD",
                                borderRadius: "8px",
                              }}
                            />
                            <div 
                              style={{ 
                                position: "absolute", 
                                top: "0", 
                                right: "0", 
                                height: "100%",
                                display: "flex", 
                                alignItems: "center", 
                                padding: "0 14px",
                                cursor: "pointer" 
                              }}
                              onClick={() => setShowNewPassword(!showNewPassword)}
                            >
                              {showNewPassword ? <EyeOff size={18} color="#667085" /> : <Eye size={18} color="#667085" />}
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <label 
                            htmlFor="confirmPassword" 
                            style={{ 
                              fontSize: "14px", 
                              fontWeight: 500, 
                              color: "#344054", 
                              marginBottom: "6px", 
                              display: "block" 
                            }}
                          >
                            Confirm Password
                          </label>
                          <div className="position-relative">
                            <Input
                              type={showConfirmPassword ? "text" : "password"}
                              id="confirmPassword"
                              placeholder="••••••••"
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                              style={{
                                height: "44px",
                                fontSize: "16px",
                                padding: "10px 14px",
                                paddingRight: "40px",
                                color: "#101828",
                                borderColor: "#D0D5DD",
                                borderRadius: "8px",
                              }}
                            />
                            <div 
                              style={{ 
                                position: "absolute", 
                                top: "0", 
                                right: "0", 
                                height: "100%",
                                display: "flex", 
                                alignItems: "center", 
                                padding: "0 14px",
                                cursor: "pointer"
                              }}
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                              {showConfirmPassword ? <EyeOff size={18} color="#667085" /> : <Eye size={18} color="#667085" />}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-3">
                        <Button
                          onClick={handlePasswordUpdate}
                          style={{
                            backgroundColor: "#FFD600",
                            border: "none",
                            color: "#101828",
                            fontWeight: 500,
                            padding: "10px 18px",
                            fontSize: "16px",
                            borderRadius: "8px",
                            width: "100px",
                          }}
                        >
                          Update
                        </Button>
                      </div>
                    </div>
                  </Col>
                </Row>
              </TabPane>

              <TabPane tabId="privacySafety">
                <Row>
                  <Col>
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