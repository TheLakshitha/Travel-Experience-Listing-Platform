import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

const AddListing = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("location", location);
    formData.append("description", description);
    formData.append("price", price);
    if (image) formData.append("image", image);

    try {
      const response = await fetch("http://localhost:4000/api/listings", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        body: formData,
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error || "Failed to create listing");
      }

      navigate(`/listings/${json._id}`); 
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form className="add-listing" onSubmit={handleSubmit}>
      <h3>Add New Travel Experience</h3>

      <label>Title:</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <label>Location:</label>
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        required
      />

      <label>Description:</label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <label>Price:</label>
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <label>Image:</label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />

      <button type="submit">Add Listing</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default AddListing;