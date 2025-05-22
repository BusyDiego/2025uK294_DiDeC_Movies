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
import { Input, TextField } from "@mui/material";
import MovieCreateDialog from "./MovieCreateDialog.tsx";
import MovieEditDialog from "./MovieEditDialog";
import DeleteIcon from "@mui/icons-material/Delete";

function Homepage() {
  const [movies, setMovies] = useState<MovieData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [view, setView] = useState<"single" | "list">("single");
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editMovie, setEditMovie] = useState<any>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDirector, setEditDirector] = useState("");
  const [editUsGross, setEditUsGross] = useState("");
  const [editWorldWideGross, setEditWorldWideGross] = useState("");
  const [USDVDSales, setUSDVDSales] = useState("");
  const [productionBudget, setProductionBudget] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [MPAARating, setMPAARating] = useState("");
  const [runningTime, setRunningTime] = useState("");
  const [distributor, setDistributor] = useState("");
  const [source, setSource] = useState("");
  const [majorGenre, setMajorGenre] = useState("");
  const [creativeType, setCreativeType] = useState("");
  const [rottenTomatoesRating, setRottenTomatoesRating] = useState("");
  const [imdbRating, setImdbRating] = useState("");
  const [imdbVotes, setImdbVotes] = useState("");
  const [id, setId] = useState("");
  const [createOpen, setCreateOpen] = useState(false);

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

  const renderMovieDetails = (movie: MovieData) => (
    <Box>
      {Object.entries(movie).map(([key, value]) => (
        <div key={key}>
          <b>{key}:</b> {String(value)}
        </div>
      ))}
    </Box>
  );

  const handleDelete = async (id: string | number) => {
    await MovieService().deleteMovie(id);
    MovieService().getAllMovies().then(setMovies);
  };

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
                  className="neon-btn"
                >
                  Mehr Infos
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  className="neon-btn delete"
                  onClick={() => handleDelete(m.id)}
                  sx={{ mt: 1, ml: 1 }}
                >
                  Delete
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
              setEditMovie(movie);
              setEditOpen(true);
            }
          }}
        >
          Bearbeiten
        </Button>

        <Button onClick={() => setCreateOpen(true)}>Hinzufügen</Button>
      </Box>
      <Button variant="outlined" color="error" onClick={handleLogout}>
        Logout
      </Button>

      <MovieCreateDialog
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreate={async (newMovie) => {
          await MovieService().addMovie(newMovie);
          MovieService().getAllMovies().then(setMovies);
          setCreateOpen(false);
        }}
      />

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
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            ></Box>
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
                    "US Gross": editUsGross,
                    "Worldwide Gross": editWorldWideGross,
                    "US DVD Sales": USDVDSales,
                    "Production Budget": productionBudget,
                    "Release Date": releaseDate,
                    "MPAA Rating": MPAARating,
                    "Running Time min": runningTime,
                    Distributor: distributor,
                    Source: source,
                    "Major Genre": majorGenre,
                    "Creative Type": creativeType,
                    "Rotten Tomatoes Rating": rottenTomatoesRating,
                    "IMDB Rating": imdbRating,
                    "IMDB Votes": imdbVotes,
                    id: id,
                  });
                  setEditMode(false);
                  setOpen(false);
                  MovieService().getAllMovies().then(setMovies);
                }}
                variant="contained"
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

      <MovieEditDialog
        open={editOpen}
        movie={editMovie}
        onClose={() => setEditOpen(false)}
        onSaved={() => MovieService().getAllMovies().then(setMovies)}
      />
    </>
  );
}

export default Homepage;
