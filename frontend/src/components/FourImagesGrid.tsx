import React from "react";

interface ImageData {
  id: number;
  imageUrl: string;
  altText: string;
}

interface FourImageGridProps {
  images: ImageData[];
}

const FourImageGrid: React.FC<FourImageGridProps> = ({ images }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 p-2">
      {images.map((image) => (
        <div key={image.id} className="relative overflow-hidden rounded-md">
          <img
            src={image.imageUrl}
            alt={image.altText}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  );
};

export default FourImageGrid;
