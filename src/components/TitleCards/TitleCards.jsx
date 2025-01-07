import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import card_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom'


const TitleCards = ({title,category}) => {
    const CardsRef = useRef();
    const [apiData,setApiData] = useState([]);

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ODJkMTUzMzg0OWQ0MzNiMzY3ZTcxNzEwYjNjODcwMyIsIm5iZiI6MTczNjE2Njg3NS40NjMsInN1YiI6IjY3N2JjZGRiYzJlYWIxZmFmOTc0ODQzZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-Asv7qUJBxVCyqoDWrqEm3w0zD-uXAy9Ytli0OTLwz0'
        }
      };
      
      
    const handleWheel = (event) => {
        event.preventDefault();
        CardsRef.current.scrollLeft += event.deltaY;
    }
    useEffect(()=>{
        fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
        .then(res => res.json())
        .then(res => setApiData(res.results))
        .catch(err => console.error(err));

        CardsRef.current.addEventListener('wheel',handleWheel);
    },[])

  return (
    <div>
      <div className="title-cards">
         <h2>{title?title:'Popular on Netflix'}</h2>
         <div className="card-list" ref={CardsRef}>
            {apiData.map((card,index)=>{
                return <Link to={`/player/${card.id}`} className="card" key={index}>
                    <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
                    <p>{card.original_title}</p>
                </Link>
            })}
         </div>
      </div>
    </div>
  )
}

export default TitleCards
