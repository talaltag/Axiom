import React, { useEffect, useMemo, useState } from "react";
import AdminDashboardLayout from "../../../components/layouts/AdminDashboardLayout";
import { Button } from "reactstrap";
import { ArrowLeft } from "react-feather";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Loader from "../../../components/common/Loader";

export default function PayoutDetailPage() {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const router = useRouter();

  const tournamentsMembers = useMemo(() => {
    return tournaments
      .flatMap((t) => t.stats)
      .sort((b, a) => a?.userId?.prize?.amount - b?.userId?.prize?.amount);
  }, [tournaments]);

  const singleTournament = useMemo(() => {
    if (tournaments.length) return tournaments[0]?.tournament;
    else return null;
  }, [tournaments]);

  const teams = useMemo(() => {
    if (tournaments?.length) {
      return tournaments
        .sort((a, b) => a.ranking - b.ranking)
        .map((t) => t.team);
    } else {
      return [];
    }
  }, [tournaments]);

  const totalPayouts = useMemo(() => {
    if (tournamentsMembers.length) {
      return tournamentsMembers.reduce(
        (acc, curr) => acc + parseInt(curr.userId?.prize?.amount ?? 0),
        0
      );
    } else {
      return 0;
    }
  }, [tournamentsMembers]);

  const { id } = router.query;

  const fetchTournaments = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/admin/tournament-win-history/${id}`);
      const data = await response.json();
      setTournaments(data.data);
    } catch (error) {
      console.error("Error fetching tournaments:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (id) fetchTournaments();
  }, [id]);

  return (
    <AdminDashboardLayout>
      {!loading ? (
        <>
          <div className="p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4 className="m-0">{singleTournament?.name}</h4>
              <Link href="/admin/payouts" className="text-decoration-none">
                <Button
                  outline
                  style={{
                    borderColor: "#E4E7EC",
                    color: "#344054",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "8px 16px",
                    backgroundColor: "#fff",
                    boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
                  }}
                >
                  <ArrowLeft size={16} />
                  Back
                </Button>
              </Link>
            </div>

            {/* Tournament Image Banner */}
            <div
              className="position-relative mb-4"
              style={{
                width: "100%",
                height: "200px",
                borderRadius: "8px",
                overflow: "hidden",
                border: "1px solid #0096FF",
              }}
            >
              <Image
                src={singleTournament?.images?.[0] || "/fortnite-banner.png"}
                alt="Tournament Banner"
                layout="fill"
                objectFit="cover"
              />
            </div>

            <h5 className="mb-4">Tournament Won</h5>

            <div className="d-flex gap-4 mb-4">
              {/* First Card - Tournament Info */}
              <div
                style={{
                  borderRadius: "8px",
                  border: "1px solid #EAECF0",
                  padding: "24px",
                  flex: 1,
                  backgroundColor: "#fff",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ marginBottom: "8px" }}>
                    <h5
                      className="mb-1"
                      style={{ fontSize: "18px", fontWeight: "600" }}
                    >
                      {singleTournament?.name}
                    </h5>
                    <p style={{ color: "#667085", margin: 0 }}>
                      {" "}
                      {singleTournament?.date} {singleTournament?.time}
                      {"-"}
                      {singleTournament?.end}
                    </p>
                  </div>

                  <div className="mt-3">
                    <span
                      className="mb-3 d-block"
                      style={{ marginRight: "12px", color: "#344054" }}
                    >
                      Winning Teams
                    </span>
                    <div>
                      {teams.map((t) => (
                        <div
                          className="d-flex align-items-center mb-2"
                          key={t._id}
                        >
                          <div
                            className="position-relative"
                            style={{
                              width: "24px",
                              height: "24px",
                              borderRadius: "50%",
                              overflow: "hidden",
                              marginRight: "8px",
                            }}
                          >
                            <Image
                              src="/profile-avatar.png"
                              alt="Team Logo"
                              layout="fill"
                              objectFit="cover"
                            />
                          </div>
                          <span style={{ fontWeight: "500" }}>{t.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    backgroundColor: "#FFD600",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    src="/admin/crown.svg"
                    alt="Crown"
                    width={24}
                    height={24}
                  />
                </div>
              </div>

              {/* Second Card - Total Payouts */}
              <div
                style={{
                  borderRadius: "8px",
                  border: "1px solid #EAECF0",
                  padding: "24px",
                  flex: 1,
                  backgroundColor: "#fff",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div
                  className="d-flex align-items-center"
                  style={{ marginBottom: "16px" }}
                >
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      marginRight: "12px",
                    }}
                  >
                    <Image
                      src="/admin/medal.svg"
                      alt="Medal"
                      width={48}
                      height={48}
                    />
                  </div>
                  <h5 style={{ fontSize: "18px", margin: 0 }}>Total Payouts</h5>
                </div>

                <div>
                  <p
                    style={{
                      fontSize: "24px",
                      fontWeight: "600",
                      margin: "0 0 16px 0",
                    }}
                  >
                    ${totalPayouts.toLocaleString()}
                  </p>

                  <Button
                    style={{
                      backgroundColor: "#FFD600",
                      border: "none",
                      color: "#101828",
                      fontWeight: "500",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      padding: "8px 16px",
                      borderRadius: "8px",
                      width: "100%",
                    }}
                  >
                    Send to all
                    <Image
                      src="/admin/arrow-right.svg"
                      alt="Send"
                      width={16}
                      height={16}
                    />
                  </Button>
                </div>
              </div>
            </div>

            {/* Players Table */}
            <div
              style={{
                borderRadius: "8px",
                border: "1px solid #EAECF0",
                backgroundColor: "#fff",
                overflow: "hidden",
              }}
            >
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr
                    style={{
                      backgroundColor: "#F9FAFB",
                      borderBottom: "1px solid #EAECF0",
                    }}
                  >
                    <th
                      style={{
                        padding: "12px 24px",
                        textAlign: "left",
                        fontWeight: "500",
                        fontSize: "14px",
                        color: "#667085",
                      }}
                    >
                      Member
                    </th>
                    <th
                      style={{
                        padding: "12px 24px",
                        textAlign: "left",
                        fontWeight: "500",
                        fontSize: "14px",
                        color: "#667085",
                      }}
                    >
                      KD
                    </th>
                    <th
                      style={{
                        padding: "12px 24px",
                        textAlign: "left",
                        fontWeight: "500",
                        fontSize: "14px",
                        color: "#667085",
                      }}
                    >
                      Kills
                    </th>
                    <th
                      style={{
                        padding: "12px 24px",
                        textAlign: "left",
                        fontWeight: "500",
                        fontSize: "14px",
                        color: "#667085",
                      }}
                    >
                      Payouts
                    </th>
                    <th
                      style={{
                        padding: "12px 24px",
                        textAlign: "center",
                        fontWeight: "500",
                        fontSize: "14px",
                        color: "#667085",
                      }}
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tournamentsMembers.map((player) => (
                    <tr
                      key={player.userId._id}
                      style={{ borderBottom: "1px solid #EAECF0" }}
                    >
                      <td
                        style={{
                          padding: "16px 24px",
                          color: "#101828",
                          fontWeight: "500",
                        }}
                      >
                        {player.userId.name}
                      </td>
                      <td style={{ padding: "16px 24px", color: "#101828" }}>
                        {player.kd}
                      </td>
                      <td style={{ padding: "16px 24px", color: "#101828" }}>
                        {player.kills}
                      </td>
                      <td
                        style={{
                          padding: "16px 24px",
                          color: "#101828",
                          fontWeight: "500",
                        }}
                      >
                        ${(player.userId?.prize?.amount ?? 0).toLocaleString()}
                      </td>
                      <td style={{ padding: "16px 24px", textAlign: "center" }}>
                        <Button
                          style={{
                            backgroundColor: "#FFD600",
                            border: "none",
                            color: "#101828",
                            fontWeight: "500",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "8px",
                            padding: "8px 16px",
                            borderRadius: "8px",
                            margin: "0 auto",
                          }}
                        >
                          Send
                          <Image
                            src="/admin/arrow-right.svg"
                            alt="Send"
                            width={16}
                            height={16}
                          />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <div className="p-4">
          <Loader fullscreen />
        </div>
      )}
    </AdminDashboardLayout>
  );
}
