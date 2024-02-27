import React, { useState, useEffect } from "react";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselCaption,
} from "reactstrap";

const items = [
  {
    src: require(`@src/assets/images/pages/banner-1.png`).default,
    altText: "Slide 1",
    caption: "Slide 1",
    key: 1,
  },
  {
    src: require(`@src/assets/images/pages/banner-3.jpeg`).default,
    altText: "Slide 2",
    caption: "Slide 2",
    key: 2,
  },
  {
    src: require(`@src/assets/images/pages/banner-1.png`).default,
    altText: "Slide 3",
    caption: "Slide 3",
    key: 3,
  },
];

function Example(props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const updateWindowSize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", updateWindowSize);
    return () => {
      window.removeEventListener("resize", updateWindowSize);
    };
  }, []);

  console.log(props?.items);

  const slides = props?.items?.map((item) => (
    <CarouselItem
      className="custom-tag"
      onExiting={() => setAnimating(true)}
      onExited={() => setAnimating(false)}
      key={item.src}
    >
      <img
        src={item.src}
        style={{ borderRadius: props?.isMobile ? 15 : 0 }}
        alt={item.altText}
      />
    </CarouselItem>
  ));

  return (
    <>
      <style>
        {`.custom-tag {
          width: ${windowSize.width - 512}px;
        }`}
      </style>
      <Carousel activeIndex={activeIndex} next={next} previous={previous}>
        {slides}
        <CarouselControl
          direction="prev"
          directionText="Previous"
          onClickHandler={previous}
        />
        <CarouselControl
          direction="next"
          directionText="Next"
          onClickHandler={next}
        />
      </Carousel>
    </>
  );
}

export default Example;
