import React, { useState } from 'react'

export default function RestNew() {
    const [selectedCategory, setSelectedCategory] = useState("all");

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const filterMoviesByCategory = (movies) => {
    if (selectedCategory === "all") {
      return movies;
    }
    return movies.filter((movie) => movie.category === selectedCategory);
  };

  // Пример данных о фильмах
  const movies = [
    { title: "Фильм 1", category: "категория 1" },
    { title: "Фильм 2", category: "категория 2" },
    { title: "Фильм 3", category: "категория 1" },
    // ...остальные фильмы
  ];

  const filteredMovies = filterMoviesByCategory(movies);

  return (
<div>
      <select value={selectedCategory} onChange={handleCategoryChange}>
        <option value="all">Все</option>
        <option value="категория 1">Категория 1</option>
        <option value="категория 2">Категория 2</option>
        {/* ...другие категории */}
      </select>

      {filteredMovies.map((movie, index) => (
        <p key={index}>{movie.title}</p>
      ))}
    </div>
  )
}
