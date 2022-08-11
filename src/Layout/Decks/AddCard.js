import { React, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { createCard } from "../../utils/api"
import NavBar from "../NavBar"
import { readDeck } from "../../utils/api"
import CardForm from "./CardForm"

function AddCard(){
    const [ currentDeck, setCurrentDeck ] = useState({})
    const [ currentForm, setCurrentForm ] = useState({})
    const { deckId } = useParams()
    const history = useHistory()

    const handleAddCard = async (event) => {
        event.preventDefault()
        await createCard(deckId, currentForm)
        setCurrentForm({})
        window.location.reload()
      }
    

    useEffect(() => {
        setCurrentDeck([])
        const abortController = new AbortController()
    
        async function loadCurrentDeck() {
          try {
            const response = await readDeck(deckId, abortController.signal)
            setCurrentDeck(response)
          } catch (error) {
            if (error.name === "AbortError") {
              console.log("Aborted")
            } else {
              throw error
            }
          }
        }
    
        loadCurrentDeck();
    
        return () => abortController.abort()
      }, [deckId])       


    return(
        <div>
            <NavBar currentPage="Create Card" />
            <h2>{currentDeck.name}</h2>: <span>Add Card</span>
            <CardForm onSubmit={handleAddCard} onCancel={() => history.push(`decks/${currentDeck.id}`)} currentForm={currentForm} setCurrentForm={setCurrentForm}/>
        </div>
    )
}


export default AddCard