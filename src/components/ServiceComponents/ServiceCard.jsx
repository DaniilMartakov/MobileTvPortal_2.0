import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addBasketThunk } from '../../redux/actions/basketAction'
import Modal from '../Modal/Modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBasketShopping } from '@fortawesome/free-solid-svg-icons'

export default function ServiceCard({item }) {
  const room = useSelector((store) => store?.user?.data?.room)
  const dispatch = useDispatch()
  const product = item?.id
  const [count, setCount] = useState(1)

  const increment = () => {
    setCount(count + 1)
  }

  const decrement = () => {
    if(count > 1){
      setCount(count - 1)
    }
  }
  const data = {
    info: {
      action: "add_to_basket",
      room: room,
      category: 'services',
      product_id: product,
      count: count
    }
  }


  const addBasket = () => {
    dispatch(addBasketThunk(data))
    setModalActive(true)
  }
  const [modalActive, setModalActive] = useState(false)

  return (
  <>
    <div className="service-one-card">
        <div className="card-body-service" >
          <div style={{display:'flex', justifyContent: 'space-between'}}>
            <div style={{padding: '10px', paddingBottom:0}}>
              <h5 className="card-title-service">{item?.title}</h5>
              <p className='price-service'>{item?.price}руб.</p>
            </div>
            <img src={item?.src} className='img-card-service' alt='!#'/>
          </div>
            <Modal active={modalActive} setActive={setModalActive} item={item} name={item.title} count={count}/>
        </div>
        <div className='div-count-service'>
          <div className='card-body-count-service'>
            <button className="btn-count" onClick={decrement} style={{paddingLeft : '10px' , paddingRight: '10px', paddingBottom: '5px'}}> - </button>
            <h3 className='count-service'>{count}</h3>
            <button className="btn-count" onClick={increment} style={{paddingLeft : '10px' , paddingRight: '10px',paddingBottom: '4px'}} > + </button>          
            <button className="btn-service" onClick={addBasket}>
            <FontAwesomeIcon  icon={faBasketShopping} />
            </button>
          </div>
        </div>
    </div>
  </>
  )
}
