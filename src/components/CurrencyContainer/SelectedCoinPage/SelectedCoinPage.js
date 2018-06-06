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
      transaction: {
        totalValue: 0,
        numberOfCoins: 0
      }
    };
  }

  selectOption = option => {
    this.setState({
      optionSelected: option
    });
  };

  handleChange = e => {
    const { myCoins, index } = this.props,
      { optionSelected } = this.state;
    let totalValue = e.target.value * myCoins[index].rateToUSD,
      numberOfCoins = parseInt(e.target.value);

    if (optionSelected === "SELL") {
      numberOfCoins = -Math.abs(e.target.value);
      totalValue = numberOfCoins * myCoins[index].rateToUSD;
    }

    this.setState({
      transaction: {
        totalValue,
        numberOfCoins
      }
    });
  };

  render() {
    const { optionSelected, transaction } = this.state,
      { totalValue } = transaction,
      { myCoins, tradeCoins, selectCoin, deleteCoin, index } = this.props;
    let coin = myCoins[index],
      totalVal = totalValue.toLocaleString(
        "en",
        { minimumFractionDigits: 2 }
      ),
      optionEmpty = optionSelected.length ? false : true;

    return (
      <div>
        <hr />
        <div className="d-flex flex-row selected-coin-container">
          <div className="coin-profile-container">
            <div className="coin-profile-wrapper">
              <div className="d-flex">
                <div className="divider-6">
                  <img src={coin.avatar} alt="coin-image" />
                </div>
                <div className="divider-6">
                  <h2>{coin.coinName}</h2>
                  <h4>{coin.name}</h4>
                </div>
              </div>
              <div className="d-flex flex-column coin-data">
                <h4>Trading pair:&nbsp;{coin.name}&nbsp;/&nbsp;USD</h4>
                <h4>Current price:&nbsp;$&nbsp;{coin.rateToUSD}&nbsp;USD</h4>
              </div>
            </div>
          </div>
          <div className="coin-trade-wrapper">
            <p>Choose an option:</p>
            <div className="d-flex flex-row buy-sell-wrapper">
              <h3
                className={`buy ${optionSelected === "BUY" ? "selected" : ""}`}
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
            <hr style={{ width: "50%", margin: "16px auto" }} />
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
              <p>{`$ ${totalVal} USD`}</p>
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
                disabled={optionEmpty}
                label="Confirm"
                primary={true}
                onClick={() => tradeCoins(transaction, index)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
