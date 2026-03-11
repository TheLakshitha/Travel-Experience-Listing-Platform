import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("http://localhost:4000/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setIsLoading(false);
    }
    if (response.ok) {
      const userData = {
        _id: json._id,
        name: json.name,
        email: json.email,
        token: json.token,
      };

      localStorage.setItem("user", JSON.stringify(userData));
      dispatch({ type: "LOGIN", payload: userData });
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};