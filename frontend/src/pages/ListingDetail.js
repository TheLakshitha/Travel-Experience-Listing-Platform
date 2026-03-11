import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const ListingDetail = () => {
  const { id } = useParams();
  const { user } = useAuthContext();
  const [listing, setListing] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/listings/${id}`, {
          headers: {
            Authorization: user ? `Bearer ${user.token}` : undefined,
          },
        });

        const json = await response.json();

        if (!response.ok) {
          throw new Error(json.error || "Failed to fetch listing");
        }

        setListing(json);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchListing();
  }, [id, user]);

  if (error) return <p className="error">{error}</p>;
  if (!listing) return <p>Loading...</p>;

  return (
    <div className="listing-detail">
      <h2>{listing.title}</h2>
      <img src={`http://localhost:4000/${listing.image}`} alt={listing.title} />
      <p><strong>Location:</strong> {listing.location}</p>
      <p><strong>Price:</strong> ${listing.price}</p>
      <p><strong>Description:</strong> {listing.description}</p>
      {listing.createdBy && (
        <p><strong>By:</strong> {listing.createdBy.name || listing.createdBy.email}</p>
      )}
      <p><em>Posted: {new Date(listing.createdAt).toLocaleString()}</em></p>
    </div>
  );
};

export default ListingDetail;