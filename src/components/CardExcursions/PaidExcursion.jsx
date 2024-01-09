import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addBasketThunk } from '../../redux/actions/basketAction'
import Modal from '../Modal/Modal';

export default function PaidExcursion({item}) {
  const room = useSelector((store) => store?.user?.data?.room);
  const product = item?.id;
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState('');
  const [value, setValue] = useState('');
  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  }
  const handleValueChange = (event) => {
    setValue(event.target.value);
  }
  const foundObject = item?.prices?.find(obj => obj.min_count == value);
  const data = {
      info: {
        action: "add_to_basket",
        room: room,
        category: 'excursions',
        product_id: product,
        count: quantity == '' ? 1 : quantity,
        product_name:`${item?.name} (Группа от ${value == '' ? item?.prices[0]?.min_count : value} человек)`,
        price: foundObject?.price == undefined ?  item?.prices[0]?.price : foundObject?.price , 
      }
  }
  const [modalActive, setModalActive] = useState(false)

  const addBasket = () => {
    dispatch(addBasketThunk(data))
    setModalActive(true)
  }
  const formattedText = item.description.replace(/ /g, '\n').replace(/&gt;&gt;&gt;/g, '...');
  const formattedText1 = formattedText.replace(/<br\s*[\/]?>/gi, "\n");
  

  return (
    <div className='excursion-description-div'>
      <h5 className='title-excursion-pf'>{item.name}</h5>
      <p className='description-excursion-pf'> {formattedText1}</p>
      <table className='table-excursion'>
        <thead>
          <tr className='tr-excursion'>
            <th>Группа :</th>
            <th>Цена :</th>
          </tr>
        </thead>
        <tbody>
          {item?.prices?.map((e) => (
            <tr key={e?.min_count}  className='tr-excursion' >
              <td>
                <div className='td-table' >
              <img className='count-img' src={item.group_image}   alt='!#'/>
              <p style={{margin: '0px', fontWeight: '700'}}>{e.min_count} человек</p>
                </div>
              </td>
              <td>
              <div className='td-table'>
              <img className='count-img' src={item.cost_image} alt='!#'/>
              <p style={{margin: '0px', fontWeight: '700'}}>{e.price}₽</p>
              </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{marginTop: '15px'}}>
        <div style={{display: 'flex', marginTop: '10px', alignItems: 'center'}}>
          <label className='label-excursion'>Количество человек : </label>
          <input  style={{width: '60px', fontSize: '20px', fontWeight: '600', color: '#133888' , backgroundColor: '#f5ffff' , borderRadius: '3px' , border: '1px #133888 solid'}}type="number" value={quantity} onChange={handleQuantityChange} />
        </div>
        <div style={{display: 'flex', marginTop: '10px'}}>
          <label className='label-excursion'>Группа :</label>
          <select style={{fontSize: '20px', fontWeight: '600', color: '#133888', backgroundColor: '#f5ffff' , borderRadius: '3px' , border: '1px #133888 solid'}} value={value} onChange={handleValueChange}>
            <option value="">Выберите группу</option>
            { item?.prices?.map((el, index) => 
              <option key={index} value={el.min_count}>{el.min_count}</option>)
            }
          </select>
        </div>
      </div>
      <button onClick={addBasket} className='btn-excursion'>Добавить в корзину</button>
      <Modal active={modalActive} setActive={setModalActive} item={item} name={item.name} />
    </div>
  )
}
