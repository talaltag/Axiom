
import { useState } from "react";
import SupportAgentLayout from "../../../components/layouts/SupportAgentLayout";
import {
  Container,
  Row,
  Col,
  Input,
  InputGroup,
  InputGroupText,
  Button,
} from "reactstrap";
import { BsFillCameraFill } from "react-icons/bs";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

export default function Settings() {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <SupportAgentLayout>
      <Container className="py-4">
        <div className="d-flex align-items-center mb-4">
          <button className="btn btn-link text-dark p-0 me-3">
            <i className="fas fa-arrow-left"></i>
          </button>
          <h4 className="m-0">Settings</h4>
        </div>
        <p className="text-muted mb-4">
          Manage your team and preferences here.
        </p>
        
        <div className="position-relative mb-4" style={{width: "120px"}}>
          <img 
            src="/user1.png"
            alt="Profile"
            className="rounded-circle"
            width={120}
            height={120}
          />
          <div 
            className="position-absolute bottom-0 end-0 p-2 bg-warning rounded-circle"
            style={{cursor: "pointer"}}
          >
            <BsFillCameraFill size={20} color="#000"/>
          </div>
        </div>

        <Row className="mb-4">
          <Col md={6}>
            <div className="mb-3">
              <label className="mb-2">Axiom Username</label>
              <Input 
                type="text"
                placeholder="Axiom Username"
                className="bg-light"
              />
            </div>
          </Col>
          <Col md={6}>
            <div className="mb-3">
              <label className="mb-2">Verification Status</label>
              <Input 
                type="text"
                placeholder="Verification Status"
                className="bg-light"
                disabled
              />
            </div>
          </Col>
        </Row>

        <h5 className="mb-3">Password</h5>
        <Row>
          <Col md={4}>
            <div className="mb-3">
              <label className="mb-2">Old Password</label>
              <InputGroup>
                <Input
                  type={showOldPassword ? "text" : "password"}
                  placeholder="Old Password"
                  className="bg-light"
                />
                <InputGroupText 
                  className="bg-light cursor-pointer"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                >
                  {showOldPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </InputGroupText>
              </InputGroup>
            </div>
          </Col>
          <Col md={4}>
            <div className="mb-3">
              <label className="mb-2">New Password</label>
              <InputGroup>
                <Input
                  type={showNewPassword ? "text" : "password"}
                  placeholder="New Password"
                  className="bg-light"
                />
                <InputGroupText 
                  className="bg-light cursor-pointer"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </InputGroupText>
              </InputGroup>
            </div>
          </Col>
          <Col md={4}>
            <div className="mb-3">
              <label className="mb-2">Confirm Password</label>
              <InputGroup>
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  className="bg-light"
                />
                <InputGroupText 
                  className="bg-light cursor-pointer"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </InputGroupText>
              </InputGroup>
            </div>
          </Col>
        </Row>

        <div className="text-end mt-4">
          <Button 
            color="warning" 
            className="px-4"
            style={{color: "#000"}}
          >
            Update
          </Button>
        </div>
      </Container>
    </SupportAgentLayout>
  );
}
