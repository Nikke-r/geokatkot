import React from 'react';
import { Marker } from 'react-map-gl';
import { IoIosPin } from 'react-icons/io';

const StashMark = ({ stash, setSelected }) => {
    return (
        <Marker latitude={stash.latitude} longitude={stash.longitude}>
            <button onClick={() => setSelected(stash)} className='markerBtn'>
                <IoIosPin />
            </button>
        </Marker>
    )
}

export default StashMark;