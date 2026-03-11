import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import ListingCard from "../components/ListingCard";

const Home = () => {
  const { user } = useAuthContext();
  const [listings, setListings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/listings", {
          headers: {
            "Authorization": user ? `Bearer ${user.token}` : undefined,
          },
        });

        const json = await response.json();

        if (!response.ok) {
          throw new Error(json.error || "Failed to fetch listings");
        }

        setListings(json);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchListings();
  }, [user]);

  return (
    <div className="home">
      <h2>Travel Experiences</h2>
      {error && <p className="error">{error}</p>}

      <div className="listings-grid">
        {listings.length > 0 ? (
          listings.map((listing) => (
            <ListingCard key={listing._id} listing={listing} />
          ))
        ) : (
          <p>No listings available</p>
        )}
      </div>
    </div>
  );
};

export default Home;