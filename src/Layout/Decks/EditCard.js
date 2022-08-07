import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { readCard, readDeck, updateCard } from "../../utils/api"
import NavBar from "../NavBar"
import CardForm from "./CardForm"


function EditCard(){
    const [ currentDeck, setCurrentDeck ] = useState({})
    const [ currentForm, setCurrentForm ] = useState({})
    const history = useHistory()
    const {deckId, cardId} = useParams()

    const handleEditCard = async (event) => {
        event.preventDefault()
        await updateCard(currentForm)
        window.location.reload()
    }
    
    useEffect(() => {
        async function getDeck() {
          const response = await readDeck(deckId)
          setCurrentDeck(response)
          const cardResponse = await readCard(cardId)
          setCurrentForm(cardResponse)
        }
    
        getDeck()
      }, [deckId, cardId])

    return(
        <div>
            <NavBar subLink={`/decks/${deckId}`} subLinkName={`Deck ${currentDeck.name}`} currentPage={`Edit card ${cardId}`} />
            <h2>{currentDeck.name} Edit card</h2>
            <CardForm onSubmit={handleEditCard} onCancel={() => history.push(`/decks/${currentDeck.id}`)} currentForm={currentForm} setCurrentForm={setCurrentForm} />
        </div>
    )
}

export default EditCard