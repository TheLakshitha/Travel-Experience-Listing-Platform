import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (name, email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("http://localhost:4000/api/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setIsLoading(false);
      return;
    }

    const userData = {
      _id: json._id,
      name: json.name,
      email: json.email,
      token: json.token,
    };

    localStorage.setItem("user", JSON.stringify(userData));
    dispatch({ type: "LOGIN", payload: userData });
    setIsLoading(false);
  };

  return { signup, isLoading, error };
};