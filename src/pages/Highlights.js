import React, { useState } from 'react'
import { Carousel } from 'react-responsive-carousel';

const Highlights = () => {
    const [currentVideo, setCurrentVideo] = useState("INY-uZYVb8I")
    return (
        <div className="m grid md:grid-cols-2 sm:grid-cols-1 bg-gray-900 mt-6 pr-4 pl-4 rounded-xl pb-7">
            <div className="col-span-2 py-5 justify-self-center self-center w-full">
                <iframe className="w-full" height="837" src={`https://www.youtube.com/embed/${currentVideo}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <div className="py-5 justify-self-center self-center w-full">
                <iframe  src="https://www.youtube.com/embed/euCjyw1K0ho" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <div className="py-5 justify-self-center self-center w-full">
                <iframe src="https://www.youtube.com/embed/euCjyw1K0ho" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
        </div>
    )
}

export default Highlights
