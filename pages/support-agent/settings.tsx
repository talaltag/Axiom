import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  InputGroup,
  InputGroupText,
} from "reactstrap";
import { Eye, EyeOff } from "react-feather";
import SupportAgentLayout from "../../components/layouts/SupportAgentLayout";
import { useSession } from "next-auth/react";

export default function SupportAgentSettings() {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const session = useSession();
  const [formData, setFormData] = useState({
    name: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  const togglePasswordVisibility = (field: string) => {
    switch (field) {
      case "old":
        setShowOldPassword(!showOldPassword);
        break;
      case "new":
        setShowNewPassword(!showNewPassword);
        break;
      case "confirm":
        setShowConfirmPassword(!showConfirmPassword);
        break;
    }
  };

  useEffect(() => {
    if (session?.data?.user) {
      setFormData({ ...formData, name: session.data.user.name });
    }
  }, [session]);

  return (
    <SupportAgentLayout>
      <Container fluid className="px-4 py-2">
        <div className="mb-1">
          <h2
            style={{
              marginBottom: "6px",
              fontSize: "24px",
              fontWeight: 500,
              color: "#101828",
            }}
          >
            Settings
          </h2>
        </div>
        <p style={{ color: "#667085", fontSize: "14px", marginBottom: "32px" }}>
          Manage your team and preferences here.
        </p>

        <Row>
          <Col md={8} style={{ width: "100%" }}>
            <div className="mb-4">
              <div
                style={{
                  position: "relative",
                  width: "fit-content",
                  marginBottom: "2rem",
                }}
              >
                <img
                  src="/user1.png"
                  alt="Profile"
                  className="rounded-circle"
                  width={100}
                  height={100}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: -5,
                    right: -5,
                    backgroundColor: "#FFD700",
                    borderRadius: "50%",
                    width: 32,
                    height: 32,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    border: "2px solid white",
                  }}
                >
                  <label>
                    <span style={{ fontSize: "1.2rem" }}>📸</span>
                    <input type="file" className="d-none" />
                  </label>
                </div>
              </div>

              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label
                        style={{
                          color: "#344054",
                          fontSize: "14px",
                          fontWeight: "500",
                          marginBottom: "6px",
                        }}
                      >
                        Full Name
                      </Label>
                      <Input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="Full name"
                        style={{
                          height: "44px",
                          backgroundColor: "#fff",
                          borderColor: "#D0D5DD",
                          color: "#667085",
                          fontSize: "16px",
                          padding: "10px 14px",
                        }}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <h5 className="mt-4 mb-3">Password</h5>
                <Row>
                  <Col md={4}>
                    <FormGroup>
                      <Label
                        style={{
                          color: "#344054",
                          fontSize: "14px",
                          fontWeight: "500",
                          marginBottom: "6px",
                        }}
                      >
                        Old Password
                      </Label>
                      <InputGroup>
                        <Input
                          type={showOldPassword ? "text" : "password"}
                          value={formData.oldPassword}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              oldPassword: e.target.value,
                            })
                          }
                          placeholder="Enter..."
                          style={{
                            height: "44px",
                            borderRight: "none",
                            backgroundColor: "#fff",
                            borderColor: "#D0D5DD",
                            color: "#667085",
                            fontSize: "16px",
                          }}
                        />
                        <InputGroupText
                          className="cursor-pointer"
                          onClick={() => togglePasswordVisibility("old")}
                          style={{
                            backgroundColor: "#fff",
                            borderLeft: "none",
                            borderColor: "#D0D5DD",
                          }}
                        >
                          {showOldPassword ? (
                            <EyeOff size={20} style={{ color: "#667085" }} />
                          ) : (
                            <Eye size={20} style={{ color: "#667085" }} />
                          )}
                        </InputGroupText>
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label
                        style={{
                          color: "#344054",
                          fontSize: "14px",
                          fontWeight: "500",
                          marginBottom: "6px",
                        }}
                      >
                        New Password
                      </Label>
                      <InputGroup>
                        <Input
                          type={showNewPassword ? "text" : "password"}
                          value={formData.newPassword}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              newPassword: e.target.value,
                            })
                          }
                          placeholder="Enter..."
                          style={{
                            height: "44px",
                            borderRight: "none",
                            backgroundColor: "#fff",
                            borderColor: "#D0D5DD",
                            color: "#667085",
                            fontSize: "16px",
                          }}
                        />
                        <InputGroupText
                          className="cursor-pointer"
                          onClick={() => togglePasswordVisibility("new")}
                          style={{
                            backgroundColor: "#fff",
                            borderLeft: "none",
                            borderColor: "#D0D5DD",
                          }}
                        >
                          {showNewPassword ? (
                            <EyeOff size={20} style={{ color: "#667085" }} />
                          ) : (
                            <Eye size={20} style={{ color: "#667085" }} />
                          )}
                        </InputGroupText>
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label
                        style={{
                          color: "#344054",
                          fontSize: "14px",
                          fontWeight: "500",
                          marginBottom: "6px",
                        }}
                      >
                        Confirm Password
                      </Label>
                      <InputGroup>
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          value={formData.confirmPassword}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              confirmPassword: e.target.value,
                            })
                          }
                          placeholder="Enter..."
                          style={{
                            height: "44px",
                            borderRight: "none",
                            backgroundColor: "#fff",
                            borderColor: "#D0D5DD",
                            color: "#667085",
                            fontSize: "16px",
                          }}
                        />
                        <InputGroupText
                          className="cursor-pointer"
                          onClick={() => togglePasswordVisibility("confirm")}
                          style={{
                            backgroundColor: "#fff",
                            borderLeft: "none",
                            borderColor: "#D0D5DD",
                          }}
                        >
                          {showConfirmPassword ? (
                            <EyeOff size={20} style={{ color: "#667085" }} />
                          ) : (
                            <Eye size={20} style={{ color: "#667085" }} />
                          )}
                        </InputGroupText>
                      </InputGroup>
                    </FormGroup>
                  </Col>
                </Row>

                <div className="text-end mt-4">
                  <Button
                    color="warning"
                    style={{
                      width: "170px",
                      height: "44px",
                      backgroundColor: "#FFD700",
                      border: "none",
                      borderRadius: "8px",
                      fontSize: "16px",
                      fontWeight: 500,
                      float: "right",
                    }}
                  >
                    Update
                  </Button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </SupportAgentLayout>
  );
}
