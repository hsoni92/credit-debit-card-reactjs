import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  IconBuildingBank
} from '@tabler/icons-react';
import { fetchDummyData, DP, CARD_TYPE, defaultDummyData } from './API.js';
import visaImg from '../../images/visa.svg';
import mcImg from '../../images/mc.svg';
import './NeoCreditCard.less';

export default function StatusCard (props) {
  const [secureData, setCardSecureData] = useState(defaultDummyData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCardSecureData();
  }, []);

  const getCardSecureData = async (secureCode = null) => {
    setLoading(true);
    const data = await fetchDummyData(secureCode);
    setCardSecureData(data);
    setLoading(false);
  }

  const CardHeader = (props) => {
    let gatewayLogo = <img alt="logo" className="logo" src={mcImg} />;
    switch (props.type) {
      case CARD_TYPE.VISA:
        gatewayLogo = <img alt="logo" className="logo" src={visaImg} />;
        break;
      case CARD_TYPE.MC:
        gatewayLogo = <img alt="logo" className="logo" src={mcImg} />;
        break;
      default:
        break;
    }
    return (
      <div className="header">
        <div className="bank-name">
          <IconBuildingBank />
          <span>IPSUM BANK</span>
        </div>
        { gatewayLogo }
      </div>);
  }

  const CardFooter = (props) => {
    return (
      <div className="footer">
        <div>
          <div className="label">Expires</div>
          <div className="info number">{props.valid}</div>
        </div>
        <div>
          <div className="label">CVV</div>
          <div className="info number">{props.cvv}</div>
        </div>
        <div>
          <div onClick={ () => props.encrypted
            ? getCardSecureData('0357')
            : getCardSecureData('0000') }
            className={`btn ${props.encrypted ? '' : 'active'}`}
          >
            <div class="inner-wrapper">
              <i class="material-icons-round">{props.encrypted ? 'lock' : 'lock_open'}</i>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const Card = (props) => {
    return (
      <div className={`card-nc ${loading ? 'loading' : ''}`}>
        <div className="body">
          {props.children}
        </div>
      </div>);
  }

  // if (loading) {
  //   return <></>;
  // }

  let { holder, number, valid, cvv, encrypted, type } = secureData.data;

  return (
    <Card>
      <CardHeader type={type} />
      <div className="number">{number}</div>
      <div className="holder">{holder}</div>
      <CardFooter valid={valid} cvv={cvv} encrypted={encrypted} />
    </Card>
  );
}

// StatusCard.propTypes = {
//   classes: PropTypes.object.isRequired,
//   percentage: PropTypes.number.isRequired,
//   title: PropTypes.string.isRequired,
//   type: PropTypes.string.isRequired
// };