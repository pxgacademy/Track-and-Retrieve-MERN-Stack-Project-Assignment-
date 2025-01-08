import { Typewriter } from "react-simple-typewriter";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import bannerImg from "../../assets/banner-img.webp";
import img1 from "../../assets/img-1.avif";
import img2 from "../../assets/img-2.jpg";
import img3 from "../../assets/img-3.jpg";
import img4 from "../../assets/img-4.jpg";

const BannerOne = () => {
  return (
    <div className="w-full overflow-hidden bg-[url(./assets/banner-img.webp)]">
      <div className="w-full flex flex-col-reverse lg:flex-row gap-8">
        <div className="flex-1 flex items-center p-4 lg:p-0">
          <div className="bg-black/30 backdrop-blur-sm lg:ml-4 p-3 border border-white/40 shadow-lg">
            <div className="min-h-11">
              <span className="text-xl md:text-4xl font-bold text-white">
                <Typewriter
                  words={["FIND YOUR LOST ITEM", "SEND YOUR FOUND ITEM"]}
                  loop={false}
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1000}
                />
              </span>
            </div>
            <p className="text-white ">
              Welcome to <span className="font-semibold">Track & Retrieve</span> - the ultimate platform
              for finding and posting lost or found items. Whether you've
              misplaced something precious or discovered an item, we're here to
              help reconnect owners with their belongings. Start your search or
              create a post today and make a difference!
            </p>

            <div className="w-full mt-4 grid grid-cols-2 gap-3">
              <Link to="/addItems">
                <button className="btn w-full bg-white">LOST</button>
              </Link>
              <Link to="/addItems">
                <button className="btn w-full bg-white">FOUND</button>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <div className="w-full h-full flex items-center">
            <div className="grid grid-cols-2 p-6">
              <motion.img
                initial={{
                  y: 0,
                }}
                animate={{
                  y: [0, -30, 0],
                  transition: {
                    duration: 15,
                    repeat: Infinity,
                  },
                }}
                className="w-full h-full object-cover"
                src={img1}
                alt=""
              />
              <motion.img
                initial={{
                  y: 0,
                }}
                animate={{
                  x: [0, 30, 0],
                  transition: {
                    duration: 15,
                    repeat: Infinity,
                  },
                }}
                className="w-full h-full object-cover"
                src={img2}
                alt=""
              />
              <motion.img
                initial={{
                  y: 0,
                }}
                animate={{
                  x: [0, -30, 0],
                  transition: {
                    duration: 15,
                    repeat: Infinity,
                  },
                }}
                className="w-full h-full object-cover"
                src={img3}
                alt=""
              />
              <motion.img
                initial={{
                  y: 0,
                }}
                animate={{
                  y: [0, 30, 0],
                  transition: {
                    duration: 15,
                    repeat: Infinity,
                  },
                }}
                className="w-full h-full object-cover"
                src={img4}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerOne;
