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
  Alert,
} from "reactstrap";

interface PlatformManagementModalProps {
  isOpen: boolean;
  toggle: () => void;
  platform: string;
}

export default function PlatformManagementModal({
  isOpen,
  toggle,
  platform,
}: PlatformManagementModalProps) {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/platforms/pubg/connect", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message);
        setTimeout(() => {
          toggle();
          window.location.href == "/user/statistics";
        }, 2000);
      } else {
        setError(data.message || "Failed to connect account");
      }
    } catch (error: any) {
      setError(error.message || "Failed to connect account");
    } finally {
      setLoading(false);
    }
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
        }}
      >
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
              Connect {platform} Account
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={toggle}
              aria-label="Close"
            />
          </div>

          {error && (
            <Alert color="danger" className="mb-4">
              {error}
            </Alert>
          )}

          {success && (
            <Alert color="success" className="mb-4">
              {success}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
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
                placeholder="Enter your PUBG username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
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

            <Button
              type="submit"
              className="w-100"
              disabled={loading}
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
              {loading ? "Connecting..." : "Connect Account"}
            </Button>
          </Form>
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
