import React, { useState } from 'react'

export default function Search({handleSearch}) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    handleSearch(event.target.value);
  };

  return (
    <>
      <button className='btnbtn'>🔍</button>
      <input
        type="text"
        placeholder="Поиск..."
        value={searchTerm}
        onChange={handleChange}
        className='input-tv'
      />
    </>
  );
}
