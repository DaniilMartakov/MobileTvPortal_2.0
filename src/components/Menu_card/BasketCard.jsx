import React, { useState } from 'react'
import { changeBasketThunk, getBasketThunk, removeBasketThunk } from '../../redux/actions/basketAction'
import { useDispatch, useSelector } from 'react-redux'

export default function BasketCard({item}) {
    const room = useSelector((store) => store?.user?.data?.room)
    const dispatch = useDispatch()
    const product = item?.product_id
    const category = item?.category
    const [count, setCount] = useState(Number(item?.count))
    const [open, setOpen] = useState(true)
    const firstPrice = item?.price / item?.count
    const totalPrice = firstPrice * count
    const allbasket = {
      info : {
          action: 'get_basket_contents',
          room: room
      }
  }
    const data = {
      info: {
        action: "change_basket_contents",
        room: room,
        category: category,
        product_id: product,
        count: count + 1
      }
  }
  const data1 = {
    info: {
      action: "change_basket_contents",
      room: room,
      category: category,
      product_id: product,
      count: count - 1
    }
}
  const remove = {
    info: {
      action: "remove_from_basket",
      room: room,
      category: category,
      product_id: product,
    }
}

    const increment = () => {
            setCount(count + 1)
            setOpen(false)
              dispatch(changeBasketThunk(data))
              setTimeout(() => {
                dispatch(getBasketThunk(allbasket))
              },100)

      }
      const decrement = () => {
        if(count > 1){
          setCount(count - 1)
          setOpen(false)
            dispatch(changeBasketThunk(data1))
            setTimeout(() => {
              dispatch(getBasketThunk(allbasket))
            },100)
        }
      }
      const deleteHandler = () => {
        dispatch(removeBasketThunk(remove))
        setTimeout(() => {
          dispatch(getBasketThunk(allbasket))
        },100)
  }


  return (
  <div className="card-body-basket" >
    <div>
      <h5 className="card-title-basket">{item.product_name}</h5>
      <div style={{display: 'flex' , alignItems: 'center' ,justifyContent:'space-between', width:'30%',marginTop: '15px'}}>
        <button className="btn-basket" onClick={decrement} style={{paddingBottom: '5px'}}> - </button>
          <h3 style={{margin: '0px' , fontSize:'20px'}}>{open ? item?.count : count}</h3>
        <button className="btn-basket" onClick={increment} style={{paddingBottom: '5px'}} > + </button>          
      </div>
    </div>
    <div className='total-price-basket'>
        <p className="price-basket">{totalPrice}руб.</p>
        <button className='delete-btn' onClick={deleteHandler}>Удалить</button>
    </div>
  </div>
  )
}
