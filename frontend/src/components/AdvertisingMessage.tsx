import React from "react";

interface AdvertisingMessageProps {
  message: string;
}

const AdvertisingMessage: React.FC<AdvertisingMessageProps> = ({ message }) => {
  return (
    <div className="bg-green-500 p-2 z-24">
      <div className="h-15">
        <p className="text-white">{message}</p>
      </div>
    </div>
  );
};

export default AdvertisingMessage;
