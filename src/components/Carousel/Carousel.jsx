import React, { useEffect, useState } from "react";
import axios from "axios";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { img_300, noPicture } from "../../config/config";
import "./Carousel.css";

const handleDragStart = (e) => e.preventDefault();

const Carousel = ({ id, media_type }) => {
  const [credits, setCredits] = useState([]);

  const items = credits.map((c) => (
    <div className="carouselItem" key={c.id}>
      <img
        src={c.profile_path ? `${img_300}${c.profile_path}` : noPicture}
        alt={c.name}
        onDragStart={handleDragStart}
        className="carouselItem__img"
      />
      <b className="carouselItem__txt">{c.name}</b>
    </div>
  ));

  const responsive = {
    0: { items: 3 },
    512: { items: 5 },
    1024: { items: 7 },
  };

  const fetchCredits = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${import.meta.env.VITE_APP_API_KEY}&language=en-US`
      );
      setCredits(data.cast);
    } catch (error) {
      console.error("Failed to fetch credits:", error);
    }
  };

  useEffect(() => {
    fetchCredits();
  }, [id, media_type]);

  return (
    <AliceCarousel
      mouseTracking
      infinite
      disableDotsControls
      disableButtonsControls
      responsive={responsive}
      items={items}
      autoPlay
      autoPlayInterval={1000}
      animationDuration={1500}
    />
  );
};

export default Carousel;