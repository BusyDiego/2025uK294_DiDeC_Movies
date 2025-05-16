import { useEffect, useState } from "react";
import axios from "axios";
import "./login.css";
import { Box } from "@mui/material";
import { MoviesProxy } from "./movies.tsx";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { baseInstance } from "./Api";

function Homepage() {
  const baseURL = "http://localhost:3030";

  const token = localStorage.getItem("accessToken");
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMovies = async () => {
    if (!token) return;

    setLoading(true); // ⬅️ Ladeanzeige starten
    try {
      const response = await axios.get(`${baseURL}/movies`);
      setMovies(response.data);
    } catch (error) {
      console.error("Fehler beim Abrufen der Filme:", error);
      setError("Fehler beim Abrufen der Filme.");
    } finally {
      setLoading(false); // ⬅️ Ladeanzeige beenden
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    window.location.href = "/login"; // Redirect to login page
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <>
      <Box>
        <h1>Movies List</h1>
        {loading && <p>Lädt...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        <ul>
          {movies.map((movie, index) => (
            <li key={index}>{movie.Title || movie.title}</li>
          ))}
        </ul>
      </Box>
      <Box>
        <button onClick={handleLogout}>Logout</button>
      </Box>
    </>
  );
}

export default Homepage;
