import React from "react";

import classes from "./ZeroBtn.module.css";

const ZeroBtn = (props) => {
  return (
    <button
      className={classes.zeroBtn}
      type={props.type}
      value={props.value}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default ZeroBtn;
