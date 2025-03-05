
import React from "react";
import AdminDashboardLayout from "../../components/layouts/AdminDashboardLayout";
import { Container, Row, Col } from "reactstrap";
import FundsCard from "../../components/common/FundsCard";

export default function Balance() {
  return (
    <AdminDashboardLayout>
      <Container fluid className="p-4">
        <div className="mb-4">
          <h3 className="mb-1">Account Balance</h3>
          <p style={{ color: "#667085" }}>
            Manage your funds and transaction history
          </p>
        </div>
        
        <Row>
          <Col md={4}>
            <FundsCard 
              availableFunds={68790}
              accountName="Main Account"
              accountHolder="John Doe"
              accountNumber="123411233456012"
              creditAmount={3450}
              debitAmount={3450}
              onAdd={() => console.log("Add funds")}
              onSend={() => console.log("Send funds")}
              onRequest={() => console.log("Request funds")}
            />
          </Col>
          
          <Col md={8}>
            {/* Transaction history or other components can go here */}
          </Col>
        </Row>
      </Container>
    </AdminDashboardLayout>
  );
}
