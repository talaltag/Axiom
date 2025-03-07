import React from "react";
import { Spinner } from "reactstrap";

interface LoaderProps {
  fullscreen?: boolean;
}

const Loader: React.FC<LoaderProps> = ({ fullscreen }) => {
  if (fullscreen) {
    return (
      <div
        className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-white bg-opacity-75"
        style={{ zIndex: 1050 }}
      >
        <Spinner color="warning" style={{ width: "3rem", height: "3rem" }}>
          Loading...
        </Spinner>
      </div>
    );
  }

  return (
    <Spinner color="warning" size="sm" className="ms-2">
      Loading...
    </Spinner>
  );
};

export default Loader;
