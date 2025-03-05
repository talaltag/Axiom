
import React from 'react';
import { Button } from 'reactstrap';
import { Plus, Send, ArrowLeft } from 'react-feather';

interface FundsCardProps {
  balance: number;
  accountName?: string;
  accountOwner?: string;
  accountNumber?: string;
  creditAmount?: number;
  debitAmount?: number;
  onAddClick?: () => void;
  onSendClick?: () => void;
  onRequestClick?: () => void;
}

const FundsCard: React.FC<FundsCardProps> = ({
  balance = 0,
  accountName = "Main Account",
  accountOwner = "John Doe",
  accountNumber = "1234 1123 3456 0012",
  creditAmount = 3450,
  debitAmount = 3450,
  onAddClick,
  onSendClick,
  onRequestClick
}) => {
  // Format the balance with commas
  const formattedBalance = balance.toLocaleString('en-US');
  
  return (
    <div style={{
      borderRadius: '8px',
      boxShadow: '0px 1px 3px rgba(16, 24, 40, 0.1)',
      padding: '24px',
      backgroundColor: '#fff'
    }}>
      <div className="text-center mb-3">
        <h2 style={{ 
          fontSize: '32px', 
          fontWeight: 600, 
          marginBottom: '4px',
          color: '#101828'
        }}>
          ${formattedBalance}
        </h2>
        <p style={{ 
          color: '#667085', 
          fontSize: '14px',
          margin: 0
        }}>
          Available Funds
        </p>
      </div>
      
      <div style={{ 
        backgroundColor: '#F9FAFB', 
        borderRadius: '8px',
        padding: '16px',
        marginBottom: '24px'
      }}>
        <div style={{ marginBottom: '8px' }}>
          <h5 style={{ 
            fontSize: '16px', 
            fontWeight: 500,
            color: '#101828',
            marginBottom: '4px'
          }}>
            {accountName}
          </h5>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ 
              fontSize: '14px',
              color: '#344054'
            }}>
              {accountOwner}
            </span>
            <span style={{ 
              fontSize: '12px',
              color: '#667085',
              letterSpacing: '0.5px'
            }}>
              {accountNumber.split(' ').map((group, i) => (
                <span key={i} style={{ marginRight: '8px' }}>{group}</span>
              ))}
            </span>
          </div>
        </div>
        
        <div style={{ 
          display: 'flex',
          justifyContent: 'flex-start',
          gap: '20px',
          marginTop: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              backgroundColor: '#ECFDF3',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '8px'
            }}>
              <span style={{ color: '#12B76A', fontSize: '16px' }}>+</span>
            </div>
            <div>
              <div style={{ fontSize: '12px', color: '#344054' }}>Credit</div>
              <div style={{ fontWeight: 500, color: '#101828' }}>$ {(creditAmount/1000).toFixed(3)}</div>
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              backgroundColor: '#FEF3F2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '8px'
            }}>
              <span style={{ color: '#F04438', fontSize: '16px' }}>-</span>
            </div>
            <div>
              <div style={{ fontSize: '12px', color: '#344054' }}>Debit</div>
              <div style={{ fontWeight: 500, color: '#101828' }}>$ {(debitAmount/1000).toFixed(3)}</div>
            </div>
          </div>
        </div>
      </div>
      
      <div style={{ 
        display: 'flex',
        justifyContent: 'space-between',
        gap: '12px'
      }}>
        <Button
          onClick={onAddClick}
          style={{
            backgroundColor: '#FBBF24',
            border: 'none',
            color: '#101828',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '10px 16px',
            flex: 1
          }}
        >
          <Plus size={16} />
          Add
        </Button>
        
        <Button
          onClick={onSendClick}
          style={{
            backgroundColor: '#FBBF24',
            border: 'none',
            color: '#101828',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '10px 16px',
            flex: 1
          }}
        >
          <Send size={16} />
          Send
        </Button>
        
        <Button
          onClick={onRequestClick}
          style={{
            backgroundColor: '#FBBF24',
            border: 'none',
            color: '#101828',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '10px 16px',
            flex: 1
          }}
        >
          <ArrowLeft size={16} />
          Request
        </Button>
      </div>
    </div>
  );
};

export default FundsCard;
