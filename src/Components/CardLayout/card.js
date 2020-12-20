import React from 'react';
import PropTypes from 'prop-types';
import visaImg from '../../images/visa.svg';
import passwordImg from '../../images/password.svg';
import bankImg from '../../images/bank.svg';
import closeImg from '../../images/close.svg';
import loginImg from '../../images/arrow-right.svg';
import decryptingImg from '../../images/decrypting.svg';
import './card.css';

class StatusCard extends React.Component {
  state = {
    showPINInput: false,
    password: ''
  }

  showPIN = () => {
    this.setState({
      showPINInput: true
    });
  }

  hidePIN = () => {
    this.setState({
      showPINInput: false
    });
  }

  enterPassword = (e) => {
    this.setState({
      password: e.target.value
    });
  }

  handleEnter = (e) => {
    if (e.key === 'Enter') {
      this.props.retrieveCardData(this.state.password)
    }
  }

  render() {
    let { holderName, cardNumber, validThru, cvv, retrieveCardData, decrypting, isValidPassword } = this.props;
    const { showPINInput, password } = this.state;

    return (
      <div className="card">

        {/* Unlock Overlay */}
        {!showPINInput && !isValidPassword && <div className="lock-overlay">
          <div className="outer-most ring">
            <div className="outer ring">
              <div className="inner ring">
                <button onClick={this.showPIN}>
                  <img src={passwordImg} />
                </button>
              </div>
            </div>
          </div>
        </div>}
        {showPINInput && !isValidPassword && <div className="pin-overlay">
          <div className="password-input">
          {!decrypting && <div onClick={this.hidePIN} className="img-container">
              <img src={closeImg} />
            </div>}
            {decrypting && <img className="decrypting-loader" src={decryptingImg} />}
            {!decrypting && <input type="password" value={password} onKeyDown={ (e) => this.handleEnter(e) } onChange={ e => this.enterPassword(e) }/>}
            {!decrypting && <div className="img-container">
              <img src={loginImg} onClick={() => retrieveCardData(password)} />
            </div>}
          </div>
        </div>}

        <div className="card-body">
          <div className="card-two-col top-header">
            <div className="bank-name">
              <img src={bankImg} />
              <span>AXIS BANK</span>
            </div>
            <img className="card-logo" src={visaImg} />
          </div>
          <p className="card-numer">{cardNumber}</p>
          <div>
            <p className="card-info">{holderName}</p>
          </div>
          <div className="card-two-col">
            <div>
              <span className="card-label">Expires</span>
              <p className="card-info">{validThru}</p>
            </div>
            <div>
              <span className="card-label">CVV</span>
              <p className="card-info">{cvv}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

StatusCard.propTypes = {
  classes: PropTypes.object.isRequired,
  percentage: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

export default StatusCard;
