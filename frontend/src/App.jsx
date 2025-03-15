import { useState, useEffect } from "react";

function App() {
  const [newTicket, setNewTicket] = useState(""); 
  const [tickets, setTickets] = useState([]); 

  
  useEffect(() => {
    fetch("http://localhost:5000/tickets")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched tickets:", data); 
        setTickets(data);
      })
      .catch((error) => console.error("Error fetching tickets:", error));
  }, []);

 
  const handleAddTicket = async () => {
    if (!newTicket.trim()) {
      alert("Please enter a ticket description!");
      return;
    }

    const ticketData = { description: newTicket }; 
    try {
      const response = await fetch("http://localhost:5000/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ticketData),
      });

      if (!response.ok) {
        throw new Error("Failed to add ticket");
      }

      const addedTicket = await response.json();
      console.log("Added Ticket:", addedTicket); // Debugging

      setTickets([...tickets, addedTicket]); 
      setNewTicket(""); 
    } catch (error) {
      console.error("Error adding ticket:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Ticket Raising Platform</h2>
      
      {/* Input Field */}
      <input
        type="text"
        placeholder="Enter ticket description"
        value={newTicket}
        onChange={(e) => setNewTicket(e.target.value)}
        style={{ padding: "5px", width: "250px" }}
      />
      
      {/* Button */}
      <br />
      <button onClick={handleAddTicket} style={{ marginTop: "10px", padding: "5px 15px" }}>
        Raise Ticket
      </button>

      {/* Ticket List */}
      <h3>Raised Tickets</h3>
      <ul>
        {tickets.length > 0 ? (
          tickets.map((ticket, index) => <li key={index}>{ticket.description}</li>)
        ) : (
          <p>No tickets raised yet.</p>
        )}
      </ul>
    </div>
  );
}

export default App;
