
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

interface TournamentRegistrationModalProps {
  isOpen: boolean;
  toggle: () => void;
  tournament: any;
}

export default function TournamentRegistrationModal({
  isOpen,
  toggle,
  tournament
}: TournamentRegistrationModalProps) {
  const [teamName, setTeamName] = useState('');
  const [teammates, setTeammates] = useState(['', '', '']);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamName) {
      setError('Team name is required');
      return;
    }
    if (!agreed) {
      setError('You must agree to the terms and conditions');
      return;
    }

    try {
      // Here you would implement the registration logic
      console.log('Registering team:', { teamName, teammates, tournamentId: tournament._id });
      toggle();
    } catch (err) {
      setError('Failed to register for tournament');
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle}>
        Register for {tournament?.name}
      </ModalHeader>
      <ModalBody>
        {error && <Alert color="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="teamName">Team Name</Label>
            <Input
              id="teamName"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="Enter team name"
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label>Invite Teammates</Label>
            {teammates.map((teammate, index) => (
              <Input
                key={index}
                className="mb-2"
                value={teammate}
                onChange={(e) => {
                  const newTeammates = [...teammates];
                  newTeammates[index] = e.target.value;
                  setTeammates(newTeammates);
                }}
                placeholder={`Teammate ${index + 1} email`}
              />
            ))}
          </FormGroup>

          <div className="border p-3 mb-3 rounded">
            <h6>Tournament Details</h6>
            <div className="mb-2">Entry Fee: ${tournament?.entryFee}</div>
            <div className="mb-2">Prize Pool: ${tournament?.totalPrizePool}</div>
            <div>Game Mode: {tournament?.gameMode}</div>
          </div>

          <FormGroup check>
            <Label check>
              <Input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
              />
              I agree to the tournament rules and terms
            </Label>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>Cancel</Button>
        <Button color="warning" onClick={handleSubmit}>Register</Button>
      </ModalFooter>
    </Modal>
  );
}
