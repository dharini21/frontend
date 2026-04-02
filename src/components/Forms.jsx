import { useState } from 'react';

function MyForm() {
  const [name, setName] = useState("");
  const [count, setCount] = useState(0);
  const [txt, setTxt] = useState("");

  return (
    <div>
      <form>
        <label>Enter your name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <p>Current value is: {name}</p>

        <p>Count is: {count}</p>
        <button type="button" onClick={() => setCount(count + 1)}>Increase</button>
        <button type="button" onClick={() => setCount(0)}>Reset</button>

        <label>Type here:
          <textarea onChange={(e) => setTxt(e.target.value)}></textarea>
        </label>
        <p>Current value of text area: {txt}</p>

        <button type="button" onClick={() => window.location.reload()}>
          Refresh Page
        </button>

        
      </form>
    </div>
  );
}

export default MyForm;