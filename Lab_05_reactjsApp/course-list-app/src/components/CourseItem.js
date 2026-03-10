import React from "react";
import "./CourseItem.css";

function CourseItem({ courseName, instructor, duration, type }) {
  return (
    <div className="course-item">
      <div className="course-info">
        <h3 className="course-name">{courseName}</h3>
        <p><strong>Instructor:</strong> {instructor}</p>
        <p><strong>Duration:</strong> {duration}</p>
      </div>
      <span className={`course-badge ${type === "Online" ? "badge-online" : "badge-offline"}`}>
        {type}
      </span>
    </div>
  );
}

export default CourseItem;
