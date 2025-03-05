
import React from 'react';
import { Card, CardBody, Button } from 'reactstrap';
import { ArrowUp, ArrowDown, Plus, Send, ArrowLeft } from 'react-feather';

interface FundsCardProps {
  availableFunds: number;
  accountName: string;
  accountHolder: string;
  accountNumber: string;
  creditAmount: number;
  debitAmount: number;
  onAdd?: () => void;
  onSend?: () => void;
  onRequest?: () => void;
}

const FundsCard: React.FC<FundsCardProps> = ({
  availableFunds,
  accountName,
  accountHolder,
  accountNumber,
  creditAmount,
  debitAmount,
  onAdd,
  onSend,
  onRequest
}) => {
  return (
    <Card className="border-0 shadow-sm" style={{ borderRadius: '12px' }}>
      <CardBody className="p-4">
        <div className="text-center mb-3">
          <h2 style={{ fontSize: '28px', fontWeight: 600, marginBottom: '4px' }}>
            ${availableFunds.toLocaleString()}
          </h2>
          <p style={{ color: '#667085', fontSize: '14px', margin: 0 }}>
            Available Funds
          </p>
        </div>

        <div style={{ 
          background: '#F9FAFB', 
          borderRadius: '8px', 
          padding: '16px',
          marginBottom: '20px'
        }}>
          <div style={{ marginBottom: '8px' }}>
            <h6 style={{ 
              fontSize: '16px', 
              fontWeight: 600, 
              marginBottom: '4px',
              color: '#101828'
            }}>
              {accountName}
            </h6>
            <p style={{ 
              fontSize: '14px', 
              margin: 0,
              color: '#344054'
            }}>
              {accountHolder}
            </p>
            <p style={{ 
              fontSize: '12px', 
              color: '#667085', 
              margin: 0 
            }}>
              {accountNumber.match(/.{1,4}/g)?.join(' ') || accountNumber}
            </p>
          </div>

          <div className="d-flex justify-content-start align-items-center mt-3">
            <div className="d-flex align-items-center me-4">
              <div style={{ 
                width: '28px', 
                height: '28px', 
                borderRadius: '50%', 
                background: '#ECFDF3',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '8px'
              }}>
                <ArrowUp size={16} color="#12B76A" />
              </div>
              <div>
                <p style={{ fontSize: '12px', color: '#344054', margin: 0 }}>Credit</p>
                <p style={{ fontSize: '14px', fontWeight: 600, margin: 0 }}>$ {creditAmount.toLocaleString()}</p>
              </div>
            </div>
            
            <div className="d-flex align-items-center">
              <div style={{ 
                width: '28px', 
                height: '28px', 
                borderRadius: '50%', 
                background: '#FFF4ED',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '8px'
              }}>
                <ArrowDown size={16} color="#F79009" />
              </div>
              <div>
                <p style={{ fontSize: '12px', color: '#344054', margin: 0 }}>Debit</p>
                <p style={{ fontSize: '14px', fontWeight: 600, margin: 0 }}>$ {debitAmount.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-between mt-3">
          <Button
            onClick={onAdd}
            style={{
              backgroundColor: '#FFD600',
              border: 'none',
              borderRadius: '8px',
              color: '#101828',
              padding: '8px 16px',
              fontWeight: 500,
              width: '30%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <Plus size={16} />
            Add
          </Button>
          
          <Button
            onClick={onSend}
            style={{
              backgroundColor: '#FFD600',
              border: 'none',
              borderRadius: '8px',
              color: '#101828',
              padding: '8px 16px',
              fontWeight: 500,
              width: '30%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <Send size={16} />
            Send
          </Button>
          
          <Button
            onClick={onRequest}
            style={{
              backgroundColor: '#FFD600',
              border: 'none',
              borderRadius: '8px',
              color: '#101828',
              padding: '8px 16px',
              fontWeight: 500,
              width: '30%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <ArrowLeft size={16} />
            Request
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default FundsCard;
