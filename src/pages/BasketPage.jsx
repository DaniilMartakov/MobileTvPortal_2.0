import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { FooterNavigation } from '../components/Footer_navigation/FooterNavigation'
import './stylePage/Buscket.css'
import { useDispatch, useSelector } from 'react-redux'
import { getBasketThunk } from '../redux/actions/basketAction'
import BasketCard from '../components/Menu_card/BasketCard'
import BackButton from '../components/BackButton/BackButton'
import { Navigate } from 'react-router-dom'



export default function BasketPage() {
    const user = useSelector((store) => store?.user)
    const basket = useSelector((store) => store?.basket)
    const dispatch = useDispatch()
    const room = user?.data?.room
    const barBasket = basket.filter((el) => el.category === 'bar')
    const servicesBasket = basket.filter((el) => el.category === 'services')
    const excursionsBasket = basket.filter((el) => el.category === 'excursions')

    const totalPrice = basket.map((e) => e.price).reduce((acc, number) => +acc + +number, 0)


    const data = {
        info : {
            action: 'get_basket_contents',
            room: room
        }
    }
    useEffect(() => {
        window.scrollTo(0, 0)
        dispatch(getBasketThunk(data))
    }, [])

    if(!room){
      return <Navigate to='/' /> 
  }

  return (
    <>
    <Container>
      <div>
        <BackButton />
        <h1 className='buscket-name'>КОРЗИНА</h1> 
      </div>
        {basket.length >= 1 ? (
          <>
          {barBasket.length >= 1 ? (
          <>
            <h1 className='basket-title'>Заказы Ресторана</h1>
            {barBasket?.map((el) =>  <BasketCard key={el?.id}  item={el} />)}
          </>
          ) : '' }
          {servicesBasket.length >= 1 ? (
          <>
            <h1 className='basket-title'>Другие заказы</h1>
            {servicesBasket?.map((el) =>  <BasketCard key={el?.id}  item={el} />)}
          </>
          ) : '' }
          {excursionsBasket.length >= 1 ? (
          <>
            <h1 className='basket-title'>Экскурсии</h1>
            {excursionsBasket?.map((el) =>  <BasketCard key={el?.id}  item={el} />)}
          </>
          ) : '' }
          </>
          )
        : 
        (<h1 className='basket-empty'>Корзина пуста</h1>)}
      
        {totalPrice > 0 ? (
        <>
        <hr />
        <div className='basket-order'>
          <h3 className='title-order'>Общая стоимость заказа : {totalPrice}руб.</h3>
          <button className='btn-order'>Оформить заказ</button>
        </div>
        </>
        ): ''}
    </Container>
    <FooterNavigation />
    </>
  )
}
