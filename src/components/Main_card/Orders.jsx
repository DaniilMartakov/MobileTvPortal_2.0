import React from 'react'

export default function Orders( {item} ) {
    const info = JSON.parse(item?.structure)
  return (
    <div className='modal-info'>
        {info.map((el) => <div className='modal-info-title'  key={el?.product_id}>  {el?.product} <br /> 
        <p className='modal-description' >
        Колличество: {el?.count}
        </p>
        </div>)}
        <p className='modal-description'>
        Время заказа : {item?.time}{' '}{item?.date}
        </p>
        <p className='modal-description'>Стоимость : {item?.sum}</p>
    </div>
  )
}
