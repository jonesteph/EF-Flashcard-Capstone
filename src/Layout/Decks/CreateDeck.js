import React, { useState } from "react"
import NavBar from "../NavBar"
import { createDeck } from "../../utils/api"
import { Link, useHistory } from "react-router-dom"


function CreateDeck(){
  const [ newDeck, setNewDeck ] = useState({})
  const history = useHistory()
  
  const changeHandler = (event) => { 
    setNewDeck({...newDeck, [event.target.name]: event.target.value })
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    const response = await createDeck(newDeck)
    history.push(`/decks/${response.id}`)
  };

  return(
    <div>
      <NavBar currentPage="Create Deck" />
      <h2> Create Deck</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input className="form-control" id="name" name="name" required onChange={changeHandler} />
          <label htmlFor="description">Description</label>
          <textarea className="form-control" id="description" name="description" required onChange={changeHandler} />
        </div>
        <button>Submit</button>
        <Link to="/">
          <button>Cancel</button>
        </Link>
      </form>
    </div>
  )
  
}

export default CreateDeck