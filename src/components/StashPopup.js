import React from 'react';
import { Popup } from 'react-map-gl';

const StashPopup = ({ handleClose, stash }) => {
    return (
        <Popup latitude={stash.latitude} longitude={stash.longitude} onClose={handleClose}>
            <p> {stash.message} </p>
            <button className='addBtn'>Merkkaa löydetyksi</button>
        </Popup>
    )
}

export default StashPopup;
