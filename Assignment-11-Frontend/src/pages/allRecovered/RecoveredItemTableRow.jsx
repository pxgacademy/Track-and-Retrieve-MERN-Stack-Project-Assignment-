import PropTypes from "prop-types";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";

const RecoveredItemTableRow = ({ item, i }) => {
  const { _id, title, category, status, postType } = item?.postItems || {};
  const { name, email, photo, recovered_location, recoveredDate } = item || {};
  return (
    <tr>
      <th>{i + 1}</th>
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle h-12 w-12">
              <img src={photo} alt="pic" crossOrigin="anonymous" />
            </div>
          </div>
          <div>
            <div className="font-bold">{name}</div>
            <div className="text-sm opacity-50">{email}</div>
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
          <p>{recoveredDate}</p>
          <p>{recovered_location}</p>
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

          <Tooltip
            style={{
              backgroundColor: "#ddd",
              color: "#000",
              fontSize: "18px",
            }}
            id="view-item"
            content="View Item"
          />
        </div>
      </td>
    </tr>
  );
};

RecoveredItemTableRow.propTypes = {
  item: PropTypes.object.isRequired,
  i: PropTypes.number.isRequired,
};

export default RecoveredItemTableRow;
