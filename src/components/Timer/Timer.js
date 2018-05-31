import React, { Component } from "react";
import moment from "moment";

// --------CSS--------
import "./Timer.css";

export default class Timer extends Component {
  render() {
    let currentTime = moment().format("dddd, HH:mm"),
      currentDate = moment().format("MMMM DD, YYYY");

    return (
      <div className="timer-container">
        <h4>{currentDate}</h4>
        <h5>{currentTime}</h5>
      </div>
    );
  }
}
