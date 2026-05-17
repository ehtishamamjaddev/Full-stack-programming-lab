const products = [
  {
    id: 1,
    title: 'TaskFlow Board',
    description: 'A lightweight project board for planning daily work.'
  },
  {
    id: 2,
    title: 'Insight Panel',
    description: 'A dashboard widget pack for real-time team metrics.'
  },
  {
    id: 3,
    title: 'Launch Kit',
    description: 'A starter UI package for SaaS product landing pages.'
  }
];

function Products() {
  return (
    <article>
      <h2>Products</h2>
      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <button type="button">Add to Cart</button>
          </div>
        ))}
      </div>
    </article>
  );
}

export default Products;
