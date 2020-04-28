import React from 'react';

const AppHeader = ({ stashCount }) => {
    return (
        <div className="header">
            <h3>Geokätköt Helsinki | Kätköjä {stashCount} kpl </h3>
        </div>
    )
}

export default AppHeader;