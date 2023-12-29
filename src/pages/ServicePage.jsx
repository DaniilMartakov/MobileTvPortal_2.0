import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { FooterNavigation } from '../components/Footer_navigation/FooterNavigation'
import { useDispatch, useSelector } from 'react-redux'
import { getServiceThunk } from '../redux/actions/infoAction'
import CategoryService from '../components/ServiceComponents/CategoryService'
import './stylePage/Service.css'
import ServiceCard from '../components/ServiceComponents/ServiceCard'
import { getBasketThunk } from '../redux/actions/basketAction'
import { Navigate } from 'react-router-dom'
import BackButton from '../components/BackButton/BackButton'

export default function ServicePage() {
    const service = useSelector((store) => store?.info)
    const basket = useSelector((store) => store?.basket)
    const room = useSelector((store) => store?.user?.data?.room)
    const dispatch = useDispatch()

    const category = service?.categories

    const medical = service?.cards?.medical
    const massage = service?.cards?.massage
    const other = service?.cards?.other
    const resettlement = service?.cards?.resettlement
    const allService = medical?.concat(massage?.concat(other?.concat(resettlement)))

    const [filterService, setFilterService] = useState()
    const [title ,setTitle] = useState()
    const [activeIndex, setActiveIndex] = useState(null);


    const clickHandler = (el, index) => {
        setFilterService(allService?.filter((i) => i.category_id == el.id))
        setTitle(el)
        setActiveIndex(index)
    }


    const data = {
        info: {
            action: 'menu_services'
        }
    }

    const getBasket = {
        info: {
          action: 'get_basket_contents',
          room: room
        }
      }
      


    useEffect(() => {
        dispatch(getServiceThunk(data))
        dispatch(getBasketThunk(getBasket))
  },[basket?.length]);

  if(!room){
    return <Navigate to='/' /> 
}

  return (
<>
    <BackButton />
        <Container>
            <div>
                <h1 className='service-name'>СЕРВИСЫ</h1>
            </div>
            <div>
                <div className='category-service' >
                        {category?.length > 0 ? (category?.map((el, index) => 
                            <div className={index === activeIndex ? "category-name-service--active" : "category-name-service"} onClick={() => clickHandler(el, index)} key={el.id}>
                                <CategoryService  item={el} />
                            </div>)) : ""
                        }
                </div>
                <div className='div-card-service'>
                    {title ? (<p className='p-card-service'>{title?.name}</p>) : (<p className='p-card-service'>Выберите категорию в которой хотели бы получить услугу</p>)}
                </div>
                <div className='card-service'>
                    {filterService?.map((el ) =>
                        <ServiceCard item={el}  key={el.id}/>
                    ) }
                </div>
            </div>
        </Container>
        <FooterNavigation />
    </>  
    )
}
