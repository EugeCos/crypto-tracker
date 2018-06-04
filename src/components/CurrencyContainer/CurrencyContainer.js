import React, { Component } from "react";
import axios from "axios";

// ---------MATERIAL UI---------
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";
import Paper from "material-ui/Paper";

// ---------CSS---------
import "./CurrencyContainer.css";
import api from "../../api";

// -----------FRONT-END API-----------

export default class CurrencyContainer extends Component {
  constructor() {
    super();
    this.state = {
      currencyArray: ["BTC", "AE", "LTC", "ANAL"],
      totalPortfolioValue: "0.00"
    };
  }

  getRates = () => {
    const { currencyArray } = this.state;

    let newArray = "";
    currencyArray.map(currency => {
      return (newArray += `${currency},`);
    });

    let url = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${newArray}&tsyms=USD`;

    api
      .getRates(url)
      .then(res => {
        if (res.status === 200) {
          this.createExchangeRateObject(res.data);
        }
      })
      .catch(error => console.log(error));
  };

  createExchangeRateObject = rates => {
    let exchangeRates = [];
    for (let cur in rates) {
      exchangeRates.push({
        name: cur,
        rateToUSD: rates[cur].USD
      });
    }
    this.setState({
      exchangeRates
    });
  };

  displayAvatars = () => {
    const { exchangeRates, allCoins } = this.state;
    let rates;

    if (exchangeRates) {
      rates = Array.from(exchangeRates);
    }

    if (allCoins.length && exchangeRates.length) {
      exchangeRates.map((currency, index) => {
        let coinIndex = allCoins.findIndex(coin => coin.name === currency.name);
        (rates[index].avatar = `https://www.cryptocompare.com${
          allCoins[coinIndex].avatar
        }`),
          (rates[index].coinName = allCoins[coinIndex].coinName);
        this.setState({
          exchangeRates: rates
        });
      });
    }
  };

  getAllCoinsAndAvatars = () => {
    let coinListUrl =
        "https://cors-anywhere.herokuapp.com/https://www.cryptocompare.com/api/data/coinlist/",
      allCoins = [];

    api
      .getAllCoins(coinListUrl)
      .then(res => {
        if (res.status === 200) {
          for (let cur in res.data.Data) {
            console.log(res.data.Data);
            allCoins.push({
              name: cur,
              coinName: res.data.Data[cur].CoinName,
              avatar: res.data.Data[cur].ImageUrl
            });
          }
        }
      })
      .then(() =>
        this.setState(
          {
            allCoins
          },
          () => this.displayAvatars()
        )
      )
      .catch(err => console.log(err));
  };

  addCoin = () => {
    console.log("add coin");
  };

  componentWillMount() {
    this.getRates();
    this.getAllCoinsAndAvatars();
  }
  render() {
    const { totalPortfolioValue, exchangeRates } = this.state;
    let tableContentJSX;
    if (exchangeRates) {
      tableContentJSX = exchangeRates.map((currency, index) => {
        return (
          <TableRow
            className="table-row"
            key={index}
            displayBorder={false}
            selectable={false}>
            <TableRowColumn>
              <div className="coin-container">
                <img src={currency.avatar} className="coin-avatar" alt="" />
                {currency.name}
              </div>
            </TableRowColumn>
            <TableRowColumn>{currency.coinName}</TableRowColumn>
            <TableRowColumn>{index}</TableRowColumn>
            <TableRowColumn>{currency.rateToUSD}</TableRowColumn>
          </TableRow>
        );
      });
    }

    return (
      <Paper className="currency-container" zDepth={5}>
        <h3>My Portfolio</h3>
        <hr />
        <div className="total-value-line">
          <h4>
            Total Portfolio Value:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${
              totalPortfolioValue
            }
            &nbsp;Usd
          </h4>
        </div>
        <Table style={{ backgroundColor: "#333", borderCollapse: "separate" }}>
          <TableHeader
            style={{
              backgroundColor: "rgb(24, 24, 24)"
            }}
            adjustForCheckbox={false}
            displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn tooltip="Coin Name and Logo">
                COIN
              </TableHeaderColumn>
              <TableHeaderColumn tooltip="Coin Full Name">
                COIN FULL NAME
              </TableHeaderColumn>
              <TableHeaderColumn tooltip="Your Holdings">
                HOLDINGS
              </TableHeaderColumn>
              <TableHeaderColumn tooltip="Coin Price">PRICE</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>{tableContentJSX}</TableBody>
        </Table>
        <hr />
        <div className="add-coin" onClick={this.addCoin}>
          <i className="fa fa-plus-circle" />
          <h4>ADD COIN</h4>
        </div>
      </Paper>
    );
  }
}
