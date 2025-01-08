import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ItemCard = ({ item }) => {
  const { _id, postType, thumbnail, title, category, location, date, status } =
    item || {};

  return (
    <div
      className={`border ${
        status === "Recovered"
          ? "border-green-400"
          : postType === "Lost"
          ? "border-error"
          : "border-info"
      } p-3 rounded-lg flex flex-col shadow-md`}
    >
      <div className="w-full md:h-64 lg:h-56 ">
        <img
          className="w-full h-full object-cover mb-3 rounded-md"
          src={thumbnail}
          alt={title}
        />
      </div>
      <p
        className={`text-lg font-semibold ${
          status === "Recovered"
            ? "text-green-400"
            : postType === "Lost"
            ? "text-error"
            : "text-info"
        }`}
      >
        {postType} this {category}{" "}
        {status === "Recovered" && (
          <span className="badge badge-accent">({status})</span>
        )}
      </p>
      <h3 className="mt-2 text-xl font-semibold">{title}</h3>

      <div className="grow mt-2 ">
        <p>{category}</p>
        <p>
          {postType} this at: {date}
        </p>
        <p>{location}</p>
      </div>

      <Link to={`/items/${_id}`}>
        <button
          className={`btn ${
            status === "Recovered"
              ? "bg-green-400"
              : postType === "Lost"
              ? "btn-error"
              : "btn-info"
          } mt-3 text-white w-full`}
        >
          View Details
        </button>
      </Link>
    </div>
  );
};

ItemCard.propTypes = {
  item: PropTypes.object.isRequired,
};

export default ItemCard;
