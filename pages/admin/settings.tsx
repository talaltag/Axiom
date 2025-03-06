import { useState, useRef, useEffect } from "react";
import AdminDashboardLayout from "../../components/layouts/AdminDashboardLayout";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Container, Row, Col, Button, Input, FormGroup, Label } from "reactstrap";
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
  const fileInputRef = useRef(null);
  const session = useSession();

  useEffect(() => {
    if (session?.data?.user) {
      setUsername(session.data.user.username || "");
      setPreviewUrl(session.data.user.profileImage || "/profile-avatar.png");
    }
  }, [session]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));

      const formData = new FormData();
      formData.append("image", selectedFile);

      try {
        setLoading(true);
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
      } finally {
        setLoading(false);
      }
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match");
      return;
    }

    try {
      setLoading(true);
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
        alert(data.message || "Error updating password");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      alert("Error updating password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminDashboardLayout>
      <Container fluid className="p-4">
        <Link href="/admin/dashboard">
          <div className="text-decoration-none d-inline-flex align-items-center mb-4" style={{ cursor: "pointer" }}>
            <ArrowLeft size={16} className="me-2" style={{ color: "#667085" }} />
            <span style={{ color: "#667085", fontSize: "14px" }}>Settings</span>
          </div>
        </Link>

        <h2 style={{ fontSize: "24px", fontWeight: 500, marginBottom: "6px" }}>Settings</h2>
        <p style={{ color: "#667085", fontSize: "14px", marginBottom: "32px" }}>
          Manage your team and preferences here.
        </p>

        <div style={{ marginBottom: "32px" }}>
          <div
            style={{
              background: "#F9FAFB",
              display: "inline-flex",
              borderRadius: "8px",
              padding: "4px"
            }}
          >
            <button
              className={`btn ${classnames({ active: activeTab === "myAccount" })}`}
              style={{
                border: "none",
                borderRadius: "6px",
                padding: "8px 12px",
                fontSize: "14px",
                fontWeight: 500,
                color: activeTab === "myAccount" ? "#101828" : "#667085",
                backgroundColor: activeTab === "myAccount" ? "#F9FAFB" : "transparent",
              }}
              onClick={() => handleTabClick("myAccount")}
            >
              My Account
            </button>
            <button
              className={`btn ${classnames({ active: activeTab === "privacySafety" })}`}
              style={{
                border: "none",
                borderRadius: "6px",
                padding: "8px 12px",
                fontSize: "14px",
                fontWeight: 500,
                color: activeTab === "privacySafety" ? "#101828" : "#667085",
                backgroundColor: activeTab === "privacySafety" ? "#F9FAFB" : "transparent",
              }}
              onClick={() => handleTabClick("privacySafety")}
            >
              Privacy & Safety
            </button>
          </div>
        </div>

        {activeTab === "myAccount" && (
          <div>
            <div style={{ display: "flex", marginBottom: "24px" }}>
              <div
                style={{
                  position: "relative",
                  width: "104px",
                  height: "104px"
                }}
              >
                <Image
                  src={previewUrl}
                  alt="Profile"
                  width={104}
                  height={104}
                  style={{ borderRadius: "50%" }}
                />
                <div
                  onClick={handleImageClick}
                  style={{
                    position: "absolute",
                    bottom: "0",
                    right: "0",
                    width: "32px",
                    height: "32px",
                    backgroundColor: "#FFD600",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer"
                  }}
                >
                  <Image
                    src="/admin/camera-icon.svg"
                    alt="Camera"
                    width={16}
                    height={16}
                  />
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </div>
              </div>
              <Row>
                <Col md={6}>
                  <div className="mb-4">
                    <label
                      htmlFor="username"
                      style={{
                        fontSize: "14px",
                        fontWeight: 500,
                        color: "#344054",
                        marginBottom: "6px",
                        display: "block",
                      }}
                    >
                      Axiom Username
                    </label>
                    <Input
                      type="text"
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Axiom Username"
                      style={{
                        height: "44px",
                        fontSize: "16px",
                        color: "#101828",
                        borderColor: "#D0D5DD",
                        borderRadius: "8px",
                        backgroundColor: "#FFFFFF",
                      }}
                      disabled
                    />
                  </div>
                </Col>
                <Col md={6}>
                  <div>
                    <label
                      htmlFor="verification"
                      style={{
                        fontSize: "14px",
                        fontWeight: 500,
                        color: "#344054",
                        marginBottom: "6px",
                        display: "block",
                      }}
                    >
                      Verification Status
                    </label>
                    <Input
                      type="text"
                      id="verification"
                      value="Verification Status"
                      placeholder="Verification Status"
                      style={{
                        height: "44px",
                        fontSize: "16px",
                        color: "#101828",
                        borderColor: "#D0D5DD",
                        borderRadius: "8px",
                        backgroundColor: "#FFFFFF",
                      }}
                      disabled
                    />
                  </div>
                </Col>
              </Row>
            </div>

            <div style={{ marginBottom: "32px" }}>
              <h3 style={{ fontSize: "18px", fontWeight: 500, marginBottom: "24px" }}>Password</h3>
              <Row>
                <Col md={4}>
                  <FormGroup>
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
                    <div style={{ position: "relative" }}>
                      <Input
                        type={showOldPassword ? "text" : "password"}
                        id="oldPassword"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        placeholder="••••••••"
                        style={{
                          height: "44px",
                          fontSize: "16px",
                          color: "#101828",
                          borderColor: "#D0D5DD",
                          borderRadius: "8px",
                          backgroundColor: "#FFFFFF",
                          paddingRight: "40px"
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          right: "12px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          cursor: "pointer"
                        }}
                        onClick={() => setShowOldPassword(!showOldPassword)}
                      >
                        {showOldPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </div>
                    </div>
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
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
                    <div style={{ position: "relative" }}>
                      <Input
                        type={showNewPassword ? "text" : "password"}
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="••••••••"
                        style={{
                          height: "44px",
                          fontSize: "16px",
                          color: "#101828",
                          borderColor: "#D0D5DD",
                          borderRadius: "8px",
                          backgroundColor: "#FFFFFF",
                          paddingRight: "40px"
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          right: "12px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          cursor: "pointer"
                        }}
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </div>
                    </div>
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
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
                    <div style={{ position: "relative" }}>
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        style={{
                          height: "44px",
                          fontSize: "16px",
                          color: "#101828",
                          borderColor: "#D0D5DD",
                          borderRadius: "8px",
                          backgroundColor: "#FFFFFF",
                          paddingRight: "40px"
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          right: "12px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          cursor: "pointer"
                        }}
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </div>
                    </div>
                  </FormGroup>
                </Col>
              </Row>
            </div>

            <Button
              type="submit"
              onClick={handlePasswordUpdate}
              style={{
                backgroundColor: "#FFD600",
                border: "none",
                borderRadius: "8px",
                padding: "10px 16px",
                fontWeight: 500,
                fontSize: "14px",
                color: "#101828",
              }}
              disabled={loading}
            >
              {loading ? "Updating..." : "Update"}
            </Button>
          </div>
        )}

        {activeTab === "privacySafety" && (
          <div>
            <h3 style={{ fontSize: "18px", fontWeight: 500, marginBottom: "24px" }}>Privacy & Safety</h3>
            <p style={{ color: "#667085" }}>
              Privacy settings and other safety-related options would go here.
            </p>
          </div>
        )}
      </Container>
    </AdminDashboardLayout>
  );
}