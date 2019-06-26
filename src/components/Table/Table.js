import React, { Component } from 'react';


import TableRow from './Row/TableRow';
import HeaderRow from './Row/HeaderRow';

import './Table.scss'

class Table extends Component {

    state = {
        data: [],
        noOfRows: 50,
        pages: 2,
        currentPage: 0,
    }


    render() {

        const dataDisplay = this.props.data.slice(this.state.currentPage * this.state.noOfRows, this.state.noOfRows)

        const rows = dataDisplay.map((el, ind) => {

            return (<TableRow key={ind} ind={ind + 1} coins={this.props.userCoins[el.symbol]} {...el}/>);
        })


        return (
            <div className="tableContainer">
                <table>
                  <thead>
                    <HeaderRow/>
                    
                  </thead>

                  <tbody>
                    {rows}
                  </tbody>  
                </table>

            </div>
        );
    }


}

export default Table;