import { useSession } from "next-auth/react";
import { Table } from "reactstrap";
import { useEffect, useState } from "react";
import Loader from "../common/Loader";

const TournamentHistoryTable = () => {
  const session = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [registeredTournaments, setRegisteredTournaments] = useState([]);
  const [activeTab, setActiveTab] = useState("my");

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        setIsLoading(true);
        const url = `/api/tournaments?filter=my&userId=${session?.data.user.id}`;
        const response = await fetch(url);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch tournaments");
        }
        const data = await response.json();
        if (data.success) {
          if (activeTab === "my") {
            setRegisteredTournaments(data.data);
          }
        } else {
          throw new Error(data.message || "An unexpected error occurred");
        }
      } catch (error) {
        console.error("Error fetching tournaments:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (session?.data?.user?.id) {
      fetchTournaments();
    }
  }, [session]);

  if (isLoading)
    return (
      <div className="m-3">
        <Loader />
      </div>
    );
  return (
    <>
      <Table striped borderless style={{ marginBottom: "20px" }}>
        <thead>
          <tr
            style={{
              borderBottom: "1px solid #EAECF0",
            }}
          >
            <th
              style={{
                color: "#667085",
                fontSize: "12px",
                fontWeight: 500,
                padding: "12px 24px",
              }}
            >
              Tournament
            </th>
            <th
              style={{
                color: "#667085",
                fontSize: "12px",
                fontWeight: 500,
                padding: "12px 24px",
              }}
            >
              Placement
            </th>
            <th
              style={{
                color: "#667085",
                fontSize: "12px",
                fontWeight: 500,
                padding: "12px 24px",
              }}
            >
              Rewards
            </th>
            <th
              style={{
                color: "#667085",
                fontSize: "12px",
                fontWeight: 500,
                padding: "12px 24px",
                textAlign: "right",
                paddingRight: "73px",
              }}
            >
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {registeredTournaments.map((item, index) => (
            <tr
              key={index}
              className={`${
                item.status === "Ongoing" ? "bg-light-red" : "bg-white"
              } hover-row`}
              style={{
                borderBottom: "1px solid #EAECF0",
                cursor: "pointer",
              }}
            >
              <td
                style={{
                  color: "#101828",
                  fontSize: "14px",
                  padding: "16px 24px",
                }}
              >
                {item.tournament.name}
              </td>
              <td
                style={{
                  color: "#101828",
                  fontSize: "14px",
                  padding: "16px 24px",
                }}
              >
                {item.tournament.platform}
              </td>
              <td
                style={{
                  color: "#101828",
                  fontSize: "14px",
                  padding: "16px 24px",
                  width: "15%",
                }}
              >
                ${item.tournament.totalPrizePool}
              </td>
              <td style={{ padding: "16px 24px", textAlign: "right" }}>
                <span
                  style={{
                    padding: "2px 8px",
                    borderRadius: "16px",
                    fontSize: "12px",
                    fontWeight: 500,
                    backgroundColor:
                      item.status === "Completed" ? "#ECFDF3" : "#FEF3F2",
                    color: item.status === "Completed" ? "#027A48" : "#B42318",
                  }}
                >
                  {item.tournament.status === "Completed"
                    ? "✓ Completed"
                    : "• Ongoing"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div
        className="d-flex justify-content-between align-items-center"
        style={{ padding: "0 12px 15px 12px" }}
      >
        <div className="d-flex align-items-center gap-1">
          <button
            style={{
              padding: "8px 14px",
              border: "1px solid #D0D5DD",
              borderRadius: "8px",
              background: "none",
              cursor: "pointer",
            }}
          >
            <i
              className="fas fa-chevron-left"
              style={{ fontSize: "12px", color: "#344054" }}
            ></i>
          </button>
          <button
            style={{
              padding: "8px 14px",
              border: "none",
              borderRadius: "8px",
              background: "#FFD600",
              color: "#344054",
              fontWeight: 500,
            }}
          >
            1
          </button>
          {[2, 3, 4, 5].map((num) => (
            <button
              key={num}
              style={{
                padding: "8px 14px",
                border: "1px solid #D0D5DD",
                borderRadius: "8px",
                background: "none",
                color: "#344054",
              }}
            >
              {num}
            </button>
          ))}
          <button
            style={{
              padding: "8px 14px",
              border: "1px solid #D0D5DD",
              borderRadius: "8px",
              background: "none",
              color: "#344054",
            }}
          >
            ...
          </button>
          <button
            style={{
              padding: "8px 14px",
              border: "1px solid #D0D5DD",
              borderRadius: "8px",
              background: "none",
              color: "#344054",
            }}
          >
            12
          </button>
          <button
            style={{
              padding: "8px 14px",
              border: "1px solid #D0D5DD",
              borderRadius: "8px",
              background: "none",
              cursor: "pointer",
            }}
          >
            <i
              className="fas fa-chevron-right"
              style={{ fontSize: "12px", color: "#344054" }}
            ></i>
          </button>
        </div>
        <div style={{ color: "#344054", fontSize: "14px" }}>
          1 - 3 of 10 items
        </div>
      </div>
    </>
  );
};

export default TournamentHistoryTable;
