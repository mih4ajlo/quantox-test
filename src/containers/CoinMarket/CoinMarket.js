import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import axios from '../../axios';

import Loader from '../../components/Loader/Loader';
import PlaceHolder from '../../components/PlaceHolder';
import TableContainer from '../../components/Table/Table';


import ls from 'local-storage';

class CoinMarket extends Component {


    state = {
        all_data: [],
        error: null,
        loader: true,
        userCoins: {}
    }


    componentDidMount() {

        let ls_entry = ls.get("all_data");

        const coinsData = ls.get("userCoins")
        if (coinsData != null) {
            this.setState({
                userCoins: coinsData
            })
        }


        if (ls_entry.timestamp + 60 * 60 * 1000 < Date.now()) {

            axios.get('/listings/latest')
                .then(res => {
                    let ls_entry = {
                        "data": [],
                        "timestamp": Date.now(),
                    };

                    ls_entry.data = res.data.data
                    ls.set("all_data", ls_entry)

                    this.setState({
                        all_data: res.data.data,
                        loader: false
                    })

                })
                .catch(err => {
                    console.log(err);

                });
        } else {
            this.setState({
                all_data: ls_entry.data,
                loader: false,
            })
        }



    }

    render() {
        return (
            <div>
				{this.state.loader ? <Loader/> : null }

				<NavLink to="/details">Detalji</NavLink>

				<PlaceHolder/>
				<TableContainer data={this.state.all_data} userCoins={this.state.userCoins} />

				
			</div>
        );
    }
}


export default CoinMarket;