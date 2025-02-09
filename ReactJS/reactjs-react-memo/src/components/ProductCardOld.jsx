import React from 'react';

const ProductCard = React.memo(({ product, onAdd }) => {
  console.log(`Rendered: ${product.name}`);

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
      <h2>{product.name}</h2>
      <p>${product.price}</p>
      <button onClick={() => onAdd(product)}>Add to Cart</button>
    </div>
  );
});

export default ProductCard;
