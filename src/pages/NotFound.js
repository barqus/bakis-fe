import React from 'react'
import { Link } from 'react-router-dom';
const NotFound = () => {
  return (
    <div className='text-center text-white text-2xl justify-center font-medium mt-20'>
        <h1>404 - Puslapis nerastas!</h1>
        <Link to="/" className='text-green-300 underline'>Grįžti į pradžią</Link>
    </div>
  )
}

export default NotFound