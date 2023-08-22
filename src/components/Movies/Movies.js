import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import PopupMenu from "../PopupMenu/PopupMenu";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";
import './Movies.css';
import React from "react";
import { SHORT_FILM } from "../../utils/constants"
import moviesApi from '../../utils/MoviesApi';

function Movies({
  movies,
  favoriteMovies,
  isLoading,
  onClick,
  isOpen,
  onClose,
  saveFavoriteMovie,
  deleteFavoriteMovie,
  errorMessage,
  setErrorMessage,
  setMovies,
  setIsLoading,
  searchMovies,
  setSearchMovies
})

{
  //const location = useLocation();
  const [value, setValue] = React.useState(''); //значение поля поиска фильма
  const [checkBox, setCheckBox] = React.useState(false); //Значение переключателя




  return (
    <div className="movies">

      <Header onClick={onClick} classNameHeader={"header"} />

      <main className="sticky-content">

        <PopupMenu isOpen={isOpen} onClose={onClose} />

        <SearchForm
          value={value}
          setValue={setValue}
          // onSubmitSearch={onSubmitSearch}
          // onFilterMovies={handleCheckBox}
          checkBox={checkBox}
          setCheckBox={setCheckBox}
          isLoading={isLoading}
          setSearchMovies={setSearchMovies}/>

        {isLoading ? <Preloader /> : ""}
        {isLoading ? "" :
          (errorMessage ? (<p className="search__error">{errorMessage}</p>) : "")
        }


        {isLoading ? "" :
          <MoviesCardList
            movies={searchMovies}
            saveFavoriteMovie={saveFavoriteMovie}
            deleteFavoriteMovie={deleteFavoriteMovie}
            favoriteMovies={favoriteMovies}
            searchMovies={searchMovies} />
        }


      </main>

      <Footer />

    </div>

  );
};

export default Movies;
