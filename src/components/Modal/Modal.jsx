import React from 'react'
import './modal.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'

export default function Modal({active , setActive , item , count , name}) {
    const desc = item.description
    const price = item?.price * count
    return (
    <div className={active ? 'modalka active' : 'modalka'} onClick={() => setActive(false)}>
        <div className={active ? "modal__content active" : "modal__content"} onClick={e => e.stopPropagation()}>
            <div className="modal__title">
                <div >
                    Товар добавлен в корзину
                </div>
                <div onClick={() => setActive(false)} style={{backgroundColor: '#f5ffff', width: '40px' , height: '40px' , borderRadius: '3px', display: 'flex',justifyContent: 'center',alignItems: 'center' , boxShadow: '1.5px 1.5px 0px 0px #133888' , border: '1px #133888 solid'}}>
                    <FontAwesomeIcon  style={{color:'#133888' }} icon={faX} />
                </div>
            </div>
            <hr style={{borderColor: 'black'}} />
            <div className="modal__text">
                <p className='modalka-title'>
                {name}
                </p>
                <div style={{display:'flex', alignItems: 'center', marginBottom: '15px'}}>
                {item.src ? <img src={item.src} className='modal-img' alt='!#'/>: '' }
                <div  className='modal-desc'>
                {desc ? 
                    desc
                    : 
                    'Oписание отсутствует' }
                    </div>
                <br />
                </div>
                {count ? `Колличество: ${count}`: '' }
                <br />
                {price ? `Общая сумма: ${price}руб.`:'' }
            </div>
        </div>
    </div>
    )
}
