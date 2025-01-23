
import React, { useState } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Alert
} from 'reactstrap';

interface DeleteUserModalProps {
  isOpen: boolean;
  toggle: () => void;
  userId: string;
  onSuccess: () => void;
}

export default function DeleteUserModal({ isOpen, toggle, userId, onSuccess }: DeleteUserModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleDelete = async () => {
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.message);

      toggle();
      onSuccess();
    } catch (err) {
      setError(err.message || 'Error deleting user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Delete User</ModalHeader>
      <ModalBody>
        {error && <Alert color="danger">{error}</Alert>}
        <p>Are you sure you want to delete this user? This action cannot be undone.</p>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>Cancel</Button>
        <Button color="danger" onClick={handleDelete} disabled={loading}>
          {loading ? 'Deleting...' : 'Delete'}
        </Button>
      </ModalFooter>
    </Modal>
  );
}
