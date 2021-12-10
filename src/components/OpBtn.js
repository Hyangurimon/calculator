import React from "react";

import classes from "./OpBtn.module.css";

const OpBtn = (props) => {
  return (
    <button
      className={classes.opBtn}
      type={props.type}
      value={props.value}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default OpBtn;
