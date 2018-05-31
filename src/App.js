import React, { Component } from "react";

// -----------COMPONENTS-----------
import Navbar from "./components/Navbar/Navbar";
import Timer from "./components/Timer/Timer";

// ----------CSS----------
import "./App.css";

class App extends Component {
  render() {
    return (
      <div>
        <div className="bg-image" />
        <Navbar />
        <Timer className="timer-container" />
      </div>
    );
  }
}

export default App;
