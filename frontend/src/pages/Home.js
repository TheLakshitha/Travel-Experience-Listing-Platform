import { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import ListingCard from '../components/ListingCard';

const Home = () => {
    const { user } = useAuthContext();
    const [listings, setListings] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchListings = async () => {
            const response = await fetch("http://localhost:4000/api/listings");
            const json = await response.json();

            if (response.ok) {
                setListings(json);
            }
        };

        fetchListings();
    }, []);

    
    return (
        <div className="home">
            <h2>Travel Experiences</h2>
            {error && <p className="error">{error}</p>}
            <div className="listing-feed">
                {listings.map((listing) => (
                    <ListingCard key={listing._id} listing={listing} />
                ))}
            </div>
        </div>
    );
};

export default Home;