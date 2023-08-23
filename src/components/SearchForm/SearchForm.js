import './SearchForm.css'
import React from "react";
import { useLocation } from 'react-router-dom';

function SearchForm({
  value,
  setValue,
  onSubmitSearch,
  onFilterMovies,
  checkBox,
  setCheckBox,
  getFavoriteMovies,
  isLoading,
  setRawMovies,
  setSearchMovies,
  setIsShowMoviesFavorites,
  favoriteMovies
})

{
  const location = useLocation();
  const [error, setError] = React.useState('')

  function handleSubmit(evt) {
    evt.preventDefault();
    if (!value) {
      if (location.pathname === "/movies") {
        setError("Нужно ввести ключевое слово")
        // setSearchMovies([])
        // setRawMovies([])
        // localStorage.setItem("findedMovies", [])
        // localStorage.setItem("findedShortMovies", [])
        return
      }
      // else {
      //   getFavoriteMovies()
      // }
    } else {
      onSubmitSearch(value);
      setError("")
    }
  }

  const handleChange = () => {
    setCheckBox(!checkBox);
    onFilterMovies()
  };

  return (
    <section className="searchForm">

      <form className="searchForm__field" onSubmit={handleSubmit} >

        <div className="searchForm__input-box">
          <input
            className="searchForm__input"
            name="searchForm"
            placeholder="Фильм"
            value={value}
            onChange={(evt) => setValue(evt.target.value)}
            disabled={isLoading}
          />
          <button className="searchForm__button" type="submit" disabled={isLoading} />
        </div>

        <div className="searchForm__textError">{error}</div>

      </form>

      <div className="searchForm__switch">
        <label className="switch">
          <input
              className="checkbox"
              type="checkbox"
              checked={checkBox}
              onChange={handleChange}
              disabled={isLoading} />
          <span className="slider" />
        </label>
        <h2 className="switch-name">Короткометражки</h2>
      </div>

    </section>

  )
}

export default SearchForm;
