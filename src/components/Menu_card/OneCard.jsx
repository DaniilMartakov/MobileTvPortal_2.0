import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addBasketThunk } from '../../redux/actions/basketAction'
import Modal from '../Modal/Modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBasketShopping } from '@fortawesome/free-solid-svg-icons'



export default function OneCard({el}) {
  const room = useSelector((store) => store?.user?.data?.room)
  const dispatch = useDispatch()
  const product = el?.id
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
        category: 'bar',
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
    <div className="text-start">
        <div className="card-body-rest" >
            <div style={{display:'flex', justifyContent: 'space-between'}}>
              <div style={{padding: '10px', paddingBottom:0}}>
                <h5 className="card-title-menu">{el.name}</h5>
                <p className='rest-price'>{el.price}руб.</p>
              </div>
                <img src={el.src} className='img-card-rest' alt='!#'/>
            </div>
          <div className='div-count-rest'>
            <div className='card-body-count-rest'>
            <button className="btn-count-rest" onClick={decrement} style={{paddingLeft : '10px' , paddingRight: '10px', paddingBottom: '5px'}}> - </button>
                    <h3 className='rest-count'>{count}</h3>
            <button className="btn-count-rest" onClick={increment} style={{paddingLeft : '10px' , paddingRight: '10px',paddingBottom: '4px'}} > + </button>          
            <button className="btnPrimary" onClick={addBasket}>
              <FontAwesomeIcon className='rest-btn-icon'  icon={faBasketShopping} />
            </button>
            </div>
          </div>
          <Modal active={modalActive} setActive={setModalActive} item={el} name={el.name} count={count}/>
      </div>
    </div>
  </>
  )
}