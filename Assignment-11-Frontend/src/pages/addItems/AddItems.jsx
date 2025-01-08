import { useState } from "react";
import useContextValue from "../../hooks/useContextValue";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useFormateDate from "../../hooks/useFormateDate";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Loading from "../../components/loading/Loading";
import { useSecureAPI_Link } from "../../hooks/useAPI_Link";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const AddItems = () => {
  const { isDark, user } = useContextValue();
  const [errMsg, setError] = useState(null);
  const [postDate, setDate] = useState(new Date());
  const formattedDate = useFormateDate(postDate);
  const navigate = useNavigate();

  const secureAPI_Link = useSecureAPI_Link();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (value) => {
      await secureAPI_Link.post("/lost-found", value);
    },
    onSuccess: () => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Item added successfully!",
        showConfirmButton: false,
        timer: 2000,
      });
      navigate("/myItems");
    },
    onError: (error) =>
      Swal.fire({
        title: error.message,
        icon: "error",
      }),
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(null);
    const formData = new FormData(event.target);
    const newItems = Object.fromEntries(formData);

    if (newItems.postType === "") {
      setError("Select a post type");
      window.scrollTo(0, 0);
      return;
    }
    newItems.date = formattedDate;
    newItems.status = "Pending";

    mutateAsync(newItems);
  };

  if (isPending) return <Loading />;

  return (
    <>
    <Helmet>
        <title>Add Items | Track & Retrieve</title>
      </Helmet>
    <section className={`${isDark && "dark"}`}>
      <section className="px-5 w-full pb-16 pt-10 bg-white dark:bg-darkThree text-darkTwo dark:text-lightTwo">
        <section className="max-w-7xl mx-auto">
          <div>
            <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-200">
              Add New Item
            </h1>
          </div>
          <div>
            <form
              onSubmit={handleSubmit}
              className="max-w-xl mx-auto shadow-md border border-gray-300 dark:border-gray-600 p-5 rounded-xl space-y-4 mt-7"
            >
              <label className="block w-full">
                <label className="block ml-2">What did you find or lose?</label>
                <select
                  name="postType"
                  className="bg-transparent mt-2 w-full py-2 px-3 border border-gray-300 dark:border-gray-600 rounded-lg focus-within:border-0 focus-within:outline focus-within:outline-2 focus-within:outline-blue-500"
                >
                  <option value="" className="hidden">
                    Select a type
                  </option>
                  <option
                    value="Lost"
                    className="bg-white dark:bg-darkThree text-darkTwo dark:text-lightTwo"
                  >
                    Lost
                  </option>
                  <option
                    value="Found"
                    className="bg-white dark:bg-darkThree text-darkTwo dark:text-lightTwo"
                  >
                    Found
                  </option>
                </select>
                {errMsg && <p className="text-error">{errMsg}</p>}
              </label>

              <label className="block w-full">
                <label className="block ml-2">Photo URL</label>
                <input
                  type="url"
                  name="thumbnail"
                  required
                  placeholder="Photo URL"
                  className="bg-transparent mt-2 w-full py-2 px-3 border border-gray-300 dark:border-gray-600 rounded-lg focus-within:border-0 focus-within:outline focus-within:outline-2 focus-within:outline-blue-500"
                />
              </label>

              <label className="block w-full">
                <label className="block ml-2">Title</label>
                <input
                  type="text"
                  name="title"
                  required
                  placeholder="Title"
                  className="bg-transparent mt-2 w-full py-2 px-3 border border-gray-300 dark:border-gray-600 rounded-lg focus-within:border-0 focus-within:outline focus-within:outline-2 focus-within:outline-blue-500"
                />
              </label>

              <label className="block w-full">
                <label className="block ml-2">Description</label>
                <textarea
                  type="text"
                  name="description"
                  required
                  placeholder="Description"
                  className="bg-transparent mt-2 w-full py-2 px-3 border border-gray-300 dark:border-gray-600 rounded-lg focus-within:border-0 focus-within:outline focus-within:outline-2 focus-within:outline-blue-500 min-h-16 max-h-40"
                />
              </label>

              <label className="block w-full">
                <label className="block ml-2">Category</label>
                <input
                  type="text"
                  name="category"
                  required
                  placeholder="Category (e.g. goods, gadgets, documents, pets, etc)"
                  className="bg-transparent mt-2 w-full py-2 px-3 border border-gray-300 dark:border-gray-600 rounded-lg focus-within:border-0 focus-within:outline focus-within:outline-2 focus-within:outline-blue-500"
                />
              </label>

              <label className="block w-full">
                <label className="block ml-2">Location</label>
                <input
                  type="text"
                  name="location"
                  required
                  placeholder="Lost or Found location"
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
                  withPortal
                />
              </label>

              <label className="block w-full">
                <label className="block ml-2">Your Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Your name"
                  defaultValue={user?.displayName}
                  className="bg-transparent mt-2 w-full py-2 px-3 border border-gray-300 dark:border-gray-600 rounded-lg focus-within:border-0 focus-within:outline focus-within:outline-2 focus-within:outline-blue-500"
                />
              </label>

              <label className="block w-full">
                <label className="block ml-2">Your Email</label>
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
                <button className="btn btn-accent w-full hover:text-white">
                  Add Post
                </button>
              </label>
            </form>
          </div>
        </section>
      </section>
    </section>
    </>
  );
};

export default AddItems;
