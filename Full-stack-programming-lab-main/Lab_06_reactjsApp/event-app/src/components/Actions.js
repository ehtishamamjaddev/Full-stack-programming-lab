import { useMemo, useState } from 'react';

const palette = ['#ffffff', '#f8fafc', '#f1f5f9', '#eff6ff', '#e8f0fe'];

function Actions() {
  const [message, setMessage] = useState('');
  const [colorIndex, setColorIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const backgroundColor = useMemo(() => palette[colorIndex], [colorIndex]);

  const showMessage = () => {
    setMessage('Hello from the Event App. Events are working perfectly.');
  };

  const changeBackground = () => {
    setColorIndex((prevIndex) => (prevIndex + 1) % palette.length);
  };

  const showAlert = () => {
    alert('Alert triggered with onClick.');
  };

  return (
    <section
      className="event-card"
      style={{ backgroundColor }}
      aria-label="Event handling playground"
    >
      <h2
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
        style={{ color: isHovered ? 'var(--accent)' : 'var(--text)' }}
      >
        Interactive Events
      </h2>

      <div className="button-grid">
        <button type="button" className="btn" onClick={showMessage}>
          Show Message
        </button>
        <button type="button" className="btn" onClick={changeBackground}>
          Change Background
        </button>
        <button type="button" className="btn btn-outline" onClick={showAlert}>
          Show Alert
        </button>
      </div>

      <p className={`message ${message ? 'visible' : ''}`}>{message || ' '}</p>
    </section>
  );
}

export default Actions;
