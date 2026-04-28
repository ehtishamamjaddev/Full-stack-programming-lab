import React from "react";
import Greeting from "./components/Greeting";
import greetings from "./data/greetings";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <h1 className="app-heading">Daily Greetings</h1>
      <p className="app-subtitle">Lab 05 \u2014 Task 3: Props &amp; Conditional Rendering</p>
      <div className="greetings-container">
        {greetings.map((greeting, index) => (
          <Greeting
            key={index}
            name={greeting.name}
            timeOfDay={greeting.timeOfDay}
            bgColor={greeting.bgColor}
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
