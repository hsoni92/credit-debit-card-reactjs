import React, { Component } from 'react';
import StatusCard from './Components/CardLayout/card';
import './App.css';

class App extends Component {
    state = {
        cardNumber: "000 090 1234 6258",
        validThru: "01/09",
        cvv: "076",
        loading: true
    };

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                loading: false
            });
        }, 700);
    }

    render() {
        const { loading, cardNumber, validThru, cvv } = this.state;
        return ( <StatusCard
            type = "visa"
            className={ loading ? "hidden" : "" }
            holderName = "HDesign In"
            cardNumber = { cardNumber }
            validThru = { validThru }
            cvv = { cvv }/>
        );
    }
}

export default App;