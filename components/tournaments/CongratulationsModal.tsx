
import { Modal } from 'reactstrap';
import { useRouter } from 'next/router';

interface CongratulationsModalProps {
  isOpen: boolean;
  toggle: () => void;
}

export default function CongratulationsModal({ isOpen, toggle }: CongratulationsModalProps) {
  const router = useRouter();

  const handleReturnToDashboard = () => {
    router.push('/user/dashboard');
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} centered>
      <div style={{ padding: '32px', textAlign: 'center' }}>
        <div style={{ marginBottom: '8px' }}>
          <h4 style={{ fontSize: '24px', fontWeight: 500, color: '#101828', marginBottom: '12px' }}>
            Congratulation
          </h4>
          <p style={{ fontSize: '14px', color: '#667085', marginBottom: '24px' }}>
            You have successfully registered to this tournament. You will received a confirmation email shortly.
          </p>
        </div>
        <button
          onClick={handleReturnToDashboard}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#FFD700',
            border: 'none',
            borderRadius: '8px',
            color: '#000',
            fontWeight: 500,
            cursor: 'pointer'
          }}
        >
          Return to Dashboard
        </button>
      </div>
    </Modal>
  );
}
