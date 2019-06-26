import React, { Component } from 'react';

import axios from '../../axios';
import Loader from '../../components/Loader/Loader';

import ls from 'local-storage';

import './Details.scss'

class Details extends Component {

    state = {
        data: null,
        info_data: null,
        loader: true
    }

    componentDidMount() {

        let promise1 = axios.get("/quotes/latest?id=" + this.props.match.params.id);
        let promise2 = axios.get("/info?id=" + this.props.match.params.id);


        Promise.all([promise1, promise2])
            .then((resp) => {

                this.setState({
                    data: Object.values(resp[0].data.data)[0],
                    info_data: Object.values(resp[1].data.data)[0],
                    loader: false
                })


            })
            .catch((err) => {

            })


    }

    render() {



        if (this.state.loader)
            return <Loader></Loader>;

        const temp_data = this.state.data;

        const id = temp_data.id;
        const name = temp_data.name;
        const symbol = temp_data.symbol;
        const slug = temp_data.slug;
        const circulating_supply = temp_data.circulating_supply;
        const total_supply = temp_data.total_supply;
        const max_supply = temp_data.max_supply;
        const date_added = temp_data.date_added;
        const num_market_pairs = temp_data.num_market_pairs;
        const tags = temp_data.tags;
        const platform = temp_data.platform;
        const cmc_rank = temp_data.cmc_rank;
        const last_updated = temp_data.last_updated;
        const quote = temp_data.quote;

        const quote_last_updated = quote.USD.last_updated;
        const quote_market_cap = quote.USD.market_cap;
        const quote_percent_change_1h = quote.USD.percent_change_1h;
        const quote_percent_change_24h = quote.USD.percent_change_24h;
        const quote_percent_change_7d = quote.USD.percent_change_7d;
        const quote_price = quote.USD.price;
        const quote_volume_24h = quote.USD.volume_24h;


        console.log(platform);

        return (
            <React-Fragment>
                
                <h2>Quantox market test</h2>
                <div className="detailsContainer">
                <div className="detailsContainer_entry_1">                    
                    { /*<div>Coin: {name} ({symbol})</div>*/ }
                    <div>
                        <img src={this.state.info_data.logo} alt="logo"/>
                    </div>
                    <div>{this.state.info_data.description}</div>
                    
                </div>
                <div className="detailsContainer_entry_2">
                    <div>Max supply:{max_supply}</div>
                    <div>Circulating Supply:{circulating_supply}</div>
                    <div>Total supply:{total_supply}</div>
                    
                </div>
                

                
                <div className="detailsContainer_entry_3">
                    <div>Tags:{tags.join(" ")}</div>
                    <div>Platform: {platform == undefined ? "" : platform.name }</div>
                    <div>Cmc rank: {cmc_rank}</div>
                    <div>Num market pairs:{num_market_pairs}</div>
                </div>

                
                <div className="coinValueDetails">
                   
                    <ul>
                        
                        <li>
                            <div>Last updated:{new Date(quote_last_updated).toLocaleDateString("en-US")}</div>
                            <div>Market cap :${quote_market_cap}</div>
                        </li>
                        
                        <li>
                            <div>Change last 1h: ${quote_percent_change_1h}</div> 
                            <div>Change last 24h: ${quote_percent_change_24h}</div>
                            <div>Change last 7d: ${quote_percent_change_7d}</div>
                        </li>
                        <li>
                            <div>Quote price: $ {quote_price}</div>
                            <div>Quote volume 24h:$ {quote_volume_24h}</div>
                        </li>
                    </ul>
                    
                </div>
                
            </div>
            </React-Fragment>

        );
    }
}


export default Details;