import { React, useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { listDecks, deleteDeck } from "../utils/api"
import Deck from "./Decks/Deck"

function Home() {
  const [deckList, setDeckList] = useState([])
  
  useEffect(() => {
    setDeckList([])
    const abortController = new AbortController()

    async function loadDeckList() {
      try {
        const response = await listDecks(abortController.signal)
        setDeckList(response)
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Aborted")
        } else {
          throw error
        }
      }
    }

    loadDeckList();

    return () => abortController.abort()
  }, [])          
     
  const handleDeletedDeck = (id) => {
    if (window.confirm("Delete this deck? You will not be able to recover it.")) {
        deleteDeck(id)
        window.location.reload()
     }
  }
            
  return (
    <>
      <div>
        <Link to="/decks/new">
          <button>Create Deck</button>
        </Link>
      </div>
      <div>
        {deckList.map((deck,index) => (
          <Deck key={index} deck={deck} handleDeletedDeck={() => handleDeletedDeck(deck.id)} /> )
        )}
      </div>
    </>
  )
}

export default Home;