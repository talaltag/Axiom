import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight } from "react-feather";
import { Badge, Button, Card, CardBody } from "reactstrap";
import { countDownTimer, formatCountDown } from "../../utils/helper";

const TournamentCard = ({
  item,
  isRegister,
}: {
  item: any;
  isRegister?: boolean;
}) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [tournament, setTournament] = useState(item);
  const [closingDurationTime, setClosingDuration] = useState<any>(null);
  const [EndingDurationTime, setEndingDuration] = useState<any>(null);
  const isPaid = useMemo(() => {
    if (!tournament || isRegister) return false;
    return (
      tournament.memberPayments.find((x) => x.userId == session?.user?.id)
        ?.paymentStatus === "completed"
    );
  }, [tournament, isRegister]);
  useEffect(() => {
    let openInterval: NodeJS.Timeout;
    let endInterval: NodeJS.Timeout;

    if (tournament && tournament.status === "Registration Open") {
      openInterval = setInterval(() => {
        const timeStart = countDownTimer(tournament.date, tournament.time);
        setClosingDuration(timeStart);

        if (timeStart?.asSeconds() <= 0) {
          clearInterval(openInterval);
          setTournament((prev) => ({ ...prev, status: "ongoing" }));
        }
      }, 1000);
    }

    if (tournament && tournament.status === "ongoing") {
      endInterval = setInterval(() => {
        const timeEnd = countDownTimer(tournament.date, tournament.end);
        setEndingDuration(timeEnd);

        if (timeEnd?.asSeconds() <= 0) {
          clearInterval(endInterval);
          setTournament((prev) => ({ ...prev, status: "completed" }));
        }
      }, 1000);
    }

    return () => {
      if (openInterval) clearInterval(openInterval);
      if (endInterval) clearInterval(endInterval);
    };
  }, [tournament]);

  return (
    <Card
      className="tournament-card h-100"
      style={{
        borderRadius: "16px",
        overflow: "hidden",
        border: "1px solid #EAECF0",
        backgroundColor: "#FFFFFF",
        boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
      }}
    >
      <div style={{ position: "relative", height: "180px" }}>
        <div
          className={`${
            tournament.status === "completed" ? "bg-success" : "bg-danger"
          }`}
          style={{
            position: "absolute",
            bottom: "12px",
            left: "12px",
            zIndex: 2,
            padding: "4px 12px",
            borderRadius: "16px",
            fontSize: "14px",
            color: "#FFFFFF",
            fontWeight: 500,
          }}
        >
          {tournament.status === "Registration Open" &&
            `Closing in: ${formatCountDown(closingDurationTime)}`}
          {tournament.status === "ongoing" &&
            `Ending in: ${formatCountDown(EndingDurationTime)}`}
          {tournament.status === "completed" && `Completed`}
        </div>

        <Image
          src={tournament?.images?.[0] || "/fortnite-banner.png"}
          alt={tournament?.name || "Tournament"}
          layout="fill"
          objectFit="cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <CardBody className="p-4">
        <h5
          style={{
            fontSize: "18px",
            fontWeight: 600,
            marginBottom: "4px",
            color: "#101828",
          }}
        >
          {tournament.name}
        </h5>
        <div
          style={{
            fontSize: "14px",
            color: "#667085",
            marginBottom: "24px",
          }}
        >
          {tournament.date} • {tournament.time}
          {" - "}
          {tournament.end}
        </div>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <div
              style={{
                fontSize: "14px",
                color: "#344054",
                marginBottom: "4px",
                fontWeight: 500,
              }}
            >
              Prize
            </div>
            <div
              style={{
                fontSize: "20px",
                fontWeight: 600,
                color: "#F04438",
              }}
            >
              ${tournament.totalPrizePool}
            </div>
          </div>
          <div className="text-end">
            <div
              style={{
                fontSize: "14px",
                color: "#344054",
                marginBottom: "4px",
                fontWeight: 500,
              }}
            >
              Entry Cost
            </div>
            <div
              style={{
                fontSize: "20px",
                fontWeight: 600,
                color: "#F04438",
              }}
            >
              ${tournament.entryFee}{" "}
              {!isRegister && (
                <Badge color={isPaid && "success"} style={{ fontSize: "12px" }}>
                  {isPaid ? "Paid" : "Unpaid"}
                </Badge>
              )}
            </div>
          </div>
        </div>
        <Button
          color="link"
          className="text-decoration-none p-0"
          style={{
            fontSize: "16px",
            fontWeight: 600,
            color: "#101828",
            display: "flex",
            alignItems: "center",
          }}
          onClick={() =>
            router.push(
              tournament.status === "Registration Open" && isRegister
                ? `/user/dashboard/register-tournament/${tournament._id}`
                : `/user/dashboard/confirm/${tournament._id}`
            )
          }
        >
          {tournament.status === "Registration Open" && isRegister
            ? "Register Now"
            : "See Details"}{" "}
          <ArrowRight size={20} className="ms-2" />
        </Button>
      </CardBody>
    </Card>
  );
};

export default TournamentCard;
