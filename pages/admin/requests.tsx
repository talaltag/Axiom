import React, { useEffect, useState } from "react";
import AdminDashboardLayout from "../../components/layouts/AdminDashboardLayout";
import { Row, Col, Card, CardBody, Button } from "reactstrap";
import Image from "next/image";
import { Check, X } from "react-feather";
import { useRouter } from "next/router";
import PaginationComponent from "../../components/common/PaginationComponent";
import Loader from "../../components/common/Loader";
import moment from "moment";

export default function Requests() {
    const router = useRouter();
    const [requests, setRequests] = useState(null);
    const [loading, setIsLoading] = useState(false);
    const fetchRequests = async (page?: string) => {
        setIsLoading(true);
        try {
            const response = await fetch(
                `/api/admin/withdrawRequest?page=${page}`
            );
            const data = await response.json();
            setRequests(data);
        } catch (error) {
            console.error("Error fetching requests:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const onPageChange = (pageNumber) => {
        const query = `${pageNumber}`;
        fetchRequests(query);
    };

    const handleAction = async (id, status) => {
        try {
            const response = await fetch(`/api/admin/EvaluateRequest/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ requestStatus: status }),
            });
            fetchRequests()
            const result = await response.json();
            if (result.success) {
                alert(`Request ${status} successfully!`);

            } else {
                alert(result.message || "An error occurred");
            }
        } catch (error) {
            console.error("Action failed:", error);
            alert("Failed to update request status");
        }
    };

    return (
        <AdminDashboardLayout>
            <div className="p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h3 className="mb-0">Withdrawal Requests</h3>
                </div>

                <Card className="border-0 shadow-sm">
                    <CardBody>
                        {loading ? (
                            <Loader />
                        ) : (
                            <div className="table-responsive">
                                <div style={{ borderRadius: "8px", overflow: "hidden" }}>
                                    <table
                                        className="table table-striped"
                                        style={{ width: "100%", borderCollapse: "collapse" }}
                                    >
                                        <thead>
                                            <tr
                                                style={{ backgroundColor: "#F9FAFB", height: "40px" }}
                                            >
                                                <th
                                                    style={{
                                                        padding: "10px 16px",
                                                        fontSize: "14px",
                                                        fontWeight: "500",
                                                        color: "#667085",
                                                        textAlign: "left",
                                                        borderBottom: "1px solid #EAECF0",
                                                    }}
                                                >
                                                    Amount
                                                </th>
                                                <th
                                                    style={{
                                                        padding: "10px 16px",
                                                        fontSize: "14px",
                                                        fontWeight: "500",
                                                        color: "#667085",
                                                        textAlign: "left",
                                                        borderBottom: "1px solid #EAECF0",
                                                    }}
                                                >
                                                    Requested By
                                                </th>
                                                <th
                                                    style={{
                                                        padding: "10px 16px",
                                                        fontSize: "14px",
                                                        fontWeight: "500",
                                                        color: "#667085",
                                                        textAlign: "left",
                                                        borderBottom: "1px solid #EAECF0",
                                                    }}
                                                >
                                                    Request Status
                                                </th>
                                                <th
                                                    style={{
                                                        padding: "10px 16px",
                                                        fontSize: "14px",
                                                        fontWeight: "500",
                                                        color: "#667085",
                                                        textAlign: "left",
                                                        borderBottom: "1px solid #EAECF0",
                                                    }}
                                                >
                                                    Date
                                                </th>
                                                <th
                                                    style={{
                                                        padding: "10px 16px",
                                                        fontSize: "14px",
                                                        fontWeight: "500",
                                                        color: "#667085",
                                                        textAlign: "left",
                                                        borderBottom: "1px solid #EAECF0",
                                                    }}
                                                >
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {requests?.data?.map((item, index) => (
                                                <tr
                                                    key={index}
                                                    style={{
                                                        backgroundColor:
                                                            index % 2 === 0 ? "#FFFFFF" : "#F9FAFB",
                                                        height: "48px",
                                                    }}
                                                >
                                                    <td
                                                        style={{
                                                            padding: "10px 16px",
                                                            fontSize: "14px",
                                                            color: "#101828",
                                                            borderBottom: "1px solid #EAECF0",
                                                        }}
                                                    >
                                                        {item.amount}
                                                    </td>
                                                    <td
                                                        className="text-transform-capitalize"
                                                        style={{
                                                            padding: "10px 16px",
                                                            fontSize: "14px",
                                                            color: "#101828",
                                                            borderBottom: "1px solid #EAECF0",
                                                        }}
                                                    >
                                                        {item.userId.name}
                                                    </td>
                                                    <td
                                                        style={{
                                                            padding: "10px 16px",
                                                            fontSize: "14px",
                                                            color: item.requestStatus === "accepted"
                                                                ? "#16A34A"
                                                                : item.requestStatus === "rejected"
                                                                    ? "#DC2626"
                                                                    : "#F59E0B",
                                                            borderBottom: "1px solid #EAECF0",
                                                            fontWeight: "bold",
                                                        }}
                                                    >
                                                        {item.requestStatus?.charAt(0)?.toUpperCase() + item.requestStatus?.slice(1)}
                                                    </td>
                                                    <td
                                                        style={{
                                                            padding: "10px 16px",
                                                            fontSize: "14px",
                                                            color: "#101828",
                                                            borderBottom: "1px solid #EAECF0",
                                                        }}
                                                    >
                                                        {moment(item.createdAt).format('MM-DD-YYYY')}
                                                    </td>

                                                    <td
                                                        style={{
                                                            padding: "10px 16px",
                                                            fontSize: "14px",
                                                            color: "#101828",
                                                            borderBottom: "1px solid #EAECF0",
                                                        }}
                                                    >
                                                        {
                                                            item.requestStatus === "pending" &&
                                                            <>
                                                                <Button
                                                                    variant="success"
                                                                    size="sm"
                                                                    onClick={() => handleAction(item._id, "accepted")}
                                                                    style={{
                                                                        marginLeft: "8px",
                                                                        borderRadius: "8px",
                                                                        padding: "6px",
                                                                        backgroundColor: "#28a745",
                                                                        color: "white",
                                                                    }}
                                                                >
                                                                    <Check />
                                                                </Button>

                                                                <Button
                                                                    variant="danger"
                                                                    size="sm"
                                                                    onClick={() => handleAction(item._id, "rejected")}
                                                                    style={{
                                                                        marginLeft: "8px",
                                                                        borderRadius: "8px",
                                                                        padding: "6px",
                                                                        backgroundColor: "#dc3545",
                                                                        color: "white",
                                                                    }}
                                                                >
                                                                    <X />
                                                                </Button>
                                                            </>
                                                        }
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {requests?.pagination &&
                            requests?.pagination?.totalPages > 1 && (
                                <div className="d-flex justify-content-between align-items-center mt-4">
                                    <PaginationComponent
                                        pagination={requests?.pagination}
                                        onPageChange={onPageChange}
                                    />
                                </div>
                            )}
                    </CardBody>
                </Card>
            </div>
        </AdminDashboardLayout>
    );
}
