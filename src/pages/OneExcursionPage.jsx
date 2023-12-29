import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import './stylePage/Excursion.css'
import { FooterNavigation } from '../components/Footer_navigation/FooterNavigation';
import FreeExcursion from '../components/CardExcursions/FreeExcursion';
import PaidExcursion from '../components/CardExcursions/PaidExcursion';
import { getExcThunk } from '../redux/actions/infoAction';
import BackButton from '../components/BackButton/BackButton';
import { getBasketThunk } from '../redux/actions/basketAction';

export default function OneExcursionPage() {
  const excursions = useSelector((store) => store?.info);
  const room = useSelector((store) => store?.user?.data?.room);
  const id = useParams()
  const ex = excursions?.find((e) => e?.city_id == id?.excursionsid?.replace(/\D/g,''))
  const basket = useSelector((store) => store?.basket)
  const paid_excursion = ex?.excursions?.paid_excursions
  const free_excursion = ex?.excursions?.free_excursions
  const dispatch = useDispatch();


  const data = {
    info: {
      action: "get_excursions"
    }
  }
  const getBasket = {
    info: {
      action: 'get_basket_contents',
      room: room
    }
  }

  useEffect(() => {
          dispatch(getExcThunk(data))
          dispatch(getBasketThunk(getBasket))
      }, [basket?.length]);

  useEffect(() => {
        dispatch(getBasketThunk(getBasket))
        window.scrollTo(0, 0)
      }, []);
      
      if(!room){
        return <Navigate to='/' /> 
    }
    

  return (
    <>
    <BackButton/>
    {/* <BasketButton basket={basket}/> */}
    <div>
      <div>
        <h1 className='title-excursion'>ЭКСКУРСИИ</h1>
      </div>
      <div className="excursion-card">
        <img className='img-one-excursion' src={ex?.city_image} alt='!#'/>
        <h1 className='name-one-excursion'>{ex?.city_name}</h1>
      </div>
      <div>
        <h3 className='name-fp'>
          Бесплатные экскурсии 
        </h3>
          {free_excursion?.map((el) => <FreeExcursion key={el?.id} item={el}/> )}
      </div>
      <div>
        <h3 className='name-fp'>
          Платные экскурсии 
        </h3>
          {paid_excursion?.map((el) =>  <PaidExcursion key={el?.id} item={el}/> )}
      </div>
    </div>
    <FooterNavigation />
    </>
  )
}
