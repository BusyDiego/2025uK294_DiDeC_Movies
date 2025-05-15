import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import "./loginService.tsx";

// Basis-URL und Token
const baseURL = "http://localhost:3030";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjVAbWFpbC5jb20iLCJpYXQiOjE3NDczMDczMTAsImV4cCI6MTc0NzMxMDkxMCwic3ViIjoiNyJ9.vxo3VZUuOGXq7IRbVzMbNgFN2NPy8AKyVI5-0uqVPL8";

// Axios-Instanz erstellen
const instance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`, // Bearer Token für Authentifizierung
  },
});

function App() {
  const [email, setEmail] = useState<string>(""); // E-Mail State
  const [password, setPassword] = useState<string>(""); // Passwort State
  const [token, setToken] = useState<string | null>(null); // JWT-Token
  const [movies, setMovies] = useState<any[]>([]); // State für Movies
  const [loading, setLoading] = useState<boolean>(false); // Ladezustand
  const [error, setError] = useState<string | null>(null); // Fehlerzustand

  useEffect(() => {
    const fetchMovies = async () => {
      if (!token) return; // Wenn kein Token, keine Filme abrufen

      try {
        const response = await axios.get(`${baseURL}/movies`, {
          headers: {
            Authorization: `Bearer ${token}`, // Token im Header senden
          },
        });
        setMovies(response.data); // Filme im State speichern
      } catch (error) {
        setError("Fehler beim Abrufen der Filme.");
      }
    };

    fetchMovies();
  }, []); // Effekt wird nur einmal beim Laden ausgeführt

  // Formular-Händler für E-Mail und Passwort
  const handleMailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form submitted");
  };

  handleLogin = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    return (
      <>
        <div>
          <h1>Movies List</h1>
          {/* Zeige die Filme an */}
          <ul>
            {movies.map((movie, index) => (
              <li key={index}>{movie.title}</li> // Beispiel: Filme nach Titel anzeigen
            ))}
          </ul>
        </div>

        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="email"
                placeholder="Email"
                onChange={handleMailChange}
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                onChange={handlePasswordChange}
              />
            </div>

            <button type="submit">Login</button>
          </form>
        </div>
      </>
    );
  };
}
export default App;
