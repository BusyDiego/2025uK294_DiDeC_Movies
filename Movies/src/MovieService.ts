import type { AxiosInstance } from "axios";
import { baseInstance } from "./Api";

const MovieService = (api: AxiosInstance = baseInstance) => ({
  getAllMovies: async () => {
    const data = await api.get("/movies").catch((err) => {
      throw err;
    });
    return data.data;
  },

  updateMovie: async (id: string, movie: any) => {
    const token = localStorage.getItem("accessToken");
    const data = await api
      .put(`/movies/${id}`, movie, {
        headers: {
          Authorization: token ?? "",
          "Content-Type": "application/json",
        },
      })
      .catch((err) => {
        throw err;
      });
    return data.data;
  },

  getMovieById: async (id: string | number) => {
    const token = localStorage.getItem("accessToken");
    const data = await api
      .get(`/movies/${id}`, {
        headers: {
          Authorization: token ?? "",
        },
      })
      .catch((err) => {
        throw err;
      });
    return data.data;
  },

  addMovie: async (movie: any) => {
    const token = localStorage.getItem("accessToken");
    const data = await baseInstance
      .post("/movies", movie, {
        headers: {
          Authorization: token ?? "",
          "Content-Type": "application/json",
        },
      })
      .catch((err) => {
        throw err;
      });
    return data.data;
  },
});

export default MovieService;
