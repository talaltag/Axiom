
import React, { useState } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Alert
} from 'reactstrap';

interface CreateUserModalProps {
  isOpen: boolean;
  toggle: () => void;
  editUser?: any;
  onSuccess: () => void;
}

export default function CreateUserModal({ isOpen, toggle, editUser, onSuccess }: CreateUserModalProps) {
  const [formData, setFormData] = useState({
    name: editUser?.name || '',
    email: editUser?.email || '',
    password: '',
    cName: editUser?.cName || '',
    role: editUser?.role || 'Basic'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || (!editUser && !formData.password)) {
      setError('Please fill in all required fields');
      return false;
    }
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError('Please enter a valid email address');
      return false;
    }
    if (!editUser && formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError('');

    try {
      const url = editUser ? `/api/users/${editUser._id}` : '/api/users';
      const method = editUser ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.message);

      toggle();
      onSuccess();
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>
        {editUser ? 'Edit User' : 'Create New User'}
      </ModalHeader>
      <Form onSubmit={handleSubmit}>
        <ModalBody>
          {error && <Alert color="danger">{error}</Alert>}
          <FormGroup>
            <Label for="name">Name*</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter name"
            />
          </FormGroup>
          <FormGroup>
            <Label for="email">Email*</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
            />
          </FormGroup>
          {!editUser && (
            <FormGroup>
              <Label for="password">Password*</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
              />
            </FormGroup>
          )}
          <FormGroup>
            <Label for="cName">Username</Label>
            <Input
              id="cName"
              name="cName"
              value={formData.cName}
              onChange={handleChange}
              placeholder="Enter username"
            />
          </FormGroup>
          <FormGroup>
            <Label for="role">Role*</Label>
            <Input
              id="role"
              name="role"
              type="select"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="Basic">Basic</option>
              <option value="Admin">Admin</option>
            </Input>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>Cancel</Button>
          <Button color="primary" type="submit" disabled={loading}>
            {loading ? 'Saving...' : (editUser ? 'Update' : 'Create')}
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
}
