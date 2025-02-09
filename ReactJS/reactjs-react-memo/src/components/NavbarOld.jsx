import React from 'react';

const Navbar = ({ cartCount }) => {
  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '10px',gap:"50px" }}>
      <div>My E-commerce Store</div>
      <div>
        🛒 Cart: <strong>{cartCount}</strong>
      </div>
    </nav>
  );
};

export default Navbar;
