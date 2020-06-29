import "./Jackpot.scss";
import React from "react";

export const Jackpot = (props : { amount: number }) => {
  const { amount } = props;
  return (
    <div className="jackpot">
      <div className="jackpot__container">
        <span className="amount">{currencyFormat(amount)}</span>
      </div>
    </div>
  );
}

function currencyFormat(amount: number) {
  return new Intl.NumberFormat('en-UK', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 2
  }).format(amount)
}

export default Jackpot;
