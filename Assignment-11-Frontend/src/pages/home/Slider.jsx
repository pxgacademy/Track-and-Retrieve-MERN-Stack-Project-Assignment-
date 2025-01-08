import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const Slider = () => {
  return (
    <Swiper
      pagination={true}
      modules={[Pagination, Autoplay]}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
      className="mySwiper w-full min-h-80 md:min-h-[450px] lg:h-[500px]"
    >
      <SwiperSlide>
        <div className="w-full h-80 md:h-[450px] lg:h-[500px] bg-[url(https://i.ibb.co.com/6DTbh8r/slider-1.jpg)] bg-center bg-no-repeat bg-cover flex items-center justify-center px-5">
          <div className="max-w-xl bg-black/30 backdrop-blur-md text-white border p-2">
            <h2 className="text-3xl font-semibold">
              Find Your Lost Belongings
            </h2>
            <h5 className="text-xl font-semibold">
              Reconnect with What Matters Most
            </h5>
            <p>
              Track & Retrieve makes it easy to post lost or found items and
              reconnect with their rightful owners. Start your search or post
              today!
            </p>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="w-full h-80 md:h-[450px] lg:h-[500px] bg-[url(https://i.ibb.co.com/mBj6MCH/slider-2.webp)] bg-center bg-no-repeat bg-cover flex items-center justify-center px-5">
          <div className="max-w-xl bg-black/30 backdrop-blur-md text-white border p-2">
            <h2 className="text-3xl font-semibold">Discover Found Treasures</h2>
            <h5 className="text-xl font-semibold">
              Helping You Bring Things Back Home
            </h5>
            <p>
              Found an item? Post it here and help someone reunite with their
              cherished belongings in just a few clicks.
            </p>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="w-full h-80 md:h-[450px] lg:h-[500px] bg-[url(https://i.ibb.co.com/VDCJX9y/slider-3.jpg)] bg-center bg-no-repeat bg-cover flex items-center justify-center px-5">
          <div className="max-w-xl bg-black/30 backdrop-blur-md text-white border p-2">
            <h2 className="text-3xl font-semibold">
              A Helping Hand for Lost & Found
            </h2>
            <h5 className="text-xl font-semibold">
              Connecting People, One Item at a Time
            </h5>
            <p>
              Whether it's documents, gadgets, or even pets, Track & Retrieve
              bridges the gap between lost and found.
            </p>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="w-full h-80 md:h-[450px] lg:h-[500px] bg-[url(https://i.ibb.co.com/MnD381f/slider-4.jpg)] bg-center bg-no-repeat bg-cover flex items-center justify-center px-5">
          <div className="max-w-xl bg-black/30 backdrop-blur-md text-white border p-2">
            <h2 className="text-3xl font-semibold">Post, Search, Reunite</h2>
            <h5 className="text-xl font-semibold">
              Your Trusted Platform for Lost & Found
            </h5>
            <p>
              Let Track & Retrieve simplify the process of locating lost items
              or returning found ones. Join our growing community today!
            </p>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default Slider;
