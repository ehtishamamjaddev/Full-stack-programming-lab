import { FiTrash2 } from 'react-icons/fi';
import QuantityPicker from './QuantityPicker';
import styles from './CartItem.module.css';

function CartItem({ item, onQty, onRemove }) {
  return (
    <article className={styles.item}>
      <img src={item.image} alt={item.name} className={styles.thumb} />
      <div className={styles.info}>
        <h3>{item.name}</h3>
        <p>${item.price} each</p>
      </div>
      <QuantityPicker value={item.qty} onChange={(qty) => onQty(item.id, qty)} />
      <p className={styles.total}>${item.qty * item.price}</p>
      <button className={styles.remove} onClick={() => onRemove(item.id)} aria-label={`Remove ${item.name}`}>
        <FiTrash2 />
      </button>
    </article>
  );
}

export default CartItem;
