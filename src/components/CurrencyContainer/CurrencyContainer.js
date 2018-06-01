import React, { Component } from "react";

// ---------MATERIAL UI---------
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";

// ---------CSS---------
import "./CurrencyContainer.css";

const tableData = [
  {
    name: "BTC",
    status: "7,446.09"
  },
  {
    name: "XMR",
    status: "156.58"
  },
  {
    name: "AE",
    status: "3.12"
  },
  {
    name: "LTC",
    status: "118.61"
  }
];

export default class CurrencyContainer extends Component {
  constructor() {
    super();
    this.state = {
      totalPortfolioValue: "0.00"
    };
  }

  getRates = () => {
    let url =
      "https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD,JPY,EUR";

    fetch(url)
      .then(resp => console.log(resp.json()))
      .catch(error => console.log(error));
  };

  addCoin = () => {
    console.log("Added a coin");
  };

  componentWillMount() {
    this.getRates();
  }
  render() {
    const { totalPortfolioValue } = this.state;

    return (
      <div className="currency-container">
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
              <TableHeaderColumn tooltip="Your Holdings">
                HOLDINGS
              </TableHeaderColumn>
              <TableHeaderColumn tooltip="Coin Price">PRICE</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {tableData.map((row, index) => (
              <TableRow
                className="table-row"
                key={index}
                displayBorder={false}
                selectable={false}>
                <TableRowColumn>{row.name}</TableRowColumn>
                <TableRowColumn>{index}</TableRowColumn>
                <TableRowColumn>{row.status}</TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <hr />
        <div className="add-coin" onClick={this.addCoin}>
          <i className="fa fa-plus-circle" />
          <h4>ADD COIN</h4>
        </div>
      </div>
    );
  }
}
