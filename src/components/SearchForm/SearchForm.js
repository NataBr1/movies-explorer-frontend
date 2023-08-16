import './SearchForm.css'
import React from "react";

function SearchForm({ value, setValue, onSubmitSearch, onFilterMovies, checkBox, setCheckBox }) {

  const [error, setError] = React.useState('');

  function handleSubmit(evt) {
    evt.preventDefault();
    if (!value) {
      setError('Нужно ввести ключевое слово');
    } else {
      setError('');
      onSubmitSearch(value);
    }
  }

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
          />
          <button className="searchForm__button" type="submit" />
        </div>

        <div className="searchForm__textError">{error}</div>

      </form>

      <div className="searchForm__switch">
        <label className="switch">
          <input
              className="checkbox"
              type="checkbox"
              onClick={() => setCheckBox(!checkBox)}
              onChange={onFilterMovies}
              defaultChecked={checkBox} />
          <span className="slider" />
        </label>
        <h2 className="switch-name">Короткометражки</h2>
      </div>

    </section>

  )
}

export default SearchForm;
