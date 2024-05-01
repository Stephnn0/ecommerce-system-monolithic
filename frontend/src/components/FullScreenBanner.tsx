import React from "react";

interface FullScreenBannerProps {
  imageUrl: string;
}

const FullScreenBanner: React.FC<FullScreenBannerProps> = ({ imageUrl }) => {
  return (
    <div className="relative h-100 overflow-hidden">
      <img
        src={imageUrl}
        alt="Banner"
        className="w-full h-100 object-cover object-center"
        style={{ minWidth: "100%", minHeight: "100%" }}
      />
    </div>
  );
};

export default FullScreenBanner;
