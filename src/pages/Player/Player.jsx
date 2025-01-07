import React, { useEffect, useState } from 'react'
import './Player.css'
import backArrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'

const Player = () => {

    const {id} = useParams();

    const navigate = useNavigate()

    const [apiData,setApiData] =useState({
        name:"",
        key:"",
        published_at:"",
        type:""
    })

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ODJkMTUzMzg0OWQ0MzNiMzY3ZTcxNzEwYjNjODcwMyIsIm5iZiI6MTczNjE2Njg3NS40NjMsInN1YiI6IjY3N2JjZGRiYzJlYWIxZmFmOTc0ODQzZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-Asv7qUJBxVCyqoDWrqEm3w0zD-uXAy9Ytli0OTLwz0'
        }
      };

      useEffect(()=>{
        fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
        .then(res => res.json())
        .then(res => setApiData(res.results[0]))
        .catch(err => console.error(err));
      },[])
      
      
  return (
    <div className="player">
        <img src={backArrow_icon} alt="" onClick={()=>{navigate(-2)}} />
        <iframe width={'90%'} height={'90%'} src={`https://www.youtube.com/embed/${apiData.key}`} title='trailer' frameBorder='0' allowFullScreen ></iframe>
        <div className="player-info">
            <p>{apiData.published_at}</p>
            <p>{apiData.name}</p>
            <p>{apiData.type}</p>
        </div>
    </div>
  )
}

export default Player
