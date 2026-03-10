import React from "react";
import "./Greeting.css";

function Greeting({ name, timeOfDay, bgColor }) {
  let message = "";

  if (timeOfDay === "morning") {
    message = `Good Morning, ${name}! Start your day with energy.`;
  } else if (timeOfDay === "afternoon") {
    message = `Good Afternoon, ${name}! Hope your day is going well.`;
  } else if (timeOfDay === "evening") {
    message = `Good Evening, ${name}! Time to relax and recharge.`;
  }

  return (
    <div className="greeting-card" style={{ backgroundColor: bgColor }}>
      <h2 className="greeting-message">{message}</h2>
      <p className="greeting-time">{timeOfDay.charAt(0).toUpperCase() + timeOfDay.slice(1)}</p>
    </div>
  );
}

export default Greeting;
