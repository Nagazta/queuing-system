import React from "react";
import Card from "../components/Card";
import Header from "../components/Header";

const QueuingPage = () => {
  const waitingData = [23, 34, 12, 42, 12, 54, 65, 32, 65];

  const waitingList = waitingData.map((num, index) => (
    <p key={index} style={{ fontSize: "1.1rem", marginBottom: "6px" }}>
      #{num}
    </p>
  ));

  const calledCounter1 = [21, 20, 19];
  const calledCounter2 = [18, 17, 16];
  const calledPriority = [5, 4];

  const renderCalledNumbers = (list) =>
    list.map((num, index) => (
      <p key={index} style={{ fontSize: "1.1rem", marginBottom: "6px" }}>
        #{num}
      </p>
    ));

  return (
    <div
      className="queuing-page"
      style={{
        fontFamily: "Segoe UI, sans-serif",
        color: "#FFF287",
        minHeight: "100vh",
        width: "99vw",
        backgroundColor: "#8A0000",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
      }}
    >
      <Header />

      <div style={{ textAlign: "center" }}>
        <h1
          style={{
            fontSize: "2.2rem",
            fontWeight: "bold",
            margin: "2rem 0 1rem",
          }}
        >
          Live Queue Status
        </h1>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "0 20px 40px",
          gap: "30px",
        }}
      >
        {/* Main Grid Container */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            maxWidth: "900px",
            flex: 1,
          }}
        >
          {/* Top Row */}
          <div
            className="top-row"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "20px",
              height: "160px"
            }}
          >
            <Card
              title="Counter 1"
              content="Please proceed when your number is called."
            />
            <Card
              title="Counter 2"
              content="Please proceed when your number is called."
            />
            <Card
              title="Priority Number"
              content="Please proceed when your number is called."
            />
          </div>

          {/* Bottom Row */}
          <div
            className="bottom-row"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "20px",
            }}
          >
            <Card
              title="Counter 1 - Called"
              content={renderCalledNumbers(calledCounter1)}
            />
            <Card
              title="Counter 2 - Called"
              content={renderCalledNumbers(calledCounter2)}
            />
            <Card
              title="Priority - Called"
              content={renderCalledNumbers(calledPriority)}
            />
          </div>
        </div>

        {/* Waiting List on the Right */}
        <div style={{ minWidth: "250px" }}>
          <Card title="Waiting List" content={waitingList} />
        </div>
      </div>
    </div>
  );
};

export default QueuingPage;
