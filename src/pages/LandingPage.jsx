import React from "react";
import headerImg from "../assets/images/header-img.jpg";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <div
        className="landing-page"
        style={{
          fontFamily: "Segoe UI, sans-serif",
          color: "#FFF287",
          marginBottom: "900px",
        }}
      >
        <div
          className="upper-section"
          style={{
            backgroundColor: "#8A0000",
            width: "100%",
            height: "60vh",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            paddingTop: "200px",
          }}
        >
          <Header />

          <h1
            className="title"
            style={{
              fontSize: "2.8rem",
              fontWeight: "bold",
              marginBottom: "1rem",
              color: "#FFF287",
              textShadow: "2px 2px 8px #3B060A",
            }}
          >
            Welcome to Silogan Ni Nestor
          </h1>

          <div className="image-container" style={{ marginBottom: "1.5rem" }}>
            <img
              src={headerImg}
              alt="Silogan Dish"
              className="header-image"
              style={{
                width: "90vw",
                maxWidth: "600px",
                height: "auto",
                borderRadius: "10px",
                boxShadow: "0 6px 15px rgba(0, 0, 0, 0.3)",
                filter: "brightness(0.85)",
              }}
            />
          </div>

          <p
            style={{
              fontSize: "1.2rem",
              marginBottom: "1.5rem",
              color: "#FFF287",
            }}
          >
            Order now and get your queue number instantly!
          </p>

          <button
            className="join-queue-btn"
            style={{
              backgroundColor: "#C83F12",
              border: "none",
              color: "#fff",
              padding: "1rem 2rem",
              fontSize: "1.2rem",
              fontWeight: "bold",
              borderRadius: "12px",
              cursor: "pointer",
              transition: "0.3s ease",
            }}
            onMouseOver={(e) =>
              (e.target.style.backgroundColor = "#a93210")
            }
            onMouseOut={(e) =>
              (e.target.style.backgroundColor = "#C83F12")
            }
            onClick={()=> navigate("/queue")}
          >
            Join Queue
          </button>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
