import React from 'react';

const Notification = ({ notification }) => {
    
    //If there is no notification return null
    if (notification === null) {
        return (
            null
        )
    }

    //If there is a success notification return this
    if (notification.success) {
        return (
            <div className='notificationContainer'>
                <div className='notificationSuccess'>
                    <p> {notification.success} </p>
                </div>
            </div>
        )
    }

    //If there is an error notification return this
    if (notification.error) {
        return (
            <div className='notificationContainer'>
                <div className='notificationError'>
                    <p> {notification.error} </p>
                </div>
            </div>
        )
    }
}

export default Notification;