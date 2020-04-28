import React, { useState, useEffect } from 'react';
import StashMark from './StashMark';
import ReactMapGL from 'react-map-gl';
import AppHeader from './AppHeader';
import AddForm from './AddForm';
import firebaseService from '../services/firebaseService';
import StashPopup from './StashPopup';
import Notification from './Notification';

const Map = () => {
    //Set the initial states
    const [viewPort, setViewPort] = useState({
        latitude: 60.192059,
        longitude: 24.945831,
        width: '100vw',
        height: '100vh',
        zoom: 11,
    });
    const [showAddForm, setShowAddForm] = useState(false);
    const [message, setMessage] = useState('');
    const [selectedCoords, setSelectedCoords] = useState({});
    const [selectedStash, setSelectedStash] = useState(null);  
    const [stashes, setStashes] = useState([]);
    const [notification, setNotification] = useState(null);

    //Handle the event when user clicks a marker on a map
    const handleMarkerClick = (stash) => {
        setSelectedStash(stash);
    }

    //Handle the event when user clicks an empty spot on the map
    const handleMapClick = (event) => {
        setSelectedCoords({
            latitude: event.lngLat[1],
            longitude: event.lngLat[0]
        });
        setShowAddForm(true);
        console.log("AddForm visible: ", showAddForm)
    }

    //Handle the message state
    const handleMessage = (event) => {
        setMessage(event.target.value);
    }

    //Add new stash to firebase and show it on the map
    const addNewStash = (event) => {
        event.preventDefault();
        const newStash = {
            latitude: selectedCoords.latitude,
            longitude: selectedCoords.longitude,
            message: message,
        }

        firebaseService
            .addData(newStash)
            .then(() => {
                setStashes(stashes.concat(newStash));
                setShowAddForm(false);
                setNotification({success: "Uusi kätkö lisätty!"});
                setTimeout(() => {
                    setNotification(null);
                }, 3000);
            })
            .catch(error => {
                console.log("Firebase addData error: ", error);
                setNotification({error: "Kätkön lisääminen epäonnistui. Ole hyvä ja yritän uudelleen"});
                setTimeout(() => {
                    setNotification(null);
                }, 3000);
            });
    }

    //Get the data from firestore
    useEffect(() => {
        firebaseService
            .getAll()
            .then(response => {
                const docs = [];
                response.docs.map(doc => docs.push(doc.data()));
                setStashes(docs);
                setNotification({success: "Kätköt ladattu palvelimelta"})
                setTimeout(() => {
                    setNotification(null);
                }, 3000);
            })
            .catch(error => {
                console.log("Firebase getAll error: ", error);
                setNotification({error: "Kätköjä ei voitu hakea palvelimelta. Kokeile sivun uudelleen latausta."});
                setTimeout(() => {
                    setNotification(null);
                }, 3000);
            })
    }, []);

    return (
        <div>
            <ReactMapGL
            { ...viewPort }
            mapboxApiAccessToken='pk.eyJ1Ijoibmlra2VyIiwiYSI6ImNrOWloZmFxYzAzN2MzZ3F2anpvYXR5cjAifQ._E6TYOq88RgH_UU0LDs3SQ'
            mapStyle='mapbox://styles/mapbox/streets-v11'
            onViewportChange={newViewPort => setViewPort({ ...newViewPort })}
            onClick={handleMapClick}
            >           
                <AppHeader stashCount={stashes.length > 0 ? stashes.length : 0} />             
                <Notification notification={notification} />
                {stashes.map((stash, i) => {
                    return (
                        <StashMark key={i} stash={stash} setSelected={handleMarkerClick} />
                    )
                })}
                {selectedStash ? <StashPopup handleClose={() => setSelectedStash(null)} stash={selectedStash} /> : null}
            </ReactMapGL>
            {showAddForm ? <AddForm handleClose={() => setShowAddForm(false)} handleMessage={handleMessage} addNew={addNewStash} coords={selectedCoords} /> :  null}
        </div>
    )
}

export default Map;