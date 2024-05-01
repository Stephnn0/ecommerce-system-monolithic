import { useEffect } from "react";
import SplitSection from "../components/SplitSection";

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  return (
    <div>
      <SplitSection
        imageSrc={"/img/banner.png"}
        title={"You can use this SplitSection"}
        description={
          "You can use this SplitSection component in your React application and pass the required props to display the split section as desired, with the option to switch positions as needed. Adjust the Tailwind CSS classes and styles"
        }
        buttonText={""}
      />
    </div>
  );
};

export default AboutPage;
