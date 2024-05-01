import FourImageGrid from "../components/FourImagesGrid";
import FullScreenBanner from "../components/FullScreenBanner";
import MultiCardCarousel from "../components/MultiCarousel";

const HomePage = () => {
  const imagesData = [
    {
      id: 1,
      imageUrl: "/img/2.jpeg",
      altText: "Image 1",
    },

    {
      id: 2,
      imageUrl: "/img/3.png",
      altText: "Image 2",
    },
    {
      id: 3,
      imageUrl: "/img/4.jpeg",
      altText: "Image 1",
    },
    {
      id: 4,
      imageUrl: "/img/ethnicraft-sofas.jpg",
      altText: "Image 2",
    },
  ];

  // useEffect(() => {
  //   window.scrollTo({ top: 0, behavior: "smooth" });
  // });

  return (
    <div>
      <FullScreenBanner imageUrl={"/img/banner.png"} />
      <MultiCardCarousel category={"chair"} />
      <FourImageGrid images={imagesData} />
      <MultiCardCarousel category={"chair"} />
    </div>
  );
};

export default HomePage;
