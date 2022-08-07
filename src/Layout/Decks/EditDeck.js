import React, { useEffect, useState } from "react"
import { Link, useHistory, useParams } from "react-router-dom"
import { readDeck, updateDeck, setNewDeck } from "../../utils/api"
import NavBar from "../NavBar"

function EditDeck(){
    const [ currentForm, setCurrentForm ] = useState({})
    const history = useHistory()
    const {deckId} = useParams()

    const changeHandler = (event) => { 
        setCurrentForm({...currentForm, [event.target.name]: event.target.value })
      }

    const handleEditDeck = async (event) => {
        event.preventDefault()
        await updateDeck(currentForm)
        window.location.reload()
    }

    useEffect(() => {
        async function setDeck() {
          const response = await readDeck(deckId);
          setCurrentForm(response);
        }
        setDeck();
      }, [deckId]);

    return(
        <div>
            <NavBar subLink={`decks/${deckId}/`} subLinkName={currentForm.name} currentPage="Edit deck" />
            <h2>Edit Deck</h2>
            <form onSubmit={handleEditDeck}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input className="form-control" id="name" name="name" required onChange={changeHandler}></input>
                </div>
                <div className="form-group">
                <label htmlFor="description">Description</label>
                    <textarea className="form-control" id="description" name="description" required onChange={changeHandler}></textarea>
                </div>
                <button>Submit</button>
                <Link to={`/decks/${currentForm.id}`}>
                    <button>Cancel</button>
                </Link>
            </form>
        </div>
    )
}

export default EditDeck