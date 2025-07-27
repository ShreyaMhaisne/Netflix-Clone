import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom';



const TitleCards = ({Title,category}) => {

  const [apidata,setapidata] = useState([]);
  const cardsref = useRef();
  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZWQ4ZjJkNWNlNTBlZjMxMzNiYTQxMzhiYTcxOTI3YiIsIm5iZiI6MTc1MzU0MDIxMS4zMzUsInN1YiI6IjY4ODRlNjczMzE3YTVjZmU5Y2Y3ODlkZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.aS8H2nq2GrYP-pyXNyVM9UDCtBRZXDO9_Ik6iY27HtM'
  }
};



  const handledWheel = (event) => {
    event.preventDefault();
    cardsref.current.scrollLeft += event.deltaY;
  }

  useEffect(() => {
fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
  .then(res => res.json())
  .then(res => setapidata(res.results))
  .catch(err => console.error(err));

    cardsref.current.addEventListener('wheel', handledWheel);
  }, [])

  return (
    <div className='title-cards'>
      <h2>{Title?Title:"Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsref}>
        {apidata.map((card, index) => {
          return <Link to={`/player/${card.id}`} className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
            <p>{card.original_path}</p>
          </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCards
