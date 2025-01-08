import { Link, useLocation, useNavigate } from "react-router-dom";
import useContextValue from "../../hooks/useContextValue";
import Lottie from "lottie-react";
import SignInLottie from "../../assets/lottie/login.lottie.json";
import Swal from "sweetalert2";
import SocialSignin from "./SocialSignin";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Signin = () => {
  const { isDark, signInUser, setUser } = useContextValue();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [eye, setEye] = useState(false);

  const handleSignIn = (event) => {
    event.preventDefault();
    setEye(false);

    const email = event.target.email.value;
    const password = event.target.password.value;

    signInUser(email, password)
      .then((result) => {
        setUser(result.user);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Successfully Signin!",
          showConfirmButton: false,
          timer: 2000,
        });
        event.target.reset();
        navigate(state || "/");
      })
      .catch((err) =>
        Swal.fire({
          title: err.message,
          icon: "error",
        })
      );
  };

  return (
    <section className={`${isDark && "dark"}`}>
      <section className="max-w-screen-2xl mx-auto bg-white dark:bg-darkThree text-darkTwo dark:text-lightTwo pt-10 pb-16 px-5">
        <section className="max-w-7xl mx-auto grid lg:grid-cols-2">
          <div className="flex items-center justify-center">
            <Lottie animationData={SignInLottie} />
          </div>

          <div className="flex items-center">
            <div className="max-w-lg w-full mx-auto bg-white dark:bg-darkThree shadow-lg p-5 border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-semibold text-center mb-5">
                SIGN IN
              </h3>

              <SocialSignin text="Sign in with Google" state={state} />

              <form onSubmit={handleSignIn}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="email"
                    name="email"
                    className="input input-bordered"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>

                  <label className="input input-bordered flex items-center gap-2">
                    <input
                      type={`${eye ? "text" : "password"}`}
                      className="grow"
                      name="password"
                      placeholder="Password"
                      required
                    />
                    <label>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setEye(!eye);
                        }}
                      >
                        {eye ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </label>
                  </label>

                  <label className="label">
                    <button className="label-text-alt link link-hover">
                      Forgot password?
                    </button>
                  </label>
                </div>

                <div className="form-control mt-6">
                  <button className="btn btn-primary text-white">
                    Sign in
                  </button>
                </div>
              </form>

              <div className="mt-3">
                <p>
                  Do not have an account?{" "}
                  <Link state={state} to="/register" className="text-info">
                    Register
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </section>
    </section>
  );
};

export default Signin;
