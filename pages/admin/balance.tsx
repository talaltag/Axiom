
import React from "react";
import AdminDashboardLayout from "../../components/layouts/AdminDashboardLayout";
import { Row, Col, Card, CardBody } from "reactstrap";
import FundsCard from "../../components/common/FundsCard";

export default function AdminBalance() {
  const handleAddFunds = () => {
    console.log("Add funds clicked");
    // Add your logic here
  };

  const handleSendFunds = () => {
    console.log("Send funds clicked");
    // Add your logic here
  };

  const handleRequestFunds = () => {
    console.log("Request funds clicked");
    // Add your logic here
  };

  return (
    <AdminDashboardLayout>
      <div className="p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="mb-0">Balance Management</h3>
        </div>

        <Row>
          <Col md={8}>
            <Card className="border-0 shadow-sm mb-4">
              <CardBody className="p-4">
                <h5 className="mb-4">Transaction History</h5>
                {/* Transaction history table will go here */}
              </CardBody>
            </Card>
          </Col>
          <Col md={4}>
            <FundsCard 
              balance={68790}
              accountName="Main Account"
              accountOwner="John Doe"
              accountNumber="1234 1123 3456 0012"
              creditAmount={3450}
              debitAmount={3450}
              onAddClick={handleAddFunds}
              onSendClick={handleSendFunds}
              onRequestClick={handleRequestFunds}
            />
          </Col>
        </Row>
      </div>
    </AdminDashboardLayout>
  );
}
