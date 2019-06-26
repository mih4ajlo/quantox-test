import React, { Component } from 'react';

import { NavLink } from 'react-router-dom';
import ls from 'local-storage';
import Big from 'big.js';

import './Row.scss';

class TableRow extends Component {

    state = {
        disabled: !this.props.coins,
        amountOfCoins: this.props.coins == undefined ? 0 : this.props.coins.amount,
        valueOfCoins: this.props.coins == undefined ? 0 : this.props.coins.value,
    }

    checkNumber = (ev) => {

        //should not have more than one dot and no letters (e.g. e);
        //reg = /^-?\d*\.?\d*$/

        let isBtnDisabled = false;

        if (ev.target.value.length == 0)
            isBtnDisabled = true;

        this.setState({
            disabled: isBtnDisabled,
            amountOfCoins: ev.target.value,
            valueOfCoins: this.calculateCoinValue().toFixed(2).toString(),
        })
    }

    //setting values
    handleClick = (ev) => {


        let userCoins = ls.get("userCoins");

        if (userCoins == null)
            userCoins = {};


        //value and amount of coins in that moment
        userCoins[this.props.symbol] = {
            amount: this.state.amountOfCoins,
            value: this.state.valueOfCoins,

        }

        //local storage save
        ls.set("userCoins", userCoins)


    }


    handleKeyPress = (ev) => {
        //check if enter is pressed
        if (ev.keyCode == 13) {
            this.handleClick(ev)
        }
        return false;

    }

    calculateCoinValue = () => {
        const a = new Big(+this.state.amountOfCoins || 0)
        const b = new Big(+this.props.quote.USD.price || 0)
        const z = a.times(b);

        return z;
    }

    render() {

        //floating point values operations, ieee-754 bug
        const z = this.calculateCoinValue();
        const z1 = z.toFixed(2).toString();
        const d = z.minus(this.state.valueOfCoins).toFixed(2).toString();


        const sign = Math.sign(this.props.quote.USD.percent_change_24h);
        const pos = sign == 1;
        const neg = sign == -1;

        return (
            <tr key={this.props.id} id={this.props.id}>
            <td>{this.props.ind}</td>
            <td>
              <NavLink to={"/details/" + this.props.id}>{this.props.name}</NavLink>
              
            </td>
            <td>
              {this.props.symbol}
            </td>
            <td>
              {this.props.quote.USD.price}
            </td>
            <td className={pos ? "pos" : neg ? "neg" : null}>
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
            >Submit
                </button>

            </td>
            <td>$ { z1 } </td>
            <td> </td>
          </tr>
        );
    }
}


export default TableRow;
