import Swal from "sweetalert2";
import Loading from "../../components/loading/Loading";
import useContextValue from "../../hooks/useContextValue";
import { useQuery } from "@tanstack/react-query";
import RecoveredItemTableRow from "./RecoveredItemTableRow";
import DataNotFound from "../../components/dataNotFound/DataNotFound";
import { useSecureAPI_Link } from "../../hooks/useAPI_Link";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { FaBars } from "react-icons/fa";
import { useState } from "react";
import RecoveredCard from "./RecoveredCard";
import { Helmet } from "react-helmet";

const AllRecovered = () => {
  const { isDark, user } = useContextValue();
  const secureAPI_Link = useSecureAPI_Link();
  const [isGrid, setIsGrid] = useState(false);

  const {
    data: items,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["recovered-items"],
    queryFn: async () => {
      const { data } = await secureAPI_Link.get(
        `/recovered-items?email=${user?.email}`
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


  if (isPending) return <Loading />;

  return (
    <>
    <Helmet>
        <title>Recovered Items | Track & Retrieve</title>
      </Helmet>
    <section className={`${isDark && "dark"}`}>
      <section className="px-5 w-full pb-16 pt-10 bg-white dark:bg-darkThree text-darkTwo dark:text-lightTwo">
        <section className="max-w-7xl mx-auto">
          <h1 className="text-2xl md:text-4xl font-bold text-center text-gray-800 dark:text-gray-200">
            Recovered Items
          </h1>

          {items?.length === 0 ? (
            <div className="max-w-lg mx-auto mt-14 rounded-full overflow-hidden">
              <DataNotFound />
            </div>
          ) : (
            <div className="mt-8">
              <div className="flex items-center justify-end gap-x-3">
                <button
                  onClick={() => setIsGrid(!isGrid)}
                  className={`btn btn-ghost border border-gray-300 dark:border-gray-600 ${
                    isGrid && "bg-gray-200 dark:bg-gray-600"
                  }`}
                >
                  <BsFillGrid3X3GapFill />
                </button>
                <button
                  onClick={() => setIsGrid(!isGrid)}
                  className={`btn btn-ghost border border-gray-300 dark:border-gray-600 ${
                    !isGrid && "bg-gray-200 dark:bg-gray-600"
                  }`}
                >
                  <FaBars />
                </button>
              </div>
              {isGrid ? (
                <div className="mt-5 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {items.map((item, i) => (
                    <RecoveredCard key={i} item={item} />
                  ))}
                </div>
              ) : (
                <div className="overflow-x-auto mt-5">
                  <table className="table table-zebra">
                    {/* head */}
                    <thead className="bg-base-300 text-darkTwo dark:text-lightTwo text-sm">
                      <tr>
                        <th>#</th>
                        <th>Recovered Person</th>
                        <th>Items Details</th>
                        <th>Recovered Date & Location</th>
                        <th>Type & Status</th>
                        <th className="flex justify-center">Action</th>
                      </tr>
                    </thead>

                    {/* table body */}
                    <tbody>
                      {items.map((item, i) => (
                        <RecoveredItemTableRow key={i} item={item} i={i} />
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </section>
      </section>
    </section></>
  );
};

export default AllRecovered;
