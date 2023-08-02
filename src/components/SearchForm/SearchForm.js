import './SearchForm.css'
import React from "react";
import { useForm } from 'react-hook-form';

function SearchForm({ showFilmList }) {
  const { register, formState: {errors}, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    showFilmList()
  };

  return (
    <section className="searchForm">

      <form className="searchForm__field" onSubmit={handleSubmit(onSubmit)} >

        <div className="searchForm__input-box">
          <input
            className="searchForm__input"
            name="searchForm"
            placeholder="Фильм"
            {...register("searchForm", {
              required: "Нужно ввести ключевое слово"
            })}
          />
          <button className="searchForm__button" type="submit" />
        </div>

        <div className="searchForm__textError">
          {errors?.searchForm && <span>{errors?.searchForm?.message}</span>}
        </div>

      </form>

      <div className="searchForm__switch">
        <label className="switch">
          <input
              className="checkbox"
              type="checkbox" />
          <span className="slider" />
        </label>
        <h2 className="switch-name">Короткометражки</h2>
      </div>

    </section>

  )
}

export default SearchForm;
