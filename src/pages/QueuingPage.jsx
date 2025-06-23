import React, { useState, useEffect, useCallback } from "react";

import Card from "../components/Card";
import Header from "../components/Header";

import "../App.css";

const QueuingPage = () => {
  const [waitingList, setWaitingList] = useState([]);
  
  const [counter1, setCounter1] = useState({ queue: [], currentCustomer: null, isProcessing: false });
  const [counter2, setCounter2] = useState({ queue: [], currentCustomer: null, isProcessing: false });
  const [priorityCounter, setPriorityCounter] = useState({ queue: [], currentCustomer: null, isProcessing: false });

  const SERVICE_TIME = 10000; 

const processNextCustomer = useCallback((counterType, setCounter) => {
  setCounter(prev => {
    if (prev.isProcessing || prev.queue.length === 0) return prev;

    const [nextCustomer, ...remainingQueue] = prev.queue;

    setTimeout(() => {
      setCounter(current => {
        const updated = {
          ...current,
          currentCustomer: null,
          isProcessing: false
        };

        if (counterType === 'priority' && updated.queue.length === 0) {
          setTimeout(() => {
            rebalanceQueues();
          }, 100);
        }

        return updated;
      });
    }, SERVICE_TIME);

    return {
      queue: remainingQueue,
      currentCustomer: nextCustomer,
      isProcessing: true
    };
  });
}, []);


  useEffect(() => {
    processNextCustomer('counter1', setCounter1);
  }, [counter1.queue.length, counter1.isProcessing]);

  useEffect(() => {
    processNextCustomer('counter2', setCounter2);
  }, [counter2.queue.length, counter2.isProcessing]);

  useEffect(() => {
    processNextCustomer('priority', setPriorityCounter);
  }, [priorityCounter.queue.length, priorityCounter.isProcessing]);

  const rebalanceQueues = useCallback(() => {
    setCounter1(prev1 => {
      setCounter2(prev2 => {
        const total1 = prev1.queue.length + (prev1.isProcessing ? 1 : 0);
        const total2 = prev2.queue.length + (prev2.isProcessing ? 1 : 0);
        
        if (Math.abs(total1 - total2) > 1) {
          const allRegularCustomers = [
            ...prev1.queue.filter(c => c.type === "Regular Customer"),
            ...prev2.queue.filter(c => c.type === "Regular Customer")
          ];
          
          if (allRegularCustomers.length > 0) {
            const mid = Math.ceil(allRegularCustomers.length / 2);
            const queue1Regular = allRegularCustomers.slice(0, mid);
            const queue2Regular = allRegularCustomers.slice(mid);
            
            const queue1Priority = prev1.queue.filter(c => c.type === "Priority Customer");
            const queue2Priority = prev2.queue.filter(c => c.type === "Priority Customer");
            
            setCounter1(current => ({
              ...current,
              queue: [...queue1Priority, ...queue1Regular]
            }));
            
            return {
              ...prev2,
              queue: [...queue2Priority, ...queue2Regular]
            };
          }
        }
        
        return prev2;
      });
      return prev1;
    });
  }, []);

function generateCustomer() {
  const probability = Math.random(); 
  const randomType = probability < 0.1 ? "Priority Customer" : "Regular Customer"; 

  const usedIds = new Set([
    ...waitingList.map(c => c.id),
    ...counter1.queue.map(c => c.id),
    ...counter2.queue.map(c => c.id),
    ...priorityCounter.queue.map(c => c.id),
    counter1.currentCustomer?.id,
    counter2.currentCustomer?.id,
    priorityCounter.currentCustomer?.id
  ].filter(Boolean)); 

  let id;
  let attempts = 0;
  do {
    id = Math.floor(Math.random() * 100) + 100;
    attempts++;
  } while (usedIds.has(id) && attempts < 1000);

  if (usedIds.has(id)) {
    console.warn("Unable to generate unique ID after many attempts.");
    return;
  }

  const customer = { type: randomType, id, timestamp: Date.now() };
  setWaitingList(prev => [...prev, customer]);
}



  function assignAllCustomers() {
    if (waitingList.length === 0) return;
    
    const priorityCustomers = waitingList.filter(c => c.type === "Priority Customer");
    const regularCustomers = waitingList.filter(c => c.type === "Regular Customer");
    
    if (priorityCustomers.length > 0) {
      setPriorityCounter(prev => ({
        ...prev,
        queue: [...prev.queue, ...priorityCustomers]
      }));
    }
    
    if (regularCustomers.length > 0) {
      const currentPriorityLoad = priorityCounter.queue.length + (priorityCounter.isProcessing ? 1 : 0);
      const hasPriorityCustomers = priorityCustomers.length > 0;
      const priorityQueueHasPriorityCustomers = priorityCounter.queue.some(c => c.type === "Priority Customer");
      

      if (currentPriorityLoad === 0 && !hasPriorityCustomers && !priorityQueueHasPriorityCustomers) {
        const regularToPriority = regularCustomers.slice(0, Math.ceil(regularCustomers.length / 3));
        const remainingRegular = regularCustomers.slice(Math.ceil(regularCustomers.length / 3));
        
        setPriorityCounter(prev => ({
          ...prev,
          queue: [...prev.queue, ...regularToPriority]
        }));
        
        const mid = Math.ceil(remainingRegular.length / 2);
        const toCounter1 = remainingRegular.slice(0, mid);
        const toCounter2 = remainingRegular.slice(mid);
        
        setCounter1(prev => ({ ...prev, queue: [...prev.queue, ...toCounter1] }));
        setCounter2(prev => ({ ...prev, queue: [...prev.queue, ...toCounter2] }));
      } else {
        const mid = Math.ceil(regularCustomers.length / 2);
        const toCounter1 = regularCustomers.slice(0, mid);
        const toCounter2 = regularCustomers.slice(mid);
        
        setCounter1(prev => ({ ...prev, queue: [...prev.queue, ...toCounter1] }));
        setCounter2(prev => ({ ...prev, queue: [...prev.queue, ...toCounter2] }));
      }
    }
    
    setWaitingList([]);
    
    setTimeout(rebalanceQueues, 100);
  }

  function deleteQueue() {
    setWaitingList([]);
    setCounter1({ queue: [], currentCustomer: null, isProcessing: false });
    setCounter2({ queue: [], currentCustomer: null, isProcessing: false });
    setPriorityCounter({ queue: [], currentCustomer: null, isProcessing: false });
  }

  const buttonStyle = {
    width: "200px",
    backgroundColor: "#FFF287",
    color: "#8A0000",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1rem",
    marginRight: "20px",
    transition: "background-color 0.2s ease",
  };

const renderQueue = (queue, currentCustomer) => (
  <ul style={{ margin: 0, padding: 0 }}>
    {currentCustomer && (
      <li
        style={{
          marginBottom: "8px",
          listStyle: "none",
          padding: "5px",
          backgroundColor: currentCustomer.type === "Priority Customer" ? "#FFE066" : "#FFF7CC",
          borderRadius: "3px",
          color: "#8A0000",
          fontWeight: "bold"
        }}
      >
        {currentCustomer.type} #{currentCustomer.id}
      </li>
    )}
    {queue.map((customer) => (
      <li
        key={customer.id}
        style={{
          marginBottom: "8px",
          listStyle: "none",
          padding: "5px",
          backgroundColor: customer.type === "Priority Customer" ? "#FFE066" : "#FFF7CC",
          borderRadius: "3px",
          color: "#8A0000"
        }}
      >
        {customer.type} #{customer.id}
      </li>
    ))}
    {!currentCustomer && queue.length === 0 && (
      <li style={{ listStyle: "none", color: "white", fontStyle: "italic" }}>
        Available
      </li>
    )}
  </ul>
);



  return (
    <div style={{
      fontFamily: "Segoe UI, sans-serif",
      color: "#FFF287",
      minHeight: "100vh",
      width: "99vw",
      backgroundColor: "#8A0000",
      display: "flex",
      flexDirection: "column",
      boxSizing: "border-box",
    }}>
      <Header />

      <div style={{ textAlign: "center" }}>
        <h1 style={{
          fontSize: "2.2rem",
          fontWeight: "bold",
          margin: "2rem 0 1rem",
        }}>
          Live Queue Status
        </h1>
      </div>

      <div style={{
        display: "flex",
        justifyContent: "center",
        padding: "0 20px 40px",
        gap: "30px",
      }}>
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          maxWidth: "900px",
          flex: 1,
        }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
            height: "160px",
          }}>
            <Card
              title={`Counter 1 ${counter1.isProcessing ? "(BUSY)" : "(AVAILABLE)"}`}
              content="Service Time: 10 seconds"
            />
            <Card
              title={`Counter 2 ${counter2.isProcessing ? "(BUSY)" : "(AVAILABLE)"}`}
              content="Service Time: 10 seconds"
            />
            <Card
              title={`Priority ${priorityCounter.isProcessing ? "(BUSY)" : "(AVAILABLE)"}`}
              content="Service Time: 10 seconds"
            />
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
          }}>
            <Card
              title={`Counter 1 Queue (${counter1.queue.length + (counter1.isProcessing ? 1 : 0)})`}
              content={renderQueue(counter1.queue, counter1.currentCustomer)}
            />
            <Card
              title={`Counter 2 Queue (${counter2.queue.length + (counter2.isProcessing ? 1 : 0)})`}
              content={renderQueue(counter2.queue, counter2.currentCustomer)}
            />
            <Card
              title={`Priority Queue (${priorityCounter.queue.length + (priorityCounter.isProcessing ? 1 : 0)})`}
              content={renderQueue(priorityCounter.queue, priorityCounter.currentCustomer)}
            />
          </div>
        </div>

        <div style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
          <div style={{ minWidth: "250px" }}>
            <Card
              title={`Waiting List (${waitingList.length})`}
              content={
                <div style={{
                  maxHeight: "300px",
                  overflowY: "auto",
                  paddingRight: "5px",
                }}>
                  <ul style={{ margin: 0, padding: 0 }}>
                    {waitingList.map((item) => (
                      <li
                        key={item.id}
                        style={{ 
                          marginBottom: "8px", 
                          listStyle: "none",
                          padding: "5px",
                          backgroundColor: item.type === "Priority Customer" ? "#FFE066" : "#FFF7CC",
                          borderRadius: "3px",
                          color: "#8A0000"
                        }}
                      >
                        {item.type} #{item.id}
                      </li>
                    ))}
                    {waitingList.length === 0 && (
                      <li style={{ listStyle: "none", color: "white", fontStyle: "italic" }}>
                        No customers waiting
                      </li>
                    )}
                  </ul>
                </div>
              }
            />
          </div>

          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            marginTop: "0",
            textAlign: "center",
          }}>
            <button 
              onClick={generateCustomer} 
              style={buttonStyle}
              onMouseOver={(e) => e.target.style.backgroundColor = "#FFE066"}
              onMouseOut={(e) => e.target.style.backgroundColor = "#FFF287"}
            >
              Add Customer
            </button>
            <button 
              onClick={assignAllCustomers} 
              style={buttonStyle}
              onMouseOver={(e) => e.target.style.backgroundColor = "#FFE066"}
              onMouseOut={(e) => e.target.style.backgroundColor = "#FFF287"}
            >
              Assign All Customers
            </button>
            <button
              onClick={deleteQueue}
              style={{
                ...buttonStyle,
                backgroundColor: "#C83F12",
                color: "#fff",
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = "#A62F0A"}
              onMouseOut={(e) => e.target.style.backgroundColor = "#C83F12"}
            >
              Delete Queue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default QueuingPage;
