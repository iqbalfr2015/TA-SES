import { useEffect, useRef } from "react";
import Swiper from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

const clients = [
  "/images/clients/client-1.png",
  "/images/clients/client-2.png",
  "/images/clients/client-3.png",
  "/images/clients/client-4.png",
  "/images/clients/client-5.png",
  "/images/clients/client-6.png",
  "/images/clients/client-7.png",
  "/images/clients/client-8.png"
];

export default function ClientSlider() {
  const swiperRef = useRef(null);

  useEffect(() => {
    if (swiperRef.current) {
      new Swiper(swiperRef.current, {
        modules: [Pagination, Autoplay],
        loop: true,
        speed: 600,
        autoplay: {
          delay: 5000
        },
        slidesPerView: "auto",
        pagination: {
          el: ".swiper-pagination",
          type: "bullets",
          clickable: true
        },
        breakpoints: {
          320: { slidesPerView: 2, spaceBetween: 40 },
          480: { slidesPerView: 3, spaceBetween: 60 },
          640: { slidesPerView: 4, spaceBetween: 80 },
          992: { slidesPerView: 6, spaceBetween: 120 }
        }
      });
    }
  }, []);

  return (
    <div className="swiper" ref={swiperRef}>
      <div className="swiper-wrapper align-items-center">
        {clients.map((client, index) => (
          <div className="swiper-slide" key={index}>
            <img src={client} className="img-fluid" alt={`Client ${index + 1}`} />
          </div>
        ))}
      </div>
      <div className="swiper-pagination"></div>
    </div>
  );
}