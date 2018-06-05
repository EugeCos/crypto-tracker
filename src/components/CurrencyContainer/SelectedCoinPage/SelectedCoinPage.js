import React, { Component } from "react";

// ----------MATERIAL UI----------
import RaisedButton from "material-ui/RaisedButton";
import AutoComplete from "material-ui/AutoComplete";
import TextField from "material-ui/TextField";

// ------------CSS-----------
import "./SelectedCoinPage.css";

export default class SelectedCoinsPage extends Component {
  constructor() {
    super();
    this.state = {
      optionSelected: "",
      totalValue: 0
    };
  }

  selectOption = option => {
    this.setState({
      optionSelected: option
    });
  };

  handleChange = e => {
    const { myCoins, index } = this.props;
    let totalValue = e.target.value * myCoins[index].rateToUSD;
    this.setState({
      totalValue
    });
  };

  render() {
    const { optionSelected, totalValue } = this.state,
      { myCoins, tradeCoins, selectCoin, index } = this.props;
    let coin = myCoins[index],
      totalVal = totalValue.toLocaleString(
        "en",
        { minimumFractionDigits: 2 }
      );

    return (
      <div>
        <hr />
        <div className="selected-coin-wrapper">
          <div className="d-flex flex-row">
            <div className="coin-profile-wrapper">
              <div className="divider-6">
                <img src={coin.avatar} alt="coin-image" />
              </div>
              <div className="divider-6">
                <h2>{coin.coinName}</h2>
                <h4>{coin.name}</h4>
              </div>
            </div>
            <div className="coin-trade-wrapper">
              <h4>Trading pair:&nbsp;{coin.name}&nbsp;/&nbsp;USD</h4>
              <h4>Current price:&nbsp;${coin.rateToUSD}&nbsp;USD</h4>
              <hr style={{ width: "50%", margin: "16px auto" }} />
              <div className="d-flex flex-row buy-sell-wrapper">
                <h3
                  className={`buy ${
                    optionSelected === "BUY" ? "selected" : ""
                  }`}
                  onClick={() => this.selectOption("BUY")}>
                  BUY
                </h3>
                <h3
                  className={`sell ${
                    optionSelected === "SELL" ? "selected" : ""
                  }`}
                  onClick={() => this.selectOption("SELL")}>
                  SELL
                </h3>
              </div>
              <div className="d-flex flex-row quantity-wrapper">
                <TextField
                  style={{ width: "130px", textAlign: "center" }}
                  hintStyle={{
                    color: "#a4b0be",
                    fontFamily: "Quicksand",
                    fontSize: "14px"
                  }}
                  inputStyle={{
                    color: "#fff",
                    fontFamily: "Quicksand",
                    fontSize: "14px",
                    textAlign: "center"
                  }}
                  hintText="Enter Quantity"
                  onChange={e => this.handleChange(e)}
                />
              </div>
              <div className="d-flex flex-row quantity-wrapper">
                <p>Total value:</p>
                <p>{totalVal}</p>
              </div>

              <div className="buttons-wrapper d-flex flex-row">
                <RaisedButton
                  buttonStyle={{ backgroundColor: "#636e72", width: "130px" }}
                  label="Return"
                  primary={true}
                  onClick={selectCoin}
                />
                <RaisedButton
                  buttonStyle={{ backgroundColor: "#e67e22", width: "130px" }}
                  label="Confirm"
                  primary={true}
                  onClick={() => tradeCoins()}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
