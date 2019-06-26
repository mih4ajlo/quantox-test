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


    constructor(props) {
        super(props)

        //check every hour
        setInterval(this.getData, 60 * 60 * 1000)
    }

    getData = () => {
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

                //update data stored

            })
            .catch(err => {
                console.log(err);

            });
    }

    componentDidMount() {

        let ls_entry = ls.get("all_data");

        const coinsData = ls.get("userCoins")
        if (coinsData != null) {
            this.setState({
                userCoins: coinsData
            })
        }

        //if data is somehow older then hour, get them again
        if (ls_entry.timestamp + 60 * 60 * 1000 < Date.now()) {
            this.getData();

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

				<h2>Quantox market test</h2>

				
				<TableContainer data={this.state.all_data} userCoins={this.state.userCoins} />

				
			</div>
        );
    }
}


export default CoinMarket;