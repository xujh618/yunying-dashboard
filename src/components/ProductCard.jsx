import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-48 bg-gray-200 flex items-center justify-center">
        <img 
          src={product.image} 
          alt={product.title} 
          className="max-h-full max-w-full object-contain"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
        <p className="text-gray-600 text-sm mb-4">{product.description}</p>
        <div className="flex justify-between items-center">
          <div className="text-sm">
            <span className="font-medium">访问量：</span>
            <span>{product.visitCount}</span>
          </div>
          <a 
            href={product.link} 
            className="text-blue-600 hover:text-blue-800"
          >
            查看详情 →
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
