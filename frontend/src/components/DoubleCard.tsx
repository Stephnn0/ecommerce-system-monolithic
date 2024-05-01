// src/components/ResponsiveCard.tsx

import React from "react";

interface ResponsiveCardProps {
  imageUrl: string;
  title: string;
  description: string;
}

const DoubleCard: React.FC<ResponsiveCardProps> = ({
  imageUrl,
  description,
}) => {
  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center lg:justify-between p-8 mt-36">
      {/* Image Section */}
      <img
        src={imageUrl}
        alt="Image"
        className="rounded-lg w-full h-auto lg:w-64  lg:h-64 object-cover"
      />
      {/* Text Section */}
      <div className="mb-4 lg:mb-0 lg:mr-8 max-w-md">
        <p className="text-lg leading-relaxed text-black ">{description}</p>
      </div>
    </div>
  );
};

export default DoubleCard;
