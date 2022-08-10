import { React, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { deleteCard, deleteDeck, readDeck } from "../../utils/api"
import NavBar from "../NavBar"
import EditCard from "./EditCard"
import Card from "./Card"


function ViewDeck(){
    const { deckId } = useParams()
    const [ currentDeck, setCurrentDeck ] = useState()
    const [ currentCards, setCurrentCards ] = useState()

    const handleDeletedCard = (id) => {
        if (window.confirm("Delete this card? You will not be able to recover it.")) {
            deleteCard(id)
            window.location.reload()
         }
      }

    useEffect(() => {
        async function loadDeck() {
            try {
                const response = await readDeck(deckId)
                setCurrentDeck(response)
                setCurrentCards(response.cards)
            } catch (error) {
                if (error.name === "AbortError") {
                console.log("Aborted")
                } else {
                throw error
                }
            }
        }
        loadDeck()
    }, [deckId])


    const handleDeletedDeck = (id) => {
        if (window.confirm("Delete this deck? You will not be able to recover it.")) {
            deleteDeck(id)
            window.location.reload()
         }
      }

    return(
        <div>
            <NavBar subLink={`/decks/${deckId}`} subLinkName={`Deck ${currentDeck.name}`} currentPage="View Deck" />
            <h2>{currentDeck.name}</h2>
            <p>{currentDeck.description}</p>
            <div className='d-flex'>
            <Link to={`/decks/${deckId}/edit`}>Edit</Link>
            <Link to={`/decks/${deckId}/study`}>Study</Link>
            <Link to={`/decks/${deckId}/cards/new`}>Add Card</Link>
            <button onClick={handleDeletedDeck}>Delete</button>
        </div>
            {currentCards.map((eachCard, index) => (
                <Card card={eachCard} key={index} handleDeletedDeck={() => handleDeletedCard()}
                />
            ))
            }
                
        </div>
    )
}

export default ViewDeck