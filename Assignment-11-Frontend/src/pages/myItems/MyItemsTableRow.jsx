import PropTypes from "prop-types";
import useContextValue from "../../hooks/useContextValue";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit, FaEye } from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useMutation } from "@tanstack/react-query";
import { useAPI_Link } from "../../hooks/useAPI_Link";

const MyItemsTableRow = ({ item, i, refetch }) => {
  const { user } = useContextValue();
  const navigate = useNavigate();
  const API_Link = useAPI_Link();

  const { _id, title, category, location, date, status, postType } = item || {};

  const handleNavigateUpdatePage = () => {
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

    navigate(`/updateItems/${_id}`);
  };

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async () => {
      await API_Link.delete(`/lost-found/${_id}`);
    },
    onSuccess: () => {
      refetch();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Item deleted successfully!",
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

  const handleDeleteItem = () => {
    if (status === "Recovered") {
      Swal.fire({
        title: "Item has already been recovered!",
        text: "OOPS! you can't delete it.",
        icon: "info",
        position: "center",
        showConfirmButton: false,
        timer: 2000,
        customClass:{
          textColor: "error",
        }
      });
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) mutateAsync();
    });
  };

  if (isPending)
    return (
      <tr>
        <td colSpan="6" className="text-center">
          Loading...
        </td>
      </tr>
    );

  return (
    <tr>
      <th>{i + 1}</th>
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle h-12 w-12">
              <img src={user?.photoURL} alt="Avatar Tailwind CSS Component" />
            </div>
          </div>
          <div>
            <div className="font-bold">{user?.displayName}</div>
            <div className="text-sm opacity-50">Bangladesh</div>
          </div>
        </div>
      </td>
      <td>
        <div>
          <p>{title}</p>
          <p>{category}</p>
        </div>
      </td>
      <td>
        <div>
          <p>{date}</p>
          <p>{location}</p>
        </div>
      </td>
      <td>
        <div>
          <p>{postType}</p>
          <p className={`${status === "Pending" ? "text-error" : "text-info"}`}>
            {status}
          </p>
        </div>
      </td>
      <td>
        <div className="w-full flex justify-center gap-3">
          <Link to={`/items/${_id}`}>
            <button
              data-tooltip-id="view-item"
              className="btn btn-circle btn-sm btn-ghost"
            >
              <FaEye />{" "}
            </button>
          </Link>

          <button
            onClick={handleNavigateUpdatePage}
            data-tooltip-id="edit-item"
            className="btn btn-circle btn-sm btn-ghost"
          >
            <FaEdit />
          </button>
          <button
            onClick={handleDeleteItem}
            data-tooltip-id="delete-item"
            className="btn btn-circle btn-sm btn-ghost"
          >
            <MdDeleteForever />
          </button>

          <Tooltip
            style={{
              backgroundColor: "#ddd",
              color: "#000",
              fontSize: "18px",
            }}
            id="view-item"
            content="View Item"
          />
          <Tooltip
            style={{
              backgroundColor: "#ddd",
              color: "#000",
              fontSize: "18px",
            }}
            id="edit-item"
            content="Edit Item"
          />
          <Tooltip
            style={{
              backgroundColor: "#ddd",
              color: "#000",
              fontSize: "18px",
            }}
            id="delete-item"
            content="Delete Item"
          />
        </div>
      </td>
    </tr>
  );
};

MyItemsTableRow.propTypes = {
  item: PropTypes.object.isRequired,
  i: PropTypes.number.isRequired,
  refetch: PropTypes.func.isRequired,
};

export default MyItemsTableRow;
