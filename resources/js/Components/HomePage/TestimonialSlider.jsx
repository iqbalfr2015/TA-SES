import { useEffect, useRef } from "react";
import Swiper from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

export default function TestimonialSlider() {
  const swiperRef = useRef(null);

  const testimonials = [
    {
      img: "/images/testimonials/testimonials-1.jpg",
      name: "Saul Goodman",
      role: "CEO & Founder",
      text: "Proin iaculis purus consequat sem cure digni ssim donec porttitora entum suscipit rhoncus. Accusantium quam, ultricies eget id, aliquam eget nibh et. Maecen aliquam, risus at semper."
    },
    {
      img: "/images/testimonials/testimonials-2.jpg",
      name: "Sara Wilsson",
      role: "Designer",
      text: "Export tempor illum tamen malis malis eram quae irure esse labore quem cillum quid cillum eram malis quorum velit fore eram velit sunt aliqua noster fugiat irure amet legam anim culpa."
    },
    {
      img: "/images/testimonials/testimonials-3.jpg",
      name: "Jena Karlis",
      role: "Store Owner",
      text: "Enim nisi quem export duis labore cillum quae magna enim sint quorum nulla quem veniam duis minim tempor labore quem eram duis noster aute amet eram fore quis sint minim."
    },
    {
      img: "/images/testimonials/testimonials-4.jpg",
      name: "Matt Brandon",
      role: "Freelancer",
      text: "Fugiat enim eram quae cillum dolore dolor amet nulla culpa multos export minim fugiat minim velit minim dolor enim duis veniam ipsum anim magna sunt elit fore quem dolore labore illum veniam."
    },
    {
      img: "/images/testimonials/testimonials-5.jpg",
      name: "John Larson",
      role: "Entrepreneur",
      text: "Quis quorum aliqua sint quem legam fore sunt eram irure aliqua veniam tempor noster veniam enim culpa labore duis sunt culpa nulla illum cillum fugiat legam esse veniam culpa fore nisi cillum quid."
    }
  ];

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
          320: { slidesPerView: 1, spaceBetween: 40 },
          1200: { slidesPerView: 3, spaceBetween: 1 }
        }
      });
    }
  }, []);

  return (
    <div className="swiper" ref={swiperRef}>
      <div className="swiper-wrapper">
        {testimonials.map((testimonial, index) => (
          <div className="swiper-slide" key={index}>
            <div className="testimonial-item">
              <div className="stars">
                {Array(5).fill().map((_, i) => (
                  <i key={i} className="bi bi-star-fill"></i>
                ))}
              </div>
              <p>{testimonial.text}</p>
              <div className="profile mt-auto">
                <img src={testimonial.img} className="testimonial-img" alt={testimonial.name} />
                <h3>{testimonial.name}</h3>
                <h4>{testimonial.role}</h4>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="swiper-pagination"></div>
    </div>
  );
}
