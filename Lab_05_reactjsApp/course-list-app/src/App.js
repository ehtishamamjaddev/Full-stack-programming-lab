import React from "react";
import CourseItem from "./components/CourseItem";
import courses from "./data/courses";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <h1 className="app-heading">Course List</h1>
      <div className="courses-container">
        {courses.map((course, index) => (
          <CourseItem
            key={index}
            courseName={course.courseName}
            instructor={course.instructor}
            duration={course.duration}
            type={course.type}
          />
        ))}
      </div>
      <footer className="app-footer">
        <p>Developed by M Ehtisham Amjad</p>
        <p>Roll No: 231996</p>
        <p>BSSE-VI-B</p>
        <p>Full Stack Programming Lab</p>
        <p>Instructor: Mr. Shareef Hussain</p>
      </footer>
    </div>
  );
}

export default App;
