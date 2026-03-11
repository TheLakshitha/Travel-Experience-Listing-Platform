import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";


const timeAgo = (dateString) => {
  const now = new Date();
  const date = new Date(dateString);
  const diff = Math.floor((now - date) / 1000);

  if (diff < 60) return `${diff} seconds ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
  return `${Math.floor(diff / 86400)} days ago`;
};

const ListingDetail = () => {
  const { id } = useParams();
  const { user } = useAuthContext();
  const [listing, setListing] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/listings/${id}`);
        const json = await response.json();
        if (!response.ok) throw new Error(json.error || "Failed to fetch listing");
        setListing(json);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchListing();
  }, [id]);

  const handleDelete = async () => {
    if (!user) return;

    try {
      const response = await fetch(`http://localhost:4000/api/listings/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${user.token}` },
      });

      const json = await response.json();
      if (!response.ok) throw new Error(json.error || "Failed to delete listing");

      navigate("/"); 
    } catch (err) {
      setError(err.message);
    }
  };

  if (error) return <p className="error">{error}</p>;
  if (!listing) return <p>Loading...</p>;


  const listingCreatorId = listing.createdBy?._id || listing.createdBy;
  const userId = user?._id;

  const isCreator = listingCreatorId && userId && listingCreatorId.toString() === userId.toString();

  return (
    <div className="listing-detail">
      <h2>{listing.title}</h2>
      <img src={listing.image} alt={listing.title} />
      <p><strong>Location:</strong> {listing.location}</p>
      <p><strong>Full Description:</strong> {listing.description}</p>
      <p><strong>Price:</strong> {listing.price ? `$${listing.price}` : "N/A"}</p>
      <p><em>By: {listing.createdBy?.name || listing.createdBy || "Unknown"}</em></p>
      <p><em>Posted: {timeAgo(listing.createdAt)}</em></p>

      {isCreator && (
        <button
          onClick={handleDelete}
          style={{ marginTop: "10px", background: "red", color: "white" }}
        >
          Delete Listing
        </button>
      )}
    </div>
  );
};

export default ListingDetail;