import React, { Component } from 'react';

import ls from 'local-storage';
import Big from 'big.js';

class TableRow extends Component {

    state = {
        disabled: !this.props.coinsAmount,
        amountOfCoins: this.props.coinsAmount || 0,
        valueOfCoins: 0,
    }

    checkNumber = (ev) => {
        let isBtnDisabled = false;

        if (ev.target.value.length == 0)
            isBtnDisabled = true;

        this.setState({
            disabled: isBtnDisabled,
            amountOfCoins: ev.target.value,
            valueOfCoins: 0,
        })
    }

    handleClick = (ev) => {


        let userCoins = ls.get("userCoins");

        if (userCoins == null)
            userCoins = {};

        userCoins[this.props.symbol] = this.state.value;

        ls.set("userCoins", userCoins)


    }

    handleKeyPress=(ev) => {
        //check if enter is pressed
        if (ev.keyCode == 13) {
            this.handleClick(ev)
        }

    }

    render() {

        const a = new Big(this.state.amountOfCoins)
        const b = new Big(this.props.quote.USD.price)
        const z = a.times(b).toFixed(2).toString();

        return (
            <tr key={this.props.id} id={this.props.id}>
          <td>
            {this.props.name}
          </td>
          <td>
            {this.props.symbol}
          </td>
          <td>
            {this.props.quote.USD.price}
          </td>
          <td>
            {this.props.quote.USD.percent_change_24h}

          </td>
          <td>
            <input
            type="number"
            onChange={this.checkNumber}
            placeholder="my value"
            value={this.state.amountOfCoins}
            onKeyDown={this.handleKeyPress}
            />

            <button
            disabled={this.state.disabled}
            onClick={this.handleClick}
            >Submit</button>
          </td>
          <td>$ { z } </td>
        </tr>
        );
    }
}


export default TableRow;
