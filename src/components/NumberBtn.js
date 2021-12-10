import React from "react";

import classes from "./NumberBtn.module.css";

const NumberBtn = (props) => {
  return (
    <button
      className={classes.numBtn}
      type={props.type}
      value={props.value}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default NumberBtn;
