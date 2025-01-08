import errImg from "/err-404.png";

const ErrorPage = () => {
  return (
    <section className="flex items-center justify-center w-full h-screen bg-[#F5EE31]">
      <img src={errImg} alt="" />
    </section>
  );
};

export default ErrorPage;
