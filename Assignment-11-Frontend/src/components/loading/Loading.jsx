import Lottie from "lottie-react";
import loading_animation from "../../assets/Loading-Animation.json";

const Loading = () => {
  return (
    <section className="w-full min-h-[450px] lg:min-h-[700px] flex items-center justify-center">
      <Lottie animationData={loading_animation} />
    </section>
  );
};

export default Loading;
