import React from "react";
import * as api from '../Api';
import { useState, useEffect } from 'react';
import { IoIosArrowDropright } from 'react-icons/io';
import { IoIosArrowDropleft } from 'react-icons/io';
import Form from './form'
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselCaption
} from 'reactstrap';
const Slider = ({ id }) => {
  const [slidez, setSlides] = useState([]);
  const [status, setStatus] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [ defImages,setDefImages] = useState("");
  useEffect(() => {
    api.fetchSlider(id)
      .then((data) => {
        if (data.status === "success") {
          setSlides(data.response);
          setStatus(true);
          setDefImages(data.default_img);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === slidez.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? slidez.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const slides = slidez.map((data, index) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={index}
        className="mt-5"
      >
        <img src={data.img_url && data.img_url.length>0 ? (data.img_url):(defImages)} alt="slider-img??" className="sliderImages" />
        <CarouselCaption style={{ color: "red" }} captionHeader={" "} />
      </CarouselItem>
    );
  });
  return (
    <>
      <div className="mt-4 container slider" style={{ position: "relative" }}>
        <Form id={id} />
        <Carousel
          activeIndex={activeIndex}
          next={next}
          previous={previous}
          
        >
          {slides}
          
          {/* <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
          <CarouselControl direction="next" directionText="Next" onClickHandler={next} /> */}
        </Carousel>
      </div>
    </>
  )
}
export default Slider;