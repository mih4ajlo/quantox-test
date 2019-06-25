import React from 'react';
import logo from './logo.svg';
import './App.css';
import './style.scss';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import CoinMarket from './containers/CoinMarket/CoinMarket';
import Details from './containers/Details/Details';

function App() {
    return (
        <BrowserRouter>
          <div className="App">
        
            { /*<CoinMarket/>*/ }
            <Switch>
				
				
				<Route  path="/details/:id"  component={Details} />
				<Route  path="/" component={CoinMarket} />
                <Route render={() => <h1>Not Found</h1>}/>
			</Switch>
          </div>
        </BrowserRouter>

    );
}

export default App;