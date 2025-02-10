
import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Button } from 'reactstrap';

interface PlatformManagementModalProps {
  isOpen: boolean;
  toggle: () => void;
  onAddPlatform: (platformData: any) => void;
}

export default function PlatformManagementModal({ isOpen, toggle, onAddPlatform }: PlatformManagementModalProps) {
  const [platformData, setPlatformData] = useState({
    platformId: '',
    platform: '',
    username: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddPlatform(platformData);
    toggle();
  };

  return (
    <Modal 
      isOpen={isOpen} 
      toggle={toggle}
      style={{
        maxWidth: '400px',
        borderRadius: '12px',
        boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.15)'
      }}
      backdropClassName="modal-backdrop-dark"
    >
      <div className="p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="mb-0" style={{ fontSize: '18px', color: '#101828', fontWeight: 500 }}>
            Platform Management
          </h5>
          <button
            type="button"
            className="btn-close"
            onClick={toggle}
            style={{ padding: '8px' }}
          />
        </div>

        <Form onSubmit={handleSubmit}>
          <FormGroup className="mb-3">
            <Label 
              for="platformId"
              style={{ fontSize: '14px', color: '#344054', marginBottom: '6px' }}
            >
              Platform ID
            </Label>
            <Input
              id="platformId"
              placeholder="Platform ID"
              value={platformData.platformId}
              onChange={(e) => setPlatformData({ ...platformData, platformId: e.target.value })}
              required
              style={{
                height: '44px',
                padding: '10px 14px',
                border: '1px solid #D0D5DD',
                borderRadius: '8px',
                fontSize: '14px'
              }}
            />
          </FormGroup>
          <FormGroup className="mb-3">
            <Label 
              for="platform"
              style={{ fontSize: '14px', color: '#344054', marginBottom: '6px' }}
            >
              Platform
            </Label>
            <Input
              id="platform"
              placeholder="Platform"
              value={platformData.platform}
              onChange={(e) => setPlatformData({ ...platformData, platform: e.target.value })}
              required
              style={{
                height: '44px',
                padding: '10px 14px',
                border: '1px solid #D0D5DD',
                borderRadius: '8px',
                fontSize: '14px'
              }}
            />
          </FormGroup>
          <FormGroup className="mb-4">
            <Label 
              for="username"
              style={{ fontSize: '14px', color: '#344054', marginBottom: '6px' }}
            >
              Username
            </Label>
            <Input
              id="username"
              placeholder="Username"
              value={platformData.username}
              onChange={(e) => setPlatformData({ ...platformData, username: e.target.value })}
              required
              style={{
                height: '44px',
                padding: '10px 14px',
                border: '1px solid #D0D5DD',
                borderRadius: '8px',
                fontSize: '14px'
              }}
            />
          </FormGroup>
          <Button
            color="warning"
            type="submit"
            className="w-100"
            style={{
              backgroundColor: '#FFD600',
              border: 'none',
              height: '44px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 500,
              color: '#101828'
            }}
          >
            Add Platform
          </Button>
        </Form>
      </div>

      <style jsx global>{`
        .modal-backdrop-dark {
          background-color: rgba(52, 64, 84, 0.7) !important;
          backdrop-filter: blur(8px);
        }
        .modal-content {
          border: none !important;
          box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.15);
        }
        .form-label {
          font-weight: 500;
        }
        .form-control:focus {
          border-color: #FFD600;
          box-shadow: 0 0 0 3px rgba(255, 214, 0, 0.25);
        }
        .btn-close:focus {
          box-shadow: none;
        }
      `}</style>
    </Modal>
  );
}
