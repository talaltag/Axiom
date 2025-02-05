import { useState } from "react";
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

export default function SupportAgentSettings() {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    verificationStatus: "",
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

  return (
    <SupportAgentLayout>
      <Container fluid className="p-4">
        <div className="d-flex align-items-center mb-4">
          <h2 className="mb-0">Settings</h2>
        </div>
        <p className="text-muted mb-4">Manage your team and preferences here.</p>

        <Row>
          <Col md={8} style={{width:'100%'}}>
            <div className="mb-4">
              <div className="d-flex align-items-center mb-4">
                <img
                  src="/user1.png"
                  alt="Profile"
                  className="rounded-circle"
                  width={100}
                  height={100}
                />
                <div className="ms-3">
                  <Button color="warning" size="sm">
                    <span style={{fontSize:'1.2rem'}}>&#128247;</span>
                  </Button>
                </div>
              </div>

              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label>Axiom Username</Label>
                      <Input
                        type="text"
                        value={formData.username}
                        onChange={(e) =>
                          setFormData({ ...formData, username: e.target.value })
                        }
                        placeholder="Axiom Username"
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label>Verification Status</Label>
                      <Input
                        type="text"
                        value={formData.verificationStatus}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            verificationStatus: e.target.value,
                          })
                        }
                        placeholder="Verification Status"
                        disabled
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <h5 className="mt-4 mb-3">Password</h5>
                <Row>
                  <Col md={4}>
                    <FormGroup>
                      <Label>Old Password</Label>
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
                          placeholder="Old Password"
                        />
                        <InputGroupText
                          className="cursor-pointer"
                          onClick={() => togglePasswordVisibility("old")}
                        >
                          {showOldPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </InputGroupText>
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label>New Password</Label>
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
                          placeholder="New Password"
                        />
                        <InputGroupText
                          className="cursor-pointer"
                          onClick={() => togglePasswordVisibility("new")}
                        >
                          {showNewPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </InputGroupText>
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label>Confirm Password</Label>
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
                          placeholder="Confirm Password"
                        />
                        <InputGroupText
                          className="cursor-pointer"
                          onClick={() => togglePasswordVisibility("confirm")}
                        >
                          {showConfirmPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </InputGroupText>
                      </InputGroup>
                    </FormGroup>
                  </Col>
                </Row>

                <div className="text-end mt-4">
                  <Button color="warning" size="lg">
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