import React from 'react'


export default function CardExcursions({item}) {

  return (
    <>
      <div className="excursion-card">
        <img src={item.city_image} className="card-img-excursion" alt="!#" />
        <h1 className='excursion-name'>
            {item.city_name }
        </h1>
      </div>
    </>
  )
}
