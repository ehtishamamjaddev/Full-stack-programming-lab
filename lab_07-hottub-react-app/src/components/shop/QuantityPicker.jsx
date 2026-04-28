import styles from './QuantityPicker.module.css';

function QuantityPicker({ value, onChange }) {
  return (
    <div className={styles.wrap}>
      <button onClick={() => onChange(value - 1)} aria-label="Decrease quantity">
        -
      </button>
      <span aria-live="polite">{value}</span>
      <button onClick={() => onChange(value + 1)} aria-label="Increase quantity">
        +
      </button>
    </div>
  );
}

export default QuantityPicker;
