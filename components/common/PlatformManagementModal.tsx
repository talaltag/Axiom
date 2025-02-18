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
    pubgId: "",
    username: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/users/me/platforms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          platform: 'pubg',
          platformId: platformData.pubgId,
          username: platformData.username
        }),
      });

      if (response.ok) {
        const platform = platforms.find(p => p.id === 'pubg');
        if (platform && !addedPlatforms.find(p => p.id === 'pubg')) {
          setAddedPlatforms([...addedPlatforms, platform]);
        }
        toggle();
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to connect PUBG account');
      }
    } catch (error) {
      console.error('Error connecting PUBG account:', error);
      alert('Failed to connect PUBG account');
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} className="modal-dialog-centered">
      <div className="p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 style={{ fontSize: "18px", fontWeight: 500, color: "#101828", margin: 0 }}>
            Connect PUBG Account
          </h5>
          <button type="button" className="btn-close" onClick={toggle} />
        </div>

        <Form onSubmit={handleSubmit}>
          <FormGroup className="mb-3">
            <Label for="pubgId" style={{ fontSize: "14px", color: "#344054", fontWeight: 500 }}>
              PUBG ID
            </Label>
            <Input
              id="pubgId"
              value={platformData.pubgId}
              onChange={(e) => setPlatformData({ ...platformData, pubgId: e.target.value })}
              placeholder="Enter your PUBG ID"
              required
            />
          </FormGroup>

          <FormGroup className="mb-4">
            <Label for="username" style={{ fontSize: "14px", color: "#344054", fontWeight: 500 }}>
              PUBG Username
            </Label>
            <Input
              id="username"
              value={platformData.username}
              onChange={(e) => setPlatformData({ ...platformData, username: e.target.value })}
              placeholder="Enter your PUBG username"
              required
            />
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
            }}
          >
            Connect Account
          </Button>
        </Form>
      </div>
    </Modal>
  );
}