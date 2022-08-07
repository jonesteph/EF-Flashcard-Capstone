import { React, useState } from "react"
import NavBar from "../NavBar"
import { createDeck } from "../../utils/api"
import { Link } from "react-router-dom"


function CreateDeck(){
  const { newDeck, setNewDeck } = useState({})
  
  const changeHandler = (event) => { 
    setNewDeck({...newDeck, [event.target.name]: event.target.value })
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    const response = await createDeck(newDeck)
    const deckId = response.id
    window.location.reload()
  };

  return(
    <div>
      <NavBar currentPage="Create deck" />
      <h2> Create deck</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input className="form-control" id="Name" name="Name" required onChange={changeHandler} />
          <label htmlFor="description">Description</label>
          <input className="form-control" id="description" name="description" required onChange={changeHandler} />
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