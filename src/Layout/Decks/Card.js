import React from "react"
import { Link } from "react-router-dom"

function Card({ index, card, handleDeletedDeck }){
  return(
    <div className='card'>
      <div className='card-body'>
        <p className='card-text'>{card.front}</p>
        <p className='card-text'>{card.back}</p>
        
        
        <div >
          <Link to={`/decks/${index}/cards/${card.id}/edit`}>
            <button >Edit</button>
          </Link>
          <Link to={`/decks/${index}/study`}>
            <button>Study</button>
          </Link>
          <button onClick={() => handleDeletedDeck}>Delete</button>
        </div>
        
      </div>
    </div>
  )
}


export default Card