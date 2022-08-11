import React from "react"
import { Link } from "react-router-dom"

function Deck({ index, deck, handleDeletedDeck }){
  return(
    <div className='card'>
      <div className='card-body'>
        <h3 className="card-header">{deck.name}</h3>
        <p className="card-text">{deck.description}</p>
        <h5 className="card-title">{deck.cards.length} cards</h5>
        <div >
          <Link to={`/decks/${deck.id}`}>
            <button >View</button>
          </Link>
          <Link to={`/decks/${deck.id}/study`}>
            <button>Study</button>
          </Link>
          <button onClick={handleDeletedDeck}>Delete</button>
        </div>
        
      </div>
    </div>
  )
}


export default Deck