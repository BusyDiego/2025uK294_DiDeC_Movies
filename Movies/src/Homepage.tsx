import { use, useEffect, useState } from "react";
import axios from "axios";
import "./login.css";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { MoviesProxy, type MovieData } from "./movies.tsx";
import { useNavigate } from "react-router-dom";
import { baseInstance } from "./Api";
import MovieService from "./MovieService.ts";
import getMovieById from "./MovieService.ts";
import updateMovie from "./MovieService.ts";
import { Input } from "@mui/material";

function Homepage() {
  const [movies, setMovies] = useState<MovieData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [view, setView] = useState<"single" | "list">("single");
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editDirector, setEditDirector] = useState("");
  const [editUsGross, setEditUsGross] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    window.location.href = "login";
  };

  useEffect(() => {
    MovieService()
      .getAllMovies()
      .then((movies: MovieData[]) => setMovies(movies));
  }, []);

  const showPrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const showNext = () => {
    setCurrentIndex((prev) =>
      movies && prev < movies.length - 1 ? prev + 1 : prev
    );
  };

  const movie = movies && movies.length > 0 ? movies[currentIndex] : null;

  const filteredMovies = movies.filter((movie) =>
    String(movie.Title).toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Holt alle Infos aus Movies.tsx für das aktuelle Movie
  const renderMovieDetails = (movie: MovieData) => (
    <Box>
      {Object.entries(movie).map(([key, value]) => (
        <div key={key}>
          <b>{key}:</b> {String(value)}
        </div>
      ))}
    </Box>
  );

  return (
    <>
      <Box>
        <h1>Movies List</h1>

        <Input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 2, background: "white", paddingLeft: 1 }}
        />

        <Box sx={{ mb: 2 }}>
          <Button
            variant={view === "single" ? "contained" : "outlined"}
            onClick={() => setView("single")}
            sx={{ mr: 1, scale: 0.7 }}
          >
            Einzelansicht
          </Button>
          <Button
            variant={view === "list" ? "contained" : "outlined"}
            onClick={() => setView("list")}
            sx={{ scale: 0.7 }}
          >
            Listenansicht
          </Button>
        </Box>
        {loading && <p>Lädt...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {view === "single" ? (
          movie ? (
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li key={movie.id}>
                <b>{movie.Title}</b>
                {movie.Director && (
                  <>
                    <br />
                    <b>Director:</b> {movie.Director}
                  </>
                )}

                <br />
              </li>
            </ul>
          ) : (
            <p>Keine Filme gefunden.</p>
          )
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {filteredMovies.map((m, idx) => (
              <li key={m.id} style={{ marginBottom: "1em" }}>
                <b>{m.Title}</b>
                {m.Director && (
                  <>
                    <br />
                    <b>Director:</b> {m.Director}
                  </>
                )}
                <br />
                <Button
                  variant="outlined"
                  sx={{ mt: 1 }}
                  onClick={() => {
                    setCurrentIndex(movies.findIndex((mov) => mov.id === m.id));
                    setEditMode(false);
                    setOpen(true);
                  }}
                >
                  Mehr Infos
                </Button>
              </li>
            ))}
          </ul>
        )}
        {view === "single" && (
          <Box
            sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}
          >
            <Button
              variant="contained"
              onClick={showPrev}
              disabled={currentIndex === 0}
            >
              Zurück
            </Button>

            <Button
              variant="outlined"
              sx={{ mt: 2 }}
              onClick={() => setOpen(true)}
            >
              Mehr Infos
            </Button>

            <Button
              variant="contained"
              onClick={showNext}
              disabled={
                movies.length === 0 || currentIndex === movies.length - 1
              }
            >
              Weiter
            </Button>
          </Box>
        )}
      </Box>
      <Box sx={{ mt: 2 }}>
        <Button
          onClick={() => {
            if (movie) {
              setEditTitle(movie.Title || "");
              setEditDirector(movie.Director || "");
              setEditMode(true);
              setOpen(true);
            }
          }}
        >
          Bearbeiten
        </Button>

        <Button>Hinzufügen</Button>
      </Box>
      <Button variant="outlined" color="error" onClick={handleLogout}>
        Logout
      </Button>

      {/* PopUp Dialog */}
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
          setEditMode(false);
        }}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>{editMode ? "Film Bearbeiten" : "Infos Film"}</DialogTitle>
        <DialogContent>
          {editMode ? (
            <>
              <input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="Titel"
              />
              <input
                value={editDirector}
                onChange={(e) => setEditDirector(e.target.value)}
                placeholder="Director"
              />
              <input
                value={editUsGross}
                onChange={(e) => setEditUsGross(e.target.value)}
                placeholder="US Gross"
              />
            </>
          ) : (
            movie && renderMovieDetails(movie)
          )}
        </DialogContent>
        <DialogActions>
          {editMode ? (
            <>
              <Button
                onClick={async () => {
                  await MovieService().updateMovie(movie.id, {
                    ...movie,
                    Title: editTitle,
                    Director: editDirector,
                    "US Gross": editDirector,
                  });
                  setEditMode(false);
                  setOpen(false);
                  // Optional: Filme neu laden
                  MovieService().getAllMovies().then(setMovies);
                }}
              >
                Speichern
              </Button>

              <Button
                onClick={() => {
                  setEditMode(false);
                  setOpen(false);
                }}
              >
                Abbrechen
              </Button>
            </>
          ) : (
            <Button onClick={() => setOpen(false)}>Schließen</Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Homepage;
