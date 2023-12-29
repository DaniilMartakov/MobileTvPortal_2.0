import {FooterNavigation} from "../components/Footer_navigation/FooterNavigation";
import React, { useEffect } from "react";
import {Container} from "react-bootstrap";
import './stylePage/Main.css'
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBasketShopping, faDoorOpen, faFileCircleCheck, faShip, faSuitcaseMedical, faTv, faUtensils } from "@fortawesome/free-solid-svg-icons";
import { NavLink, Navigate } from "react-router-dom";
import Orders from "../components/Main_card/Orders";
import { getOrdersThunk } from "../redux/actions/ordersAction";
import { persistor } from "../redux/store";



export default function MainPage() {

    const user = useSelector(store=> store.user);
    const orders = useSelector(store=> store.order)
    const dispatch = useDispatch()
    const room = user?.data?.room
    const data = {
        info: {
            action: 'get_orders_history',
            room: room
        }
    }
    useEffect(() => {
        dispatch(getOrdersThunk(data))
    }, [])

    const handleLogout = () => {
        persistor.purge()
    }



    if(!room){
        return <Navigate to='/' /> 
    }

    
    return (
        <>
        <Container id="container">
        <div>
            <h1 className='profile-name'>ПРОФИЛЬ</h1>
        </div>
        <div className="profile-info">
            <h2 className="profile-title-info">Информация о пользователе</h2>
            <p className="description-main"> Номер комнаты: {user?.data.room}</p>
            <p className="description-main">ФИО : {user?.data.guest}</p>
        </div>
        <div className="profile-card-info">
            <NavLink to={'/restaurant'} style={{textDecoration: 'none'}}>
                <div className="profile-card" onClick={handleLogout}>
                    <FontAwesomeIcon icon={faUtensils}  className="profile-icon"  />
                    <p className="profile-card-name" >Ресторан</p>
                </div>
            </NavLink>
            <NavLink to={'/excursions'} style={{textDecoration: 'none'}}>
                <div className="profile-card" onClick={handleLogout}>
                    <FontAwesomeIcon icon={faShip}  className="profile-icon"  />
                    <p className="profile-card-name" >Экскурсии</p>
                </div>
            </NavLink>
            <NavLink to={'/tv'} style={{textDecoration: 'none'}}>
                <div className="profile-card" onClick={handleLogout}>
                    <FontAwesomeIcon icon={faTv}  className="profile-icon"  />
                    <p className="profile-card-name" >Телевидение</p>
                </div>
            </NavLink>
            <NavLink to={'/service'} style={{textDecoration: 'none'}}>
                <div className="profile-card" onClick={handleLogout}>
                    <FontAwesomeIcon icon={faSuitcaseMedical}  className="profile-icon"  />
                    <p className="profile-card-name" >Сервис улуги</p>
                </div>
            </NavLink>
            <NavLink to={'/basket'} style={{textDecoration: 'none'}}>
                <div className="profile-card">
                    <FontAwesomeIcon icon={faBasketShopping} className='profile-icon' />
                    <p className="profile-card-name">Корзина</p>
                </div>
            </NavLink>
                <div className="profile-card" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <FontAwesomeIcon icon={faFileCircleCheck} className="profile-icon" />
                    <p className="profile-card-name">История заказов</p>
                </div>
            <div className="div1">
                <NavLink to={'/'} style={{textDecoration: 'none'}}>
                    <div className="profile-card" onClick={handleLogout}>
                        <FontAwesomeIcon icon={faDoorOpen}  className="profile-icon"  />
                        <p className="profile-card-name" >Выход</p>
                    </div>
                </NavLink>
            </div>
        </div>
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title" style={{fontWeight:'bold'}} id="exampleModalLabel">История заказов</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {orders && orders?.map((el) => <Orders  item={el} key={el?.id}/> )}
                    </div>
                </div>
            </div>
        </div>
        </Container>
        {/* <FooterNavigation /> */}
    </>
    )
}