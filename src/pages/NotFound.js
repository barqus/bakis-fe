import React from 'react'
import { Link } from 'react-router-dom';
const NotFound = () => {
  return (
    <div className='text-center text-white text-2xl justify-center font-medium mt-20'>
        <h1>404 - Not Found!</h1>
        <Link to="/" className='text-green-300 underline'>Go Home</Link>
    </div>
  )
}

export default NotFound