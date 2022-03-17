import React from 'react'
import { useState } from 'react'
const Hero = () => {
    const [s,setS] = useState("")
    return (
        <div className="bg-white h-screen flex flex-col justify-center items-center">
            <h1 className="lg:text-9xl md:text-7xl sm:text-5xl text-3xl font-black mb-14">
                TEST
            </h1>
        </div>
    )
}

export default Hero
