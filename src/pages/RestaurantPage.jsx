import React, { useEffect, useState } from 'react'
import { FooterNavigation } from '../components/Footer_navigation/FooterNavigation'
import { Container } from 'react-bootstrap'
import './stylePage/Restaurant.css'
import OneCard from '../components/Menu_card/OneCard'
import { useDispatch, useSelector } from 'react-redux'
import { getBarThunk } from '../redux/actions/infoAction'
import { getBasketThunk } from '../redux/actions/basketAction'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMartiniGlass, faMugHot, faUtensils, faWineGlass } from '@fortawesome/free-solid-svg-icons'
import { Navigate } from 'react-router-dom'
import BackButton from '../components/BackButton/BackButton'
import Search from '../components/Tv_One_Card/Search'

export default function RestaurantPage() {
  const allBar = useSelector((store) => store.info);
  const basket = useSelector((store) => store?.basket);
  const room = useSelector((store) => store?.user?.data?.room);
  const dispatch = useDispatch();
  const menu = allBar?.cards;
  const category = allBar?.categories;
  const restCard= menu?.rest_card;
  const barCard= menu?.bar_card;
  const vineCard= menu?.vine_card;
  const teaCard= menu?.tea_card;
  const allCard = restCard?.concat(barCard)?.concat(vineCard)?.concat(teaCard);
  
  const restCategory = category?.rest_card_categories;
  const barCategory = category?.bar_card_categories;
  const vineCategory = category?.vine_card_categories;
  const teaCategory = category?.tea_card_categories;
  const allCategory = restCategory?.concat(barCategory?.concat(vineCategory?.concat(teaCategory)))
  
  const [selectedCategory, setSelectedCategory] = useState("Все товары");
  const [filteredItems, setFilteredItems] = useState(allCard);
  const [open , setOpen] = useState(false)

  const data = {
    info: {
        action: 'menu_bar' ,
    },
  };
  const getBasket = {
    info: {
      action: 'get_basket_contents',
      room: room
    }
  }
  
  useEffect(()=> {
    dispatch(getBarThunk(data))
    dispatch(getBasketThunk(getBasket))
  },[basket?.length]);




const handleCategoryChange = (e) => {
  setSelectedCategory(e.target.value);
  setOpen(false)
};

const filterMenuCategory = (menu) => {
  if (selectedCategory === "Все товары") {
    return menu;
  }
  return allCard.filter((menu) => menu.category === selectedCategory);
};

const filteredMenu = filterMenuCategory(allCard);


const handleSearch = (searchTerm) => {
  const filtered = allCard?.filter((item) =>
  item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  setFilteredItems(filtered);
  setSelectedCategory('Все товары')
  setOpen(true)
};

if(!room){
  return <Navigate to='/' /> 
}

    return (
    <>
    <BackButton />
    <Container>
      <div>
        <h1 className='menu-name'>РЕСТОРАН</h1> 
      </div>
      <div className='category-rest'>
        <Search  handleSearch={handleSearch}/>
        <select className='select-rest' value={selectedCategory} onChange={handleCategoryChange}>
        <option value="Все товары">Выберете категорию</option>
        <option value="Все товары">Все</option>
          {allCategory?.map((e) =><option key={e.id}>{e.name}</option>)}
        </select>
      </div>
        <h3 className='type-name'>{selectedCategory}</h3>
          {allCard?.length > 0 && !open ? 
          (filteredMenu?.map((el) => (
            <OneCard  el={el} key={el.id}/>
          )))
          : 
          (filteredItems?.map((el) => (
            <OneCard  el={el} key={el.id}/>
          )))}
    </Container>
    <FooterNavigation />
    </>
  )
}
