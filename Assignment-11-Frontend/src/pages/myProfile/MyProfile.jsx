import Swal from "sweetalert2";
import useContextValue from "../../hooks/useContextValue";
import Loading from "../../components/loading/Loading";
import { useQuery } from "@tanstack/react-query";
import { useSecureAPI_Link } from "../../hooks/useAPI_Link";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const MyProfile = () => {
  const { isDark, user, updateUser } = useContextValue();

  const secureAPI_Link = useSecureAPI_Link();

  const {
    data: items,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["my_items"],
    queryFn: async () => {
      const { data } = await secureAPI_Link.get(
        `/my-items?email=${user.email}`
      );
      return data;
    },
  });

  const {
    data: recoveredItems,
    isPending: recoveredPending,
    isError: isErrorRecovered,
    error: recoveredError,
  } = useQuery({
    queryKey: ["recovered-items"],
    queryFn: async () => {
      const { data } = await secureAPI_Link.get(
        `/recovered-items?email=${user?.email}`
      );
      return data;
    },
  });

  if (isError || isErrorRecovered)
    Swal.fire({
      title: "Error fetching data",
      text: error.message || recoveredError.message,
      icon: "error",
      confirmButtonText: "Try again",
    });

  const handleSubmit = (e) => {
    e.preventDefault();

    const displayName = e.target.name.value;
    const photoURL = e.target.photo.value;

    updateUser({ displayName, photoURL }).then(() => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Successfully updated the account!",
        showConfirmButton: false,
        timer: 2000,
      });
      e.target.reset();
    });
  };

  if (isPending || recoveredPending) return <Loading />;

  return (
    <>
      <Helmet>
        <title>Profile | Track & Retrieve</title>
      </Helmet>
      <section className={`${isDark && "dark"}`}>
        <section className="px-5 w-full pb-16 pt-10 bg-white dark:bg-darkThree text-darkTwo dark:text-lightTwo">
          <section className="max-w-7xl mx-auto">
            <h1 className="text-2xl md:text-4xl font-bold text-center text-gray-800 dark:text-gray-200">
              My Profile
            </h1>

            <div className="grid lg:grid-cols-2 gap-16 mt-16">
              <div>
                <div className="p-5 md:p-10 border border-gray-300 dark:border-gray-600">
                  <img className="w-full" src={user?.photoURL} alt="" />
                  <h1 className="mt-5 text-4xl font-bold text-gray-800 dark:text-gray-200">
                    {user?.displayName}
                  </h1>
                  <h1 className="mt-5 text-2xl font-bold text-gray-800 dark:text-gray-200">
                    {user?.email}
                  </h1>
                </div>

                <div className="p-5 md:p-10 border border-gray-300 dark:border-gray-600 mt-16">
                  <h2 className="text-xl font-semibold mb-4">Update Profile</h2>
                  <form onSubmit={handleSubmit}>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Name</span>
                      </label>
                      <input
                        type="text"
                        placeholder="name"
                        name="name"
                        defaultValue={user?.displayName}
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
                        defaultValue={user?.photoURL}
                        className="input input-bordered"
                        required
                      />
                    </div>

                    <button className="btn w-full mt-4">Update</button>
                  </form>
                </div>
              </div>

              {/* Add more profile information */}

              <div>
                <div className="p-5 md:p-10 border border-gray-300 dark:border-gray-600">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
                      Your Total Post ({items?.length})
                    </h1>

                    <div className="mt-5 space-y-3">
                      {items?.map((item) => (
                        <div
                          key={item._id}
                          className="border-b border-gray-300 dark:border-gray-600 flex items-center justify-between"
                        >
                          <div>
                            <h2 className="text-xl font-semibold">
                              {item.title}
                            </h2>
                            <p className="text-gray-500 dark:text-gray-400">
                              {new Date(item?.date).toDateString()}
                            </p>
                          </div>
                          <button className="mr-2">
                            <Link to={`/items/${item._id}`}>
                              <FaEye />
                            </Link>
                          </button>
                        </div>
                      ))}
                    </div>

                    <h1 className="text-3xl mt-8 font-bold text-gray-800 dark:text-gray-200">
                      Total Recovered ({recoveredItems?.length})
                    </h1>

                    <div className="mt-5 space-y-3">
                      {recoveredItems?.map((item) => (
                        <div
                          key={item._id}
                          className="border-b border-gray-300 dark:border-gray-600 flex items-center justify-between"
                        >
                          <div>
                            <h2 className="text-xl font-semibold">
                              {item?.postItems?.title}
                            </h2>
                            <p className="text-gray-500 dark:text-gray-400">
                              {new Date(item?.recoveredDate).toDateString()}
                            </p>
                          </div>
                          <button className="mr-2">
                            <Link to={`/items/${item.postItems._id}`}>
                              <FaEye />
                            </Link>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </section>
      </section>
    </>
  );
};

export default MyProfile;
