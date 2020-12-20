import React, { Component } from 'react';
import StatusCard from './Components/CardLayout/card';
import './App.css';

class App extends Component {
  state = {
    isValidPassword: false,
    decrypting: false,
    cardNumber: "•••• •••• •••• 6258",
    validThru: "••/••",
    cvv: "•••"
  };

  retrieveCardData = (password) => {
    this.setState({
      decrypting: true
    });
    setTimeout(() => {
      let isValidPassword = false;
      if (password === '1234') {
        isValidPassword = true;
      }
      this.setState({
        cardNumber: "•••• •••• 1234 6258",
        validThru: "01/09",
        cvv: "076",
        decrypting: false,
        isValidPassword
      });
    }, 3000);
  }
  render() {
    const { cardNumber, validThru, cvv, decrypting, isValidPassword } = this.state;
    return (
      <StatusCard
        retrieveCardData={this.retrieveCardData}
        isValidPassword={isValidPassword}
        decrypting={decrypting}
        type="visa"
        holderName="HDesign In"
        cardNumber={cardNumber}
        validThru={validThru}
        cvv={cvv}
      />
    );
  }
}

export default App;
