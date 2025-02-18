import React, { useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";

interface PlatformManagementModalProps {
  isOpen: boolean;
  toggle: () => void;
  onAddPlatform: (platformData: any) => void;
}

export default function PlatformManagementModal({
  isOpen,
  toggle,
  onAddPlatform,
}: PlatformManagementModalProps) {
  const [platformData, setPlatformData] = useState({
    platformId: "",
    platform: "",
    username: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddPlatform(platformData);
    setPlatformData({ platformId: "", platform: "", username: "" });
    toggle();
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        toggle={toggle}
        className="modal-dialog-centered"
        style={{
          maxWidth: "400px",
          margin: "1.75rem auto",
          height: "100vh",
        }}
      >
        <div className="d-flex flex-column h-100">
          <div className="p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5
                style={{
                  fontSize: "18px",
                  fontWeight: 500,
                  color: "#101828",
                  margin: 0,
                }}
              >
                Platform Management
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={toggle}
                aria-label="Close"
              />
            </div>

            <Form onSubmit={handleSubmit}>
              <FormGroup className="mb-3">
                <Label
                  for="platformId"
                  style={{
                    fontSize: "14px",
                    color: "#344054",
                    fontWeight: 500,
                    marginBottom: "6px",
                  }}
                >
                  Platform ID
                </Label>
                <Input
                  id="platformId"
                  placeholder="Platform ID"
                  value={platformData.platformId}
                  onChange={(e) =>
                    setPlatformData({
                      ...platformData,
                      platformId: e.target.value,
                    })
                  }
                  style={{
                    height: "44px",
                    padding: "10px 14px",
                    fontSize: "16px",
                    border: "1px solid #D0D5DD",
                    borderRadius: "8px",
                    background: "#FFFFFF",
                  }}
                />
              </FormGroup>

              <FormGroup className="mb-3">
                <Label
                  for="platform"
                  style={{
                    fontSize: "14px",
                    color: "#344054",
                    fontWeight: 500,
                    marginBottom: "6px",
                  }}
                >
                  Platform
                </Label>
                <Input
                  id="platform"
                  placeholder="Platform"
                  value={platformData.platform}
                  onChange={(e) =>
                    setPlatformData({
                      ...platformData,
                      platform: e.target.value,
                    })
                  }
                  style={{
                    height: "44px",
                    padding: "10px 14px",
                    fontSize: "16px",
                    border: "1px solid #D0D5DD",
                    borderRadius: "8px",
                    background: "#FFFFFF",
                  }}
                />
              </FormGroup>

              <FormGroup className="mb-4">
                <Label
                  for="username"
                  style={{
                    fontSize: "14px",
                    color: "#344054",
                    fontWeight: 500,
                    marginBottom: "6px",
                  }}
                >
                  Username
                </Label>
                <Input
                  id="username"
                  placeholder="Username"
                  value={platformData.username}
                  onChange={(e) =>
                    setPlatformData({
                      ...platformData,
                      username: e.target.value,
                    })
                  }
                  style={{
                    height: "44px",
                    padding: "10px 14px",
                    fontSize: "16px",
                    border: "1px solid #D0D5DD",
                    borderRadius: "8px",
                    background: "#FFFFFF",
                  }}
                />
              </FormGroup>
            </Form>
          </div>

          <div className="mt-auto p-4">
            <Button
              type="submit"
              className="w-100"
              style={{
                height: "44px",
                backgroundColor: "#FFD600",
                border: "none",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: 500,
                color: "#101828",
                padding: "10px",
              }}
            >
              Add Platform
            </Button>
          </div>
        </div>
      </Modal>

      <style jsx global>{`
        .modal-content {
          border: none;
          border-radius: 12px;
          box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.15);
          height: 90vh;
        }

        .modal-backdrop.show {
          opacity: 0.7;
          background-color: rgba(52, 64, 84, 0.7);
          backdrop-filter: blur(100px);
        }

        .btn-close {
          background-size: 14px;
          opacity: 1;
          padding: 8px;
        }

        .btn-close:hover {
          opacity: 0.7;
        }

        .form-control:focus {
          border-color: #ffd600;
          box-shadow: 0 0 0 4px rgba(255, 214, 0, 0.25);
        }
      `}</style>
    </>
  );
}
