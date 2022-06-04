import React from 'react';
import PropTypes from 'prop-types';
import visaImg from '../../images/visa.svg';
import bankImg from '../../images/bank.svg';
import './card.css';

class StatusCard extends React.Component {
  state = {
    showDetails: false,
  }

  revealDetailsToggle = (e) => {
    const showDetails = this.state.showDetails;
    this.setState({
      showDetails: !showDetails
    });
  }

  maskDetails = (input) => {
    if (!this.state.showDetails) {
      return input.replace(/[0-9]/g, '•');
    } else {
      return input;
    }
  }

  maskCardNumber = (input) => {
    if (!this.state.showDetails) {
      const octets = input.split(' ');
      const semioctet = `${octets[0]} ${octets[1]} ${octets[2]} `; 
      return `${semioctet.replace(/[0-9]/g, '•')} ${octets[3]}`;
    } else {
      return input;
    }
  }

  render() {
    let { holderName, cardNumber, validThru, cvv, className } = this.props;

    return (
      <div className={`card ${className}`}>
        <div className="card-body">
          <div className="card-two-col top-header">
            <div className="bank-name">
              <img src={bankImg} />
              <span>LOREM IPSUM</span>
            </div>
            <img className="card-logo" src={visaImg} />
          </div>
          <p className="card-numer">{ this.maskCardNumber(cardNumber) }</p>
          <div>
            <p className="card-info">{ holderName }</p>
          </div>
          <div className="card-two-col">
            <div>
              <span className="card-label">Expires</span>
              <p className="card-info">{ this.maskDetails(validThru) }</p>
            </div>
            <div>
              <span className="card-label">CVV</span>
              <p className="card-info">{ this.maskDetails(cvv) }</p>
            </div>
            <div>
              <div onClick={ (e) => this.revealDetailsToggle(e) } className={ `btn ${this.state.showDetails ? 'active' : '' }` }>
                <div class="inner-wrapper">
                  <i class="material-icons-round">{ this.state.showDetails ? 'lock' : 'lock_open' }</i>
                </div>
              </div>
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
