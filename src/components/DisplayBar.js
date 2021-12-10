import React from "react";

//import { Textfit } from "react-textfit";
import classes from "./DisplayBar.module.css";

const DisplayBar = (props) => {
  return (
    <div className={classes.display}>
      {props.calculated === "" && props.display}
      {props.calculated !== "" && props.calculated}
    </div>
  );
};

export default DisplayBar;
