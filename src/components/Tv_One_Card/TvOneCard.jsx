import React from 'react'

export default function TvOneCard({film ,clickHandler}) {
  const title = film?.title.replace(/-/g, " ").replace(/[0-9]/g, "").replace(/_/g, "").replace(/.mp/g, "")
  const UpperTitle = title.charAt(0).toUpperCase() + title.slice(1,20)
  return (
    <div className="card-films" onClick={()=>clickHandler(film)}>
      <img src={film?.poster} className="card-img-film" alt="..." />
      <h5 className="card-title">{UpperTitle}</h5>
    </div>
  )
}
