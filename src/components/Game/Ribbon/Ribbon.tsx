import React from "react";
import PropTypes from "prop-types";
import "./Ribbon.scss";

const Ribbon = (props : { type: string }) => {
  const { type } = props;
  return (
    <div className="ribbon">
      <span className="ribbon__label">{type}</span>
    </div>
  );
}

Ribbon.propTypes = {
  type: PropTypes.string,
};

export default Ribbon;
