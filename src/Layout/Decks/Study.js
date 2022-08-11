import React, { useEffect, useState } from "react"
import { Link, useHistory, useParams } from "react-router-dom"
import NavBar from "../NavBar"
import { readDeck } from "../../utils/api"

function Study(){
    const [currentDeck, setCurrentDeck] = useState({})
    const history = useHistory()
    const {deckId} = useParams()
    const [cardsInDeck, setCardsInDeck] = useState([])
    const [index, setIndex] = useState(0)
    const [front, setFront] = useState(true)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadDeckView() {
          const response = await readDeck(deckId)
          setCurrentDeck(response)
          setCardsInDeck(response.cards)
          setLoading(false)
        }
        loadDeckView()
      }, [deckId])
    
      function handleFlip() {
        setFront(!front)
      }
    
      function handleNext() {
        if (index === cardsInDeck.length - 1) {
          if (
            window.confirm(
              "Restart Cards?\n\nClick 'cancel' to return to the home page."
            )
          ) {
            setIndex(0)
            setFront(true)
          } else {
            history.push("/")
          }
        } else {
          setIndex((current) => current+1)
          setFront(true)
        }
    }
    
    return(
        <div>
            <NavBar subLink={`/decks/${deckId}/study`} subLinkName={currentDeck.name} currentPage="Study Deck"  />
            <h2>Study {currentDeck.name}</h2>
            {loading && <p>Loading...</p>}
            {cardsInDeck.length > 2 && (
                <>
                <div className="card px-3 py-3 mb-3">
                    <h4>
                    Card {[index + 1]} of {cardsInDeck.length}
                    </h4>
                    {front ? (
                    <p>{cardsInDeck[index].front}</p>
                    ) : (
                    <p>{cardsInDeck[index].back}</p>
                    )}
                    <div className="row">
                    <button className="btn btn-secondary ml-4" onClick={handleFlip}>
                        Flip
                    </button>
                    {!front ? (
                        <button className="btn btn-primary ml-2" onClick={handleNext}>
                        Next
                        </button>
                    ) : null}
                    </div>
                </div>
                </>
            )}
            {cardsInDeck.length < 3 && (
                <>
                <h3>Not enough cards.</h3>
                <p>
                    You need at least 3 cards to study. There are {cardsInDeck.length}{" "}
                    in this deck.
                </p>
                <Link to={`/decks/${currentDeck.id}/cards/new`}>
                    <button className="btn btn-primary">➕Add Cards</button>
                </Link>
                </>
            )}
        </div>
    )
}

export default Study