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
  InputGroupText,
  Form,
} from "reactstrap";
import classnames from "classnames";
import { ArrowLeft, Eye, EyeOff } from "react-feather";
import Link from "next/link";

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState("myAccount");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const session = useSession();

  return (
    <AdminDashboardLayout>
      <div className="d-flex align-items-center mb-4">
        <Link href="/admin/dashboard" className="text-decoration-none me-2">
          <ArrowLeft size={20} color="#101828" />
        </Link>
        <h5 className="mb-0">Settings</h5>
      </div>

      <Container fluid className="p-0">
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

        <div style={{ background: "#F9FAFB", padding: "4px", borderRadius: "6px", width: "fit-content", marginBottom: "24px" }}>
          <Nav tabs className="border-0 d-flex">
            <NavItem>
              <NavLink
                className={classnames({
                  active: activeTab === "myAccount",
                  "bg-white": activeTab === "myAccount"
                })}
                onClick={() => setActiveTab("myAccount")}
                style={{
                  cursor: "pointer",
                  padding: "8px 12px",
                  fontSize: "14px",
                  color: "#101828",
                  fontFamily: "Inter, sans-serif",
                  border: "none",
                  borderRadius: "6px",
                }}
              >
                My Account
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({
                  active: activeTab === "privacySafety",
                  "bg-white": activeTab === "privacySafety"
                })}
                onClick={() => setActiveTab("privacySafety")}
                style={{
                  cursor: "pointer",
                  padding: "8px 12px",
                  fontSize: "14px",
                  color: "#101828",
                  fontFamily: "Inter, sans-serif",
                  border: "none",
                  borderRadius: "6px",
                }}
              >
                Privacy & Safety
              </NavLink>
            </NavItem>
          </Nav>
        </div>

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
                        src={session?.data?.user?.profileImage || "/user1.png"}
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
                          <Image
                            src="/admin/camera-icon.svg"
                            width={16}
                            height={16}
                            alt="Upload"
                          />
                          <Input
                            type="file"
                            id="profile-image"
                            accept="image/*"
                            style={{ display: "none" }}
                          />
                        </label>
                      </div>
                    </div>
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
                        style={{
                          backgroundColor: "#FFFFFF",
                          borderRadius: "8px",
                          border: "1px solid #D0D5DD",
                          padding: "10px 14px",
                          fontSize: "16px",
                          height: "44px",
                        }}
                      />
                      <Button
                        style={{
                          backgroundColor: "#FFD600",
                          border: "none",
                          width: "120px",
                          borderRadius: "8px",
                          color: "#000000",
                          fontWeight: "500",
                          height: "44px",
                        }}
                      >
                        Update
                      </Button>
                    </div>
                  </FormGroup>

                  <h5 className="mb-4">Change Password</h5>
                  <Form>
                    <Row>
                      <Col md={4}>
                        <FormGroup>
                          <Label for="oldPassword">Old Password</Label>
                          <InputGroup>
                            <Input
                              type={showOldPassword ? "text" : "password"}
                              id="oldPassword"
                              value={oldPassword}
                              onChange={(e) => setOldPassword(e.target.value)}
                              style={{
                                backgroundColor: "#FFFFFF",
                                borderRadius: "8px 0 0 8px",
                                border: "1px solid #D0D5DD",
                                borderRight: "none",
                                padding: "10px 14px",
                                fontSize: "16px",
                                height: "44px",
                              }}
                            />
                            <InputGroupText
                              style={{
                                backgroundColor: "#FFFFFF",
                                borderRadius: "0 8px 8px 0",
                                border: "1px solid #D0D5DD",
                                borderLeft: "none",
                                padding: "10px 14px",
                                cursor: "pointer",
                              }}
                              onClick={() => setShowOldPassword(!showOldPassword)}
                            >
                              {showOldPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </InputGroupText>
                          </InputGroup>
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        <FormGroup>
                          <Label for="newPassword">New Password</Label>
                          <InputGroup>
                            <Input
                              type={showNewPassword ? "text" : "password"}
                              id="newPassword"
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                              style={{
                                backgroundColor: "#FFFFFF",
                                borderRadius: "8px 0 0 8px",
                                border: "1px solid #D0D5DD",
                                borderRight: "none",
                                padding: "10px 14px",
                                fontSize: "16px",
                                height: "44px",
                              }}
                            />
                            <InputGroupText
                              style={{
                                backgroundColor: "#FFFFFF",
                                borderRadius: "0 8px 8px 0",
                                border: "1px solid #D0D5DD",
                                borderLeft: "none",
                                padding: "10px 14px",
                                cursor: "pointer",
                              }}
                              onClick={() => setShowNewPassword(!showNewPassword)}
                            >
                              {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </InputGroupText>
                          </InputGroup>
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        <FormGroup>
                          <Label for="confirmPassword">Confirm Password</Label>
                          <InputGroup>
                            <Input
                              type={showConfirmPassword ? "text" : "password"}
                              id="confirmPassword"
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                              style={{
                                backgroundColor: "#FFFFFF",
                                borderRadius: "8px 0 0 8px",
                                border: "1px solid #D0D5DD",
                                borderRight: "none",
                                padding: "10px 14px",
                                fontSize: "16px",
                                height: "44px",
                              }}
                            />
                            <InputGroupText
                              style={{
                                backgroundColor: "#FFFFFF",
                                borderRadius: "0 8px 8px 0",
                                border: "1px solid #D0D5DD",
                                borderLeft: "none",
                                padding: "10px 14px",
                                cursor: "pointer",
                              }}
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </InputGroupText>
                          </InputGroup>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Button
                      style={{
                        backgroundColor: "#FFD600",
                        border: "none",
                        borderRadius: "8px",
                        color: "#000000",
                        fontWeight: "500",
                        marginTop: "16px",
                        padding: "10px 16px",
                      }}
                    >
                      Update Password
                    </Button>
                  </Form>
                </div>
              </Col>
            </Row>
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
                </p>
              </div>
            </div>
          </TabPane>
        </TabContent>
      </Container>
    </AdminDashboardLayout>
  );
}