import React, { Component } from 'react';

import axios from '../../axios'


class Details extends Component {

    state = {
        data: null
    }

    componentDidMount() {
        console.log("koji sve", this.props.match.params);
        axios.get("/quotes/latest?id=" + this.props.match.params.id)
            .then((resp) => {
                //console.log("single datum", Object.values(resp.data.data)[0]);
                this.setState({
                    data: Object.values(resp.data.data)[0]
                })
            })
            .catch((err) => {

            })
    }

    render() {

        let la = "";
        debugger
        if (!!this.state.data) {
            la = [...Object.values(this.state.data)].reduce((el, prev = "") => {
                return prev += " " + el;
            });
        }

        console.log(la);
        return (
            <div>Details state {la }</div>
        );
    }
}


export default Details;