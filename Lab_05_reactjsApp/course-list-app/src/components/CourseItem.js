import React from "react";
import "./CourseItem.css";

function CourseItem({ courseName, instructor, duration, type, index }) {
  return (
    <div className="course-item">
      <div className="course-number">{String(index).padStart(2, "0")}</div>
      <div className="course-info">
        <h3 className="course-name">{courseName}</h3>
        <div className="course-details">
          <span className="detail">
            <span className="detail-icon">&#128100;</span> {instructor}
          </span>
          <span className="detail">
            <span className="detail-icon">&#128197;</span> {duration}
          </span>
        </div>
      </div>
      <span className={`course-badge ${type === "Online" ? "badge-online" : "badge-offline"}`}>
        <span className="badge-dot"></span>
        {type}
      </span>
    </div>
  );
}

export default CourseItem;
