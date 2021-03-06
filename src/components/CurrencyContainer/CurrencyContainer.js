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
import Paper from "material-ui/Paper";
import Dialog from "material-ui/Dialog";

// ---------CSS---------
import "./CurrencyContainer.css";

// -----------FRONT-END API-----------
import api from "../../api";

// ----------COMPONENTS----------
import CurrencyTable from "./CurrencyTable/CurrencyTable";
import SelectedCoinPage from "./SelectedCoinPage/SelectedCoinPage";
import AddCoinDialog from "../AddCoinDialog/AddCoinDialog";

export default class CurrencyContainer extends Component {
  constructor() {
    super();
    this.state = {
      currencyArray: ["BTC", "ETH", "XMR", "ZEC"],
      totalPortfolioValue: 0,
      dialogOpen: false,
      allCoins: [],
      exchangeRates: [],
      holdings: [],
      selectedCoin: false,
      selectedCoinIndex: 0
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

    this.setState({ exchangeRates }, () => this.createHoldings());
  };

  createHoldings = () => {
    const { holdings, exchangeRates } = this.state;

    if (holdings.length === 0) {
      for (let i = 0; i < exchangeRates.length; i++) {
        holdings.push({
          numberOfCoins: 0,
          totalValue: 0
        });
      }
    }

    this.setState(
      {
        holdings
      },
      () => this.displayAvatars()
    );
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

  handleDialogOpen = () => {
    const { allCoins } = this.state;
    if (allCoins.length) {
      this.setState({
        dialogOpen: true
      });
    }
  };

  handleDialogClose = () => {
    this.setState({
      dialogOpen: false
    });
  };

  addCoin = newCoin => {
    const { currencyArray, holdings } = this.state;

    currencyArray.push(newCoin);

    holdings.push({
      numberOfCoins: 0,
      totalValue: 0
    });

    this.setState(
      {
        currencyArray,
        holdings
      },
      this.handleDialogClose(),
      this.getRates(),
      this.displayAvatars()
    );
  };

  tradeCoins = (transaction, index) => {
    const { totalPortfolioValue, holdings } = this.state,
      { numberOfCoins, totalValue } = transaction;

    let updatedPortfolio = totalPortfolioValue + totalValue,
      updatedHoldings;

    if (holdings.length) {
      updatedHoldings = Array.from(holdings);
      (updatedHoldings[index].numberOfCoins += numberOfCoins),
        (updatedHoldings[index].totalValue += totalValue);
    }

    this.setState({
      selectedCoin: false,
      totalPortfolioValue: updatedPortfolio,
      holdings: updatedHoldings
    });
  };

  selectCoin = index => {
    const { allCoins } = this.state;
    if (allCoins.length) {
      this.setState({
        selectedCoin: !this.state.selectedCoin,
        selectedCoinIndex: index
      });
    }
  };

  deleteCoin = index => {
    const { currencyArray, dialogOpen } = this.state;
    currencyArray.splice(index, 1);
    this.setState(
      {
        currencyArray
      },
      () => this.getRates()
    );
  };

  componentWillMount() {
    this.getRates();
    this.getAllCoinsAndAvatars();
  }

  componentDidMount() {
    setInterval(() => this.getRates(), 10000);
  }

  render() {
    const {
        totalPortfolioValue,
        exchangeRates,
        holdings,
        allCoins,
        dialogOpen,
        selectedCoin,
        selectedCoinIndex
      } = this.state,
      dialogStyle = {
        background: "#2f3542",
        color: "#fff",
        fontFamily: "Quicksand"
      };

    let portfolio = totalPortfolioValue.toFixed(2);

    let tableContentJSX, selectedCoinJSX, holdingJSX;
    if (exchangeRates) {
      tableContentJSX = exchangeRates.map((currency, index) => {
        if (holdings.length) {
          holdingJSX =
            holdings[index].numberOfCoins === 0 ? (
              0
            ) : (
              <span>{`${holdings[index].numberOfCoins} ${
                holdings[index].numberOfCoins === 1 ? "coin" : "coins"
              } / $ ${holdings[index].totalValue.toFixed(2)}`}</span>
            );
        } else {
          holdingJSX = 0;
        }

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
            <TableRowColumn>{holdingJSX}</TableRowColumn>
            <TableRowColumn>{currency.rateToUSD}</TableRowColumn>
            <TableRowColumn className="buy-sell-button">
              <i
                className="fa fa-plus"
                onClick={() => this.selectCoin(index)}
              />
            </TableRowColumn>
            <TableRowColumn className="delete-button">
              <i
                className="fa fa-trash-o"
                onClick={() => this.deleteCoin(index)}
              />
            </TableRowColumn>
          </TableRow>
        );
      });
    }

    selectedCoinJSX = selectedCoin ? (
      <SelectedCoinPage
        myCoins={exchangeRates}
        tradeCoins={this.tradeCoins}
        selectCoin={this.selectCoin}
        index={selectedCoinIndex}
        deleteCoin={this.deleteCoin}
      />
    ) : (
      <CurrencyTable
        handleDialogOpen={this.handleDialogOpen}
        tableContentJSX={tableContentJSX}
        addCoin={this.addCoin}
      />
    );

    return (
      <Paper className="currency-container" zDepth={5}>
        <h3>My Portfolio</h3>
        <hr />
        <div className="total-value-line">
          <h4>
            Total Portfolio Value:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>
              $&nbsp;{portfolio}&nbsp;Usd
            </strong>
          </h4>
        </div>
        {selectedCoinJSX}
        <Dialog
          title="Add a Coin"
          modal={true}
          open={dialogOpen}
          titleStyle={dialogStyle}
          bodyStyle={dialogStyle}>
          <AddCoinDialog
            allCoins={allCoins}
            handleDialogClose={this.handleDialogClose}
            addCoin={this.addCoin}
          />
        </Dialog>
      </Paper>
    );
  }
}
