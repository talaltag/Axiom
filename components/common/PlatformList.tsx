import React, { useEffect } from "react";
import Image from "next/image";
import { Button } from "reactstrap";
import FortniteModal from "./FortniteModal";
import { Edit2 } from "react-feather";

interface Platform {
  id: string;
  name: string;
  icon: string;
  type?: string;
}

const platforms: Platform[] = [
  // { id: "dota", name: "Dota", icon: "/user1.png" },
  // { id: "freefire", name: "Freefire", icon: "/user1.png" },
  // { id: "pubg", name: "PUBG", icon: "/user1.png" },
  // { id: "counterstrike", name: "Counterstrike", icon: "/user1.png" },
  { id: "fortnite", name: "Fortnite", icon: "/fortnite-logo.webp" },
  // { id: "darksouls", name: "Dark Souls", icon: "/user1.png" },
  // { id: "gta", name: "GTA", icon: "/user1.png" },
  // { id: "lol", name: "League of Legends", icon: "/user1.png" },
  // { id: "valorant", name: "Valorant", icon: "/user1.png" },
];

const PlatformList: React.FC = () => {
  const [addedPlatforms, setAddedPlatforms] = React.useState<Platform>(null);
  const [isEdit, setIsEdit] = React.useState<string>("");

  const [fortniteModalOpen, setFortniteModalOpen] =
    React.useState<boolean>(false);

  const handlePlatformClick = (platformId: string) => {
    if (platformId === "fortnite") {
      setFortniteModalOpen(true);
    }
  };

  const fetchPlatforms = async () => {
    // setIsLoading(true);
    try {
      const response = await fetch(
        "/api/platforms/fortnite/connect?stats=false"
      );
      const data = await response.json();
      if (data.success) {
        setAddedPlatforms({
          id: data.data._id,
          name: data.data.username,
          icon: platforms[0].icon,
          type: data.platformType,
        });
      }
    } catch (error) {
      console.error("Error fetching tournaments:", error);
    } finally {
      // setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPlatforms();
  }, []);

  return (
    <div>
      <div
        className="d-flex flex-wrap gap-3 mb-5"
        style={{ margin: "-8px", padding: "24px", backgroundColor: "#FAFBFC" }}
      >
        {platforms.map((platform) => (
          <div
            key={platform.id}
            className="d-flex flex-column align-items-center"
            onClick={() => handlePlatformClick(platform.id)}
            style={{
              width: "100px",
              padding: "8px",
              cursor: "pointer",
              backgroundColor: "#F9FAFB",
              borderRadius: "8px",
            }}
          >
            <div
              style={{
                width: "72px",
                height: "72px",
                borderRadius: "50%",
                overflow: "hidden",
                position: "relative",
                border: "2px solid #EAECF0",
                backgroundColor: "#F9FAFB",
              }}
            >
              <Image
                src={platform.icon}
                alt={platform.name}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <span
              style={{
                fontSize: "14px",
                color: "#344054",
                textAlign: "center",
                marginTop: "8px",
                fontWeight: "500",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                width: "100%",
              }}
            >
              {platform.name}
            </span>
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h6
          className="mb-0"
          style={{ fontSize: "18px", color: "#101828", fontWeight: 500 }}
        >
          Added Platforms
        </h6>
        {/* <Button
          color="warning"
          onClick={() => setModalOpen(true)}
          style={{
            backgroundColor: "#FFD600",
            border: "none",
            height: "36px",
            padding: "8px 14px",
            fontSize: "14px",
            borderRadius: "8px",
            fontWeight: "500",
            color: "#101828",
            boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <i className="fas fa-plus" style={{ fontSize: "12px" }}></i>
          Add Platform
        </Button> */}
      </div>
      {addedPlatforms && (
        <div className="platform-list">
          <div className="row">
            <div className="col-md-6">
              <div
                className="platform-item d-flex justify-content-between align-items-center px-3 py-2 mb-2"
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #EAECF0",
                  borderRadius: "8px",
                  transition: "all 0.2s",
                  boxShadow: "0px 1px 3px rgba(16, 24, 40, 0.1)",
                }}
              >
                <div className="d-flex align-items-center gap-3">
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      overflow: "hidden",
                      position: "relative",
                      border: "1px solid #EAECF0",
                    }}
                  >
                    <Image
                      src={addedPlatforms.icon}
                      alt={addedPlatforms.name}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <span
                    style={{
                      fontSize: "14px",
                      color: "#344054",
                      fontWeight: "500",
                    }}
                  >
                    {addedPlatforms.name}
                  </span>
                </div>
                <button
                  className="btn btn-link p-2"
                  style={{
                    color: "#667085",
                    transition: "color 0.2s",
                    backgroundColor: "transparent",
                    border: "none",
                    borderRadius: "4px",
                  }}
                >
                  <Edit2
                    size={20}
                    className="text-warning"
                    onClick={() => {
                      setIsEdit(addedPlatforms.name);
                      setFortniteModalOpen(true);
                    }}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <FortniteModal
        isOpen={fortniteModalOpen}
        toggle={() => setFortniteModalOpen(false)}
        isEdit={isEdit}
      />

      <style jsx>{`
        .platform-item:hover {
          background-color: #f9fafb !important;
        }
        .btn-link:hover {
          color: #344054 !important;
        }
      `}</style>
    </div>
  );
};

export default PlatformList;
