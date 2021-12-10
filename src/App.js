import React, { useState } from "react";

import Wrapper from "./components/Wrapper";
import DisplayBar from "./components/DisplayBar";
import NumberPad from "./components/NumberPad";

// Functions:
// Handle weird round-off errors (use decimal.js maybe?)
// eg1. 3.2 + 1.6 * 1.6 = 5.76.......weird outcome - fixed, but now eg3 is weird
// eg2. 1.5 - 2.3 * 1.2 = -1.26.......weird outcome - fixed, but now eg3 is weird
// eg3. 7 / 3 = 2.333 and not 2.333333333333

// Make percent work

// If operation is clicked multiple times, make only last one count

// If equals is clicked multiple times, handle
// everytime equals is pressed, make it repeat calculation using last operation and last num (secondNum)
// firstNum is updated with result of first calculation
// 3 + 2 = 5, press = again, 5 + 2 = 7, press = again, 7 + 2 = 9 and so on

// -----2*3 gives error, needs fixing (multiple signs before firstNum, only make the last one count (only if "-"))

// Visuals:
// 1. output to right (align right)
// 2. Whenever button is pressed/clicked, make number on displayBar flash once
// 3. Make displayBar decrease text size if number is too big (use textFit maybe?)
// 4. change to ipad size (100%)

function App() {
  const [ac, setAC] = useState("AC");
  const [firstNum, setFirstNum] = useState("");
  const [operation, setOperation] = useState("");
  const [secondNum, setSecondNum] = useState("");
  const [tempOperation, setTempOperation] = useState("");
  const [tempNum, setTempNum] = useState("");
  const [calculated, setCalculated] = useState("");
  const [display, setDisplay] = useState("0");

  // Function handling actual calculations
  const calculateFunc = (firstNum, operation, secondNum) => {
    if (operation === "+") {
      return parseFloat(firstNum) + parseFloat(secondNum);
    } else if (operation === "-") {
      return parseFloat(firstNum) - parseFloat(secondNum);
    } else if (operation === "*") {
      return parseFloat(firstNum) * parseFloat(secondNum);
    } else {
      return parseFloat(firstNum) / parseFloat(secondNum);
    }
  };

  const inputClickedHandler = (inputVal) => {
    if (inputVal === "AC") {
      // If AC, reset everything
      setAC("AC");
      setFirstNum("");
      setOperation("");
      setSecondNum("");
      setTempOperation("");
      setTempNum("");
      setCalculated("");
      setDisplay("0");
    } else if (inputVal === "invert") {
      // If invert, invert firstNum or secondNum
      if (firstNum !== "" && secondNum === "") {
        let newFirstNum = "";
        setFirstNum((prevFirstNum) => {
          if (prevFirstNum[0] === "-") {
            for (let i = 0; i < prevFirstNum.length; i++) {
              if (!isNaN(prevFirstNum[i])) {
                newFirstNum += prevFirstNum[i];
              }
            }
            setDisplay(newFirstNum.toLocaleString());
          } else {
            newFirstNum = "-" + prevFirstNum;
            setDisplay(newFirstNum.toLocaleString());
          }
          return newFirstNum;
        });
      } else if (firstNum !== "" && secondNum !== "") {
        let newSecondNum = "";
        setSecondNum((prevSecondNum) => {
          if (prevSecondNum[0] === "-") {
            for (let i = 0; i < prevSecondNum.length; i++) {
              if (!isNaN(prevSecondNum[i])) {
                newSecondNum += prevSecondNum[i];
              }
            }
            setDisplay(newSecondNum.toLocaleString());
          } else {
            newSecondNum = "-" + prevSecondNum;
            setDisplay(newSecondNum.toLocaleString());
          }
          return newSecondNum;
        });
      }
    } else if (firstNum === "" && inputVal === "-") {
      setFirstNum(inputVal);
    } else if (isNaN(inputVal) && inputVal !== ".") {
      if (operation === "") {
        // First operation is empty
        setOperation(inputVal);
      } else {
        // First operation exists
        if (
          (operation === "+" || operation === "-") &&
          (inputVal === "+" || inputVal === "-")
        ) {
          // First operation is + or - and second input operation is + or -
          setFirstNum(calculateFunc(firstNum, operation, secondNum));
          setOperation(inputVal);
          setSecondNum("");
          setDisplay(
            calculateFunc(firstNum, operation, secondNum).toLocaleString()
          );
        } else if (operation === "*" || operation === "/") {
          // First operation is * or / and second input operation is + or - or * or /
          setFirstNum(calculateFunc(firstNum, operation, secondNum));
          setOperation(inputVal);
          setSecondNum("");
          setDisplay(
            calculateFunc(firstNum, operation, secondNum).toLocaleString()
          );
        } else {
          // First operation is + or - and second input operation is * or /
          setTempNum(firstNum);
          setTempOperation(operation);
          setFirstNum(secondNum);
          setOperation(inputVal);
          setSecondNum("");
          setDisplay(parseFloat(secondNum).toLocaleString());
        }
      }
    } else if (operation === "") {
      // First Number
      if (firstNum === "") {
        if (inputVal === ".") {
          setFirstNum("0" + inputVal);
          setDisplay("0" + inputVal);
        } else {
          setFirstNum(inputVal);
          setDisplay(inputVal);
        }
      } else if (firstNum === "-") {
        setFirstNum((prevFirstNum) => {
          return prevFirstNum + inputVal;
        });
        setDisplay(inputVal);
      } else {
        setFirstNum((prevFirstNum) => {
          return prevFirstNum + inputVal;
        });
        if (inputVal === ".") {
          setDisplay(parseFloat(firstNum).toLocaleString() + inputVal);
        } else {
          setDisplay(parseFloat(firstNum + inputVal).toLocaleString());
        }
      }
      setAC("C");
    } else {
      // Second Number
      if (secondNum === "") {
        if (inputVal === ".") {
          setSecondNum("0" + inputVal);
          setDisplay("0" + inputVal);
        } else {
          setSecondNum(inputVal);
          setDisplay(inputVal);
        }
      } else {
        setSecondNum((prevSecondNum) => {
          return prevSecondNum + inputVal;
        });
        if (inputVal === ".") {
          setDisplay(parseFloat(secondNum).toLocaleString() + inputVal);
        } else {
          setDisplay(parseFloat(secondNum + inputVal).toLocaleString());
        }
      }
      setAC("C");
    }
  };

  const calculateClickedHandler = () => {
    if (tempOperation !== "") {
      let tempAnswer = calculateFunc(firstNum, operation, secondNum);
      setCalculated(
        calculateFunc(tempNum, tempOperation, tempAnswer).toLocaleString()
      );
    } else {
      setCalculated(
        calculateFunc(firstNum, operation, secondNum).toLocaleString()
      );
    }
  };

  return (
    <div>
      <Wrapper>
        <DisplayBar calculated={calculated} display={display} />
        <NumberPad
          ac={ac}
          onInputClicked={inputClickedHandler}
          onCalculateClicked={calculateClickedHandler}
        />
      </Wrapper>
    </div>
  );
}

export default App;
