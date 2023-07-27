import './SearchForm.css'
import React from "react";

function SearchForm() {
  return (
    <section className="searchForm">

      <form className="searchForm__field">
        <input
          className="searchForm__input"
          placeholder="Фильм"
          type="text"
          required
        />
        <button className="searchForm__button" type="button" />
      </form>

      <div className="searchForm__switch">
        <label className="switch">
          <input className="checkbox" type="checkbox" />
          <span className="slider" />
        </label>
        <h2 className="switch__name">Короткометражки</h2>
      </div>

    </section>

  )
}

export default SearchForm;
