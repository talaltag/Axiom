import React, { useEffect, useRef, useState } from 'react';
import { Button, Card, Container, Row, Col, Nav, Table } from 'react-bootstrap';
import AdminDashboardLayout from '../../components/layouts/AdminDashboardLayout';
import { ArrowLeft, MoreVertical, User, UserCheck } from 'react-feather';

const TournamentOverview: React.FC = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [openMenu, setOpenMenu] = useState<number | null>(null);
    const menuRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                openMenu !== null &&
                menuRefs.current[openMenu] &&
                !menuRefs.current[openMenu]?.contains(event.target as Node)
            ) {
                setOpenMenu(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [openMenu]);


    const handleTabSelect = (eventKey: string | null) => {
        if (eventKey) setActiveTab(eventKey);
    };

    const tabContainerStyle: React.CSSProperties = {
        display: 'flex',
        gap: '10px',
        marginBottom: '20px'
    };

    const tabStyle = (isActive: boolean): React.CSSProperties => ({
        padding: '10px 20px',
        borderRadius: '8px',
        backgroundColor: isActive ? '#FFC107' : 'transparent',
        color: isActive ? 'black' : '#666',
        border: 'none',
        cursor: 'pointer',
        fontWeight: isActive ? '600' : '400',
        transition: 'all 0.3s ease'
    });

    const renderOverviewContent = () => (
        <>
            <Card className="mb-3" style={{
                borderRadius: '10px',
                overflow: 'hidden',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}>
                <Card.Img
                    src="/fortnite-banner.png"
                    alt="Tournament Banner"
                    style={{
                        height: '285px',
                        objectFit: 'cover'
                    }}
                />
            </Card>

            <h5 style={{
                fontWeight: 'bold',
                margin: '10px 0',
                color: '#333'
            }}>
                Rules
            </h5>
            <p style={{
                color: '#666',
                margin: '20px 0'
            }}>
                Call of Duty: Warzone Online Tournament Major League Gaming Corp. ("Major League Gaming" or "MLG" or "Sponsor"), which also encompasses "GameBattles", will conduct online tournaments (each a "Tournament") in accordance with: (i) MLG's Terms of Service and MLG's Privacy Policy; and (ii) these official rules ("Official Rules"), unless otherwise indicated.
            </p>

            <Card
                className="text-center mb-3 border-0 shadow-none"
                style={{
                    padding: '20px',
                    backgroundColor: '#FAFBFC',
                    borderRadius: '10px',
                }}
            >
                <h1 style={{
                    color: '#333',
                    marginBottom: '10px'
                }}>
                    2345
                </h1>
                <p style={{
                    marginBottom: '15px'
                }}>
                    Total Players Registered
                </p>
                <div className="d-flex justify-content-center gap-2">
                    <div
                        style={{
                            backgroundColor: 'rgba(76, 175, 80, 0.1)',
                            padding: '2px 20px',
                            color: '#49C481',
                            borderRadius: '100px',
                        }}
                    >
                        Xbox
                    </div>
                    <div
                        style={{
                            backgroundColor: 'rgba(76, 175, 80, 0.1)',
                            padding: '2px 20px',
                            color: '#49C481',
                            borderRadius: '100px',
                        }}
                    >
                        Warzone
                    </div>
                    <div
                        style={{
                            backgroundColor: 'rgba(76, 175, 80, 0.1)',
                            padding: '2px 20px',
                            color: '#49C481',
                            borderRadius: '100px',
                        }}
                    >
                        Duo
                    </div>
                </div>
                <Row className="mt-5" style={{ color: '#666' }}>
                    <Col>
                        Registration Date<br />
                        <strong>20 May - 25 May 2023</strong>
                    </Col>
                    <Col>
                        Tournament Active Date<br />
                        <strong>31 May 2023</strong>
                    </Col>
                    <Col>
                        Tournament Active Time<br />
                        <strong>1:20 PM - 3:00 PM</strong>
                    </Col>
                </Row>
            </Card>

            <Card
                className="text-start border-0 shadow-none"
                style={{
                    padding: '25px 15px',
                    borderRadius: '10px',
                    backgroundColor: '#FAFBFC',
                }}
            >
                <h5 style={{
                    fontWeight: '600',
                    margin: '10px 0 !important',
                    color: '#333',
                    paddingBottom: '20px'
                }}>
                    Place Payout
                </h5>

                <p style={{
                    margin: '10px 10px 0 0 !important',
                    color: '#333',
                    paddingBottom: '10px',
                    paddingLeft: '20px',
                    paddingRight: '20px',
                    borderBottom: '1px solid #ddd',
                }}>
                    1st Place Payout
                    <span style={{
                        float: 'right',
                        fontWeight: 'bold',
                        color: '#4CAF50',
                        fontSize: '20px'
                    }}>
                        $500
                    </span>
                </p>
                <p style={{
                    margin: '10px 0 !important',
                    color: '#333',
                    paddingBottom: '10px',
                    paddingLeft: '20px',
                    paddingRight: '20px',
                    borderBottom: '1px solid #ddd'
                }}>
                    2nd Place Payout
                    <span style={{
                        float: 'right',
                        fontWeight: 'bold',
                        color: '#4CAF50',
                        fontSize: '20px'
                    }}>
                        $200
                    </span>
                </p>
                <p style={{
                    margin: '10px 0 !important',
                    color: '#333',
                    paddingBottom: '10px',
                    paddingLeft: '20px',
                    paddingRight: '20px',
                    borderBottom: '1px solid #ddd'
                }}>
                    3rd Place Payout
                    <span style={{
                        float: 'right',
                        fontWeight: 'bold',
                        color: '#4CAF50',
                        fontSize: '20px'
                    }}>
                        $100
                    </span>
                </p>
            </Card>
        </>
    );

    const renderParticipantsContent = () => {


        const teams = [
            { id: "141414", teamName: "Avengers Reborn", registeredDate: "12 May 2023" },
            { id: "141414", teamName: "YuMMZ", registeredDate: "12 May 2023" },
            { id: "141414", teamName: "DC champions", registeredDate: "12 May 2023" },
            { id: "141414", teamName: "Bee Hives", registeredDate: "12 May 2023" },
            { id: "141414", teamName: "BARBBZ", registeredDate: "12 May 2023" },
            { id: "141414", teamName: "Swifties", registeredDate: "12 May 2023" },
            { id: "141414", teamName: "Spartan", registeredDate: "12 May 2023" },
            { id: "141414", teamName: "KILL EXPERT", registeredDate: "12 May 2023" },
        ];

        return (
            <Card className="text-start">
                <Table responsive striped hover>
                    <thead>
                        <tr style={{ backgroundColor: "#F5F5F5", color: "#666" }}>
                            <th style={{ paddingLeft: "20px" }}>P-ID</th>
                            <th>Team Name</th>
                            <th>Members</th>
                            <th>Registered Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teams.map((team, index) => (
                            <tr key={index} style={{ verticalAlign: "middle" }}>
                                <td style={{ paddingLeft: "20px" }}>{team.id}</td>
                                <td>{team.teamName}</td>
                                <td>
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        <User size={15} />
                                        <User size={15} />
                                        <span style={{ color: "#666", marginLeft: "5px" }}>+3</span>
                                    </div>
                                </td>
                                <td>{team.registeredDate}</td>
                                <td>
                                    <div style={{ position: "relative" }}>
                                        <Button
                                            variant="link"
                                            style={{ color: "#666", padding: "0", fontSize: "20px" }}
                                            onClick={() => setOpenMenu(openMenu === index ? null : index)}
                                        >
                                            <MoreVertical size={20} />
                                        </Button>
                                        {openMenu === index && (
                                            <div
                                                ref={(el) => (menuRefs.current[index] = el)}
                                                style={{
                                                    position: "absolute",
                                                    top: "-8px",
                                                    right: "145px",
                                                    background: "white",
                                                    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                                                    borderRadius: "8px",
                                                    padding: "10px",
                                                    minWidth: "150px",
                                                    zIndex: 10,
                                                }}
                                            >
                                                <p style={{ margin: "5px 0", cursor: "pointer" }}>Watch Stream</p>
                                                <p style={{ margin: "5px 0", cursor: "pointer" }}>Payout</p>
                                                <p style={{ margin: "5px 0", cursor: "pointer" }}>Adjust Score</p>
                                                <p style={{ margin: "5px 0", cursor: "pointer", color: "red" }}>Disqualify</p>
                                            </div>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Card>
        );
    };

    return (
        <AdminDashboardLayout>
            <Container style={{
                padding: '20px',
                backgroundColor: '#FFFFFF',
            }}>
                <Row className="mb-3">
                    <Col>
                        <h3 style={{
                            fontWeight: 'bold',
                            color: '#333',
                            marginBottom: '15px'
                        }}>
                            COD KILL RACE
                        </h3>
                        <div style={tabContainerStyle}>
                            <button
                                style={tabStyle(activeTab === 'overview')}
                                onClick={() => setActiveTab('overview')}
                            >
                                Overview
                            </button>
                            <button
                                style={tabStyle(activeTab === 'participants')}
                                onClick={() => setActiveTab('participants')}
                            >
                                Participants
                            </button>
                        </div>
                    </Col>
                    <Col className="text-end">
                        <Button
                            variant="light"
                            style={{
                                marginRight: '10px',
                                backgroundColor: '#ECECEC',
                                color: '#333'
                            }}
                        >
                            <ArrowLeft fontSize={12} style={{ marginRight: '5px' }} /> Back
                        </Button>
                        <Button
                            variant="warning"
                            style={{
                                fontWeight: '500',
                                backgroundColor: '#FFC107',
                                color: 'black'
                            }}
                        >
                            Pay Out
                        </Button>
                    </Col>
                </Row>

                {activeTab === 'overview' ? renderOverviewContent() : renderParticipantsContent()}
            </Container>
        </AdminDashboardLayout>
    );
};

export default TournamentOverview;