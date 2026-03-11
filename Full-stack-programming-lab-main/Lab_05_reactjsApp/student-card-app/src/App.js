import React from "react";
import StudentCard from "./components/StudentCard";
import students from "./data/students";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <h1 className="app-heading">Student Information Cards</h1>
      <p className="app-subtitle">Lab 05 — Task 1: Components &amp; Props</p>
      <div className="cards-container">
        {students.map((student, index) => (
          <StudentCard
            key={index}
            name={student.name}
            rollNo={student.rollNo}
            department={student.department}
            university={student.university}
            color={student.color}
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
