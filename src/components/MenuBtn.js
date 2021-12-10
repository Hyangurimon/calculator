import React from "react";

import classes from "./MenuBtn.module.css";

const MenuBtn = (props) => {
  return (
    <button
      className={classes.menuBtn}
      type={props.type}
      value={props.value}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default MenuBtn;
