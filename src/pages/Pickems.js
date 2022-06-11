import React from 'react'
import PickemBox from '../components/Pickem/PickemBox'

const  Pickems = ({participants, settings}) => {

    return (
        <div className="mb-24">
            <PickemBox participants={participants} settings={settings}/>
        </div>
    )
}

export default Pickems