import Lottie from "lottie-react";
import registerLottie from "../../assets/lottie/register.lottie.json";
import { useState } from "react";
import Swal from "sweetalert2";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useContextValue from "../../hooks/useContextValue";
import SocialSignin from "./SocialSignin";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const { isDark, createUser, updateUser, setUser } = useContextValue();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState(null);
  const [eye, setEye] = useState(false);

  const handleRegister = (event) => {
    event.preventDefault();
    setErrMsg(null);
    setEye(false);

    const form = event.target;

    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    const passwordTester = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{6,}$/;

    if (!passwordTester.test(password)) {
      setErrMsg(
        "Password Should be uppercase, lowercase, any symbol and at least 6 characters long."
      );
      return;
    }

    createUser(email, password)
      .then((result) => {
        setUser(result.user);
        updateUser({ displayName: name, photoURL: photo });
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Successfully created the account!",
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
        <section className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10">
          <div className="flex items-center">
            <Lottie animationData={registerLottie} />
          </div>

          <div className="flex items-center">
            <div className="max-w-lg w-full mx-auto bg-white dark:bg-darkThree shadow-lg p-5 border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-semibold text-center mb-5">
                REGISTER
              </h3>

              <SocialSignin text="Register with Google" state={state} />

              <form onSubmit={handleRegister}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="name"
                    name="name"
                    className="input input-bordered"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Photo URL</span>
                  </label>
                  <input
                    type="url"
                    placeholder="photo"
                    name="photo"
                    className="input input-bordered"
                    required
                  />
                </div>

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

                  {errMsg && (
                    <label className="text-error inline-block mt-2">
                      {errMsg}
                    </label>
                  )}
                </div>

                <div className="form-control mt-6">
                  <button className="btn btn-primary text-white">
                    Register
                  </button>
                </div>
              </form>

              <div className="mt-3">
                <p>
                  Already have an account?{" "}
                  <Link state={state} to="/signIn" className="text-info">
                    Signin
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

export default Register;
