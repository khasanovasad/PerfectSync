import React from 'react';

interface CardProps {
  title: string;
  percentage: string;
  distance: string;
}

const Card: React.FC<CardProps> = ({ title, percentage, distance }) => {
  return (
    <div className="bg-light-green-500 rounded-lg p-6 shadow-lg flex items-center justify-between jut m-2">
      <div className="text-left">
        <h2 className="text-16px font-semibold">{title}</h2>
        <div className="flex items-center mt-2">
          <span className="text-24px font-bold">{percentage}</span>
        </div>
      </div>
      <div className="ml-4 text-16px">{distance}</div>
    </div>
  );
};

export default Card;
