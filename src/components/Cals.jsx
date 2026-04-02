import React from "react";
import { useState } from "react";

export default function propertys() {

  const [display, setDisplay] = useState("0");  // ← one input box value
  const [prev, setPrev] = useState("");
  const [operator, setOperator] = useState("");
  const [fresh, setFresh] = useState(false);
  const [result, setResult] = useState(null);

  // ── number buttons 0-9 ──────────────────────────
  const handleNum = (n) => {
    if (fresh) {
      setDisplay(n);       // start fresh number
      setFresh(false);
    } else {
      setDisplay(display === "0" ? n : display + n); // add digit
    }
  };

  // ── operator buttons ────────────────────────────
  const handleOperator = (op) => {
    setPrev(display);      // save first number
    setOperator(op);       // save operator
    setFresh(true);        // next click starts new number
  };

  // ── equals button ───────────────────────────────
  const handleEquals = () => {
    const a = parseFloat(prev);
    const b = parseFloat(display);
    let res = 0;
    if (operator === "+") res = a + b;
    if (operator === "-") res = a - b;
    if (operator === "*") res = a * b;
    if (operator === "/") res = a / b;
    if (operator === "%") res = a % b;
    setDisplay(String(res));
    setResult(res);
    setFresh(true);
  };

  // ── reset button ────────────────────────────────
  const handleReset = () => {
    setDisplay("0");
    setPrev("");
    setOperator("");
    setResult(null);
    setFresh(false);
  };

  return (
    <div className="card">
      <p>ARITHMETIC OPERATIONS</p>

      {/* single input box - readOnly, numbers fill it on button click */}
      <input
        type="text"
        value={display}
        readOnly
      />
      <br /><br />

      {/* number buttons 0 to 9 */}
      <button type="button" onClick={() => handleNum("1")}>1</button>
      <button type="button" onClick={() => handleNum("2")}>2</button>
      <button type="button" onClick={() => handleNum("3")}>3</button>
      <button type="button" onClick={() => handleNum("4")}>4</button>
      <button type="button" onClick={() => handleNum("5")}>5</button>
      <button type="button" onClick={() => handleNum("6")}>6</button>
      <button type="button" onClick={() => handleNum("7")}>7</button>
      <button type="button" onClick={() => handleNum("8")}>8</button>
      <button type="button" onClick={() => handleNum("9")}>9</button>
      <button type="button" onClick={() => handleNum("0")}>0</button>
      <br /><br />

      {/* operator buttons */}
      <button type="button" onClick={() => handleOperator("+")}>ADD +</button>
      <button type="button" onClick={() => handleOperator("-")}>SUB -</button>
      <button type="button" onClick={() => handleOperator("*")}>MUL *</button>
      <button type="button" onClick={() => handleOperator("/")}>DIV /</button>
      <button type="button" onClick={() => handleOperator("%")}>MOD %</button>
      <br /><br />

      <button type="button" onClick={handleEquals}>=</button>
      <button type="button" onClick={handleReset}>RESET</button>

      <h2>RESULT = {result}</h2>
    </div>
  );
}