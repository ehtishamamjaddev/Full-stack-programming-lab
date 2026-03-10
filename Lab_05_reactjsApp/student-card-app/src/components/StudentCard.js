import React from "react";
import "./StudentCard.css";

function StudentCard({ name, rollNo, department, university, color }) {
  return (
    <div className="student-card" style={{ borderLeft: `5px solid ${color}` }}>
      <h2 className="student-name">{name}</h2>
      <p><strong>Roll No:</strong> {rollNo}</p>
      <p><strong>Department:</strong> {department}</p>
      <p><strong>University:</strong> {university}</p>
    </div>
  );
}

export default StudentCard;
