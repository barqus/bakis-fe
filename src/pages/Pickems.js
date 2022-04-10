import React from 'react'
import PickemBox from '../components/Pickem/PickemBox'

const  Pickems = ({participants}) => {

    return (
        <div className="mb-24">
            <PickemBox participants={participants}/>
        </div>
    )
}

export default Pickems