import React from 'react';

const Stock = ({ product }) => {
  return (
    <>
      {product.quantity > 0 ? (
        <span className="bg-yellow-100 text-yellow-600 rounded-full inline-flex items-center justify-center px-2 py-1 text-xs font-semibold mt-2 font-serif">
          In Stock
        </span>
      ) : (
        <span className="bg-red-100 text-red-600 rounded-full inline-flex items-center justify-center px-2 py-1 text-xs font-semibold font-serif mt-2">
          Stock Out
        </span>
      )}
    </>
  );
};

export default Stock;
