
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
  platforms: any[];
  addedPlatforms: any[];
  setAddedPlatforms: (platforms: any[]) => void;
}

export default function PlatformManagementModal({
  isOpen,
  toggle,
  platforms,
  addedPlatforms,
  setAddedPlatforms,
}: PlatformManagementModalProps) {
  const [platformData, setPlatformData] = useState({
    pubgUsername: "",
    region: "NA",
  });

  const handlePUBGConnect = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/platforms/pubg/connect", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(platformData),
      });

      const data = await response.json();

      if (response.ok) {
        const pubgPlatform = platforms.find(p => p.id === 'pubg');
        if (pubgPlatform && !addedPlatforms.find(p => p.id === 'pubg')) {
          setAddedPlatforms([...addedPlatforms, pubgPlatform]);
        }
        toggle();
      } else {
        alert(data.message || "Error connecting PUBG account");
      }
    } catch (error) {
      console.error("Error connecting PUBG account:", error);
      alert("Error connecting PUBG account");
    }
  };

  return (
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
              Connect PUBG Account
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={toggle}
              aria-label="Close"
            />
          </div>

          <Form onSubmit={handlePUBGConnect}>
            <FormGroup className="mb-3">
              <Label
                for="pubgUsername"
                style={{
                  fontSize: "14px",
                  color: "#344054",
                  fontWeight: 500,
                  marginBottom: "6px",
                }}
              >
                PUBG Username
              </Label>
              <Input
                id="pubgUsername"
                placeholder="Enter your PUBG username"
                value={platformData.pubgUsername}
                onChange={(e) =>
                  setPlatformData({
                    ...platformData,
                    pubgUsername: e.target.value,
                  })
                }
                required
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
                for="region"
                style={{
                  fontSize: "14px",
                  color: "#344054",
                  fontWeight: 500,
                  marginBottom: "6px",
                }}
              >
                Region
              </Label>
              <Input
                type="select"
                id="region"
                value={platformData.region}
                onChange={(e) =>
                  setPlatformData({
                    ...platformData,
                    region: e.target.value,
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
              >
                <option value="NA">North America</option>
                <option value="EU">Europe</option>
                <option value="AS">Asia</option>
                <option value="KR">Korea/Japan</option>
              </Input>
            </FormGroup>

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
              Connect Account
            </Button>
          </Form>
        </div>
      </div>

      <style jsx global>{`
        .modal-content {
          border: none;
          border-radius: 12px;
          box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.15);
          height: auto;
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
    </Modal>
  );
}
