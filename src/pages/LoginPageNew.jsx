import { faDownload, faSignIn } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import './stylePage/LoginNew.css'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { getUser } from '../redux/actions/authActions';

export default function LoginPageNew() {
    const [inputValue, setInputValue] = useState('введите каюту...');
    // const [prompt, promptToInstall] = useAddToHomescreenPrompt();
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };
    
    const data = {
        info: {
            action: 'auth' ,
            room : inputValue
        },
    };
    
    
    const sendData = async () => {
        await axios.post('https://базара.net/index.php?route=/react/controller', data )
        .then((response) =>{
            if(response.data.success === true){
                dispatch(getUser(response.data))
                navigate('/main')
            }else alert('Такой комнаты не существует!')
        })
        .catch (console.error());
        };

    const handleSubmit = (e) => {
        e.preventDefault();
        sendData();
    };
  return (
    <>
        <div className='aut-fake-div'>
        </div>
        <div className='auth-general-div'>
            <div className='auth-dow-div'>
                <h1 className='auth-title'>
                    Авторизация
                </h1>
                <button className='auth-dow-btn'>
                    <FontAwesomeIcon icon={faDownload} size={'lg'}/>
                </button>
            </div>
            <div className='auth-input-div'>
                <h2 className='auth-subtitle1'>
                    Введите номер каюты:
                </h2>
                <input className='auth-input' type="text" placeholder='...' onChange={handleInputChange} />
            </div>
            <div className='auth-sign-div'>
                <button className='auth-sign-btn' onClick={handleSubmit}>
                    Войти
                </button>
            </div>
            <img src="./img/sShip.png" alt="" className='auth-img'/>
        </div>
    </>
  )
}
