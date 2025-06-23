import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div
      className="header"
      style={{
        zIndex: 2,
        textAlign: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        width: "100%",
      }}
    >
      <h1 style={{ color: "#FFF287" }}>Silogan Ni Nestor</h1>
      <div
        className="navigation"
        style={{ textAlign: "center", marginBottom: "20px" }}
      >
        <a
          onClick={()=> navigate("/")}
          style={{
            color: "#FFF287",
            margin: "0 15px",
            textDecoration: "none",
            cursor: "pointer"
          }}
        >
          Home
        </a>
        <a
          onClick={() => navigate("/queue")}
          style={{
            color: "#FFF287",
            margin: "0 15px",
            textDecoration: "none",
            cursor: "pointer",
          }}
        >
          Queue
        </a>
        <a
          style={{
            color: "#FFF287",
            margin: "0 15px",
            textDecoration: "none",
          }}
        >
          Menu
        </a>
      </div>
    </div>
  );
};

export default Header;
