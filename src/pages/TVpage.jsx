import React, { useEffect, useState } from 'react'
import { FooterNavigation } from '../components/Footer_navigation/FooterNavigation'
import { Container } from 'react-bootstrap'
import ReactPlayer from 'react-player';
import './stylePage/TV.css'
import TvOneCard from '../components/Tv_One_Card/TvOneCard';
import Search from '../components/Tv_One_Card/Search';
import { useDispatch, useSelector } from 'react-redux';
import { getFilmThunk } from '../redux/actions/infoAction';
import BackButton from '../components/BackButton/BackButton';
import { Navigate } from 'react-router-dom';



export default function TVpage() {
  const allFilms = useSelector((store) => store?.info)
  const dispatch = useDispatch()
  const category = allFilms?.categories
  const film = allFilms?.films
  const room = useSelector((store) => store?.user?.data?.room)

  const [url, setUrl] =useState()
  const [open , setOpen] = useState(false)
  const [filteredItems, setFilteredItems] = useState(film);
  const [open1 , setOpen1] = useState(false)
  const [openPlayer , setOpenPlayer] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("all");


  const data = {
    info: {
      action: 'get_films'
    }
  }

    useEffect(()=> {
      dispatch(getFilmThunk(data))
    },[])


  // после нажатия происходит скрол в начало страницы
  const clickHandler = (el) => {
    window.scrollTo(0, 0);
    setUrl(el.videoUrl)
    setOpenPlayer(true)
  }


  // динамический поиск по названию
  const handleSearch = (searchTerm) => {
    const filtered = film?.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(filtered);
    setOpen1(true)
    setOpenPlayer(false)
    setOpen(false)
  };


  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setOpen(true)
    setOpen1(false)
    setOpenPlayer(false)
  };

  const filterMoviesByCategory = (film) => {
    if (selectedCategory === "all") {
      return film;
    }
    return film.filter((movie) => movie.category === selectedCategory);
  };

  // Пример данных о фильмах

  const filteredMovies = filterMoviesByCategory(film);

  
  
  if(!room){
    return <Navigate to='/' /> 
  }



  return (
    <>
    <BackButton />
      <Container>
      <div>
        <h1 className='tv-name'>ТЕЛЕВИДЕНИЕ</h1>
      </div>
        <div className='tv-search-div'>
          <Search  handleSearch={handleSearch}/>
          <select className='tv-select'  value={selectedCategory} onChange={handleCategoryChange}>
            <option value="all">Выбор категории</option>
            {category?.length > 0 ?category?.map((e)=> <option key={e.id}>{e.category}</option>) : ''}
          </select>
        </div>
          {openPlayer ? (
            <ReactPlayer 
            url={url}
            width="100%"
            height="100%"
            style={{
              clipPath: 'inset(0 0 5% 0 round  5px 5px 5px 5px)',
              marginTop: '20px'
            }}
            controls
            />
            ) : ''}
        {!open1 ? (!open ? (
          <div className='grid-films' >
            {film?.map((el) => 
                <TvOneCard film={el}  clickHandler={clickHandler} key={el.id}/>
            )}
          </div>
        ):(
          <div className='grid-films' >
            {filteredMovies?.map((el) => 
                <TvOneCard film={el} clickHandler={clickHandler} key={el.id}/>
            )}
          </div>
        )) : (
        <div className='grid-films' >
            {filteredItems?.map((el) => 
                <TvOneCard  film={el} clickHandler={clickHandler} key={el.id}/>
            )}
          </div>
        )}
      </Container>
    <FooterNavigation/>
    </>
  )
}
