import { useMutation, useQuery } from "@tanstack/react-query";
import { useSecureAPI_Link } from "../../hooks/useAPI_Link";
import useContextValue from "../../hooks/useContextValue";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/loading/Loading";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import useFormateDate from "../../hooks/useFormateDate";
import DatePicker from "react-datepicker";
import { Helmet } from "react-helmet";

const UpdateItem = () => {
  const { isDark } = useContextValue();
  const { id } = useParams();
  const navigate = useNavigate();
  const secureAPI_Link = useSecureAPI_Link();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const {
    data: item,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: [id],
    queryFn: async () => {
      const { data } = await secureAPI_Link.get(`/single-item/${id}`);
      return data;
    },
  });

  const {
    _id,
    postType,
    thumbnail,
    title,
    description,
    category,
    location,
    date,
    name,
    email,
  } = item || {};

  const [postDate, setDate] = useState(new Date());
  const formattedDate = useFormateDate(postDate);

  useEffect(() => {
    if (date) setDate(new Date(date));
  }, [date]);

  const { mutateAsync, isPending: isPendingUpdate } = useMutation({
    mutationFn: async (value) => {
      await secureAPI_Link.put(`/lost-found/${_id}`, value);
    },
    onSuccess: () =>
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Item updated successfully!",
        showConfirmButton: false,
        timer: 2000,
      }).then(() => navigate("/myItems")),
    onError: (error) =>
      Swal.fire({
        title: error.message,
        icon: "error",
      }),
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newItems = Object.fromEntries(formData);

    newItems.date = formattedDate;
    newItems.status = "Pending";

    Swal.fire({
      title: "Are you sure you want to update this item?",
      text: "Changes will be saved immediately.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, update it",
      cancelButtonText: "No, keep it as it is",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) mutateAsync(newItems);
    });
  };

  if (isError)
    Swal.fire({
      title: "Error fetching data",
      text: error.message,
      icon: "error",
      confirmButtonText: "Try again",
    });

  if (isPending || isPendingUpdate) return <Loading />;

  return (
    <>
      <Helmet>
        <title>Update Item | Track & Retrieve</title>
      </Helmet>
      <section className={`${isDark && "dark"}`}>
        <section className="px-5 w-full pb-16 pt-10 bg-white dark:bg-darkThree text-darkTwo dark:text-lightTwo">
          <section className="max-w-7xl mx-auto">
            <div>
              <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-200">
                Update Your Item
              </h1>
            </div>
            <div>
              <form
                onSubmit={handleSubmit}
                className="max-w-xl mx-auto shadow-md border border-gray-300 dark:border-gray-600 p-5 rounded-xl space-y-4 mt-7"
              >
                <label className="block w-full">
                  <label className="block ml-2">
                    What did you find or lose?
                  </label>
                  <select
                    name="postType"
                    defaultValue={postType}
                    className="bg-transparent mt-2 w-full py-2 px-3 border border-gray-300 dark:border-gray-600 rounded-lg focus-within:border-0 focus-within:outline focus-within:outline-2 focus-within:outline-blue-500"
                  >
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
                </label>

                <label className="block w-full">
                  <label className="block ml-2">Photo URL</label>
                  <input
                    type="url"
                    name="thumbnail"
                    defaultValue={thumbnail}
                    placeholder="Photo URL"
                    className="bg-transparent mt-2 w-full py-2 px-3 border border-gray-300 dark:border-gray-600 rounded-lg focus-within:border-0 focus-within:outline focus-within:outline-2 focus-within:outline-blue-500"
                  />
                </label>

                <label className="block w-full">
                  <label className="block ml-2">Title</label>
                  <input
                    type="text"
                    name="title"
                    defaultValue={title}
                    placeholder="Title"
                    className="bg-transparent mt-2 w-full py-2 px-3 border border-gray-300 dark:border-gray-600 rounded-lg focus-within:border-0 focus-within:outline focus-within:outline-2 focus-within:outline-blue-500"
                  />
                </label>

                <label className="block w-full">
                  <label className="block ml-2">Description</label>
                  <textarea
                    type="text"
                    name="description"
                    defaultValue={description}
                    placeholder="Description"
                    className="bg-transparent mt-2 w-full py-2 px-3 border border-gray-300 dark:border-gray-600 rounded-lg focus-within:border-0 focus-within:outline focus-within:outline-2 focus-within:outline-blue-500 min-h-16 max-h-40"
                  />
                </label>

                <label className="block w-full">
                  <label className="block ml-2">Category</label>
                  <input
                    type="text"
                    name="category"
                    defaultValue={category}
                    placeholder="Category (e.g. goods, gadgets, documents, pets, etc)"
                    className="bg-transparent mt-2 w-full py-2 px-3 border border-gray-300 dark:border-gray-600 rounded-lg focus-within:border-0 focus-within:outline focus-within:outline-2 focus-within:outline-blue-500"
                  />
                </label>

                <label className="block w-full">
                  <label className="block ml-2">Location</label>
                  <input
                    type="text"
                    name="location"
                    defaultValue={location}
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
                    placeholder="Your name"
                    value={name}
                    readOnly
                    className="bg-transparent mt-2 w-full py-2 px-3 border border-gray-300 dark:border-gray-600 rounded-lg focus-within:border-0 focus-within:outline focus-within:outline-2 focus-within:outline-blue-500"
                  />
                </label>

                <label className="block w-full">
                  <label className="block ml-2">Your Email</label>
                  <input
                    type="text"
                    name="email"
                    placeholder="Your email"
                    value={email}
                    readOnly
                    className="bg-transparent mt-2 w-full py-2 px-3 border border-gray-300 dark:border-gray-600 rounded-lg focus-within:border-0 focus-within:outline focus-within:outline-2 focus-within:outline-blue-500"
                  />
                </label>

                <label className="block w-full">
                  <button className="btn btn-accent w-full hover:text-white">
                    Update Post
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

export default UpdateItem;
