import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import Login from "./pages/LogIn";
import Signup from "./pages/SignUp";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import ListingDetail from './pages/ListingDetail';
import AddListing from "./pages/AddListing";

function App() {
  const { user } = useAuthContext();

  return (
    <BrowserRouter>
      <Navbar />
      <div className="pages">
        <Routes>
          <Route path="/" element={ <Home />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
          <Route path="/listings/:id" element={<ListingDetail />} />
          <Route path="/add-listing" element={user ? <AddListing /> : <Navigate to="/login" />} />
          
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;