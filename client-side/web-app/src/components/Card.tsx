import React from 'react';

interface CardProps {
  price: string | null;
}

const Card: React.FC<CardProps> = ({ price }) => {
  return (
    price && (
      <div className="bg-light-green-500 rounded-lg p-6 shadow-lg flex items-center justify-between jut m-2">
        <div className="text-left">
          <h2 className="text-16px font-semibold">Price</h2>
        </div>
        <div className="ml-4 text-16px">{price}</div>
      </div>
    )
  );
};

export default Card;
