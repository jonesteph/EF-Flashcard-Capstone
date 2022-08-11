import React, { useEffect, useState } from "react"
import { Link, useHistory, useParams } from "react-router-dom"
import { readDeck, updateDeck, setNewDeck } from "../../utils/api"
import NavBar from "../NavBar"

function EditDeck(){
    const [ currentDeck, setCurrentDeck ] = useState({})
    const history = useHistory()
    const {deckId} = useParams()

    const changeHandler = (event) => { 
        setCurrentDeck({...currentDeck, [event.target.name]: event.target.value })
      }

    const handleEditDeck = async (event) => {
        event.preventDefault()
        await updateDeck(currentDeck)
        window.location.reload()
    }

    useEffect(() => {
        async function setDeck() {
          const response = await readDeck(deckId);
          setCurrentDeck(response);

        }
        setDeck();
      }, [deckId]);

    return(
        <div>
            <NavBar subLink={`decks/${deckId}/`} subLinkName={currentDeck.name} currentPage="Edit deck" />
            <h2>Edit Deck</h2>
            <form onSubmit={handleEditDeck}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input className="form-control" id="name" name="name"  required onChange={changeHandler} value={currentDeck.name}/>
                </div>
                <div className="form-group">
                <label htmlFor="description">Description</label>
                    <textarea className="form-control" id="description" name="description" required onChange={changeHandler} value={currentDeck.description} />
                </div>
                <button>Submit</button>
                <Link to={`/decks/${currentDeck.id}`}>
                    <button>Cancel</button>
                </Link>
            </form>
        </div>
    )
}

export default EditDeck