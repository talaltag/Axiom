"use client";
import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Table,
  Badge,
  Progress,
  Input,
} from "reactstrap";
import UserDashboardLayout from "../../components/layouts/UserDashboardLayout";
import { PieChart, Pie, ResponsiveContainer } from "recharts";
import TournamentHistoryTable from "../../components/tournaments/TournamentHistoryTable";
import { formatHoursMins, monthsCount } from "../../utils/helper";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function Statistics() {
  interface StatsType {
    global_stats?: {
      [key: string]: {
        matchesplayed: number;
        winrate: number;
      };
    };
    result: boolean;
  }

  const [stats, setStats] = useState<StatsType>();
  const [totalTournaments, setTotalTournament] = useState(null);
  const [matchesStats, setMatchesStats] = useState({ played: 0, wins: 0 });
  const [chartStats, setChartStats] = useState({
    played: { ...monthsCount },
    loss: { ...monthsCount },
    win: { ...monthsCount },
  });
  const [timeStats, setTimeStats] = useState({ ...monthsCount });
  const percentage = useMemo(() => {
    const win = ((matchesStats.wins / matchesStats.played) * 100).toFixed(0);
    const loss = (
      ((matchesStats.played - matchesStats.wins) / matchesStats.played) *
      100
    ).toFixed(0);

    return { win: parseInt(win), loss: parseInt(loss) };
  }, [matchesStats]);

  const averageTime = useMemo(() => {
    return Object.values(timeStats)
      .map((value) => value)
      .reduce((acc, curr) => acc + curr, 0);
  }, [timeStats]);

  const totalWinAmount = useMemo(() => {
    if (totalTournaments?.prizes?.length > 0) {
      return totalTournaments?.prizes?.reduce(
        (acc, curr) => acc + parseInt(curr.amount),
        0
      );
    }
    return 0;
  }, [totalTournaments]);

  const totalWinTournaments = useMemo(() => {
    if (totalTournaments?.prizes?.length > 0) {
      return totalTournaments?.prizes?.reduce((acc, curr) => acc + 1, 0);
    }
    return 0;
  }, [totalTournaments]);

  useEffect(() => {
    if (totalTournaments?.chartStats) {
      setChartStats(totalTournaments.chartStats);
    }
  }, [totalTournaments]);

  const barChartData = {
    options: {
      chart: {
        type: "bar",
        height: 300,
        toolbar: { show: false },
        background: "#FAFBFC",
        fontFamily: "Inter, sans-serif",
      },
      grid: {
        show: false,
      },
      plotOptions: {
        bar: {
          columnWidth: 13.87,
          borderRadius: 7,
          colors: {
            backgroundBarColors: ["#E1E1E1"],
            backgroundBarOpacity: 0.5,
            backgroundBarRadius: 7,
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      title: {
        text: "",
      },
      fill: {
        opacity: 1,
      },
      stroke: {
        show: true,
        curve: "straight",
        lineCap: "butt",
        colors: ["#E1E1E1"],
        width: 2,
        dashArray: 0,
      },
      colors: ["#FFD700"],
      xaxis: {
        categories: [
          "JAN",
          "FEB",
          "MAR",
          "APR",
          "MAY",
          "JUN",
          "JUL",
          "AUG",
          "SEP",
          "OCT",
          "NOV",
          "DEC",
        ],
        labels: {
          style: {
            fontSize: "12px",
            fontWeight: 400,
            colors: "#667085",
            fontFamily: "Inter, sans-serif",
          },
        },
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      yaxis: {
        tickAmount: 3,
        labels: {
          formatter: function (value) {
            if (value >= 60) {
              // Calculate hours and remaining minutes
              const hours = Math.floor(value / 60); // Get the full hours
              const minutes = value % 60; // Get the remaining minutes

              // If there are minutes remaining, show both hours and minutes
              if (minutes > 0) {
                return hours + "h " + minutes + "m";
              } else {
                return hours + "h"; // If no remaining minutes, just show hours
              }
            } else {
              // If the value is less than 60, just show minutes
              return value + "m";
            }
          },
        },
      },
    },
    series: [
      {
        name: "Gaming Time",
        data: Object.values(timeStats).map((value) => value),
        zIndex: 2,
      },
    ],
  };

  const totalTournamentsCount = totalTournaments?.count ?? 0;

  const lineChartData = {
    options: {
      chart: {
        type: "line",
        height: 350,
        toolbar: {
          show: false,
        },
        background: "transparent",
        zoom: {
          enabled: false,
        },
      },
      stroke: {
        curve: "smooth",
        width: 2,
      },
      colors: ["#F8CA15", "#FFB547", "#8B4513"],
      grid: {
        borderColor: "#EAECF0",
        strokeDashArray: 4,
        xaxis: {
          lines: {
            show: true,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        labels: {
          style: {
            colors: "#667085",
            fontSize: "12px",
            fontWeight: 400,
          },
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        min: 0,
        max: 100, // Always show from 0 to 100%
        tickAmount: 5,
        labels: {
          style: {
            colors: "#667085",
            fontSize: "12px",
            fontWeight: 400,
          },
          formatter: (value) => `${value}%`,
        },
      },
      legend: {
        show: true,
        position: "top",
        horizontalAlign: "right",
        labels: {
          colors: "#101828",
        },
      },
      dataLabels: {
        enabled: false,
      },
      markers: {
        size: 0,
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.1,
          opacityTo: 0,
          stops: [0, 95.55],
          colorStops: [
            {
              offset: 0,
              color: "#F8CA15",
              opacity: 0.1,
            },
            {
              offset: 95.55,
              color: "#F8CA15",
              opacity: 0,
            },
          ],
        },
      },
      colors: ["#F8CA15", "#12B76A", "#F04438"],
    },
    series: [
      {
        name: "Total Tournaments participated in",
        data: Object.values(chartStats.played).map(
          (value) => (value / totalTournamentsCount) * 100
        ),
      },
      {
        name: "Total Tournament Wins",
        data: Object.values(chartStats.win).map(
          (value) => (value / totalTournamentsCount) * 100
        ), // Percentage of wins
      },
      {
        name: "Total Tournament Losses",
        data: Object.values(chartStats.loss).map(
          (value) => (value / totalTournamentsCount) * 100
        ), // Percentage of losses
      },
    ],
  };

  // UseEffect to calculate totals when the component mounts
  useEffect(() => {
    if (stats?.result) {
      let totalPlayed = 0;
      let totalWins = 0;
      // Iterate through each game mode to calculate the total played and total wins
      Object.keys(stats.global_stats).forEach((key) => {
        const { matchesplayed, winrate } = stats.global_stats[key];
        totalPlayed += matchesplayed;
        totalWins += Math.round(matchesplayed * winrate);
      });
      // Update the state with the calculated totals
      setMatchesStats({ played: totalPlayed, wins: totalWins });
    }
  }, [stats]);

  const fetchTimeStats = async (type?: string) => {
    // setIsLoading(true);
    try {
      const response = await fetch(
        `/api/tournaments/timeStats?type=${type ?? "month"}`
      );
      const data = await response.json();
      setTimeStats(data.data);
    } catch (error) {
      console.error("Error fetching tournaments:", error);
    } finally {
      // setIsLoading(false);
    }
  };

  const fetchStats = async () => {
    // setIsLoading(true);
    try {
      const response = await fetch("/api/platforms/fortnite/connect");
      const data = await response.json();
      if (data.result) {
        setStats(data);
      }
    } catch (error) {
      console.error("Error fetching tournaments:", error);
    } finally {
      // setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    fetchTimeStats();
  }, []);

  return (
    <UserDashboardLayout>
      <Container fluid className="p-4">
        <Row className="mb-4">
          <Col md={6}>
            <Card
              className="border-0"
              style={{
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.05)",
                borderRadius: "12px",
                backgroundColor: "transparent",
              }}
            >
              <CardBody
                className="chart-card-body"
                style={{
                  backgroundColor: "#FAFBFC",
                  borderRadius: "12px",
                  padding: "0",
                }}
              >
                <div style={{ padding: "14px 24px 0 24px" }}>
                  <div
                    className="d-flex justify-content-between align-items-center"
                    style={{
                      borderBottom: "1px solid #EAECF0",
                      paddingBottom: "16px",
                    }}
                  >
                    <div className="d-flex align-items-center gap-2">
                      <h6
                        style={{
                          fontSize: "16px",
                          fontWeight: 500,
                          color: "#101828",
                          margin: 0,
                        }}
                      >
                        Gaming time
                      </h6>
                      <span style={{ color: "#7A798A", marginLeft: "10px" }}>
                        Daily Average
                      </span>
                      <span
                        style={{
                          fontSize: "14px",
                          color: "#12B76A",
                          margin: 0,
                        }}
                      >
                        {formatHoursMins(averageTime)}
                      </span>
                    </div>
                    <Input
                      type="select"
                      className="w-auto"
                      onChange={(e) => fetchTimeStats(e.target.value)}
                    >
                      <option value="month">This Month</option>
                      <option value="last">Last Month</option>
                      <option value="year">This Year</option>
                    </Input>
                  </div>
                </div>
                <Chart
                  options={barChartData.options}
                  series={barChartData.series}
                  type="bar"
                  height={350}
                />
              </CardBody>
            </Card>
          </Col>
          <Col md={6}>
            <Card
              className="border-0"
              style={{
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.05)",
                borderRadius: "12px",
                backgroundColor: "#FAFBFC",
                height: "100%",
              }}
            >
              <CardBody style={{ padding: "32px" }}>
                <div style={{ marginBottom: "50px" }}>
                  <h6
                    style={{
                      fontSize: "16px",
                      fontWeight: 500,
                      color: "#101828",
                      marginBottom: "8px",
                    }}
                  >
                    Winning Percentage
                  </h6>
                  <div style={{ height: "1px", backgroundColor: "#EAECF0" }} />
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <div
                    style={{
                      width: "240px",
                      height: "240px",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={[
                              {
                                name: "Wins",
                                value: percentage.win,
                                fill: "#ffd600",
                              },
                              {
                                name: "Losses",
                                value: percentage.loss,
                                fill: "#8b4513",
                              },
                            ]}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            startAngle={360}
                            endAngle={0}
                            stroke="none"
                          />
                          <Pie
                            data={[
                              {
                                name: "Games",
                                value: 0,
                                fill: "#F8CA15",
                              },
                              {
                                name: "Tournaments",
                                value: 0,
                                fill: "#E1E1E1",
                              },
                            ]}
                            cx="50%"
                            cy="50%"
                            innerRadius={85}
                            outerRadius={105}
                            startAngle={360}
                            endAngle={0}
                            stroke="none"
                          />
                        </PieChart>
                      </ResponsiveContainer>
                      <div
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          textAlign: "center",
                        }}
                      >
                        <div style={{ color: "#667085", fontSize: "14px" }}>
                          Total
                        </div>
                        <div
                          style={{
                            color: "#101828",
                            fontSize: "28px",
                            fontWeight: 600,
                          }}
                        >
                          {percentage.win}%
                        </div>
                      </div>
                    </div>
                  </div>
                  <div style={{ marginLeft: "10px", flex: 1 }}>
                    <Row className="g-4 text-nowrap">
                      <Col xs={6} className="mb-4">
                        <div className="d-flex align-items-center gap-2">
                          <div
                            style={{
                              width: "8px",
                              height: "8px",
                              borderRadius: "50%",
                              backgroundColor: "#FFD600",
                              boxShadow: "0 0 0 2px rgba(255, 214, 0, 0.2)",
                            }}
                          />
                          <div className="d-flex flex-column">
                            <span
                              style={{ color: "#344054", fontSize: "14px" }}
                            >
                              Total Wins
                            </span>
                            <span
                              style={{
                                color: "#101828",
                                fontSize: "16px",
                                fontWeight: "600",
                              }}
                            >
                              {matchesStats.wins.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </Col>
                      <Col xs={6} className="mb-4">
                        <div className="d-flex align-items-center gap-2">
                          <div
                            style={{
                              width: "8px",
                              height: "8px",
                              borderRadius: "50%",
                              backgroundColor: "#8B4513",
                              boxShadow: "0 0 0 2px rgba(139, 69, 19, 0.2)",
                            }}
                          />
                          <div className="d-flex flex-column">
                            <span
                              style={{ color: "#344054", fontSize: "14px" }}
                            >
                              Total Losses
                            </span>
                            <span
                              style={{
                                color: "#101828",
                                fontSize: "16px",
                                fontWeight: "600",
                              }}
                            >
                              {matchesStats.played - matchesStats.wins}
                            </span>
                          </div>
                        </div>
                      </Col>
                      <Col xs={6}>
                        <div className="d-flex align-items-center gap-2">
                          <div
                            style={{
                              width: "8px",
                              height: "8px",
                              borderRadius: "50%",
                              backgroundColor: "#F2F4F7",
                              boxShadow: "0 0 0 2px rgba(242, 244, 247, 0.4)",
                            }}
                          />
                          <div className="d-flex flex-column">
                            <span
                              style={{ color: "#344054", fontSize: "14px" }}
                            >
                              Total Games Played
                            </span>
                            <span
                              style={{
                                color: "#101828",
                                fontSize: "16px",
                                fontWeight: "600",
                              }}
                            >
                              {matchesStats.played.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </Col>
                      <Col xs={6}>
                        <div className="d-flex align-items-center gap-2">
                          <div
                            style={{
                              width: "8px",
                              height: "8px",
                              borderRadius: "50%",
                              backgroundColor: "#E4E7EC",
                              boxShadow: "0 0 0 2px rgba(228, 231, 236, 0.4)",
                            }}
                          />
                          <div className="d-flex flex-column">
                            <span
                              style={{ color: "#344054", fontSize: "14px" }}
                            >
                              Total Tournaments
                            </span>
                            <span
                              style={{
                                color: "#101828",
                                fontSize: "16px",
                                fontWeight: "600",
                              }}
                            >
                              {totalTournaments?.count ?? 0}
                            </span>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={12}>
            <Card className="border-0 shadow-sm">
              <CardBody style={{ padding: "24px" }}>
                <div className="d-flex justify-content-between">
                  <div className="flex-grow-1">
                    <div className="mb-4">
                      <h6
                        style={{
                          fontSize: "16px",
                          fontWeight: 500,
                          color: "#101828",
                          marginBottom: "4px",
                        }}
                      >
                        Tournament Stats
                      </h6>
                      <div
                        style={{ height: "1px", backgroundColor: "#EAECF0" }}
                      />
                    </div>
                    <Chart
                      options={lineChartData.options}
                      series={lineChartData.series}
                      type="area"
                      height={350}
                    />
                  </div>
                  <div
                    className="d-flex flex-column gap-4"
                    style={{ width: "250px", paddingLeft: "24px" }}
                  >
                    <div
                      style={{
                        padding: "6px 12px",
                        borderRadius: "8px",
                        fontSize: "14px",
                        color: "#344054",
                        cursor: "pointer",
                        textAlign: "center",
                      }}
                    >
                      Month{" "}
                      <i
                        className="fas fa-chevron-down"
                        style={{ fontSize: "10px", marginLeft: "6px" }}
                      ></i>
                    </div>
                    <div>
                      <div className="d-flex align-items-center gap-2">
                        <div
                          style={{
                            width: "8px",
                            height: "8px",
                            borderRadius: "50%",
                            backgroundColor: "#FFD600",
                          }}
                        />
                        <div
                          style={{
                            fontSize: "14px",
                            color: "#344054",
                            marginBottom: "8px",
                          }}
                        >
                          Total Tournaments participated in
                        </div>
                      </div>
                      <div
                        style={{
                          fontSize: "32px",
                          fontWeight: 700,
                          color: "#101828",
                          lineHeight: "1.2",
                        }}
                      >
                        {totalTournaments?.count?.toLocaleString() ?? 0}
                      </div>
                    </div>
                    <div>
                      <div className="d-flex align-items-center gap-2">
                        <div
                          style={{
                            width: "8px",
                            height: "8px",
                            borderRadius: "50%",
                            backgroundColor: "#12B76A",
                          }}
                        />
                        <div
                          style={{
                            fontSize: "14px",
                            color: "#344054",
                            marginBottom: "8px",
                          }}
                        >
                          Total Tournament Wins
                        </div>
                      </div>
                      <div
                        style={{
                          fontSize: "32px",
                          fontWeight: 700,
                          color: "#101828",
                          lineHeight: "1.2",
                        }}
                      >
                        {totalWinTournaments}
                      </div>
                    </div>
                    <div>
                      <div className="d-flex align-items-center gap-2">
                        <div
                          style={{
                            width: "8px",
                            height: "8px",
                            borderRadius: "50%",
                            backgroundColor: "#F04438",
                          }}
                        />
                        <div
                          style={{
                            fontSize: "14px",
                            color: "#344054",
                            marginBottom: "8px",
                          }}
                        >
                          Total Tournament Losses
                        </div>
                      </div>
                      <div
                        style={{
                          fontSize: "32px",
                          fontWeight: 700,
                          color: "#101828",
                          lineHeight: "1.2",
                        }}
                      >
                        {(totalTournaments?.count ?? 0) - totalWinTournaments}
                      </div>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col md={4}>
            <Card
              className="border-0 shadow-sm"
              style={{ padding: "24px", borderRadius: "12px" }}
            >
              <CardBody style={{ padding: "0" }}>
                <div>
                  <h6
                    style={{
                      color: "#344054",
                      fontSize: "14px",
                      marginBottom: "8px",
                    }}
                  >
                    Cash Won{" "}
                    <span style={{ color: "#667085", fontSize: "12px" }}>
                      Total Cash
                    </span>
                  </h6>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h3
                        style={{
                          color: "#101828",
                          fontSize: "30px",
                          fontWeight: "600",
                          marginBottom: "8px",
                        }}
                      >
                        ${totalWinAmount.toLocaleString()}
                      </h3>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        {/* <span style={{ color: "#667085", fontSize: "14px" }}>
                          $1000
                        </span>
                        <span style={{ color: "#667085", fontSize: "14px" }}>
                          Last Win
                        </span> */}
                      </div>
                    </div>
                    <div
                      style={{
                        width: "48px",
                        height: "48px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src="/card.png"
                        alt="Cash"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col md={4}>
            <Card
              className="border-0 shadow-sm"
              style={{ padding: "24px", borderRadius: "12px" }}
            >
              <CardBody style={{ padding: "0" }}>
                <div>
                  <h6
                    style={{
                      color: "#344054",
                      fontSize: "14px",
                      marginBottom: "8px",
                    }}
                  >
                    Credits Won{" "}
                    <span style={{ color: "#667085", fontSize: "12px" }}>
                      Total Credits
                    </span>
                  </h6>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h3
                        style={{
                          color: "#101828",
                          fontSize: "30px",
                          fontWeight: "600",
                          marginBottom: "8px",
                        }}
                      >
                        ${totalWinAmount.toLocaleString()}
                      </h3>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        {/* <span style={{ color: "#667085", fontSize: "14px" }}>
                          $1000
                        </span>
                        <span style={{ color: "#667085", fontSize: "14px" }}>
                          Last Win
                        </span> */}
                      </div>
                    </div>
                    <div
                      style={{
                        width: "48px",
                        height: "48px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src="/cash.png"
                        alt="Credits"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col md={4}>
            <Card
              className="border-0 shadow-sm"
              style={{ padding: "24px", borderRadius: "12px" }}
            >
              <CardBody style={{ padding: "0" }}>
                <div>
                  <h6
                    style={{
                      color: "#344054",
                      fontSize: "14px",
                      marginBottom: "8px",
                    }}
                  >
                    Tournaments Played{" "}
                    <span style={{ color: "#667085", fontSize: "12px" }}>
                      Total Tournaments
                    </span>
                  </h6>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h3
                        style={{
                          color: "#101828",
                          fontSize: "30px",
                          fontWeight: "600",
                          marginBottom: "8px",
                        }}
                      >
                        {totalTournaments?.count?.toLocaleString() ?? 0}
                      </h3>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        {/* <span style={{ color: "#667085", fontSize: "14px" }}>
                          4
                        </span>
                        <span style={{ color: "#667085", fontSize: "14px" }}>
                          Last Win
                        </span>
                        <span style={{ color: "#667085", fontSize: "14px" }}>
                          6
                        </span>
                        <span style={{ color: "#667085", fontSize: "14px" }}>
                          Losses
                        </span> */}
                      </div>
                    </div>
                    <div
                      style={{
                        width: "48px",
                        height: "48px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src="/badge.png"
                        alt="Trophy"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col md={12}>
            <h6
              style={{
                fontSize: "18px",
                fontWeight: 500,
                color: "#101828",
                marginBottom: "20px",
              }}
            >
              Tournament History
            </h6>
            <Card
              className="border-0"
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "12px",
                border: "1px solid #EAECF0",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div
                className="table-responsive"
                style={{
                  background: "#FFFFFF",
                  borderRadius: "12px",
                }}
              >
                <TournamentHistoryTable setTournaments={setTotalTournament} />
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </UserDashboardLayout>
  );
}
