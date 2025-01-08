import PropTypes from "prop-types";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";

const RecoveredCard = ({ item }) => {
  const {
    _id,
    title,
    category,
    status,
    postType,
    thumbnail,
    email: postEmail,
    name: creatorName,
    date: postDate,
  } = item?.postItems || {};
  const { name, email, photo, recovered_location, recoveredDate } = item || {};

  return (
    <div className="border border-green-400 shadow-md relative rounded-sm">
      <button
        data-tooltip-id="view-item"
        className="absolute top-2 right-2 bg-black/40 text-white backdrop-blur flex rounded-full"
      >
        <Link className="p-2 inline-block" to={`/items/${_id}`}>
          <FaEye />
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
      </button>
      <img
        className="w-full md:h-64 lg:h-56 object-cover"
        src={thumbnail}
        alt=""
      />
      <div className="p-3">
        <h3 className="text-accent text-lg font-semibold">Post Details</h3>
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className={`${postType === "Lost" ? "text-error" : "text-info"}`}>
          {postType}
        </p>
        <p>{postDate}</p>
        <p>
          {category} - {status}
        </p>
        <p>{creatorName}</p>
        <p>{postEmail}</p>
        <h3 className="text-accent text-lg font-semibold mt-2">
          Recovered Details
        </h3>
        <div className="flex items-center gap-2 mt-1">
          <img className="w-12" src={photo} alt="" />
          <div>
            <p>{name}</p>
            <p>{email}</p>
          </div>
        </div>
        <p className="mt-1">{recoveredDate}</p>
        <p>{recovered_location}</p>
      </div>
    </div>
  );
};

RecoveredCard.propTypes = {
  item: PropTypes.object.isRequired,
};

export default RecoveredCard;
