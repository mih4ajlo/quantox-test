import React, { Component } from 'react';


import TableRow from './Row/TableRow';
import HeaderRow from './Row/HeaderRow';

class Table extends Component {


    render() {

        const rows = this.props.data.map((el, ind) => {


            return (<TableRow key={ind} coinsAmount={this.props.userCoins[el.symbol]} {...el}/>);
        })

        //console.log("rows", rows);

        return (
            <div>
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