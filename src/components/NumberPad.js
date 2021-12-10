import React from "react";

import classes from "./NumberPad.module.css";

import NumberBtn from "./NumberBtn";
import ZeroBtn from "./ZeroBtn";
import OpBtn from "./OpBtn";
import MenuBtn from "./MenuBtn";

const NumberPad = (props) => {
  const calculationHandler = (event) => {
    event.preventDefault();
    props.onCalculateClicked();
  };

  const inputHandler = (event) => {
    props.onInputClicked(event.target.value);
  };

  return (
    <div className={classes.row}>
      <form onSubmit={calculationHandler}>
        <div>
          <MenuBtn type="button" value="AC" onClick={inputHandler}>
            {props.ac}
          </MenuBtn>
          <MenuBtn type="button" value="invert" onClick={inputHandler}>
            +/-
          </MenuBtn>
          <MenuBtn type="button" value="%" onClick={inputHandler}>
            %
          </MenuBtn>
          <OpBtn type="button" value="/" onClick={inputHandler}>
            ÷
          </OpBtn>
        </div>
        <div className={classes.row}>
          <NumberBtn type="button" value="7" onClick={inputHandler}>
            7
          </NumberBtn>
          <NumberBtn type="button" value="8" onClick={inputHandler}>
            8
          </NumberBtn>
          <NumberBtn type="button" value="9" onClick={inputHandler}>
            9
          </NumberBtn>
          <OpBtn type="button" value="*" onClick={inputHandler}>
            ×
          </OpBtn>
        </div>
        <div className={classes.row}>
          <NumberBtn type="button" value="4" onClick={inputHandler}>
            4
          </NumberBtn>
          <NumberBtn type="button" value="5" onClick={inputHandler}>
            5
          </NumberBtn>
          <NumberBtn type="button" value="6" onClick={inputHandler}>
            6
          </NumberBtn>
          <OpBtn type="button" value="-" onClick={inputHandler}>
            -
          </OpBtn>
        </div>
        <div className={classes.row}>
          <NumberBtn type="button" value="1" onClick={inputHandler}>
            1
          </NumberBtn>
          <NumberBtn type="button" value="2" onClick={inputHandler}>
            2
          </NumberBtn>
          <NumberBtn type="button" value="3" onClick={inputHandler}>
            3
          </NumberBtn>
          <OpBtn type="button" value="+" onClick={inputHandler}>
            +
          </OpBtn>
        </div>
        <div className={classes.row}>
          <ZeroBtn type="button" value="0" onClick={inputHandler}>
            0
          </ZeroBtn>
          <NumberBtn type="button" value="." onClick={inputHandler}>
            .
          </NumberBtn>
          <OpBtn type="submit">=</OpBtn>
        </div>
      </form>
    </div>
  );
};

export default NumberPad;
