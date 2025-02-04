
import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Button } from 'reactstrap';

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
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>
        Platform Management
      </ModalHeader>
      <Form onSubmit={handleSubmit}>
        <ModalBody>
          <FormGroup>
            <Label for="platformId">Platform ID</Label>
            <Input
              id="platformId"
              placeholder="Platform ID"
              value={platformData.platformId}
              onChange={(e) => setPlatformData({ ...platformData, platformId: e.target.value })}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="platform">Platform</Label>
            <Input
              id="platform"
              placeholder="Platform"
              value={platformData.platform}
              onChange={(e) => setPlatformData({ ...platformData, platform: e.target.value })}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="username">Username</Label>
            <Input
              id="username"
              placeholder="Username"
              value={platformData.username}
              onChange={(e) => setPlatformData({ ...platformData, username: e.target.value })}
              required
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button
            color="warning"
            type="submit"
            style={{
              backgroundColor: '#FFD600',
              border: 'none',
              width: '100%',
              borderRadius: '8px',
            }}
          >
            Add Platform
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
}
