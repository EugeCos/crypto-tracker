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

export default class CurrencyTable extends Component {
  render() {
    const { handleDialogOpen, tableContentJSX, addCoin } = this.props;
    return (
      <div>
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
              <TableHeaderColumn tooltip="Trade Coins">
                BUY / SELL
              </TableHeaderColumn>
              <TableHeaderColumn tooltip="Delete Coin">
                DELETE COIN
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>{tableContentJSX}</TableBody>
        </Table>
        <hr />
        <div className="add-coin" onClick={handleDialogOpen}>
          <i className="fa fa-plus-circle" />
          <h4>ADD COIN</h4>
        </div>
      </div>
    );
  }
}
