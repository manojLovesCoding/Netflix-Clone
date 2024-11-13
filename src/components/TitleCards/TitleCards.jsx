import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'

const TitleCards = ({ title, category }) => {

    const [apiData, setApiData] = useState([]);

    const cardsRef = useRef();

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMjI1ZTEyODVjMGNlY2I0ZGJlZWZhZTA2ODk1ZTI5NSIsIm5iZiI6MTczMTQ4ODE2Mi42OTc5OTk1LCJzdWIiOiI2NzM0Njg3OTNlODJiYTc5ZmNjZjI1NWMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.CoIN3bT2We2X2cAm0mXpph4CotlrVJvzsGbhte1NoiQ'
        }
    };

    const handleWheel = (event) => {
        event.preventDefault();
        cardsRef.current.scrollLeft += event.deltaY;
    }

    useEffect(() => {

        fetch(`https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?language=en-US&page=1`, options)
            .then(res => res.json())
            .then(res => setApiData(res.results))
            .catch(err => console.error(err));


        cardsRef.current.addEventListener('wheel', handleWheel)
    }, [])

    return (
        <div className='title-cards'>
            <h2>{title ? title : "Popula on Netflix"}</h2>
            <div className='card-list' ref={cardsRef}>
                {apiData.map((card, index) => {
                    return <div className='card' key={index}>
                        <img src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path} />
                        <p>{card.original_title}</p>
                    </div>
                })}
            </div>
        </div>
    )
}

export default TitleCards