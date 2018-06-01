import React, { Component } from "react";

// -----------COMPONENTS-----------
import Navbar from "./components/Navbar/Navbar";
import View from "./components/View/View";

// ----------CSS----------
import "./App.css";

class App extends Component {
  render() {
    return (
      <div>
        <div className="bg-image" />
        <Navbar />
        <View />
      </div>
    );
  }
}

export default App;
