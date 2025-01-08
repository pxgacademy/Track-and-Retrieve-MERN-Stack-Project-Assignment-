import { useMutation, useQuery } from "@tanstack/react-query";
import useContextValue from "../../hooks/useContextValue";
import { useAPI_Link } from "../../hooks/useAPI_Link";
import Loading from "../../components/loading/Loading";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import { useState } from "react";
import useFormateDate from "../../hooks/useFormateDate";
import { Helmet } from "react-helmet";

const ItemDetails = () => {
  const { isDark, user } = useContextValue();
  const API_Link = useAPI_Link();
  const { id } = useParams();
  const navigate = useNavigate();
  const [postDate, setDate] = useState(new Date());
  const formattedDate = useFormateDate(postDate);

  const {
    data: item,
    isPending,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["singleItem"],
    queryFn: async () => {
      const { data } = await API_Link.get(`/single-item/${id}`);
      return data;
    },
  });

  if (isError)
    Swal.fire({
      title: "Error fetching data",
      text: error.message,
      icon: "error",
      confirmButtonText: "Try again",
    });

  const { mutateAsync, isPending: postPending } = useMutation({
    mutationFn: async (value) => {
      await API_Link.post("/recovered-details", value);
    },
    onSuccess: () => {
      navigate("/allRecovered");
      refetch();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Item recovered successfully!",
        showConfirmButton: false,
        timer: 2000,
      });
    },
    onError: (error) =>
      Swal.fire({
        title: error.message,
        icon: "error",
      }),
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    handleModal(false);
    const formData = new FormData(event.target);
    const recoveredDetails = Object.fromEntries(formData);
    recoveredDetails.postId = item._id;
    recoveredDetails.recoveredDate = formattedDate;
    recoveredDetails.status = "Recovered";

    mutateAsync(recoveredDetails);
  };

  const {
    postType,
    thumbnail,
    title,
    description,
    category,
    location,
    date,
    status,
    name,
    email,
  } = item || {};

  const handleModal = (value) => {
    if (status === "Recovered") {
      Swal.fire({
        title: "Item has already been recovered!",
        text: "OOPS!",
        icon: "info",
        position: "center",
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }

    if (user?.email === email) {
      Swal.fire({
        title: "This is your own post!",
        text: "You are not permitted to recover this item!",
        icon: "error",
      });
      return;
    }

    const itemDetailsModal = document.getElementById("my_modal_3");
    if (value) itemDetailsModal.showModal();
    else itemDetailsModal.close();
  };

  if (isPending || postPending) return <Loading />;

  return (
    <>
      <Helmet>
        <title>Item Details | Track & Retrieve</title>
      </Helmet>
      <section className={`${isDark && "dark"}`}>
        <section className="px-5 w-full pb-16 pt-10 bg-white dark:bg-darkThree text-darkTwo dark:text-lightTwo">
          <section className="max-w-7xl mx-auto">
            <h1 className="text-2xl md:text-4xl font-bold text-center text-gray-800 dark:text-gray-200">
              {postType} Item Details
            </h1>

            <div
              className={`max-w-2xl mx-auto border ${
                status === "Recovered"
                  ? "border-green-400"
                  : postType === "Lost"
                  ? "border-error"
                  : "border-info"
              } rounded-xl p-4 mt-8`}
            >
              <p
                className={`${
                  status === "Recovered"
                    ? "text-green-400"
                    : postType === "Lost"
                    ? "text-error"
                    : "text-info"
                } text-2xl font-semibold text-center`}
              >
                {postType} this {category}
              </p>

              <img className="w-full my-5 rounded-lg" src={thumbnail} alt="" />
              <h3 className="text-3xl font-semibold">{title}</h3>

              <p className="text-lg font-semibold mt-1">{description}</p>
              <div className="mt-2 text-lg grid md:grid-cols-2 gap-4">
                <div>
                  <p>
                    {postType} this at: {date}
                  </p>
                  <p>
                    {postType} this at: {location}
                  </p>
                </div>
                <div>
                  <p>Posted by: {name}</p>
                  <p>Email: {email}</p>
                </div>
              </div>

              <div className="flex justify-center mt-9">
                <button
                  onClick={() => handleModal(true)}
                  className={`btn btn-wide text-white ${
                    status === "Recovered"
                      ? "bg-green-400"
                      : postType === "Lost"
                      ? "btn-error"
                      : "btn-info"
                  } `}
                >
                  {status === "Recovered"
                    ? "Recovered"
                    : postType === "Lost"
                    ? "Found This!"
                    : "This is Mine!"}
                </button>
              </div>
            </div>

            <dialog id="my_modal_3" className="modal">
              <div className={`modal-box max-w-2xl p-0`}>
                <div
                  className={`max-w-2xl mx-auto ${
                    postType === "Lost" ? "bg-error/15" : "bg-info/15"
                  } rounded-xl p-4`}
                >
                  <button
                    onClick={() => handleModal(false)}
                    className={`btn btn-sm btn-circle  absolute right-2 text-white hover:text-black  ${
                      postType === "Lost" ? "bg-error" : "bg-info"
                    }`}
                  >
                    ✕
                  </button>

                  <div>
                    <p
                      className={`${
                        postType === "Lost" ? "text-error" : "text-info"
                      } text-2xl font-semibold text-center`}
                    >
                      {postType} this {category}
                    </p>

                    <img
                      className="w-full my-5 rounded-lg"
                      src={thumbnail}
                      alt=""
                    />
                    <h3 className="text-3xl font-semibold">{title}</h3>

                    <p className="text-lg font-semibold mt-1">{description}</p>
                    <div className="mt-2 text-lg grid md:grid-cols-2 gap-4">
                      <div>
                        <p>
                          {postType} this at: {date}
                        </p>
                        <p>
                          {postType} this at: {location}
                        </p>
                      </div>
                      <div>
                        <p>Posted by: {name}</p>
                        <p>Email: {email}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-center mt-6">
                      Recovered Details
                    </h3>
                    <form
                      onSubmit={handleSubmit}
                      className="max-w-xl mx-auto shadow-md border border-gray-300 dark:border-gray-600 p-5 rounded-xl space-y-4 mt-4"
                    >
                      <label className="block w-full">
                        <label className="block ml-2">Recovered Location</label>
                        <input
                          required
                          type="text"
                          name="recovered_location"
                          placeholder="Where it was given/received to owner from."
                          className="bg-transparent mt-2 w-full py-2 px-3 border border-gray-300 dark:border-gray-600 rounded-lg focus-within:border-0 focus-within:outline focus-within:outline-2 focus-within:outline-blue-500"
                        />
                      </label>

                      <label className="block w-full">
                        <label className="block ml-2">Date</label>
                        <DatePicker
                          required
                          className="bg-transparent mt-2 w-full py-2 px-3 border border-gray-300 dark:border-gray-600 rounded-lg focus-within:border-0 focus-within:outline focus-within:outline-2 focus-within:outline-blue-500"
                          selected={postDate}
                          onChange={(date) => setDate(date)}
                          // withPortal
                        />
                      </label>

                      <label className="block w-full">
                        <label className="block ml-2">Name</label>
                        <input
                          type="text"
                          name="name"
                          placeholder="Your name"
                          value={user?.displayName}
                          readOnly
                          className="bg-transparent mt-2 w-full py-2 px-3 border border-gray-300 dark:border-gray-600 rounded-lg focus-within:border-0 focus-within:outline focus-within:outline-2 focus-within:outline-blue-500"
                        />
                      </label>

                      <label className="block w-full">
                        <label className="block ml-2">Email</label>
                        <input
                          type="text"
                          name="email"
                          placeholder="Your email"
                          value={user?.email}
                          readOnly
                          className="bg-transparent mt-2 w-full py-2 px-3 border border-gray-300 dark:border-gray-600 rounded-lg focus-within:border-0 focus-within:outline focus-within:outline-2 focus-within:outline-blue-500"
                        />
                      </label>

                      <label className="block w-full">
                        <label className="block ml-2">Photo</label>
                        <input
                          type="url"
                          name="photo"
                          placeholder="Your email"
                          value={user?.photoURL}
                          readOnly
                          className="bg-transparent mt-2 w-full py-2 px-3 border border-gray-300 dark:border-gray-600 rounded-lg focus-within:border-0 focus-within:outline focus-within:outline-2 focus-within:outline-blue-500"
                        />
                      </label>

                      <label className="block w-full">
                        <button
                          className={`btn ${
                            postType === "Lost" ? "btn-error" : "btn-info"
                          } w-full hover:text-white`}
                        >
                          Submit
                        </button>
                      </label>
                    </form>
                  </div>
                </div>
              </div>
            </dialog>
          </section>
        </section>
      </section>
    </>
  );
};

export default ItemDetails;
