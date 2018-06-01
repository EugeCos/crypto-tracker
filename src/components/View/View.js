import React, { Component } from "react";

// --------COMPONENTS---------
import CurrencyContainer from "../CurrencyContainer/CurrencyContainer";
import Timer from "../Timer/Timer";

// ---------CSS---------
import "./View.css";

export default class View extends Component {
  render() {
    return (
      <div className="view-container">
        <CurrencyContainer />
        <Timer className="timer-container" />
      </div>
    );
  }
}
