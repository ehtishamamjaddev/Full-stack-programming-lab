import React from "react";
import "./StudentCard.css";

function StudentCard({ name, rollNo, department, university, color }) {
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <div className="student-card" style={{ borderTop: `4px solid ${color}` }}>
      <div className="card-header">
        <div className="avatar" style={{ backgroundColor: color }}>
          {initials}
        </div>
        <div className="card-title">
          <h2 className="student-name">{name}</h2>
          <span className="roll-badge">Roll # {rollNo}</span>
        </div>
      </div>
      <div className="card-body">
        <div className="info-row">
          <span className="info-label">Department</span>
          <span className="info-value">{department}</span>
        </div>
        <div className="info-row">
          <span className="info-label">University</span>
          <span className="info-value">{university}</span>
        </div>
      </div>
    </div>
  );
}

export default StudentCard;
