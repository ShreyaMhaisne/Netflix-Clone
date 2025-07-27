import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'

const Player = () => {
  const {id} = useParams();
  const navigate = useNavigate();

  const [apidata,setapidata]=useState({
    name : "",
    key:"",
    published_at : "",
    typeof: ""

  });
  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZWQ4ZjJkNWNlNTBlZjMxMzNiYTQxMzhiYTcxOTI3YiIsIm5iZiI6MTc1MzU0MDIxMS4zMzUsInN1YiI6IjY4ODRlNjczMzE3YTVjZmU5Y2Y3ODlkZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.aS8H2nq2GrYP-pyXNyVM9UDCtBRZXDO9_Ik6iY27HtM'
  }
};

useEffect(()=>{
fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
  .then(res => res.json())
  .then(res => setapidata(res.results[0]))
  .catch(err => console.error(err));
},[])

  return (
    <div className='player'>
      <img src={back_arrow} alt="" onClick={()=>{navigate(-2)}}/>
      <iframe width='70%' height='70%' 
      src={`https://www.youtube.com/embed/${apidata.key}`} title='Trailer' frameborder="0" allowFullScreen></iframe>
 <div className="player-info">
  <p>{apidata.published_at.slice(0,10)}</p>
  <p>{apidata.name}</p>
  <p>{apidata.Type}</p>
 </div>
    </div>
  )
}

export default Player
