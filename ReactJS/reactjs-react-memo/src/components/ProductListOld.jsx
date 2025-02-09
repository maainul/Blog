import React, { useState } from 'react';
import ProductCard from './ProductCard';
import Navbar from './Navbar';  // Import Navbar here

const products = [
  { id: 1, name: 'Laptop', price: 1000 },
  { id: 2, name: 'Smartphone', price: 500 },
  { id: 3, name: 'Headphones', price: 150 }
];

const ProductList = () => {
  const [cart, setCart] = useState([]);

  const handleAddToCart = (product) => {
    setCart(prevCart => [...prevCart, product]);
  };

  return (
    <div>
      <Navbar cartCount={cart.length} />  {/* Pass cart count here */}
      
      {products.map(product => (
        <ProductCard key={product.id} product={product} onAdd={handleAddToCart} />
      ))}
    </div>
  );
};

export default ProductList;
