import React, { use } from "react";
import Card from "../components/Card";
import Header from "../components/Header";
import { useState } from "react";

const QueuingPage = () => {
  function generatePriority() {
    var customer = ["Priority Customer", "Regular Customer"];
    var randomIndex = Math.floor(Math.random() * customer.length);
    var randomNumber = Math.floor(Math.random() * 100);
    setPriority((prevArray) => [
      ...prevArray,
      customer[randomIndex] + " : " + randomNumber,
    ]);
    return customer[randomIndex] + " " + randomNumber;
  }
  function deletePriority() {
    setPriority([]);
  }

  function callCustomer() {
    const newCustomer = priority.slice(1);
    var randomIndex;
    setPriority(newCustomer);
    var counter = ["Counter 1", "Counter 2", "Priority Number"];
    if (newCustomer === "Priority Customer") {
      console.log("Priority: " + priority);
      counter[2];
    } else if (counter[2] === 0) {
      console.log("Im 0 and 1 " + priority);
      randomIndex = Math.floor(Math.random() * counter.length);
      return randomIndex;
    } else {
      console.log("Im hereee " + priority);
      randomIndex = Math.floor(Math.random() * counter.length);
      return randomIndex;
    }
    return "Pop:" + priority;
  }

  const [priority, setPriority] = useState(() => {
    return [generatePriority()];
  });
  const [counter, setCounter] = useState([]);

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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            maxWidth: "900px",
            flex: 1,
          }}
        >
          <div
            className="top-row"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "20px",
              height: "160px",
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

          <div
            className="bottom-row"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "20px",
            }}
          >
            <Card title="Counter 1 - Called" content="" />
            <Card title="Counter 2 - Called" content="" />
            <Card title="Priority - Called" content="" />
          </div>
        </div>

        <div style={{ minWidth: "250px" }}>
          <Card
            title="Waiting List"
            content={
              <ul>
                {priority.map((item, index) => (
                  <li key={index} style={{ marginBottom: "10px" }}>
                    {item}
                  </li>
                ))}
              </ul>
            }
          ></Card>
        </div>
      </div>
      <div
        className="button"
        style={{ textAlign: "center", marginTop: "10px" }}
      >
        <button
          onClick={() => {
            console.log(generatePriority());
          }}
          className="add-customer-btn"
          style={{
            width: "200px",
            marginRight: "20px",
            backgroundColor: "#FFF287",
            color: "#8A0000",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          Add Customer
        </button>
        <button
          onClick={() => {
            console.log(callCustomer());
          }}
          className="call-next-btn"
          style={{
            width: "200px",
            backgroundColor: "#FFF287",
            color: "#8A0000",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          Call Next Customer
        </button>
        <button
          onClick={deletePriority}
          className="clear-queue-btn"
          style={{
            width: "200px",
            backgroundColor: "#C83F12",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "1rem",
            marginLeft: "20px",
          }}
        >
          Delete Queue
        </button>
      </div>
    </div>
  );
};

export default QueuingPage;
