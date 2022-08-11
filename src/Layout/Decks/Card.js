import React from "react"
import { Link, useParams } from "react-router-dom"

function Card({ index, card, handleDeletedCard }){
  const { deckId } = useParams()


  return(
    <div className='card'>
      <div className='card-body'>
        <p className='card-text'>{card.front}</p>
        <p className='card-text'>{card.back}</p>
        
        
        <div >
          <Link to={`/decks/${deckId}/cards/${card.id}/edit`}>
            <button >Edit</button>
          </Link>
          <Link to={`/decks/${deckId}/study`}>
            <button>Study</button>
          </Link>
          <button onClick={handleDeletedCard}>Delete</button>
        </div>
        
      </div>
    </div>
  )
}


export default Card