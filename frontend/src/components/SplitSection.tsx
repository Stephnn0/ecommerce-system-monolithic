import React from "react";

interface SplitSectionProps {
  imageSrc: string;
  title: string;
  description: string;
  buttonText: string;
  imageLeft?: boolean;
}
const SplitSection: React.FC<SplitSectionProps> = ({
  imageSrc,
  title,
  description,
  imageLeft = true,
}) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center md:justify-between mt-5">
      {imageLeft ? (
        <>
          {/* Image on the left */}
          <div className="w-full md:w-1/2 p-4">
            <img src={imageSrc} alt="Image" className="w-full h-auto" />
          </div>
          {/* Text content on the right */}
          <div className="w-full md:w-1/2 p-4">
            <h2 className="text-4xl mb-4 font-extralight text-black ">
              {title}
            </h2>
            <p className="text-lg mb-4 font-extralight text-black ">
              {description}
            </p>
            {/* <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors duration-300">
              {buttonText}
            </button> */}
          </div>
        </>
      ) : (
        <>
          {/* Text content on the left */}
          <div className="w-full md:w-1/2 p-4 order-2 md:order-1">
            <h2 className="text-2xl font-bold mb-4">{title}</h2>
            <p className="text-lg mb-4">{description}</p>
            {/* <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors duration-300">
              {buttonText}
            </button> */}
          </div>
          {/* Image on the right */}
          <div className="w-full md:w-1/2 p-4 order-1 md:order-2">
            <img src={imageSrc} alt="Image" className="w-full h-auto" />
          </div>
        </>
      )}
    </div>
  );
};

export default SplitSection;
