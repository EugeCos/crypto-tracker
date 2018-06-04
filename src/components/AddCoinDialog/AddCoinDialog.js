import React, { Component } from "react";

// ----------MATERIAL UI----------
import RaisedButton from "material-ui/RaisedButton";
import AutoComplete from "material-ui/AutoComplete";

// ------------CSS-----------
import "./AddCoinDialog.css";

export default class AddCoinDialog extends Component {
  constructor() {
    super();
    this.state = {
      selectedCoin: ""
    };
  }

  componentWillMount() {
    const { allCoins } = this.props;
    let coinSymbol = [],
      coinName = [];

    allCoins.map(coin => {
      coinSymbol.push(coin.name), coinName.push(coin.coinName);
    });

    this.setState({
      coinSymbol,
      coinName
    });
  }

  handleChangeSymbol = selectedCoin => {
    this.setState({
      selectedCoin
    });
  };

  handleChangeName = chosenCoin => {
    const { allCoins } = this.props;
    let selectedCoin;

    let coinIndex = allCoins.findIndex(coin => coin.coinName === chosenCoin);
    selectedCoin = allCoins[coinIndex].name;

    this.setState({
      selectedCoin
    });
  };

  render() {
    const { handleDialogClose, addCoin } = this.props,
      { coinSymbol, coinName, selectedCoin } = this.state,
      menuProps = {
        desktop: true,
        disableAutoFocus: true
      };
    let selectedExists = selectedCoin.length ? false : true;

    let selectedCoinMessageJSX = selectedCoin.length ? (
      <h3 className="text-center">
        Your selected coin:&nbsp;&nbsp; {selectedCoin}
      </h3>
    ) : (
      ""
    );

    return (
      <div className="dialog-container">
        <div className="dialog-content-wrapper d-flex flex-row">
          <div className="divider-6 text-center">
            <h4>Search by currency symbol:</h4>
            <AutoComplete
              hintStyle={{
                color: "#a4b0be",
                fontFamily: "Quicksand",
                fontSize: "14px"
              }}
              inputStyle={{
                color: "#fff",
                fontFamily: "Quicksand",
                fontSize: "14px"
              }}
              menuStyle={{ backgroundColor: "#d1ccc0" }}
              hintText="Type coin name"
              filter={AutoComplete.caseInsensitiveFilter}
              maxSearchResults={5}
              dataSource={coinSymbol}
              menuProps={menuProps}
              onNewRequest={this.handleChangeSymbol}
            />
          </div>
          <div className="divider-2">
            <h3>OR</h3>
          </div>
          <div className="divider-6 text-center">
            <h4>Search by currency name:</h4>
            <AutoComplete
              hintStyle={{
                color: "#a4b0be",
                fontFamily: "Quicksand",
                fontSize: "14px"
              }}
              inputStyle={{
                color: "#fff",
                fontFamily: "Quicksand",
                fontSize: "14px"
              }}
              menuStyle={{ backgroundColor: "#d1ccc0" }}
              hintText="Type coin name"
              filter={AutoComplete.caseInsensitiveFilter}
              maxSearchResults={5}
              dataSource={coinName}
              menuProps={menuProps}
              onNewRequest={this.handleChangeName}
            />
          </div>
        </div>

        {selectedCoinMessageJSX}

        <div className="buttons-wrapper d-flex flex-row">
          <RaisedButton
            buttonStyle={{ backgroundColor: "#636e72", width: "130px" }}
            label="Cancel"
            primary={true}
            onClick={handleDialogClose}
          />
          <RaisedButton
            buttonStyle={{ backgroundColor: "#e67e22", width: "130px" }}
            disabled={selectedExists}
            label="Add a Coin"
            primary={true}
            onClick={() => addCoin(selectedCoin)}
          />
        </div>
      </div>
    );
  }
}
