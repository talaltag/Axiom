
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
    <Modal 
      isOpen={isOpen} 
      toggle={toggle} 
      centered
      style={{
        maxWidth: '380px',
      }}
    >
      <div 
        style={{ 
          padding: '32px',
          backgroundColor: 'white',
          borderRadius: '12px',
          position: 'relative'
        }}
      >
        <button
          onClick={toggle}
          style={{
            position: 'absolute',
            right: '24px',
            top: '24px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '10px',
            fontSize: '16px',
            color: '#667085',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          ✕
        </button>
        <div style={{ textAlign: 'center' }}>
          <h4 style={{ 
            fontSize: '24px', 
            fontWeight: 500, 
            color: '#101828', 
            marginBottom: '8px',
            lineHeight: '32px'
          }}>
            Congratulation
          </h4>
          <p style={{ 
            fontSize: '14px', 
            color: '#667085', 
            marginBottom: '24px',
            lineHeight: '20px',
            maxWidth: '316px',
            margin: '0 auto 24px'
          }}>
            You have successfully registered to this tournament. You will received a confirmation email shortly.
          </p>
        </div>
        <button
          onClick={handleReturnToDashboard}
          style={{
            width: '100%',
            padding: '10px 16px',
            backgroundColor: '#FFD700',
            border: 'none',
            borderRadius: '8px',
            color: '#000000',
            fontWeight: 500,
            fontSize: '14px',
            lineHeight: '20px',
            cursor: 'pointer',
            height: '40px',
          }}
        >
          Return to Dashboard
        </button>
      </div>
    </Modal>
  );
}
