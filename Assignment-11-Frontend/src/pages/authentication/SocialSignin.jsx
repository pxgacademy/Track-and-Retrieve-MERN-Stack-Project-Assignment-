import PropTypes from "prop-types";
import icon_Google from "/icon-google.png";
import Swal from "sweetalert2";
import useContextValue from "../../hooks/useContextValue";
import { useNavigate } from "react-router-dom";

const SocialSignin = ({ text, state }) => {
  const { googleSignIn, setUser } = useContextValue();
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        setUser(result.user);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Successfully signed in",
          showConfirmButton: false,
          timer: 2000,
        });
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
    <>
      <div>
        <button
          onClick={handleGoogleSignIn}
          className="btn btn-ghost border hover:bg-gray-100 dark:hover:bg-gray-800 border-gray-300 dark:border-gray-600 w-full"
        >
          <img src={icon_Google} alt="icon" />
          {text}
        </button>
      </div>

      <div className="divider">Or continue with</div>
    </>
  );
};

SocialSignin.propTypes = {
  text: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
};

export default SocialSignin;
