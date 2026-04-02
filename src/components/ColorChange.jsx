
import { useState } from "react";

function FavoriteColor() {
  const [color, setColor] = useState("none");

  return (
    <div className="card" >
      <p className="para">COLOR CHANGING</p>
      <h1 style={{color:color}}>My favorite color is {color}!</h1>
      <button type="button" className="blue" onClick={() => setColor("blue")}>
        Blue
      </button>
      <button type="button" className="red"onClick={() => setColor("red")}>
        Red
      </button>
      <button type="button" className="pink" onClick={() => setColor("pink")}>
        Pink
      </button>
      <button type="button" className="green" onClick={() => setColor("green")}>
        Green
      </button>
      <button type="button" className="reset" onClick={() => setColor("")}>
        RESET
      </button>
    </div>
  );
}

export default FavoriteColor;
