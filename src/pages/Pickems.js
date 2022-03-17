import React from 'react'
import DragableTable from '../components/Pickem/DragableTable'

const  Pickems = ({participants}) => {

    return (
        <div className="mb-24">
            <DragableTable participants={participants}/>
        </div>
    )
}

export default Pickems
