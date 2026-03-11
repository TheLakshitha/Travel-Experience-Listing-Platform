import { Link } from "react-router-dom";

const ListingCard = ({ listing }) => {
  const { title, location, image, description, price, createdBy, createdAt, _id } = listing;

  const formattedDate = new Date(createdAt).toLocaleString();

  return (
    <div className="listing-card">
      <img src={`http://localhost:4000/${image}`} alt={title} />
      <div className="listing-info">
        <h3>{title}</h3>
        <p><strong>Location:</strong> {location}</p>
        <p>{description}</p>
        {price && <p><strong>Price:</strong> ${price}</p>}
        {createdBy && <p><strong>By:</strong> {createdBy.name || createdBy.email}</p>}
        <p><em>Posted: {formattedDate}</em></p>
        <Link to={`/listings/${_id}`}>View Details</Link>
      </div>
    </div>
  );
};

export default ListingCard;