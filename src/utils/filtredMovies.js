import { SHORT_FILM } from "./constants"

export function filterMoviesDur(movies) {
    return movies.filter((movie) => movie.duration <= SHORT_FILM)
  }

export function filterMoviesVal(movies, value) {
  const filtered = movies.filter((movie) => {
    return (
      movie.nameRU.toLowerCase().includes(value.toLowerCase()) ||
      movie.nameEN.toLowerCase().includes(value.toLowerCase())
    )
  })
    return filtered;
}
