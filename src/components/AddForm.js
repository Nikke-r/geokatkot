import React from 'react';

const AddForm = ({ handleClose, handleMessage, addNew, coords }) => {
    return (
        <div className="addFormContainer">
            <form className='addForm' onSubmit={addNew}>
                <h3>Lisätäänkö kätkö?</h3>
                <div>
                    <p>Leveysaste: {coords.latitude} </p>
                    <p>Pituusaste: {coords.longitude} </p>
                </div>
                <h5>Lisää viesti:</h5>
                <textarea className='addInput' placeholder="Viesti" onChange={handleMessage} required />
                <button className='addBtn' type="submit">Lisää kätkö</button>
                <button className='cancelBtn' onClick={handleClose}>Peruuta</button>
            </form>
        </div>
    )
}

export default AddForm;