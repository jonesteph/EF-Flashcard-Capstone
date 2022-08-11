import React from "react"

function CardForm({ onSubmit, onCancel, currentForm, setCurrentForm }){
   const changeHandler = (event) => { 
        setCurrentForm({...currentForm, [event.target.name]: event.target.value })
    }

    return (
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="front">Front</label>
                <textarea className="form-control" name="front" id="front" required value={currentForm.front} onChange={changeHandler} />
            </div>
            <div className="form-group">
                <label htmlFor="back">Back</label>
                <textarea className="form-control" name="back" id="back" required value={currentForm.back} onChange={changeHandler} />
            </div>
            <button onClick={onSubmit}>Submit</button>
            <button onClick={onCancel}>Cancel</button>
        </form>
    )
}


export default CardForm