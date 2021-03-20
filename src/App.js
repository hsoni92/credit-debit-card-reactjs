import React, { Component } from 'react';
import StatusCard from './Components/CardLayout/card';
import './App.css';

class App extends Component {
    state = {
        cardNumber: "000 090 1234 6258",
        validThru: "01/09",
        cvv: "076",
    };

    render() {
        const { cardNumber, validThru, cvv, decrypting, isValidPassword } = this.state;
        return ( <
            StatusCard isValidPassword = { isValidPassword }
            decrypting = { decrypting }
            type = "visa"
            holderName = "HDesign In"
            cardNumber = { cardNumber }
            validThru = { validThru }
            cvv = { cvv }
            />
        );
    }
}

export default App;