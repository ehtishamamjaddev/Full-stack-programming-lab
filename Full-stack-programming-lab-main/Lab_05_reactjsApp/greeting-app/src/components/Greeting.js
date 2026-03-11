import React from "react";
import "./Greeting.css";

function Greeting({ name, timeOfDay, bgColor }) {
  let message = "";
  let icon = "";

  if (timeOfDay === "morning") {
    message = `Good Morning, ${name}! Start your day with energy.`;
    icon = "\u2600\uFE0F";
  } else if (timeOfDay === "afternoon") {
    message = `Good Afternoon, ${name}! Hope your day is going well.`;
    icon = "\u26C5";
  } else if (timeOfDay === "evening") {
    message = `Good Evening, ${name}! Time to relax and recharge.`;
    icon = "\uD83C\uDF19";
  }

  return (
    <div className="greeting-card" style={{ backgroundColor: bgColor }}>
      <div className="greeting-icon">{icon}</div>
      <div className="greeting-content">
        <h2 className="greeting-message">{message}</h2>
        <span className="greeting-badge">{timeOfDay.charAt(0).toUpperCase() + timeOfDay.slice(1)}</span>
      </div>
    </div>
  );
}

export default Greeting;
