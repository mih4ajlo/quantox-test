import React, { Component } from 'react';

import ls from 'local-storage';

class TableRow extends Component {


    state={
        disabled: true,
        value: 0
    }

    checkNumber = (ev) => {
        let isBtnDisabled = false;

        if (ev.target.value.length == 0)
            isBtnDisabled = true;

        this.setState({
            disabled: isBtnDisabled,
            value: ev.target.value
        })
    }

    handleClick = (ev) => {


        let userCoins = ls.get("userCoins");

        if (userCoins == null)
            userCoins = {};

        userCoins[this.props.symbol] = this.state.value;

        ls.set("userCoins", userCoins)

        alert("ev")
        console.log(this.props);

    }

    render() {


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
            value={this.props.coinsAmount}
            />

            <button
            disabled={this.state.disabled}
            onClick={this.handleClick}>Submit</button>
          </td>
          <td>$ value my coins </td>
        </tr>
        );
    }
}


export default TableRow;
