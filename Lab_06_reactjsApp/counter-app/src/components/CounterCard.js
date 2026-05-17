import { useState } from 'react';

function CounterCard() {
  const [count, setCount] = useState(0);

  const increment = () => setCount((prevCount) => prevCount + 1);
  const decrement = () => setCount((prevCount) => Math.max(0, prevCount - 1));
  const reset = () => setCount(0);

  return (
    <section className="counter-card" aria-label="Counter controls">
      <p className="label">Current Count</p>
      <p className="count" key={count}>
        {count}
      </p>

      <div className="button-row">
        <button type="button" className="btn" onClick={increment}>
          +1
        </button>
        <button
          type="button"
          className="btn"
          onClick={decrement}
          disabled={count === 0}
        >
          -1
        </button>
        <button type="button" className="btn btn-reset" onClick={reset}>
          Reset
        </button>
      </div>
    </section>
  );
}

export default CounterCard;
