import { useEffect } from "react";
import useContextValue from "../../hooks/useContextValue";
import { IoSunny } from "react-icons/io5";
import { IoMdMoon } from "react-icons/io";
import { Link, NavLink } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import Swal from "sweetalert2";
import { Tooltip } from "react-tooltip";

const Navbar = () => {
  const { isDark, setIsDark, user, signOutUser } = useContextValue();

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    const isDarkMode = theme === "true";
    setIsDark(isDarkMode);
    document.documentElement.setAttribute(
      "data-theme",
      isDarkMode ? "dark" : "light"
    );
  }, [setIsDark]);

  const toggleDarkMode = () => {
    const theme = !isDark;
    setIsDark(theme);
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute(
      "data-theme",
      theme ? "dark" : "light"
    );
  };

  // Signout User
  const handleSignOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to sign out?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, sign me out!",
    }).then((result) => {
      if (result.isConfirmed) {
        signOutUser()
          .then(() =>
            Swal.fire({
              title: "Successfully Signout",
              icon: "success",
              showConfirmButton: false,
              position: "center",
              timer: 2000,
            })
          )
          .catch((err) =>
            Swal.fire({
              title: err.message,
              icon: "error",
            })
          );
      }
    });
  };

  //   =======================================================

  const links = (
    <>
      <NavLink to="/">
        <button>Home</button>
      </NavLink>

      <NavLink to="/allItems">
        <button>Lost & Found items</button>
      </NavLink>
    </>
  );

  return (
    <nav>
      <div className="navbar bg-transparent p-0 border-b border-base-300">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="mr-3 lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="flex flex-col gap-2 dropdown-content bg-base-100 z-[1] mt-3 w-52 p-2 shadow-lg border border-gray-200 dark:border-gray-700 *:bg-base-200 *:p-2"
            >
              {links}
            </ul>
          </div>
          <h2 className="text-xl md:text-2xl font-semibold">
            <Link to="/">Track & Retrieve</Link>
          </h2>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="flex items-center gap-2">{links}</ul>
        </div>
        <div className="navbar-end">
          <div className="mr-4">
            <button
              onClick={toggleDarkMode}
              className="btn btn-circle btn-ghost hover:bg-gray-100 dark:hover:bg-darkTwo text-2xl"
            >
              {isDark ? <IoSunny /> : <IoMdMoon />}
            </button>
          </div>

          {!user ? (
            <div>
              <Link to="/signin">
                <button className="bg-accent hover:bg-info text-white py-2 px-4 rounded-full">
                  Signin
                </button>
              </Link>
            </div>
          ) : (
            <>
              <button
                onClick={handleSignOut}
                className="btn mr-3 hidden md:block"
              >
                Signout
              </button>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div data-tooltip-id="username" className="w-10 rounded-full">
                    {user?.photoURL ? (
                      <img alt="User" src={user?.photoURL} />
                    ) : (
                      <span className="w-full h-full flex items-center justify-center text-2xl">
                        <FaUser />
                      </span>
                    )}
                    <Tooltip
                      style={{
                        backgroundColor: "#ddd",
                        color: "#000",
                        fontSize: "18px",
                        zIndex: 999,
                      }}
                      id="username"
                      content={user?.displayName || user?.email}
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-md dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <Link to="my-profile" className="justify-between">
                      Profile
                      <span className="badge">New</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/addItems">Add Lost or Found Item</Link>
                  </li>
                  <li>
                    <Link to="/allRecovered">All Recovered Items</Link>
                  </li>
                  <li>
                    <Link to="/myItems">Manage My Items</Link>
                  </li>
                  <li className="md:hidden">
                    <a onClick={handleSignOut}>Signout</a>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
