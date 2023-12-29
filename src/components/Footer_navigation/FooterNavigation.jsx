import { NavLink } from "react-router-dom";
import './footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faUtensils, faShip, faTv, faSuitcaseMedical, faBasketShopping } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

export function FooterNavigation() {
    const activeLink = 'link-nav-footer link-nav-footer--active';
    const normalLink = 'link-nav-footer';
    const basket = useSelector((store) => store?.basket)

        return(
        <nav className="navbar fixed-bottom">
                  <NavLink to='/restaurant' className={({ isActive }) => (isActive ? activeLink : normalLink)}>
                        <div className={'navigation-item'}>
                              <p className={"nav-link-name"}>
                              <FontAwesomeIcon style={{color:'#133888'}} icon={faUtensils} />
                              </p>
                              <p className="footer-title">Ресторан</p>
                        </div>
                  </NavLink>
                  <NavLink to='/excursions' className={({ isActive }) => (isActive ? activeLink : normalLink)}>
                        <div className={'navigation-item'}>
                              <p className={"nav-link-name"}>
                              <FontAwesomeIcon style={{color:'#133888'}} icon={faShip} />
                              </p>
                              <p className="footer-title">Экскурсии</p>
                        </div>
                  </NavLink>
                  <NavLink to='/tv' className={({ isActive }) => (isActive ? activeLink : normalLink)}>
                        <div className={'navigation-item'}>
                              <p className={"nav-link-name"}>
                                    <FontAwesomeIcon style={{color:'#133888'}} icon={faTv} />
                              </p>
                              <p className="footer-title">ТВ-каналы</p>
                        </div>
                  </NavLink>
                  <NavLink to='/service' className={({ isActive }) => (isActive ? activeLink : normalLink)}>
                        <div className={'navigation-item'}>
                              <p className={"nav-link-name"}>
                                    <FontAwesomeIcon style={{color:'#133888'}} icon={faSuitcaseMedical} />
                              </p>
                              <p className="footer-title">Сервисы</p>
                        </div>                 
                  </NavLink>
                  <NavLink to={'/basket'} className={({ isActive }) => (isActive ? activeLink : normalLink)}>
                  <div className={'navigation-item'}>
                              <p className={"nav-link-name"}>
                                    <FontAwesomeIcon style={{color:'#133888'}} icon={faBasketShopping} />
                              </p>
                              <p className="footer-title">Корзина</p>
                              {basket.length ? <div className="circle">
                                    <span style={{marginTop:'0px'}}>{basket?.length}</span>
                              </div> : ''}
                        </div>
                  </NavLink>
                  <NavLink to='/main' className={({ isActive }) => (isActive ? activeLink : normalLink)}>
                        <div className={'navigation-item'}>
                              <p className={"nav-link-name"}>
                                    <FontAwesomeIcon  style={{color:'#133888'}} icon={faHouse} />
                              </p>
                              <p className="footer-title">Профиль</p>
                        </div>
                  </NavLink>
            </nav>
      )
}
