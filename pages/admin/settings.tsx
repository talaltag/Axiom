import { useState, useEffect } from "react";
import AdminDashboardLayout from "../../components/layouts/AdminDashboardLayout";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import {
  Container,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Input,
  Button,
  InputGroup,
  InputGroupText,
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
      <Container fluid className="p-0">
        <div className="p-4" style={{ backgroundColor: "#FFF" }}>
          <Link href="/admin/dashboard">
            <div
              className="text-decoration-none d-inline-flex align-items-center mb-4"
              style={{ cursor: "pointer" }}
            >
              <ArrowLeft
                size={16}
                className="me-2"
                style={{ color: "#667085" }}
              />
              <span style={{ color: "#667085", fontSize: "14px" }}>
                Settings
              </span>
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

          <Nav tabs style={{ border: "none", marginBottom: "24px" }}>
            <div
              className="d-flex"
              style={{
                background: "#FFFFFF",
                padding: "4px",
                borderRadius: "8px",
                width: "fit-content",
                border: "1px solid #EAECF0",
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
                    fontWeight: 500,
                    color: activeTab === "myAccount" ? "#101828" : "#667085",
                    backgroundColor:
                      activeTab === "myAccount" ? "#F9FAFB" : "transparent",
                    borderRadius: "6px",
                    border: "none",
                  }}
                >
                  My Account
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: activeTab === "privacySafety",
                  })}
                  onClick={() => setActiveTab("privacySafety")}
                  style={{
                    cursor: "pointer",
                    padding: "8px 12px",
                    fontSize: "14px",
                    fontWeight: 500,
                    color:
                      activeTab === "privacySafety" ? "#101828" : "#667085",
                    backgroundColor:
                      activeTab === "privacySafety" ? "#F9FAFB" : "transparent",
                    borderRadius: "6px",
                    border: "none",
                  }}
                >
                  Privacy & Safety
                </NavLink>
              </NavItem>
            </div>
          </Nav>

          <div className="bg-white rounded-3 p-4">
            <TabContent activeTab={activeTab}>
              <TabPane tabId="myAccount">
                <div className="d-flex flex-column">
                  <div
                    className="position-relative mb-5"
                    style={{ width: "80px", height: "80px" }}
                  >
                    <Image
                      src={previewUrl}
                      alt="Profile"
                      width={80}
                      height={80}
                      className="rounded-circle"
                      style={{ objectFit: "cover" }}
                    />
                    <div
                      className="position-absolute d-flex align-items-center justify-content-center"
                      style={{
                        bottom: "0",
                        right: "0",
                        width: "24px",
                        height: "24px",
                        backgroundColor: "#FFD600",
                        borderRadius: "50%",
                        cursor: "pointer",
                      }}
                    >
                      <label
                        htmlFor="profile-image"
                        style={{ cursor: "pointer", margin: 0 }}
                      >
                        <Image
                          src="/admin/camera-icon.svg"
                          alt="Upload"
                          width={12}
                          height={12}
                        />
                        <input
                          type="file"
                          id="profile-image"
                          accept="image/*"
                          onChange={handleImageUpload}
                          style={{ display: "none" }}
                          disabled={loading}
                        />
                      </label>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-2">
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

                    <div className="col-md-6">
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
                  </div>

                  <div className="mt-4">
                    <h5
                      style={{
                        fontSize: "16px",
                        fontWeight: 500,
                        color: "#101828",
                        marginBottom: "24px",
                      }}
                    >
                      Password
                    </h5>
                    <form onSubmit={handlePasswordUpdate}>
                      <div className="row g-3">
                        <div className="col-md-4">
                          <label
                            htmlFor="oldPassword"
                            style={{
                              fontSize: "14px",
                              fontWeight: 500,
                              color: "#344054",
                              marginBottom: "6px",
                              display: "block",
                            }}
                          >
                            Old Password
                          </label>
                          <InputGroup>
                            <Input
                              type={showOldPassword ? "text" : "password"}
                              id="oldPassword"
                              value={oldPassword}
                              onChange={(e) => setOldPassword(e.target.value)}
                              placeholder="••••••••"
                              style={{
                                height: "44px",
                                fontSize: "16px",
                                borderColor: "#D0D5DD",
                                borderTopRightRadius: 0,
                                borderBottomRightRadius: 0,
                                borderRight: "none",
                              }}
                            />
                            <InputGroupText
                              style={{
                                backgroundColor: "white",
                                cursor: "pointer",
                                borderColor: "#D0D5DD",
                                borderLeft: "none",
                                paddingLeft: 0,
                              }}
                              onClick={() =>
                                setShowOldPassword(!showOldPassword)
                              }
                            >
                              {showOldPassword ? (
                                <EyeOff size={16} />
                              ) : (
                                <Eye size={16} />
                              )}
                            </InputGroupText>
                          </InputGroup>
                        </div>
                        <div className="col-md-4">
                          <label
                            htmlFor="newPassword"
                            style={{
                              fontSize: "14px",
                              fontWeight: 500,
                              color: "#344054",
                              marginBottom: "6px",
                              display: "block",
                            }}
                          >
                            New Password
                          </label>
                          <InputGroup>
                            <Input
                              type={showNewPassword ? "text" : "password"}
                              id="newPassword"
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                              placeholder="••••••••"
                              style={{
                                height: "44px",
                                fontSize: "16px",
                                borderColor: "#D0D5DD",
                                borderTopRightRadius: 0,
                                borderBottomRightRadius: 0,
                                borderRight: "none",
                              }}
                            />
                            <InputGroupText
                              style={{
                                backgroundColor: "white",
                                cursor: "pointer",
                                borderColor: "#D0D5DD",
                                borderLeft: "none",
                                paddingLeft: 0,
                              }}
                              onClick={() =>
                                setShowNewPassword(!showNewPassword)
                              }
                            >
                              {showNewPassword ? (
                                <EyeOff size={16} />
                              ) : (
                                <Eye size={16} />
                              )}
                            </InputGroupText>
                          </InputGroup>
                        </div>
                        <div className="col-md-4">
                          <label
                            htmlFor="confirmPassword"
                            style={{
                              fontSize: "14px",
                              fontWeight: 500,
                              color: "#344054",
                              marginBottom: "6px",
                              display: "block",
                            }}
                          >
                            Confirm Password
                          </label>
                          <InputGroup>
                            <Input
                              type={showConfirmPassword ? "text" : "password"}
                              id="confirmPassword"
                              value={confirmPassword}
                              onChange={(e) =>
                                setConfirmPassword(e.target.value)
                              }
                              placeholder="••••••••"
                              style={{
                                height: "44px",
                                fontSize: "16px",
                                borderColor: "#D0D5DD",
                                borderTopRightRadius: 0,
                                borderBottomRightRadius: 0,
                                borderRight: "none",
                              }}
                            />
                            <InputGroupText
                              style={{
                                backgroundColor: "white",
                                cursor: "pointer",
                                borderColor: "#D0D5DD",
                                borderLeft: "none",
                                paddingLeft: 0,
                              }}
                              onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                              }
                            >
                              {showConfirmPassword ? (
                                <EyeOff size={16} />
                              ) : (
                                <Eye size={16} />
                              )}
                            </InputGroupText>
                          </InputGroup>
                        </div>
                      </div>
                      <div className="mt-4 text-end">
                        <Button
                          type="submit"
                          style={{
                            backgroundColor: "#FFD600",
                            border: "none",
                            color: "#101828",
                            fontWeight: 500,
                            padding: "10px 18px",
                            fontSize: "16px",
                            borderRadius: "8px",
                            width: "120px",
                          }}
                          disabled={loading}
                        >
                          {loading ? "Updating..." : "Update"}
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
              </TabPane>
              <TabPane tabId="privacySafety">
                <div>
                  <h5
                    style={{
                      fontSize: "16px",
                      fontWeight: 500,
                      color: "#101828",
                      marginBottom: "16px",
                    }}
                  >
                    Privacy Settings
                  </h5>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#667085",
                      marginBottom: "24px",
                    }}
                  >
                    Manage your privacy settings and control how your
                    information is used.
                  </p>

                  <div className="mb-4">
                    <div
                      style={{
                        padding: "16px",
                        border: "1px solid #EAECF0",
                        borderRadius: "8px",
                        marginBottom: "16px",
                      }}
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h6
                            style={{
                              fontSize: "14px",
                              fontWeight: 500,
                              color: "#101828",
                              marginBottom: "4px",
                            }}
                          >
                            Profile Visibility
                          </h6>
                          <p
                            style={{
                              fontSize: "14px",
                              color: "#667085",
                              margin: 0,
                            }}
                          >
                            Control who can see your profile information
                          </p>
                        </div>
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="profileVisibility"
                            style={{ width: "36px", height: "20px" }}
                          />
                        </div>
                      </div>
                    </div>

                    <div
                      style={{
                        padding: "16px",
                        border: "1px solid #EAECF0",
                        borderRadius: "8px",
                      }}
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h6
                            style={{
                              fontSize: "14px",
                              fontWeight: 500,
                              color: "#101828",
                              marginBottom: "4px",
                            }}
                          >
                            Data Collection
                          </h6>
                          <p
                            style={{
                              fontSize: "14px",
                              color: "#667085",
                              margin: 0,
                            }}
                          >
                            Allow us to collect usage data to improve your
                            experience
                          </p>
                        </div>
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="dataCollection"
                            defaultChecked
                            style={{ width: "36px", height: "20px" }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabPane>
            </TabContent>
          </div>
        </div>
      </Container>
    </AdminDashboardLayout>
  );
}
