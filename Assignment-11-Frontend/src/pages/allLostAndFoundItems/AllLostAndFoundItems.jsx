import { useQuery } from "@tanstack/react-query";
import { useAPI_Link } from "../../hooks/useAPI_Link";
import Loading from "../../components/loading/Loading";
import useContextValue from "../../hooks/useContextValue";
import Swal from "sweetalert2";
import ItemCard from "./ItemCard";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Helmet } from "react-helmet";
import { useLoaderData } from "react-router-dom";

const AllLostAndFoundItems = () => {
  const { isDark } = useContextValue();
  const API_Link = useAPI_Link();
  const [type, setType] = useState("all");
  const [search, setSearch] = useState("");
  const { count } = useLoaderData();
  const [itemPerPage, setItemPerPage] = useState(8);
  const [selectedPage, setSelectedPage] = useState(1);
  const skip = (selectedPage - 1) * itemPerPage;

  const numberOfPages = Math.ceil(count / itemPerPage);
  const pages = [...Array(numberOfPages).keys()];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const {
    data: items,
    isPending,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["allItems"],
    queryFn: async () => {
      const { data } = await API_Link.get(
        `/lost-founds?postType=${type}&query=${search}&skip=${skip}&limit=${itemPerPage}`
      );
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

  // useEffect(() => {
  //   refetch();
  //   if (selectedPage === 1) window.scrollTo(0, 0);
  //   else window.scrollTo(0, 280);
  // }, [search, type, selectedPage, itemPerPage]);

  useEffect(() => {
    refetch();

    const handleScrollPosition = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth <= 768) {
        window.scrollTo(0, 380);
      } else {
        window.scrollTo(0, 280);
      }
    };

    if (selectedPage === 1) {
      window.scrollTo(0, 0);
    } else {
      handleScrollPosition();
    }
  }, [search, type, selectedPage, itemPerPage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setType("all");
    setSearch("");
    setSelectedPage(1);
    e.target.reset();
  };

  if (isPending) return <Loading />;

  return (
    <>
      <Helmet>
        <title>All Items | Track & Retrieve</title>
      </Helmet>
      <section className={`${isDark && "dark"}`}>
        <section className="px-5 w-full pb-16 pt-10 bg-white dark:bg-darkThree text-darkTwo dark:text-lightTwo">
          <section className="max-w-7xl mx-auto">
            <h1 className="text-2xl md:text-4xl font-bold text-center text-gray-800 dark:text-gray-200">
              All <span className="text-error">Lost</span> &{" "}
              <span className="text-info">Found</span> Items
            </h1>

            <div className="w-full lg:w-2/3 mx-auto bg-gray-50 dark:bg-gray-800 shadow-lg dark:shadow-xl py-4 px-3 mt-6 rounded-xl border dark:border-gray-700">
              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-2"
              >
                <label className="block w-full h-12">
                  <select
                    onChange={(e) => setType(e.target.value)}
                    className="bg-transparent w-full py-3 px-3 border border-gray-300 dark:border-gray-600 rounded-lg focus-within:border-0 focus-within:outline focus-within:outline-2 focus-within:outline-blue-500"
                  >
                    <option
                      value="all"
                      className="bg-white dark:bg-darkThree text-darkTwo dark:text-lightTwo"
                    >
                      All Items
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
                </label>

                <label className="md:col-span-2 md:flex items-center gap-4">
                  <label className=" h-12 grow flex items-center justify-between overflow-hidden border border-gray-300 dark:border-gray-600 rounded-lg focus-within:border-0 focus-within:outline focus-within:outline-2 focus-within:outline-blue-500">
                    <input
                      onBlur={(e) => setSearch(e.target.value)}
                      type="text"
                      placeholder="search by title or location..."
                      className="bg-transparent pl-3 py-2 grow border-none outline-none"
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      className="px-6 py-4 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
                    >
                      <FaSearch />
                    </button>
                  </label>
                  <button className="mt-2 md:mt-0 w-full md:w-auto h-12 px-6 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg">
                    reset
                  </button>
                </label>
              </form>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-10">
              {items?.map((item) => (
                <ItemCard key={item._id} item={item} />
              ))}
            </div>

            {type === "all" && !search && (
              <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-3">
                <div className="flex items-center flex-wrap gap-1">
                  {/* Pagination buttons */}
                  {pages?.map((page) => (
                    <button
                      key={page}
                      onClick={() => setSelectedPage(page + 1)}
                      className={`${
                        selectedPage === page + 1
                          ? "bg-accent"
                          : "bg-transparent"
                      } py-[7px] px-3 border border-gray-300 dark:border-gray-600 rounded-lg`}
                    >
                      {page + 1}
                    </button>
                  ))}
                </div>
                <div>
                  <select
                    onChange={(e) => {
                      setItemPerPage(parseInt(e.target.value));
                      setSelectedPage(1);
                    }}
                    className="bg-transparent py-2 px-3 border border-gray-300 dark:border-gray-600 rounded-lg focus-within:border-0 focus-within:outline focus-within:outline-2 focus-within:outline-blue-500"
                  >
                    <option
                      value={8}
                      className="bg-white dark:bg-darkThree text-darkTwo dark:text-lightTwo"
                    >
                      8
                    </option>
                    <option
                      value={16}
                      className="bg-white dark:bg-darkThree text-darkTwo dark:text-lightTwo"
                    >
                      16
                    </option>
                    <option
                      value={24}
                      className="bg-white dark:bg-darkThree text-darkTwo dark:text-lightTwo"
                    >
                      24
                    </option>
                    <option
                      value={32}
                      className="bg-white dark:bg-darkThree text-darkTwo dark:text-lightTwo"
                    >
                      32
                    </option>
                  </select>
                </div>
              </div>
            )}
          </section>
        </section>
      </section>
    </>
  );
};

export default AllLostAndFoundItems;
